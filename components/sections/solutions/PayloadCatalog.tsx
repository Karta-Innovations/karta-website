import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import {
  getPayloadsForVertical,
  applicationsForPayload,
  type VerticalId,
} from "@/lib/solutions";

/**
 * The payload catalog - the configurator inverted. Each payload lists the
 * missions it unlocks, so the "applications change with payloads" relationship
 * reads even for someone who never touches the console.
 */
export function PayloadCatalog({ vertical }: { vertical: VerticalId }) {
  const payloads = getPayloadsForVertical(vertical);

  return (
    <section className="px-6 md:px-10 py-24 md:py-32 bg-ink">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12 lg:mb-16">
          <div>
            <EyebrowTag className="mb-6">Payload catalog</EyebrowTag>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium tracking-[-0.035em] leading-[1.0] text-fg max-w-[16ch]">
              The kit, and what each piece unlocks.
            </h2>
          </div>
          <p className="lg:pt-3 text-fg-muted text-[17px] leading-[1.65] max-w-[54ch]">
            Every airframe in the Apis family is a sensor truck. Swap the
            payload in the field and the mission set changes with it.
          </p>
        </div>

        <ul className="border-t border-border">
          {payloads.map((payload) => {
            const apps = applicationsForPayload(payload.slug, vertical);
            return (
              <li
                key={payload.slug}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5 lg:gap-16 py-7 border-b border-border"
              >
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-display text-xl md:text-2xl font-medium tracking-[-0.02em] text-fg">
                      {payload.name}
                    </h3>
                    {payload.doctrineSensitive ? (
                      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-amber ring-1 ring-amber/40 rounded-full px-2 py-0.5">
                        human-authorized
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-2 block font-mono text-[10px] tracking-[0.22em] uppercase text-fg-tertiary">
                    {payload.category}
                  </span>
                  <p className="mt-3 text-fg-muted text-[14.5px] leading-[1.6] max-w-[46ch]">
                    {payload.senses}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 content-start lg:justify-end">
                  {apps.map((a) => (
                    <span
                      key={a.slug}
                      className="font-mono text-[10px] tracking-[0.06em] text-fg-muted ring-1 ring-white/10 rounded-full px-3 py-1.5 bg-white/[0.015]"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
