"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks `[data-reveal]` elements as they enter the viewport; the stylesheet
 * does the animating. Also flags the document as hydrated so the three-second
 * safety valve in the CSS stands down.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((element) => element.setAttribute("data-in", ""));
      return;
    }

    // Elements marked `data-now` belong to the opening view: they arrive with the
    // page rather than waiting to be scrolled to, however tall the screen is.
    const waiting = targets.filter((element) => !element.hasAttribute("data-now"));
    const frame = requestAnimationFrame(() => {
      targets.forEach((element) => {
        if (element.hasAttribute("data-now")) element.setAttribute("data-in", "");
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.06 },
    );
    waiting.forEach((element) => observer.observe(element));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
