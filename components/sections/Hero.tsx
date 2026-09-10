import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section id="launch" className="launch">
      <div className="launch__intro page-width">
        <div>
          <p className="launch__eyebrow"><span aria-hidden /> Karta Innovations</p>
          <h1>Operational<br />autonomy<span className="launch__period">.</span></h1>
        </div>
        <div className="launch__statement">
          <h2>Command that<br />survives uncertainty.</h2>
          <p>We build navigation hardware and mission software for unmanned systems. Designed to keep vehicles oriented, missions within human-approved limits, and decisions traceable.</p>
          <Link href="/engage" className="button-primary">Talk to engineering <ArrowRight size={18} aria-hidden /></Link>
        </div>
      </div>
      <HeroVideo />
      <div className="launch__rail page-width">
        <div className="launch__identity"><span lang="hi" className="font-devanagari">कर्ता</span><p><strong>The one who acts.</strong><span>And answers for it.</span></p></div>
        <p className="launch__location"><span aria-hidden className="launch__rail-dot" /> Engineered in Hyderabad, India</p>
      </div>
    </section>
  );
}
