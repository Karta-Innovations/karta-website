"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * ACT 4 - The Mission
 * Section id="mission"
 *
 * The mission act states why autonomous systems must be bounded, then makes
 * the four operating principles explicit on a bounded field.
 *
 * Eyebrow: "Our mission"
 * Headline: "Autonomous systems are arriving. They must be bounded."
 * The four operating principles (01-04), stated in plain language
 * The Karta etymology moment now lives in the launch hero.
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
      "Autonomous behaviour is designed around operator-approved rules and limits. Uncertainty and restricted actions should be visible to the operator.",
  },
  {
    n: "02",
    title: "Integration discipline",
    body:
      "Hardware, software, operating rules and maintenance are designed together for the conditions in which the system will operate.",
  },
  {
    n: "03",
    title: "Audit by design",
    body:
      "Decisions and their authorising rules are designed to be reviewable together, so operators can trace what happened and why.",
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

  return (
    <section
      id="mission"
      ref={ref}
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-boundary/30 px-6 py-24 md:px-10 md:py-32"
    >

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Eyebrow and headline */}
        <div className="max-w-[90rem]">
          <p className="chapter-label mb-6">
            Our mission
          </p>

          <h2 className="max-w-[24ch] font-display-wide text-[clamp(2rem,4.4vw,4rem)] uppercase leading-[0.96] tracking-[0.01em] text-fg">
            Autonomous systems are arriving.{" "}
            <span className="text-boundary">They must be bounded.</span>
          </h2>

          <div className="mt-10 grid max-w-[76rem] gap-7 lg:grid-cols-2 lg:gap-16">
            <p className="text-fg-muted text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65]">
              Operators need to know where a system can act, when it must ask for approval, and how its decisions can be reviewed. Those requirements guide how we build autonomy.
            </p>
            <p className="text-fg-muted text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65]">
              Karta brings navigation, mission planning and policy into one autonomy stack. Our aim is to help operators retain control as signals, conditions and mission demands change.
            </p>
          </div>
        </div>

        {/* Four operating principles */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
          {PRINCIPLES.map((p, index) => (
            <motion.div
              key={p.n}
              initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{
                duration: reduce ? 0 : 0.56,
                ease: [0.23, 1, 0.32, 1],
                delay: reduce ? 0 : index * 0.055,
              }}
              className="relative pl-6"
            >
              <motion.span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px origin-top bg-border"
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: reduce ? 0 : index * 0.055,
                }}
              />
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-fg">
                {p.n}
              </span>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-[-0.025em] text-fg">
                {p.title}
              </h3>
              <p className="mt-3 text-fg-muted text-[19px] leading-[1.65] max-w-[48ch]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
