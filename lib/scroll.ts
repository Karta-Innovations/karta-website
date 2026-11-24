import type Lenis from "lenis";

/** The page's smooth scroller, when one is running. */
let instance: Lenis | null = null;

export function setScroller(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Scrolls to an element, a selector or a pixel offset. Elements land just
 * below the header: the smooth scroller reads `scroll-padding-top` from the
 * stylesheet, and the native fallback applies the same clearance by hand.
 */
export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  if (instance) {
    instance.scrollTo(target, { immediate, duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo(0, target);
    return;
  }
  const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return;
  const clearance = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - clearance);
}

/** Freezes page scroll under a dialog or the full-screen menu. */
export function lockScroll(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
