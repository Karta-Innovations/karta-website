import Link from "next/link";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function ClosingCTA() {
  return (
    <section id="engage" className="relative bg-ink px-6 md:px-10 py-40 md:py-56 overflow-hidden">
      <div className="absolute inset-0 -z-0 opacity-[0.08]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, #C8962E 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <CoordinateStrip
          left="KRT.OPS.2026 · 10"
          center="ENGAGE · OPEN"
          right="HYDERABAD · INDIA"
          className="mb-24"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end">
          <div>
            <EyebrowTag className="mb-8">Engage · 10</EyebrowTag>
            <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-medium tracking-[-0.04em] leading-[0.92] text-fg max-w-[14ch]">
              Talk to{" "}
              <span className="text-amber">engineering</span>, not sales.
            </h2>
            <p className="mt-8 text-fg-muted text-[17px] leading-[1.65] max-w-[58ch]">
              For procurement, partnerships, and platform integration. Karta
              engages directly — our first reply comes from the team that ships
              the code, not a funnel.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <NestedCTA href="/engage">Open an engagement</NestedCTA>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-fg-muted hover:text-amber transition-colors font-mono text-[11px] tracking-[0.22em] uppercase"
              >
                or join the team
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

          <aside className="space-y-7 lg:pb-6">
            <ContactRow
              label="General + media"
              value="hello@kartainnovations.com"
              href="mailto:hello@kartainnovations.com"
            />
            <ContactRow
              label="Programmes + procurement"
              value="programmes@kartainnovations.com"
              href="mailto:programmes@kartainnovations.com"
            />
            <ContactRow
              label="Careers"
              value="careers@kartainnovations.com"
              href="mailto:careers@kartainnovations.com"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

interface ContactRowProps {
  label: string;
  value: string;
  href: string;
}

function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <a
      href={href}
      className="block border-t border-white/[0.08] pt-4 group hover:border-amber transition-colors"
    >
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-2">
        {label}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[13px] text-fg group-hover:text-amber transition-colors break-all">
          {value}
        </span>
        <ArrowUpRight
          size={14}
          weight="bold"
          className="text-fg-tertiary group-hover:text-amber transition-colors shrink-0"
        />
      </div>
    </a>
  );
}
