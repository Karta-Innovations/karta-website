import { useSyncExternalStore } from "react";

/**
 * Tracks a media query. Returns `null` on the server and during hydration,
 * so callers can wait for the real answer before committing to a branch.
 */
export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}
