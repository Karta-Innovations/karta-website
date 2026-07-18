import { cn } from "@/lib/cn";

interface EyebrowTagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "amber" | "muted";
}

export function EyebrowTag({ children, className, variant = "amber" }: EyebrowTagProps) {
  const isAmber = variant === "amber";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase font-medium",
        isAmber ? "text-sand" : "text-fg-tertiary",
        className,
      )}
    >
      <span
        className={cn(
          "block h-px w-7",
          isAmber ? "bg-sand" : "bg-fg-tertiary",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}
