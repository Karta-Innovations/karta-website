import { cn } from "@/lib/cn";

interface DoppelrandCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  asChild?: boolean;
}

/**
 * Nested-architecture card. Outer shell + inner core with concentric radii.
 * Looks like a glass plate sitting in a machined aluminum tray.
 * Per high-end-visual-design: NEVER place premium cards flatly on the background.
 */
export function DoppelrandCard({
  children,
  className,
  innerClassName,
}: DoppelrandCardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] p-[6px]",
        "bg-glass ring-1 ring-edge",
        "shadow-[0_26px_64px_-40px_rgba(11,20,48,0.42)]",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[22px] h-full w-full",
          "bg-gradient-to-b from-indigo/70 to-ink-2",
          "ring-1 ring-inset ring-edge",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
