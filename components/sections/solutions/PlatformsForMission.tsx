import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { VEHICLES } from "@/lib/catalog";
import { getApplicationsByVertical, type VerticalId } from "@/lib/solutions";

/**
 * The three airframes framed for this vertical. Image-led portrait tiles that
 * route to the platform spec pages - the hardware sits downstream of the
 * mission, Skydio-style.
 */
export function PlatformsForMission({ vertical }: { vertical: VerticalId }) {
  const apps = getApplicationsByVertical(vertical);

  return (
    <section className="px-6 md:px-10 py-24 md:py-32 bg-ink-2 border-t border-border">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12 lg:mb-16">
          <div>
            <EyebrowTag className="mb-6">The platforms that carry it</EyebrowTag>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium tracking-[-0.035em] leading-[1.0] text-fg max-w-[14ch]">
              Three airframes, one stack.
            </h2>
          </div>
          <p className="lg:pt-3 text-fg-muted text-[17px] leading-[1.65] max-w-[54ch]">
            The mission picks the platform. Each is a deliberate point in the
            operating envelope, and each runs the same autonomy stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {VEHICLES.map((v) => {
            const count = apps.filter((a) =>
              a.platformSlugs.includes(v.slug),
            ).length;
            return (
              <Link
                key={v.slug}
                href={`/vehicles/${v.slug}`}
                className="group relative aspect-[4/5] rounded-[24px] overflow-hidden ring-1 ring-white/[0.06] hover:ring-amber/40 transition-all"
              >
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 p-6 lg:p-7 flex flex-col justify-end">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber">
                    {v.family}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-medium tracking-[-0.03em] text-fg flex items-center gap-3">
                    {v.name}
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </h3>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.14em] uppercase text-fg-tertiary">
                    {count} mission{count === 1 ? "" : "s"} in this theatre
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
