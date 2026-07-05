"use client";

import { useEffect, type RefObject } from "react";
import { createTimeline, stagger } from "animejs";
import {
  ACTS,
  NOMINAL_MS,
  RESET_START,
  LOOP_MS,
  NOMINAL_CAPTION,
  RESET_CAPTION,
  actIndexAtTime,
  formatMissionClock,
} from "./sortie-data";

/**
 * Builds and drives the sortie master timeline over a scope element.
 *
 * One looping, non-autoplaying anime.js v4 timeline. Act tweens are pinned to
 * absolute loop-relative timings (ms) so a seek lands deterministically. The
 * aircraft group is moved by DELTAS from its markup base (120,420); each act's
 * targets are absolute-from-base so position is stable across loop restarts.
 * Plays only while in view and the tab is visible; reverts on unmount.
 */
export function useSortieTimeline(
  scopeRef: RefObject<HTMLElement | null>,
  onFaultChange: (faultIndex: number) => void,
): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const one = <T extends Element = HTMLElement>(sel: string) =>
      scope.querySelector<T>(sel);

    const clockEl = one<SVGTextElement>('[data-role="clock"]');
    const captionEl = one<SVGTextElement>('[data-role="caption"]');
    const driftEl = one<SVGTextElement>('[data-role="drift"]');

    let lastFault = -2;
    const emitFault = (ms: number) => {
      const f = actIndexAtTime(ms);
      if (f !== lastFault) {
        lastFault = f;
        onFaultChange(f);
      }
    };
    const setCaption = (text: string) => {
      if (captionEl) captionEl.textContent = text;
    };

    const tl = createTimeline({
      loop: true,
      autoplay: false,
      defaults: { ease: "outExpo" },
      onUpdate: (self) => {
        const ms = self.currentTime % LOOP_MS;
        if (clockEl) clockEl.textContent = formatMissionClock(ms);
        emitFault(ms);
      },
      onLoop: () => {
        lastFault = -2;
      },
    });


    // ---- Nominal (0..6s): aircraft eases along the corridor, track draws ----
    tl.call(() => setCaption(NOMINAL_CAPTION), 0);
    tl.add('[data-role="aircraft"]', { translateX: [0, 120], translateY: [0, -34], duration: NOMINAL_MS, ease: "linear" }, 0);
    tl.add('[data-role="track"]', { strokeDashoffset: [1200, 900], duration: NOMINAL_MS, ease: "linear" }, 0);

    // ---- Act 1 GPS denied (6..16s) ----
    const a1 = ACTS[0].tStart;
    tl.call(() => setCaption(ACTS[0].caption), a1);
    tl.add('[data-role="sat"]', { fill: "var(--color-alert)", opacity: [1, 0.35], duration: 900, delay: stagger(220) }, a1);
    tl.add('[data-role="cone"]', { scale: [1, 6.5], opacity: [0, 0.9], duration: 4200 }, a1);
    tl.add('[data-role="aircraft"]', { translateX: 300, translateY: -70, duration: 5000, ease: "inOutSine" }, a1);
    tl.add('[data-role="track"]', { strokeDashoffset: [900, 520], duration: 5000, ease: "inOutSine" }, a1);
    // TRN re-anchor: cone snaps tight in the back half of the act
    tl.add('[data-role="cone"]', { scale: 2.4, opacity: 0.6, duration: 2600 }, a1 + 6000);
    if (driftEl) {
      const drift = { v: 0 };
      const writeDrift = () => {
        driftEl.textContent = `±${drift.v.toFixed(1)}m`;
      };
      tl.add(drift, { v: [0, 18.6], duration: 6000, onUpdate: writeDrift }, a1);
      tl.add(drift, { v: 2.4, duration: 2600, onUpdate: writeDrift }, a1 + 6000);
    }

    // ---- Act 2 Comms jammed (16..26s) ----
    const a2 = ACTS[1].tStart;
    tl.call(() => setCaption(ACTS[1].caption), a2);
    tl.add('[data-role="jam"]', { opacity: [0, 1], duration: 700 }, a2);
    tl.add('[data-role="beam-packet"]', { opacity: [1, 0.15, 0.9, 0.1], duration: 8000, ease: "linear" }, a2);
    tl.add('[data-role="aircraft"]', { translateX: 480, translateY: -120, duration: 9000, ease: "inOutSine" }, a2);
    tl.add('[data-role="track"]', { strokeDashoffset: [520, 280], duration: 9000, ease: "inOutSine" }, a2);
    tl.add('[data-role="jam"]', { opacity: 0, duration: 700 }, a2 + 9200);

    // ---- Act 3 Cameras blind (26..35s) ----
    const a3 = ACTS[2].tStart;
    tl.call(() => setCaption(ACTS[2].caption), a3);
    tl.add('[data-role="noise"]', { opacity: [0, 0.16, 0.08], duration: 2600 }, a3);
    tl.add('[data-role="world"]', { opacity: [1, 0.15], duration: 1800 }, a3 + 600);
    tl.add('[data-role="sensor-eo"]', { fill: "var(--color-fg-tertiary)", opacity: [1, 0.4], duration: 800 }, a3 + 600);
    tl.add('[data-role="sensor-thermal"]', { fill: "var(--color-amber)", duration: 800 }, a3 + 900);
    tl.add('[data-role="sensor-radar"]', { fill: "var(--color-gold)", duration: 800 }, a3 + 1100);
    tl.add('[data-role="radar-sweep"]', { opacity: [0, 0.8], rotate: [0, 360], duration: 6000, ease: "linear" }, a3 + 1200);
    tl.add('[data-role="aircraft"]', { translateX: 620, translateY: -150, duration: 8000, ease: "inOutSine" }, a3);
    // restore the world at the act tail so the zoom-out reads clean
    tl.add('[data-role="world"]', { opacity: 0.55, duration: 1000 }, a3 + 8000);
    tl.add('[data-role="radar-sweep"]', { opacity: 0, duration: 600 }, a3 + 8400);
    tl.add('[data-role="sensor-eo"]', { fill: "var(--color-fg-muted)", opacity: 1, duration: 600 }, a3 + 8400);

    // ---- Act 4 Operator overload (35..44s) ----
    const a4 = ACTS[3].tStart;
    tl.call(() => setCaption(ACTS[3].caption), a4);
    tl.add('[data-role="stage-scene"]', { scale: [1, 0.82], duration: 2200 }, a4);
    tl.add('[data-role="fleet"]', { opacity: [0, 1], scale: [0.9, 1], duration: 2600 }, a4 + 400);

    // ---- Reset (44..46s): fade to black, restore for the next loop ----
    tl.call(() => setCaption(RESET_CAPTION), RESET_START);
    tl.add('[data-role="reset-veil"]', { opacity: [0, 1], duration: 1000 }, RESET_START);
    tl.add('[data-role="stage-scene"]', { scale: 1, duration: 10 }, RESET_START + 1000);
    tl.add('[data-role="fleet"]', { opacity: 0, duration: 10 }, RESET_START + 1000);
    tl.add('[data-role="reset-veil"]', { opacity: 0, duration: 800 }, RESET_START + 1100);
    // hold the full loop length so all timings stay absolute
    tl.set('[data-role="reset-veil"]', { opacity: 0 }, LOOP_MS);

    // ---- Play control: in-view + tab-visible ----
    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) tl.resume();
      else tl.pause();
    };
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(scope);
    document.addEventListener("visibilitychange", sync);

    // dev-only handle for deterministic CDP seeking
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __sortie?: unknown }).__sortie = {
        seek: (ms: number) => tl.seek(ms),
        pause: () => tl.pause(),
      };
    }

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      tl.revert();
      if (process.env.NODE_ENV !== "production") {
        delete (window as unknown as { __sortie?: unknown }).__sortie;
      }
    };
  }, [scopeRef, onFaultChange]);
}
