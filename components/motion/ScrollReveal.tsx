"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  asChild?: boolean;
  y?: number;
  blur?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: number) => ({
    transition: {
      staggerChildren: custom,
      delayChildren: 0,
    },
  }),
};

const childVariants: Variants = {
  hidden: (custom: { y: number; blur: number }) => ({
    opacity: 0,
    y: custom.y,
    filter: `blur(${custom.blur}px)`,
  }),
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  y = 36,
  blur = 8,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      variants={containerVariants}
      custom={stagger}
      transition={{ delayChildren: delay }}
      className={cn(className)}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div key={i} variants={childVariants} custom={{ y, blur }}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants} custom={{ y, blur }}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
