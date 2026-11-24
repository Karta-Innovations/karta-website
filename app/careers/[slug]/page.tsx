import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { PageHeader } from "@/components/primitives/PageHeader";
import { ROLES, getRole } from "@/lib/content/roles";

interface RolePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ROLES.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return { title: "Role not found" };
  return {
    title: `${role.title} · Careers`,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}` },
    openGraph: {
      type: "website",
      url: `/careers/${role.slug}`,
      title: `${role.title} · Careers · Karta Innovations`,
      description: role.summary,
    },
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const mailto = `mailto:${role.contact}?subject=${encodeURIComponent(`Application · ${role.title}`)}`;
  const sections = [
    { title: "Do you", items: role.doYou },
    { title: "What you will do", items: role.responsibilities },
    { title: "Nice to have", items: role.niceToHave },
  ];

  return (
    <>
      <PageHeader
        compact
        eyebrow={`${role.team} · ${role.location}`}
        title={role.title}
        intro={
          <>
            <p className="lede">{role.summary}</p>
            <ul className="row__tags">
              <li className="tag">{role.seniority}</li>
              <li className={role.status === "open" ? "state state--now" : "tag"}>
                {role.status === "open" ? "Hiring now" : "Closed"}
              </li>
            </ul>
          </>
        }
      />

      <article className="section" data-tone="cream">
        <div className="wrap article">
          <aside className="article__aside">
            <Link href="/careers" className="link muted">
              <ArrowLeft size={14} weight="bold" aria-hidden /> All open roles
            </Link>
            <dl>
              <div>
                <dt className="label">Team</dt>
                <dd>{role.team}</dd>
              </div>
              <div>
                <dt className="label">Location</dt>
                <dd>{role.location}</dd>
              </div>
              <div>
                <dt className="label">Level</dt>
                <dd>{role.seniority}</dd>
              </div>
            </dl>
          </aside>

          <div className="prose">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}

            <div className="note-card note-card--stack">
              <div>
                <h2 className="t-3">How to apply</h2>
                <p>
                  Send a short note about what you have shipped that you are proud of, and what you would want to
                  ship at Karta. A resume is optional. Field notes, code or published work are welcome.
                </p>
              </div>
              <NestedCTA href={mailto}>Apply by email</NestedCTA>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
