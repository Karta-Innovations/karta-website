"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { ScenarioVisual } from "./DeniedEnvironmentVisuals";

interface Scenario {
  code: string;
  label: string;
  title: string;
  body: string;
  telemetry: { k: string; v: string }[];
}

const SCENARIOS: Scenario[] = [
  {
    code: "01",
    label: "GPS denied",
    title: "Signal vanishes mid-mission.",
    body:
      "Jamming, urban canyons, or polar latitudes silence the GNSS. The vehicle must keep a metric map of itself, the terrain, and its task — purely from on-board perception.",
    telemetry: [
      { k: "GNSS lock", v: "LOST" },
      { k: "Fallback", v: "VIO + TRN" },
      { k: "Drift budget", v: "<1.2m / km" },
    ],
  },
  {
    code: "02",
    label: "Comms jammed",
    title: "The link to the operator is gone.",
    body:
      "Contested spectra, terrain shadow, or sustained EW make duplex unreliable. The autonomy must continue the mission within doctrine, and return when comms recover.",
    telemetry: [
      { k: "Uplink BW", v: "0 kbps" },
      { k: "Last contact", v: "T-00:04:12" },
      { k: "Bounded autonomy", v: "ACTIVE" },
    ],
  },
  {
    code: "03",
    label: "Visual denied",
    title: "Cameras lose the world.",
    body:
      "Sandstorm, monsoon rain, smoke, night. The perception stack falls back to thermal, mmWave radar, and inertial integration with calibrated uncertainty.",
    telemetry: [
      { k: "Visibility", v: "<8m" },
      { k: "Primary sensor", v: "LWIR + radar" },
      { k: "Pose confidence", v: "0.74" },
    ],
  },
  {
    code: "04",
    label: "Operator overload",
    title: "One operator, many vehicles.",
    body:
      "Cognitive bandwidth is finite. The Command layer composes mission graphs, deconflicts vehicles, and surfaces only the decisions that genuinely need a human.",
    telemetry: [
      { k: "Vehicles in flight", v: "12" },
      { k: "Operator actions / min", v: "<3" },
      { k: "Decisions deferred", v: "97%" },
    ],
  },
];

export function DeniedEnvironment() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="denied"
      className="relative bg-surface-deep px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1400px] pt-32 md:pt-48">
        <CoordinateStrip
          left="KRT.OPS.2026 · 04"
          center="ENVIRONMENT · CONTESTED"
          right="04 FAILURE MODES"
          className="mb-20"
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 mb-20">
          <div>
            <EyebrowTag className="mb-6">Problem space · 04</EyebrowTag>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.035em] leading-[0.98] text-fg max-w-[18ch]">
              The denied environment is where{" "}
              <span className="text-amber">autonomy earns its keep</span>.
            </h2>
          </div>
          <div className="lg:pt-6">
            <p className="text-fg-muted text-[17px] leading-[1.65] max-w-[60ch]">
              Real-world unmanned operations are defined by what fails. GPS,
              comms, optics, and operator attention all degrade — usually
              together. Karta is engineered against each of these from the first
              line of code.
            </p>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative" style={{ height: `${SCENARIOS.length * 100}vh` }}>
        <div className="sticky top-0 h-[100dvh] flex items-center justify-center px-6 md:px-10 overflow-hidden">
          <div className="relative w-full max-w-[1100px] aspect-[4/3] md:aspect-[16/10]">
            {SCENARIOS.map((s, i) => (
              <ScenarioCard
                key={s.code}
                scenario={s}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ScenarioCardProps {
  scenario: Scenario;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ScenarioCard({ scenario, index, progress }: ScenarioCardProps) {
  const total = SCENARIOS.length;
  const start = index / total;
  const end = (index + 1) / total;
  const settledEnd = Math.min(end + 0.04, 1);

  const y = useTransform(progress, [start, end], [80, 0]);
  const opacity = useTransform(progress, [start, end, settledEnd], [0, 1, 1]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);
  const rotate = useTransform(progress, [start, end], [2, 0]);

  // HUD timestamp + simulated pose drift, scrubbed by scroll progress.
  // Each scenario gets its own 4.2-second clock that ticks as the user scrolls
  // through that card's range — reads as live telemetry while keeping zero
  // background work when not in view.
  const [timestamp, setTimestamp] = useState("T+0.000s");
  const [drift, setDrift] = useState("000.0m");
  useMotionValueEvent(progress, "change", (v) => {
    const localRaw = (v - start) / (end - start);
    const local = Math.max(0, Math.min(1, localRaw));
    setTimestamp(`T+${(local * 4.2).toFixed(3)}s`);
    setDrift(`${(local * 18.6).toFixed(1).padStart(5, "0")}m`);
  });

  return (
    <motion.article
      style={{
        y,
        opacity,
        scale,
        rotate,
        zIndex: index + 1,
      }}
      className="absolute inset-0 will-change-transform"
    >
      <div className="h-full w-full rounded-[28px] bg-gradient-to-br from-indigo to-ink-2 ring-1 ring-white/[0.08] shadow-[0_50px_120px_-50px_rgba(0,0,0,0.8)] p-8 md:p-14 flex flex-col">
        <header className="flex items-start justify-between gap-6 mb-5">
          <div className="flex items-baseline gap-5 flex-wrap">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
              FAULT · {scenario.code}
            </span>
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
              {scenario.label}
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary tabular-nums">
              · {timestamp}
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber/80 tabular-nums">
              · DRIFT {drift}
            </span>
          </div>
          <span className="size-9 inline-flex items-center justify-center rounded-full bg-alert/15 text-alert ring-1 ring-alert/25">
            <span aria-hidden className="size-1.5 rounded-full bg-alert" />
          </span>
        </header>

        {/* Per-scenario instrument visualization — fills the middle band that
            previously sat empty. Each scenario gets a different SVG/CSS panel
            tied to its failure mode (drift trace, link timeline, sensor stack,
            1:N supervision graph). */}
        <ScenarioVisual code={scenario.code} />

        <h3 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-medium tracking-[-0.03em] leading-[1.02] text-fg max-w-[22ch] mt-auto pt-6">
          {scenario.title}
        </h3>

        <p className="mt-6 text-fg-muted text-[17px] leading-[1.6] max-w-[58ch]">
          {scenario.body}
        </p>

        <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {scenario.telemetry.map((row) => (
            <div key={row.k} className="space-y-1.5">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
                {row.k}
              </div>
              <div className="font-mono text-[15px] tracking-[0.02em] text-fg">
                {row.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
