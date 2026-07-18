"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { OperationalField } from "@/components/primitives/OperationalField";
import { useAnimeBoot } from "@/components/motion/useAnimeBoot";
import { createTimeline, stagger } from "animejs";

/**
 * ACT 6 - The Landing (Conclusion)
 * Section id="landing"
 *
 * Close the story and the loop. The mission clock stops. A final mono log
 * line announces the landing. The core is restated once (Simple), and three
 * calls to action follow.
 *
 * Surface: night ink (bg-surface-deep)
 * Eyebrow: "T+01:42:00 / WHEELS DOWN / SORTIE COMPLETE / RECORD SEALED / READY FOR REVIEW"
 * Body: core restated with orchid emphasis
 * CTAs: Talk to engineering, Build it with us, Read Field Notes
 */

function buildLandingBoot(scope: HTMLElement) {
  const q = (name: string) =>
    scope.querySelectorAll<HTMLElement>(`[data-boot="${name}"]`);

  const tl = createTimeline({ defaults: { ease: "outExpo" } });
  // Log line types in first
  tl.add(q("log"), {
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 600,
  });
  // Core statement rises next
  tl.add(
    q("core"),
    { opacity: [0, 1], translateY: [16, 0], duration: 700, delay: stagger(50) },
    "-=300",
  );
  // CTAs settle last
  tl.add(
    q("cta"),
    { opacity: [0, 1], translateY: [12, 0], duration: 500, delay: stagger(50) },
    "-=450",
  );
  return tl;
}

export function LandingAct() {
  const ref = useRef<HTMLElement>(null);
  useAnimeBoot(ref, buildLandingBoot, { inView: true });

  return (
    <section
      id="landing"
      ref={ref}
      className="boot-scope relative isolate overflow-hidden border-t border-border bg-surface-deep px-6 py-24 md:px-10 md:py-44"
    >
      <div aria-hidden className="section-field section-field--landing" />
      <OperationalField variant="return" animated />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Final mission log line */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div data-boot="log" className="will-change-transform">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-return/80 text-center">
              T+01:42:00 / WHEELS DOWN / SORTIE COMPLETE / RECORD SEALED /
              READY FOR REVIEW
            </p>
          </div>
        </div>

        {/* Core restated once */}
        <div className="max-w-[90rem] mx-auto mb-16 md:mb-20">
          <div className="flex flex-col items-center text-center">
            <p className="max-w-[72ch] font-display text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[0.98] tracking-[-0.02em]">
              <span data-boot="core" className="inline-block will-change-transform">
                Operational
              </span>
              {" "}
              <span
                data-boot="core"
                className="inline-block will-change-transform text-flare"
              >
                autonomy:
              </span>
              {" "}
              <span data-boot="core" className="inline-block will-change-transform">
                command that survives uncertainty -
              </span>
              {" "}
              <span data-boot="core" className="inline-block will-change-transform">
                and returns a record you can review.
              </span>
            </p>
          </div>
        </div>

        {/* Calls to action */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-20 md:mb-28">
          <div data-boot="cta" className="inline-flex will-change-transform">
            <NestedCTA href="/engage">Talk to engineering</NestedCTA>
          </div>

          <div data-boot="cta" className="inline-flex will-change-transform">
            <NestedCTA href="/careers" variant="ghost">
              Build it with us
            </NestedCTA>
          </div>
        </div>

        {/* Quiet text link */}
        <div className="flex justify-center">
          <Link
            href="/field-notes"
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary hover:text-flare transition-colors"
          >
            Read Field Notes - how we think, in public
            <ArrowUpRight
              aria-hidden
              size={14}
              weight="bold"
              className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
