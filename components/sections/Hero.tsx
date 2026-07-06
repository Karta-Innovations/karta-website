"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { useAnimeBoot } from "@/components/motion/useAnimeBoot";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { HeroTerrain } from "@/components/3d/HeroTerrain";
import { ScrubCounter } from "@/components/motion/ScrubCounter";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

/**
 * Boot choreography - one orchestrated anime.js timeline, grave and
 * unhurried: eyebrow, then the headline rising line by line, copy and
 * CTAs settling in behind it, the कर्ता etymology blooming out of blur
 * on the opposite column, and finally the instrument row. Roughly 2.4s
 * end to end; every target is [data-boot]-gated in CSS so no-JS and
 * reduced-motion visitors simply see the finished frame.
 */
function buildHeroBoot(scope: HTMLElement) {
  const q = (name: string) =>
    scope.querySelectorAll<HTMLElement>(`[data-boot="${name}"]`);

  const tl = createTimeline({ defaults: { ease: "outExpo" } });
  tl.add(q("eyebrow"), { opacity: [0, 1], translateY: [14, 0], duration: 700 });
  tl.add(
    q("line"),
    {
      opacity: [0, 1],
      translateY: ["0.7em", "0em"],
      duration: 1100,
      delay: stagger(140),
    },
    "-=450",
  );
  tl.add(
    q("body"),
    { opacity: [0, 1], translateY: [18, 0], duration: 900 },
    "-=750",
  );
  tl.add(
    q("cta"),
    { opacity: [0, 1], translateY: [14, 0], duration: 800, delay: stagger(90) },
    "-=700",
  );
  tl.add(
    q("etym"),
    { opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"], duration: 1400 },
    "-=950",
  );
  tl.add(
    q("etym-meta"),
    { opacity: [0, 1], translateY: [10, 0], duration: 700, delay: stagger(90) },
    "-=1000",
  );
  tl.add(q("foot"), { opacity: [0, 1], duration: 700 }, "-=500");
  return tl;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.0]);

  useAnimeBoot(ref, buildHeroBoot);

  return (
    <section
      ref={ref}
      className="boot-scope relative min-h-[100dvh] overflow-hidden bg-ink"
    >
      {/* Terrain layer - 3D when WebGL/motion allow, static terrain imagery otherwise */}
      <HeroTerrain sectionRef={ref} />

      {/* Layered scrims for depth + legibility */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent"
      />

      {/* Aurora bloom - the azure/cyan wash that lifts the hero out of the black */}
      <div
        aria-hidden
        className="bg-aurora absolute inset-0 opacity-[0.55] pointer-events-none"
      />

      {/* Hairline grid - faint instrument lines */}
      <div aria-hidden className="grid-overlay absolute inset-0 opacity-70" />

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-32 lg:pt-40 pb-20 min-h-[100dvh] flex flex-col"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-12 lg:gap-20 mt-auto pt-6">
          <div>
            <div data-boot="eyebrow">
              <EyebrowTag className="mb-7">
                Operational Autonomy
              </EyebrowTag>
            </div>
            <h1 className="font-display text-[clamp(2.55rem,6.8vw,6rem)] font-medium tracking-[-0.045em] leading-[0.93] text-fg max-w-[18ch]">
              <span data-boot="line" className="block will-change-transform">
                Autonomy that works
              </span>
              <span data-boot="line" className="block will-change-transform">
                where <span className="text-amber">GPS does not</span>.
              </span>
            </h1>
            <p
              data-boot="body"
              className="mt-8 max-w-[31ch] text-[17px] leading-[1.7] text-fg-muted sm:max-w-[58ch]"
            >
              Karta builds the intelligence that keeps unmanned aircraft flying
              when GPS is jammed, links drop and one operator is running twelve
              aircraft. A human stays in command of every call that matters.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span data-boot="cta" className="inline-flex">
                <NestedCTA href="/stack">Explore the autonomy layer</NestedCTA>
              </span>
              <span data-boot="cta" className="inline-flex">
                <NestedCTA href="/engage" variant="ghost">
                  Talk to engineering
                </NestedCTA>
              </span>
            </div>
          </div>

          {/*
            Sanskrit etymology block. "Karta" is the Sanskrit noun for the
            agent, the one who acts - the brand's load-bearing meaning per
            the playbook. Treated as a manifesto marker, not decoration.
          */}
          <aside className="lg:pt-10">
            <div
              data-boot="etym"
              className="border-t border-edge pt-7 max-w-[28ch] lg:ml-auto"
            >
              <span
                lang="sa"
                className="font-devanagari block text-[clamp(4rem,8vw,7rem)] text-fg leading-[0.95] tracking-[-0.01em]"
              >
                कर्ता
              </span>
              <div className="mt-5 space-y-2">
                <div
                  data-boot="etym-meta"
                  className="font-mono text-[10px] tracking-[0.28em] uppercase text-amber"
                >
                  karta · n. · the agent
                </div>
                <div
                  data-boot="etym-meta"
                  className="font-mono text-[11px] tracking-[0.12em] text-fg-muted leading-[1.55]"
                >
                  the one who acts.
                  <br />
                  accountable autonomy under human intent.
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Scroll cue + live position-confidence readout. The readout scrubs
            down with scroll, mirroring the terrain contours dissolving - the
            first hint that signal is a privilege here. */}
        <div
          data-boot="foot"
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          <Link
            href="#denied"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary hover:text-amber transition-colors group/scroll w-fit"
          >
            Scroll to explore
            <span className="inline-flex size-7 items-center justify-center rounded-full ring-1 ring-edge-strong group-hover/scroll:ring-amber group-hover/scroll:bg-amber/10 transition-all">
              <motion.span
                animate={reduce ? undefined : { y: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="block"
              >
                <ArrowDown size={12} weight="bold" />
              </motion.span>
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-baseline gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary tabular-nums">
            POS CONFIDENCE
            {reduce ? (
              <span className="text-fg-muted">0.99</span>
            ) : (
              <ScrubCounter
                progress={scrollYProgress}
                format={(t) => (0.99 - t * 0.55).toFixed(2)}
                className="text-fg-muted"
              />
            )}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
