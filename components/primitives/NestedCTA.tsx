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
    "pressable",
    variant === "primary" &&
      "bg-flare text-on-flare ring-1 ring-flare-deep/40 hover:bg-flare-hi shadow-[inset_0_1px_0_var(--color-edge-strong)]",
    variant === "ghost" &&
      "bg-glass text-fg ring-1 ring-edge-strong hover:bg-glass-hi hover:ring-edge-strong",
    variant === "minimal" && "text-fg hover:text-flare pr-6",
    className,
  );

  const iconWrapper = cn(
    "size-9 rounded-full inline-flex items-center justify-center",
    "transition-[transform,background-color,color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
    "group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[1px]",
    variant === "primary" && "bg-ink/15",
    variant === "ghost" && "bg-glass-hi group-hover/cta:bg-flare group-hover/cta:text-on-flare",
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
