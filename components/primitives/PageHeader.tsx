import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Optional mono section marker shown above the eyebrow, e.g. "07 · ENGAGE". */
  index?: string;
  /** Optional coordinate strip shown at the bottom of the header. */
  coord?: { left?: string; center?: string; right?: string };
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  index,
  coord,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-10", className)}>
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] lg:items-end gap-10 lg:gap-20">
          <div>
            {index ? (
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
                {index}
              </p>
            ) : null}
            <p className="chapter-label mb-6">{eyebrow}</p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-[-0.04em] leading-[1.08] text-fg">
              {title}
            </h1>
          </div>
          {intro ? (
            <div className="lg:pt-6">
              <div className="text-fg-muted text-[19px] leading-[1.65] max-w-[58ch] space-y-5">
                {intro}
              </div>
            </div>
          ) : null}
        </div>

        {coord ? (
          <div className="mt-12 border-t border-edge pt-5 md:mt-16">
            <CoordinateStrip
              left={coord.left}
              center={coord.center}
              right={coord.right}
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
