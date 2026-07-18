"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * ACT 5 — Ground Truth (Hyderabad)
 * Section id="hyderabad"
 *
 * Tightened to the ground-truth beat: place as identity and operating
 * context. Engineered, integrated and flown from Hyderabad — no unsupported
 * proof claims.
 *
 * The hyderabad.jpg image carries the skyline silhouette. Gradients keep
 * the sunset sky readable and establish a dark base under the text. The
 * duotone tint pulls the grayscale art into the teal/sand system. Motion:
 * slow parallax on scroll; reduced motion collapses to static.
 */

export function Hyderabad() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slow parallax: the skyline lags the scroll and breathes slightly.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.04]);

  return (
    <section
      id="hyderabad"
      ref={ref}
      className="relative bg-ink overflow-hidden border-t border-border"
    >
      <div className="relative h-[80vh] min-h-[560px] md:min-h-[640px] w-full overflow-hidden">
        <motion.div
          aria-hidden={false}
          style={reduce ? undefined : { y: imageY, scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/imagery/hyderabad.jpg"
            alt="Operational anchor - Hyderabad skyline at dusk"
            fill
            sizes="100vw"
            className="object-cover"
            quality={88}
            priority={false}
          />
        </motion.div>
        {/* Duotone tint - joins the grayscale art to the teal/sand system. */}
        <div aria-hidden className="duotone-tint absolute inset-0" />
        {/* Vertical scrim - sky visible up top, dark base under the text. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/35 to-ink/95"
        />
        {/* Left-side scrim for text legibility against the silhouette. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/15 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 h-full flex flex-col justify-end py-12 md:py-16">
          <div className="max-w-[44ch]">
            <span
              lang="hi"
              className="font-devanagari block text-[56px] leading-[1] text-fg/90 mb-5"
              aria-label="Hyderabad"
            >
              हैदराबाद
            </span>
            <EyebrowTag variant="muted" className="mb-6">
              17.454 N · 78.500 E · GROUND TRUTH
            </EyebrowTag>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.95] text-fg">
              Built close to the work.
            </h2>
            <p className="mt-7 text-fg-muted text-[17px] leading-[1.65] max-w-[52ch]">
              Engineered, integrated and flown from Hyderabad. The team that
              builds the code is the team that deploys it, close to the
              aerospace, semiconductor and defence-software expertise we draw
              from, and close to the fields where the systems will operate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
