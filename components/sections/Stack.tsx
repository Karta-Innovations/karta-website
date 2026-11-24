import { Words } from "@/components/motion/Words";
import { STACK_KARTA, STACK_NOTES, STACK_YOURS } from "@/lib/stack";

/** Where Karta sits on a customer's aircraft, drawn as the layers themselves. */
export function Stack() {
  return (
    <section id="stack" className="stack section" data-tone="cream" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="head">
          <p className="label head__label" data-reveal>
            Integration
          </p>
          <h2 id="stack-title" className="t-1 head__title">
            <Words text="Karta sits above your autopilot." />{" "}
            <Words className="muted" text="You keep your platform." delay={260} />
          </h2>
        </div>

        <div className="stack__grid">
          <div className="stack__layers" role="list" aria-label="The stack, from the operator down to the airframe">
            <p className="label stack__side" aria-hidden>
              Karta
            </p>
            {STACK_KARTA.map((layer, index) => (
              <div
                key={layer.name}
                role="listitem"
                className="stack__layer"
                data-state={layer.state}
                data-reveal
                style={{ "--d": `${index * 70}ms` } as React.CSSProperties}
              >
                <span className="stack__name">{layer.name}</span>
                <span className="stack__product">{layer.product ?? ""}</span>
                <span className="label stack__when">Flying now</span>
              </div>
            ))}
            <div className="stack__seam" data-reveal style={{ "--d": "460ms" } as React.CSSProperties}>
              <span className="label">The seam: MAVLink</span>
            </div>
            <p className="label stack__side" aria-hidden>
              Yours
            </p>
            {STACK_YOURS.map((layer, index) => (
              <div
                key={layer.name}
                role="listitem"
                className="stack__layer"
                data-state="yours"
                data-reveal
                style={{ "--d": `${520 + index * 70}ms` } as React.CSSProperties}
              >
                <span className="stack__name">{layer.name}</span>
                <span className="stack__product">{layer.detail}</span>
                <span className="label stack__when">Stays yours</span>
              </div>
            ))}
          </div>

          <ul className="stack__notes">
            {STACK_NOTES.map((note, index) => (
              <li key={note.title} data-reveal style={{ "--d": `${200 + index * 90}ms` } as React.CSSProperties}>
                <h3 className="t-4">{note.title}</h3>
                <p className="body">{note.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
