"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * ACT 4 — The Rules (Doctrine)
 * Section id="mission"
 *
 * The doctrine act: autonomy is only tolerable because it is bounded
 * and accountable. The surface is an oxblood field that resolves toward
 * sand as the principles become explicit.
 *
 * Eyebrow: "T+01:20:00 · THE RULES"
 * Headline: "Capability without bounds is not operational autonomy."
 * Lead: "Autonomy here is not the absence of command..."
 * The four operating principles (01-04), tightened to ≤2 lines each
 * Etymology moment: कर्ता — "the one who acts, and answers for it"
 */

interface Principle {
  n: string;
  title: string;
  body: string;
}

const PRINCIPLES: Principle[] = [
  {
    n: "01",
    title: "Bounded autonomy",
    body:
      "Every autonomous action is constrained by an operator-approved doctrine. The system surfaces what it cannot do as clearly as what it can.",
  },
  {
    n: "02",
    title: "Integration discipline",
    body:
      "Hardware, software, doctrine and sustainment are one product. We do not ship anything we cannot maintain in the envelope it will fly.",
  },
  {
    n: "03",
    title: "Audit by design",
    body:
      "Every decision the system makes is logged at telemetry-frame granularity. After-action review is not a feature - it is the substrate.",
  },
  {
    n: "04",
    title: "Allied-export discipline",
    body:
      "Engineered for the doctrines we ship under, with export pathways consistent with allied use only.",
  },
];

export function DoctrineAct() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();

  // Scroll-based background gradient: oxblood top → sand-tinted edge
  return (
    <section
      id="mission"
      ref={ref}
      className="relative scroll-mt-24 px-6 md:px-10 py-24 md:py-44 overflow-hidden border-t border-oxblood/30"
    >
      {/* Oxblood gradient field resolving to warm-sand tint at the bottom */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, var(--color-oxblood) 0%, color-mix(in srgb, var(--color-oxblood) 40%, var(--color-ink)) 50%, color-mix(in srgb, var(--color-sand) 8%, var(--color-ink)) 100%)`,
        }}
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Eyebrow and headline */}
        <div className="max-w-[90rem]">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-warm-paper mb-6">
            T+01:20:00 · THE RULES
          </p>

          <h2 className="font-display text-[clamp(2.25rem,5vw,5.2rem)] font-medium tracking-[-0.025em] leading-[0.94] text-warm-paper max-w-[32ch]">
            Capability without bounds is not operational autonomy.
          </h2>

          <p className="mt-8 text-warm-paper/85 text-[clamp(1.15rem,1.7vw,1.45rem)] font-light leading-[1.5] max-w-[52ch]">
            Autonomy here is not the absence of command. It is command that
            persists as conditions change.
          </p>
        </div>

        {/* Four operating principles */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.n}
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pl-6 border-l border-oxblood-hi/40"
            >
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-sand/70">
                {p.n}
              </span>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-[-0.025em] text-warm-paper">
                {p.title}
              </h3>
              <p className="mt-3 text-warm-paper/75 text-[15px] leading-[1.65] max-w-[48ch]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Etymology moment: कर्ता */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
          className="mt-24 md:mt-32 max-w-[72ch] border-t border-warm-paper/20 pt-12"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div>
              <span
                lang="hi"
                className="font-devanagari block text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-sand font-medium"
              >
                कर्ता
              </span>
            </div>

            <div className="flex-1">
              <p className="text-warm-paper text-[17px] leading-[1.7] font-medium">
                Karta — the one who acts, and answers for it.
              </p>
              <p className="mt-4 text-warm-paper/80 text-[15px] leading-[1.65]">
                The machine acts; a human answers. The record is designed to
                show why.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
