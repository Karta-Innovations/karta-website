import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoVariant = "mark" | "wordmark" | "full";

interface LogoProps {
  className?: string;
  /** Logical height in pixels - drives the rendered asset size. */
  size?: number;
  /** Back-compat: show the supplied Karta Innovations wordmark asset. */
  showWordmark?: boolean;
  /** Deprecated. Kept so older call sites do not break. */
  wordmarkSize?: number;
  /** Supplied brand asset to render. */
  variant?: LogoVariant;
  /** Used for hero/footer above-the-fold placements. */
  priority?: boolean;
}

const LOGOS: Record<
  LogoVariant,
  { src: string; width: number; height: number; alt: string }
> = {
  mark: {
    src: "/brand/karta-icon-cropped.png",
    width: 442,
    height: 554,
    alt: "Karta Innovations",
  },
  wordmark: {
    src: "/brand/karta-innovations-wordmark-cropped.png",
    width: 435,
    height: 146,
    alt: "Karta Innovations",
  },
  full: {
    src: "/brand/karta-innovations-full-logo-cropped.png",
    width: 454,
    height: 624,
    alt: "Karta Innovations",
  },
};

/**
 * Supplied Karta Innovations brand assets, trimmed for responsive web chrome.
 */
export function Logo({
  className,
  size = 24,
  showWordmark = false,
  variant,
  priority = false,
}: LogoProps) {
  const asset = LOGOS[variant ?? (showWordmark ? "wordmark" : "mark")];
  const width = Math.round(size * (asset.width / asset.height));

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={width}
        height={size}
        priority={priority}
        className="block h-auto w-auto shrink-0 select-none"
        style={{ height: size, width }}
      />
    </span>
  );
}
