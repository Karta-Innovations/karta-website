"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { DURATION, EASING } from "@/lib/motion";

/**
 * Act 1 — THE BRIEF (#brief)
 *
 * Pattern establishment: a full-bleed presentation of the daylight corridor
 * plate on a tide-teal field, calm and confident. The three risk zones
 * appear as routine planning annotations here; their real meaning detonates
 * in the next act. Framer-motion reveal with reduced-motion safety.
 */

interface RiskZone {
  index: number;
  label: string;
}

const RISK_ZONES: RiskZone[] = [
  { index: 1, label: "NO-GPS AREA" },
  { index: 2, label: "COMMS JAMMED" },
  { index: 3, label: "CONGESTED AIR" },
];

export function BriefPlate() {
  const reduce = useReducedMotionSafe();

  return (
    <section
      id="brief"
      className="relative w-full scroll-mt-24 bg-gradient-to-b from-teal to-current-deep px-6 md:px-10 py-32 md:py-48"
    >
      <div className="relative mx-auto max-w-[1440px]">
        {/* Eyebrow: mission clock + REPRESENTATIVE SORTIE label */}
        <div className="mb-12 flex flex-col gap-4 md:gap-6">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-sand font-medium">
            <span aria-hidden className="h-px w-6 bg-sand" />
            T-01:12:00 · THE BRIEF · REPRESENTATIVE SORTIE · ILLUSTRATIVE
          </div>
        </div>

        {/* Content grid: headline + body */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.slow,
              ease: EASING.quint,
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <h2 className="font-display text-[clamp(2.25rem,5vw,5.2rem)] font-semibold tracking-[-0.02em] leading-[0.98] text-warm-paper max-w-[20ch]">
              The plan is{" "}
              <span className="text-sand">perfect</span>.
            </h2>
          </motion.div>

          <motion.div
            className="lg:pt-2"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.slow,
              ease: EASING.quint,
              delay: 0.12,
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <p className="text-pale-tide text-[clamp(1rem, 0.35vw + 0.92rem, 1.125rem)] leading-[1.65] max-w-[68ch]">
              Corridor plotted around three risk zones. Weather clear. Fuel
              margins good. Every mission starts like this — on a map, in
              daylight, with everything known.
            </p>
          </motion.div>
        </div>

        {/* The terrain plate with caption scrim */}
        <motion.figure
          className="relative w-full mb-12 md:mb-16 overflow-hidden rounded-[16px] ring-1 ring-border-strong"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.slow,
            ease: EASING.quint,
            delay: 0.24,
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          style={{ aspectRatio: "1440 / 810" }}
        >
          <Image
            src="/textures/terrain-brief.jpg"
            alt="Daylight mission brief: planned corridor from launch to objective around three annotated risk zones - no-GPS area, jammed communications, congested air."
            fill
            quality={85}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1440px"
            className="object-cover"
          />
          {/* Bottom gradient scrim for caption legibility */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-teal-deep via-transparent to-transparent"
            style={{ opacity: 0.4 }}
          />
        </motion.figure>

        {/* Three risk-zone callouts: routine annotations with oxblood underlines */}
        <motion.div
          className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-8"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          transition={{
            duration: DURATION.base,
            ease: EASING.quint,
            delay: 0.36,
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {RISK_ZONES.map((zone) => (
            <div
              key={zone.index}
              className="flex-1 min-w-[200px] border-b-2 border-oxblood-hi pb-4"
            >
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                FAILURE {zone.index} · {zone.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
