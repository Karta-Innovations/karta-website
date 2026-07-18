"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * THE MNEMONIC BAND
 * Light sand field with three connected statements + product names.
 * Eyebrow: mission clock. Headline: the anchor. Three statements below.
 */
export function MnemonicBand() {
  const reduce = useReducedMotionSafe();

  const reveal: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.1 },
    },
  };

  return (
    <section className="relative bg-sand px-6 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        {/* Eyebrow + headline */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-warm-ink">
            <span>T+01:08:30 · THE ANSWER</span>
          </p>
          <h2 className="mt-4 font-display max-w-[20ch] text-[clamp(2rem,5vw,4.2rem)] font-medium leading-[1] tracking-[-0.04em] text-warm-ink">
            Three responsibilities close the loop.
          </h2>
        </motion.div>

        {/* Three statements */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          className="mt-14 space-y-8 md:mt-20 md:space-y-10"
        >
          <Statement
            statement="Know where you are, and how sure you are."
            product="SkyAnchor"
            anchor="skyanchor"
            isFirst
          />
          <Statement
            statement="Know what to do next, within approved intent."
            product="TENERE"
            anchor="tenere"
          />
          <Statement
            statement="Know why an action was allowed."
            product="Kiksuya"
            anchor="kiksuya"
            isLast
          />
        </motion.div>
      </div>
    </section>
  );
}

interface StatementProps {
  statement: string;
  product: string;
  anchor: string;
  isFirst?: boolean;
  isLast?: boolean;
}

function Statement({ statement, product, anchor }: StatementProps) {
  const reduce = useReducedMotionSafe();

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={item}
      className="relative border-l-2 border-warm-ink/30 pl-6"
    >
      {/* Connector dot */}
      <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-warm-ink" />

      <p className="text-[clamp(1.05rem,1.9vw,1.35rem)] leading-[1.5] text-warm-ink">
        {statement}
      </p>
      <Link
        href={`/#${anchor}`}
        className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood transition-colors hover:text-oxblood-hi"
      >
        {product}
        <span aria-hidden className="text-xs">→</span>
      </Link>
    </motion.div>
  );
}
