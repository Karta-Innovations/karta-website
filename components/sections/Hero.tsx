"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { createTimeline, stagger } from "animejs";
import { useInView } from "framer-motion";
import { useAnimeBoot } from "@/components/motion/useAnimeBoot";

const KARTA_SCRIPTS = [
  { script: "devanagari", lang: "hi", word: "कर्ता" },
  { script: "telugu", lang: "te", word: "కర్తా" },
  { script: "tamil", lang: "ta", word: "கர்த்தா" },
  { script: "kannada", lang: "kn", word: "ಕರ್ತಾ" },
  { script: "malayalam", lang: "ml", word: "കർത്താ" },
  { script: "gujarati", lang: "gu", word: "કર્તા" },
  { script: "gurmukhi", lang: "pa-Guru", word: "ਕਰਤਾ" },
  { script: "bangla", lang: "bn", word: "কর্তা" },
  { script: "odia", lang: "or", word: "କର୍ତ୍ତା" },
] as const;

function buildLaunchBoot(scope: HTMLElement) {
  const q = (name: string) =>
    scope.querySelectorAll<HTMLElement>(`[data-boot="${name}"]`);

  const tl = createTimeline({ defaults: { ease: "outExpo" } });

  tl.add(
    q("headline"),
    {
      opacity: [0, 1],
      translateY: ["105%", "0%"],
      duration: 720,
      delay: stagger(70),
    },
    "-=300",
  );

  tl.add(
    q("statement"),
    { opacity: [0, 1], translateY: [14, 0], duration: 560 },
    "-=430",
  );

  tl.add(
    q("deck"),
    { opacity: [0, 1], translateY: [12, 0], duration: 560 },
    "-=400",
  );

  tl.add(
    q("cta"),
    { opacity: [0, 1], translateY: [10, 0], duration: 480, delay: stagger(50) },
    "-=420",
  );

  tl.add(
    q("identity"),
    { opacity: [0, 1], translateY: [8, 0], duration: 520 },
    "-=330",
  );

  return tl;
}

function HeroSignalField({ active }: { active: boolean }) {
  return (
    <div className="hero-signal-field" data-active={active} aria-hidden>
      <svg viewBox="0 0 640 640" fill="none">
        <g className="hero-signal__terrain">
          <path
            d="M86 472 L196 414 L286 346 L392 294 L546 176 L576 222 L426 338 L318 392 L224 466 L112 520 Z"
            fill="var(--color-sage)"
            fillOpacity="0.08"
            stroke="var(--color-mineral)"
            strokeOpacity="0.2"
          />
          <path
            d="M68 518 C166 470 214 394 300 376 C398 356 450 258 580 214"
            stroke="var(--color-field-tan)"
            strokeWidth="1"
            opacity="0.34"
          />
          <path
            d="M54 548 C170 514 226 438 314 416 C424 388 486 292 598 252"
            stroke="var(--color-mineral)"
            strokeWidth="1"
            opacity="0.2"
          />
          <path
            d="M102 440 C190 402 236 334 314 318 C394 300 438 228 540 188"
            stroke="var(--color-mineral)"
            strokeWidth="1"
            opacity="0.17"
          />
        </g>
        <g className="hero-signal__orbit-a">
          <circle
            cx="320"
            cy="320"
            r="214"
            stroke="var(--color-return)"
            strokeWidth="1.2"
            strokeDasharray="2 11 42 16"
            opacity="0.58"
          />
          <rect x="514" y="238" width="12" height="12" fill="var(--color-flare)" />
        </g>
        <g className="hero-signal__orbit-b">
          <circle
            cx="320"
            cy="320"
            r="154"
            stroke="var(--color-violet-hi)"
            strokeWidth="1"
            strokeDasharray="70 18 4 16"
            opacity="0.5"
          />
          <rect
            className="hero-signal__node"
            x="233"
            y="185"
            width="10"
            height="10"
            fill="var(--color-return)"
          />
        </g>
        <circle
          cx="320"
          cy="320"
          r="88"
          stroke="var(--color-edge-strong)"
          strokeWidth="1"
        />
        <path
          className="hero-signal__trace"
          d="M94 438 C174 390 190 254 286 278 C370 300 406 196 548 168"
          stroke="var(--color-route)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="26 14 4 14"
        />
        <path
          d="M94 438 C174 390 190 254 286 278 C370 300 406 196 548 168"
          stroke="var(--color-route)"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.05"
        />
        <rect
          className="hero-signal__node"
          x="88"
          y="432"
          width="12"
          height="12"
          fill="var(--color-flare)"
        />
        <rect
          className="hero-signal__node"
          x="280"
          y="272"
          width="12"
          height="12"
          fill="var(--color-violet-hi)"
        />
        <rect
          className="hero-signal__node"
          x="542"
          y="162"
          width="12"
          height="12"
          fill="var(--color-return)"
        />
      </svg>
    </div>
  );
}

function KartaIdentity() {
  return (
    <div
      data-boot="identity"
      className="hero-karta-cycle min-w-0 border-t border-edge pt-5 will-change-transform lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:grid lg:w-full lg:grid-cols-[minmax(16rem,0.82fr)_minmax(20rem,1.18fr)] lg:items-end lg:gap-x-[clamp(3rem,8vw,8rem)]"
    >
      <div className="min-w-0">
        <p className="sr-only">Karta, written across Indian scripts.</p>
        <div className="hero-karta-cycle__viewport" aria-hidden>
          {KARTA_SCRIPTS.map(({ script, lang, word }) => (
            <span
              key={script}
              lang={lang}
              className="hero-karta-cycle__item font-indic"
            >
              {word}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-3">
          <span aria-hidden className="h-px w-9 shrink-0 bg-flare" />
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-return">
            Name / the one who acts
          </p>
        </div>
      </div>

      <div className="min-w-0 lg:pb-1">
        <p className="mt-4 max-w-[32ch] font-display text-[clamp(1rem,1.35vw,1.15rem)] font-medium leading-[1.2] text-fg lg:mt-0">
          Karta - the one who acts, and answers for it.
        </p>
        <p className="mt-2 max-w-[42ch] text-[12px] leading-[1.55] text-fg-muted">
          The machine acts; a human answers. The record is designed to show why.
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const signalActive = useInView(ref, { margin: "200px 0px" });

  useAnimeBoot(ref, buildLaunchBoot);

  return (
    <section
      id="launch"
      ref={ref}
      data-signal-active={signalActive}
      className="boot-scope relative min-h-[100svh] overflow-hidden bg-ink"
    >
      <div aria-hidden className="bg-aurora-soft absolute inset-0" />
      <div aria-hidden className="grid-overlay absolute inset-0 opacity-[0.08]" />
      <HeroSignalField active={signalActive} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[90rem] flex-col justify-start px-6 pb-12 pt-28 md:px-10 lg:justify-end lg:pb-[clamp(2.5rem,6vh,4.5rem)] lg:pt-32 xl:px-16">
        <div className="grid w-full min-w-0 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:grid-rows-[auto_auto] lg:items-end lg:gap-x-[clamp(4rem,10vw,10rem)] lg:gap-y-8">
          <div className="min-w-0 max-w-[42rem] lg:col-start-1 lg:row-start-1">
            <p
              data-boot="statement"
              className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-flare will-change-transform"
            >
              <span aria-hidden className="size-2 bg-flare" />
              Command that survives uncertainty
            </p>

            <h1 className="font-display-wide uppercase text-fg">
              <span className="block overflow-hidden">
                <span
                  data-boot="headline"
                  className="block text-[clamp(2.25rem,4.4vw,4rem)] leading-[0.94] will-change-transform"
                >
                  Operational
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-boot="headline"
                  className="block text-[clamp(2.25rem,4.4vw,4rem)] leading-[0.94] text-return will-change-transform"
                >
                  Autonomy
                </span>
              </span>
            </h1>

            <p
              data-boot="statement"
              className="mt-8 max-w-[32ch] font-display text-[clamp(1.35rem,1.8vw,1.75rem)] font-medium leading-[1.12] text-fg will-change-transform"
            >
              Navigation, decision and doctrine, built as one system.
            </p>
          </div>

          <div className="min-w-0 max-w-[32rem] lg:col-start-2 lg:row-start-1 lg:justify-self-end">
            <p
              data-boot="deck"
              className="max-w-[48ch] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-fg-muted will-change-transform"
            >
              Built for the environments autonomy will actually face, where
              position degrades, links disappear, and every action still needs
              a reason.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="/engage"
                data-boot="cta"
                className="pressable inline-flex min-h-11 items-center bg-flare px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-on-flare hover:bg-flare-hi"
              >
                Talk to engineering
              </a>
              <Link
                href="#brief"
                data-boot="cta"
                className="pressable group inline-flex min-h-11 items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fg hover:text-flare"
              >
                See it in operation
                <ArrowRight
                  size={13}
                  weight="bold"
                  aria-hidden
                  className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
          <KartaIdentity />
        </div>
      </div>
    </section>
  );
}
