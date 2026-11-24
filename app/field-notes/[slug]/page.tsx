import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/primitives/PageHeader";
import { NOTES, getNote, type NoteBlock } from "@/lib/content/notes";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

const DATE = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" });

export async function generateStaticParams() {
  return NOTES.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note not found" };
  return {
    title: note.title,
    description: note.summary,
    authors: [{ name: note.author }],
    alternates: { canonical: `/field-notes/${note.slug}` },
    openGraph: {
      type: "article",
      url: `/field-notes/${note.slug}`,
      title: `${note.title} · Karta Innovations`,
      description: note.summary,
      publishedTime: note.date,
      authors: [note.author],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const others = NOTES.filter((item) => item.slug !== note.slug).slice(0, 2);

  return (
    <>
      <PageHeader
        compact
        eyebrow={`Field note · ${DATE.format(new Date(note.date))}`}
        title={note.title}
        intro={
          <>
            <p className="lede">{note.summary}</p>
            <ul className="row__tags">
              <li className="tag">
                {note.author} · {note.role}
              </li>
              <li className="tag">{note.readingMinutes} min read</li>
            </ul>
          </>
        }
      />

      <article className="section" data-tone="cream">
        <div className="wrap article">
          <aside className="article__aside">
            <Link href="/field-notes" className="link muted">
              <ArrowLeft size={14} weight="bold" aria-hidden /> All notes
            </Link>
            <dl>
              <div>
                <dt className="label">Author</dt>
                <dd>{note.author}</dd>
              </div>
              <div>
                <dt className="label">Published</dt>
                <dd>{DATE.format(new Date(note.date))}</dd>
              </div>
              <div>
                <dt className="label">Filed under</dt>
                <dd>{note.tags.join(", ")}</dd>
              </div>
            </dl>
          </aside>
          <div className="prose">
            {note.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        </div>
      </article>

      {others.length > 0 ? (
        <section className="section section--flush-top" data-tone="cream">
          <div className="wrap">
            <p className="label rows__count">Continue reading</p>
            <ol className="rows">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/field-notes/${other.slug}`} className="row">
                    <div className="row__index">
                      <time dateTime={other.date}>{DATE.format(new Date(other.date))}</time>
                    </div>
                    <div className="row__main">
                      <h2 className="t-3">{other.title}</h2>
                      <p>{other.summary}</p>
                    </div>
                    <span className="row__go" aria-hidden>
                      <ArrowUpRight size={22} />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </>
  );
}

function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.cite ? <cite>{block.cite}</cite> : null}
        </blockquote>
      );
    case "spec":
      return (
        <div className="spec">
          {block.title ? <h3 className="spec__title">{block.title}</h3> : null}
          <dl>
            {block.rows.map((row) => (
              <div key={row.k}>
                <dt>{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "code":
      return (
        <pre>
          <code>{block.content}</code>
        </pre>
      );
  }
}
