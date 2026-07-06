"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Hydration-safe prefers-reduced-motion.
 *
 * framer-motion's useReducedMotion resolves the media query synchronously on
 * the client, so a reduced-motion visitor's first render differs from the
 * SSR HTML (which cannot know the preference) - React then reports a
 * hydration mismatch and regenerates the tree. This hook always returns
 * false for SSR and the hydration render, then flips after mount. Sections
 * that swap DOM structure for reduced motion (static lists instead of
 * pinned scenes) must use this instead of useReducedMotion directly.
 */
export function useReducedMotionSafe(): boolean {
  const pref = useReducedMotion() ?? false;
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(pref);
  }, [pref]);

  return reduce;
}
