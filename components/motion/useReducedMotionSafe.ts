"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe motion capability check.
 *
 * Subscribes to the prefers-reduced-motion media query in a way that avoids
 * hydration mismatches. Returns false during SSR and initial hydration,
 * then subscribes to the real preference post-mount. It also chooses the
 * static path when IntersectionObserver is unavailable so in-view reveals
 * can never leave narrative content hidden. Sections that swap DOM structure
 * for reduced motion must use this instead of Framer Motion directly.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      // Only subscribe on the client
      if (typeof window === "undefined") {
        return () => {};
      }

      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      // Removal requires the exact same function reference as addition.
      const handler = () => onChange();

      // Modern browsers
      if (mql.addEventListener) {
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
      }

      // Older browsers fallback
      if (mql.addListener) {
        mql.addListener(handler);
        return () => mql.removeListener(handler);
      }

      return () => {};
    },
    () => {
      // Client snapshot: read the current user preference.
      if (typeof window === "undefined") {
        return false;
      }
      return (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window)
      );
    },
    () => {
      // Server snapshot: no media query is available during SSR.
      return false;
    },
  );
}
