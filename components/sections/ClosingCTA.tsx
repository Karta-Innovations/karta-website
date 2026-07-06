"use client";

import Link from "next/link";
import { useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { AmberSweep } from "@/components/primitives/AmberSweep";
import { useAnimeBoot } from "@/components/motion/useAnimeBoot";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * In-view choreography for the closing ask: the eyebrow leads, the big
 * headline rises line by line, the supporting copy and actions settle,
 * and the contact rows draw in last - the section assembles the way a
 * console comes online. Plays once, when a third of it is visible.
 */
function buildCtaBoot(scope: HTMLElement) {
  const q = (name: string) =>
    scope.querySelectorAll<HTMLElement>(`[data-boot="${name}"]`);

  const tl = createTimeline({ defaults: { ease: "outExpo" } });
  tl.add(q("eyebrow"), { opacity: [0, 1], translateY: [12, 0], duration: 600 });
  tl.add(
    q("line"),
    {
      opacity: [0, 1],
      translateY: ["0.65em", "0em"],
      duration: 1000,
      delay: stagger(130),
    },
    "-=350",
  );
  tl.add(
    q("body"),
    { opacity: [0, 1], translateY: [16, 0], duration: 800 },
    "-=650",
  );
  tl.add(
    q("cta"),
    { opacity: [0, 1], translateY: [12, 0], duration: 700, delay: stagger(90) },
    "-=600",
  );
  tl.add(
    q("aside"),
    { opacity: [0, 1], translateY: [16, 0], duration: 800, delay: stagger(120) },
    "-=700",
  );
  return tl;
}

export function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  useAnimeBoot(ref, buildCtaBoot, { inView: true });

  return (
    <section
      id="engage"
      ref={ref}
      className="boot-scope relative bg-ink px-6 md:px-10 py-32 md:py-48 overflow-hidden"
    >
      <AmberSweep className="absolute inset-x-0 top-0" />
      <div className="absolute inset-0 -z-0 opacity-[0.08]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, var(--color-amber) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end">
          <div>
            <div data-boot="eyebrow">
              <EyebrowTag className="mb-8">Engage</EyebrowTag>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-medium tracking-[-0.04em] leading-[0.92] text-fg max-w-[14ch]">
              <span data-boot="line" className="block will-change-transform">
                Talk to the team
              </span>
              <span data-boot="line" className="block will-change-transform">
                that <span className="text-amber">ships the code</span>.
              </span>
            </h2>
            <p
              data-boot="body"
              className="mt-8 text-fg-muted text-[17px] leading-[1.65] max-w-[58ch]"
            >
              Procurement, partnerships, platform integration: your first reply
              comes from an engineer who works on the stack, not a sales
              funnel.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span data-boot="cta" className="inline-flex">
                <NestedCTA href="/engage">Open an engagement</NestedCTA>
              </span>
              <span data-boot="cta" className="inline-flex">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 text-fg-muted hover:text-amber transition-colors font-mono text-[11px] tracking-[0.22em] uppercase"
                >
                  or join the team
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </span>
            </div>
          </div>

          <aside className="space-y-7 lg:pb-6">
            <div data-boot="aside">
              <ContactRow
                label="General + media + careers + procurement"
                value="info@kartainnovations.com"
                href="mailto:info@kartainnovations.com"
              />
            </div>
            {/* Honest-credibility beat: point at the doctrine, not at claims. */}
            <div data-boot="aside">
              <Link
                href="/mission#bounds"
                className="block border-t border-edge pt-4 group"
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-2">
                  Before you ask
                </div>
                <span className="text-[15px] leading-[1.6] text-fg-muted group-hover:text-fg transition-colors">
                  See our operating bounds: what we build, and what we will not.
                  <ArrowUpRight
                    size={13}
                    weight="bold"
                    className="ml-1.5 inline-block text-fg-tertiary group-hover:text-amber transition-colors"
                  />
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

interface ContactRowProps {
  label: string;
  value: string;
  href: string;
}

function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <a
      href={href}
      className="block border-t border-edge pt-4 group hover:border-amber transition-colors"
    >
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-2">
        {label}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[13px] text-fg group-hover:text-amber transition-colors break-all">
          {value}
        </span>
        <ArrowUpRight
          size={14}
          weight="bold"
          className="text-fg-tertiary group-hover:text-amber transition-colors shrink-0"
        />
      </div>
    </a>
  );
}
