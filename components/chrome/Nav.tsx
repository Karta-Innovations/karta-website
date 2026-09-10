"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/chrome/Logo";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface NavLink {
  label: string;
  href: string;
  detail: string;
}

const LINKS: NavLink[] = [
  { label: "Stack", href: "/#stack", detail: "SkyAnchor / TENERE / Kiksuya" },
  { label: "Field Notes", href: "/field-notes", detail: "Engineering essays" },
  { label: "Careers", href: "/careers", detail: "Open roles" },
  { label: "Our mission", href: "/#mission", detail: "Bounded autonomy" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const pathname = usePathname();

  // aria-current for routed pages; homepage hash links never match a route.
  const isCurrent = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const overlay = overlayRef.current;
    const trigger = menuButtonRef.current;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );

    background.forEach((element) => {
      element.inert = true;
    });

    const getFocusable = () => {
      const overlayItems = overlay
        ? Array.from(
            overlay.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];
      return [trigger, ...overlayItems].filter(
        (item): item is HTMLElement => Boolean(item),
      );
    };

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    const focusFrame = requestAnimationFrame(() => {
      getFocusable()[1]?.focus();
    });

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      background.forEach((element) => {
        element.inert = false;
      });
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <nav aria-label="Primary" className="site-header__inner page-width">
          <Link href="/" aria-label="Karta Innovations - home" aria-hidden={open || undefined} tabIndex={open ? -1 : undefined} className="site-brand">
            <Logo size={40} variant="mark" priority />
            <Logo size={34} variant="wordmark" priority />
          </Link>
          <ul aria-hidden={open || undefined} className="site-header__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} tabIndex={open ? -1 : undefined} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="site-header__actions">
            <Link href="/engage" className="header-contact" aria-hidden={open || undefined} tabIndex={open ? -1 : undefined}>Talk to engineering <ArrowRight size={16} aria-hidden /></Link>
            <button ref={menuButtonRef} type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="nav-overlay" aria-label={open ? "Close menu" : "Open menu"} className="site-menu-button">
              <span className={cn("site-menu-line", open && "site-menu-line--open")} aria-hidden />
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={overlayRef}
            key="overlay"
            id="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: reduce ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: reduce ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] },
            }}
            className="fixed inset-0 z-40 bg-ink"
          >
            <div className="absolute inset-0 px-6 pt-24 pb-10 overflow-y-auto">
              <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-24 pt-8">
                <ol className="space-y-2">
                  {LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, y: 24, filter: "blur(6px)" }
                      }
                      animate={
                        reduce
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0, filter: "blur(0px)" }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              duration: 0.3,
                              delay: 0.06 + i * 0.04,
                              ease: [0.23, 1, 0.32, 1],
                            }
                      }
                      className="border-b border-edge"
                    >
                      <Link
                        href={link.href}
                        aria-current={isCurrent(link.href) ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between py-5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:translate-x-2"
                      >
                        <span className="flex items-baseline gap-5">
                          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary group-hover:text-flare transition-colors">
                            0{i + 1}
                          </span>
                          <span className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium tracking-[-0.03em] leading-[0.95] text-fg group-hover:text-flare transition-colors">
                            {link.label}
                          </span>
                        </span>
                        <span className="hidden sm:block font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary group-hover:text-fg-muted transition-colors">
                          {link.detail}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ol>

                <motion.aside
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.32, delay: 0.22, ease: [0.23, 1, 0.32, 1] }
                  }
                  className="space-y-10"
                >
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                      17.454 deg N 78.500 deg E
                    </span>
                    <p className="mt-3 text-fg-muted leading-relaxed max-w-[28ch]">
                      Engineered close to the field.
                    </p>
                  </div>
                  <Link
                    href="/engage"
                    onClick={() => setOpen(false)}
                    className="button-primary"
                  >
                    Talk to engineering
                    <ArrowRight size={14} weight="bold" aria-hidden />
                  </Link>
                </motion.aside>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
