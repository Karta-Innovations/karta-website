/**
 * Motion constants - the single source of truth for framer-motion timing.
 *
 * Mirrors the CSS tokens in app/globals.css (--ease-* / --dur-*). CSS keeps
 * millisecond durations for transitions; framer-motion wants seconds, so the
 * values here are pre-converted. Change both places together.
 */

export const EASING = {
  /** cubic-bezier(0.22, 1, 0.36, 1) - gentle settle */
  quint: [0.22, 1, 0.36, 1],
  /** cubic-bezier(0.16, 1, 0.3, 1) - the signature snappy reveal */
  expo: [0.16, 1, 0.3, 1],
  /** cubic-bezier(0.32, 0.72, 0, 1) - decisive exit */
  out: [0.32, 0.72, 0, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export const DURATION = {
  fast: 0.16,
  base: 0.28,
  slow: 0.56,
  extra: 0.84,
  /** long-form reveals (word staggers, section headlines) */
  reveal: 0.9,
} as const;
