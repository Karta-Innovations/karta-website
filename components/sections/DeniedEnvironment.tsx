"use client";

import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { MissionMap } from "./MissionMap";

type DeniedVariant = "home" | "mission";

interface DeniedEnvironmentProps {
  /**
   * "mission" (default) renders the doctrine-context version. "home" adds the
   * scroll-driven plunge: the section's own tokens sink toward absolute black
   * as the sortie begins, and the page surfaces again with the next section.
   * See .denied-scope / .denied-plunge in globals.css.
   */
  variant?: DeniedVariant;
}

export function DeniedEnvironment({ variant = "mission" }: DeniedEnvironmentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();

  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "start 15%"],
  });
  const plunge = useTransform(entryProgress, [0, 1], [0, 1]);
  const plunged = variant === "home";

  return (
    <section
      id="denied"
      ref={sectionRef}
      className={plunged ? "denied-scope relative" : "relative bg-surface-deep"}
    >
      <motion.div
        className={
          plunged
            ? `denied-plunge relative px-6 md:px-10 ${reduce ? "denied-plunge-static" : ""}`
            : "relative px-6 md:px-10"
        }
        style={plunged && !reduce ? ({ "--plunge": plunge } as MotionStyle) : undefined}
      >
        {plunged ? (
          <>
            <div aria-hidden className="denied-grid grid-overlay absolute inset-0 pointer-events-none" />
            <div aria-hidden className="denied-vignette absolute inset-0 pointer-events-none" />
          </>
        ) : null}

        <div className="relative mx-auto max-w-[1400px] pt-32 md:pt-48 pb-28 md:pb-36">
          <div className="mb-8 flex items-center gap-2">
            <span aria-hidden className="h-px w-6 bg-sand" />
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase text-sand font-medium">
              T+00:38:00 · THE NIGHT · REPRESENTATIVE SORTIE · ILLUSTRATIVE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 mb-16 md:mb-20">
            <div>
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.035em] leading-[0.98] text-fg max-w-[20ch]">
                Then the night takes the plan apart.
              </h2>
            </div>
            <div className="lg:pt-6">
              <p className="text-fg-muted text-[17px] leading-[1.65] max-w-[60ch]">
                Three failures across the next thirty minutes. GPS fails first.
                Then comms. Then the sky gets crowded. The mission log is the
                only text that matters now.
              </p>
            </div>
          </div>

          <MissionMap />
        </div>
      </motion.div>
    </section>
  );
}
