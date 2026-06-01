import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { AmberSweep } from "@/components/primitives/AmberSweep";
import type { VerticalConfig } from "@/lib/solutions";

/** Vertical-specific closing band, mirroring the homepage engage register. */
export function SolutionClosing({ config }: { config: VerticalConfig }) {
  return (
    <section className="relative bg-ink px-6 md:px-10 py-36 md:py-52 overflow-hidden border-t border-border">
      <AmberSweep className="absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 50%, #C8962E 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <EyebrowTag className="mb-8">Engage</EyebrowTag>
        <h2 className="font-display text-[clamp(2.25rem,6vw,5.5rem)] font-medium tracking-[-0.04em] leading-[0.95] text-fg max-w-[18ch]">
          {config.closingTitle}
        </h2>
        <p className="mt-8 text-fg-muted text-[17px] leading-[1.65] max-w-[56ch]">
          {config.closingBody}
        </p>
        <div className="mt-10">
          <NestedCTA href="/engage">Open an engagement</NestedCTA>
        </div>
      </div>
    </section>
  );
}
