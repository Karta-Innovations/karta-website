# Karta design system

## Brand system v4 · "Dusk" · November 2026

Night indigo, saffron and cream. Field photography first. Headlines in expanded grotesk capitals.

Version 3 (cream page, display serif, very little imagery) fixed the dashboard look of version 2 but read as quiet next to the sites the founders admire: few pictures, a soft voice, an accent used only as a dot. Version 4 keeps v3's grid, restraint and rules, and changes the three things that carry energy: the ground is dark, the pictures are real and large, and the type speaks up. The research behind it is in `docs/REDESIGN-V4-BRIEF.md`.

What changed from the sections below, which still describe the shared system:

- **Colour:** the default ground is night indigo `--night` `#0B0F2E` (`data-tone="night"`); `indigo` `#1A2259` remains for the flight story and plates; `cream` and `sand` are the reading and product sheets. The accent `--red` is now saffron `#F26A21` (`--red-deep` `#B4480F` for small text on cream). On dark grounds the solid button is saffron with night type and turns cream on hover; on light grounds it is night indigo and turns saffron.
- **Type:** headlines (`.t-hero` to `.t-3`) are **Archivo** at 112 % width, weight 650, in capitals, tracked −0.018 to −0.004 em. Sizes are smaller than before because capitals read larger: 82 px hero and 52 px statements at a 1440 px window. Figures are Archivo 300. Instrument Sans is unchanged. No serif; कर्ता keeps its Sanskrit face.
- **Pictures:** the hero is a full-bleed photograph of the test site at dusk under a night-indigo shade (`HERO_FILM` in `Hero.tsx` is still the slot for a film). Straight after it, three large tiles (`Systems.tsx`): SkyAnchor on sand, TENERE, and Flights over a golden-hour field picture. The closing invitation sits over the sunset picture. Field pictures live in `public/imagery/field/`.
- **Tones down the homepage:** night (hero, tiles, statement), cream (questions), sand (SkyAnchor), night (TENERE), cream (stack), night (company, closing, footer).

Still true: hairlines not boxes, no chips, no glows, no decorative readouts, one solid action in a view, the bronze fix in the mark, and everything under "What the site does not show" in `PRODUCT.md`.

### References

The system was set against four sites the founders chose:

- **stark-defence.com** for the frame set into a light page, the label-left and statement-right grid, and the figure switcher.
- **distance.tech** for full-bleed footage with a small serif line over it, and for how little chrome a page needs.
- **streamlinesystems.ltd** for one pinned scene that tells a story in a handful of short sentences.
- **vesence.com** for the voice: a category claim, then short, plain, human sentences.

## Colour

Karta's own colours, reduced to three. Two of them are named for India: indigo (from the Latin for "Indian") and Indian red (the pigment of the country's red earth). Cream is the sheet.

| Token | Hex | Role |
| --- | --- | --- |
| `--indigo` | `#1A2259` | The field. Where the work is shown: the flight, the film, the company's voice. |
| `--red` | `#D5492A` | The point. A state, the one action in view, a false position on a chart. |
| `--cream` | `#F4F0E8` | The sheet. Where the work is read. |
| `--ink` | `#141A47` | Text on cream and sand. Indigo, darkened. |
| `--sand` | `#EBE5D9` | The second sheet. It sets the product apart and separates neighbouring bands of reading. |
| `--sand-2` | `#DFD7C8` | Deeper sand, for "yours" in the stack diagram. |
| `--indigo-deep` | `#121840` | Behind footage and the film player. |
| `--red-deep` | `#B0381C` | Red for small text on cream (meets AA). |
| `--red-bright` | `#EE6844` | Red on indigo. |

Rules:

- **Red is a point, never a field.** A state dot, a hover, the false GPS position on a chart. If red covers an area, something has gone wrong.
- **Cream reads, indigo shows, sand separates.** A band of the page declares one of the three with `data-tone="cream" | "sand" | "indigo"`, and every colour inside it resolves from that (`--bg`, `--fg`, `--fg-2`, `--fg-3`, `--line`, `--line-2`, `--accent`, `--accent-ink`, `--solid`).
- **No gradients, glows or fourth colour.** The only gradient on the site is the shade that keeps type legible over footage or the plate, and the only other colour is the bronze of the fix in the mark.
- Secondary text is the ink at 68 %, tertiary at 44 %. Hairlines are the ink at 14 % and 30 %.

## Type

| Face | Carries | Notes |
| --- | --- | --- |
| **Playfair Display** (high-contrast display serif) | What Karta says: headlines, statements, large figures | Weight 400. Tracking −0.055 to −0.035 em: it is drawn loose and only looks right set tight. Sentence case. Italic for the one word that turns a sentence. Lining figures. Not below 22 px. |
| **Instrument Sans** | What Karta measures: labels, body, data, controls | 400 for text, 500 for headings and controls, 600 for labels. Tabular figures in tables. |
| **Tiro Devanagari Sanskrit** | कर्ता | The name, in the script it comes from. Nothing else. |

There is no monospace anywhere.

The scale is deliberately modest: at a 1440 px window the hero is 88 px and a section statement 60 px, close to the reference sites (56 to 80 px). Size is not what makes a line important here; space is.

| Class | Size | Use |
| --- | --- | --- |
| `.t-hero` | 44 to 108 px | One per page |
| `.t-1` | 34 to 74 px | Section statements |
| `.t-2` | 27 to 52 px | Section titles beside a label |
| `.t-3` | 22 to 33 px | Row and step titles |
| `.t-4` | 17 to 21 px, sans 500 | Small headings |
| `.lede` | 18 to 23 px | One paragraph under a statement |
| `.body` | 16 to 19 px | Everything else |
| `.label` | 12 px, 600, +0.075 em, capitals | What a thing is |
| `.fig` | set by its place | A figure in the serif, with `.fig__unit` in the sans |

## Layout

- A twelve-column sheet. Margins `--m` (20 to 76 px, 52 px at a 1440 px window), gutters `--gap` (16 to 24 px), sections `--section` (88 to 184 px) apart.
- **Labels hang on the left edge, statements start at the centre line** (`.head`, `.head__label`, `.head__title`, `.head__body`).
- **Hairlines, not boxes.** Information is separated by a rule and by space. No cards, no chips, no radius, no shadows. The only filled blocks are the stack diagram's layers and buttons.
- Footage and pictures are set square to the sheet.
- Lists are rows: a label, the thing, a line about it, an arrow.

## Controls

- `.btn`: the one solid action in a view. Indigo on cream, cream on indigo, red on hover. `.btn--line` is its quiet twin.
- `.rule-link`: the house link. A short rule, then capitals. The rule grows toward the reader on hover.
- `.link`: an underlined text link.
- `.state`: a dot and a word. `--now` (filled, red) means it has flown; `--next` (hollow, grey) means it has not.

## Picture

- **Karta's own footage, or none.** Only Karta's own aircraft, sites and screens are shown. Footage of a vendor's aircraft is not Karta's to use, and the marketing films are not on the site (they show how SkyAnchor sees the ground).
- **The plate** (`.plate`) stands wherever footage would go until there is footage: the indigo field with the survey-mark lattice the charts are drawn on, quiet where the type sits. In the hero it carries the mark drawn in line, with its bronze fix. `HERO_FILM` in `components/sections/Hero.tsx` is the slot: describe a film there and the plate steps aside.
- When a film arrives: grade it warm with indigo in the shadows, set it square to the sheet, and open and close each loop on the site's indigo so a repeat reads as a cut.
- **Charts in two inks** (`lib/flight/scene.ts`): an axonometric chart of the ground with survey marks, a scale bar and north. The track flown on SkyAnchor is drawn in ink, with its height above the ground. What the aircraft's own GPS reported while it could not be trusted is drawn in red. Every mark comes from the flight log. A chart shows where the aircraft went, never how SkyAnchor worked that out.
- The module is shown as an object on the sand sheet, with its contact shadow.

## Motion

Unhurried. Exact. Once.

- **Once.** Things arrive one time and stay. Nothing loops for decoration.
- **Slowly.** One curve, `--ease` (`cubic-bezier(0.16, 1, 0.3, 1)`), between 1.1 and 1.6 s.
- **With the scroll.** The story advances when the reader moves the page.

| Pattern | Where | How |
| --- | --- | --- |
| Words rise from their baseline | Every statement | `<Words>`, `data-reveal="words"` |
| A shutter opens on a picture while it settles | Films and plates | `<Frame>`, `data-reveal="frame"` |
| A hairline draws from the left | Section rules | `.rule[data-reveal]` |
| A statement inks itself in | "What we build" | `<ScrollFill>` |
| A pinned chart, six sentences | The flight of 26 October, on `/flights` | `Mission.tsx`, the page scroll scrubs the log |
| One figure at a time | The figures board, on `/flights` | `FlightFacts.tsx`, with a progress line on the active row |
| The picture drifts a little slower than the page | Hero plate (or film), module | `<Drift>` and `--drift` |

Reveals are armed only under `html[data-js]`, are triggered by one `IntersectionObserver` (`RevealObserver`), and release themselves after three seconds if hydration never arrives.

With `prefers-reduced-motion`: no smooth scrolling, no reveals, no drift; footage waits for its play control; the pinned flight becomes a still chart of the whole flight with its six sentences listed beneath; charts draw the finished flight.

## The mark

The official outlines (`components/brand/Mark.tsx`, `Wordmark.tsx`). The chevron and stem are set flat, in the ink of the ground they sit on; the metallic render of those is retired from the site. The fix keeps the bronze of the master logo, as the founders asked on 23 November 2026.

- The chevron is a heading. The point is a position fix. The stem is the one who acts.
- Indigo or cream for the chevron and stem, bronze for the fix. One colour throughout where bronze cannot be printed.
- The bronze is shaded like turned metal: its colour changes with the angle around the centre. `components/brand/fix-sheen.json` holds that colour sampled every four degrees from the master artwork, and `fixWedges()` draws it as vector.
- Clear space: the height of the fix on every side. Smallest sizes: 24 px for the mark, 96 px for the lockup.
- Files are written by `scripts/build-brand-assets.mjs` to `public/brand/` and the app icons.

## Files

| Where | What |
| --- | --- |
| `app/styles/base.css` | Tokens, tones, type, layout, controls, media, motion |
| `app/styles/chrome.css` | Header, menu, closing invitation, footer, film player |
| `app/styles/home.css` | Homepage sections, in page order |
| `app/styles/pages.css` | Product, flights (figures board, pinned flight, replays), notes, careers, contact, brand, not found |
| `components/motion/` | `Words`, `Frame`, `ScrollFill`, `Drift`, `RevealObserver`, `SmoothScroll` |
| `components/flight/` | `FlightStage` (the chart on canvas), `FlightPlayer` (chart, scrubber, readouts, table) |

## What not to bring back

Mono labels and coordinate strips. Chips and tags with borders. Cards. Glows and gradients. Gold as an accent (the bronze fix in the mark is the one exception). A grid drawn behind things to make them look technical. Readouts that are there for atmosphere. More than one solid button in a view.
