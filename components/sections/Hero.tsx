"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { InViewVideo } from "@/components/media/InViewVideo";
import { Words } from "@/components/motion/Words";

interface HeroFilm {
  src: string;
  poster: string;
  /** A second encode for narrow screens. */
  narrow?: { src: string; poster: string };
  /** What the footage shows, for assistive technology. */
  label: string;
}

/**
 * The hero film. Until Karta supplies footage of its own aircraft, the hero
 * holds a photograph from the test site at dusk. Put a film's files in
 * `public/media` and describe it here, and it takes the picture's place.
 */
const HERO_FILM: HeroFilm | null = null;

/**
 * The opening screen: the test site at dusk, full bleed, with the company's
 * line set over it. The picture drifts and the line lifts as the page
 * scrolls; the stylesheet holds both still for reduced-motion visitors.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={ref} id="top" className="hero" data-tone="night" aria-labelledby="hero-title">
      <motion.div className="hero__picture" style={{ "--drift": drift } as unknown as MotionStyle}>
        {HERO_FILM ? (
          <InViewVideo src={HERO_FILM.src} poster={HERO_FILM.poster} narrow={HERO_FILM.narrow} label={HERO_FILM.label} control="top" />
        ) : (
          <Image
            src="/imagery/field/site-dusk-violet.jpg"
            alt="A flight test site at dusk under a violet and pink sky, with the team beside a vehicle at the edge of the field."
            fill
            priority
            sizes="100vw"
          />
        )}
      </motion.div>
      <div className="hero__shade" aria-hidden />
      <motion.div className="wrap hero__copy" style={{ y: lift }}>
        <p className="label hero__kicker" data-reveal data-now style={{ "--d": "300ms" } as React.CSSProperties}>
          India’s autonomy stack
        </p>
        <Words as="h1" id="hero-title" className="t-hero" text={["The brain for", "unmanned systems"]} delay={380} />
        <p className="lede hero__lede" data-reveal data-now style={{ "--d": "760ms" } as React.CSSProperties}>
          Flown end to end with GPS jammed and spoofed: take-off, mission and landing.
        </p>
        <div className="hero__actions" data-reveal data-now style={{ "--d": "860ms" } as React.CSSProperties}>
          <Link href="/engage" className="btn">
            <span>Talk to engineering</span>
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
          <Link href="/skyanchor" className="rule-link">
            Meet SkyAnchor
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
