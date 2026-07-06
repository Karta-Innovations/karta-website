"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASING, DURATION } from "@/lib/motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type RevealVariant = "fade" | "slideUp" | "blurUp";

interface RevealProps {
  children: ReactNode;
  /** Visual entrance: plain fade, translate-up, or the signature blur+lift. */
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  /** Margin passed to the in-view observer, e.g. "0px 0px -120px 0px". */
  viewportMargin?: string;
  once?: boolean;
}

const HIDDEN: Record<RevealVariant, Record<string, string | number>> = {
  fade: { opacity: 0 },
  slideUp: { opacity: 0, y: 26 },
  blurUp: { opacity: 0, y: 26, filter: "blur(6px)" },
};

const VISIBLE: Record<RevealVariant, Record<string, string | number>> = {
  fade: { opacity: 1 },
  slideUp: { opacity: 1, y: 0 },
  blurUp: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * Shared in-view entrance. Sections should reach for this instead of
 * hand-rolling variants; reduced motion collapses every variant to a plain
 * opacity step so nothing stays invisible.
 */
export function Reveal({
  children,
  variant = "blurUp",
  delay = 0,
  duration = DURATION.reveal,
  className,
  viewportMargin = "0px 0px -80px 0px",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotionSafe();
  const v: RevealVariant = reduce ? "fade" : variant;

  return (
    <motion.div
      className={className}
      initial={HIDDEN[v]}
      whileInView={VISIBLE[v]}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: EASING.expo,
      }}
    >
      {children}
    </motion.div>
  );
}
