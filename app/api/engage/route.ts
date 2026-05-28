import { NextResponse } from "next/server";
import { z } from "zod";

const engageSchema = z.object({
  intent: z.enum(["operational", "partnership", "press"]),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.email("Valid email required").max(180),
  organisation: z.string().trim().min(1, "Organisation is required").max(180),
  message: z.string().trim().min(10, "Message is too short").max(4000),
});

export async function POST(request: Request) {
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Karta Engage <engage@kartainnovations.com>",
        to: [to],
        subject: `[Engage · ${data.intent}] ${data.organisation} · ${data.name}`,
        reply_to: data.email,
        text: [
          `Intent: ${data.intent}`,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Organisation: ${data.organisation}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("engage.resend.failure", { status: res.status, body });
      return NextResponse.json(
        { success: false, error: "Delivery temporarily unavailable" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown delivery error";
    console.error("engage.delivery.error", msg);
    return NextResponse.json(
      { success: false, error: "Delivery temporarily unavailable" },
      { status: 502 },
    );
  }
}
