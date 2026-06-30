import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/PageHeader";
import { EngageForm } from "@/components/forms/EngageForm";
import { DoppelrandCard } from "@/components/primitives/DoppelrandCard";

export const metadata: Metadata = {
  title: "Engage",
  description:
    "Open an engagement with Karta. Procurement, partnership, press - talk directly to the team that ships the code.",
};

export default function EngagePage() {
  return (
    <>
      <PageHeader
        index="07 · ENGAGE"
        eyebrow="Direct line · open"
        title={
          <>
            Talk to <span className="text-amber">engineering</span>, not sales.
          </>
        }
        intro={
          <p>
            Tell us about the envelope you fly and what you are trying to integrate.
          </p>
        }
        coord={{ center: "ENGAGE · OPEN", right: "FIRST REPLY · 48H" }}
      />

      <section className="px-6 md:px-10 pb-32 md:pb-48">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <DoppelrandCard innerClassName="p-7 lg:p-12">
            <EngageForm />
          </DoppelrandCard>

          <aside className="space-y-10 lg:pt-2">
            <section>
              <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-5">
                Direct contacts
              </h2>
              <ul className="space-y-5">
                {[
                  {
                    k: "General enquiries",
                    v: "info@kartainnovations.com",
                  },
                ].map((row) => (
                  <li key={row.k} className="pb-4 border-b border-border">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-1.5">
                      {row.k}
                    </div>
                    <a
                      href={`mailto:${row.v}`}
                      className="font-mono text-[13px] text-fg hover:text-amber transition-colors break-all"
                    >
                      {row.v}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-5">
                Engineering station
              </h2>
              <p className="text-fg text-[15px] leading-[1.65]">
                Karta Innovations
                <br />
                17.454 · 78.500  
              </p>
              <p className="font-mono text-fg-tertiary text-[11px] tracking-[0.22em] uppercase mt-3">
                Wellington Rd, Hyderabad, Telangana, India
              </p>
            </section>
          </aside>
        </div>
      </section>
    </>
  );
}
