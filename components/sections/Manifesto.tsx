"use client";

import { motion, type Variants } from "framer-motion";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";

interface Segment {
  text: string;
  amber?: boolean;
}

const HEADLINE: Segment[] = [
  { text: "At Karta, we believe the future is" },
  { text: "unmanned.", amber: true },
  { text: "Our mission is to build world-class products that make autonomy practical, reliable and ready for the real world." },
];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025, delayChildren: 0.1 },
  },
};

export function Manifesto() {
  const words = HEADLINE.flatMap((segment, segmentIdx) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word, wordIdx) => ({
        word,
        amber: segment.amber === true,
        key: `${segmentIdx}-${wordIdx}`,
      })),
  );

  return (
    <section
      id="manifesto"
      className="relative py-40 md:py-56 px-6 md:px-10 border-y border-border bg-ink"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-24">
          <div className="space-y-5">
            <span
              lang="sa"
              className="font-devanagari block text-[44px] leading-[1] text-fg/85"
              aria-label="Darshan — vision, philosophy"
            >
              दर्शन
            </span>
            <EyebrowTag variant="muted">Philosophy · 02</EyebrowTag>
          </div>

          <div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -120px 0px" }}
              variants={containerVariants}
              className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium tracking-[-0.03em] leading-[1.08] text-fg max-w-[28ch]"
            >
              {words.map(({ word, amber, key }) => (
                <motion.span
                  key={key}
                  variants={wordVariants}
                  className={`inline-block will-change-transform ${
                    amber ? "text-amber" : ""
                  }`}
                >
                  {word}
                  {" "}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[78ch]"
            >
              <p className="text-fg-muted text-[17px] leading-[1.7]">
                We are focused not just on better drones, but on intelligent
                systems that reduce dependence on pilot skill and make confident
                operation possible at scale.
              </p>
              <p className="text-fg-muted text-[17px] leading-[1.7]">
                Autonomy is not software alone. It comes from integration, data
                discipline, and sustainment. That is the gap we are working to
                close, by staying close to the field.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
