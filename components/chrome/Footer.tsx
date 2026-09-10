import Link from "next/link";
import { Logo } from "@/components/chrome/Logo";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const COLS: FooterColumn[] = [
  {
    title: "Stack",
    links: [
      { label: "SkyAnchor · Edge", href: "/#skyanchor" },
      { label: "TENERE · Command", href: "/#tenere" },
      { label: "Kiksuya · Theatre", href: "/#kiksuya" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Field Notes", href: "/field-notes" },
      { label: "Careers", href: "/careers" },
      { label: "Talk to engineering", href: "/engage" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-surface-deep border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.2fr_repeat(2,1fr)] gap-10 md:gap-10 mb-20">
          <div className="space-y-5 max-w-sm">
            {/* Composed from the transparent mark + wordmark assets - the
                "full" lockup PNG carries its own dark plate and would read
                as a dark tile on the white chip. */}
            <div className="inline-flex items-center gap-4">
              <Logo size={48} variant="mark" />
              <Logo size={36} variant="wordmark" />
            </div>
            <p className="text-fg-muted text-sm leading-relaxed">
              Command that survives uncertainty.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-fg">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-[16px] text-fg-muted hover:text-fg transition-colors"
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
          <p className="text-[14px] text-fg-tertiary">
            © {new Date().getFullYear()} Karta Innovations. All rights reserved.
          </p>
          <p className="text-[14px] text-fg-tertiary">
            17.454°N 78.500°E
          </p>
        </div>
      </div>
    </footer>
  );
}
