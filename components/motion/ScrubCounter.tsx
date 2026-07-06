"use client";

import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";

interface ScrubCounterProps {
  /** Section progress driving the readout (usually from useSectionProgress). */
  progress: MotionValue<number>;
  /** Segment of `progress` mapped onto the counter's local 0-1 range. */
  range?: [number, number];
  /** Renders the local 0-1 value as display text, e.g. t => `T+${(t*4.2).toFixed(3)}s`. */
  format: (t: number) => string;
  className?: string;
}

/**
 * Scroll-scrubbed live readout. State updates only fire while the driving
 * MotionValue changes, so an off-screen counter costs nothing. Reads as live
 * telemetry without any background timers.
 */
export function ScrubCounter({
  progress,
  range = [0, 1],
  format,
  className,
}: ScrubCounterProps) {
  const [text, setText] = useState(() => format(0));

  useMotionValueEvent(progress, "change", (v) => {
    const span = range[1] - range[0];
    const local = span === 0 ? 0 : Math.max(0, Math.min(1, (v - range[0]) / span));
    setText(format(local));
  });

  return <span className={className}>{text}</span>;
}
