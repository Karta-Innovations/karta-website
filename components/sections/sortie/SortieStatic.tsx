"use client";

import type { ReactNode } from "react";
import { ACTS } from "./sortie-data";
import { SortieLog } from "./SortieLog";

/**
 * Reduced-motion / no-timeline variant. Four simplified end-state frames (one
 * per fault) beside the fully-expanded log. No anime import, no motion; every
 * fault's story is legible as a still.
 */

const round2 = (n: number) => Math.round(n * 100) / 100;

function MiniFrame({
  code,
  caption,
  children,
}: {
  code: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-ink-2 ring-1 ring-edge p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber">{code}</span>
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-fg-tertiary">
          {caption}
        </span>
      </div>
      <svg viewBox="0 0 320 150" className="w-full h-auto" aria-hidden>
        {children}
      </svg>
    </div>
  );
}

export function SortieStatic() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 01 GPS denied: struck satellites + wide cone + drifting track */}
        <MiniFrame code={ACTS[0].code} caption={ACTS[0].caption}>
          <ellipse
            cx="230"
            cy="92"
            rx="70"
            ry="24"
            fill="color-mix(in srgb, var(--color-signal) 14%, transparent)"
            stroke="color-mix(in srgb, var(--color-signal) 40%, transparent)"
          />
          <path d="M 30 60 C 120 70, 200 88, 300 96" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
          {["G02", "G05", "G07"].map((s, i) => (
            <text
              key={s}
              x={30 + i * 42}
              y="26"
              fill="var(--color-alert)"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}
            >
              <tspan style={{ textDecoration: "line-through" }}>{s}</tspan>
            </text>
          ))}
        </MiniFrame>

        {/* 02 Comms jammed: broken uplink beam, aircraft still on plan */}
        <MiniFrame code={ACTS[1].code} caption={ACTS[1].caption}>
          <line x1="30" y1="120" x2="150" y2="44" stroke="var(--color-edge-strong)" />
          <line
            x1="150"
            y1="44"
            x2="290"
            y2="70"
            stroke="var(--color-alert)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
          <path d="M 30 100 C 130 96, 210 80, 300 70" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
        </MiniFrame>

        {/* 03 Cameras blind: dimmed world, lit thermal + radar */}
        <MiniFrame code={ACTS[2].code} caption={ACTS[2].caption}>
          <path d="M 20 100 C 120 90, 200 108, 300 96" fill="none" stroke="var(--color-edge)" strokeWidth="1" opacity="0.3" />
          <text x="30" y="42" fill="var(--color-fg-tertiary)" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
            <tspan style={{ textDecoration: "line-through" }}>EO/IR</tspan>
          </text>
          <text x="130" y="42" fill="var(--color-amber)" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
            LWIR
          </text>
          <text x="220" y="42" fill="var(--color-gold)" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
            RADAR
          </text>
        </MiniFrame>

        {/* 04 Operator overload: fleet ring around one operator node */}
        <MiniFrame code={ACTS[3].code} caption={ACTS[3].caption}>
          <circle cx="160" cy="80" r="6" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
          <circle cx="160" cy="80" r="2" fill="var(--color-amber)" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x = round2(160 + Math.cos(a) * 55);
            const y = round2(80 + Math.sin(a) * 45);
            return (
              <g key={i}>
                <line x1="160" y1="80" x2={x} y2={y} stroke="var(--color-edge)" />
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill={i === 2 ? "var(--color-alert)" : i === 5 ? "var(--color-signal)" : "var(--color-ok)"}
                />
              </g>
            );
          })}
        </MiniFrame>
      </div>

      <SortieLog activeFault={ACTS.length} expandedAll />
    </div>
  );
}
