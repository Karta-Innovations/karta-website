import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/PageHeader";
import { SpecTable } from "@/components/primitives/SpecTable";
import { VEHICLES } from "@/lib/catalog";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Vehicles · Apis family",
  description:
    "Karta's Apis family of air vehicles - Cerana, Dorsata and Kari. One autonomy stack, three deliberate platforms.",
};

export default function VehiclesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apis family · 03 platforms"
        title={
          <>
            Three airframes. <span className="text-amber">One autonomy stack</span>.
          </>
        }
        intro={
          <>
            <p>
              The Apis family is named for the bee genus - disciplined,
              formation-aware, built for the envelope it flies.
            </p>
            <p>
              Each platform is a deliberate point in the operational design
              space. Kari is built for proximity and agility. Cerana is built
              for endurance and reach. Dorsata is built for payload lift and
              long watchstanding. The autonomy stack underneath is the same.
            </p>
          </>
        }
      />

      <div className="px-6 md:px-10 pb-32 md:pb-48">
        <div className="mx-auto max-w-[1400px] space-y-12 md:space-y-16">
          {VEHICLES.map((v, i) => (
            <Link
              key={v.slug}
              href={`/vehicles/${v.slug}`}
              className="group block relative aspect-[4/5] md:aspect-[16/9] rounded-[28px] overflow-hidden ring-1 ring-edge hover:ring-amber/40 transition-all duration-500"
            >
              <Image
                src={v.image}
                alt={v.name}
                fill
                sizes="(max-width: 1024px) 100vw, 1300px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                quality={88}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-14 flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-16">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
                    0{i + 1} · {v.family}
                  </span>
                  <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] font-medium tracking-[-0.04em] leading-[0.92] text-fg">
                    {v.name}
                  </h2>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                    {v.descriptors.join(" · ")}
                  </p>
                  <p className="mt-auto pt-8 text-fg-muted text-[17px] leading-[1.6] max-w-[48ch]">
                    {v.byline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-fg group-hover:text-amber transition-colors">
                    Platform doctrine
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </div>

                <aside className="lg:self-end rounded-2xl bg-ink/65 backdrop-blur-md ring-1 ring-edge-strong p-6">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-3">
                    Operating envelope
                  </div>
                  <SpecTable rows={v.specs.slice(0, 5)} variant="ghost" />
                </aside>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
