import { NextResponse } from "next/server";
import { z } from "zod";

const engageSchema = z.object({
  intent: z.enum(["operational", "partnership", "press"]),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.email("Valid email required").max(180),
  organisation: z.string().trim().min(1, "Organisation is required").max(180),
  message: z.string().trim().min(10, "Message is too short").max(4000),
  // Honeypot. Hidden from real users; only bots fill it. Accepted by the
  // schema (so we can answer 200 and give bots no signal), then checked below.
  botField: z.string().max(200).optional(),
});

type EngageData = z.infer<typeof engageSchema>;

const FROM_ADDRESS = "Karta Engage <info@kartainnovations.com>";
const ACK_FROM_ADDRESS = "Karta Innovations <info@kartainnovations.com>";

// --- Best-effort in-memory rate limit ---------------------------------------
// Per-instance only: serverless cold starts and parallel instances each keep
// their own map, so this blunts rapid bursts rather than enforcing a global
// cap. For distributed, production-grade limiting, back this with Upstash
// Redis (or similar) keyed the same way.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const recentHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentHits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  hits.push(now);
  recentHits.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("engage.resend.failure", { status: res.status, body });
      return false;
    }
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown delivery error";
    console.error("engage.delivery.error", msg);
    return false;
  }
}

function notificationText(data: EngageData): string {
  return [
    `Intent: ${data.intent}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organisation: ${data.organisation}`,
    "",
    data.message,
  ].join("\n");
}

function acknowledgementText(data: EngageData): string {
  return [
    `Hi ${data.name},`,
    "",
    "Thanks for reaching out to Karta Innovations. We've received your",
    `${data.intent} enquiry and it's with our engineering team - you'll get a`,
    "direct reply from the people who ship the code, not a funnel.",
    "",
    "For your records, this is what you sent:",
    "",
    data.message,
    "",
    "- Karta Innovations",
    "info@kartainnovations.com",
  ].join("\n");
}

export async function POST(request: Request) {
  // Cheapest rejection first.
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests - please try again shortly" },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const parsed = engageSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0]?.message ?? "Validation failed";
    return NextResponse.json({ success: false, error: issue }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot tripped: answer 200 so the bot learns nothing, but send nothing.
  if (data.botField && data.botField.trim().length > 0) {
    console.error("engage.honeypot.tripped", { ip });
    return NextResponse.json({ success: true });
  }

  const to = process.env.ENGAGE_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  // In dev / when Resend is not configured, log to stderr and acknowledge.
  if (!to || !apiKey) {
    console.error(
      JSON.stringify({
        event: "engage.received.local",
        intent: data.intent,
        from: `${data.name} <${data.email}>`,
        organisation: data.organisation,
        messagePreview: data.message.slice(0, 200),
      }),
    );
    return NextResponse.json({ success: true, mode: "local-log" });
  }

  // 1. Internal notification - the submission we must not lose.
  const internalSent = await sendEmail(apiKey, {
    from: FROM_ADDRESS,
    to: [to],
    subject: `[Engage · ${data.intent}] ${data.organisation} · ${data.name}`,
    reply_to: data.email,
    text: notificationText(data),
  });

  if (!internalSent) {
    return NextResponse.json(
      { success: false, error: "Delivery temporarily unavailable" },
      { status: 502 },
    );
  }

  // 2. Auto-acknowledgement to the submitter - best-effort. The lead is
  //    already captured above, so a failed ack must not fail the request.
  const ackSent = await sendEmail(apiKey, {
    from: ACK_FROM_ADDRESS,
    to: [data.email],
    reply_to: to,
    subject: "We've received your engagement - Karta Innovations",
    text: acknowledgementText(data),
  });
  if (!ackSent) {
    console.error("engage.ack.failure", { to: data.email });
  }

  return NextResponse.json({ success: true });
}
