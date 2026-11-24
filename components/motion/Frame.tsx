import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FrameProps {
  children: ReactNode;
  className?: string;
  /** Delay before the shutter opens, in milliseconds. */
  delay?: number;
}

/**
 * A picture or a film that opens like a shutter as it enters the viewport,
 * while the image inside settles back to its true size.
 */
export function Frame({ children, className, delay = 0 }: FrameProps) {
  return (
    <div className={cn("frame", className)} data-reveal="frame" style={{ "--d": `${delay}ms` } as CSSProperties}>
      <div className="frame__clip">{children}</div>
    </div>
  );
}
