"use client";

import { useScroll, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Normalized 0-1 scroll progress for a section element.
 *
 * Default offset tracks the element across its full scroll journey
 * ("start start" -> "end end"), which is what pinned scenes want. Pass a
 * custom offset for exit-only tracking (e.g. the hero uses
 * ["start start", "end start"]).
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  offset: ScrollOffset = ["start start", "end end"],
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return scrollYProgress;
}
