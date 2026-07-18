import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NestedCTA } from "@/components/primitives/NestedCTA";
import { ROLES, getRole } from "@/lib/content/roles";

interface RolePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return { title: "Role not found" };
  return {
    title: `${role.title} · Careers`,
    description: role.summary,
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const mailto = `mailto:${role.contact}?subject=${encodeURIComponent(`Application · ${role.title}`)}`;

  return (
    <>
      <PageHeader
        eyebrow={`${role.team} · ${role.location}`}
        title={role.title}
        intro={
          <>
            <p className="text-fg text-[19px] leading-[1.55] max-w-[58ch] font-medium">
              {role.summary}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary mt-4">
              <span>{role.seniority}</span>
              <span>{role.status === "open" ? "Hiring now" : "Closed"}</span>
            </div>
          </>
        }
      />

      <article className="px-6 md:px-10 pb-32 md:pb-40">
        <div className="mx-auto max-w-[820px] space-y-14">
          <Section title="Do you">
            <ul className="space-y-3 mt-4">
              {role.doYou.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-fg text-[16px] leading-[1.65] py-3 border-b border-border last:border-b-0"
                >
                  <span className="mt-2.5 size-1.5 rounded-full bg-sand shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="What you'll do">
            <ul className="space-y-3 mt-4">
              {role.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-fg text-[16px] leading-[1.65] py-3 border-b border-border last:border-b-0"
                >
                  <span className="mt-2.5 size-1.5 rounded-full bg-sand shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Nice to have">
            <ul className="space-y-2.5 mt-4">
              {role.niceToHave.map((item) => (
                <li key={item} className="text-fg-muted text-[15px] leading-[1.6]">
                  · {item}
                </li>
              ))}
            </ul>
          </Section>

          <div className="rounded-2xl bg-glass ring-1 ring-edge p-8">
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-fg mb-3">
              How to apply
            </h2>
            <p className="text-fg-muted text-[15px] leading-[1.65] mb-6 max-w-[55ch]">
              Send a short note about what you have shipped that you are proud of -
              and what you would want to ship at Karta. Resume optional. Field
              notes, GitHub, or published work strongly welcomed.
            </p>
            <NestedCTA href={mailto}>Apply · {role.contact}</NestedCTA>
          </div>
        </div>
      </article>

      <section className="px-6 md:px-10 py-20 border-t border-border">
        <div className="mx-auto max-w-[820px]">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-muted hover:text-sand transition-colors"
          >
            ← All open roles
          </Link>
        </div>
      </section>
    </>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-sand">
        {title}
      </h2>
      {children}
    </section>
  );
}
