"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * ACT 5 - Ground Truth (Hyderabad)
 * Section id="hyderabad"
 *
 * Tightened to the ground-truth beat: place as identity and operating
 * context. Engineered, integrated and flown from Hyderabad - no unsupported
 * proof claims.
 *
 * The hyderabad.jpg image carries the skyline silhouette. Gradients keep
 * the sunset sky readable and establish a dark base under the text. The
 * duotone tint pulls the grayscale art into the sage, tan and flare system. Motion:
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.02]);

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
          className="hyderabad-media absolute inset-0"
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
        {/* Sage dusk wash multiplies the light sky into the night palette. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-violet-deep/70 mix-blend-multiply"
        />
        {/* Duotone tint joins the grayscale art to the field palette. */}
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
          <motion.div
            className="max-w-[44ch]"
            initial={
              reduce
                ? false
                : { opacity: 0, transform: "translateY(22px)" }
            }
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.56, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          >
            {/* The multiscript Karta identity appears in the launch hero; the place name stays Latin here. */}
            <EyebrowTag variant="muted" className="mb-6">
              17.454 N / 78.500 E / GROUND TRUTH
            </EyebrowTag>
            <h2 className="font-display-wide text-[clamp(2rem,4.4vw,4rem)] uppercase leading-[0.96] tracking-[0.01em] text-fg">
              Built close to the work.
            </h2>
            <p className="mt-7 text-fg-muted text-[17px] leading-[1.65] max-w-[52ch]">
              Engineered, integrated and flown from Hyderabad. The team that
              builds the code is the team that deploys it, close to the
              aerospace, semiconductor and defence-software expertise we draw
              from, and close to the fields where the systems will operate.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
