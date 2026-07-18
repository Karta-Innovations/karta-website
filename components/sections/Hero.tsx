"use client";

import Link from "next/link";
import { useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { useAnimeBoot } from "@/components/motion/useAnimeBoot";

/**
 * Boot choreography for the launch hero:
 * eyebrow → headline (Operational, then AUTONOMY) → statement → deck & CTAs → telemetry strip
 * Orchestrated via anime.js with smooth, deliberate spacing.
 */
function buildLaunchBoot(scope: HTMLElement) {
  const q = (name: string) =>
    scope.querySelectorAll<HTMLElement>(`[data-boot="${name}"]`);

  const tl = createTimeline({ defaults: { ease: "outExpo" } });

  // Eyebrow rises in
  tl.add(q("eyebrow"), { opacity: [0, 1], translateY: [14, 0], duration: 600 });

  // Headline lines rise line by line
  tl.add(
    q("headline"),
    {
      opacity: [0, 1],
      translateY: ["0.8em", "0em"],
      duration: 900,
      delay: stagger(120),
    },
    "-=400",
  );

  // Statement line settles
  tl.add(
    q("statement"),
    { opacity: [0, 1], translateY: [16, 0], duration: 800 },
    "-=600",
  );

  // Deck copy
  tl.add(
    q("deck"),
    { opacity: [0, 1], translateY: [14, 0], duration: 800 },
    "-=650",
  );

  // CTAs appear with stagger
  tl.add(
    q("cta"),
    { opacity: [0, 1], translateY: [12, 0], duration: 700, delay: stagger(80) },
    "-=700",
  );

  // Telemetry strip fades in at the bottom
  tl.add(
    q("telemetry"),
    { opacity: [0, 1], duration: 600 },
    "-=500",
  );

  return tl;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useAnimeBoot(ref, buildLaunchBoot);

  return (
    <section
      id="launch"
      ref={ref}
      className="boot-scope relative min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* Aurora soft atmosphere layer - teal/sand wash to lift the hero */}
      <div
        aria-hidden
        className="bg-aurora-soft absolute inset-0 pointer-events-none"
      />

      {/* Content column */}
      <div className="relative z-10 mx-auto h-full max-w-[90rem] px-[clamp(1rem,4vw,4rem)] flex flex-col justify-center items-start pt-32 pb-16 md:pt-36 md:pb-20">
        {/* Mono eyebrow: mission clock and coordinates */}
        <div data-boot="eyebrow" className="mb-[clamp(3rem,8vw,6rem)]">
          <div className="font-mono text-sand text-[11px] tracking-[0.22em] uppercase font-medium">
            <span>Karta Innovations · T-00:00:00 · Launch · 17.454 N 78.500 E</span>
          </div>
        </div>

        {/* Headline: Operational / AUTONOMY */}
        <h1 className="font-display font-display-wide uppercase text-fg mb-[clamp(2rem,4vw,3rem)]">
          <span
            data-boot="headline"
            className="block text-[clamp(2.2rem,5.8vw,5.2rem)] leading-[0.9] will-change-transform"
          >
            Operational
          </span>
          <span
            data-boot="headline"
            className="block text-[clamp(3.2rem,10.2vw,9.4rem)] leading-[0.88] texture-text texture-text-drift will-change-transform"
          >
            Autonomy
          </span>
        </h1>

        {/* Statement: the memory hook */}
        <p
          data-boot="statement"
          className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1] text-fg mb-[clamp(1.5rem,3vw,2.5rem)] max-w-[52ch] will-change-transform"
        >
          Command that survives uncertainty.
        </p>

        {/* Deck: plain definition */}
        <p
          data-boot="deck"
          className="text-fg-muted text-[clamp(1rem,0.35vw_+_0.92rem,1.125rem)] leading-[1.65] max-w-[52ch] mb-[clamp(2rem,5vw,3rem)] will-change-transform"
        >
          Karta builds the autonomy layer that helps unmanned systems stay oriented, act within human-approved intent, and return a reviewable record as operating conditions degrade.
        </p>

        {/* CTAs: primary button + secondary text link */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-[clamp(4rem,10vw,6rem)]">
          <a
            href="/engage"
            data-boot="cta"
            className="inline-flex px-6 py-3 rounded-full bg-sand text-warm-ink font-medium text-[14px] tracking-[-0.005em] transition-all duration-300 hover:bg-sand-hi active:scale-[0.97] will-change-transform shadow-sm"
          >
            Talk to engineering
          </a>
          <Link
            href="#brief"
            data-boot="cta"
            className="inline-flex items-center gap-2 text-fg font-medium text-[14px] tracking-[-0.005em] transition-colors hover:text-sand will-change-transform group"
          >
            See autonomy in operation
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Hairline separator */}
        <hr className="h-px w-full bg-border mb-[clamp(1.5rem,3vw,2rem)]" aria-hidden />

        {/* Telemetry strip: mission scenario info */}
        <div
          data-boot="telemetry"
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-2 gap-x-8 w-full text-[11px] font-mono tracking-[0.12em] uppercase will-change-opacity"
        >
          <div className="text-fg-tertiary">
            Representative Sortie · Illustrative
          </div>
          <div className="text-aqua tabular-nums flex flex-wrap gap-x-6 gap-y-1">
            <span>Distance 72.4 km</span>
            <span>Duration 01:42:00</span>
            <span className="hidden md:inline">Max Elev 1,850 m</span>
            <span className="hidden md:inline">Weather Clear</span>
            <span className="hidden lg:inline">Wind 12 kts NE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
