"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY } from "@/components/chrome/ThemeScript";

type Theme = "dark" | "light";

interface ThemeToggleProps {
  /** Outer className - typically position/spacing utilities from the consumer. */
  className?: string;
}

/**
 * State source of truth is `document.documentElement.dataset.theme` (set
 * pre-paint by ThemeScript). We read it via useSyncExternalStore and subscribe
 * to changes with a MutationObserver, so the toggle re-renders whenever the
 * attribute flips - whether from this toggle or anywhere else. No effects, no
 * local mirror of the theme.
 */
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
}

// Unknown during SSR and the first hydration render: render nothing to avoid a
// flash of the wrong active segment. ThemeScript already themed <html>, so the
// page itself is correct - only the toggle is withheld for a frame.
function getServerSnapshot(): Theme | null {
  return null;
}

/**
 * Two-segment instrument-pill toggle: `DARK · LIGHT`. Active segment underlined
 * in amber. Reads as a hardware switch rather than a SaaS theme widget.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const apply = (next: Theme) => {
    // Flip the attribute; subscribe()'s MutationObserver re-renders this toggle,
    // and other observers (e.g. useThemeColors) react automatically.
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage can throw in some private-browsing contexts - ignore.
    }
  };

  if (theme === null) {
    return <div className={className} aria-hidden />;
  }

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center font-mono text-[10px] tracking-[0.22em] uppercase",
        "rounded-full pl-1 pr-1 py-1",
        // Shared `nav-pill` class gives the toggle the same theme-aware glass
        // backdrop as the centered Nav pill - keeps the chrome cohesive.
        "nav-pill backdrop-blur-xl",
        "ring-1 ring-fg/[0.08]",
        "shadow-[0_18px_50px_-28px_rgba(11,20,48,0.22)]",
        className,
      )}
    >
      <Segment
        active={theme === "dark"}
        label="Dark"
        onSelect={() => apply("dark")}
      />
      <span aria-hidden className="text-fg-tertiary/60 px-1 select-none">
        ·
      </span>
      <Segment
        active={theme === "light"}
        label="Light"
        onSelect={() => apply("light")}
      />
    </div>
  );
}

interface SegmentProps {
  active: boolean;
  label: string;
  onSelect: () => void;
}

function Segment({ active, label, onSelect }: SegmentProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "relative px-2.5 py-1 rounded-full",
        "transition-colors duration-300",
        active ? "text-fg" : "text-fg-tertiary hover:text-fg-muted",
      )}
    >
      {label}
      {/* Amber underline indicator - hardware-switch register, not a Material-UI ripple */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-2 right-2 -bottom-px h-px",
          "bg-amber transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </button>
  );
}
