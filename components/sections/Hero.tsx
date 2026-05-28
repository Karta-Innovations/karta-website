"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { HeroTerrain } from "@/components/3d/HeroTerrain";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-ink"
    >
      {/* Terrain layer - 3D when WebGL/motion allow, static himalaya.jpg otherwise */}
      <HeroTerrain sectionRef={ref} />

      {/* Layered scrims for depth + legibility */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent"
      />

      {/* Hairline grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5F5F0 1px, transparent 1px), linear-gradient(to bottom, #F5F5F0 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-32 lg:pt-40 pb-20 min-h-[100dvh] flex flex-col"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-12 lg:gap-20 mt-auto pt-24">
          <div>
            <EyebrowTag className="mb-7">
              Operational Autonomy
            </EyebrowTag>
            <h1 className="font-display text-[clamp(2.75rem,8.5vw,8rem)] font-medium tracking-[-0.045em] leading-[0.93] text-fg max-w-[16ch]">
              Autonomy that works where{" "}
              <span className="text-amber">GPS does not</span>.
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <NestedCTA href="/stack">See the autonomy stack</NestedCTA>
              <NestedCTA href="/engage" variant="ghost">
                Talk to engineering
              </NestedCTA>
            </div>
          </div>

          {/*
            Sanskrit etymology block - replaces v1's deeptech-lede + KPI list.
            "Karta" is the Sanskrit नौन for the agent, the one who acts. This
            is the brand's load-bearing meaning per the playbook. Treated as a
            manifesto marker, not decoration.
          */}
          <aside className="lg:pt-10">
            <div className="border-t border-white/[0.08] pt-7 max-w-[28ch] lg:ml-auto">
              <span
                lang="sa"
                className="font-devanagari block text-[clamp(4rem,8vw,7rem)] text-fg leading-[0.95] tracking-[-0.01em]"
              >
                कर्ता
              </span>
              <div className="mt-5 space-y-2">
                <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-amber">
                  karta · n. · sanskrit
                </div>
                <div className="font-mono text-[11px] tracking-[0.12em] text-fg-muted leading-[1.55]">
                  the one who acts. the agent.
                  <br />
                  accountable autonomy under human intent.
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Scroll cue */}
        <Link
          href="#manifesto"
          className="mt-16 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary hover:text-amber transition-colors group/scroll w-fit"
        >
          Scroll · 05 sections below
          <span className="inline-flex size-7 items-center justify-center rounded-full ring-1 ring-white/15 group-hover/scroll:ring-amber group-hover/scroll:bg-amber/10 transition-all">
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block"
            >
              <ArrowDown size={12} weight="bold" />
            </motion.span>
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
