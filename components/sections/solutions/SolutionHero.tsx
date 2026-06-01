import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import type { VerticalConfig } from "@/lib/solutions";

/**
 * Outcome-first hero for a Solutions vertical. Confident, single promise,
 * one pair of CTAs. Keeps the house coordinate strip + hairline grid.
 */
export function SolutionHero({ config }: { config: VerticalConfig }) {
  return (
    <header className="relative bg-ink overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-10">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5F5F0 1px, transparent 1px), linear-gradient(to bottom, #F5F5F0 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <CoordinateStrip
          left={`KRT.OPS.2026 · ${config.label.toUpperCase()}`}
          center={config.label.toUpperCase()}
          right="SOLUTIONS"
          className="mb-16 md:mb-20"
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20">
          <div>
            <EyebrowTag className="mb-7">{config.eyebrow}</EyebrowTag>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,6rem)] font-medium tracking-[-0.04em] leading-[0.95] text-fg max-w-[15ch]">
              {config.heroTitle}
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <NestedCTA href="/engage">Open an engagement</NestedCTA>
              <NestedCTA href="/vehicles" variant="ghost">
                See the platforms
              </NestedCTA>
            </div>
          </div>
          <div className="lg:pt-3">
            <p className="text-fg-muted text-[17px] leading-[1.7] max-w-[52ch] border-t border-white/[0.08] pt-7">
              {config.heroLede}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
