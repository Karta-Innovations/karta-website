"use client";

/**
 * Per-scenario instrument panels for the DeniedEnvironment section. Each card
 * gets a different visualization tied to its failure mode - fills the empty
 * middle space and turns each scenario from a text block into something a
 * defense buyer can read at a glance.
 *
 * Pure SVG/CSS - kept off the Three.js bundle on purpose. The four scenarios
 * here are dense; a 3D scene per card would overload the page.
 */

interface ScenarioVisualProps {
  code: string;
}

export function ScenarioVisual({ code }: ScenarioVisualProps) {
  switch (code) {
    case "01":
      return <GpsDriftVisual />;
    case "02":
      return <CommsJamVisual />;
    case "03":
      return <SensorFusionVisual />;
    case "04":
      return <OperatorSupervisionVisual />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* 01 · GPS denied - planned route vs VIO-estimated drift             */
/* ------------------------------------------------------------------ */
function GpsDriftVisual() {
  // GNSS constellation: 8 satellites, all visible at start, then degrade. The
  // first three lose signal early, the next three a moment later, etc. - what
  // a jamming event looks like from the receiver's point of view.
  const SATS = [
    { label: "G02", lost: true },
    { label: "G05", lost: true },
    { label: "G07", lost: true },
    { label: "G12", lost: true },
    { label: "G18", lost: true },
    { label: "G24", lost: true },
    { label: "G31", lost: true },
    { label: "G44", lost: true },
  ];

  return (
    <Frame label="01 · POSITION ESTIMATE" rightLabel="GNSS LOST · 8/8">
      {/* Top band - GNSS constellation status. Each satellite ID with a
          strike-through state cell. Reads as live receiver telemetry. */}
      <div className="absolute inset-x-4 top-8 flex items-center justify-between gap-2 h-[18px]">
        {SATS.map((s) => (
          <div
            key={s.label}
            className="flex-1 relative flex items-center justify-center font-mono text-[8px] tracking-[0.18em] uppercase"
          >
            <span
              className={
                s.lost
                  ? "text-alert/85 line-through decoration-alert/85"
                  : "text-ok"
              }
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Middle band - position-estimate plot with widening uncertainty cone. */}
      <svg
        viewBox="0 0 600 90"
        className="absolute inset-x-0 top-[60px] bottom-8 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Uncertainty cone - semi-transparent fill that widens with distance.
            Visualises pose drift growing as VIO accumulates error without GNSS. */}
        <path
          d="M 20 45 Q 180 47 320 53 T 580 78
             L 580 88 Q 320 75 180 53 T 20 45 Z"
          fill="rgba(200,150,46,0.10)"
        />
        {/* Planned waypoint corridor - dashed mid-line */}
        <line
          x1="20"
          y1="45"
          x2="580"
          y2="45"
          stroke="rgba(180,187,210,0.35)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        {/* VIO-estimated track drifting below the planned line */}
        <path
          d="M 20 45 Q 180 47 320 56 T 580 82"
          stroke="#C8962E"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Waypoint markers along the planned corridor */}
        {[20, 145, 270, 395, 520, 580].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy="45"
            r="2.5"
            fill="none"
            stroke="rgba(180,187,210,0.55)"
            strokeWidth="1"
          />
        ))}
        {/* Current position (drifting endpoint) - ringed dot for emphasis */}
        <circle
          cx="580"
          cy="82"
          r="5"
          fill="none"
          stroke="#C8962E"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="580" cy="82" r="3" fill="#C8962E" />
      </svg>

      <FootRow
        left={<span className="text-fg-tertiary">PLANNED · GNSS LOCK</span>}
        right={<span className="text-amber">ACTUAL · VIO + TRN · ±2.4m</span>}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Comms jammed - link timeline with bounded-autonomy band       */
/* ------------------------------------------------------------------ */
function CommsJamVisual() {
  return (
    <Frame label="02 · LINK TIMELINE" rightLabel="T+00:04:12">
      <div className="absolute inset-x-6 top-12 bottom-10 flex flex-col justify-center gap-4">
        <TimelineRow
          label="UPLINK"
          segments={[
            { width: "22%", color: "bg-amber/55", title: "Nominal" },
            { width: "60%", color: "bg-alert/45", title: "Jammed" },
            { width: "18%", color: "bg-amber/55", title: "Reacquired" },
          ]}
        />
        <TimelineRow
          label="POSTURE"
          segments={[
            { width: "22%", color: "bg-ok/55", title: "Supervised" },
            { width: "60%", color: "bg-amber/65", title: "Bounded autonomy" },
            { width: "18%", color: "bg-ok/55", title: "Supervised" },
          ]}
        />
      </div>
      <FootRow
        left={<span className="text-amber">BOUNDED AUTONOMY · ACTIVE</span>}
        right={<span className="text-fg-tertiary">DOCTRINE-CONSTRAINED PLAN</span>}
      />
    </Frame>
  );
}

interface TimelineRowProps {
  label: string;
  segments: { width: string; color: string; title: string }[];
}
function TimelineRow({ label, segments }: TimelineRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-tertiary w-16 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-ink/60 rounded overflow-hidden flex">
        {segments.map((s, i) => (
          <div
            key={i}
            className={s.color}
            style={{ width: s.width }}
            title={s.title}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Visual denied - sensor fusion stack with primary/fallback     */
/* ------------------------------------------------------------------ */
interface SensorRow {
  name: string;
  state: "degraded" | "primary" | "fallback";
  conf: number;
}
const SENSORS: SensorRow[] = [
  { name: "EO/IR · VISUAL", state: "degraded", conf: 0.18 },
  { name: "LWIR · THERMAL", state: "primary", conf: 0.82 },
  { name: "mmWAVE · RADAR", state: "primary", conf: 0.74 },
  { name: "IMU · INERTIAL", state: "fallback", conf: 0.93 },
];

function SensorFusionVisual() {
  return (
    <Frame label="03 · SENSOR FUSION" rightLabel="POSE CONF 0.74">
      <ul className="absolute inset-x-5 top-12 bottom-10 flex flex-col justify-center gap-2.5">
        {SENSORS.map((s) => {
          const stateColor =
            s.state === "degraded"
              ? "text-alert/80"
              : s.state === "primary"
                ? "text-amber"
                : "text-ok";
          const barColor =
            s.state === "degraded"
              ? "bg-alert/45"
              : s.state === "primary"
                ? "bg-amber/75"
                : "bg-ok/60";
          return (
            <li
              key={s.name}
              className="grid grid-cols-[minmax(0,1fr)_80px_72px] items-center gap-3 text-[10px]"
            >
              <span
                className={`font-mono tracking-[0.12em] truncate ${
                  s.state === "degraded"
                    ? "text-fg-tertiary line-through"
                    : "text-fg-muted"
                }`}
              >
                {s.name}
              </span>
              <div className="relative h-1 bg-ink/60 rounded overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${barColor}`}
                  style={{ width: `${s.conf * 100}%` }}
                />
              </div>
              <span
                className={`font-mono tracking-[0.18em] uppercase text-right ${stateColor}`}
              >
                {s.state}
              </span>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Operator overload - 1:N supervision graph (playbook proof #5) */
/* ------------------------------------------------------------------ */
const N_VEHICLES = 12;
interface FleetNode {
  id: number;
  x: number;
  y: number;
  status: "nominal" | "attention" | "fault";
}
// Round to 2 decimals to keep server and client SVG number serialization
// byte-identical and avoid React hydration mismatches.
const round2 = (n: number) => Math.round(n * 100) / 100;

const FLEET: FleetNode[] = Array.from({ length: N_VEHICLES }, (_, i) => {
  const angle = (i / N_VEHICLES) * Math.PI * 2 - Math.PI / 2;
  const r = 52;
  return {
    id: i,
    x: round2(150 + Math.cos(angle) * r),
    y: round2(70 + Math.sin(angle) * r),
    status: i === 3 ? "fault" : i === 7 || i === 10 ? "attention" : "nominal",
  };
});

function OperatorSupervisionVisual() {
  return (
    <Frame label="04 · 1:N SUPERVISION" rightLabel={`1 OP · ${N_VEHICLES} VEH`}>
      <svg
        viewBox="0 0 300 140"
        className="absolute inset-x-0 top-9 w-full h-[110px]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* connection lines - coloured by node status */}
        {FLEET.map((v) => {
          const stroke =
            v.status === "fault"
              ? "rgba(138,29,29,0.45)"
              : v.status === "attention"
                ? "rgba(200,150,46,0.35)"
                : "rgba(116,128,160,0.18)";
          return (
            <line
              key={`l-${v.id}`}
              x1="150"
              y1="70"
              x2={v.x}
              y2={v.y}
              stroke={stroke}
              strokeWidth="0.75"
            />
          );
        })}
        {/* operator center node */}
        <circle
          cx="150"
          cy="70"
          r="7"
          fill="none"
          stroke="#C8962E"
          strokeWidth="1.5"
        />
        <circle cx="150" cy="70" r="2.5" fill="#C8962E" />
        {/* vehicle nodes */}
        {FLEET.map((v) => {
          const fill =
            v.status === "fault"
              ? "#8A1D1D"
              : v.status === "attention"
                ? "#C8962E"
                : "#7AB87A";
          return (
            <circle
              key={`v-${v.id}`}
              cx={v.x}
              cy={v.y}
              r="3.5"
              fill={fill}
              opacity={v.status === "nominal" ? 0.6 : 0.95}
            />
          );
        })}
      </svg>
      <FootRow
        left={
          <div className="flex gap-4">
            <span className="text-ok">● 09 NOMINAL</span>
            <span className="text-amber">● 02 ATTN</span>
            <span className="text-alert">● 01 FAULT</span>
          </div>
        }
        right={<span className="text-fg-tertiary">DECISIONS DEFERRED · 97%</span>}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Shared frame                                                       */
/* ------------------------------------------------------------------ */
interface FrameProps {
  label: string;
  rightLabel?: string;
  children: React.ReactNode;
}
function Frame({ label, rightLabel, children }: FrameProps) {
  return (
    <div className="relative h-[180px] rounded-xl bg-ink/40 ring-1 ring-edge overflow-hidden mt-2 mb-4">
      <div className="absolute top-3 left-4 font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary pointer-events-none">
        {label}
      </div>
      {rightLabel ? (
        <div className="absolute top-3 right-4 font-mono text-[10px] tracking-[0.22em] uppercase text-amber pointer-events-none">
          {rightLabel}
        </div>
      ) : null}
      {children}
    </div>
  );
}

interface FootRowProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}
function FootRow({ left, right }: FootRowProps) {
  return (
    <div className="absolute bottom-3 inset-x-4 flex items-center justify-between font-mono text-[9px] tracking-[0.18em] uppercase pointer-events-none">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
