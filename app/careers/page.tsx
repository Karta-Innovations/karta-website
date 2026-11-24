import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/primitives/PageHeader";
import { ROLES } from "@/lib/content/roles";
import { SITE } from "@/lib/site";

const description =
  "Open engineering roles at Karta in Hyderabad. Build the autonomy stack for unmanned systems, from the first line of code to the test site.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: { type: "website", url: "/careers", title: "Careers · Karta Innovations", description },
};

const WORK = [
  { title: "Navigation without GPS", body: "Knowing where the aircraft is when GPS is jammed or spoofed, and how sure to be." },
  { title: "Perception", body: "What is around the aircraft, on embedded compute, in real light." },
  { title: "Mission autonomy", body: "Planning and deconfliction inside limits an operator sets." },
  { title: "Flight test", body: "Integration, instrumentation and the evidence that comes back." },
];

export default function CareersPage() {
  const open = ROLES.filter((role) => role.status === "open");

  return (
    <>
      <PageHeader
        eyebrow="Careers · Hyderabad, India"
        title="Build the brain for unmanned systems."
        intro={
          <p className="lede">
            The work runs from visual navigation and perception to mission autonomy and ground control, and it
            ends at a test site, not a slide. The team that writes the code flies it.
          </p>
        }
      />

      <section className="section" data-tone="cream">
        <div className="wrap">
          <ul className="quads">
            {WORK.map((item, index) => (
              <li key={item.title} data-reveal style={{ "--d": `${index * 80}ms` } as CSSProperties}>
                <span className="label accent">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="t-4">{item.title}</h2>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>

          <p className="label rows__count rows__count--spaced">
            {String(open.length).padStart(2, "0")} open {open.length === 1 ? "role" : "roles"}
          </p>
          <ol className="rows">
            {open.map((role, index) => (
              <li key={role.slug} data-reveal style={{ "--d": `${index * 80}ms` } as CSSProperties}>
                <Link href={`/careers/${role.slug}`} className="row">
                  <div className="row__index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{role.team}</span>
                  </div>
                  <div className="row__main">
                    <h2 className="t-3">{role.title}</h2>
                    <p>{role.summary}</p>
                    <ul className="row__tags">
                      <li className="tag">{role.location}</li>
                      <li className="tag">{role.seniority}</li>
                    </ul>
                  </div>
                  <span className="row__go" aria-hidden>
                    <ArrowUpRight size={22} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="note-card" data-reveal>
            <div>
              <h2 className="t-3">Don’t see your role?</h2>
              <p>
                We hire for engineers who would clearly raise the bar. Write to us with what you have built and
                what you want to build.
              </p>
            </div>
            <a href={`mailto:${SITE.email}`} className="btn">
              {SITE.email} <ArrowUpRight size={16} weight="bold" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
