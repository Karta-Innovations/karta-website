import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** Logical height in pixels - drives the rendered mark size. */
  size?: number;
  /** Show the "Karta Innovations" wordmark next to the mark. */
  showWordmark?: boolean;
  /** Primary ("Karta") wordmark font-size in px. Defaults to 13 for compact placements. */
  wordmarkSize?: number;
  /** Used for hero/footer above-the-fold placements. */
  priority?: boolean;
}

/**
 * Karta Innovations brand mark - curved-K + brass sphere + curved-1 glyph.
 * Uses the chrome/silver variant (`/imagery/white.png`) so the mark reads
 * cleanly on the dark Midnight Ink surface; the brass sphere stays warm.
 *
 * The wordmark is rendered as text rather than a raster, so it scales sharply
 * at every size and inherits the brand type stack. It echoes the logo lockup:
 * "Karta" in brushed brass (`.karta-wordmark`) over a wide-tracked, muted
 * "Innovations".
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
  // The secondary "Innovations" line tracks ~40% of the primary size with wide
  // letter-spacing so its measure lands just past "Karta", mirroring the
  // stacked logo lockup.
  const subSize = Math.max(7, Math.round(wordmarkSize * 0.4));
  const subGap = Math.max(2, Math.round(wordmarkSize * 0.14));
  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ gap }}
      aria-label="Karta Innovations"
    >
      {/*
        The PNG is a white-on-transparent glyph designed for the dark surface.
        In light mode, the `.logo-mark` class (declared in globals.css) inverts
        the image so it reads as dark-on-transparent against cream - no second
        asset needed.
      */}
      <Image
        src="/imagery/white.png"
        alt=""
        width={size}
        height={size}
        priority={priority}
        className="block shrink-0 logo-mark"
        style={{ height: size, width: size }}
      />
      {showWordmark ? (
        <span className="inline-flex flex-col justify-center select-none leading-none">
          <span
            className="karta-wordmark font-display uppercase font-semibold tracking-[0.14em] leading-none"
            style={{ fontSize: wordmarkSize }}
          >
            Karta
          </span>
          <span
            className="font-display uppercase font-medium text-fg-muted leading-none tracking-[0.3em]"
            style={{ fontSize: subSize, marginTop: subGap }}
          >
            Innovations
          </span>
        </span>
      ) : null}
    </span>
  );
}
