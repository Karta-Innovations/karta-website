import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NOTES } from "@/lib/content/notes";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Engineering and operational essays from the team that ships the code. Edge stack notes, doctrine writing, field reports.",
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
        index="05 · FIELD NOTES"
        eyebrow="Engineering essays · operational reports"
        title={
          <>
            Notes from the <span className="text-amber">field</span>.
          </>
        }
        intro={
          <>
            <p>
              Field Notes is where Karta engineers write — about the Edge stack,
              about doctrine, about the operating envelopes we fly. No
              marketing, no roadmap dreams. The work, as it actually is.
            </p>
          </>
        }
        coord={{ center: "ENGINEERING · OPEN", right: `${notes.length} ENTRIES` }}
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
                    <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber">
                      0{i + 1}
                    </div>
                    <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary mt-1">
                      {DATE_FMT.format(new Date(note.date))}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.05] text-fg group-hover:text-amber transition-colors">
                      {note.title}
                    </h2>
                    <p className="mt-4 text-fg-muted text-[15px] leading-[1.65] max-w-[60ch]">
                      {note.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary">
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
                  <div className="hidden lg:flex items-center justify-end gap-2 text-fg-muted group-hover:text-amber transition-colors">
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
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
