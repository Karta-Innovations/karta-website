import Image from "next/image";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";

/**
 * The "Anchor" section. Used to live as "From Hyderabad" with explicit
 * geographic chest-thumping. Now reframed as an operational-station moment:
 * coordinates, station data, and a single still. Place is implied, not announced.
 */
export function Hyderabad() {
  return (
    <section
      id="anchor"
      className="relative bg-ink overflow-hidden border-t border-border"
    >
      <div className="relative h-[80vh] min-h-[640px] w-full">
        <Image
          src="/imagery/urban-industrial.jpg"
          alt="Operational anchor"
          fill
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-ink/40"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 h-full flex flex-col justify-between py-12 md:py-16">
          <CoordinateStrip
            left="KRT.OPS.2026 · 09"
            center="STATION · ANCHORED"
            right="17.385°N 78.486°E"
          />

          <div className="max-w-[44ch]">
            <EyebrowTag className="mb-6">Operational anchor · 09</EyebrowTag>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.95] text-fg">
              Engineered close to the field.
            </h2>
            <p className="mt-7 text-fg-muted text-[17px] leading-[1.65] max-w-[52ch]">
              The team that ships the code is the team that deploys it. Karta
              operates a single engineering station, close to the aerospace,
              semiconductor and defence-software talent we draw from, and close
              to the envelopes our vehicles fly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1100px]">
            {[
              { k: "Engineering station", v: "Single site" },
              { k: "Field operations", v: "Five envelopes" },
              { k: "Sustainment range", v: "Sub-continental" },
              { k: "Manufacturing", v: "Tier-1 partnered" },
            ].map((row) => (
              <div
                key={row.k}
                className="space-y-1.5 border-t border-white/[0.12] pt-4"
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
                  {row.k}
                </div>
                <div className="font-mono text-[13px] tracking-[0.02em] text-fg">
                  {row.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
