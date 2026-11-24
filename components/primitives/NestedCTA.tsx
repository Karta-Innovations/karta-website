import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "minimal";

interface NestedCTAProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: "diagonal" | "right";
  className?: string;
}

/** A directional action for content and career routes. */
export function NestedCTA({ href, children, variant = "primary", arrow = "diagonal", className }: NestedCTAProps) {
  const Icon = arrow === "diagonal" ? ArrowUpRight : ArrowRight;
  const classes = cn(
    variant === "primary" && "btn",
    variant === "ghost" && "btn btn--line",
    variant === "minimal" && "link",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <Icon weight="bold" size={16} aria-hidden />
    </>
  );
  return href.startsWith("mailto:") || href.startsWith("http") ? (
    <a href={href} className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
