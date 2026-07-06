import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import type { StackLayer } from "@/lib/catalog";
import { STACK_VIEW } from "./stack-data";

interface StackLayerSectionProps {
  layer: StackLayer;
  index: number;
  total: number;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* One layer: concise on the surface, comprehensive in the disclosure. */
export function StackLayerSection({ layer, index, total }: StackLayerSectionProps) {
  const view = STACK_VIEW[layer.slug];
  const flip = index % 2 === 1;

  return (
    <section id={layer.slug} className="scroll-mt-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Content */}
        <div className={cn(flip && "lg:order-2")}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
              {pad(index + 1)} / {pad(total)}
            </span>
            <span aria-hidden className="h-px flex-1 bg-edge" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-tertiary">
              {layer.altitude}
            </span>
          </div>

          <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
            {layer.number} · {layer.layer}
          </p>
          <h2 className="font-display mt-2 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.04em] text-fg">
            {layer.product}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[clamp(1.05rem,1.7vw,1.35rem)] leading-[1.5] text-fg-muted">
            {view.role}
          </p>

          {/* Proof readout */}
          {view.proof.length > 0 ? (
            <div className="mt-9 grid grid-cols-3 gap-x-5 border-t border-edge pt-6">
              {view.proof.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[clamp(1.1rem,1.9vw,1.5rem)] font-medium tracking-[-0.02em] text-fg">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {/* Progressive disclosure: the comprehensive detail */}
          <details className="group mt-8 border-t border-edge pt-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-amber transition-colors hover:text-amber-hi [&::-webkit-details-marker]:hidden">
              <span>The detail</span>
              <span className="inline-flex size-7 items-center justify-center rounded-full text-fg-tertiary ring-1 ring-edge transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180">
                <CaretDown aria-hidden size={13} weight="bold" />
              </span>
            </summary>

            <div className="mt-7 space-y-8">
              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
                    The problem
                  </p>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-fg-muted">
                    {layer.problem}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
                    The approach
                  </p>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-fg-muted">
                    {layer.approach}
                  </p>
                </div>
              </div>

              <div className="grid gap-7 border-t border-edge pt-7 md:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
                    Capabilities
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {layer.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex gap-2.5 text-[13.5px] leading-[1.5] text-fg-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber"
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
                    Integrations
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {layer.integrations.map((integration) => (
                      <li
                        key={integration}
                        className="flex gap-2.5 font-mono text-[13px] text-fg-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[6px] size-1 shrink-0 rounded-full bg-amber"
                        />
                        <span>{integration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Image */}
        <div className={cn(flip && "lg:order-1")}>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[26px] bg-ink ring-1 ring-edge shadow-[0_40px_90px_-52px_rgba(0,0,0,0.6)]">
            <Image
              src={view.image}
              alt={view.alt}
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/45 to-transparent"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-muted ring-1 ring-edge-strong">
              {layer.number} · {layer.layer}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
