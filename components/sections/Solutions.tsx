"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import {
  VERTICALS,
  getFlagshipApplications,
  getPayload,
  type VerticalId,
} from "@/lib/solutions";
import { cn } from "@/lib/cn";

const TABS: VerticalId[] = ["enterprise", "defense"];

/**
 * Homepage "what we enable" band (approved direction C). A unified headline,
 * a segmented Enterprise/Defense toggle, and a four-tile mission strip that
 * swaps on toggle, routing into the two Solutions pages. Sells the missions
 * before the airframes below it.
 */
export function Solutions() {
  const [vertical, setVertical] = useState<VerticalId>("enterprise");
  const reduce = useReducedMotion();
  const config = VERTICALS[vertical];
  const tiles = getFlagshipApplications(vertical).slice(0, 4);

  return (
    <section
      id="solutions"
      className="relative bg-ink-2 px-6 md:px-10 py-32 md:py-44 border-b border-border overflow-hidden"
    >
      <div className="mx-auto max-w-[1100px] text-center">
        <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-amber">
          What Karta enables · 03
        </span>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium tracking-[-0.035em] leading-[1.0] text-fg mx-auto max-w-[20ch]">
          One autonomy stack. Two theatres of work.
        </h2>

        {/* Segmented toggle */}
        <div
          role="tablist"
          aria-label="Choose a theatre"
          className="mt-10 inline-flex items-center gap-1 rounded-full p-1 ring-1 ring-white/10 bg-ink/50"
        >
          {TABS.map((v) => {
            const on = v === vertical;
            return (
              <button
                key={v}
                role="tab"
                aria-selected={on}
                onClick={() => setVertical(v)}
                className={cn(
                  "relative rounded-full px-5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors",
                  on ? "text-ink" : "text-fg-muted hover:text-fg",
                )}
              >
                {on ? (
                  <motion.span
                    layoutId={reduce ? undefined : "solutions-toggle"}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 rounded-full bg-amber"
                    aria-hidden
                  />
                ) : null}
                <span className="relative">{VERTICALS[v].label}</span>
              </button>
            );
          })}
        </div>

        {/* Swapping subhead + tile strip */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={vertical}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-9 text-fg-muted text-[17px] md:text-[19px] leading-[1.5] mx-auto max-w-[40ch]">
              {config.heroTitle}
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {tiles.map((app, i) => {
                const lead = app.payloadSlugs
                  .slice(0, 2)
                  .map((s) => getPayload(s)?.chipLabel)
                  .filter(Boolean)
                  .join(" · ");
                return (
                  <Link
                    key={app.slug}
                    href={`/${vertical}`}
                    className="group rounded-2xl ring-1 ring-white/[0.08] bg-ink/40 hover:ring-amber/40 hover:bg-ink/60 transition-all p-5 flex flex-col min-h-[150px]"
                  >
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-[18px] font-medium tracking-[-0.02em] text-fg leading-[1.12]">
                      {app.name}
                    </h3>
                    <span className="mt-auto pt-4 font-mono text-[9.5px] tracking-[0.12em] uppercase text-fg-tertiary group-hover:text-amber-hi transition-colors">
                      {lead}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <NestedCTA href={`/${vertical}`}>
                Explore {config.label.toLowerCase()} solutions
              </NestedCTA>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quiet cross-link to the other theatre */}
        <div className="mt-10 flex justify-center gap-6">
          {TABS.filter((v) => v !== vertical).map((v) => (
            <Link
              key={v}
              href={`/${v}`}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-fg-tertiary hover:text-amber transition-colors"
            >
              Or see {VERTICALS[v].label.toLowerCase()}
              <ArrowUpRight size={12} weight="bold" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
