import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/primitives/PageHeader";
import { DoppelrandCard } from "@/components/primitives/DoppelrandCard";
import { SpecTable } from "@/components/primitives/SpecTable";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { STACK_LAYERS, type StackLayer } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Karta's autonomy stack - SkyAnchor at the Edge, TENERE at Command, Kiksuya at Theatre. Three altitudes of decision-making, each shipped as a real product.",
};

export default function StackPage() {
  return (
    <>
      <PageHeader
        index="01 · STACK"
        eyebrow="Autonomy stack · 03 products"
        title={
          <>
            One stack. <span className="text-amber">Three products</span>.
          </>
        }
        intro={
          <>
            <p>
              The Karta autonomy stack runs at three altitudes: on the
              airframe, at the operator station, and across the theatre. Each
              altitude is a real shipping product, versioned and integrated
              into the vehicles you fly.
            </p>
            <p>
              The stack and the products are the same thing. SkyAnchor is the
              Edge. TENERE is the Command. Kiksuya is the Theatre.
            </p>
          </>
        }
        coord={{ center: "L1 · L2 · L3", right: "EDGE · COMMAND · THEATRE" }}
      />

      <div className="px-6 md:px-10 pb-32 md:pb-48">
        <div className="mx-auto max-w-[1400px] space-y-24 md:space-y-40">
          {STACK_LAYERS.map((layer, i) => (
            <LayerBlock key={layer.slug} layer={layer} flipped={i % 2 === 1} />
          ))}
        </div>

        <div className="mx-auto max-w-[1400px] mt-32 md:mt-48 border-t border-border pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.1] text-fg max-w-[28ch]">
              Integrate Karta into your platform or programme.
            </p>
            <NestedCTA href="/engage">Open an engagement</NestedCTA>
          </div>
        </div>
      </div>
    </>
  );
}

interface LayerBlockProps {
  layer: StackLayer;
  flipped?: boolean;
}

function LayerBlock({ layer, flipped }: LayerBlockProps) {
  return (
    <section id={layer.slug} className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12 lg:mb-16">
        <div className={flipped ? "lg:order-2" : ""}>
          <div className="flex items-baseline gap-5 mb-7">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
              {layer.number}
            </span>
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
              {layer.altitude}
            </span>
          </div>
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.92] text-fg mb-2">
            {layer.layer}
          </h2>
          <p className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] text-fg-muted mb-7">
            · {layer.product}
          </p>
          <p className="text-fg-muted text-[17px] leading-[1.65] max-w-[52ch] mb-10">
            {layer.byline}
          </p>
        </div>

        <div className={flipped ? "lg:order-1" : ""}>
          <DoppelrandCard innerClassName="p-7 lg:p-9">
            <div className="relative aspect-[16/9] -mx-7 lg:-mx-9 -mt-7 lg:-mt-9 mb-7 lg:mb-9 overflow-hidden rounded-t-[22px]">
              <Image
                src={layer.image}
                alt={`${layer.product} reference imagery`}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
                quality={88}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent" />
            </div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-5">
              Operating posture
            </div>
            <SpecTable rows={layer.posture} variant="ghost" />
          </DoppelrandCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 pt-10 border-t border-border">
        <div>
          <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-4">
            The problem
          </h3>
          <p className="text-fg text-[15px] leading-[1.65] max-w-[44ch]">
            {layer.problem}
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-4">
            The approach
          </h3>
          <p className="text-fg-muted text-[15px] leading-[1.65] max-w-[44ch]">
            {layer.approach}
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-4">
            About the description
          </h3>
          <p className="text-fg-muted text-[15px] leading-[1.65] max-w-[44ch]">
            {layer.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 mt-12 pt-10 border-t border-border">
        <div>
          <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-5">
            Capabilities
          </h3>
          <ul className="space-y-3">
            {layer.capabilities.map((cap) => (
              <li
                key={cap}
                className="flex items-start gap-4 pb-3 border-b border-border last:border-b-0"
              >
                <span className="mt-2 size-1.5 rounded-full bg-amber shrink-0" />
                <span className="text-fg text-[15px] leading-[1.6]">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-5">
            Integrations
          </h3>
          <ul className="space-y-3">
            {layer.integrations.map((int) => (
              <li
                key={int}
                className="flex items-center gap-3 font-mono text-[13px] text-fg pb-3 border-b border-border last:border-b-0"
              >
                <span className="block size-1 rounded-full bg-amber" />
                {int}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
