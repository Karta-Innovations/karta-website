import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SectionLink } from "@/components/chrome/SectionLink";

const TILES = [
  {
    name: "SkyAnchor",
    line: "Navigation without GPS.",
    action: "Find out more",
    href: "/skyanchor",
    tone: "sand",
    image: { src: "/imagery/skyanchor-module.png", alt: "The SkyAnchor module, a sealed black enclosure with a downward camera.", contain: true },
  },
  {
    name: "TENERE",
    line: "Ground control, built for swarms.",
    action: "Find out more",
    href: "/#tenere",
    tone: "night",
    image: { src: "/media/tenere-mission-poster.jpg", alt: "TENERE showing a survey mission inside its geofence volume.", contain: false },
  },
  {
    name: "Company",
    line: "The one who acts. And answers for it.",
    action: "Who we are",
    href: "/#company",
    tone: "night",
    image: { src: "/imagery/field/site-golden-hour-quad.jpg", alt: "A quadcopter in the air over a field at golden hour, with the ground crew working from a vehicle.", contain: false },
  },
] as const;

/** Three large tiles: the two systems in production, and the company behind them. */
export function Systems() {
  return (
    <section className="tiles" data-tone="night" aria-label="Systems and company">
      {TILES.map((tile, index) => {
        const inner = (
          <>
            <Image
              src={tile.image.src}
              alt={tile.image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 34vw"
              className={tile.image.contain ? "tile__object" : "tile__photo"}
            />
            <span className="tile__shade" aria-hidden />
            <span className="tile__copy">
              <span className="t-3 tile__name">{tile.name}</span>
              <span className="tile__line">{tile.line}</span>
              <span className="btn tile__action">
                <span>{tile.action}</span>
                <ArrowRight size={15} weight="bold" aria-hidden />
              </span>
            </span>
          </>
        );
        const props = { className: "tile", "data-tone": tile.tone, "data-reveal": "", style: { "--d": `${index * 90}ms` } as React.CSSProperties };
        return tile.href.startsWith("/#") ? (
          <SectionLink key={tile.name} href={tile.href} {...props}>
            {inner}
          </SectionLink>
        ) : (
          <Link key={tile.name} href={tile.href} {...props}>
            {inner}
          </Link>
        );
      })}
    </section>
  );
}
