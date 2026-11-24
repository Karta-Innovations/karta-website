"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToTarget } from "@/lib/scroll";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * A link to a homepage section. On the homepage it glides to the section;
 * from any other route it navigates there normally.
 */
export function SectionLink({ href, onClick, children, ...rest }: SectionLinkProps) {
  const pathname = usePathname();

  function handle(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || pathname !== "/" || !href.startsWith("/#")) return;
    const target = document.querySelector<HTMLElement>(href.slice(1));
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(null, "", href);
    scrollToTarget(target);
  }

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
