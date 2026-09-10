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
        <legend className="font-sans text-[14px] font-semibold text-flare mb-5">
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
                  "pressable text-left rounded-none p-5 ring-1",
                  active
                    ? "bg-flare/10 ring-flare/40"
                    : "bg-glass ring-edge hover:bg-glass hover:ring-edge-strong",
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      "font-sans text-[14px] font-semibold",
                      active ? "text-flare" : "text-fg-tertiary",
                    )}
                  >
                    {it.label}
                  </span>
                  <span
                    className={cn(
                      "size-3 rounded-full ring-1 ring-inset",
                      active ? "bg-flare ring-flare" : "ring-fg-tertiary",
                    )}
                  />
                </div>
                <p className="text-fg text-[15px] leading-[1.45]">{it.detail}</p>
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
            placeholder="Tell us about your platform, operating conditions, and what you need help with."
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={state === "submitting" || state === "success"}
          className={cn(
            "inline-flex items-center gap-7 rounded-none px-5 py-3 min-h-12",
            "font-medium text-[16px] tracking-[-0.005em]",
            "pressable bg-flare text-on-flare",
            "hover:bg-flare-hi",
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
          <span className="size-6 inline-flex items-center justify-center">
            <span
              aria-hidden
              className={cn(
                "block size-2 rounded-full bg-on-flare",
                state === "submitting" && "animate-pulse",
              )}
            />
          </span>
        </button>

        <div aria-live="polite" role="status" className="sr-only">
          {state === "success" ? "Message sent successfully. The engineering team will reply by email." : null}
          {state === "error" && error ? `Error: ${error}` : null}
        </div>

        <AnimatePresence>
          {state === "success" ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-sans text-[15px] text-ok"
            >
              Received · expect a reply from the engineering team
            </motion.p>
          ) : null}
          {state === "error" && error ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-sans text-[15px] text-alert"
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
      <span className="font-sans text-[14px] font-semibold text-fg-tertiary mb-2 block">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        autoComplete={autoComplete}
        maxLength={name === "name" ? 120 : 180}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-none bg-ink ring-1 ring-border",
          "px-4 py-3 text-fg placeholder:text-fg-tertiary",
          "focus:ring-flare focus:ring-1 focus:bg-glass outline-none transition-[background-color,box-shadow] duration-200",
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
      <span className="font-sans text-[14px] font-semibold text-fg-tertiary mb-2 block">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        required={required}
        rows={rows}
        minLength={10}
        maxLength={4000}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-none bg-ink ring-1 ring-border",
          "px-4 py-3 text-fg placeholder:text-fg-tertiary leading-[1.55]",
          "focus:ring-flare focus:ring-1 focus:bg-glass outline-none transition-[background-color,box-shadow] duration-200 resize-none",
        )}
      />
    </label>
  );
}
