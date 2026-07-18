"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import type { StackLayer } from "@/lib/catalog";
import { AuditExcerpt } from "./AuditExcerpt";

const MISSION_CLOCKS = [
  "T+00:38 · POSITION SOURCE: NONE",
  "T+00:51 · OPERATOR UNREACHABLE",
  "EVERY MINUTE · ON THE RECORD",
];

const LAYER_HEADLINES = [
  "It knows where it is — and how sure it is.",
  "It knows what to do next — within approved intent.",
  "It remembers why an action was allowed.",
];

interface LayerBandProps {
  layer: StackLayer;
  index: number;
}

/**
 * ONE LAYER BAND
 * Full-width alternate-color surface with:
 * - Mission-clock eyebrow tied to the sortie narrative
 * - Plain-language headline
 * - Mechanism paragraph
 * - Capability list
 * - Spec table (reuse from existing pattern)
 * - Integrations line
 * - Audit excerpt (Kiksuya only)
 */
export function LayerBand({ layer, index }: LayerBandProps) {
  const reduce = useReducedMotionSafe();
  const bgClass = index % 2 === 0 ? "bg-current-deep" : "bg-ink-2";

  const reveal: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id={layer.slug}
      className={`${bgClass} relative px-6 py-16 md:px-10 md:py-24 scroll-mt-32`}
    >
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        >
          {/* Mission-clock eyebrow */}
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-sand">
            {MISSION_CLOCKS[index]}
          </p>

          {/* Plain-language headline */}
          <h2 className="mt-4 font-display max-w-[24ch] text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.04em] text-fg">
            {LAYER_HEADLINES[index]}
          </h2>

          {/* Product name, small mono, after headline */}
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
            {layer.product} · {layer.layer}
          </p>

          {/* Mechanism paragraph — design-intent phrasing */}
          <p className="mt-8 max-w-[65ch] text-[clamp(1rem,1.6vw,1.1rem)] leading-[1.7] text-fg-muted">
            {layer.approach}
          </p>

          {/* Capability list */}
          {layer.capabilities.length > 0 && (
            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                Capabilities
              </p>
              <ul className="mt-5 space-y-2.5">
                {layer.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex gap-3 text-[13.5px] leading-[1.5] text-fg-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[6px] size-1.5 shrink-0 rounded-full bg-sand"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spec table (posture) */}
          {layer.posture.length > 0 && (
            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                Posture
              </p>
              <div className="mt-5 space-y-3">
                {layer.posture.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-b border-edge pb-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary">
                      {spec.label}
                    </span>
                    <span className="font-display text-[14px] font-medium text-fg">
                      {spec.value}
                      {spec.unit && (
                        <span className="ml-1 font-mono text-[11px] text-fg-muted">
                          {spec.unit}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations line */}
          {layer.integrations.length > 0 && (
            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                Integrations
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {layer.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="font-mono text-[11px] text-fg-muted"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Audit excerpt — Kiksuya only */}
          {layer.slug === "kiksuya" && <AuditExcerpt />}
        </motion.div>
      </div>
    </section>
  );
}
