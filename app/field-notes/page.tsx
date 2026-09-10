import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NOTES } from "@/lib/content/notes";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const description =
  "Engineering notes from Karta on navigation, mission planning and human authority.";

export const metadata: Metadata = {
  title: "Field Notes",
  description,
  alternates: { canonical: "/field-notes" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Karta Innovations",
    url: "/field-notes",
    title: "Field Notes - Karta Innovations",
    description,
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function FieldNotesPage() {
  const notes = [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHeader
        eyebrow="Field notes"
        title="Engineering notes."
        intro={
          <>
            <p>
              How we approach navigation, mission planning, and human authority.
            </p>
          </>
        }
      />

      <section className="px-6 md:px-10 pb-32 md:pb-48">
        <div className="mx-auto max-w-[1100px]">
          <ol>
            {notes.map((note, i) => (
              <li
                key={note.slug}
                className="border-t border-border last:border-b last:border-border"
              >
                <Link
                  href={`/field-notes/${note.slug}`}
                  className="group block py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-[120px_1fr_180px] gap-6 lg:gap-12 items-baseline"
                >
                  <div>
                    <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-sand">
                      0{i + 1}
                    </div>
                    <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-fg-tertiary mt-1">
                      {DATE_FMT.format(new Date(note.date))}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.05] text-fg group-hover:text-sand transition-colors">
                      {note.title}
                    </h2>
                    <p className="mt-4 text-fg-muted text-[19px] leading-[1.65] max-w-[60ch]">
                      {note.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] tracking-[0.18em] uppercase text-fg-tertiary">
                      <span>{note.author} · {note.role}</span>
                      <span>{note.readingMinutes} min read</span>
                      <span className="flex gap-2">
                        {note.tags.map((t) => (
                          <span key={t} className="text-fg-tertiary">
                            {t.toLowerCase()}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center justify-end gap-2 text-fg-muted group-hover:text-sand transition-colors">
                    <span className="font-mono text-[12px] tracking-[0.22em] uppercase">
                      Read
                    </span>
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
