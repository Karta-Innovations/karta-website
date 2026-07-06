# Design

Dark-only visual system for Karta Innovations. The palette is the former dark theme, promoted to the only theme. Deep navy-black terrain, azure accent, cyan telemetry.

## Theme

Dark only. `color-scheme: dark`. No toggle, no light tokens, no `data-theme` switching. The denied environment is the aesthetic: the page is the night the systems operate in.

## Color Palette

Surfaces (deep to lifted):

- `--color-surface-deep: #04060F` - footer well, deepest step
- `--color-ink: #070B18` - page baseline
- `--color-ink-2: #0E1426` - content sections
- `--color-surface: #141C36` - cards, raised panels
- `--color-indigo: #17224A` - feature card cores
- `--color-indigo-hi: #243463` - hover surfaces
- `--color-fog: #1A2340` / `--color-fog-2: #243363` - mist layers

Text:

- `--color-fg: #F3F6FC` - primary copy
- `--color-fg-muted: #AEB9D4` - body/secondary
- `--color-fg-tertiary: #6E7CA0` - mono labels, captions

Lines and fills:

- `--color-border: #1E2747`, `--color-border-strong: #2C3A63`
- `--color-edge: rgba(255,255,255,0.07)`, `--color-edge-strong: rgba(255,255,255,0.14)`
- `--color-glass: rgba(255,255,255,0.035)`, `--color-glass-hi: rgba(255,255,255,0.07)`

Accents (strategy: Restrained-plus. Azure is the single brand accent; cyan is telemetry/instrument color only; warm amber is a live-signal state, never decorative):

- `--color-amber: #4D8DFF` (azure; legacy token name kept) / `--color-amber-hi: #7DABFF` / `--color-amber-deep: #1E40AF`
- `--color-gold: #22D3EE` (cyan; legacy token name kept) - diagrams, telemetry strokes, hex readouts. Not body text.
- `--color-signal: #FBBF24` - acquiring/live states only
- `--color-alert: #F87171`, `--color-ok: #34D399`, `--color-warn: #FBBF24`

## Typography

- **Display/body:** Geist Sans (`--font-geist-sans`). Display: -0.025em tracking, 0.98 line-height, weight contrast over size where possible.
- **Instrument/labels:** JetBrains Mono (`--font-jetbrains-mono`). Uppercase mono labels are telemetry voice: coordinates, layer indices, scenario numbers.
- **Devanagari marker:** Noto Serif Devanagari (`--font-noto-devanagari`) for the कर्ता etymology moments only.
- Scale: fluid `clamp()` headings up to 88px+; light-on-dark body gets +0.05 line-height. Body ≤ 72ch.

## Components

- Section grammar: full-bleed folds, one beat per fold. Mono eyebrow → display headline → measured body.
- Cards only where the content is genuinely card-shaped (vehicles, stack layers). Full borders or background tint, never side-stripes.
- Buttons: solid azure primary on dark, ghost bordered secondary. `scale(0.97)` on `:active`.
- Imagery: duotone-tinted photography (screen blend on dark), gradient scrims from `--color-ink` for legibility.
- Grain + scanline overlays at low opacity for atmosphere; bounded, never over body text blocks.

## Motion

- Libraries: `motion` (framer-motion 12) for scroll-driven scrub (`useScroll` + `useTransform`) and in-view reveals; `animejs` v4 for orchestrated timelines (text choreography, SVG path drawing, counters/ticks).
- Constants live in `lib/motion.ts` (EASING quint/expo, DURATION fast 0.16s → reveal 0.9s). Never inline magic easings.
- Every animated component goes through `useReducedMotionSafe()`; reduced variant keeps opacity/color, drops movement.
- Scroll-driven `useScroll` refs stay inside their own component (pinned sections especially).
- Only `transform`, `opacity`, `clip-path`, `filter` animate. Exits ~75% of entrance duration. Ease-out on entrances, no bounce/elastic.
- Choreography: one signature moment per section (hero terrain + headline choreography; denied plunge deepening; loop diagram drawing itself; vehicles carousel; skyline parallax; CTA reveal).
