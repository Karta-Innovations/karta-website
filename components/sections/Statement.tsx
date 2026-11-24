import { ScrollFill } from "@/components/motion/ScrollFill";
import { Words } from "@/components/motion/Words";

/** Why Karta exists, in four short sentences. */
export function Statement() {
  return (
    <section className="statement section" data-tone="night" aria-label="Why Karta, and what it builds">
      <div className="wrap">
        <div className="statement__grid">
          <p className="label statement__label" data-reveal>
            Why Karta
          </p>
          <div className="statement__body">
            <Words
              as="p"
              className="t-1 statement__problem"
              text={["An unmanned aircraft flies on GPS.", "GPS can be jammed. GPS can be spoofed.", "The aircraft still has to fly its mission."]}
            />
            <ScrollFill
              as="p"
              className="t-2 statement__answer"
              text="So we build the intelligence that lets it navigate, perceive and decide for itself."
            />
          </div>
        </div>

      </div>
    </section>
  );
}
