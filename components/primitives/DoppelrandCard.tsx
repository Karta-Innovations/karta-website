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
        "bg-white/[0.03] ring-1 ring-white/[0.06]",
        "shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[22px] h-full w-full",
          "bg-gradient-to-b from-indigo/40 to-ink-2",
          "ring-1 ring-inset ring-white/[0.05]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
