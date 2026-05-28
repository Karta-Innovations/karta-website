import Link from "next/link";
import { Logo } from "@/components/chrome/Logo";
import { CoordinateStrip } from "@/components/primitives/CoordinateStrip";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const COLS: FooterColumn[] = [
  {
    title: "Stack",
    links: [
      { label: "Stack overview", href: "/stack" },
      { label: "SkyAnchor · Edge", href: "/stack#skyanchor" },
      { label: "TENERE · Command", href: "/stack#tenere" },
      { label: "Kiksuya · Theatre", href: "/stack#kiksuya" },
    ],
  },
  {
    title: "Vehicles",
    links: [
      { label: "All platforms", href: "/vehicles" },
      { label: "Cerana", href: "/vehicles/cerana" },
      { label: "Dorsata", href: "/vehicles/dorsata" },
      { label: "Kari", href: "/vehicles/kari" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Mission", href: "/mission" },
      { label: "Field Notes", href: "/field-notes" },
      { label: "Careers", href: "/careers" },
      { label: "Engage", href: "/engage" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-surface-deep border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-20 pb-10">
        <CoordinateStrip
          left="KRT.OPS.2026"
          center="STATION · ANCHORED"
          right="17.454°N 78.500°E"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_repeat(3,1fr)] gap-12 md:gap-12 mb-20">
          <div className="space-y-5 max-w-sm">
            <Logo size={40} showWordmark />
            <p className="text-fg-muted text-sm leading-relaxed">
              Operational autonomy for unmanned systems. Engineered to navigate,
              decide and act where GPS, comms and operator attention fail.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted hover:text-fg transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary">
            © {new Date().getFullYear()} Karta Innovations. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-tertiary">
            17.454°N 78.500°E
          </p>
        </div>
      </div>
    </footer>
  );
}
