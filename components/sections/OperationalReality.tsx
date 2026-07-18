"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { OperationalField } from "@/components/primitives/OperationalField";
import { DURATION, EASING } from "@/lib/motion";

const FAILURE_STEPS = [
  {
    index: "01",
    condition: "Position source lost",
    response: "Estimate pose with calibrated uncertainty, then expose the confidence downstream.",
  },
  {
    index: "02",
    condition: "Command link lost",
    response: "Continue only inside the intent and constraints approved before the link disappeared.",
  },
  {
    index: "03",
    condition: "Airspace congested",
    response: "Resolve the next safe action and preserve the reason in the flight record.",
  },
];

export function OperationalReality() {
  const reduce = useReducedMotionSafe();
  const reveal = reduce
    ? { opacity: 1, transform: "translateY(0px)" }
    : { opacity: 0, transform: "translateY(24px)" };

  return (
    <section
      id="brief"
      className="relative isolate scroll-mt-24 overflow-hidden bg-current-deep px-6 py-24 md:px-10 md:py-32"
    >
      <span id="denial" className="absolute top-0 scroll-mt-24" aria-hidden />
      <div aria-hidden className="section-field section-field--brief" />
      <div aria-hidden className="terrain-field-texture absolute inset-0" />
      <div aria-hidden className="grid-overlay absolute inset-0 opacity-[0.08]" />
      <OperationalField variant="corridor" animated />

      <div className="relative z-10 mx-auto max-w-[80rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(24rem,0.72fr)] lg:items-end lg:gap-24">
          <motion.div
            initial={reveal}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: DURATION.slow, ease: EASING.expo }}
            viewport={{ once: true, margin: "0px 0px -90px 0px" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flare">
              One sortie / plan to proof
            </p>
            <h2 className="mt-5 max-w-[19ch] font-display-wide text-[clamp(2rem,4.4vw,4rem)] uppercase leading-[0.96] tracking-[0.01em] text-fg">
              When the plan breaks, intent must still hold.
            </h2>
          </motion.div>

          <motion.div
            initial={reveal}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{
              duration: DURATION.slow,
              ease: EASING.expo,
              delay: reduce ? 0 : 0.1,
            }}
            viewport={{ once: true, margin: "0px 0px -90px 0px" }}
            className="space-y-5"
          >
            <p className="max-w-[65ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65] text-fg-muted">
              A clear corridor can become a denied environment in minutes. GPS disappears. The command link drops. Other aircraft enter the route.
            </p>
            <p className="max-w-[65ch] text-[15px] leading-[1.7] text-fg-tertiary">
              Operational autonomy must keep the system oriented, limit every next action to approved intent, and preserve a record of what happened.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={
            reduce
              ? { opacity: 1, clipPath: "inset(0 0 0 0)" }
              : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
          }
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
          transition={{
            duration: DURATION.extra,
            ease: EASING.expo,
            delay: reduce ? 0 : 0.14,
          }}
          viewport={{ once: true, margin: "0px 0px -110px 0px" }}
          className="mt-14 grid overflow-hidden border border-border-strong bg-ink shadow-[0_32px_90px_-54px_color-mix(in_oklab,var(--color-violet-hi)_50%,transparent)] lg:mt-20 lg:grid-cols-2"
        >
          <figure className="relative aspect-[4/3] overflow-hidden border-b border-border-strong lg:border-b-0 lg:border-r">
            <Image
              src="/imagery/sortie-plan-v2.jpg"
              alt="A clear morning view across a rugged Deccan Plateau corridor before operating conditions degrade."
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-return">
                01 / The brief
              </p>
              <p className="mt-2 max-w-[32ch] text-[14px] leading-[1.55] text-fg">
                A route, an objective, and an operating envelope. Every condition appears knowable.
              </p>
            </figcaption>
          </figure>

          <figure className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/imagery/sortie-field-v2.jpg"
              alt="The same Deccan Plateau corridor under low cloud, rain, and reduced late-evening visibility."
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-boundary-hi">
                02 / Contact with the field
              </p>
              <p className="mt-2 max-w-[42ch] text-[14px] leading-[1.55] text-fg">
                Conditions change. The system must stay useful without inventing authority it was never given.
              </p>
            </figcaption>
          </figure>
        </motion.div>

        <motion.ol
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: DURATION.slow, ease: EASING.expo }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="mt-12 grid border-y border-edge md:grid-cols-3"
        >
          {FAILURE_STEPS.map((step, index) => (
            <li
              key={step.index}
              className={`py-7 md:px-7 md:py-9 ${
                index > 0 ? "border-t border-edge md:border-l md:border-t-0" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] text-boundary-hi">
                  {step.index}
                </span>
                <span aria-hidden className="h-px flex-1 bg-edge-strong" />
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.35rem,2.3vw,2rem)] font-medium leading-[1.05] text-fg">
                {step.condition}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.65] text-fg-muted">
                {step.response}
              </p>
            </li>
          ))}
        </motion.ol>

        <div className="mt-14 flex max-w-[72rem] flex-col gap-5 border-t border-violet-hi/35 pt-8 md:mt-20 md:flex-row md:items-start md:justify-between md:gap-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-return">
            The operating requirement
          </p>
          <p className="max-w-[66ch] font-display text-[clamp(1.35rem,2.7vw,2.25rem)] leading-[1.2] text-fg">
            Position with uncertainty. Decisions within bounds. Doctrine visible in the flight record. All three must work as one system.
          </p>
        </div>
      </div>
    </section>
  );
}
