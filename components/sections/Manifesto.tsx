import { EyebrowTag } from "@/components/primitives/EyebrowTag";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative py-40 md:py-56 px-6 md:px-10 border-y border-border bg-ink"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-24">
          <div className="space-y-3">
            <EyebrowTag variant="muted">Philosophy · 02</EyebrowTag>
          </div>

          <div>
            <p className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium tracking-[-0.03em] leading-[1.08] text-fg max-w-[28ch]">
              At Karta, we believe the future is{" "}
              <span className="text-amber">unmanned</span>. Our mission is to
              build world-class products that make autonomy practical, reliable
              and ready for the real world.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[78ch]">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
