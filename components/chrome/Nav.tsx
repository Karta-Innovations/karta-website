"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { lockScroll, scrollToTarget } from "@/lib/scroll";
import { MENU_LINKS, NAV_LINKS, SITE } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The header. It takes the tone of whatever band of the page sits under it,
 * steps out of the way on the way down and returns on the way up. Below
 * 1024 px the links move into a full-screen menu.
 */
export function Nav() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.toggleAttribute("data-scrolled", y > 16);
      if (y < 140 || y < last - 2) header.removeAttribute("data-hidden");
      else if (y > last + 2) header.setAttribute("data-hidden", "");
      last = y;

      // Take the tone of the band under the bar.
      let tone = "night";
      for (const element of document.elementsFromPoint(window.innerWidth / 2, Math.max(header.offsetHeight / 2, 8))) {
        if (header.contains(element) || element.closest("#site-menu, dialog")) continue;
        const band = element.closest<HTMLElement>("[data-tone]");
        if (band) {
          tone = band.dataset.tone ?? "night";
          break;
        }
      }
      if (header.dataset.tone !== tone) header.dataset.tone = tone;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // The menu owns the page while it is open.
  useEffect(() => {
    if (!open) return;
    const outside = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    outside.forEach((element) => element.setAttribute("inert", ""));
    lockScroll(true);
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []).concat(
        toggleRef.current ? [toggleRef.current] : [],
      );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", onWide);
    return () => {
      outside.forEach((element) => element.removeAttribute("inert"));
      lockScroll(false);
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  function follow(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false);
    if (pathname !== "/" || !href.startsWith("/#")) return;
    const target = document.querySelector<HTMLElement>(href.slice(1));
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(null, "", href);
    // Let the menu release the scroll lock before gliding.
    requestAnimationFrame(() => scrollToTarget(target));
  }

  const current = (href: string) => (!href.startsWith("/#") && pathname.startsWith(href) ? "page" : undefined);

  return (
    <>
      <header ref={headerRef} className="nav" data-tone="night" data-open={open ? "" : undefined}>
        <div className="wrap nav__bar">
          <Link href="/" className="lockup" aria-label={`${SITE.name}, home`} onClick={() => setOpen(false)}>
            <Mark size={30} />
            <Wordmark size={12.5} />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} aria-current={current(link.href)} onClick={(event) => follow(event, link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/engage" className="nav__cta" aria-current={current("/engage")}>
            <span>Talk to engineering</span>
            <ArrowRight size={15} weight="bold" aria-hidden />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="nav__toggle-mark" aria-hidden />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="site-menu"
            className="menu"
            data-tone="night"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div className="wrap menu__inner">
              <nav className="menu__links" aria-label="Menu">
                {MENU_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.16 + index * 0.055 }}
                  >
                    <Link href={link.href} className="menu__link" aria-current={current(link.href)} onClick={(event) => follow(event, link.href)}>
                      <span className="menu__label">{link.label}</span>
                      <span className="menu__detail">{link.detail}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                className="menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link href="/engage" className="btn" onClick={() => setOpen(false)}>
                  <span>Talk to engineering</span>
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
                <a href={`mailto:${SITE.email}`} className="link">
                  {SITE.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
