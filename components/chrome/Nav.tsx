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
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const pathname = usePathname();

  // aria-current for routed pages; homepage hash links never match a route.
  const isCurrent = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  useEffect(() => {
    let lastCommittedY = window.scrollY;
    let frame = 0;

    function updateChrome() {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastCommittedY;

      setScrolled(y > 24);

      if (delta > 8 && y > 480) {
        setHidden(true);
        lastCommittedY = y;
      } else if (delta < -8 || y <= 480) {
        setHidden(false);
        lastCommittedY = y;
      }
    }

    function onScroll() {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateChrome);
      }
    }

    updateChrome();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
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
      {/*
        Top-left brand mark - pulled out of the centered nav pill so the
        company identity owns the page corner instead of competing with the
        nav controls. Shares the same scroll-down compression timing as the
        pill so the two read as one piece of chrome.
      */}
      <div
        aria-hidden={open || undefined}
        className={cn(
          "fixed left-4 lg:left-8 z-50",
          "transition-[transform,opacity] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          "focus-within:translate-y-0 focus-within:opacity-100 focus-within:pointer-events-auto",
          scrolled ? "top-3 lg:top-5" : "top-5 lg:top-8",
          hidden && !open
            ? "-translate-y-[180%] opacity-0 pointer-events-none"
            : "pointer-events-auto",
        )}
      >
        <Link
          href="/"
          aria-label="Karta Innovations - home"
          tabIndex={open ? -1 : undefined}
          className={cn(
            "logo-chip inline-flex min-w-11 items-center justify-center gap-2 rounded-[4px]",
            "px-2 py-2 ring-1 ring-edge",
            "shadow-[0_18px_44px_-30px_rgba(0,0,0,0.65)]",
            "pressable transition-[transform,background-color]",
            "hover:-translate-y-0.5 hover:bg-paper",
          )}
        >
          <span className="inline-flex items-center gap-2.5">
            <Logo size={28} variant="mark" priority />
            <Logo size={24} variant="wordmark" priority className="hidden sm:inline-flex" />
          </span>
        </Link>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-start pl-[76px] pr-4 sm:pl-[158px] lg:justify-center lg:px-0",
          "pointer-events-none transition-[transform,opacity] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          "focus-within:translate-y-0 focus-within:opacity-100",
          scrolled ? "pt-3" : "pt-5 lg:pt-6",
          hidden && !open && "-translate-y-[180%] opacity-0",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto inline-flex items-center gap-1 sm:gap-2",
            "rounded-[4px] py-1.5 pl-3 pr-1.5",
            // Dim ink glass backdrop (nav-pill in globals.css) with a faint
            // fg ring and a true-black drop for floating depth on dark.
            "nav-pill backdrop-blur-xl",
            "ring-1 ring-fg/[0.08]",
            "shadow-[0_18px_50px_-28px_rgba(0,0,0,0.55)]",
            "transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            scrolled && "ring-fg/[0.14]",
          )}
        >
          <ul aria-hidden={open || undefined} className="hidden lg:flex items-center">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={open ? -1 : undefined}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-glass transition-colors",
                    isCurrent(link.href)
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-overlay"
            aria-label={open ? "Close menu" : "Open menu"}
            className="pressable relative inline-flex size-11 items-center justify-center hover:bg-glass"
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                open ? "rotate-45 translate-y-0" : "-translate-y-[3px]",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                open ? "-rotate-45 translate-y-0" : "translate-y-[3px]",
              )}
            />
          </button>

          <Link
            href="/engage"
            aria-label="Talk to engineering"
            aria-hidden={open || undefined}
            tabIndex={open ? -1 : undefined}
            className={cn(
              "ml-1 inline-flex min-h-11 min-w-11 items-center justify-center gap-2",
              "px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] sm:px-4",
              "pressable bg-flare text-on-flare hover:bg-flare-hi",
            )}
          >
            <span className="hidden sm:inline">Talk to engineering</span>
            <ArrowRight size={12} weight="bold" aria-hidden />
          </Link>
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
            className="fixed inset-0 z-40 bg-ink/96"
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
                    className="pressable inline-flex items-center gap-3 rounded-full bg-flare text-on-flare px-5 py-3 text-sm font-medium hover:bg-flare-hi"
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
