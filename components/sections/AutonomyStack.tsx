"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { DoppelrandCard } from "@/components/primitives/DoppelrandCard";
import { ArrowUpRight, Pulse } from "@phosphor-icons/react/dist/ssr";
import { STACK_LAYERS, type StackLayer } from "@/lib/catalog";

export function AutonomyStack() {
  return (
    <section
      id="stack"
      className="relative py-32 md:py-48 px-6 md:px-10 bg-ink-2 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        <CoordinateStrip
          left="KRT.OPS.2026 · 03"
          center="STACK · ENGAGED"
          right="EDGE · COMMAND · THEATRE"
          className="mb-24"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-24">
          <div>
            <EyebrowTag className="mb-6">The stack · 03</EyebrowTag>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.035em] leading-[0.98] text-fg max-w-[16ch]">
              One stack. Three altitudes. Three products.
            </h2>
          </div>
          <div className="lg:pt-6">
            <p className="text-fg-muted text-[17px] leading-[1.65] max-w-[60ch]">
              The Karta autonomy stack runs at three altitudes — on the
              airframe, at the operator station, and across the theatre. Each
              altitude is a real shipping product, not a slide layer. The
              products and the stack are the same thing.
            </p>
            <Link
              href="/stack"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-amber hover:text-amber-hi transition-colors"
            >
              Read the technical breakdown
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Asymmetric bento — Edge large with live anchor; Command + Theatre stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <EdgeCard layer={STACK_LAYERS[0]} className="lg:col-span-7 lg:row-span-2" />
          <CommandCard layer={STACK_LAYERS[1]} className="lg:col-span-5" />
          <TheatreCard layer={STACK_LAYERS[2]} className="lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}

interface LayerCardProps {
  layer: StackLayer;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  L1 Edge — SkyAnchor — live breathing anchor indicator             */
/* ------------------------------------------------------------------ */

function EdgeCard({ layer, className }: LayerCardProps) {
  const [state, setState] = useState<"acquiring" | "anchored">("acquiring");

  useEffect(() => {
    const id = setInterval(() => {
      setState((s) => (s === "acquiring" ? "anchored" : "acquiring"));
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <DoppelrandCard
        className="h-full"
        innerClassName="h-full flex flex-col p-7 lg:p-10"
      >
        <LayerHeader layer={layer} variant="featured" />

        <p className="text-fg-muted text-[17px] leading-[1.6] mb-8 max-w-[44ch] mt-8">
          {layer.byline}
        </p>

        <ul className="space-y-2.5 pb-8 border-b border-white/[0.06]">
          {layer.capabilities.slice(0, 4).map((cap) => (
            <li
              key={cap}
              className="flex items-center gap-3 text-sm text-fg-muted"
            >
              <span aria-hidden className="block size-1 rounded-full bg-amber" />
              {cap}
            </li>
          ))}
        </ul>

        {/* Live indicator panel */}
        <div className="mt-auto rounded-2xl bg-ink/60 ring-1 ring-white/[0.06] p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
              SkyAnchor · live posture
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={state}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className={`font-mono text-[11px] tracking-[0.18em] uppercase ${
                  state === "anchored" ? "text-ok" : "text-amber"
                }`}
              >
                {state === "anchored" ? "ANCHORED · 0.42m" : "ACQUIRING..."}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <span className="relative inline-flex">
              <span
                className={`block size-3 rounded-full ${
                  state === "anchored" ? "bg-ok" : "bg-amber"
                }`}
              />
              <motion.span
                className={`absolute inset-0 block rounded-full ${
                  state === "anchored" ? "bg-ok" : "bg-amber"
                }`}
                animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            </span>
            <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
                  VIO drift
                </div>
                <div className="font-mono text-fg text-[13px] mt-1">
                  {state === "anchored" ? "0.18 m/km" : "—"}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
                  Terrain match
                </div>
                <div className="font-mono text-fg text-[13px] mt-1">
                  {state === "anchored" ? "0.94" : "0.62"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DoppelrandCard>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  L2 Command — TENERE — intelligent list reordering                 */
/* ------------------------------------------------------------------ */

interface MissionTask {
  id: string;
  label: string;
}

const COMMAND_TASKS: MissionTask[] = [
  { id: "scan-ridge", label: "Scan ridge-line · Sector 4B" },
  { id: "loiter", label: "Loiter · waypoint Kilo" },
  { id: "recon", label: "Recon · culvert at 17.42°N" },
  { id: "rtb", label: "Return to base · low fuel" },
];

function CommandCard({ layer, className }: LayerCardProps) {
  const [tasks, setTasks] = useState<MissionTask[]>(COMMAND_TASKS);

  useEffect(() => {
    const id = setInterval(() => {
      setTasks((prev) => {
        const shuffled = [...prev];
        const i = Math.floor(Math.random() * shuffled.length);
        const j = Math.floor(Math.random() * shuffled.length);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        return shuffled;
      });
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={className}
    >
      <DoppelrandCard
        className="h-full"
        innerClassName="h-full flex flex-col p-7 lg:p-9"
      >
        <LayerHeader layer={layer} />

        <p className="text-fg-muted text-[15px] leading-[1.6] mb-7 max-w-[34ch] mt-7">
          {layer.byline}
        </p>

        <div className="mt-auto rounded-xl bg-ink/60 ring-1 ring-white/[0.06] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
              TENERE · priority queue
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-amber">
              RE-SORTING
            </span>
          </div>
          <ol className="space-y-2">
            {tasks.map((task, i) => (
              <motion.li
                key={task.id}
                layout
                transition={{
                  type: "spring",
                  stiffness: 230,
                  damping: 26,
                  mass: 0.6,
                }}
                className="flex items-center gap-3 rounded-md bg-white/[0.03] ring-1 ring-white/[0.05] px-3 py-2.5"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-amber w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] text-fg-muted flex-1">{task.label}</span>
                <span className="size-1.5 rounded-full bg-amber/70" />
              </motion.li>
            ))}
          </ol>
        </div>
      </DoppelrandCard>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  L3 Theatre — Kiksuya — doctrine typewriter                        */
/* ------------------------------------------------------------------ */

const THEATRE_PROMPTS = [
  "Authority gate: ridge 4B loiter, within geometry.",
  "Doctrine clause 4.3 attached. Plan annotated.",
  "Cross-base federation in 3.2 s. Memory updated.",
  "After-action: every decision, every clause.",
];

function TheatreCard({ layer, className }: LayerCardProps) {
  const [prompt, setPrompt] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const target = THEATRE_PROMPTS[prompt];
    if (text.length < target.length) {
      const id = setTimeout(() => setText(target.slice(0, text.length + 1)), 28);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setText("");
      setPrompt((p) => (p + 1) % THEATRE_PROMPTS.length);
    }, 2200);
    return () => clearTimeout(id);
  }, [text, prompt]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={className}
    >
      <DoppelrandCard
        className="h-full"
        innerClassName="h-full flex flex-col p-7 lg:p-9"
      >
        <LayerHeader layer={layer} />

        <p className="text-fg-muted text-[15px] leading-[1.6] mb-7 max-w-[34ch] mt-7">
          {layer.byline}
        </p>

        <div className="mt-auto rounded-xl bg-ink/60 ring-1 ring-white/[0.06] p-5 font-mono">
          <div className="flex items-center justify-between mb-3 text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
            <span className="flex items-center gap-2">
              <Pulse size={12} weight="bold" className="text-amber" />
              Kiksuya · runtime
            </span>
            <span>0{prompt + 1} / 04</span>
          </div>
          <p className="text-fg text-[14px] leading-[1.5] min-h-[5.6em]">
            {text}
            <span className="inline-block w-[7px] h-[1em] align-middle bg-amber ml-[2px] animate-pulse" />
          </p>
        </div>
      </DoppelrandCard>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared layer header                                                */
/* ------------------------------------------------------------------ */

interface LayerHeaderProps {
  layer: StackLayer;
  variant?: "featured" | "default";
}

function LayerHeader({ layer, variant = "default" }: LayerHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-6">
      <div className="space-y-3">
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
          {layer.number} · {layer.altitude}
        </span>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3
            className={`font-display font-medium tracking-[-0.035em] leading-[0.95] text-fg ${
              variant === "featured"
                ? "text-[clamp(2.5rem,5vw,5rem)]"
                : "text-[clamp(1.875rem,3vw,2.75rem)]"
            }`}
          >
            {layer.layer}
          </h3>
          <span className="font-display text-fg-tertiary text-[clamp(1.25rem,2vw,1.5rem)] font-medium tracking-[-0.02em]">
            · {layer.product}
          </span>
        </div>
      </div>
      <Link
        href={`/stack#${layer.slug}`}
        className="size-10 inline-flex items-center justify-center rounded-full ring-1 ring-white/10 text-fg-tertiary hover:bg-amber hover:text-ink hover:ring-amber transition-all shrink-0"
        aria-label={`Read about ${layer.product}`}
      >
        <ArrowUpRight size={16} weight="bold" />
      </Link>
    </header>
  );
}
