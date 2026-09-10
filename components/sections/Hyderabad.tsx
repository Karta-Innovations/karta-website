import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function Hyderabad() {
  return (
    <section id="hyderabad" className="hyderabad-section">
      <div className="hyderabad-image">
          <Image src="/imagery/hyderabad.jpg" alt="Hyderabad skyline at dusk" fill sizes="100vw" quality={88} />
      </div>
      <div className="hyderabad-shade" aria-hidden />
      <div className="hyderabad-layout page-width">
        <div className="hyderabad-copy">
          <p className="chapter-label">Hyderabad, India</p>
          <h2>Built close<br />to the work.</h2>
          <p>Engineered, integrated and flown from Hyderabad. The team that builds the code is the team that deploys it, close to the aerospace, semiconductor and defence-software expertise we draw from, and to the fields where our systems will operate.</p>
          <Link href="/careers" className="text-link mt-7">Build it with us <ArrowUpRight size={18} aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}
