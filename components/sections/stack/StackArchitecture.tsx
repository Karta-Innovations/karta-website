"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react/dist/ssr";
import {
  DIAGRAM_BANDS,
  DIAGRAM_EXCHANGES,
  DIAGRAM_TOP,
  DIAGRAM_BOTTOM,
  STACK_BY_SLUG,
  type DiagramBand,
  type DiagramExchange,
} from "./stack-data";

/* ------------------------------------------------------------------ *
 * The hero: the autonomy stack as three decision-altitudes. Intent and
 * doctrine flow DOWN (azure), situation and audit flow UP (cyan). Bands
 * link to the layer sections below.
 * ------------------------------------------------------------------ */

export function StackArchitecture() {
  const reduce = useReducedMotionSafe();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section aria-labelledby="stack-arch-title" className="relative">
      <div className="mx-auto max-w-[640px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
          The architecture
        </p>
        <h2 id="stack-arch-title" className="sr-only">
          Stack architecture
        </h2>
        <p className="mt-4 text-[17px] leading-[1.6] text-fg-muted">
          Intent and doctrine flow down. Situation and audit flow back up.
          Three layers, one closed loop.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        className="relative mx-auto mt-10 max-w-[820px]"
      >
        <FlowMarker item={item}>{DIAGRAM_TOP}</FlowMarker>
        <FlowArrow item={item} />

        {DIAGRAM_BANDS.map((band, i) => (
          <Fragment key={band.slug}>
            <DiagramBandRow band={band} item={item} />
            {i < DIAGRAM_BANDS.length - 1 && (
              <ExchangeRow exchange={DIAGRAM_EXCHANGES[i]} item={item} />
            )}
          </Fragment>
        ))}

        <FlowArrow item={item} />
        <FlowMarker item={item}>{DIAGRAM_BOTTOM}</FlowMarker>
      </motion.div>

      <p className="mx-auto mt-8 max-w-[520px] text-center font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
        Every action becomes the next situation
      </p>
    </section>
  );
}

function FlowMarker({
  children,
  item,
}: {
  children: React.ReactNode;
  item: Variants;
}) {
  return (
    <motion.p
      variants={item}
      className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-fg-tertiary"
    >
      {children}
    </motion.p>
  );
}

function FlowArrow({ item }: { item: Variants }) {
  return (
    <motion.div variants={item} className="flex justify-center py-2.5" aria-hidden>
      <ArrowDown size={15} weight="bold" className="text-amber" />
    </motion.div>
  );
}

function DiagramBandRow({ band, item }: { band: DiagramBand; item: Variants }) {
  const layer = STACK_BY_SLUG[band.slug];
  return (
    <motion.div variants={item}>
      <Link
        href={`#${band.slug}`}
        className="group relative block overflow-hidden rounded-[20px] bg-gradient-to-b from-indigo/60 to-surface ring-1 ring-edge shadow-[0_24px_56px_-44px_rgba(0,0,0,0.5)] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:ring-edge-strong"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/45 to-transparent"
        />
        <div className="flex items-center justify-between gap-5 p-5 md:p-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
              {layer.number} · {layer.layer} · {band.altitude}
            </p>
            <h3 className="font-display mt-1.5 text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-[1] tracking-[-0.035em] text-fg">
              {layer.product}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[13px] leading-[1.4] text-fg-muted">{band.job}</p>
            {band.proof ? (
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-amber">
                {band.proof}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ExchangeRow({
  exchange,
  item,
}: {
  exchange: DiagramExchange;
  item: Variants;
}) {
  return (
    <motion.div
      variants={item}
      className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5 py-3"
    >
      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary">
        <ArrowDown aria-hidden size={13} weight="bold" className="text-amber" />
        {exchange.down}
      </span>
      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary">
        {exchange.up}
        <ArrowUp aria-hidden size={13} weight="bold" className="text-gold" />
      </span>
    </motion.div>
  );
}
