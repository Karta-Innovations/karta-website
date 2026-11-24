"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import { setScroller } from "@/lib/scroll";

/**
 * Inertial scrolling for pointer devices. Touch keeps the platform's own
 * scroll, and reduced-motion visitors get none of it.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      lerp: 0.105,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    setScroller(lenis);

    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onMotionChange = () => {
      if (reduce.matches) lenis.destroy();
    };
    reduce.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      reduce.removeEventListener("change", onMotionChange);
      lenis.destroy();
      setScroller(null);
    };
  }, []);

  // A new route starts at the top unless it targets an anchor.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
