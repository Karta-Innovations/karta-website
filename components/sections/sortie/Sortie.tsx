"use client";

import { useCallback, useRef, useState } from "react";
import { ACTS } from "./sortie-data";
import { SortieStage } from "./SortieStage";
import { SortieLog } from "./SortieLog";
import { SortieStatic } from "./SortieStatic";
import { useSortieTimeline } from "./useSortieTimeline";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * The fault-conditions scene: an act rail, the animated mission stage, and the
 * mission log. One flight, four compounding failures, playing on a loop while
 * in view. Reduced motion swaps in the static variant.
 */
export function Sortie() {
  const reduce = useReducedMotionSafe();
  return reduce ? <SortieStatic /> : <SortieAnimated />;
}

function SortieAnimated() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeFault, setActiveFault] = useState(-1);
  const onFaultChange = useCallback((f: number) => setActiveFault(f), []);
  useSortieTimeline(scopeRef, onFaultChange);

  return (
    <div>
      <ActRail activeFault={activeFault} />
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-start">
        <div
          ref={scopeRef}
          className="relative aspect-[16/10] w-full rounded-2xl bg-ink-2 ring-1 ring-edge overflow-hidden"
        >
          <SortieStage />
        </div>
        <SortieLog activeFault={activeFault} />
      </div>
    </div>
  );
}

function ActRail({ activeFault }: { activeFault: number }) {
  return (
    <ol className="flex flex-wrap gap-x-6 gap-y-2 border-b border-edge pb-4 mb-8">
      {ACTS.map((act) => {
        const isActive = act.id === activeFault;
        const isPast = activeFault > act.id;
        return (
          <li key={act.code} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`size-1.5 rounded-full transition-colors duration-500 ${
                isActive ? "bg-amber" : isPast ? "bg-ok" : "bg-fg-tertiary/40"
              }`}
            />
            <span
              className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                isActive ? "text-fg" : "text-fg-tertiary"
              }`}
            >
              {act.code} {act.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
