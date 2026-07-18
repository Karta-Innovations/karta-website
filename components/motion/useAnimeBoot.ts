"use client";

import { useEffect, type RefObject } from "react";
import type { createTimeline } from "animejs";

type BootTimeline = ReturnType<typeof createTimeline>;

interface AnimeBootOptions {
  /** Play only once the scope scrolls into view (default: play on mount). */
  inView?: boolean;
  /** IntersectionObserver threshold when inView is set. */
  threshold?: number;
}

/**
 * Runs an anime.js entrance timeline over a `.boot-scope` section.
 *
 * Pairs with the boot-choreography CSS in globals.css: [data-boot] children
 * are hidden pre-paint (JS-gated via html[data-js]), the timeline built here
 * reveals them, and the scope is marked [data-boot-done] afterwards so the
 * CSS releases its hold. Reduced-motion visitors get the scope released
 * immediately and no timeline at all.
 *
 * `build` must be referentially stable (module-level function or useCallback)
 * or the effect will re-run and restart the timeline.
 */
export function useAnimeBoot(
  scopeRef: RefObject<HTMLElement | null>,
  build: (scope: HTMLElement) => BootTimeline,
  { inView = false, threshold = 0.3 }: AnimeBootOptions = {},
): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const markDone = () => {
      scope.setAttribute("data-boot-done", "");
      scope.querySelectorAll<HTMLElement>("[data-boot]").forEach((element) => {
        element.style.willChange = "auto";
      });
    };

    // Read the media query directly (not via useReducedMotionSafe) so the
    // effect runs exactly once - the hook's post-mount flip would restart
    // the timeline for reduced-motion visitors before cancelling it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markDone();
      return;
    }

    let timeline: BootTimeline | null = null;
    let observer: IntersectionObserver | null = null;

    const play = () => {
      timeline = build(scope);
      timeline.then(markDone);
    };

    if (inView) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            observer = null;
            play();
          }
        },
        { threshold },
      );
      observer.observe(scope);
    } else {
      play();
    }

    return () => {
      observer?.disconnect();
      // cancel() (not just pause) releases the timeline from anime's engine
      // so a Strict Mode re-mount rebuilds cleanly from the declared froms.
      timeline?.cancel();
      markDone();
    };
  }, [scopeRef, build, inView, threshold]);
}
