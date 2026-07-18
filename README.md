# Karta - Web

Operational autonomy layer for autonomous systems. The deployable web package for [karta.ai](https://karta.ai).

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
│   ├── page.tsx             # The one-sortie long homepage (all acts)
│   ├── field-notes/[slug]/  # Engineering essays (evidence layer)
│   ├── careers/[slug]/      # Open roles
│   ├── engage/              # Talk to engineering + form
│   └── api/engage/          # Form Route Handler
├── components/
│   ├── chrome/              # Nav, Footer, Grain, ScanLines, Logo
│   ├── primitives/          # SpecTable, Brackets, NestedCTA, DoppelrandCard
│   ├── motion/              # SmoothScroll, ScrollReveal, MagneticButton
│   ├── sections/            # Homepage sections (one file each)
│   └── forms/               # EngageForm
├── lib/
│   ├── catalog.ts           # Autonomy stack (STACK_LAYERS) data
│   ├── content/notes.ts     # Field Notes
│   ├── content/roles.ts     # Career openings
│   └── cn.ts                # clsx + tailwind-merge
├── public/imagery/          # Terrain photography + brand mark
├── public/textures/         # Mission plates + texture-text fills
└── app/globals.css          # Design tokens (Tailwind v4 @theme)
```

## Information architecture

| Route | Purpose |
|---|---|
| `/` | The One Sortie - one long page: `#launch` hero → `#brief` unified operating reality (`#denial` compatibility anchor) → `#stack` (`#skyanchor` / `#tenere` / `#kiksuya`) → `#mission` → `#hyderabad` → `#landing` |
| `/field-notes` + `/field-notes/[slug]` | Engineering essays - the public evidence layer |
| `/careers` + `/careers/[slug]` | Open roles |
| `/engage` + `/api/engage` | Talk to engineering |
| `/stack`, `/mission`, `/vehicles*` | Redirects into the long page (`next.config.ts`, temporary during QA) |

## Design tokens

Brand colors, type scale, motion easing, and radii are defined in `app/globals.css` under the Tailwind v4 `@theme` directive and surfaced as CSS custom properties.

| Token | Value | Role |
|---|---|---|
| `bg-ink` | `oklch(0.16 0.022 145)` | Page baseline - sage graphite `#071008` |
| `bg-sage` | `oklch(0.550647 0.043468 136.971)` | Supplied sage `#66785F`; terrain and operating context |
| `text-mineral` | `oklch(0.714251 0.007295 145.499)` | Supplied mineral gray `#A0A4A0`; supporting information |
| `bg-field-tan` | `oklch(0.705198 0.056921 68.506)` | Supplied field tan `#B89A7A`; physical context |
| `text-route` | `oklch(0.695758 0.159641 55.544)` | Supplied orange `#E67E22`; narrow live route signal |
| `bg-flare` | `oklch(0.543346 0.174006 29.697)` | Supplied brick red `#C0392B`; human action and constraint |
| `text-return` | `oklch(0.76 0.06 137)` | Lifted sage returned state and audit lines |
| `text-fg` | `oklch(0.91 0.012 145)` | Mineral-tinted primary text `#DDE3DC` |

Derived neutrals carry text on colored fields - see `DESIGN.md` for checked contrast pairs. Legacy hue utilities remain compatibility aliases while new work uses semantic field roles.

Fonts: Anek Latin plus the Anek Devanagari, Telugu, Tamil, Kannada, Malayalam, Gujarati, Gurmukhi, Bangla, and Odia cuts (Ek Type), with Azeret Mono for instrument data. All are self-hosted via `next/font/google`; there is no runtime font CDN dependency.

## Engage form

The contact form at `/engage` posts to `/api/engage`. The route validates with Zod and forwards to [Resend](https://resend.com) when configured. Without `RESEND_API_KEY` and `ENGAGE_TO_EMAIL`, the route still validates payloads and acknowledges submissions; it just logs them locally instead of delivering.

## Adding content

- **Stack layer copy or specs**: edit `lib/catalog.ts` (`STACK_LAYERS`). The homepage stack act updates automatically.
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
- Instrument data uses Azeret Mono. Display copy uses Anek Latin. The two never cross
- Sand is precious: if a fold has more than two sand elements, it has too many
