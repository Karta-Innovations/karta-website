import Link from "next/link";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { NestedCTA } from "@/components/primitives/NestedCTA";

export default function NotFound() {
  return (
    <section className="min-h-[100dvh] flex items-center px-6 md:px-10 py-32">
      <div className="mx-auto max-w-[1100px] w-full">
        <CoordinateStrip
          left="KRT.OPS.2026 · 404"
          center="ROUTE · UNKNOWN"
          right="OUT OF ENVELOPE"
          className="mb-16"
        />
        <EyebrowTag className="mb-6">Off-envelope · 404</EyebrowTag>
        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-medium tracking-[-0.04em] leading-[0.92] text-fg max-w-[16ch]">
          This corridor is{" "}
          <span className="text-sand">not on the map</span>.
        </h1>
        <p className="mt-8 text-fg-muted text-[17px] leading-[1.65] max-w-[58ch]">
          The route you requested is not in Karta&apos;s published envelope. Try
          the stack, the platforms, or talk to the engineering team - they may
          know what you were looking for.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <NestedCTA href="/">Return to home</NestedCTA>
          <NestedCTA href="/engage" variant="ghost">
            Tell engineering
          </NestedCTA>
        </div>

        <div className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Home", href: "/" },
            { label: "Stack", href: "/#stack" },
            { label: "Field Notes", href: "/field-notes" },
            { label: "Careers", href: "/careers" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block"
            >
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                Go to
              </span>
              <div className="mt-1 font-display text-2xl font-medium tracking-[-0.02em] text-fg group-hover:text-sand transition-colors">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
