import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { Words } from "@/components/motion/Words";
import { SectionLink } from "@/components/chrome/SectionLink";
import { SITE } from "@/lib/site";

const WAYS = [
  {
    title: "An evaluation flight",
    body: "SkyAnchor on your aircraft, against your jammer or spoofer, with the replay and report afterwards.",
  },
  {
    title: "An integration",
    body: "PX4 or ArduPilot over MAVLink. Customised or modular mounting to suit your airframe.",
  },
  {
    title: "A complete Karta system",
    body: "SkyAnchor, flight controller integration and TENERE ground control, delivered together.",
  },
];

const COLUMNS = [
  {
    title: "Systems",
    links: [
      { label: "SkyAnchor", href: "/skyanchor" },
      { label: "TENERE", href: "/#tenere" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Karta", href: "/#company" },
      { label: "Careers", href: "/careers" },
      { label: "Field notes", href: "/field-notes" },
    ],
  },
];

/** The closing invitation, then the footer proper. */
export function Footer() {
  return (
    <footer>
      <section id="contact" className="cta section" data-tone="night" aria-labelledby="cta-title">
        <Image
          src="/imagery/field/site-sunset.jpg"
          alt=""
          fill
          sizes="100vw"
          className="cta__picture"
        />
        <div className="cta__shade" aria-hidden />
        <div className="wrap cta__inner">
          <div className="cta__grid">
            <div className="cta__lead">
              <p className="label" data-reveal>
                Work with us
              </p>
              <Words as="h2" id="cta-title" className="t-hero cta__title" text={["Let’s fly it on", "your platform."]} delay={80} />
              <div className="cta__actions" data-reveal style={{ "--d": "260ms" } as React.CSSProperties}>
                <Link href="/engage" className="btn">
                  <span>Talk to engineering</span>
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
                <a href={`mailto:${SITE.email}`} className="link">
                  {SITE.email}
                </a>
              </div>
            </div>
            <ol className="cta__ways">
              {WAYS.map((way, index) => (
                <li key={way.title} data-reveal style={{ "--d": `${160 + index * 90}ms` } as React.CSSProperties}>
                  <span className="label label--soft tabular">0{index + 1}</span>
                  <div>
                    <h3 className="t-4">{way.title}</h3>
                    <p className="body">{way.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="footer" data-tone="night">
        <div className="wrap">
          <div className="footer__top">
            <div className="footer__brand">
              <Link href="/" className="lockup lockup--full" aria-label={`${SITE.name}, home`}>
                <Mark size={54} />
                <span className="lockup__words">
                  <Wordmark size={20} optical={false} />
                  <Wordmark size={7.5} line="innovations" />
                </span>
              </Link>
              <p className="t-3 footer__line">{SITE.tagline}</p>
            </div>
            {COLUMNS.map((column) => (
              <nav key={column.title} className="footer__col" aria-label={column.title}>
                <p className="label label--soft">{column.title}</p>
                {column.links.map((link) =>
                  link.href.startsWith("/#") ? (
                    <SectionLink key={link.href} href={link.href}>
                      {link.label}
                    </SectionLink>
                  ) : (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
            ))}
            <address className="footer__col">
              <p className="label label--soft">Find us</p>
              {SITE.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </address>
          </div>
          <div className="footer__legal">
            <span>
              © {new Date().getFullYear()} {SITE.name} Pvt Ltd
            </span>
            <span>Engineered in Hyderabad, India</span>
            <span className="footer__motto">
              <span className="deva" lang="sa">
                {SITE.devanagari}
              </span>
              : the one who acts. And answers for it.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
