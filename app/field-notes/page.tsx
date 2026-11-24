import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NOTES } from "@/lib/content/notes";

const description = "Engineering notes from Karta on navigation without GPS, mission autonomy and how the evidence is made.";

export const metadata: Metadata = {
  title: "Field notes",
  description,
  alternates: { canonical: "/field-notes" },
  openGraph: { type: "website", url: "/field-notes", title: "Field notes · Karta Innovations", description },
};

const DATE = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function FieldNotesPage() {
  const notes = [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHeader
        eyebrow="Field notes"
        title="Engineering notes."
        intro={
          <p className="lede">
            How we approach navigation without GPS, mission autonomy and the evidence behind both. Written by the
            people who build it.
          </p>
        }
      />

      <section className="section" data-tone="cream">
        <div className="wrap">
          <p className="label rows__count">
            {String(notes.length).padStart(2, "0")} {notes.length === 1 ? "note" : "notes"}
          </p>
          <ol className="rows">
            {notes.map((note, index) => (
              <li key={note.slug} data-reveal style={{ "--d": `${index * 80}ms` } as CSSProperties}>
                <Link href={`/field-notes/${note.slug}`} className="row">
                  <div className="row__index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <time dateTime={note.date}>{DATE.format(new Date(note.date))}</time>
                  </div>
                  <div className="row__main">
                    <h2 className="t-3">{note.title}</h2>
                    <p>{note.summary}</p>
                    <ul className="row__tags">
                      <li className="tag">
                        {note.author} · {note.role}
                      </li>
                      <li className="tag">{note.readingMinutes} min read</li>
                      {note.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="row__go" aria-hidden>
                    <ArrowUpRight size={22} weight="regular" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
