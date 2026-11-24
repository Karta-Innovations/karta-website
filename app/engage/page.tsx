import type { Metadata } from "next";
import { EngageForm } from "@/components/forms/EngageForm";
import { PageHeader } from "@/components/primitives/PageHeader";
import { SITE } from "@/lib/site";

const description =
  "A direct line to Karta engineering: evaluation flights, integrations and complete systems. Talk to the team that builds and flies it.";

export const metadata: Metadata = {
  title: "Talk to engineering",
  description,
  alternates: { canonical: "/engage" },
  openGraph: { type: "website", url: "/engage", title: "Talk to engineering · Karta Innovations", description },
};

const INCLUDE = [
  "Your platform and autopilot",
  "The GNSS conditions you expect to operate in",
  "Your timeline for trials or integration",
];

export default function EngagePage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a conversation"
        title="Talk to engineering."
        intro={
          <p className="lede">
            Tell us about your platform, where it has to fly and what you need. The reply comes from the people
            who build and fly SkyAnchor.
          </p>
        }
      />

      <section className="section" data-tone="cream">
        <div className="wrap engage">
          <div className="engage__form">
            <EngageForm />
          </div>

          <aside className="engage__aside">
            <section>
              <h2 className="label">Direct</h2>
              <a href={`mailto:${SITE.email}`} className="t-4 engage__mail">
                {SITE.email}
              </a>
            </section>
            <section>
              <h2 className="label">Find us</h2>
              <address>
                {SITE.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <p className="label">{SITE.coordinates}</p>
            </section>
            <section>
              <h2 className="label">Useful to include</h2>
              <ul className="engage__list">
                {INCLUDE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </section>
    </>
  );
}
