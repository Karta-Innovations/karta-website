import { cn } from "@/lib/cn";

interface CoordinateStripProps {
  left?: string;
  center?: string;
  right?: string;
  className?: string;
}

export function CoordinateStrip({
  left = "KRT.OPS.2026",
  center = "ENGAGED",
  right = "17.454°N 78.500°E",
  className,
}: CoordinateStripProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between font-mono-meta text-fg-tertiary text-[11px] tracking-[0.22em] uppercase",
        className,
      )}
    >
      <span>{left}</span>
      <span className="hidden md:inline-flex items-center gap-2">
        <span className="size-[6px] rounded-full bg-sand animate-pulse" />
        {center}
      </span>
      <span>{right}</span>
    </div>
  );
}
