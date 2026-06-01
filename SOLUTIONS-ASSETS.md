# Karta - Solutions & Vehicle Media Assets

Where to drop real media for the **Enterprise / Defense Solutions** pages and the **vehicle flight videos**, and the exact field that activates each one.

This is a companion to [`ASSETS.md`](./ASSETS.md) (hero loop, stack imagery, galleries, OG cards). Shared sourcing rules and brand specs live there; this file covers only what the Solutions reframe added. When a target overlaps, this file wins for Solutions surfaces.

## How wiring works

The site is data-driven. Media is referenced from two catalogs:

- [`lib/catalog.ts`](./lib/catalog.ts) - vehicles (`image`, `video`) and stack layers.
- [`lib/solutions.ts`](./lib/solutions.ts) - payloads, applications, and the two verticals.

**The pattern is always the same: drop a file in `public/`, set the field, ship.** No layout code changes. If a field is unset, the existing fallback (still image, or the generated schematic) renders, so nothing ever 404s or breaks the build.

---

## Priority 0 - Vehicle flight video (wired, ready for assets)

The one new media slot. Each vehicle can carry a looping flight clip that plays on its detail-page hero (`/vehicles/kari`, `/vehicles/cerana`, `/vehicles/dorsata`), muted and looped, with the existing still as the poster/fallback.

**1. Drop the files** (create the folder, it does not exist yet):

```
karta-web/public/video/kari-flight.mp4
karta-web/public/video/cerana-flight.mp4
karta-web/public/video/dorsata-flight.mp4
```

**2. Activate** - set the `video` field on the matching vehicle in [`lib/catalog.ts`](./lib/catalog.ts):

```ts
{
  slug: "cerana",
  // ...
  image: "/imagery/cerana.jpeg",   // stays as the poster + fallback
  video: "/video/cerana-flight.mp4", // ← add this line
  // ...
}
```

That is the whole change. The hero in [`app/vehicles/[slug]/page.tsx`](./app/vehicles/[slug]/page.tsx) swaps to `<video autoPlay muted loop playsInline poster={image}>` automatically when `video` is set.

**Specs:**

| Constraint | Value |
|---|---|
| Aspect | 16:9 (the hero frame is `aspect-[16/9]`) |
| Resolution | 1920×1080, or 2560×1440 for retina |
| Length | 8-20 s, **seamless loop** (first frame == last frame) |
| Audio | None - strip the audio track entirely |
| Format | **H.264 MP4** (universal, incl. Safari/iOS), High profile |
| Size | ≤ 10 MB per clip; aim for 4-6 MB |
| Grade | Cinematic, deep contrast, controlled palette - matches the ink background. No blown skies, no fisheye unless intentional. |

**Optional WebM (smaller files):** to also serve VP9/WebM, give the browser both sources. In `app/vehicles/[slug]/page.tsx` replace the single `<source src={vehicle.video} />` with:

```tsx
<source src={vehicle.video.replace(/\.mp4$/, ".webm")} type="video/webm" />
<source src={vehicle.video} type="video/mp4" />
```

and drop `cerana-flight.webm` alongside the `.mp4`.

**Optional - feature flight video elsewhere.** The same `vehicle.video` field can drive other surfaces. Keep clips small if you do this, since several can play at once.

- **Homepage Vehicles cards** ([`components/sections/Vehicles.tsx`](./components/sections/Vehicles.tsx)) - inside `VehicleCard`, render a `<video>` in place of `<Image>` when `vehicle.video` is set (mirror the detail-hero snippet). The existing gradient + 3D overlay still layer on top.
- **Solutions platform tiles** ([`components/sections/solutions/PlatformsForMission.tsx`](./components/sections/solutions/PlatformsForMission.tsx)) - same swap inside the tile `<Link>`.

**Reduced motion:** autoplaying video is not gated by `prefers-reduced-motion` by default. If you want it to hold the poster still for those users, gate it behind a `useReducedMotion()` check (the component would need to become a client component, like the homepage Hero).

---

## Priority 1 - Solutions page imagery (optional)

`/enterprise` and `/defense` are deliberately **typographic + instrument-schematic** - they need no photography to ship. Add imagery only if you want more cinematic weight.

### Hero background (optional)
Today the Solutions hero is a hairline grid on ink ([`SolutionHero.tsx`](./components/sections/solutions/SolutionHero.tsx)). To put a graded still or loop behind it (like the homepage `Hero`):

| File | Dimension | Description |
|---|---|---|
| `public/imagery/enterprise-hero.jpg` | 2400×1350 | Wide aerial over infrastructure - a substation, pipeline corridor, or mine at dawn. |
| `public/imagery/defense-hero.jpg` | 2400×1350 | A vehicle silhouette over contested/high-altitude terrain. |

Wire-up: add an absolutely-positioned `<Image>` + an ink scrim as the first child of the `<header>` in `SolutionHero.tsx`, behind the existing content. (Add an optional `heroImage?` to `VerticalConfig` in `lib/solutions.ts` to keep it data-driven.)

### Per-mission visuals (the focus panel)
The console focus panel renders a generated SVG schematic ([`MissionSchematic.tsx`](./components/sections/solutions/MissionSchematic.tsx)) keyed to each mission's primary payload - **no asset is required, and this is on-brand.** Only add real media here if you have genuine mission footage (e.g. an inspection clip, an ISR feed still). To do so:

1. Add an optional field to the `Application` interface in [`lib/solutions.ts`](./lib/solutions.ts):
   ```ts
   /** Optional real media for the console focus panel; falls back to the schematic. */
   media?: { image?: string; video?: string };
   ```
2. In [`MissionConsole.tsx`](./components/sections/solutions/MissionConsole.tsx) `FocusPanel`, render `app.media` when present, else `<MissionSchematic app={app} />`.
3. Suggested path pattern: `public/imagery/missions/<vertical>/<application-slug>.jpg` (e.g. `public/imagery/missions/enterprise/oil-gas.jpg`), 2400×1350.

This field is **not wired yet** - it is a documented future slot, not a regression if left empty.

### Payload thumbnails (optional)
The payload catalog ([`PayloadCatalog.tsx`](./components/sections/solutions/PayloadCatalog.tsx)) is text-only by design. If you want a small visual per payload, add `thumb?: string` to the `Payload` interface in `lib/solutions.ts` and a 1:1 image (e.g. `public/imagery/payloads/eoir.jpg`, 800×800 of the sensor head). Future slot, not wired.

---

## Quick map - field -> file -> renders in

| Asset | Field (file) | File path you provide | Renders in |
|---|---|---|---|
| Vehicle flight loop | `Vehicle.video` (`lib/catalog.ts`) | `public/video/<slug>-flight.mp4` | `/vehicles/[slug]` hero (wired) |
| Vehicle still | `Vehicle.image` (`lib/catalog.ts`) | `public/imagery/<slug>.jpeg` | detail hero poster, homepage cards, platform tiles (wired) |
| Solutions hero bg | `VerticalConfig.heroImage` (add) | `public/imagery/<vertical>-hero.jpg` | `SolutionHero` (needs wire-up) |
| Mission media | `Application.media` (add) | `public/imagery/missions/<vertical>/<slug>.jpg` | console focus panel (needs wire-up) |
| Payload thumb | `Payload.thumb` (add) | `public/imagery/payloads/<slug>.jpg` | payload catalog (needs wire-up) |

## Sourcing & brand rules

Follow the **Sourcing notes** in [`ASSETS.md`](./ASSETS.md): cinematic and deep-contrast, controlled palette against `--color-ink`, **no stock footage**, widescreen ratios, and a midnight scrim before any text overlay (the page templates already apply the scrim - source files can be un-scrimmed). Voice/labeling stays in the restrained mission-control register: no em dashes, no clichés.
