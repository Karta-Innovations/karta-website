"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

interface DriftProps {
  children: ReactNode;
  className?: string;
  /** How far the content travels while it crosses the viewport, in percent of its own height. */
  from?: number;
  to?: number;
}

/**
 * Moves its content a little slower or faster than the page as it scrolls
 * past. The stylesheet holds it still for reduced-motion visitors.
 */
export function Drift({ children, className, from = -6, to = 6 }: DriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${from}%`, `${to}%`]);
  return (
    <div ref={ref} className={cn("drift", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
