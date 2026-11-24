# Karta · web

The website for Karta Innovations: the brain for unmanned systems.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind v4** (for its reset; the styles are hand-written), **Framer Motion** and **Lenis**. The site runs on the "Dusk" brand system: night indigo, saffron and cream, field photography, and headlines in expanded grotesk capitals.

## Quick start

```bash
npm install
cp env.example .env.local         # optional; the site renders without it
npm run dev                       # http://localhost:3000
```

```bash
npm run build && npm run start    # production
npm run typecheck
npm run lint
```

## Layout

```
app/
  page.tsx                  The homepage
  skyanchor/                The product: how it works, specifications
  field-notes/[slug]/       Engineering notes
  careers/[slug]/           Open roles
  engage/ + api/engage/     Talk to engineering
  styles/                   base, chrome, home, pages (imported by globals.css)
  icon.svg, apple-icon.png, opengraph-image.tsx
components/
  brand/                    Mark and Wordmark (vector)
  chrome/                   Nav, Footer, BootScript, SectionLink
  media/                    InViewVideo
  motion/                   SmoothScroll, RevealObserver, Words, Frame, ScrollFill, Drift
  sections/                 Hero, Systems, Statement, Questions, SkyAnchorBand, Tenere, Stack, FieldBand, Company
  forms/                    EngageForm
lib/
  skyanchor.ts              Product facts and specifications
  stack.ts                  TENERE, integration stack, company copy
  content/                  Field notes and roles
  site.ts                   Identity, contact, navigation
public/
  media/, imagery/, brand/  See ASSETS.md
scripts/
  encode-media.sh           Marketing masters → web footage
  build-brand-assets.mjs    App icons and favicon
```

## Routes

| Route | Purpose |
|---|---|
| `/` | `#top` → `#questions` → `#skyanchor` → `#tenere` → `#stack` → `#company` → `#contact` |
| `/skyanchor` | The product page |
| `/field-notes`, `/field-notes/[slug]` | Engineering notes |
| `/careers`, `/careers/[slug]` | Open roles |
| `/engage`, `/api/engage` | Talk to engineering |
| `/stack`, `/mission`, `/vehicles*`, `/evidence`, `/flights`, `/products` | Redirects (`next.config.ts`) |

## Where things are decided

- **How it looks and moves:** `DESIGN.md`. The standalone brand kit is at `/home/sarath/Videos/website/branding`.
- **What it says, and how claims are written:** `PRODUCT.md`.
- **Where every asset comes from:** `ASSETS.md`.

## Elsewhere

- The Flights page and everything behind it were removed on 24 November 2026 and archived at `/home/sarath/Videos/website/flights`.
- A standalone brand kit (logos, tokens, pictures, guide) is at `/home/sarath/Videos/website/branding`.

## Changing content

Read "What the site does not show" in `PRODUCT.md` first: the site does not explain how SkyAnchor navigates, does not publish a roadmap, and keeps flights on `/flights`.

- **The hero film:** the hero holds a brand plate until there is a film of Karta's own aircraft. Put the encodes in `public/media` and describe them in `HERO_FILM` in `components/sections/Hero.tsx`.
- **SkyAnchor specifications:** `lib/skyanchor.ts`.
- **TENERE, the stack, company copy:** `lib/stack.ts`.
- **A field note or a role:** `lib/content/notes.ts`, `lib/content/roles.ts`.

## Engage form

`/engage` posts to `/api/engage`, which validates with Zod and forwards through [Resend](https://resend.com). If `RESEND_API_KEY` or `ENGAGE_TO_EMAIL` is missing the route answers 503 and directs the visitor to email; it never reports an undelivered enquiry as sent. `node scripts/check-engage-delivery.mjs` checks that behaviour without sending mail.

## Deployment

Configured for Vercel. Set `NEXT_PUBLIC_SITE_URL`, `ENGAGE_TO_EMAIL` and `RESEND_API_KEY`. Every page is prerendered; only `/api/engage` runs on demand.

## Performance and motion

- Animation uses `transform`, `opacity` and `clip-path` only, on one easing curve.
- Footage runs only while on screen and stops when the tab is hidden.
- `prefers-reduced-motion` turns off smooth scrolling, reveals, drift and autoplay.
- Scroll reveals are armed only when script is running and release themselves if hydration never arrives.

## Voice

Calm, exact and from the field, in short sentences a person would say. Every number sits beside what it was measured against. No em dashes, no filler, no adjectives doing the work of evidence. `PRODUCT.md` has the rules.
