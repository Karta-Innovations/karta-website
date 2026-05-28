import Image from "next/image";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";

/**
 * The "Anchor" section. Used to live as "From Hyderabad" with explicit
 * geographic chest-thumping. Now reframed as an operational-station moment.
 *
 * The hyderabad.png image already carries a hand-drawn Hyderabad skyline
 * silhouette (Charminar, Golconda, palms, sunset) - so the previous 3D
 * `HyderabadSkylineScene` overlay has been removed; it would have stacked
 * a second silhouette on top of the photographic one. Gradients are tuned
 * to keep the sunset sky readable up top and put a darker base under the
 * text in the lower half.
 */
export function Hyderabad() {
  return (
    <section
      id="anchor"
      className="relative bg-ink overflow-hidden border-t border-border"
    >
      <div className="relative h-[80vh] min-h-[640px] w-full">
        <Image
          src="/imagery/hyderabad.png"
          alt="Operational anchor - Hyderabad skyline at dusk"
          fill
          sizes="100vw"
          className="object-cover"
          quality={88}
          priority={false}
        />
        {/* Vertical scrim - sky visible up top, dark base under the text. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/35 to-ink/95"
        />
        {/* Left-side scrim for text legibility against the silhouette. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/15 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 h-full flex flex-col justify-end py-12 md:py-16">
          <div className="max-w-[44ch]">
            <span
              lang="hi"
              className="font-devanagari block text-[56px] leading-[1] text-fg/90 mb-5"
              aria-label="Hyderabad"
            >
              हैदराबाद
            </span>
            <EyebrowTag className="mb-6">Operational anchor · 05</EyebrowTag>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.95] text-fg">
              Engineered close to the field.
            </h2>
            <p className="mt-7 text-fg-muted text-[17px] leading-[1.65] max-w-[52ch]">
              The team that ships the code is the team that deploys it. Karta
              operates a single engineering station, close to the aerospace,
              semiconductor and defence-software talent we draw from, and close
              to the envelopes our vehicles fly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
