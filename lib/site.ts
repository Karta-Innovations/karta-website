/** Site-wide constants: identity, contact, navigation. */

export const SITE = {
  name: "Karta Innovations",
  short: "Karta",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kartainnovations.com",
  tagline: "The brain for unmanned systems.",
  description:
    "Karta builds India's autonomy stack: the intelligence layer that lets unmanned systems navigate, perceive and decide for themselves. SkyAnchor, its visual navigation module, has flown full missions under live GPS jamming and spoofing.",
  email: "info@kartainnovations.com",
  address: ["Karta Innovations", "Wellington Rd, Hyderabad", "Telangana, India"],
  coordinates: "17.454°N 78.500°E",
  devanagari: "कर्ता",
  meaning: ["The one who acts.", "And answers for it."],
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** One line shown in the full-screen menu. */
  detail: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "SkyAnchor", href: "/skyanchor", detail: "Navigation without GPS" },
  { label: "TENERE", href: "/#tenere", detail: "Ground control for swarms" },
  { label: "Company", href: "/#company", detail: "कर्ता: the one who acts" },
  { label: "Careers", href: "/careers", detail: "Open roles in Hyderabad" },
];

export const MENU_LINKS: NavLink[] = [
  ...NAV_LINKS,
  { label: "Field notes", href: "/field-notes", detail: "Engineering notes" },
];
