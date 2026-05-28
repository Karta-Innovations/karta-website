import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "minimal";
type ArrowKind = "diagonal" | "right";

interface NestedCTABaseProps {
  children: React.ReactNode;
  variant?: Variant;
  arrow?: ArrowKind;
  className?: string;
}

interface NestedCTALinkProps extends NestedCTABaseProps {
  href: string;
  type?: never;
  onClick?: never;
}

interface NestedCTAButtonProps extends NestedCTABaseProps {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

type NestedCTAProps = NestedCTALinkProps | NestedCTAButtonProps;

/**
 * Pill CTA with a nested circular icon affordance.
 * Per the high-end-visual-design skill: the trailing icon NEVER sits naked.
 */
export function NestedCTA({
  children,
  href,
  type,
  onClick,
  variant = "primary",
  arrow = "diagonal",
  className,
}: NestedCTAProps) {
  const base = cn(
    "group/cta inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2",
    "font-medium text-[14px] tracking-[-0.005em]",
    "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "active:scale-[0.98]",
    variant === "primary" &&
      "bg-amber text-ink ring-1 ring-amber-deep/40 hover:bg-amber-hi shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
    variant === "ghost" &&
      "bg-white/[0.04] text-fg ring-1 ring-white/10 hover:bg-white/[0.07] hover:ring-white/15",
    variant === "minimal" && "text-fg hover:text-amber pr-6",
    className,
  );

  const iconWrapper = cn(
    "size-9 rounded-full inline-flex items-center justify-center",
    "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[1px]",
    variant === "primary" && "bg-ink/15",
    variant === "ghost" && "bg-white/[0.06] group-hover/cta:bg-amber group-hover/cta:text-ink",
    variant === "minimal" && "hidden",
  );

  const ArrowIcon = arrow === "diagonal" ? ArrowUpRight : ArrowRight;

  const inner = (
    <>
      <span>{children}</span>
      <span className={iconWrapper} aria-hidden>
        <ArrowIcon weight="bold" size={15} />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={base}>
      {inner}
    </button>
  );
}
