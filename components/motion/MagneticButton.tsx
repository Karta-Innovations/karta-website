"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Magnetic-hover wrapper. Uses Framer useMotionValue OUT of React's render cycle
 * so we never re-render on cursor move. (Required by design-taste-frontend skill.)
 */
export function MagneticButton({
  children,
  className,
  strength = 18,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(useTransform(mx, (v: number) => v * strength), {
    stiffness: 160,
    damping: 18,
    mass: 0.4,
  });
  const y = useSpring(useTransform(my, (v: number) => v * strength), {
    stiffness: 160,
    damping: 18,
    mass: 0.4,
  });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) / rect.width);
    my.set((e.clientY - cy) / rect.height);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
