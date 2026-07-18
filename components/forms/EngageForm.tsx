"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Intent = "operational" | "partnership" | "press";
type FormState = "idle" | "submitting" | "success" | "error";

interface EngageFormState {
  intent: Intent;
  name: string;
  email: string;
  organisation: string;
  message: string;
  /** Honeypot - real users never see or fill this; bots do. */
  botField: string;
}

const INTENTS: { id: Intent; label: string; detail: string }[] = [
  { id: "operational", label: "Operational", detail: "Procurement · trials · integration" },
  { id: "partnership", label: "Partnership", detail: "Platforms · channels · research" },
  { id: "press", label: "Press", detail: "Media · briefings" },
];

const initial: EngageFormState = {
  intent: "operational",
  name: "",
  email: "",
  organisation: "",
  message: "",
  botField: "",
};

export function EngageForm() {
  const [data, setData] = useState<EngageFormState>(initial);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    try {
      const res = await fetch("/api/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as { success: boolean; error?: string };
      if (!res.ok || !body.success) {
        throw new Error(body.error ?? "Submission failed");
      }
      setState("success");
      setData(initial);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setError(msg);
      setState("error");
    }
  }

  function update<K extends keyof EngageFormState>(k: K, v: EngageFormState[K]) {
    setData((prev) => ({ ...prev, [k]: v }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* Honeypot: hidden from people and assistive tech; bots that fill every
          field trip it and the server silently discards the submission. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={data.botField}
            onChange={(e) => update("botField", e.target.value)}
          />
        </label>
      </div>

      <fieldset>
        <legend className="font-mono text-[11px] tracking-[0.22em] uppercase text-sand mb-5">
          Intent
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {INTENTS.map((it) => {
            const active = data.intent === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => update("intent", it.id)}
                aria-pressed={active}
                className={cn(
                  "text-left rounded-2xl p-5 ring-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  active
                    ? "bg-sand/10 ring-sand/40"
                    : "bg-glass ring-edge hover:bg-glass hover:ring-edge-strong",
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.22em] uppercase",
                      active ? "text-sand" : "text-fg-tertiary",
                    )}
                  >
                    {it.label}
                  </span>
                  <span
                    className={cn(
                      "size-3 rounded-full ring-1 ring-inset",
                      active ? "bg-sand ring-sand" : "ring-fg-tertiary",
                    )}
                  />
                </div>
                <p className="text-fg text-[13px] leading-[1.45]">{it.detail}</p>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="Name"
          name="name"
          value={data.name}
          onChange={(v) => update("name", v)}
          required
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v)}
          required
          autoComplete="email"
        />
        <div className="md:col-span-2">
          <Field
            label="Organisation"
            name="organisation"
            value={data.organisation}
            onChange={(v) => update("organisation", v)}
            required
            autoComplete="organization"
          />
        </div>
        <div className="md:col-span-2">
          <TextArea
            label="Message"
            name="message"
            value={data.message}
            onChange={(v) => update("message", v)}
            required
            rows={6}
            placeholder="Briefly describe the engagement, the envelope, and any constraints relevant to your programme."
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={state === "submitting" || state === "success"}
          className={cn(
            "inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2",
            "font-medium text-[14px] tracking-[-0.005em]",
            "bg-sand text-warm-ink",
            "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "hover:bg-sand-hi active:scale-[0.98]",
            "disabled:opacity-60 disabled:cursor-not-allowed",
          )}
        >
          <span>
            {state === "submitting"
              ? "Sending"
              : state === "success"
                ? "Sent"
                : "Send to engineering"}
          </span>
          <span className="size-9 inline-flex items-center justify-center rounded-full bg-warm-ink/15">
            <span
              aria-hidden
              className={cn(
                "block size-2 rounded-full bg-warm-ink/80",
                state === "submitting" && "animate-pulse",
              )}
            />
          </span>
        </button>

        <div aria-live="polite" role="status" className="sr-only">
          {state === "success" ? "Message sent successfully. Expect a reply from the engineering team within 48 hours." : null}
          {state === "error" && error ? `Error: ${error}` : null}
        </div>

        <AnimatePresence>
          {state === "success" ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-ok"
            >
              Received · expect a reply from the engineering team
            </motion.p>
          ) : null}
          {state === "error" && error ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-alert"
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({ label, name, value, onChange, type = "text", required, autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary mb-2 block">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md bg-glass ring-1 ring-edge",
          "px-4 py-3 text-fg placeholder:text-fg-tertiary",
          "focus:ring-sand focus:ring-1 focus:bg-glass outline-none transition-all",
        )}
      />
    </label>
  );
}

interface TextAreaProps extends Omit<FieldProps, "type"> {
  rows?: number;
  placeholder?: string;
}

function TextArea({ label, name, value, onChange, required, rows = 4, placeholder }: TextAreaProps) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary mb-2 block">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        required={required}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md bg-glass ring-1 ring-edge",
          "px-4 py-3 text-fg placeholder:text-fg-tertiary leading-[1.55]",
          "focus:ring-sand focus:ring-1 focus:bg-glass outline-none transition-all resize-none",
        )}
      />
    </label>
  );
}
