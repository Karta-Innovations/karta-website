"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getVehicle, type PlatformSlug } from "@/lib/catalog";
import {
  getApplicationsByVertical,
  getPayloadsForVertical,
  getPayload,
  type Application,
  type VerticalId,
} from "@/lib/solutions";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { MissionSchematic } from "./MissionSchematic";
import { cn } from "@/lib/cn";

interface MissionConsoleProps {
  vertical: VerticalId;
}

type PlatformFilter = "all" | PlatformSlug;
const PLATFORM_FILTERS: PlatformFilter[] = ["all", "kari", "cerana", "dorsata"];

function platformName(slug: PlatformSlug): string {
  return getVehicle(slug)?.name ?? slug;
}

/**
 * The mission console - the approved configurator (mockup direction C).
 * Mount payloads (union filter) and pick a platform to narrow the mission
 * list; selecting a mission drives the focus panel. Every focus state carries
 * the wedge (SkyAnchor + Kiksuya) in its metric row.
 *
 * Server-rendered initial state shows all missions with the first flagship
 * focused, so the content is present without JS; interaction is progressive.
 */
export function MissionConsole({ vertical }: MissionConsoleProps) {
  const apps = useMemo(() => getApplicationsByVertical(vertical), [vertical]);
  const payloads = useMemo(() => getPayloadsForVertical(vertical), [vertical]);

  const [mounted, setMounted] = useState<ReadonlySet<string>>(new Set());
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [activeSlug, setActiveSlug] = useState<string>(apps[0]?.slug ?? "");

  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      apps.filter((a) => {
        const payloadOk =
          mounted.size === 0 || a.payloadSlugs.some((s) => mounted.has(s));
        const platformOk =
          platform === "all" || a.platformSlugs.includes(platform);
        return payloadOk && platformOk;
      }),
    [apps, mounted, platform],
  );

  // Derived focus - no effect needed. If the active mission filtered out,
  // fall back to the first visible one.
  const active =
    visible.find((a) => a.slug === activeSlug) ?? visible[0] ?? null;

  function togglePayload(slug: string) {
    setMounted((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function reset() {
    setMounted(new Set());
    setPlatform("all");
  }

  const dirty = mounted.size > 0 || platform !== "all";

  // URL sync: read selection from the query on mount, write it back on change.
  const hydratedRef = useRef(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payloadParam = params.get("payloads");
    if (payloadParam) {
      const valid = new Set(payloads.map((p) => p.slug));
      const next = new Set(payloadParam.split(",").filter((s) => valid.has(s)));
      if (next.size) setMounted(next);
    }
    const plat = params.get("platform");
    if (plat && (PLATFORM_FILTERS as string[]).includes(plat)) {
      setPlatform(plat as PlatformFilter);
    }
    const mission = params.get("mission");
    if (mission && apps.some((a) => a.slug === mission)) setActiveSlug(mission);
    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    const params = new URLSearchParams();
    if (mounted.size) params.set("payloads", [...mounted].join(","));
    if (platform !== "all") params.set("platform", platform);
    if (activeSlug && activeSlug !== apps[0]?.slug) {
      params.set("mission", activeSlug);
    }
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
  }, [mounted, platform, activeSlug, apps]);

  return (
    <section className="px-6 md:px-10 py-24 md:py-32 bg-ink-2">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12 lg:mb-16">
          <div>
            <EyebrowTag className="mb-6">Mission console</EyebrowTag>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium tracking-[-0.035em] leading-[1.0] text-fg max-w-[16ch]">
              What you bolt on changes what it does.
            </h2>
          </div>
          <p className="lg:pt-3 text-fg-muted text-[17px] leading-[1.65] max-w-[54ch]">
            Mount a payload to see the missions it unlocks. Filter by platform.
            Every mission runs on the same stack: a fix without GPS, one
            operator across the fleet, and an audit trail from intent to flight.
          </p>
        </div>

        <div className="rounded-[28px] ring-1 ring-white/[0.08] bg-ink overflow-hidden">
          {/* Console header */}
          <div className="flex items-center justify-between gap-4 flex-wrap px-5 md:px-7 py-4 border-b border-white/[0.07]">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
              {vertical === "defense" ? "Defense" : "Enterprise"} · mission
              console
            </span>
            <div className="flex items-center gap-5">
              <span className="font-mono text-[11px] tracking-[0.08em] text-fg-tertiary">
                Showing <span className="text-amber-hi">{visible.length}</span>{" "}
                of {apps.length}
              </span>
              <button
                type="button"
                onClick={reset}
                disabled={!dirty}
                className={cn(
                  "font-mono text-[9.5px] tracking-[0.16em] uppercase rounded-full px-3 py-1.5 ring-1 transition-colors",
                  dirty
                    ? "text-fg-muted ring-white/15 hover:text-fg hover:ring-amber"
                    : "text-fg-tertiary/40 ring-white/[0.06] cursor-not-allowed",
                )}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
            {/* Rail */}
            <div className="p-5 md:p-7 border-b lg:border-b-0 lg:border-r border-white/[0.07]">
              <RailLabel>Mount payload</RailLabel>
              <div className="flex flex-wrap gap-2 mt-3 mb-7">
                {payloads.map((p) => {
                  const on = mounted.has(p.slug);
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => togglePayload(p.slug)}
                      className={cn(
                        "font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full ring-1 transition-colors",
                        on
                          ? "bg-amber text-ink ring-amber"
                          : "text-fg-muted ring-white/15 hover:text-fg hover:ring-amber/60",
                      )}
                    >
                      {p.chipLabel}
                    </button>
                  );
                })}
              </div>

              <RailLabel>Platform</RailLabel>
              <div className="flex flex-wrap gap-2 mt-3 mb-7">
                {PLATFORM_FILTERS.map((pf) => {
                  const on = platform === pf;
                  return (
                    <button
                      key={pf}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPlatform(pf)}
                      className={cn(
                        "font-mono text-[9.5px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full ring-1 transition-colors",
                        on
                          ? "bg-fg text-ink ring-fg"
                          : "text-fg-muted ring-white/15 hover:text-fg hover:ring-fg/40",
                      )}
                    >
                      {pf === "all" ? "All" : platformName(pf)}
                    </button>
                  );
                })}
              </div>

              <RailLabel>Missions</RailLabel>
              <ul className="mt-3 flex flex-col gap-1.5">
                {apps.map((a) => {
                  const shown = visible.some((v) => v.slug === a.slug);
                  if (!shown) return null;
                  const isActive = active?.slug === a.slug;
                  return (
                    <motion.li
                      key={a.slug}
                      layout={!reduce}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 260, damping: 30, mass: 0.6 }
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setActiveSlug(a.slug)}
                        className={cn(
                          "w-full text-left rounded-xl px-3.5 py-3 ring-1 transition-colors",
                          isActive
                            ? "ring-amber bg-gradient-to-br from-indigo/50 to-surface"
                            : "ring-white/[0.07] hover:ring-white/15 bg-white/[0.015]",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {a.flagship ? (
                            <span
                              aria-hidden
                              className="block size-1.5 rounded-full bg-amber shrink-0"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="block size-1.5 rounded-full ring-1 ring-white/20 shrink-0"
                            />
                          )}
                          <span className="text-[13.5px] font-medium tracking-[-0.01em] text-fg leading-tight">
                            {a.name}
                          </span>
                        </span>
                        <span className="block mt-1.5 pl-3.5 font-mono text-[9px] tracking-[0.14em] uppercase text-fg-tertiary">
                          {a.platformSlugs.map(platformName).join(" · ")}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Focus panel */}
            <div className="p-6 md:p-9 min-h-[420px] flex flex-col">
              <AnimatePresence mode="wait" initial={false}>
                {active ? (
                  <motion.div
                    key={active.slug}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col h-full"
                  >
                    <FocusPanel app={active} mounted={mounted} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="m-auto text-center max-w-[36ch]"
                  >
                    <p className="font-mono text-[12px] tracking-[0.06em] text-fg-tertiary leading-[1.7]">
                      No mission uses that combination yet. Remove a payload or
                      widen the platform.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RailLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
      {children}
    </span>
  );
}

interface FocusPanelProps {
  app: Application;
  mounted: ReadonlySet<string>;
}

function FocusPanel({ app, mounted }: FocusPanelProps) {
  return (
    <>
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber">
        Selected mission
      </span>
      <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium tracking-[-0.03em] leading-[1.0] text-fg max-w-[18ch]">
        {app.name}
      </h3>
      <p className="mt-5 text-fg-muted text-[15.5px] leading-[1.65] max-w-[52ch]">
        {app.blurb}
      </p>

      <div className="mt-7 space-y-4">
        <TagRow label="Payload">
          {app.payloadSlugs.map((slug) => {
            const p = getPayload(slug);
            if (!p) return null;
            const have = mounted.has(slug);
            return (
              <span
                key={slug}
                className={cn(
                  "font-mono text-[9.5px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full ring-1 inline-flex items-center gap-1.5",
                  have
                    ? "bg-amber text-ink ring-amber"
                    : "text-amber-hi ring-amber/40",
                )}
              >
                {p.chipLabel}
                {have ? <span aria-hidden>✓</span> : null}
              </span>
            );
          })}
        </TagRow>
        <TagRow label="Platform">
          {app.platformSlugs.map((slug) => (
            <span
              key={slug}
              className="font-mono text-[9.5px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full ring-1 ring-white/15 text-fg"
            >
              {platformName(slug)}
            </span>
          ))}
        </TagRow>
      </div>

      {/* Mission schematic - instrument visual keyed to the primary payload */}
      <div className="mt-7 h-36 rounded-2xl ring-1 ring-white/[0.06] overflow-hidden bg-ink/40">
        <MissionSchematic app={app} />
      </div>

      {/* Metric row - always carries the wedge */}
      <dl className="mt-auto pt-8 flex flex-wrap gap-x-10 gap-y-5">
        <Metric value={app.metric.value} label={app.metric.label} />
        <Metric value="GPS-denied" label="SkyAnchor" />
        <Metric value="audited" label="Kiksuya" />
      </dl>
    </>
  );
}

function TagRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary w-[68px] shrink-0">
        {label}
      </span>
      {children}
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dd className="font-mono text-[19px] tracking-[-0.01em] text-fg leading-none">
        {value}
      </dd>
      <dt className="mt-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-fg-tertiary">
        {label}
      </dt>
    </div>
  );
}
