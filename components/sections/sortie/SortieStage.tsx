"use client";

import { NOMINAL_CAPTION } from "./sortie-data";

/**
 * The mission stage: one cartographic SVG scene rendered at its nominal
 * resting state. Purely presentational; every animated element carries a
 * stable data-role so useSortieTimeline can target it. No-JS and the first
 * paint show this nominal frame (aircraft at the corridor start, 8/8 GNSS).
 */

const round2 = (n: number) => Math.round(n * 100) / 100;

const FLEET = Array.from({ length: 11 }, (_, i) => {
  const angle = (i / 11) * Math.PI * 2 - Math.PI / 2;
  const r = 150;
  return {
    id: i,
    x: round2(480 + Math.cos(angle) * r),
    y: round2(300 + Math.sin(angle) * r),
    status: i === 2 ? "fault" : i === 5 || i === 9 ? "attention" : "nominal",
  };
});

const SATS = ["G02", "G05", "G07", "G12", "G18", "G24", "G31", "G44"];

// Groups that scale/rotate need an explicit box + origin so the transform
// anchors to the scene center rather than the element bounding box.
const CENTER_ORIGIN = {
  transformBox: "view-box",
  transformOrigin: "480px 300px",
} as const;

export function SortieStage() {
  return (
    <svg
      viewBox="0 0 960 600"
      className="h-full w-full"
      role="img"
      aria-label="Mission recording: one flight through GPS loss, comms jamming, blinded cameras, and operator saturation. Autonomy holds the mission while a human keeps command."
    >
      <g data-role="stage-scene" style={CENTER_ORIGIN}>
        {/* world: contours + grid */}
        <g data-role="world">
          {[180, 300, 420].map((y, i) => (
            <path
              key={i}
              d={`M 40 ${y} C 240 ${y - 40}, 480 ${y + 40}, 920 ${y - 20}`}
              fill="none"
              stroke="var(--color-edge)"
              strokeWidth="1"
            />
          ))}
          <g stroke="var(--color-edge)" strokeWidth="0.5" opacity="0.5">
            {[120, 240, 360, 480, 600, 720, 840].map((x) => (
              <line key={x} x1={x} y1="40" x2={x} y2="560" />
            ))}
          </g>
        </g>

        {/* planned corridor */}
        <path
          d="M 120 420 C 320 380, 520 300, 840 220"
          fill="none"
          stroke="var(--color-fg-tertiary)"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.55"
        />
        {[
          [120, 420],
          [300, 372],
          [480, 300],
          [660, 250],
          [840, 220],
        ].map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="3"
            fill="none"
            stroke="var(--color-fg-tertiary)"
            strokeWidth="1"
            opacity="0.6"
          />
        ))}

        {/* actual track (drawn by the timeline) */}
        <path
          data-role="track"
          d="M 120 420 C 320 384, 520 316, 840 236"
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="1.5"
          strokeDasharray="1200"
          strokeDashoffset="1200"
        />

        {/* uncertainty cone */}
        <ellipse
          data-role="cone"
          cx="120"
          cy="420"
          rx="4"
          ry="4"
          fill="color-mix(in srgb, var(--color-signal) 14%, transparent)"
          stroke="color-mix(in srgb, var(--color-signal) 40%, transparent)"
          strokeWidth="1"
          opacity="0"
          style={{
            willChange: "transform, opacity",
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />

        {/* fleet (revealed in act 4) */}
        <g data-role="fleet" opacity="0" style={CENTER_ORIGIN}>
          {FLEET.map((v) => (
            <line
              key={`l-${v.id}`}
              x1="480"
              y1="300"
              x2={v.x}
              y2={v.y}
              stroke={
                v.status === "fault"
                  ? "color-mix(in srgb, var(--color-alert) 45%, transparent)"
                  : v.status === "attention"
                    ? "color-mix(in srgb, var(--color-signal) 40%, transparent)"
                    : "var(--color-edge)"
              }
              strokeWidth="0.75"
            />
          ))}
          <circle cx="480" cy="300" r="8" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
          <circle cx="480" cy="300" r="2.5" fill="var(--color-amber)" />
          {FLEET.map((v) => (
            <path
              key={`v-${v.id}`}
              d={`M ${v.x} ${round2(v.y - 5)} L ${round2(v.x + 4)} ${round2(v.y + 4)} L ${v.x} ${round2(v.y + 2)} L ${round2(v.x - 4)} ${round2(v.y + 4)} Z`}
              fill={
                v.status === "fault"
                  ? "var(--color-alert)"
                  : v.status === "attention"
                    ? "var(--color-signal)"
                    : "var(--color-ok)"
              }
              opacity={v.status === "nominal" ? 0.6 : 0.95}
            />
          ))}
        </g>

        {/* primary aircraft glyph (path pre-translated to corridor start; the
            timeline moves the GROUP by deltas from that base) */}
        <g data-role="aircraft" style={{ willChange: "transform" }}>
          <path d="M 0 -8 L 6 7 L 0 3 L -6 7 Z" fill="var(--color-amber)" transform="translate(120,420)" />
        </g>

        {/* radar sweep (act 3) */}
        <g data-role="radar-sweep" opacity="0" style={CENTER_ORIGIN}>
          <line x1="480" y1="300" x2="620" y2="300" stroke="var(--color-gold)" strokeWidth="1.5" opacity="0.7" />
        </g>

        {/* noise / weather whiteout (act 3) */}
        <rect data-role="noise" x="0" y="0" width="960" height="600" fill="var(--color-fg)" opacity="0" />
      </g>

      {/* --- HUD (outside the zoom group) --- */}
      {/* GNSS constellation strip */}
      <g transform="translate(40,40)">
        {SATS.map((s, i) => (
          <text
            key={s}
            data-role="sat"
            x={i * 62}
            y="0"
            fill="var(--color-ok)"
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em" }}
          >
            {s}
          </text>
        ))}
      </g>

      {/* sensor chips */}
      <g transform="translate(600,40)" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em" }}>
        <text data-role="sensor-eo" x="0" y="0" fill="var(--color-fg-muted)">EO/IR</text>
        <text data-role="sensor-thermal" x="80" y="0" fill="var(--color-fg-tertiary)">LWIR</text>
        <text data-role="sensor-radar" x="160" y="0" fill="var(--color-fg-tertiary)">RADAR</text>
        <text x="260" y="0" fill="var(--color-ok)">IMU</text>
      </g>

      {/* uplink beam + packets */}
      <g transform="translate(60,540)">
        <line x1="0" y1="0" x2="180" y2="-90" stroke="var(--color-edge-strong)" strokeWidth="1" />
        {[0.25, 0.5, 0.75].map((t, i) => (
          <circle key={i} data-role="beam-packet" cx={round2(180 * t)} cy={round2(-90 * t)} r="2.5" fill="var(--color-gold)" />
        ))}
        <circle cx="0" cy="0" r="4" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      </g>

      {/* comms-jam static (act 2) */}
      <g data-role="jam" opacity="0">
        {Array.from({ length: 40 }, (_, i) => (
          <circle
            key={i}
            cx={round2(60 + ((i * 37) % 180))}
            cy={round2(455 + ((i * 53) % 85))}
            r="0.8"
            fill="var(--color-alert)"
            opacity="0.5"
          />
        ))}
      </g>

      {/* mission clock */}
      <text
        data-role="clock"
        x="480"
        y="44"
        textAnchor="middle"
        fill="var(--color-fg-muted)"
        style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.18em" }}
      >
        T+00:00
      </text>

      {/* live drift readout (counts up in act 1) */}
      <text
        data-role="drift"
        x="920"
        y="44"
        textAnchor="end"
        fill="var(--color-signal)"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em" }}
      >
        ±0.0m
      </text>

      {/* caption band */}
      <text
        data-role="caption"
        x="480"
        y="576"
        textAnchor="middle"
        fill="var(--color-fg-tertiary)"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em" }}
      >
        {NOMINAL_CAPTION}
      </text>

      {/* reset veil */}
      <rect data-role="reset-veil" x="0" y="0" width="960" height="600" fill="var(--color-ink)" opacity="0" />
    </svg>
  );
}
