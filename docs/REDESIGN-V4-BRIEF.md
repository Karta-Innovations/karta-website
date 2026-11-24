# Redesign brief · November 2026

Research for the next pass. Nothing here is built yet. The current site (brand system v3) is described in `DESIGN.md`.

## The problem

The founders' note, 24 November 2026: the site "looks a little boring so far", where stark-defence.com is "more engaging and well made". They want colours, font and graphics rethought.

## Why the current site reads as quiet

Compared screen by screen with stark-defence.com:

| | Stark | Karta today |
| --- | --- | --- |
| Pictures per screen | One or more on almost every screen | Three on the whole homepage (placeholder hero, module, TENERE recording) |
| How products are shown | A mosaic of large tiles, each a photograph or render with its name, one line and a button laid over it | A list of two text rows |
| Headline voice | Heavy grotesk capitals, high contrast | A light display serif at moderate size |
| Colour | Light grey page, near-black tiles, one red accent, dark cinematic photography | Cream and indigo fields, accent used only as a dot |
| Things to do | Slider, figure switcher, news tiles, video | Scroll reveals |
| Empty space | Little; the grid is dense | A great deal |

The restraint of v3 fixed the "AI-built dashboard" problem of v2, but with flights, the method and the roadmap removed, and no footage, there is little left to look at. The fix is pictures and a bolder voice, not more decoration.

## What is new to work with

Eleven field pictures arrived (`/home/sarath/Pictures/field_pictures`). Ten are staged in `public/imagery/field/`:

| File | What | Best use |
| --- | --- | --- |
| `site-dusk-violet.jpg` | Test site at dusk, violet and pink sky, team by the vehicle, 16:9 | Hero, or the company section |
| `site-golden-hour-quad.jpg` | Golden hour through trees, a quadcopter in the air, vehicle and shelter | Flights tile, a full-width band |
| `site-dusk-aircraft-wide.jpg`, `site-dusk-aircraft.jpg` | White fixed-wing aircraft on its stand under a pink sky | Hero alternative, SkyAnchor page |
| `aircraft-under-shelter.jpg` | Aircraft and ground station under a green shelter, hard daylight | Integration, duotone treatment |
| `site-sunset.jpg` | Sun on the horizon, shelter and vehicle | Closing invitation |
| `site-day-aircraft-shelter.jpg` | Aircraft on its stand, shelter behind, daylight | Secondary |
| `site-trees-quad.jpg` | Quadcopter on its pad, trees | Secondary |
| `team-preflight.jpg`, `team-with-aircraft.jpg` | People with the aircraft | Careers, company |

They are WhatsApp copies (1280 to 1600 px wide). Full-resolution originals would hold up better at hero size.

**To confirm before any of them go live:** that the white aircraft is Karta's to show (the VTOL in the Pokhran footage was not), and that the people pictured are happy to appear.

The pictures also settle the colour question. Their own palette is indigo-violet dusk, saffron and gold light, sand, and green: Karta's colours, found on site.

## Three routes

Mock-ups were rendered with the real pictures and copy (kept outside the repo; ask for them to be re-rendered from this brief if needed).

### Route 1 · Dusk (recommended)

- **Ground:** night indigo `#0B0F2E`, with indigo `#1A2259` panels. Cream `#F4EFE6` for type and for the sections that need to be read.
- **Accent:** saffron `#F26A21`, used properly: buttons, large figures, labels. Brighter and more orange than today's Indian red.
- **Type:** an expanded grotesk in capitals for headlines (Archivo at 112 % width, weight 650), Instrument Sans for text. No serif, except कर्ता in its Sanskrit face.
- **Pictures:** full-bleed field photography under an indigo shade; a three-tile mosaic for SkyAnchor, TENERE and Flights straight after the hero.
- **Why:** closest to what the founders respond to in Stark, makes the dusk pictures the hero of the brand, and gives the accent real work.
- **Risk:** it is dark. It must stay photographic and plain, with none of v2's readouts, chips or glows.

### Route 2 · Khadi

Today's system with pictures added: cream page, Playfair headlines, photographs set in as plates, one tile in solid Indian red. The smallest change, and the calmest result. It answers "more pictures" but not "more engaging".

### Route 3 · Block print

Indigo and saffron in large flat fields, photographs printed in indigo duotone, a heavy lowercase grotesk (Bricolage Grotesque). The most distinctive and the most Indian in feeling, but loud, and the duotone hides how good the dusk pictures are.

A useful hybrid: Route 1 as the system, with Route 3's indigo duotone kept for secondary pictures (daylight shots, team pictures) so they sit with the dusk photography.

## What the build would involve (Route 1)

1. **Tokens:** night indigo ground, saffron accent, new tone names; keep `cream` and `sand` tones for reading sections and the product sheet.
2. **Type:** swap Playfair Display for Archivo (width axis) in `app/layout.tsx`; retune the scale for capitals (they read larger, so sizes come down again).
3. **Hero:** `site-dusk-violet.jpg` (or the founders' video when it arrives) full-bleed with the line over it; `HERO_FILM` stays as the slot.
4. **Systems mosaic:** replaces the two text rows. Three tiles: SkyAnchor (module on sand), TENERE (recording), Flights (golden-hour picture).
5. **Picture bands:** one full-width field picture between sections, with a single line over it, as on distance.tech.
6. **Things to do:** bring the figure switcher onto the homepage in a form that is not a flight story (the founders moved flights off the homepage, so this needs their yes), hover states on tiles, a picture slider for the field site.
7. **Graded copies** of the field pictures (one grade: indigo in the shadows, warm highlights) written by a small script, as the footage was.
8. Brand page, social card, docs.

## Rules that still hold

From `PRODUCT.md`: nothing that explains how SkyAnchor navigates, no roadmap, flights only on `/flights`, no footage of other people's aircraft, no marketing films. The bronze fix stays in the mark.
