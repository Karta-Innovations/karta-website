import Link from "next/link";
import { Words } from "@/components/motion/Words";
import { SITE } from "@/lib/site";
import { COMPANY } from "@/lib/stack";

/** The name, what it means, and the company behind it. */
export function Company() {
  return (
    <section id="company" className="company section" data-tone="night" aria-labelledby="company-title">
      <div className="wrap">
        <div className="company__name">
          <p className="deva company__deva" lang="sa" data-reveal="fade" aria-hidden>
            {SITE.devanagari}
          </p>
          <div className="company__meaning">
            <p className="label" data-reveal>
              Karta <span className="muted">· Sanskrit, noun</span>
            </p>
            <h2 id="company-title" className="t-1">
              <Words text="The one who acts." /> <Words className="company__second" text="And answers for it." delay={240} />
            </h2>
          </div>
        </div>

        <div className="rule" data-reveal />

        <div className="company__body">
          <p className="t-2 company__statement" data-reveal>
            {COMPANY.statement}
          </p>
          <ul className="company__pillars">
            {COMPANY.pillars.map((pillar, index) => (
              <li key={pillar.label} data-reveal style={{ "--d": `${index * 90}ms` } as React.CSSProperties}>
                <h3 className="label label--soft">{pillar.label}</h3>
                <p className="body">{pillar.body}</p>
              </li>
            ))}
          </ul>
          <div className="company__actions" data-reveal>
            <Link href="/careers" className="rule-link">
              Open roles in Hyderabad
            </Link>
            <Link href="/field-notes" className="rule-link">
              Field notes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
