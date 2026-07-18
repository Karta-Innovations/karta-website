# Design

This document is the proposed visual contract for the operational-autonomy redesign on `codex/operational-autonomy-redesign`. It follows the reusable design-reference structure advocated by [getdesign.md](https://getdesign.md/): atmosphere, semantic color roles, type, layout, components, depth, responsive behavior, motion, accessibility, and explicit guardrails.

## Visual theme and atmosphere

### Design thesis

**A field atlas crossed with an audited runtime.**

The interface should feel like a survey map placed beneath a precise command instrument: physical terrain, plotted intent, changing confidence, hard boundaries, and a record that returns. It must not look like a vehicle catalog, generic defense CGI, a neon command center, or a SaaS dashboard.

### Physical scene

A mission-systems evaluator opens the site on a large monitor in a bright briefing room after seeing too many glossy airframe presentations. The page feels grounded and readable in daylight, but consequential enough to reward close inspection. Warm field surfaces carry the human story. Deep teal instrument surfaces carry the system story. Oxblood marks constraints. Aqua marks returned or system-confirmed state and connective traces.

### Brand voice words

- field-worn
- calibrated
- accountable

### Color strategy

**Full palette with named operational roles.** The four supplied colors all appear, but never as interchangeable decoration. The page moves through color as a state sequence:

1. Deep teal: uncertainty and operating context.
2. Sand: clarity and explanation.
3. Oxblood: boundary, intervention, and consequence.
4. Aqua: returned or system-confirmed state and connective traces.

Teal and derived deep surfaces carry roughly 55 to 60 percent of the experience. Sand carries 25 to 30 percent. Aqua stays below 8 percent. Oxblood stays below 5 percent. Warm paper and derived inks exist for readable text and accessible states.

## Color palette and roles

The user-supplied colors remain exact brand anchors. Derived neutrals are hue-tinted and avoid pure black or pure white.

| Token | Value | Role | Usage rule |
| --- | --- | --- | --- |
| `--color-tide` | `#13737A` | Primary teal | Brand surface, large bands, navigation state, hero atmosphere. Pair with warm paper for body text. |
| `--color-field` | `#FBCA89` | Primary sand | Explanatory chapters, large display text, selected primary actions. Pair with warm ink or oxblood for body text. |
| `--color-boundary` | `#88393C` | Accent oxblood | Constraint, intervention, denied state, and doctrine boundary. Never use as generic decoration. |
| `--color-telemetry` | `#81D1D0` | Accent aqua | Returned or system-confirmed state, return path, confidence trace, focus ring, and selected system indicators. |
| `--color-current-deep` | `#082E31` | Deep teal surface | Highest-contrast instrument field, footer, diagrams, WebGL fog, and dark controls. |
| `--color-warm-paper` | `#FFF3DE` | Primary light text/surface | Body text on teal and oxblood, forced solid fallback for masked text, high-contrast paper bands. |
| `--color-warm-ink` | `#152E2F` | Primary dark text | Body text on sand and aqua, outlines on light fields. |
| `--color-pale-tide` | `#E1F0ED` | Secondary light text | Supporting text on teal where AA contrast is required. |
| `--color-field-muted` | `#D8C8AF` | Muted light surface | Dividers, inactive data, captions on deep current only. Do not use for body text on primary teal. |

### Checked contrast pairs

| Foreground on background | Approximate ratio | Allowed use |
| --- | --- | --- |
| `#FFF3DE` on `#13737A` | `5.09:1` | Normal body text and controls. |
| `#E1F0ED` on `#13737A` | `4.76:1` | Normal secondary text. |
| `#FBCA89` on `#13737A` | `3.70:1` | Large display text and graphics only. |
| `#81D1D0` on `#13737A` | `3.18:1` | Large labels, traces, focus decoration, and graphics only. |
| `#FBCA89` on `#082E31` | `9.62:1` | Normal text and controls. |
| `#81D1D0` on `#082E31` | `8.28:1` | Normal text and confirmed runtime state. |
| `#152E2F` on `#FBCA89` | `9.50:1` | Normal body text and controls. |
| `#88393C` on `#FBCA89` | `5.16:1` | Normal text, boundaries, and actions. |
| `#FFF3DE` on `#88393C` | `7.09:1` | Normal text and controls. |
| `#152E2F` on `#81D1D0` | `8.17:1` | Normal text and controls. |

Do not place oxblood body text on aqua. The approximate `4.44:1` ratio falls just below the normal-text target. Never rely on opacity to repair a weak pair.

### Semantic state rules

- **Default and context:** tide teal.
- **Readable explanation:** field sand with warm ink.
- **Returned or system-confirmed:** telemetry aqua, supported by a text label or icon.
- **Constraint or intervention:** boundary oxblood, supported by a text label, shape, or pattern.
- **Unknown or inactive:** warm paper or muted field at a validated contrast.
- **Focus:** two-layer ring, warm paper outside and telemetry aqua inside on dark surfaces; warm ink outside and tide teal inside on light surfaces.

`System-confirmed` means the interface has acknowledged a runtime state. It does not mean independently validated, tested, certified, or approved. Evidence status must be stated in text with its source, conditions, date, and boundary. Never use aqua or any other color to make an illustrative artifact look validated.

## Typography rules

### Selection rationale

The brief calls for a type system that feels physical, precise, and rooted in India without using decorative cultural shorthand. The first reflex choices for technical brands, Geist, Inter, Space Grotesk, and IBM Plex Mono, are deliberately rejected for this redesign.

### Families

- **Display and body:** Anek Latin, variable weight and width. Ek Type designed Anek as a multiscript family with sharp terminals, tapered joins, and a broad width axis. Use wider, heavier cuts for the monumental headline and quieter middle cuts for body text.
- **Devanagari identity moment:** Anek Devanagari. Use once for the approved Karta etymology after language review. It should align naturally with the Latin family.
- **Instrument data:** Azeret Mono. Use only for coordinates, timestamps, confidence values, trace IDs, and log fragments. It is functional data typography, not a repeated section-label costume.
- **Fallbacks:** system sans for Anek, system monospace for Azeret.

The Anek family is open source under the SIL Open Font License and comes from Mumbai-based Ek Type. Source: [Ek Type Anek Latin](https://ektype.in/anek-latin.html).

### Type scale

| Role | Fluid size | Weight/width | Line height | Usage |
| --- | --- | --- | --- | --- |
| Hero texture word | `clamp(4.6rem, 15vw, 13rem)` | `750`, wide | `0.78` to `0.84` | `AUTONOMY` only. One line where space allows. |
| Hero statement | `clamp(2.5rem, 6.4vw, 6.75rem)` | `620`, normal to wide | `0.9` | The memory hook, two lines maximum. |
| Chapter heading | `clamp(2.25rem, 5vw, 5.2rem)` | `600` | `0.94` | One idea per chapter, max 15 words. |
| Section heading | `clamp(1.75rem, 3vw, 3.25rem)` | `560` | `1.02` | Stack responsibility or proof heading. |
| Lead | `clamp(1.15rem, 1.7vw, 1.45rem)` | `430` | `1.5` | Hero deck and chapter lead, max 52 characters per line. |
| Body | `clamp(1rem, 0.35vw + 0.92rem, 1.125rem)` | `400` | `1.65` | Maximum 68 characters per line. |
| Data | `0.75rem` to `0.875rem` | `500` | `1.4` | Instrument facts and logs. Do not uppercase paragraphs. |
| Caption | `0.8125rem` | `430` | `1.5` | Conditions, provenance, and boundaries. |

### Type behavior

- Use `text-wrap: balance` for display copy and `text-wrap: pretty` for body copy.
- Large Anek text may animate the width axis by a very small amount during entry. Do not loop variable-font animation.
- Use sentence case. Uppercase is reserved for the hero texture word, short trace states, and true abbreviations.
- Use tabular figures for metrics and logs.
- Avoid repeated tiny tracked eyebrows. A chapter index or operational state appears only when it carries information.

## Layout principles

### Page structure

- The homepage is a long narrative with one beat per chapter.
- The maximum content grid is `90rem` or `1440px`, but full-bleed color, terrain, and trace layers may ignore the container.
- Desktop uses a 12-column grid with asymmetric spans. Tablet uses 6 columns. Mobile uses one content column with data rails beneath the relevant text.
- Default page gutters are `clamp(1rem, 4vw, 4rem)`.
- Major chapter separation ranges from `clamp(7rem, 14vw, 14rem)`. Related elements stay tight.
- Not every chapter fills the viewport. Use minimum viewport height only for the hero and the central operation sequence.
- Avoid equal card grids. Stack layers are full-width bands or one continuous system diagram. Proof, notes, and roles use rows.

### Long-page rhythm

1. **Autonomy:** deep teal, monumental, sparse.
2. **Operation:** deep current, one continuous route and changing system state.
3. **Definition:** sand, plain-language mnemonic.
4. **Stack:** alternating sand and teal bands with one responsibility per band.
5. **Closed loop:** deep current with aqua return path.
6. **Proof:** paper or sand rows that expose artifacts and boundaries.
7. **Mission:** oxblood used as a bounded field, then resolving to sand.
8. **Identity and close:** teal, warm and human.

The progression must read as one system changing state, not unrelated themed sections.

## Signature texture-mask treatment

The [HyperFrames Texture Mask Text](https://hyperframes.heygen.com/catalog/components/texture-mask-text) reference is adapted as a web-native signature, not installed as a package. Its installer targets a HyperFrames `compositions/` directory and should not be run in this Next.js repository.

### Use

- Apply the effect to the single word `AUTONOMY` in the hero.
- Use a Karta-owned grayscale terrain, ground, mineral, or survey-paper texture stored locally, for example `/textures/autonomy-terrain-mask.webp`.
- Prefer a mask asset with an intentionally authored alpha channel. If the source is fully opaque grayscale, set `mask-mode: luminance` and `-webkit-mask-mode: luminance`, then verify the result in Chromium, Safari, and Firefox. A grayscale file used with the default alpha mode may produce no visible texture.
- Keep the DOM text real and selectable.
- Apply `mask-image` and `-webkit-mask-image` to the text, with `--mask-size` and `--mask-position` variables.
- Put any `drop-shadow()` on a wrapper so the shadow follows the masked contour.
- Provide a solid `#FBCA89` or `#FFF3DE` fallback with `@supports` and forced-colors handling.
- Move mask position very slowly, only while the hero is visible. The movement should resemble scanning terrain, not liquid or lava.

### Limits

- One masked word per page.
- No brick, lava, glossy metal, or borrowed HyperFrames asset.
- No critical copy inside the masked treatment.
- Freeze the effect for reduced motion, offscreen state, hidden tabs, data-saver mode where available, and low-power fallback.
- Avoid permanent `will-change` and large source textures. Target a compressed local texture under `350 KB`.

Reserve a copy-safe zone in the hero. Procedural terrain and animated contours must stay outside the body-copy column or sit behind a uniform deep-current backing whose contrast is tested in the animated state. Do not calculate contrast against the base teal and then place moving light detail behind the text.

## Component styling

### Navigation

- Sticky but quiet, approximately 64 to 72px tall.
- Desktop items: Autonomy, Stack, Mission, Field Notes, Careers, and one primary `Talk to engineering` action.
- Autonomy, Stack, and Mission target homepage anchors.
- Use a thin divider and restrained surface transition, not a floating glass pill.
- Show `aria-current` for routed pages and an active chapter marker for homepage anchors.
- Mobile menu moves focus into the panel, traps focus, restores focus on close, and makes background content inert.

### Buttons and links

- **Primary on dark:** field sand with warm ink.
- **Primary on light:** tide teal or boundary oxblood with warm paper.
- **Secondary:** text link with directional arrow and underline or rule motion.
- **Pressed:** `transform: translateY(1px) scale(0.985)`.
- **Hover:** color shift plus a 1 to 2px directional movement. Do not use glow.
- **Focus:** visible two-layer ring with at least 3px total separation.
- Do not place two equally loud buttons in one viewport.

### Mission corridor

- A semantic sequence, not a decorative flight map.
- Represent intent as a line, state as nodes, uncertainty as confidence bands, constraints as bounded fields, and human gates as explicit decisions.
- No aircraft, drone, vehicle, targeting, crosshair, or weapon icon.
- Each state has a text label and adjacent prose summary.
- Desktop may use a sticky visualization with normal-flow chapters. Mobile renders the same content as a vertical sequence without pinning.

### Stack layers

- Use three full-width responsibility bands connected by one persistent line.
- Lead with the job, then the product name:
  - Know where and how sure: SkyAnchor.
  - Turn intent into bounded action: TENERE.
  - Know why it was allowed: Kiksuya.
- Each band contains one mechanism, one visible artifact, one condition, and one boundary.
- Avoid icon cards, equal thirds, feature bullets, and generic product screenshots.

### Proof rows

- Use the getdesign-style row grammar: question, artifact, conditions, boundary, source.
- Rows use hard 1px dividers with no outer card unless grouping is required.
- Every numeric result includes date and test context.
- Redaction must be intentional and labeled. Never fabricate telemetry for atmosphere.

### Field Note rows

- Columns: date, category, finding, conditions, reading time.
- The title leads with the finding rather than a blog-style topic.
- Hover reveals a small directional motion and stronger divider, not a card lift.

### Career rows

- Columns: discipline, role, hard problem, location, employment type, action.
- The role title and problem are primary. Team culture copy follows real practices.
- Maintain at least 44px pointer targets and clear keyboard focus.

### Forms

- Labels are always visible.
- Errors appear next to fields and in a summarized live region.
- Success and failure states use text, icon, and color.
- The main action reads `Send to engineering` or a similarly direct label.

## Imagery and asset policy

### Allowed

- topographic contours and generated terrain
- natural field surfaces, ground, rock, paper, and survey marks
- environmental photography without vehicles
- Hyderabad imagery used as identity, not proof
- real or approved redacted interface artifacts
- confidence traces, route geometry, policy clauses, logs, and test diagrams

### Prohibited

- vehicle and airframe photography
- aircraft or drone silhouettes and icons
- vehicle specifications, galleries, CAD renders, and 3D models
- crosshairs, targeting UI, camouflage, stencil type, olive-drab military tropes
- stock war imagery
- invented dashboards, timestamps, metrics, or logs presented as evidence
- black and neon command-center aesthetics

The current `mission-corridor.jpg`, `terrain.png`, and `terrain 2.png` contain aircraft silhouettes or baked flight annotations and cannot be reused unchanged. The current TENERE and Kiksuya screenshots contain visible platform imagery and vehicle language. They require approved replacement or redaction. The current SkyAnchor render has a malformed visible label and should not ship as credibility evidence.

## Depth and elevation

- Use color fields, grain, contour layers, and hard dividers to create depth.
- A fixed grain layer may sit below readable content at very low opacity.
- Use one consistent light direction for the few shadows that remain.
- Avoid glassmorphism, repeated rounded cards, deep black shadows, and gradient text.
- Use radii by role:
  - `0` to `4px` for data rows and instrument fields
  - `8px` to `12px` for controls and small panels
  - `16px` maximum for a large bounded media surface

## Motion system

Motion explains state. It does not decorate empty space.

### Signature moments

1. Hero terrain texture scans slowly through `AUTONOMY`.
2. The operation sequence reveals compound uncertainty and explicit system behavior.
3. The stack connects orientation, bounded action, and accountability into one loop.
4. The return path draws back into the audit record.

No other chapter needs a signature animation.

### Implementation

- Use CSS keyframes for the texture mask.
- Use existing Framer Motion for scroll-linked state and reveals.
- Use existing Anime.js only for orchestrated text or SVG timelines that benefit from sequencing.
- Do not add GSAP.
- Animate `transform`, `opacity`, `clip-path`, filter where measured, and SVG path attributes.
- Use exponential ease-out curves. No bounce or elastic motion.
- Suspend WebGL and animation when offscreen or when the document is hidden.
- Limit WebGL device pixel ratio and add mobile or low-power gating.

### Reduced motion

- Disable Lenis.
- Freeze mask position.
- Replace parallax and pinned scenes with normal flow.
- Remove blur and large translation entrances.
- Keep state changes immediate and fully readable.
- Use a global motion policy so navigation, forms, primitives, and section animation cannot drift.

## Responsive behavior

### Small screens below 48rem

- Hero statement appears before the texture word if the word would crowd the viewport.
- `AUTONOMY` may wrap only as `AUTO` and `NOMY` in an approved two-line lockup; otherwise scale down to remain one line.
- Mission corridor becomes a vertical sequence with no sticky pinning.
- Stack bands become ordered blocks with the connective line on the left.
- Proof, note, and role rows collapse to semantic label-value groups.
- Navigation becomes a full-height menu with proper focus management.
- Body text remains at least 16px and controls at least 44px.

### Medium screens from 48rem to 80rem

- Use a 6-column grid.
- Preserve asymmetry but avoid offscreen bleeds that hide evidence or boundaries.
- The mission view may be sticky only if all content remains in normal document order.

### Large screens above 80rem

- Use the full 12-column grid and restrained full-bleed layers.
- Cap readable text at 68 characters and prevent the content from spreading across empty width.
- Keep the hero's key message visible on a small laptop height before relying on scroll.

## Accessibility and performance contract

- Provide a skip link to `main#content`.
- Meet WCAG AA for body text, control labels, focus, and errors.
- Encode state with text, shape, and icon in addition to color.
- Treat the masked word as real text with solid fallback.
- Give every diagram a prose equivalent.
- Avoid scroll hijacking and do not hide information behind pointer interaction.
- Add `aria-current` to active navigation.
- Make the mobile dialog trap and restore focus correctly.
- Announce async form results through `aria-live` or alert semantics.
- Resolve reduced-motion gaps in navigation, forms, Operating Bounds, and decorative sweeps.
- Fix the existing `useReducedMotionSafe` lint failure before release.
- Keep initial visual content server-rendered. Client components are reserved for the operation sequence, progress, and necessary interaction.
- Audit total JS after the long page is assembled. One continuous WebGL scene is the maximum.

## Do and do not

### Do

- Make operational autonomy the first and last idea.
- Lead with plain jobs before product names.
- Use color as system state.
- Show uncertainty and boundaries.
- Show one visible artifact per claim.
- Use terrain and data as imagery.
- Let whitespace make each beat feel consequential.
- Keep Field Notes and Careers row-based and direct.

### Do not

- Reintroduce vehicles as products, proof, or scenery.
- Build a generic three-card stack section.
- Copy getdesign's pink, pixel type, or catalog UI.
- Copy HyperFrames' material textures or documentation styling.
- Repeat the texture mask.
- Use empty telemetry as decoration.
- Use a dark theme by reflex. Dark and light fields must follow the narrative state.
- Use gradient text, glass cards, glow, camouflage, crosshairs, or military stencil motifs.
- Claim universal performance or completion at any cost.

## Agent prompt guide

When implementing or extending this design, use this instruction:

> Build Karta as a field atlas crossed with an audited runtime. Operational autonomy is the only category. Use tide teal `#13737A` and field sand `#FBCA89` as primary fields, boundary oxblood `#88393C` only for constraint, and telemetry aqua `#81D1D0` only for returned or system-confirmed state and traces. Lead with plain-language responsibilities before SkyAnchor, TENERE, and Kiksuya. Use one terrain-masked `AUTONOMY` word, a vehicle-free mission corridor, full-width stack bands, and divided evidence rows. Preserve human authority, uncertainty, and boundaries in the story. Do not use vehicles, aircraft icons, card grids, generic defense CGI, neon command-center styling, gradient text, or invented telemetry.

Before shipping any new page, verify:

1. It advances the operational-autonomy story.
2. It follows the semantic color roles.
3. It preserves body contrast and a no-motion fallback.
4. It contains no vehicle-led content or imagery.
5. Every technical claim has an artifact, conditions, and boundary.
