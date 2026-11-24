import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Drift } from "@/components/motion/Drift";
import { Words } from "@/components/motion/Words";
import { SKYANCHOR, SKYANCHOR_FIGURES } from "@/lib/skyanchor";

/** The product, as an object on the sheet, with its four headline figures. */
export function SkyAnchorBand() {
  return (
    <section id="skyanchor" className="product" data-tone="sand" aria-labelledby="skyanchor-title">
      <div className="wrap product__grid">
        <div className="product__copy">
          <p className="label" data-reveal>
            SkyAnchor <span className="muted">· {SKYANCHOR.kind}</span>
          </p>
          <Words as="h2" id="skyanchor-title" className="t-1 product__title" text={["Built where", "GPS ends."]} delay={80} />
          <p className="lede product__lede" data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
            {SKYANCHOR.lede}
          </p>
          <div className="product__actions" data-reveal style={{ "--d": "300ms" } as React.CSSProperties}>
            <Link href="/skyanchor" className="btn">
              <span>Explore SkyAnchor</span>
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
            <span className="state state--now">In production</span>
          </div>
        </div>

        <Drift className="product__object" from={7} to={-7}>
          <Image
            src="/imagery/skyanchor-module.png"
            alt="The SkyAnchor module: a sealed black enclosure with a downward camera at one corner and four mounting lugs."
            width={1685}
            height={1500}
            sizes="(max-width: 900px) 92vw, 52vw"
            data-reveal="fade"
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
    </section>
  );
}
