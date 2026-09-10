"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { DURATION, EASING } from "@/lib/motion";
import type { StackLayer } from "@/lib/catalog";

const LAYER_HEADLINES = [
  "It knows where it is, and how sure it is.",
  "It knows what to do next, within approved intent.",
  "It remembers why an action was allowed.",
];

const SURFACES = ["bg-current-deep", "bg-ink-2", "bg-surface-deep"];

const IMAGE_ALTS = [
  "SkyAnchor on-vehicle positioning enclosure for navigation through sustained GNSS denial.",
  "TENERE mission planning interface showing a waypoint route, geofence, and vehicle status over satellite imagery.",
  "Shared mission command interface showing an airfield operating picture and vehicle controls.",
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
      className={`${SURFACES[index] ?? SURFACES[0]} relative isolate scroll-mt-24 overflow-hidden border-t border-edge px-5 py-20 md:px-8 md:py-24`}
    >
      <motion.div
        variants={reveal}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -90px 0px" }}
        className="relative z-10 mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-12 xl:gap-14"
      >
        <div className="lg:sticky lg:top-28">
          <motion.p
            variants={item}
            className="chapter-label"
          >
            {layer.number} / {layer.layer} layer
          </motion.p>

          <div className="mt-5 overflow-hidden">
            <motion.h2
              variants={item}
              className="font-display text-[32px] font-medium leading-[1.2] tracking-[-0.04em] text-fg"
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
            className="mt-6 max-w-[54ch] text-[19px] leading-[1.7] text-fg-muted"
          >
            {layer.approach}
          </motion.p>

          {layer.capabilities.length > 0 ? (
            <motion.div variants={item} className="mt-9 border-t border-edge pt-6">
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-tertiary">
                Capabilities
              </p>
              <ul className="mt-4 space-y-3">
                {layer.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex gap-3 text-[17px] leading-[1.6] text-fg-muted"
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

        <div className="w-full lg:ml-auto">
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
              sizes="(max-width: 1023px) calc(100vw - 40px), (max-width: 1536px) 63vw, 920px"
              className={`${IMAGE_CLASSES[index] ?? IMAGE_CLASSES[0]} stack-media__image transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`}
            />
                        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 md:p-6">
              <p className="max-w-[44ch] text-[14px] leading-[1.55] text-fg-muted">
                {layer.byline}
              </p>
              <span className="stack-media__index shrink-0 font-mono text-[12px] uppercase tracking-[0.18em] text-return transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                0{index + 1}
              </span>
            </figcaption>
          </motion.figure>

          <motion.aside variants={item} className="mt-7 border-y border-edge py-6">
            {layer.posture.length > 0 ? (
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-return">
                  Operating posture
                </p>
                <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {layer.posture.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 border-b border-edge py-3"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-tertiary">
                        {spec.label}
                      </dt>
                      <dd className="text-right font-display text-[15px] font-medium text-fg">
                        {spec.value}
                        {spec.unit ? (
                          <span className="ml-1 font-mono text-[12px] text-fg-muted">
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
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-tertiary">
                  Integrations
                </p>
                <div className="flex max-w-[32rem] flex-wrap gap-x-5 gap-y-2 sm:justify-end">
                  {layer.integrations.map((integration) => (
                    <span
                      key={integration}
                      className="font-mono text-[12px] text-fg-muted"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
