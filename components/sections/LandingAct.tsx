import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function LandingAct() {
  return (
    <section id="landing" className="landing-section">
      <div className="landing-layout page-width">
        <div>
          <p className="chapter-label">Start a conversation</p>
          <h2>Your next mission.<br />Our shared work.</h2>
        </div>
        <div className="landing-actions">
          <p>Talk through your operating environment with the engineers building the system.</p>
          <Link href="/engage" className="button-primary">Talk to engineering <ArrowRight size={18} aria-hidden /></Link>
          <Link href="/field-notes" className="text-link">Read our field notes <ArrowUpRight size={18} aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}
