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
| `/` | The One Sortie - one long page: `#launch` hero → `#brief` → `#denial` → `#stack` (`#skyanchor` / `#tenere` / `#kiksuya`) → `#mission` → `#hyderabad` → `#landing` |
| `/field-notes` + `/field-notes/[slug]` | Engineering essays - the public evidence layer |
| `/careers` + `/careers/[slug]` | Open roles |
| `/engage` + `/api/engage` | Talk to engineering |
| `/stack`, `/mission`, `/vehicles*` | Redirects into the long page (`next.config.ts`, temporary during QA) |

## Design tokens

Brand colors, type scale, motion easing, and radii are defined in `app/globals.css` under the Tailwind v4 `@theme` directive and surfaced as CSS custom properties.

| Token | Value | Role |
|---|---|---|
| `bg-ink` | `#051112` | Page baseline - teal-black night |
| `bg-teal` | `#13737A` | Tide teal - primary brand field |
| `bg-sand` / `text-sand` | `#FBCA89` | Field sand - luminous accent, CTAs, mission clock |
| `bg-oxblood` | `#88393C` | Denial + doctrine boundary |
| `text-aqua` | `#81D1D0` | Telemetry - mono readouts, audit lines |
| `text-fg` | `#F5F3EC` | Warm off-white text |

Derived neutrals (`warm-paper`, `warm-ink`, `current-deep`, `pale-tide`) carry text on colored fields - see `DESIGN.md` for the checked contrast pairs. Legacy `amber`/`gold` utilities alias to sand/aqua.

Fonts: Anek Latin + Anek Devanagari (Ek Type) and Azeret Mono, self-hosted via `next/font/google`. No runtime font CDN dependency.

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
