import { cn } from "@/lib/cn";

interface HexGridProps {
  className?: string;
  opacity?: number;
  size?: number;
  color?: string;
}

/**
 * Background pattern of tessellating hexagons.
 * Echoes the Apis dorsata comb — Karta's signature motif.
 */
export function HexGrid({
  className,
  opacity = 0.06,
  size = 36,
  color = "%23D8A84F",
}: HexGridProps) {
  const w = size * Math.sqrt(3);
  const h = size * 1.5;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w * 2}' height='${h * 2}' viewBox='0 0 ${w * 2} ${h * 2}'><g fill='none' stroke='${color}' stroke-width='0.8'><path d='M ${w / 2} 0 L ${w} ${size / 2} L ${w} ${size + size / 2} L ${w / 2} ${size * 2} L 0 ${size + size / 2} L 0 ${size / 2} Z'/><path d='M ${w + w / 2} ${h} L ${w * 2} ${h + size / 2} L ${w * 2} ${h + size + size / 2} L ${w + w / 2} ${h + size * 2} L ${w} ${h + size + size / 2} L ${w} ${h + size / 2} Z'/></g></svg>`;
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: `${w * 2}px ${h * 2}px`,
      }}
    />
  );
}
