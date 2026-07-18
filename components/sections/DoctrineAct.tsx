"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { OperationalField } from "@/components/primitives/OperationalField";

/**
 * ACT 4 - The Mission
 * Section id="mission"
 *
 * The mission act states why autonomous systems must be bounded, then makes
 * the four operating principles explicit on a bounded field.
 *
 * Eyebrow: "T+01:20:00 / THE MISSION"
 * Headline: "Autonomous systems are arriving. They must be bounded."
 * The four operating principles (01-04), tightened to ≤2 lines each
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

  return (
    <section
      id="mission"
      ref={ref}
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-boundary/30 px-6 py-24 md:px-10 md:py-32"
    >
      <div aria-hidden className="section-field section-field--doctrine" />
      <OperationalField variant="boundary" animated />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Eyebrow and headline */}
        <div className="max-w-[90rem]">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-paper mb-6">
            T+01:20:00 / THE MISSION
          </p>

          <h2 className="max-w-[24ch] font-display-wide text-[clamp(2rem,4.4vw,4rem)] uppercase leading-[0.96] tracking-[0.01em] text-paper">
            Autonomous systems are arriving.{" "}
            <span className="text-flare">They must be bounded.</span>
          </h2>

          <div className="mt-10 grid max-w-[76rem] gap-7 lg:grid-cols-2 lg:gap-16">
            <p className="text-paper/85 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65]">
              Karta exists because the autonomous future is arriving whether we participate or not. The choice is not whether autonomous systems fly. It is whether they fly under doctrine that is auditable, constrained, and built for the field they will see.
            </p>
            <p className="text-paper/85 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65]">
              We are not building one category-leading vehicle. We are building the operational autonomy layer underneath autonomous systems, the navigation, decision and integration stack that turns hardware into a safe, auditable teammate.
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
                className="absolute inset-y-0 left-0 w-px origin-top bg-paper/22"
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: reduce ? 0 : index * 0.055,
                }}
              />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-paper">
                {p.n}
              </span>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-[-0.025em] text-paper">
                {p.title}
              </h3>
              <p className="mt-3 text-paper/78 text-[15px] leading-[1.65] max-w-[48ch]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
