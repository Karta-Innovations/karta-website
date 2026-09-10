import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/PageHeader";
import { EngageForm } from "@/components/forms/EngageForm";
import { DoppelrandCard } from "@/components/primitives/DoppelrandCard";

const description =
  "Direct line to Karta engineering. Procurement, partnership, integration - talk to the team that ships the code.";

export const metadata: Metadata = {
  title: "Talk to engineering",
  description,
  alternates: { canonical: "/engage" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Karta Innovations",
    url: "/engage",
    title: "Talk to engineering - Karta Innovations",
    description,
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};

export default function EngagePage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a conversation"
        title="Talk to engineering."
        intro={
          <p>
            Tell us about your platform, operating conditions, and what you need to integrate.
          </p>
        }
      />

      <section className="px-6 md:px-10 pb-32 md:pb-48">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <DoppelrandCard innerClassName="p-7 lg:p-12">
            <EngageForm />
          </DoppelrandCard>

          <aside className="space-y-10 lg:pt-2">
            <section>
              <h2 className="font-mono text-[12px] tracking-[0.22em] uppercase text-sand mb-5">
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
                    <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-fg-tertiary mb-1.5">
                      {row.k}
                    </div>
                    <a
                      href={`mailto:${row.v}`}
                      className="font-mono text-[15px] text-fg hover:text-sand transition-colors break-all"
                    >
                      {row.v}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-[12px] tracking-[0.22em] uppercase text-sand mb-5">
                Location
              </h2>
              <p className="text-fg text-[19px] leading-[1.65]">
                Karta Innovations
                <br />
                Hyderabad, India
              </p>
              <p className="font-mono text-fg-tertiary text-[12px] tracking-[0.22em] uppercase mt-3">
                Wellington Rd, Hyderabad, Telangana, India
              </p>
            </section>
          </aside>
        </div>
      </section>
    </>
  );
}
