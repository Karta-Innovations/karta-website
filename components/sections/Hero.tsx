"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

interface KPI {
  label: string;
  value: string;
  unit?: string;
}

const KPIS: KPI[] = [
  { label: "Operating envelope", value: "GPS-denied" },
  { label: "Comms posture", value: "Edge-resilient" },
  { label: "Doctrine layer", value: "Bounded autonomy" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-ink"
    >
      {/* Parallax terrain */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/imagery/himalaya.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={92}
        />
      </motion.div>

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
        <CoordinateStrip
          left="KRT.OPS.2026 · 01"
          center="HERO · ENGAGED"
          right="17.385°N 78.486°E"
        />

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

          <aside className="lg:pt-10">
            <p className="text-fg-muted text-[17px] leading-[1.55] max-w-[42ch] mb-12">
              Karta is a deeptech robotics company building the navigation,
              decision and integration stack that turns unmanned systems into
              safe, self-aware teammates — across aerial, ground, and theatre
              scale.
            </p>
            <dl className="space-y-3">
              {KPIS.map((kpi) => (
                <div
                  key={kpi.label}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-5 py-2 border-t border-white/[0.08]"
                >
                  <dt className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                    {kpi.label}
                  </dt>
                  <dd className="font-mono text-[13px] tracking-[0.02em] text-fg text-right">
                    {kpi.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* Scroll cue */}
        <Link
          href="#manifesto"
          className="mt-16 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary hover:text-amber transition-colors group/scroll w-fit"
        >
          Scroll · 09 sections below
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
