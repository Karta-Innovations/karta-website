"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe prefers-reduced-motion.
 *
 * Subscribes to the prefers-reduced-motion media query in a way that avoids
 * hydration mismatches. Returns false during SSR and initial hydration,
 * then subscribes to the real preference post-mount. Sections that swap DOM
 * structure for reduced motion (static lists instead of pinned scenes) must
 * use this instead of framer-motion's useReducedMotion directly.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      // Only subscribe on the client
      if (typeof window === "undefined") {
        return () => {};
      }

      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

      // Modern browsers
      if (mql.addEventListener) {
        mql.addEventListener("change", () => onChange());
        return () => mql.removeEventListener("change", () => onChange());
      }

      // Older browsers fallback
      if (mql.addListener) {
        mql.addListener(() => onChange());
        return () => mql.removeListener(() => onChange());
      }

      return () => {};
    },
    () => {
      // Server-side snapshot: always false (no media query in SSR)
      return false;
    },
    () => {
      // Client-side snapshot: read the media query preference
      if (typeof window === "undefined") {
        return false;
      }
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
  );
}
