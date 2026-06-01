import type { VerticalConfig } from "@/lib/solutions";

/**
 * The wedge - why Karta wins this vertical. Hairline-topped columns rather
 * than boxed cards, so it reads as a manifest, not a feature grid.
 */
export function ProofPillars({ config }: { config: VerticalConfig }) {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-ink border-t border-border">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {config.pillars.map((pillar, i) => (
            <div key={pillar.title} className="border-t border-border pt-5">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[clamp(1.25rem,1.9vw,1.65rem)] font-medium tracking-[-0.02em] text-fg leading-[1.1]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-fg-muted text-[14.5px] leading-[1.6] max-w-[34ch]">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
