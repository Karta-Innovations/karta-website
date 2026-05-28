import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** Logical height in pixels — drives the rendered mark size. */
  size?: number;
  /** Show the "Karta" wordmark next to the mark. */
  showWordmark?: boolean;
  /** Wordmark font-size in px. Defaults to 13 for compact placements. */
  wordmarkSize?: number;
  /** Used for hero/footer above-the-fold placements. */
  priority?: boolean;
}

/**
 * Karta brand mark — curved-K + brass sphere + curved-1 glyph.
 * Uses the chrome/silver variant (`/imagery/white.png`) so the mark reads
 * cleanly on the dark Midnight Ink surface; the brass sphere stays warm.
 *
 * The wordmark is rendered as Geist Sans text rather than a raster, so it
 * scales sharply at every size and inherits the brand type stack.
 */
export function Logo({
  className,
  size = 24,
  showWordmark = false,
  wordmarkSize = 13,
  priority = false,
}: LogoProps) {
  // Scale the gap between mark and wordmark proportionally so the lockup
  // stays balanced from the compact 24px footer use up to the larger
  // top-of-page placement.
  const gap = Math.max(8, Math.round(size * 0.28));
  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ gap }}
      aria-label="Karta"
    >
      <Image
        src="/imagery/white.png"
        alt=""
        width={size}
        height={size}
        priority={priority}
        className="block shrink-0"
        style={{ height: size, width: size }}
      />
      {showWordmark ? (
        <span
          className="font-display text-fg tracking-[0.18em] uppercase font-medium select-none leading-none"
          style={{ fontSize: wordmarkSize }}
        >
          Karta
        </span>
      ) : null}
    </span>
  );
}
