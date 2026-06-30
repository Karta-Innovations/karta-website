import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { StackArchitecture } from "@/components/sections/stack/StackArchitecture";
import { StackLayerSection } from "@/components/sections/stack/StackLayerSection";
import { STACK_LAYERS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Karta's operational autonomy layer: SkyAnchor at the edge, TENERE at command, Kiksuya at theatre. Intent flows down, situation and audit flow back up.",
};

export default function StackPage() {
  return (
    <>
      <PageHeader
        eyebrow="The autonomy stack"
        title={
          <>
            Three layers, <span className="text-amber">one closed loop</span>.
          </>
        }
        intro={
          <p>
            Intent and doctrine flow down through three layers; situation and
            audit flow back up. Each layer ships as a real product.
          </p>
        }
      />

      <div className="px-6 pb-32 md:px-10 md:pb-48">
        <div className="mx-auto max-w-[1400px]">
          <StackArchitecture />

          <div className="mt-28 space-y-28 md:mt-40 md:space-y-40">
            {STACK_LAYERS.map((layer, index) => (
              <StackLayerSection
                key={layer.slug}
                layer={layer}
                index={index}
                total={STACK_LAYERS.length}
              />
            ))}
          </div>

          <div className="mt-28 border-t border-border pt-16 md:mt-40">
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
              <p className="font-display max-w-[28ch] text-[clamp(1.6rem,3.2vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.035em] text-fg">
                Integrate the autonomy layer into an airframe, platform, or
                programme.
              </p>
              <NestedCTA href="/engage">Open an engagement</NestedCTA>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
