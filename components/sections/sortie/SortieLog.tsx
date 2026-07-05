"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ACTS, type SortieAct } from "./sortie-data";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

interface SortieLogProps {
  /** Active fault index (-1 during nominal). */
  activeFault: number;
  /** Static mode: render every entry fully expanded, no dimming, no reveal. */
  expandedAll?: boolean;
}

type EntryState = "past" | "active" | "upcoming";

function stateFor(id: number, activeFault: number, expandedAll: boolean): EntryState {
  if (expandedAll) return "active";
  if (id < activeFault) return "past";
  if (id === activeFault) return "active";
  return "upcoming";
}

/**
 * The mission log. Every fault entry is always in the DOM (screen readers and
 * no-JS get the full record in order). The active entry expands and its body
 * words reveal on activation; past entries keep a one-line resolution.
 */
export function SortieLog({ activeFault, expandedAll = false }: SortieLogProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-edge pb-3 mb-4">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
          Mission record · Sortie 047
        </span>
      </div>
      <ol className="flex flex-col divide-y divide-edge">
        {ACTS.map((act) => (
          <LogEntry
            key={act.code}
            act={act}
            state={stateFor(act.id, activeFault, expandedAll)}
            reveal={!expandedAll}
          />
        ))}
      </ol>
    </div>
  );
}

interface LogEntryProps {
  act: SortieAct;
  state: EntryState;
  reveal: boolean;
}

function LogEntry({ act, state, reveal }: LogEntryProps) {
  const reduce = useReducedMotionSafe();
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const isOpen = state === "active" || state === "past";
  const animatedBody = reveal && !reduce && state === "active";

  useEffect(() => {
    if (!animatedBody || !bodyRef.current) return;
    const words = bodyRef.current.querySelectorAll<HTMLElement>("[data-word]");
    if (words.length === 0) return;
    const anim = animate(words, {
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 520,
      delay: stagger(18),
      ease: "outExpo",
    });
    return () => {
      anim.revert();
    };
  }, [animatedBody]);

  return (
    <li
      className={`py-4 transition-opacity duration-500 ${
        state === "upcoming"
          ? "opacity-45"
          : state === "past"
            ? "opacity-70"
            : "opacity-100"
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={`font-mono text-[11px] tracking-[0.22em] uppercase ${
            state === "active" ? "text-amber" : "text-fg-tertiary"
          }`}
        >
          {act.code}
        </span>
        <span
          className={`font-mono text-[11px] tracking-[0.22em] uppercase ${
            state === "active" ? "text-fg" : "text-fg-tertiary"
          }`}
        >
          {act.label}
        </span>
        {state === "active" ? (
          <span aria-hidden className="ml-auto size-1.5 rounded-full bg-alert" />
        ) : state === "past" ? (
          <span
            aria-hidden
            className="ml-auto font-mono text-[10px] tracking-[0.2em] uppercase text-ok"
          >
            ✓
          </span>
        ) : null}
      </div>

      {isOpen ? (
        <>
          <h3 className="font-display mt-2 text-[clamp(1.15rem,1.6vw,1.5rem)] font-medium tracking-[-0.02em] leading-[1.1] text-fg">
            {act.title}
          </h3>
          <p ref={bodyRef} className="mt-2 text-[14px] leading-[1.6] text-fg-muted">
            {animatedBody
              ? act.body.split(/\s+/).map((w, i) => (
                  <span key={i} data-word className="inline-block will-change-transform">
                    {w}&nbsp;
                  </span>
                ))
              : act.body}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {act.telemetry.map((row) => (
              <span
                key={row.k}
                className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-tertiary"
              >
                {row.k}: <span className="text-fg-muted">{row.v}</span>
              </span>
            ))}
          </div>
          {state === "past" ? (
            <p className="mt-2 font-mono text-[10px] tracking-[0.14em] uppercase text-ok">
              {act.resolution}
            </p>
          ) : null}
        </>
      ) : null}
    </li>
  );
}
