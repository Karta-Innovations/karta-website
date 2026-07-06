"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { AmberSweep } from "@/components/primitives/AmberSweep";
import { SpecTable } from "@/components/primitives/SpecTable";
import { VEHICLES, type Vehicle } from "@/lib/catalog";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

// 3D vehicle scene auto-upgrades when .glb files appear at /models/{slug}.glb.
// While files are absent the probe returns false and the existing JPG renders alone.
const VehicleModelScene = dynamic(
  () =>
    import("@/components/3d/VehicleModelScene").then(
      (m) => m.VehicleModelScene,
    ),
  { ssr: false, loading: () => null },
);

export function Vehicles() {
  const reduce = useReducedMotionSafe();

  return (
    <section id="vehicles" className="relative bg-ink">
      <AmberSweep className="absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-24 md:pt-36 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <EyebrowTag className="mb-6">The platforms</EyebrowTag>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.035em] leading-[0.98] text-fg max-w-[14ch]">
              The platforms that carry it.
            </h2>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary mt-5">
              KARI · CERANA · DORSATA
            </p>
          </div>
          <div className="lg:pt-6">
            <p className="text-fg-muted text-[17px] leading-[1.65] max-w-[58ch]">
              Three airframes, three jobs. Kari scouts where GPS never reaches,
              Cerana holds the watch through comms loss, and Dorsata lifts the
              sensors that see through weather. Every one of them carries the
              same autonomy stack.
            </p>
            <Link
              href="/vehicles"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-amber hover:text-amber-hi transition-colors"
            >
              All platforms
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </div>

      {reduce ? (
        /* Reduced motion: plain vertical read - every platform reachable
           without the pinned horizontal scrub. */
        <div className="px-6 md:px-10 pb-24 space-y-10 mx-auto max-w-[1400px]">
          {VEHICLES.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} layout="stacked" />
          ))}
        </div>
      ) : (
        <VehicleCarousel />
      )}
    </section>
  );
}

/**
 * Horizontal scroll-hijack - shorter pin on mobile so touch users aren't
 * trapped in a long hijack. Own component so the useScroll target ref only
 * exists while the carousel branch is mounted (see useReducedMotionSafe).
 */
function VehicleCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.67%"]);

  return (
    <div ref={ref} className="relative h-[180vh] md:h-[260vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex items-center">
        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-10 px-6 md:px-10 will-change-transform"
        >
          {VEHICLES.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
          <div className="shrink-0 w-[40vw]" aria-hidden />
        </motion.div>
      </div>
    </div>
  );
}

interface VehicleCardProps {
  vehicle: Vehicle;
  /** "carousel" (default) sizes for the pinned strip; "stacked" fills the column. */
  layout?: "carousel" | "stacked";
}

function VehicleCard({ vehicle, layout = "carousel" }: VehicleCardProps) {
  return (
    <article
      className={`relative rounded-[32px] overflow-hidden ring-1 ring-edge bg-surface ${
        layout === "carousel"
          ? "shrink-0 w-[88vw] md:w-[78vw] lg:w-[72vw] xl:w-[1100px] h-[80vh] md:h-[78vh]"
          : "w-full h-[80vh] md:h-[78vh]"
      }`}
    >
      <Image
        src={vehicle.image}
        alt={vehicle.name}
        fill
        sizes="(max-width: 768px) 88vw, 72vw"
        className="object-cover"
        quality={88}
      />
      {/* 3D overlay - mounts only for vehicles listed in lib/3d-assets.ts. */}
      <VehicleModelScene
        slug={vehicle.slug}
        fallback={null}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
      <div className="absolute inset-0 p-8 md:p-14 flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-16">
        <div className="flex flex-col">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
            {vehicle.family}
          </span>
          <h3 className="mt-3 font-display text-[clamp(2.5rem,8vw,6rem)] font-medium tracking-[-0.04em] leading-[0.95] text-fg">
            {vehicle.name}
          </h3>
          <p className="mt-3 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
            {vehicle.descriptors.join(" · ")}
          </p>
          <p className="mt-auto pt-8 text-fg-muted text-[16px] leading-[1.6] max-w-[44ch]">
            {vehicle.byline}
          </p>
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-fg hover:text-amber transition-colors w-fit"
          >
            See platform specs
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>
        <aside className="lg:self-end lg:max-w-[320px] rounded-2xl bg-ink/65 backdrop-blur-md ring-1 ring-edge-strong p-6">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-3">
            Operating envelope
          </div>
          <SpecTable rows={vehicle.specs.slice(0, 5)} variant="ghost" />
        </aside>
      </div>
    </article>
  );
}
