"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";

interface Envelope {
  id: string;
  label: string;
  detail: string;
  doctrine: string;
  image: string;
}

const ENVELOPES: Envelope[] = [
  {
    id: "highaltitude",
    label: "High altitude",
    detail: "Thin air · cold soak · non-mapped corridors",
    doctrine:
      "Cold-soak performance, thin-air aerodynamics, terrain-relative navigation across corridors no atlas has surveyed.",
    image: "/imagery/himalaya.jpg",
  },
  {
    id: "arid",
    label: "Arid desert",
    detail: "Sand-laden optics · thermal extremes",
    doctrine:
      "Particulate-resistant optics, thermal extremes, long-range ISR over extended-LOS desert envelopes.",
    image: "/imagery/thar.jpeg",
  },
  {
    id: "littoral",
    label: "Maritime littoral",
    detail: "Salt-air sustainment · monsoon visibility",
    doctrine:
      "Salt-air sustainment, monsoon visibility, autonomous coastal patrol cooperation against degraded sensing.",
    image: "/imagery/coast.jpg",
  },
  {
    id: "urban",
    label: "Urban dense",
    detail: "GNSS multi-path · near-ground bounds",
    doctrine:
      "Dense GNSS multi-path, near-ground autonomy bounds, infrastructure-monitoring civil use.",
    image: "/imagery/urban-industrial.jpg",
  },
  {
    id: "contested",
    label: "Contested forward",
    detail: "Comms-degraded · hardened doctrine bounds",
    doctrine:
      "Comms-degraded posture, hardened doctrine bounds, multi-vehicle deconfliction at scale.",
    image: "/imagery/border-ridge.jpg",
  },
];

export function Geographies() {
  const [active, setActive] = useState<Envelope>(ENVELOPES[0]);

  return (
    <section
      id="envelopes"
      className="relative bg-ink-2 px-6 md:px-10 py-32 md:py-48 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        <CoordinateStrip
          left="KRT.OPS.2026 · 08"
          center="ENVELOPES · OPERATIONAL"
          right="05 TERRAIN CLASSES"
          className="mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <EyebrowTag className="mb-6">Operating envelopes · 08</EyebrowTag>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.035em] leading-[0.98] text-fg max-w-[16ch]">
              Engineered for the envelope it actually flies.
            </h2>
            <p className="mt-8 text-fg-muted text-[17px] leading-[1.65] max-w-[58ch]">
              The operational space is not one terrain. Karta&apos;s integration
              matrix covers five distinct envelopes, each a deliberate row in
              our test programme — high altitude, arid desert, maritime
              littoral, urban dense, and contested forward.
            </p>

            <div className="mt-12 rounded-2xl bg-white/[0.025] ring-1 ring-white/[0.06] p-6 lg:p-7">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber mb-3">
                  Envelope · {active.id.toUpperCase()}
                </div>
                <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-fg mb-1">
                  {active.label}
                </h3>
                <div className="font-mono text-[12px] tracking-[0.12em] text-fg-tertiary mb-4">
                  {active.detail}
                </div>
                <p className="text-fg-muted text-[15px] leading-[1.6]">
                  {active.doctrine}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Envelope picker — terrain photography grid with active enlargement */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 self-start">
            {ENVELOPES.map((env, i) => {
              const isActive = active.id === env.id;
              const isFirst = i === 0;
              return (
                <button
                  key={env.id}
                  type="button"
                  onMouseEnter={() => setActive(env)}
                  onFocus={() => setActive(env)}
                  onClick={() => setActive(env)}
                  aria-pressed={isActive}
                  className={`relative overflow-hidden rounded-2xl ring-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "ring-amber/40 scale-[1.02]"
                      : "ring-white/[0.06] hover:ring-white/[0.18]"
                  } ${isFirst ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                >
                  <Image
                    src={env.image}
                    alt={env.label}
                    fill
                    sizes="(max-width: 1024px) 50vw, 360px"
                    className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "scale-[1.06]" : "scale-100"
                    }`}
                    quality={80}
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-ink/80 to-ink/10"
                        : "bg-gradient-to-t from-ink/85 to-ink/40"
                    }`}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
                    <span
                      className={`font-mono text-[10px] tracking-[0.22em] uppercase mb-1 ${
                        isActive ? "text-amber" : "text-fg-tertiary"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-base md:text-lg font-medium tracking-[-0.01em] leading-[1.15] ${
                        isActive ? "text-fg" : "text-fg-muted"
                      }`}
                    >
                      {env.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
