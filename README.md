# Karta - Web

Operational autonomy for unmanned systems. The deployable web package for [karta.ai](https://karta.ai).

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind v4**, **Framer Motion**, and **Lenis** smooth scroll. Designed to ship at the visual register of the autonomous-defense category (Anduril, Sightline, StirlingX, Arondite) while staying in the Karta brand voice: precise, operator-respectful, restrained.

## Quick start

```bash
npm install
cp env.example .env.local         # optional - site renders without it
npm run dev                       # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Type-check only:

```bash
npm run typecheck
```

## Repo layout

```
karta-web/
├── app/                     # App Router routes
│   ├── page.tsx             # Homepage
│   ├── stack/               # Autonomy stack breakdown
│   ├── vehicles/[slug]/     # Apis family - Cerana, Dorsata, Kari
│   ├── stack/               # Edge · Command · Theatre - the products live here
│   ├── mission/             # Doctrine and ethos
│   ├── field-notes/[slug]/  # Engineering essays
│   ├── careers/[slug]/      # Open roles
│   ├── engage/              # Contact + form
│   └── api/engage/          # Form Route Handler
├── components/
│   ├── chrome/              # Nav, Footer, Grain, ScanLines, Logo
│   ├── primitives/          # SpecTable, Brackets, NestedCTA, DoppelrandCard
│   ├── motion/              # SmoothScroll, ScrollReveal, MagneticButton
│   ├── sections/            # Homepage sections (one file each)
│   └── forms/               # EngageForm
├── lib/
│   ├── catalog.ts           # Vehicles + Products data
│   ├── content/notes.ts     # Field Notes
│   ├── content/roles.ts     # Career openings
│   └── cn.ts                # clsx + tailwind-merge
├── public/imagery/          # Terrain photography + brand mark
└── app/globals.css          # Design tokens (Tailwind v4 @theme)
```

## Information architecture

| Route | Purpose |
|---|---|
| `/` | Cinematic deep-scroll home with 9 sections |
| `/stack` | Edge · Command · Theatre - the three Karta products live here (SkyAnchor, TENERE, Kiksuya) |
| `/vehicles` + `/vehicles/[slug]` | Apis family platforms |
| `/mission` | Doctrine, principles, operational anchor |
| `/field-notes` + `/field-notes/[slug]` | Engineering essays |
| `/careers` + `/careers/[slug]` | Open roles |
| `/engage` + `/api/engage` | Direct line to engineering |

## Design tokens

Brand colors, type scale, motion easing, and radii are defined in `app/globals.css` under the Tailwind v4 `@theme` directive and surfaced as CSS custom properties.

| Token | Value | Role |
|---|---|---|
| `bg-ink` | `#0B1020` | Primary surface (Midnight Ink) |
| `bg-indigo` | `#18244D` | Raised surfaces, deck titles |
| `text-fg` | `#F5F5F0` | Warm off-white text |
| `text-amber` | `#C8962E` | Signal Amber - sole chromatic accent |
| `text-gold` | `#D8A84F` | Comb Gold - diagrams + hex motifs |

Fonts: Geist Sans + JetBrains Mono, self-hosted via `next/font/google`. No runtime font CDN dependency.

## Engage form

The contact form at `/engage` posts to `/api/engage`. The route validates with Zod and forwards to [Resend](https://resend.com) when configured. Without `RESEND_API_KEY` and `ENGAGE_TO_EMAIL`, the route still validates payloads and acknowledges submissions; it just logs them locally instead of delivering.

## Adding content

- **A new vehicle or product**: edit `lib/catalog.ts`. Detail pages + homepage update automatically.
- **A new field note**: append to `lib/content/notes.ts`. Each entry is a typed object whose `body` is a list of `NoteBlock` items (paragraph, heading, list, quote, spec table, code).
- **A new role**: append to `lib/content/roles.ts`.

## Deployment

Configured for one-click Vercel deploy. Set these env vars in your project:

- `NEXT_PUBLIC_SITE_URL` - your production URL (used in metadata + sitemap)
- `ENGAGE_TO_EMAIL` - where engage submissions are sent
- `RESEND_API_KEY` - Resend API key for engage delivery

For static-only hosts (Cloudflare Pages, S3 + CloudFront), add `output: 'export'` to `next.config.ts`. The engage API route will need to move to a serverless function on the target host.

## Performance posture

- Animation is `transform`/`opacity` only - no layout-triggering properties
- `backdrop-blur` is restricted to fixed elements (nav, overlay) - never on scrolling content
- Lenis smooth scroll respects `prefers-reduced-motion`
- Phosphor icons + Framer Motion are tree-shaken via Next.js `optimizePackageImports`
- Imagery is served as AVIF + WebP via `next/image`

## Brand voice - editor guardrails

Karta writes in mission-control register: precise, calm, no chest-thumping. The team that ships the code is the team that engages. Voice rules:

- No restated headings, no intros that repeat the title
- No em dashes. Commas, colons, semicolons, periods, parentheses only
- No filler clichés ("elevate", "seamless", "unleash", "next-gen")
- Cultural register comes from design language (palette, terrain photography, coordinate strip) - never from explicit copy
- Specs use JetBrains Mono. Display copy uses Geist Sans. The two never cross
- Amber is a signal, not a brand colour. Use it below 10% of any surface
