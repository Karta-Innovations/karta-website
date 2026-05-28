import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/PageHeader";
import { ROLES } from "@/lib/content/roles";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open engineering roles at Karta. Build the operational autonomy layer for unmanned systems.",
};

export default function CareersPage() {
  const open = ROLES.filter((r) => r.status === "open");

  return (
    <>
      <PageHeader
        index="06 · CAREERS"
        eyebrow="Engineering team · single station"
        title={
          <>
            Build the stack <span className="text-amber">that flies</span>.
          </>
        }
        intro={
          <>
            <p>
              Karta hires for ownership and field-grounding. The people who
              build the stack also deploy it. If you have ever wanted what you
              build to be operationally consequential — not theoretically
              important — this is the right room.
            </p>
            <p>
              We work from a single engineering station, with field operations
              across high-altitude, arid, littoral, urban and contested
              envelopes. Compensation is competitive for senior deeptech work,
              with meaningful equity for early team.
            </p>
          </>
        }
        coord={{
          center: "ROLES · OPEN",
          right: `${open.length} ROLE${open.length === 1 ? "" : "S"}`,
        }}
      />

      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-10">
            Open roles
          </h2>
          <ol>
            {open.map((role, i) => (
              <li
                key={role.slug}
                className="border-t border-border last:border-b"
              >
                <Link
                  href={`/careers/${role.slug}`}
                  className="group block py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-[120px_1fr_auto] gap-6 lg:gap-12 items-baseline"
                >
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
                      0{i + 1}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-tertiary mt-1">
                      {role.team}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.05] text-fg group-hover:text-amber transition-colors">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-fg-muted text-[15px] leading-[1.6] max-w-[60ch]">
                      {role.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary">
                      <span>{role.location}</span>
                      <span>{role.seniority}</span>
                    </div>
                  </div>
                  <div className="lg:flex items-center gap-2 text-fg-muted group-hover:text-amber transition-colors hidden">
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                      Read role
                    </span>
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-16 rounded-2xl bg-white/[0.025] ring-1 ring-white/[0.06] p-8">
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-fg mb-3">
              Don&apos;t see your role?
            </h3>
            <p className="text-fg-muted text-[15px] leading-[1.65] max-w-[55ch]">
              We hire opportunistically for engineers who would clearly raise
              the bar. Write to{" "}
              <a
                href="mailto:careers@kartainnovations.com"
                className="text-amber hover:underline underline-offset-4 decoration-amber/40"
              >
                careers@kartainnovations.com
              </a>{" "}
              with what you have built and what you want to build.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
