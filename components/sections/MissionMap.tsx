"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * The fault-conditions visual: one cinematic mission map. A night-ops
 * isometric terrain plate (public/imagery/mission-corridor.jpg) carries the
 * whole story - a dashed route from TAKE OFF to LANDING whose color shifts
 * per phase, crossing three glowing fault zones (no-GPS red, comms-jam cyan,
 * multi-aircraft amber). The plate sits on a deep navy void that melts into
 * the section's plunge background. This component adds:
 *
 * - a dark-glass FAULT CONDITIONS panel (real, selectable, translatable HTML)
 *   in the plate's empty bottom-left void (lg+ only),
 * - soft pulsing halos over the three fault zones (reduced-motion safe),
 * - slow parallax drift, matching the Hyderabad anchor section,
 * - an HTML mission-stats band under the map (Hyderabad envelope-band grammar).
 *
 * On small screens the map reads as a cinematic figure and the fault list
 * renders below it as normal HTML, so nothing depends on baked text staying
 * legible at phone sizes. Screen readers get the alt text plus the HTML list.
 */

interface FaultZone {
  code: string;
  label: string;
  /** One plain-language line - the only copy this section carries now. */
  line: string;
  /** Halo center, % of the plate (x of 1535, y of 1024). */
  x: number;
  y: number;
  /** Halo diameter as % of plate width. */
  size: number;
  /** Zone accent, matching the baked zone color via site tokens. */
  color: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const pct = (v: number, of: number) => round2((v / of) * 100);

/* Night-ops plate, rendered full-frame. Halo centers measured off the
   source image. */
const PLATE_W = 1535;
const PLATE_H = 1024;

const ZONES: FaultZone[] = [
  {
    code: "01",
    label: "No GPS area",
    line: "Navigation continues on vision and terrain matching alone.",
    x: pct(640, PLATE_W),
    y: pct(390, PLATE_H),
    size: 14,
    color: "var(--color-alert)",
  },
  {
    code: "02",
    label: "Comms jammed",
    line: "The aircraft flies its plan and reports back when the link returns.",
    x: pct(945, PLATE_W),
    y: pct(518, PLATE_H),
    size: 12,
    color: "var(--color-gold)",
  },
  {
    code: "03",
    label: "Multiple aircraft",
    line: "One operator supervises the flight; deconfliction is automatic.",
    x: pct(1140, PLATE_W),
    y: pct(375, PLATE_H),
    size: 13,
    color: "var(--color-signal)",
  },
];

const STATS: { k: string; v: string }[] = [
  { k: "Distance", v: "72.4 km" },
  { k: "Duration", v: "01:42:00" },
  { k: "Max elevation", v: "1,850 m" },
  { k: "Weather", v: "Clear" },
  { k: "Wind", v: "12 kts NE" },
];

const MAP_ALT =
  "Night mission map: an isometric mountain terrain block with a dashed " +
  "flight route from take off to landing. The route crosses three glowing " +
  "fault zones - a red no-GPS area, a cyan comms-jammed area, and an amber " +
  "sector with multiple aircraft in the air. The mission completes anyway.";

export function MissionMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slow drift, same register as the Hyderabad anchor image.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.03]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[1400px]">
      {/* The plate, full-frame */}
      <figure
        className="relative w-full overflow-hidden rounded-2xl ring-1 ring-edge bg-ink-2"
        style={{ aspectRatio: `${PLATE_W} / ${PLATE_H}` }}
      >
        <motion.div
          style={reduce ? undefined : { y: imageY, scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/imagery/mission-corridor.jpg"
            alt={MAP_ALT}
            fill
            quality={88}
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="object-cover"
          />
        </motion.div>

        {/* Soft pulsing halos over the baked fault zones */}
        {ZONES.map((zone) => (
          <span
            key={zone.code}
            aria-hidden
            className={reduce ? "absolute" : "mission-halo absolute"}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.size}%`,
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
              borderRadius: "9999px",
              background: `radial-gradient(circle, color-mix(in srgb, ${zone.color} 22%, transparent) 0%, transparent 68%)`,
            }}
          />
        ))}

        {/* Dark-glass fault panel in the plate's empty bottom-left void (lg+).
            The night plate has no baked legend, so nothing is being covered -
            the panel simply borrows the composition's quiet corner. */}
        <div className="absolute bottom-[4%] left-[2%] hidden w-[25%] min-w-[300px] lg:block rounded-xl bg-ink/80 backdrop-blur-md ring-1 ring-edge p-5">
          <FaultList compact />
        </div>
      </figure>

      {/* Small screens: the fault list as normal HTML below the strip */}
      <div className="mt-6 lg:hidden">
        <FaultList />
      </div>

      {/* Mission stats - the concrete flight this map traces. A centered
          telemetry strip: a ruled SORTIE header (cyan sortie index) over a
          hairline-divided row of readouts, value over label. */}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex w-full max-w-[560px] items-center gap-4">
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-transparent to-edge-strong"
          />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-fg-tertiary whitespace-nowrap">
            Sortie <span className="text-gold">047</span>
          </span>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-l from-transparent to-edge-strong"
          />
        </div>

        <dl className="mt-7 grid w-full max-w-[720px] grid-cols-2 sm:grid-cols-5 gap-y-6">
          {STATS.map((s, i) => (
            <div
              key={s.k}
              className={`flex flex-col items-center px-4 sm:border-l sm:border-edge sm:first:border-l-0 ${
                i === STATS.length - 1 && STATS.length % 2 === 1
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <dd className="font-mono text-[15px] leading-none tracking-[0.01em] text-fg tabular-nums sm:text-[17px]">
                {s.v}
              </dd>
              <dt className="mt-2 text-center font-mono text-[9px] leading-[1.3] tracking-[0.18em] uppercase text-fg-tertiary">
                {s.k}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function FaultList({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <p
        className={`font-mono uppercase text-fg-tertiary ${
          compact
            ? "text-[10px] tracking-[0.22em] border-b border-edge pb-3 mb-3"
            : "text-[11px] tracking-[0.22em] mb-4"
        }`}
      >
        Fault conditions
      </p>
      <ol className={compact ? "space-y-3" : "space-y-4"}>
        {ZONES.map((zone) => (
          <li key={zone.code} className="flex gap-3">
            <span
              aria-hidden
              className="mt-[5px] size-2 shrink-0 rounded-full ring-1 ring-edge-strong"
              style={{ background: zone.color }}
            />
            <div>
              <p
                className={`font-mono uppercase text-fg ${
                  compact
                    ? "text-[11px] tracking-[0.18em]"
                    : "text-[12px] tracking-[0.2em]"
                }`}
              >
                {zone.code} · {zone.label}
              </p>
              <p
                className={`text-fg-muted ${
                  compact
                    ? "mt-0.5 text-[12px] leading-[1.5]"
                    : "mt-1 text-[14px] leading-[1.55]"
                }`}
              >
                {zone.line}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div
        className={`flex items-center gap-5 border-t border-edge ${
          compact ? "mt-4 pt-3" : "mt-5 pt-4"
        }`}
      >
        <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] uppercase text-fg-tertiary">
          <span aria-hidden className="h-px w-6 bg-fg" />
          Planned corridor
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] uppercase text-fg-tertiary">
          <span
            aria-hidden
            className="size-3 rounded-full border border-dashed border-fg-tertiary"
          />
          Risk zone
        </span>
      </div>
    </div>
  );
}
