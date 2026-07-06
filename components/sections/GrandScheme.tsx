"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { ArrowUpRight, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import {
  STACK_LAYERS,
  type StackLayer,
  type StackProductSlug,
} from "@/lib/catalog";

/* ------------------------------------------------------------------ *
 * Situational intelligence, told through the Karta stack: three layers
 * shown as a scroll-assembled deck, foundation (Edge) up to theatre,
 * each a single sparse panel. The autonomy loop is drawn at the end.
 * ------------------------------------------------------------------ */

interface StackItem {
  slug: StackProductSlug;
  /** One-word job for the kicker. */
  job: string;
  /** The single line of value the layer carries. */
  line: string;
  /** Hero image for the band. */
  image: string;
  alt: string;
  /** Mono designation chip on the image frame. */
  chip: string;
}

const STACK_ITEMS: StackItem[] = [
  {
    slug: "skyanchor",
    job: "Position",
    line: "Knows where the vehicle is without GPS, and exactly how much to trust it.",
    image: "/imagery/skyanchor.jpeg",
    alt: "The SkyAnchor edge positioning module, a sealed sensor unit.",
    chip: "PM-KA · Edge module",
  },
  {
    slug: "tenere",
    job: "Decide",
    line: "Turns bounded intent into a sortie graph, deconflicted across the fleet.",
    image: "/imagery/tenere.jpg",
    alt: "The TENERE mission composer over a live airfield, vehicles laid out on the map.",
    chip: "GCS · Mission composer",
  },
  {
    slug: "kiksuya",
    job: "Memory",
    line: "Remembers why every action was allowed, and proves it after the sortie.",
    image: "/imagery/kiksuya.jpg",
    alt: "The Kiksuya theatre dashboard, operating picture with doctrine zones and an audit log.",
    chip: "Theatre · Doctrine runtime",
  },
];

const LAYER_BY_SLUG = Object.fromEntries(
  STACK_LAYERS.map((layer) => [layer.slug, layer]),
) as Record<StackProductSlug, StackLayer>;

interface LoopPhase {
  n: string;
  title: string;
  /** The layer(s) that carry this phase of the loop. */
  owner: string;
}

const LOOP_PHASES: LoopPhase[] = [
  { n: "01", title: "Intent enters", owner: "TENERE" },
  { n: "02", title: "Situation resolves", owner: "SkyAnchor" },
  { n: "03", title: "Mission adapts", owner: "TENERE · Kiksuya" },
  { n: "04", title: "Audit returns", owner: "Kiksuya" },
];

/* Geometry for the autonomy-loop circuit (fixed viewBox, scales uniformly).
   Sized as a full-width spine: bigger nodes, heavier rails, room for the
   return arc to swing wide of the labels. */
const NODE_CX = [130, 363, 597, 830];
const NODE_CY = 96;
const NODE_R = 36;

const VIEWPORT = { once: true, margin: "0px 0px -110px 0px" } as const;

export function GrandScheme() {
  const reduce = useReducedMotionSafe();

  const reveal: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="stack" className="relative bg-ink-2 px-6 py-32 md:px-10 md:py-44">
      <div
        aria-hidden
        className="bg-aurora-soft pointer-events-none absolute inset-0 opacity-80"
      />
      <div
        aria-hidden
        className="grid-overlay pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Intro -------------------------------------------------------- */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20"
        >
          <div>
            <EyebrowTag className="mb-7">The stack</EyebrowTag>
            <h2 className="font-display max-w-[15ch] text-[clamp(2.3rem,5.6vw,5.2rem)] font-medium leading-[0.95] tracking-[-0.045em] text-fg">
              A closed-loop autonomy stack for{" "}  
              <span className="text-amber">unmanned operations.</span>
            </h2>
            <p className="mt-8 max-w-[60ch] text-[17px] leading-[1.7] text-fg-muted">
              It localizes at the edge, 
              executes commander intent through mission control, 
              and records every decision at theatre level.
            </p>
          </div>

          <div className="lg:pb-2">
            <div className="border-t border-edge pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
                The moat
              </p>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-fg-muted">
                Three layers, one architecture. The same autonomy moves between
                airframes, and every decision it takes can be replayed and
                audited afterwards.
              </p>
              <Link
                href="/stack"
                className="group/intro mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-amber-hi"
              >
                Explore the stack
                <ArrowUpRight
                  aria-hidden
                  size={14}
                  weight="bold"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/intro:translate-x-[2px] group-hover/intro:-translate-y-[1px]"
                />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* The three layers, as a compact set of image cards ----------- */}
        <LayerGrid reduce={reduce} />

        {/* The autonomy loop ------------------------------------------- */}
        <LoopClosing reveal={reveal} reduce={reduce} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The stack as a compact set of three image cards                    */
/* ------------------------------------------------------------------ */
function LayerGrid({ reduce }: { reduce: boolean }) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };
  const card: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6"
    >
      {STACK_ITEMS.map((item) => (
        <LayerCard key={item.slug} item={item} variant={card} />
      ))}
    </motion.div>
  );
}

interface LayerCardProps {
  item: StackItem;
  variant: Variants;
}

function LayerCard({ item, variant }: LayerCardProps) {
  const layer = LAYER_BY_SLUG[item.slug];

  return (
    <motion.div variants={variant} className="h-full">
      <Link
        href={`/stack#${layer.slug}`}
        aria-label={`${layer.product}, the ${layer.layer} layer. ${item.line} Read more on the stack page.`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-surface ring-1 ring-edge shadow-[0_30px_60px_-46px_rgba(0,0,0,0.5)] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:ring-edge-strong"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            quality={82}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/45 to-transparent"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-muted ring-1 ring-edge-strong">
            {item.chip}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
            {layer.number} · {layer.layer} · {item.job}
          </p>
          <h3 className="font-display mt-2.5 text-[clamp(1.45rem,2.2vw,2rem)] font-medium leading-[0.98] tracking-[-0.035em] text-fg">
            {layer.product}
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-[1.5] text-fg-muted">
            {item.line}
          </p>
          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fg-tertiary">
              {layer.altitude}
            </span>
            <span
              aria-hidden
              className="inline-flex size-8 items-center justify-center rounded-full bg-glass text-fg-tertiary ring-1 ring-edge transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-amber group-hover:text-ink group-hover:ring-amber"
            >
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* The autonomy loop - the four phases, drawn as a cycle              */
/* ------------------------------------------------------------------ */
interface LoopClosingProps {
  reveal: Variants;
  reduce: boolean;
}

function LoopClosing({ reveal, reduce }: LoopClosingProps) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="mt-14 border-t border-edge pt-14 md:mt-20 md:pt-20"
    >
      <div className="mx-auto max-w-[760px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
          The autonomy loop
        </p>
        <h3 className="font-display mt-5 text-[clamp(1.7rem,3.2vw,2.7rem)] font-medium leading-[1.04] tracking-[-0.04em] text-fg">
          Intent enters, situation resolves, mission adapts, audit returns.{" "}
          <span className="text-amber">Then it begins again.</span>
        </h3>
        <p className="mt-6 text-[16px] leading-[1.65] text-fg-muted">
          In practice: an operator draws a search area over a valley. TENERE
          turns it into flight plans for six aircraft. When jamming starts,
          SkyAnchor keeps each one located, and Kiksuya logs every decision
          for the debrief. Doctrine is not a slide. It is the plan that is
          actually executing.
        </p>
      </div>

      {/* The cycle, drawn */}
      <LoopDiagram reduce={reduce} />

      <div className="mt-6 flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-tertiary">
        <ArrowsClockwise aria-hidden size={14} weight="bold" className="text-amber" />
        <span>Audit becomes the next intent</span>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <NestedCTA href="/stack">Explore the stack</NestedCTA>
        <Link
          href="/engage"
          className="group/talk inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-amber"
        >
          Talk integration
          <ArrowUpRight
            aria-hidden
            size={14}
            weight="bold"
            className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/talk:translate-x-[2px] group-hover/talk:-translate-y-[1px]"
          />
        </Link>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* The loop, drawn: four phases, a forward rail, and a return arc     */
/* that visibly carries audit back to the next intent. The rails draw */
/* scrubbed against scroll; once closed, a signal pulse orbits the    */
/* circuit indefinitely - the loop never stops.                       */
/* ------------------------------------------------------------------ */
function LoopDiagram({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // Draw progress is scrubbed: the circuit assembles as the diagram rises
  // through the lower half of the viewport and is complete by mid-screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 35%"],
  });

  const bottom = NODE_CY + NODE_R;
  const right = NODE_CX[3] + NODE_R;
  const left = NODE_CX[0] - NODE_R;
  // Return arc routed outside the labels: down the right, across the
  // bottom, up the left, then an arrowhead back into the first node.
  const returnArc = `C ${right + 37} ${NODE_CY} ${right + 41} ${NODE_CY + 28} ${right + 41} ${NODE_CY + 56} C ${right + 41} ${NODE_CY + 98} ${right + 17} ${NODE_CY + 120} ${right - 17} ${NODE_CY + 120} L ${left + 17} ${NODE_CY + 120} C ${left - 17} ${NODE_CY + 120} ${left - 41} ${NODE_CY + 98} ${left - 41} ${NODE_CY + 56} C ${left - 41} ${NODE_CY + 28} ${left - 37} ${NODE_CY} ${left} ${NODE_CY}`;
  const returnPath = `M ${right} ${NODE_CY} ${returnArc}`;
  // Full circuit for the orbiting pulse: straight through the nodes (it
  // passes behind them), around the return arc, back to the start.
  const circuitPath = `M ${left} ${NODE_CY} L ${right} ${NODE_CY} ${returnArc}`;

  const pulseOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <div ref={ref} className="mx-auto mt-14 max-w-[1100px]">
      <svg
        viewBox="0 0 960 260"
        className="h-auto w-full"
        role="img"
        aria-label="The autonomy loop: intent enters at TENERE, situation resolves at SkyAnchor, mission adapts at TENERE and Kiksuya, audit returns at Kiksuya, and audit feeds back as the next intent."
      >
        {/* orbiting signal pulse - rendered first so it slips behind nodes */}
        {!reduce ? (
          <motion.g style={{ opacity: pulseOpacity }}>
            <circle
              r={4.5}
              fill="var(--color-signal)"
              style={{ filter: "drop-shadow(0 0 6px var(--color-signal))" }}
            >
              <animateMotion
                dur="6.4s"
                repeatCount="indefinite"
                path={circuitPath}
              />
            </circle>
          </motion.g>
        ) : null}

        {/* forward rail between consecutive phases */}
        {[0, 1, 2].map((i) => {
          const x1 = NODE_CX[i] + NODE_R + 7;
          const x2 = NODE_CX[i + 1] - NODE_R - 7;
          return (
            <g key={`seg-${i}`}>
              <ScrubbedPath
                d={`M ${x1} ${NODE_CY} L ${x2} ${NODE_CY}`}
                stroke="var(--color-amber)"
                progress={scrollYProgress}
                range={[i * 0.18, i * 0.18 + 0.18]}
                reduce={reduce}
              />
              <ScrubbedHead
                d={`M ${x2 - 8} ${NODE_CY - 6} L ${x2} ${NODE_CY} L ${x2 - 8} ${NODE_CY + 6}`}
                stroke="var(--color-amber)"
                progress={scrollYProgress}
                at={i * 0.18 + 0.16}
                reduce={reduce}
              />
            </g>
          );
        })}

        {/* return arc - the loop closing back to intent, cyan telemetry */}
        <g style={{ filter: "drop-shadow(0 0 7px color-mix(in srgb, var(--color-gold) 45%, transparent))" }}>
          <ScrubbedPath
            d={returnPath}
            stroke="var(--color-gold)"
            progress={scrollYProgress}
            range={[0.52, 0.94]}
            reduce={reduce}
          />
        </g>
        <ScrubbedHead
          d={`M ${left - 7} ${NODE_CY - 7} L ${left} ${NODE_CY} L ${left - 7} ${NODE_CY + 7}`}
          stroke="var(--color-gold)"
          progress={scrollYProgress}
          at={0.93}
          reduce={reduce}
        />

        {/* phase nodes (always legible, even before/without motion) */}
        {LOOP_PHASES.map((phase, i) => (
          <g key={phase.n}>
            <circle
              cx={NODE_CX[i]}
              cy={NODE_CY}
              r={NODE_R}
              fill="var(--color-indigo)"
              stroke="color-mix(in srgb, var(--color-amber) 45%, transparent)"
              strokeWidth={1.5}
            />
            <text
              x={NODE_CX[i]}
              y={NODE_CY + 5}
              textAnchor="middle"
              fill="var(--color-amber)"
              style={{ fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: "0.06em", fontWeight: 500 }}
            >
              {phase.n}
            </text>
            <text
              x={NODE_CX[i]}
              y={bottom + 26}
              textAnchor="middle"
              fill="var(--color-fg)"
              style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              {phase.title}
            </text>
            <text
              x={NODE_CX[i]}
              y={bottom + 44}
              textAnchor="middle"
              fill="var(--color-fg-tertiary)"
              style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em" }}
            >
              {phase.owner.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

interface ScrubbedPathProps {
  d: string;
  stroke: string;
  progress: MotionValue<number>;
  /** Slice of scroll progress over which this path draws 0 to 1. */
  range: [number, number];
  reduce: boolean;
}

/** A path whose draw-on is scrubbed by scroll instead of played on a timer. */
function ScrubbedPath({ d, stroke, progress, range, reduce }: ScrubbedPathProps) {
  const pathLength = useTransform(progress, range, [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={reduce ? undefined : { pathLength }}
    />
  );
}

interface ScrubbedHeadProps {
  d: string;
  stroke: string;
  progress: MotionValue<number>;
  /** Scroll-progress point at which the arrowhead appears. */
  at: number;
  reduce: boolean;
}

function ScrubbedHead({ d, stroke, progress, at, reduce }: ScrubbedHeadProps) {
  const opacity = useTransform(progress, [at, Math.min(at + 0.04, 1)], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={reduce ? undefined : { opacity }}
    />
  );
}
