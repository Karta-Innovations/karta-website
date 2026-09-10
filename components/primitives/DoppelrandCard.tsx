import { cn } from "@/lib/cn";

interface DoppelrandCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  asChild?: boolean;
}

/** Quiet content surface shared by the contact form. */
export function DoppelrandCard({ children, className, innerClassName }: DoppelrandCardProps) {
  return <div className={cn("border border-border bg-ink-2", className, innerClassName)}>{children}</div>;
}
