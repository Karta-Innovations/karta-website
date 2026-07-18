"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import {
  OperationalField,
  type OperationalFieldVariant,
} from "@/components/primitives/OperationalField";
import { DURATION, EASING } from "@/lib/motion";
import type { StackLayer } from "@/lib/catalog";
import { AuditExcerpt } from "./AuditExcerpt";

const LAYER_HEADLINES = [
  "It knows where it is, and how sure it is.",
  "It knows what to do next, within approved intent.",
  "It remembers why an action was allowed.",
];

const SURFACES = ["bg-current-deep", "bg-ink-2", "bg-surface-deep"];

const FIELD_CLASSES = [
  "section-field--orientation",
  "section-field--command",
  "section-field--theatre",
];

const FIELD_VARIANTS: OperationalFieldVariant[] = [
  "corridor",
  "boundary",
  "return",
];

const IMAGE_ALTS = [
  "SkyAnchor on-vehicle positioning enclosure for navigation through sustained GNSS denial.",
  "TENERE mission command interface showing an airfield operating picture and vehicle controls.",
  "Kiksuya theatre mission intelligence dashboard with doctrine, audit, and cross-echelon coordination.",
];

const IMAGE_CLASSES = [
  "object-cover object-[50%_50%]",
  "object-cover object-[50%_52%]",
  "object-cover object-[50%_50%]",
];

interface LayerBandProps {
  layer: StackLayer;
  index: number;
}

export function LayerBand({ layer, index }: LayerBandProps) {
  const reduce = useReducedMotionSafe();

  const reveal: Variants = {
    hidden: { opacity: 0, transform: "translateY(22px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: DURATION.slow,
        ease: EASING.expo,
        staggerChildren: reduce ? 0 : 0.055,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, transform: "translateY(8px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: DURATION.base, ease: EASING.expo },
    },
  };

  return (
    <section
      id={layer.slug}
      className={`${SURFACES[index] ?? SURFACES[0]} relative isolate scroll-mt-24 overflow-hidden border-t border-edge px-6 py-20 md:px-10 md:py-24`}
    >
      <div
        aria-hidden
        className={`section-field ${FIELD_CLASSES[index] ?? FIELD_CLASSES[0]}`}
      />
      <OperationalField
        variant={FIELD_VARIANTS[index] ?? FIELD_VARIANTS[0]}
        animated={false}
      />
      <motion.div
        variants={reveal}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -90px 0px" }}
        className="relative z-10 mx-auto grid max-w-[80rem] gap-12 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(32rem,1.22fr)] lg:items-start lg:gap-16 xl:gap-24"
      >
        <div className="lg:sticky lg:top-28">
          <motion.p
            variants={item}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-flare"
          >
            {layer.number} / {layer.layer} layer
          </motion.p>

          <div className="mt-5 overflow-hidden">
            <motion.h2
              variants={item}
              className="font-display text-[16px] font-semibold uppercase leading-[1.2] tracking-[0.16em] text-return"
            >
              {layer.product}
            </motion.h2>
          </div>

          <motion.p
            variants={item}
            className="mt-5 max-w-[25ch] font-display text-[clamp(1.65rem,2.8vw,2.35rem)] font-medium leading-[1.08] text-fg"
          >
            {LAYER_HEADLINES[index]}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-[54ch] text-[15px] leading-[1.7] text-fg-muted"
          >
            {layer.approach}
          </motion.p>

          {layer.capabilities.length > 0 ? (
            <motion.div variants={item} className="mt-9 border-t border-edge pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                Capabilities
              </p>
              <ul className="mt-4 space-y-3">
                {layer.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex gap-3 text-[13px] leading-[1.5] text-fg-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] size-1.5 shrink-0 bg-flare"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>

        <div className="w-full max-w-[32rem] lg:ml-auto">
          <motion.figure
            variants={item}
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{
              duration: reduce ? 0 : DURATION.extra,
              ease: EASING.expo,
              delay: reduce ? 0 : 0.06,
            }}
            viewport={{ once: true, margin: "0px 0px -90px 0px" }}
            className="stack-media group relative aspect-[4/3] overflow-hidden border border-border-strong bg-ink sm:aspect-[16/10]"
          >
            <Image
              src={layer.image}
              alt={IMAGE_ALTS[index] ?? `${layer.product} product visual.`}
              fill
              quality={82}
              sizes="(max-width: 1024px) 100vw, 512px"
              className={`${IMAGE_CLASSES[index] ?? IMAGE_CLASSES[0]} stack-media__image transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`}
            />
            <div aria-hidden className="stack-product-grade absolute inset-0" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/78 via-transparent to-ink/12"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 md:p-6">
              <p className="max-w-[44ch] text-[12px] leading-[1.55] text-fg-muted">
                {layer.byline}
              </p>
              <span className="stack-media__index shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-return transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                0{index + 1}
              </span>
            </figcaption>
          </motion.figure>

          <motion.aside variants={item} className="mt-7 border-y border-edge py-6">
            {layer.posture.length > 0 ? (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-return">
                  Operating posture
                </p>
                <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {layer.posture.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 border-b border-edge py-3"
                    >
                      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-tertiary">
                        {spec.label}
                      </dt>
                      <dd className="text-right font-display text-[13px] font-medium text-fg">
                        {spec.value}
                        {spec.unit ? (
                          <span className="ml-1 font-mono text-[10px] text-fg-muted">
                            {spec.unit}
                          </span>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {layer.integrations.length > 0 ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-fg-tertiary">
                  Integrations
                </p>
                <div className="flex max-w-[32rem] flex-wrap gap-x-5 gap-y-2 sm:justify-end">
                  {layer.integrations.map((integration) => (
                    <span
                      key={integration}
                      className="font-mono text-[10px] text-fg-muted"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {layer.slug === "kiksuya" ? <AuditExcerpt /> : null}
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
