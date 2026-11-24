import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Drift } from "@/components/motion/Drift";
import { Words } from "@/components/motion/Words";
import {
  SKYANCHOR,
  SKYANCHOR_CALLOUTS,
  SKYANCHOR_FIGURES,
  SKYANCHOR_PROPERTIES,
  SKYANCHOR_SPECS,
} from "@/lib/skyanchor";

export const metadata: Metadata = {
  title: "SkyAnchor",
  description:
    "SkyAnchor is Karta's visual navigation module: take-off, flight and landing without GPS, inside jammed and spoofed airspace. Specifications and integration.",
};

export default function SkyAnchorPage() {
  return (
    <>
      <header className="product product--page" data-tone="sand">
        <div className="wrap product__grid">
          <div className="product__copy">
            <p className="label" data-reveal>
              {SKYANCHOR.kind} <span className="muted">· P/N {SKYANCHOR.partNumber}</span>
            </p>
            <Words as="h1" className="t-hero product__title" text="SkyAnchor" delay={80} />
            <p className="t-3 product__sub" data-reveal style={{ "--d": "180ms" } as React.CSSProperties}>
              {SKYANCHOR.headline}
            </p>
            <p className="lede product__lede" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
              {SKYANCHOR.lede}
            </p>
            <div className="product__actions" data-reveal style={{ "--d": "320ms" } as React.CSSProperties}>
              <Link href="/engage" className="btn">
                <span>Talk to engineering</span>
                <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
              <span className="state state--now">In production</span>
            </div>
          </div>

          <Drift className="product__object" from={6} to={-6}>
            <Image
              src="/imagery/skyanchor-module.png"
              alt="The SkyAnchor module: a sealed black enclosure with a downward camera at one corner and four mounting lugs."
              width={1685}
              height={1500}
              sizes="(max-width: 900px) 92vw, 52vw"
              priority
            />
          </Drift>

          <dl className="product__figures">
            {SKYANCHOR_FIGURES.map((figure, index) => (
              <div key={figure.label} data-reveal style={{ "--d": `${index * 80}ms` } as React.CSSProperties}>
                <dt className="label label--soft">{figure.label}</dt>
                <dd className="fig">
                  {figure.value.split(" × ").map((part, i) => (
                    <span key={i}>
                      {i > 0 ? <span className="fig__x" aria-label="by">x</span> : null}
                      {part}
                    </span>
                  ))}
                  <span className="fig__unit">{figure.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="props section" data-tone="indigo" aria-label="What it means on the aircraft">
        <div className="wrap">
          <p className="label" data-reveal>
            What it means on the aircraft
          </p>
          <ol className="props__list">
            {SKYANCHOR_PROPERTIES.map((property, index) => (
              <li key={property.label} data-reveal style={{ "--d": `${index * 110}ms` } as React.CSSProperties}>
                <span className="label label--soft">{property.label}</span>
                <h2 className="t-1">{property.title}</h2>
                <p className="lede">{property.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="specifications" className="specs section" data-tone="cream" aria-labelledby="specs-title">
        <div className="wrap">
          <div className="head">
            <p className="label head__label" data-reveal>
              The module
            </p>
            <Words as="h2" id="specs-title" className="t-1 head__title" text={["One sealed module.", "Sensor and compute."]} />
          </div>

          <div className="specs__grid">
            <figure className="specs__figure" data-reveal="fade">
              <div className="specs__object">
                <Image
                  src="/imagery/skyanchor-module.png"
                  alt="The SkyAnchor module, with four numbered features."
                  width={1685}
                  height={1500}
                  sizes="(max-width: 900px) 92vw, 44vw"
                />
                {SKYANCHOR_CALLOUTS.map((callout) => (
                  <span key={callout.n} className="specs__pin tabular" style={{ left: `${callout.x}%`, top: `${callout.y}%` }} aria-hidden>
                    {callout.n}
                  </span>
                ))}
              </div>
              <figcaption>
                <ol>
                  {SKYANCHOR_CALLOUTS.map((callout) => (
                    <li key={callout.n}>
                      <span className="specs__pin specs__pin--inline tabular" aria-hidden>
                        {callout.n}
                      </span>
                      {callout.label}
                    </li>
                  ))}
                </ol>
              </figcaption>
            </figure>

            <div className="specs__sheet">
              {SKYANCHOR_SPECS.map((group, index) => (
                <section key={group.title} data-reveal style={{ "--d": `${index * 80}ms` } as React.CSSProperties}>
                  <h3 className="label">{group.title}</h3>
                  <dl>
                    {group.rows.map((row) => (
                      <div key={row.k}>
                        <dt>{row.k}</dt>
                        <dd>{row.v}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
