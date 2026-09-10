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
  { src: string; width: number; height: number; x: number; y: number; cropWidth: number; cropHeight: number; alt: string }
> = {
  mark: {
    src: "/brand/karta-icon-original.png",
    width: 1080, height: 1080, x: 325, y: 269, cropWidth: 430, cropHeight: 542,
    alt: "Karta Innovations",
  },
  wordmark: {
    src: "/brand/karta-wordmark-original.png",
    width: 1080, height: 1080, x: 329, y: 475, cropWidth: 423, cropHeight: 133,
    alt: "Karta Innovations",
  },
  full: {
    src: "/brand/karta-full-original.png",
    width: 519, height: 690, x: 40, y: 38, cropWidth: 442, cropHeight: 612,
    alt: "Karta Innovations",
  },
};

/**
 * Original brand assets; the viewport hides excess white margins without altering the artwork.
 */
export function Logo({
  className,
  size = 24,
  showWordmark = false,
  variant,
  priority = false,
}: LogoProps) {
  const asset = LOGOS[variant ?? (showWordmark ? "wordmark" : "mark")];
  const scale = size / asset.cropHeight;
  const width = asset.cropWidth * scale;

  return (
    <span className={cn("relative inline-block shrink-0 overflow-hidden", className)} style={{ width, height: size, mixBlendMode: "multiply" }}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? "eager" : undefined}
        className="block h-auto w-auto shrink-0 select-none"
        style={{ position: "absolute", maxWidth: "none", width: asset.width * scale, height: asset.height * scale, left: -asset.x * scale, top: -asset.y * scale }}
      />
    </span>
  );
}
