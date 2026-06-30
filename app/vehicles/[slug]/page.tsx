import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/PageHeader";
import { SpecTable } from "@/components/primitives/SpecTable";
import { DoppelrandCard } from "@/components/primitives/DoppelrandCard";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { VEHICLES, getVehicle } from "@/lib/catalog";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VEHICLES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  return {
    title: `${vehicle.name} · ${vehicle.family}`,
    description: vehicle.byline,
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const others = VEHICLES.filter((v) => v.slug !== vehicle.slug);

  return (
    <>
      <PageHeader
        eyebrow={vehicle.family}
        title={vehicle.name}
        intro={
          <>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
              {vehicle.descriptors.join(" · ")}
            </p>
            <p>{vehicle.description}</p>
          </>
        }
      />

      <section className="px-6 md:px-10 pb-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden ring-1 ring-edge mb-20">
            {/* Flight-video loop when an asset is supplied (see SOLUTIONS-ASSETS.md);
                otherwise the still image. Poster = the still, so the frame is never
                empty while the video buffers. */}
            {vehicle.video ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={vehicle.image}
                aria-label={`${vehicle.name} in flight`}
              >
                <source src={vehicle.video} />
              </video>
            ) : (
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover"
                quality={92}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
            <div className="space-y-10">
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-5">
                  Capabilities
                </h2>
                <ul className="space-y-4">
                  {vehicle.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0"
                    >
                      <span className="mt-2 size-1.5 rounded-full bg-amber shrink-0" />
                      <span className="text-fg text-[15px] leading-[1.6]">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-5">
                  Doctrine bounds
                </h2>
                <p className="text-fg-muted text-[16px] leading-[1.7] max-w-[60ch]">
                  {vehicle.doctrine}
                </p>
              </div>
            </div>

            <aside>
              <DoppelrandCard innerClassName="p-7 lg:p-9">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-5">
                  Operating envelope
                </div>
                <SpecTable rows={vehicle.specs} variant="ghost" />
              </DoppelrandCard>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-12">
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.1] text-fg max-w-[30ch]">
              The other platforms in the Apis family.
            </p>
            <NestedCTA href="/vehicles" variant="ghost">
              See all platforms
            </NestedCTA>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {others.map((v) => (
              <Link
                key={v.slug}
                href={`/vehicles/${v.slug}`}
                className="group relative aspect-[16/10] rounded-[24px] overflow-hidden ring-1 ring-edge hover:ring-amber/40 transition-all"
              >
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
                    {v.family}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-medium tracking-[-0.03em] text-fg flex items-center gap-3">
                    {v.name}
                    <ArrowUpRight size={16} weight="bold" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
