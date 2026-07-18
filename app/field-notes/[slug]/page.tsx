import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NOTES, getNote, type NoteBlock } from "@/lib/content/notes";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export async function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note not found" };
  return {
    title: note.title,
    description: note.summary,
    authors: [{ name: note.author }],
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const others = NOTES.filter((n) => n.slug !== note.slug).slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow={`${note.author} · ${note.role}`}
        title={note.title}
        intro={
          <>
            <p className="text-fg text-[19px] leading-[1.55] max-w-[58ch] font-medium">
              {note.summary}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary mt-4">
              <span>{DATE_FMT.format(new Date(note.date))}</span>
              <span>{note.readingMinutes} min read</span>
              <span>{note.tags.map((t) => t.toLowerCase()).join(" · ")}</span>
            </div>
          </>
        }
      />

      <article className="px-6 md:px-10 pb-32 md:pb-40">
        <div className="mx-auto max-w-[760px] space-y-7">
          {note.body.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
        </div>
      </article>

      {others.length > 0 ? (
        <section className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary mb-10">
              Continue reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/field-notes/${o.slug}`}
                  className="group block rounded-2xl ring-1 ring-edge hover:ring-sand/40 transition-all p-7"
                >
                  <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-sand mb-3">
                    {DATE_FMT.format(new Date(o.date))}
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-fg group-hover:text-sand transition-colors mb-3">
                    {o.title}
                  </h3>
                  <p className="text-fg-muted text-sm leading-[1.6] max-w-[42ch]">
                    {o.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-muted group-hover:text-sand transition-colors">
                    Read note
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function RenderBlock({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-fg text-[17px] leading-[1.7]">{block.text}</p>;
    case "h2":
      return (
        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.025em] text-fg pt-8 leading-[1.15]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-fg pt-4">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-3 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-fg text-[17px] leading-[1.65]">
              <span className="mt-3 size-1 rounded-full bg-sand shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-sand pl-6 py-2">
          <p className="font-display text-[clamp(1.4rem,2.6vw,1.875rem)] font-medium tracking-[-0.02em] leading-[1.25] text-fg">
            {block.text}
          </p>
          {block.cite ? (
            <cite className="block mt-3 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary not-italic">
              - {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case "spec":
      return (
        <div className="rounded-xl bg-glass ring-1 ring-edge p-6">
          {block.title ? (
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary mb-3">
              {block.title}
            </div>
          ) : null}
          <dl className="divide-y divide-border-soft">
            {block.rows.map((r) => (
              <div key={r.k} className="grid grid-cols-[1fr_auto] py-2 gap-6">
                <dt className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                  {r.k}
                </dt>
                <dd className="font-mono text-[13px] text-fg">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "code":
      return (
        <pre className="rounded-md bg-surface-deep ring-1 ring-edge overflow-x-auto p-5 font-mono text-[13px] leading-[1.55] text-fg">
          <code>{block.content}</code>
        </pre>
      );
  }
}
