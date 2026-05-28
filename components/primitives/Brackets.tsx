import { cn } from "@/lib/cn";

interface BracketsProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: "amber" | "fg" | "muted";
}

const colorMap = {
  amber: "border-amber",
  fg: "border-fg",
  muted: "border-fg-tertiary",
} as const;

export function Brackets({
  children,
  className,
  size = 14,
  color = "muted",
}: BracketsProps) {
  const borderClass = colorMap[color];
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className={cn("absolute top-0 left-0 border-t border-l", borderClass)}
        style={{ width: size, height: size }}
      />
      <span
        aria-hidden
        className={cn("absolute top-0 right-0 border-t border-r", borderClass)}
        style={{ width: size, height: size }}
      />
      <span
        aria-hidden
        className={cn("absolute bottom-0 left-0 border-b border-l", borderClass)}
        style={{ width: size, height: size }}
      />
      <span
        aria-hidden
        className={cn("absolute bottom-0 right-0 border-b border-r", borderClass)}
        style={{ width: size, height: size }}
      />
      {children}
    </div>
  );
}
