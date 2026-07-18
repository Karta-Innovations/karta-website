# Karta - Assets

Asset inventory and punch list for the One Sortie redesign (`redesign/v3-operational-autonomy`). Vehicles left the public site; the asset policy follows `DESIGN.md` (terrain, field surfaces, approved artifacts) with one sanctioned exception: the two founder-supplied mission plates, always labeled `REPRESENTATIVE SORTIE · ILLUSTRATIVE`.

## In place

| File | Used for | Status |
|---|---|---|
| `public/textures/terrain-brief.jpg` | Act 1 THE BRIEF - daylight corridor plate (launch → objective, three risk zones, stats strip) | OK - optimized from root `terrain.png` |
| `public/textures/terrain-mask.jpg` | `.texture-text` fill (hero AUTONOMY, landing LANDED) - label-free crop of the plate | OK |
| `public/imagery/mission-corridor.jpg` | Act 2 THE NIGHT - isometric night sortie plate (MissionMap) | OK - founder-supplied |
| `public/imagery/hyderabad.jpg` | Act 5 GROUND TRUTH skyline (teal dusk wash applied in code) | OK |
| `public/imagery/skyanchor.jpeg` / `tenere-gcs.jpeg` / `forest.jpg` | Stack layer stills (if wired) | Placeholder quality |
| `public/brand/*` | Logo lockups + PWA icons | OK |
| Root `terrain.png`, `terrain 2.png` | Source plates (masters for the optimized copies) | Keep as masters; not shipped |

## Wanted next (priority order)

1. **Real product artifacts** (credibility contract in `PRODUCT.md`): an approved position/confidence trace for SkyAnchor, a TENERE mission-graph screenshot with a visible human gate, a redacted Kiksuya policy excerpt with clause attribution. These replace the illustrative audit excerpt the moment engineering approves them.
2. **Layer band imagery** - 2400×1350 stills per stack layer: on-vehicle compute board (SkyAnchor), operator console (TENERE), doctrine/audit visual (Kiksuya). Dark-graded, no vehicle-led composition.
3. **Team + facility photography** (`public/imagery/team/`) - integration bay, field deployment, facility. Real, not stock; vehicle-free framing preferred.
4. **Field note covers** (`public/imagery/notes/<slug>-cover.jpg`, 1600×900) - optional per note.
5. **Per-route OG cards** - `app/<route>/opengraph-image.tsx` via `next/og`, teal-black base, sand accent line, Azeret coordinate strip.

## Sourcing rules

- Photography: cinematic, deep contrast, controlled palette on the teal-black base (`--color-ink #051112`). No blown-out skies, no stock unmanned-vehicle footage.
- Every scenario visual ships with the `REPRESENTATIVE SORTIE · ILLUSTRATIVE` label; every real artifact ships with source, conditions, date, and boundary in adjacent text.
- Ship JPG (q 85-92) or AVIF; PNG only for transparent logos. Textures for `.texture-text` stay under ~600 KB.

## Content surfaces

| Surface | Source | Route |
|---|---|---|
| Field note | `lib/content/notes.ts` (typed blocks) | `/field-notes/<slug>` |
| Career role | `lib/content/roles.ts` | `/careers/<slug>` |
| Stack layer copy/specs | `lib/catalog.ts` (`STACK_LAYERS`) | `/#skyanchor` `/#tenere` `/#kiksuya` |

## Environment

```
NEXT_PUBLIC_SITE_URL=https://karta.ai   # sitemap/robots absolute URLs
RESEND_API_KEY=re_...                   # engage form delivery
ENGAGE_TO_EMAIL=info@kartainnovations.com
```

See `env.example` for comments. Without the Resend vars the engage route validates and logs locally.
