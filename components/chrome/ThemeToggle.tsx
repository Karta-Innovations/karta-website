"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY } from "@/components/chrome/ThemeScript";

type Theme = "dark" | "light";

interface ThemeToggleProps {
  /** Outer className - typically position/spacing utilities from the consumer. */
  className?: string;
}

/**
 * Two-segment instrument-pill toggle: `DARK · LIGHT`. Active segment underlined
 * in amber. Matches the mission-control register - reads as a hardware switch
 * rather than a SaaS theme widget.
 *
 * State source of truth is `document.documentElement.dataset.theme` (set
 * pre-paint by ThemeScript). On click, we flip both that attribute *and*
 * localStorage, then update local state to re-render. Other tabs / scenes
 * observing the attribute (e.g. useThemeColors) react automatically via
 * MutationObserver - no event-bus needed.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current =
      (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
    setTheme(current);
  }, []);

  const apply = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage can throw in some private-browsing contexts - ignore.
    }
  };

  // Until hydration completes, render nothing to avoid a flash of "wrong
  // active segment". ThemeScript has already set the correct theme on <html>,
  // so the visual state of the page is correct - the toggle just doesn't
  // appear for a frame.
  if (!mounted) {
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
        "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]",
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
