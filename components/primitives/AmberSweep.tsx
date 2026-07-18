"use client";

import { motion } from "framer-motion";

interface AmberSweepProps {
  /** Optional className for outer wrapper. */
  className?: string;
}

/**
 * Thin amber line that sweeps in from the left when entering the viewport,
 * ending in a small bright dot. Used as a section divider polish. Respects
 * prefers-reduced-motion via Framer Motion's reducedMotion="user" default.
 */
export function AmberSweep({ className }: AmberSweepProps) {
  return (
    <div
      aria-hidden
      className={`relative h-px overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-flare/0 via-flare/70 to-flare"
      />
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 block size-1.5 rounded-full bg-flare shadow-[0_0_12px_2px_oklch(0.543346_0.174006_29.697/0.45)]"
      />
    </div>
  );
}
