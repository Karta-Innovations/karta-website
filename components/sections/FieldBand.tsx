import Image from "next/image";
import { Words } from "@/components/motion/Words";

/** A full-width picture from the test site: Karta's own aircraft on its stand at dusk, with one line over it. */
export function FieldBand() {
  return (
    <section className="band" data-tone="night" aria-label="At the test site">
      <Image
        src="/imagery/field/site-dusk-aircraft-wide.jpg"
        alt="Karta's fixed-wing test aircraft on its stand at a flight test site, under a pink dusk sky."
        fill
        sizes="100vw"
        className="band__picture"
      />
      <div className="band__shade" aria-hidden />
      <div className="wrap band__copy">
        <p className="label" data-reveal>
          At the test site
        </p>
        <Words as="p" className="t-1" text={["The team that writes", "the code flies it."]} />
      </div>
    </section>
  );
}
