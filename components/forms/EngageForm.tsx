"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

type Intent = "operational" | "partnership" | "press";
type FormState = "idle" | "submitting" | "success" | "error";

interface EngageFormState {
  intent: Intent;
  name: string;
  email: string;
  organisation: string;
  message: string;
  /** Honeypot: real visitors never see or fill this; bots do. */
  botField: string;
}

const INTENTS: { id: Intent; label: string; detail: string }[] = [
  { id: "operational", label: "Operational", detail: "Evaluation flights · integration · procurement" },
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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);
    try {
      const res = await fetch("/api/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as { success: boolean; error?: string };
      if (!res.ok || !body.success) throw new Error(body.error ?? "Submission failed");
      setState("success");
      setData(initial);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setState("error");
    }
  }

  function update<K extends keyof EngageFormState>(key: K, value: EngageFormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form onSubmit={onSubmit} className="form">
      {/* Honeypot: hidden from people and assistive technology. Bots that fill
          every field trip it and the server quietly discards the submission. */}
      <div aria-hidden className="form__trap">
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={data.botField}
            onChange={(event) => update("botField", event.target.value)}
          />
        </label>
      </div>

      <fieldset className="form__intent">
        <legend className="label">What is this about</legend>
        <div>
          {INTENTS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="intent"
              aria-pressed={data.intent === item.id}
              onClick={() => update("intent", item.id)}
            >
              <span className="intent__n">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="form__grid">
        <Field label="Name" name="name" value={data.name} onChange={(v) => update("name", v)} required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v)}
          required
          autoComplete="email"
        />
        <Field
          label="Organisation"
          name="organisation"
          value={data.organisation}
          onChange={(v) => update("organisation", v)}
          required
          autoComplete="organization"
          wide
        />
        <label className="field field--wide">
          <span>Message</span>
          <textarea
            name="message"
            value={data.message}
            required
            rows={6}
            minLength={10}
            maxLength={4000}
            placeholder="Your platform, where it has to fly, and what you need from us."
            onChange={(event) => update("message", event.target.value)}
          />
        </label>
      </div>

      <div className="form__foot">
        <button type="submit" disabled={state === "submitting" || state === "success"} className="btn">
          <span>{state === "submitting" ? "Sending" : state === "success" ? "Sent" : "Send to engineering"}</span>
          <ArrowRight size={16} weight="bold" aria-hidden />
        </button>
        <p className="form__status" role="status" aria-live="polite" data-state={state}>
          {state === "success" ? "Received. Expect a reply from the engineering team by email." : null}
          {state === "error" && error ? error : null}
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  wide?: boolean;
}

function Field({ label, name, value, onChange, type = "text", required, autoComplete, wide }: FieldProps) {
  return (
    <label className={wide ? "field field--wide" : "field"}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        autoComplete={autoComplete}
        maxLength={name === "name" ? 120 : 180}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
