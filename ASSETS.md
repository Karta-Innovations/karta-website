# Karta - Assets to Source

A punch list of media that would strengthen the site beyond what is already in `public/imagery/`. Each item names a target file path, a recommended dimension, and the page that needs it.

> For the **Enterprise / Defense Solutions** pages and **vehicle flight videos**, see [`SOLUTIONS-ASSETS.md`](./SOLUTIONS-ASSETS.md). The `Vehicle.video` slot is already wired - drop a clip in `public/video/` and set the field.

## What is already in place

| File | Used for | Status |
|---|---|---|
| `public/imagery/himalaya.jpg` | Hero parallax, mission hero | OK |
| `public/imagery/cerana.jpeg` | Vehicles index + detail | Could be sharper |
| `public/imagery/dorsata.png` | Vehicles index + detail | Could be sharper |
| `public/imagery/kari.jpeg` | Vehicles index + detail | Could be sharper |
| `public/imagery/skyanchor.jpeg` | Stack - Edge layer reference | Lower-fidelity placeholder |
| `public/imagery/tenere-gcs.jpeg` | Stack - Command layer | Lower-fidelity placeholder |
| `public/imagery/forest.jpg` | Stack - Theatre (Kiksuya) | Stand-in only - needs replacement |
| `public/imagery/urban-industrial.jpg` | Anchor section | OK |
| `public/imagery/thar.jpg` | Geographies (referenced by region) | Available, not embedded |
| `public/imagery/coast.jpg` | Geographies | Available, not embedded |
| `public/imagery/monsoon-forest.jpg` | Geographies | Available, not embedded |
| `public/imagery/border-ridge.jpg` | Geographies | Available, not embedded |
| `public/imagery/white.png` | Brand mark (chrome/silver) in nav + footer | Working |
| `public/imagery/karta_Icon-removebg-preview.png` | PWA manifest icon | Working |
| `public/imagery/_archive/` | Historical logo variants (9 files) - gitignored, recoverable on disk | Archived |

## Priority 0 - 3D vehicle models

The Vehicles section scaffolding is wired but waiting on real `.glb` assets. Once you drop a model, edit one allowlist entry and the section auto-upgrades on next page load - no code changes needed.

**Drop the files here:**

```
karta-web/public/models/kari.glb
karta-web/public/models/cerana.glb
karta-web/public/models/dorsata.glb
```

The `public/models/` folder does not exist yet. Create it when the first `.glb` lands.

**Activation step:** open [`lib/3d-assets.ts`](./lib/3d-assets.ts) and uncomment the slug(s) you've supplied:

```ts
export const VEHICLES_WITH_3D_MODEL: ReadonlyArray<Vehicle["slug"]> = [
  "kari",       // ← uncomment when kari.glb exists
  "cerana",     // ← uncomment when cerana.glb exists
  "dorsata",    // ← uncomment when dorsata.glb exists
];
```

Only slugs in this array attempt to load 3D. The site stays on the existing JPG fallback for any slug not listed - no 404s, no console noise.

**Per-model constraints** (enforce before export):

| Constraint | Value |
|---|---|
| Format | glTF binary (`.glb`), Draco-compressed |
| Disk size | ≤ 500 KB each |
| Triangle count | ≤ 50,000 |
| Materials | Single PBR material per model |
| Textures | ≤ 1024×1024, baked, KTX2/Basis preferred |
| Orientation | +Y up, +Z forward |
| Origin | Centered at model centroid |
| Scale | Longest dimension ≈ 2 world units |
| Animation tracks | **None** - the camera moves; the model is static |

**What you get for free:** the inner scene at [`components/3d/VehicleModelScene.inner.tsx`](./components/3d/VehicleModelScene.inner.tsx) auto-rotates the model at 0.18 rad/s, wraps it in `<Suspense>` so loading falls back to the existing JPG, applies a 3-light setup (key + fill + amber rim), and uses the gated `CanvasShell` so WebGL/reduced-motion users see the same JPG. Drop the file; uncomment the slug; ship.

## Priority 1 - Real product imagery

The current Edge / Command / Theatre stills are placeholders. Replace them with actual product visuals.

| File path | Dimension | Description |
|---|---|---|
| `public/imagery/skyanchor-hero.jpg` | 2400×1350 | On-vehicle compute board + a topographic overlay; or a vehicle in flight with a HUD-style pose-uncertainty graphic. Anchors the Edge layer. |
| `public/imagery/tenere-hero.jpg` | 2400×1350 | TENERE operator console - a real screenshot or a render of the mission-graph editor with multi-vehicle deconfliction visualised. |
| `public/imagery/kiksuya-hero.jpg` | 2400×1350 | Doctrine runtime visual - could be an abstract: a node-link doctrine policy graph, or hands writing on a procurement document with the audit trail overlaid. Avoid generic "AI" stock. |

## Priority 2 - Hero motion

A static hero, however well art-directed, is now table stakes for the autonomy-defense category. Add:

| File path | Dimension / format | Description |
|---|---|---|
| `public/imagery/hero-loop.webm` + `.mp4` | 1920×1080, 10–15 s loop, <8 MB | A slow-cinematic shot - vehicle silhouette over Himalayan ridge at dawn, or a long aerial over the Thar with a subtle telemetry overlay. Looped, no audio. |
| `public/imagery/hero-still.jpg` | 2400×1350 | Poster frame served before the video loads. Currently the static Himalaya image is doing this job - replace with a properly graded poster frame from the loop. |

Wire-up: in `components/sections/Hero.tsx`, swap the `<Image src="/imagery/himalaya.jpg" …/>` for a `<video>` with `poster={…/hero-still.jpg}` and `<source src="/imagery/hero-loop.webm" type="video/webm" />`. The parallax `motion.div` wrapper continues to work.

## Priority 3 - Vehicles detail

Each vehicle page renders a single hero image. Adding three more per platform unlocks the photo-gallery slot we left in `app/vehicles/[slug]/page.tsx`.

| File path pattern | Dimension | Description |
|---|---|---|
| `public/imagery/vehicles/cerana/01-flight.jpg` | 2400×1600 | Cerana in flight against complex terrain. |
| `public/imagery/vehicles/cerana/02-deploy.jpg` | 2400×1600 | Operator hand-launching from a backpack. |
| `public/imagery/vehicles/cerana/03-payload.jpg` | 2400×1600 | The payload bay or sensor head close-up. |
| `public/imagery/vehicles/dorsata/{01-flight,02-takeoff,03-base}.jpg` | 2400×1600 | Flight, catapult launch, hangar shot. |
| `public/imagery/vehicles/kari/{01-tube,02-loiter,03-recovery}.jpg` | 2400×1600 | Canister launch, loiter geometry, recovery posture (if applicable). |

Wire-up: add a `gallery: string[]` field to each `Vehicle` in `lib/catalog.ts` and render in `app/vehicles/[slug]/page.tsx`.

## Priority 4 - Team and facility

The "Hyderabad" section and a future `/team` route both need this.

| File path | Dimension | Description |
|---|---|---|
| `public/imagery/team/karta-facility.jpg` | 2400×1350 | The Karta facility in Hyderabad - exterior or interior. Replaces the generic Hyderabad urban shot. |
| `public/imagery/team/integration-bay.jpg` | 2400×1600 | An engineer integrating a vehicle. Real, not stock. |
| `public/imagery/team/field-deploy.jpg` | 2400×1600 | A field deployment - operators with a vehicle in mountainous or desert terrain. |
| `public/imagery/team/headshots/<name>.jpg` | 1200×1200, square crops | Founder + leadership headshots if a future `/team` page is built. Editorial lighting, dark backgrounds preferred to match the site palette. |

## Priority 5 - Diagrams and SVGs

Hand-illustrated technical diagrams elevate the Stack page significantly.

| File path | Format | Description |
|---|---|---|
| `public/diagrams/stack-altitude.svg` | SVG, 1600×900 | The Edge → Command → Theatre altitude diagram - a single architectural drawing showing where decisions live. |
| `public/diagrams/skyanchor-fusion.svg` | SVG, 1200×800 | VIO + terrain-relative + barometric fusion block diagram. |
| `public/diagrams/tenere-mission-graph.svg` | SVG, 1600×900 | A representative mission graph showing multi-vehicle deconfliction. |
| `public/diagrams/kiksuya-doctrine-pack.svg` | SVG, 1600×900 | A doctrine pack composition diagram - clause hierarchy, signature chain, audit annotation. |
| `public/diagrams/operating-envelopes.svg` | SVG, 1600×1200 | A geographically-correct operational-envelope map. (The previous India-shaped SVG has been replaced by terrain-class photography.) |

The current `components/sections/Geographies.tsx` uses an inline simplified path. Once a geographically-correct SVG lands, swap it in.

## Priority 6 - Field Notes covers

Each note can have an optional cover image to anchor the index and the open-graph card.

| File path pattern | Dimension | Description |
|---|---|---|
| `public/imagery/notes/<slug>-cover.jpg` | 1600×900 | One per Field Note slug. Editorial photography, technical diagrams, or carefully art-directed dark-tech imagery. |

Wire-up: add a `cover?: string` field to `FieldNote` in `lib/content/notes.ts`. The index and detail templates already leave room.

## Priority 7 - Open Graph cards

Currently `metadataBase` is set but no per-route OG image is generated. Each major route should have a unique 1200×630 OG card.

Recommended: build them dynamically via Next's `app/<route>/opengraph-image.tsx` using `next/og`. Format: dark Midnight Ink background, JetBrains Mono coordinate strip, Geist Sans title in field-white, amber accent line. Each route renders its own at request time and Next caches them.

| Route | Static OG image (fallback) |
|---|---|
| `/` | `public/og/home.jpg` |
| `/stack` | `public/og/stack.jpg` |
| `/vehicles` | `public/og/vehicles.jpg` |
| `/vehicles/[slug]` | derived from vehicle hero |
| `/mission` | `public/og/mission.jpg` |
| `/field-notes/[slug]` | derived from note cover when available |

## Priority 8 - Operational manifestation

For full editorial weight on the Stack page, source these in-situ shots:

- A photograph of a Karta-equipped vehicle being prepared for sortie (cables, technicians, telemetry monitors visible)
- A photograph of an operator at a TENERE workstation (multi-monitor, doctrine overlay readable)
- A long-exposure of a vehicle on approach against deep terrain (suggests altitude + autonomy)

These exist on every reference site (Anduril, Sightline, StirlingX) and are what move the design out of "render-quality" into "really shipping".

## Priority 9 - Content surfaces (MDX)

Field Notes and Careers are file-based content. Each route is generated from an MDX file - no CMS, no DB.

| Surface | File pattern | Route | Frontmatter required |
|---|---|---|---|
| Field Note | `content/field-notes/<slug>.mdx` | `/field-notes/<slug>` | `title`, `summary`, `date`, optional `cover` |
| Career role | `content/careers/<slug>.mdx` | `/careers/<slug>` | `title`, `team`, `location`, `summary`, `contact` |

To add a new role or note: create a new `.mdx` file with the frontmatter block at the top, write the body in markdown, and the route appears on next build (or hot-reload in dev). The index pages (`/field-notes`, `/careers`) auto-pick it up from `lib/content/notes.ts` and `lib/content/roles.ts`.

## Priority 10 - Environment variables

The site reads exactly one runtime env var today. Create `karta-web/.env.local` (gitignored by default) when deploying:

```
NEXT_PUBLIC_SITE_URL=https://karta.ai
```

Consumed by [`app/sitemap.ts`](./app/sitemap.ts) and [`app/robots.ts`](./app/robots.ts) to emit absolute URLs. Default fallback if unset is `https://karta.ai` - fine for local dev, but set it explicitly on Vercel / production so previews don't leak preview URLs into the sitemap.

For the contact form (`/engage`), `app/api/engage/route.ts` also reads:

```
RESEND_API_KEY=re_...           # Resend API key
ENGAGE_TO_EMAIL=info@kartainnovations.com
```

See [`env.example`](./env.example) for the full list with comments.

## Sourcing notes

- **Photography style**: cinematic, deep contrast, controlled palette (matches `--color-ink` background). Avoid blown-out skies, saturated colour grading, lens flares, vehicle-cam fisheye unless intentional.
- **Avoid stock**: every reference site benchmarks higher than Karta because they shot their own gear. Stock unmanned-vehicle footage breaks the register immediately.
- **Aspect ratios**: cinematic widescreen (16:9 or 21:9) reads best on the dark surface. Square crops are reserved for headshots and PWA icons.
- **File format**: ship as JPG (quality 88–92) or AVIF where possible. PNG only for logos with transparency. The `next.config.ts` `images.qualities` array already includes 75/85/88/92.

## Future content surfaces (not blocking v1)

When you have bandwidth for these:

- **`/team`** - founders, leadership, contributors. Editorial layout.
- **`/news`** - press mentions, press releases. Distinct from `/field-notes` (engineering essays).
- **`/programmes`** - case-study format pages tied to specific deployments (where security allows).
- **`/api-docs`** - once the Karta integration surface stabilises.

Each of these has a clean addition path: a new route under `app/`, a typed content array under `lib/content/`, and a section in the `Footer` "Company" column.
