# Karta design system

## Current direction: Daylight, September 2026

This revision replaces the previous dark Field Atlas palette and layout. The site is a clear, light presentation of operational autonomy, inspired by the open typography of Kodiak, the product hierarchy of Comand AI, and the restrained structure of StirlingX. Askari, Sightline Intelligence, and Nomadium Robotics informed the reference review, but their darker visual treatments are not the selected direction.

A systems evaluator reads the site on a laptop in a bright briefing room. The surface should be comfortable in daylight, with a clear proposition before technical depth.

## Palette

| Role | Color | Use |
| --- | --- | --- |
| Field White | `#F7F8FA` | Main page and hero canvas |
| Soft panel | `#F0F2F5` | Contact form, product bands, footer |
| Fog Grey | `#E8EAF0` | Stack introduction, mission and closing sections |
| Midnight Ink | `#0B1020` | Body text |
| Deep Indigo | `#18244D` | Headlines, primary actions and playback controls |
| Signal Amber | `#C8962E` | Small markers, headline punctuation, diagram paths |
| Comb Gold | `#D8A84F` | Secondary diagram accent |
| Text amber | `#765619` | Small amber labels on light surfaces |
| Secondary text | `#515B6D` | Body explanations |
| Tertiary text | `#515B6D` | Metadata and labels |
| Controlled Red | `#8A1D1D` | Errors, critical states and the mission boundary statement |
| Hairline | `#D5D9E1` | Section and row dividers |

Amber and gold are not body-text colors on white. Use text amber where amber text is needed. Red is not a decorative action color. Image overlays use local dark scrims with Field White text, independent of light page tokens.

Legacy Tailwind token names remain for existing content components: `ink` now means the light page surface, `fg` means Midnight Ink, and `flare` means the dark action. `night-ink` remains the actual dark brand anchor.

## Typography

- Manrope for headings, body copy, navigation, and buttons. Calm, legible, and precise; the voice is closer to an engineering publication than a command terminal.
- Anek Devanagari for the Karta name and its meaning.
- Azeret Mono for genuine technical labels, specifications and dates.
- Sentence-case headlines with medium weight and tight tracking.
- Hero: 58–112px, roughly 1.0 line height. Mobile: 48–74px.
- Section headings: 32–64px, 1.08 line height.
- Body: 18–19px, 1.65–1.8 line height, no more than 65 characters per line.
- Small functional text: 12–15px; navigation and primary actions use 14–15px. Avoid repeated tiny uppercase section eyebrows.
- All fonts are served through Next's font pipeline. No new font package or animation dependency is required.

## Layout and components

- Header spans the viewport, with a quiet bottom border, the supplied metallic and gold brand lockup, readable links, and an outlined contact action.
- Full navigation above 900px; compact navigation below. Mobile menu traps and restores focus and makes the main content inert.
- Hero leads with the category on the left and the promise and contact action on the right. Under 600px these stack in reading order.
- The cropped SkyAnchor concept video follows the proposition at full width. It plays when visible, pauses offscreen, and has a top-right play/pause control. Manual pause persists across scrolling; reduced-motion visitors start on the poster.
- The identity rail gives the gold Karta name room to breathe, with an indigo meaning and a quiet Hyderabad location.
- Preserve the homepage story: hero, three stack responsibilities, individual products, autonomy loop, mission, Hyderabad, and conversation.
- Main content uses 32px desktop side gutters and a 1472px maximum width. Product bands give about 65% of their desktop grid to imagery; TENERE retains its full 1600:844 screenshot aspect ratio.
- Products use full-width bands and clear image captions. Captions sit beneath imagery on light surfaces rather than over dark artwork.
- Hyderabad uses an edge-to-edge skyline background with an indigo/ink scrim and white copy at the lower left, restoring the original place-as-identity treatment. The background covers the section on phones too.
- The autonomy loop becomes a readable vertical sequence below 600px; the operator reviews the record before the next mission.
- Closing section is a simple headline and invitation on Fog Grey.
- Shared buttons are rectangular, with quiet directional arrows and visible hover/focus states.
- Field Notes and Careers retain divided content rows. Contact uses one flat neutral panel with visible labels and square inputs.
- No decorative grain, orbiting signal field, floating glass navigation, or repeated gradient panels.

## Motion, accessibility, and content

Preserve restrained section reveals and the explanatory autonomy loop. Primary hero content renders immediately. Respect reduced motion, keep no-JavaScript content visible, and use transform and opacity for interaction feedback.

Use visible keyboard focus and at least 44px primary controls. The menu closes on Escape and when entering the desktop breakpoint. On small screens the content stays in document order.

Keep the operational-autonomy positioning and human authority central. Existing product imagery and content remain project assets; this design pass does not certify the capability claims or turn illustrative records into evidence. Do not add invented customer logos, metrics, certification badges, or performance claims.

## Reference sites

- https://kodiak.ai/
- https://www.comand.ai/
- https://www.stirlingx.io/
- https://askaridefense.com/
- https://sightlineintelligence.com/
- https://www.nomadiumrobotics.com/
