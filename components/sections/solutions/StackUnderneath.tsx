import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { STACK_LAYERS } from "@/lib/catalog";
import type { VerticalConfig } from "@/lib/solutions";

/**
 * Short band that credits the autonomy stack as the reason any of this works,
 * framed for the vertical, and routes to the full /stack breakdown.
 */
export function StackUnderneath({ config }: { config: VerticalConfig }) {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 bg-ink">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
        <div>
          <EyebrowTag className="mb-6">Underneath</EyebrowTag>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium tracking-[-0.035em] leading-[1.0] text-fg max-w-[16ch]">
            The reason it holds up.
          </h2>
          <p className="mt-6 text-fg-muted text-[16px] leading-[1.7] max-w-[50ch]">
            {config.stackEmphasis}
          </p>
          <div className="mt-9">
            <NestedCTA href="/stack" variant="ghost">
              Read the stack
            </NestedCTA>
          </div>
        </div>

        <ol className="border-t border-border">
          {STACK_LAYERS.map((layer) => (
            <li
              key={layer.slug}
              className="flex items-baseline gap-5 py-5 border-b border-border"
            >
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber w-8 shrink-0">
                {layer.number}
              </span>
              <div>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="font-display text-xl md:text-2xl font-medium tracking-[-0.02em] text-fg">
                    {layer.layer}
                  </span>
                  <span className="font-display text-base text-fg-tertiary font-medium">
                    · {layer.product}
                  </span>
                </div>
                <p className="mt-1.5 text-fg-muted text-[14px] leading-[1.55] max-w-[42ch]">
                  {layer.byline}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
