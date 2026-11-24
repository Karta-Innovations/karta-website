import type { CSSProperties, ReactNode } from "react";
import { Words } from "@/components/motion/Words";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Smaller title for long headlines such as article and role names. */
  compact?: boolean;
}

/** Opens every secondary route: a label, the title in the serif, and a short introduction. */
export function PageHeader({ eyebrow, title, intro, compact }: PageHeaderProps) {
  return (
    <header className="page-head" data-tone="cream">
      <div className="wrap">
        <p className="label page-head__label" data-reveal style={{ "--d": "60ms" } as CSSProperties}>
          {eyebrow}
        </p>
        <Words as="h1" className={compact ? "t-1 page-head__title" : "t-hero page-head__title"} text={title} delay={140} />
        {intro ? (
          <div className="page-head__intro" data-reveal style={{ "--d": "360ms" } as CSSProperties}>
            {intro}
          </div>
        ) : null}
        <div className="rule" data-reveal style={{ "--d": "420ms" } as CSSProperties} />
      </div>
    </header>
  );
}
