import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { DeniedEnvironment } from "@/components/sections/DeniedEnvironment";
import { OperatingBounds } from "@/components/sections/OperatingBounds";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Karta's mission, doctrine and physical anchor. Why we exist, what we build, and what we will not.",
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Bounded autonomy",
    body:
      "Every autonomous action is constrained by an operator-approved doctrine. The system surfaces what it cannot do as clearly as what it can.",
  },
  {
    n: "02",
    title: "Integration discipline",
    body:
      "Hardware, software, doctrine and sustainment are one product. We do not ship anything we cannot maintain in the envelope it will fly.",
  },
  {
    n: "03",
    title: "Audit by design",
    body:
      "Every decision the system makes is logged at telemetry-frame granularity. After-action review is not a feature - it is the substrate.",
  },
  {
    n: "04",
    title: "Allied-export discipline",
    body:
      "Engineered for the doctrines we ship under, with export pathways consistent with allied use only.",
  },
];

export default function MissionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Doctrine · why we exist"
        title={
          <>
            Autonomous systems are arriving.{" "}
            <span className="text-amber">They must be bounded</span>.
          </>
        }
        intro={
          <>
            <p>
              Karta exists because the autonomous future is arriving whether we
              participate or not. The choice is not whether autonomous systems
              fly. It is whether they fly under doctrine that is auditable,
              constrained, and built for the field they will see.
            </p>
            <p>
              We are not building one category-leading vehicle. We are building
              the operational autonomy layer underneath autonomous systems, the
              navigation, decision and integration stack that turns hardware
              into a safe, auditable teammate.
            </p>
          </>
        }
      />

      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <EyebrowTag className="mb-10">Operating principles</EyebrowTag>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="pl-6 border-l border-border">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
                  {p.n}
                </span>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.025em] text-fg">
                  {p.title}
                </h3>
                <p className="mt-3 text-fg-muted text-[15px] leading-[1.65] max-w-[48ch]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
        Doctrine flow: principles (above) → the conditions we design for
        (problem space) → what we will and will not build (operating bounds)
        → identity image (below). DeniedEnvironment + OperatingBounds were
        moved here from the landing page so the mission page carries the
        doctrine-heavy material end-to-end.
      */}
      <DeniedEnvironment />
      <OperatingBounds />

      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
          <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.1] text-fg max-w-[28ch]">
            Engage with the team. Or join it.
          </p>
          <div className="flex flex-wrap gap-3">
            <NestedCTA href="/engage">Engage</NestedCTA>
            <NestedCTA href="/careers" variant="ghost">
              See open roles
            </NestedCTA>
          </div>
        </div>
      </section>
    </>
  );
}
