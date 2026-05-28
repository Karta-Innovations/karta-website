"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/chrome/Logo";

interface NavLink {
  label: string;
  href: string;
  detail: string;
}

const LINKS: NavLink[] = [
  { label: "Stack", href: "/stack", detail: "SkyAnchor · TENERE · Kiksuya" },
  { label: "Vehicles", href: "/vehicles", detail: "Apis family platforms" },
  { label: "Mission", href: "/mission", detail: "Doctrine and bounds" },
  { label: "Field Notes", href: "/field-notes", detail: "Engineering essays" },
  { label: "Careers", href: "/careers", detail: "Open roles" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center",
          "pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "pt-3" : "pt-6",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto inline-flex items-center gap-1 sm:gap-2",
            "rounded-full px-2 py-2",
            "bg-ink/70 backdrop-blur-xl",
            "ring-1 ring-white/[0.07]",
            "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]",
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled && "ring-white/[0.10] bg-ink/85",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 pl-3 pr-3 py-1 rounded-full hover:bg-white/[0.04] transition-colors"
            aria-label="Karta — home"
          >
            <Logo size={26} priority showWordmark />
          </Link>

          <ul className="hidden lg:flex items-center">
            {LINKS.slice(0, 3).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3 py-1.5 text-[13px] text-fg-muted hover:text-fg rounded-full hover:bg-white/[0.04] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-overlay"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative size-9 inline-flex items-center justify-center rounded-full hover:bg-white/[0.04] transition-colors"
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-4 bg-fg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "rotate-45 translate-y-0" : "-translate-y-[3px]",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-4 bg-fg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "-rotate-45 translate-y-0" : "translate-y-[3px]",
              )}
            />
          </button>

          <Link
            href="/engage"
            className={cn(
              "ml-1 inline-flex items-center gap-2 rounded-full",
              "px-4 py-1.5 text-[13px] font-medium",
              "bg-amber text-ink hover:bg-amber-hi",
              "transition-colors duration-300",
            )}
          >
            Engage
            <span aria-hidden className="text-[10px] font-mono tracking-wider opacity-70">
              →
            </span>
          </Link>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            id="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ink/90 backdrop-blur-3xl"
          >
            <div className="absolute inset-0 px-6 pt-24 pb-10 overflow-y-auto">
              <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-24 pt-8">
                <ol className="space-y-2">
                  {LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.7,
                        delay: 0.12 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-white/[0.06]"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between py-5 hover:pl-2 transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        <span className="flex items-baseline gap-5">
                          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary group-hover:text-amber transition-colors">
                            0{i + 1}
                          </span>
                          <span className="font-display text-[clamp(2rem,5vw,4.25rem)] font-medium tracking-[-0.03em] leading-[0.95] text-fg group-hover:text-amber transition-colors">
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
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-10"
                >
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                      17.385°N 78.486°E
                    </span>
                    <p className="mt-3 text-fg-muted leading-relaxed max-w-[28ch]">
                      Engineered close to the field. Tested across high
                      altitude, arid, littoral and contested envelopes.
                    </p>
                  </div>
                  <Link
                    href="/engage"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-3 rounded-full bg-amber text-ink px-5 py-3 text-sm font-medium hover:bg-amber-hi transition-colors"
                  >
                    Talk to engineering
                    <span aria-hidden>→</span>
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
