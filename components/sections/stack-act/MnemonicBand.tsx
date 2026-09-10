"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { DURATION, EASING } from "@/lib/motion";

const RESPONSIBILITIES = [
  {
    statement: "Know where you are, and how sure you are.",
    product: "SkyAnchor",
    anchor: "skyanchor",
    layer: "Edge",
  },
  {
    statement: "Know what to do next, within approved intent.",
    product: "TENERE",
    anchor: "tenere",
    layer: "Command",
  },
  {
    statement: "Know why an action was allowed.",
    product: "Kiksuya",
    anchor: "kiksuya",
    layer: "Theatre",
  },
];

export function MnemonicBand() {
  const reduce = useReducedMotionSafe();

  const reveal: Variants = {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: DURATION.slow, ease: EASING.expo },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.055,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-surface px-5 py-20 md:px-8 md:py-28">
      <div className="relative z-10 mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-12">
        <motion.div
          variants={reveal}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -70px 0px" }}
        >
          <p className="chapter-label">
            The Karta stack
          </p>
          <h2 className="mt-5 max-w-[13ch] font-display-wide text-[clamp(2rem,4.4vw,3.5rem)] uppercase leading-[0.96] tracking-[0.01em] text-fg">
            One stack. Three responsibilities.
          </h2>
          <p className="mt-7 max-w-[42ch] text-[19px] leading-[1.7] text-fg-muted">
            Position with uncertainty. Adapt decisions within approved intent.
            Return a record that shows why. Each layer is useful alone and
            stronger as part of one accountable system.
          </p>
        </motion.div>

        <motion.ol
          variants={stagger}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -70px 0px" }}
          className="border-t border-edge"
        >
          {RESPONSIBILITIES.map((item, index) => (
            <Statement key={item.anchor} item={item} index={index} />
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

interface StatementProps {
  item: (typeof RESPONSIBILITIES)[number];
  index: number;
}

function Statement({ item, index }: StatementProps) {
  const variants: Variants = {
    hidden: { opacity: 0, transform: "translateY(10px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: DURATION.base, ease: EASING.expo },
    },
  };

  return (
    <motion.li variants={variants} className="border-b border-edge">
      <Link
        href={`/#${item.anchor}`}
        className="stack-link group grid gap-5 py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-7"
      >
        <span className="font-mono text-[12px] tracking-[0.18em] text-flare">
          0{index + 1}
        </span>
        <span>
          <span className="block font-display text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.08] text-fg transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1">
            {item.statement}
          </span>
          <span className="mt-2 block text-[15px] text-fg-tertiary">
            {item.product}
          </span>
        </span>
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-return">
          {item.layer}
          <span
            aria-hidden
            className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
          >
            +
          </span>
        </span>
      </Link>
    </motion.li>
  );
}
