# Operational autonomy redesign blueprint

**Branch:** `codex/operational-autonomy-redesign`

**Status:** strategy and design contract drafted, pending approval, implementation not started

**Scope:** long homepage, Field Notes, Careers, Talk to Engineering, vehicle removal, route migration, content validation, accessibility, performance, and launch QA

## 1. Executive decision

Karta will stop telling a two-part story about autonomy software and the vehicles that carry it. The redesigned site will own one category:

> **Operational autonomy**

The memory hook is:

> **Command that survives uncertainty.**

The homepage becomes one continuous challenge story. A human defines intent and bounds. Conditions degrade. The autonomy loop keeps position, planning, authority, and record connected. The story ends with an inspectable trace, not a promise that a mission completes at any cost.

The visible product architecture remains SkyAnchor, TENERE, and Kiksuya, but each name follows a plain-language responsibility:

1. Know where you are, and how sure you are.
2. Know what to do next, within approved intent.
3. Know why an action was allowed.

Vehicle names, catalogs, specs, galleries, models, imagery, and airframe-as-proof leave the public website.

## 2. Why this direction

The current website already has strong autonomy ingredients, but they compete with vehicle content and repeat across separate Landing, Stack, and Mission pages. The redesign fixes four problems:

1. **Category dilution:** visitors can leave remembering drones or platforms instead of operational autonomy.
2. **Narrative repetition:** homepage, Stack, and Mission restate the same ideas at different depths.
3. **Credibility risk:** absolute or context-free claims such as `mission completes anyway`, `one operator runs twelve`, and `every decision is logged` are stronger than the visible evidence.
4. **Visual drift:** the current navy and azure command-center aesthetic does not use the new brand palette and relies on vehicle or aircraft imagery in key proof moments.

The new story is easier to repeat, easier to inspect, and more defensible.

## 3. Source methods and references

### Made to Stick

The content strategy uses Chip Heath and Dan Heath's SUCCESs model: Simple, Unexpected, Concrete, Credible, Emotional, and Stories. The official model says simplicity is prioritization, unexpectedness opens curiosity, concreteness paints a mental picture, credibility can come from inspectable detail, emotion makes people care, and stories support simulation and action.

- [Official SUCCESs model](https://heathbrothers.com/wp-content/uploads/resources/mts-made-to-stick-model.pdf)
- [Made to Stick book overview](https://www.penguinrandomhouse.com/books/77687/made-to-stick-by-chip-heath-and-dan-heath/9781400064281/)

### HyperFrames texture-mask text

The hero adapts the underlying CSS-mask technique from [HyperFrames Texture Mask Text](https://hyperframes.heygen.com/catalog/components/texture-mask-text): a local grayscale texture, CSS mask variables, slow mask-position movement, and wrapper-level drop shadow.

The HyperFrames installer will not be run. It targets a different `compositions/` project structure. Karta will implement the technique directly with an owned texture, existing motion tools, reduced-motion handling, and a solid-text fallback.

### getdesign.md

The documentation follows the design-contract approach promoted by [getdesign.md](https://getdesign.md/): define atmosphere, semantic colors, typography, spacing, components, interactions, responsive behavior, accessibility, and the reasoning behind them so future pages stay in one visual language.

The site will use that method, not copy getdesign's identity, pixel typography, catalog density, or pink palette.

## 4. The SUCCESs strategy

| Principle | Editorial move | Website expression | Failure to avoid |
| --- | --- | --- | --- |
| Simple | Own one category and one promise. | `Operational autonomy` plus `Command that survives uncertainty.` | Listing three products and several platforms before defining the category. |
| Unexpected | Reframe autonomy as preserved command, not removed command. | `Autonomy is not the absence of command.` | Familiar defense-tech language about smarter vehicles. |
| Concrete | Tell one operation through visible system states. | Intent, route state, confidence, bounds, human gate, and audit trace. | Abstract claims, decorative telemetry, and generic network diagrams. |
| Credible | Let visitors inspect mechanism, evidence, conditions, and boundary. | Proof rows, redacted artifacts, Field Notes, and explicit limits. | Unqualified metrics, invented dashboards, and location used as proof. |
| Emotional | Center the operator's need for clarity and accountability. | Human authority remains visible at every material decision. | Fear, spectacle, combat imagery, or Karta as the hero. |
| Stories | Make the page one challenge plot from intent to record. | Compound uncertainty changes the system state across one long page. | Independent sections that reset the story at every fold. |

## 5. Message architecture

### Category

**Operational autonomy**

### Memory hook

**Command that survives uncertainty.**

This is a design intent and brand promise. It must not be presented as an unconditional guarantee.

### Plain definition

> Karta builds the autonomy layer that helps systems stay oriented, act within human-approved intent, and return a reviewable record as operating conditions degrade.

### Unexpected reframe

> Autonomy is not the absence of command. It is command that persists as conditions change.

### Stack mnemonic

> Know where you are. Know what to do next. Know why it was allowed.

### One-scroll retell test

> Karta builds operational autonomy that preserves human command when signals and conditions become uncertain.

### CTA hierarchy

1. `Talk to engineering`, the single solid action
2. `See autonomy in operation`, a secondary text link
3. `Read Field Notes`
4. `Build it with us`

Avoid `Learn more`, `Explore`, and `Engage` as visible action labels.

## 6. Information architecture

### Target route map

```text
/
├── #autonomy
├── #operation
├── #stack
├── #proof
├── #mission
└── #contact

/field-notes
└── /field-notes/[slug]

/careers
└── /careers/[slug]

/engage
└── /api/engage
```

### Navigation

- Karta logo: `/`
- Autonomy: `/#autonomy`
- Stack: `/#stack`
- Mission: `/#mission`
- Field Notes: `/field-notes`
- Careers: `/careers`
- Primary action: `/engage`, labeled `Talk to engineering`

### Route migration

| Current route | Target | Behavior | Reason |
| --- | --- | --- | --- |
| `/stack` | `/#stack` | Temporary during QA, permanent at launch | Stack becomes a chapter in the long homepage. |
| `/mission` | `/#mission` | Temporary during QA, permanent at launch | Mission becomes the closing doctrine chapter. |
| `/vehicles` | `/#autonomy` | Temporary during QA, permanent at launch | Vehicle catalog leaves the public story. |
| `/vehicles/[slug]` | `/#autonomy` | Temporary during QA, permanent at launch | Preserve bookmarks without retaining vehicle pages. |
| `/field-notes` | unchanged | Keep | Public evidence layer. |
| `/field-notes/[slug]` | unchanged | Keep | Technical depth and sourceable proof. |
| `/careers` | unchanged | Keep | Talent destination. |
| `/careers/[slug]` | unchanged | Keep | Role details and applications. |
| `/engage` | unchanged | Keep, rename visible language | Technical conversation endpoint. |

Remove migrated routes from the sitemap and all internal navigation. Keep redirects long enough for indexed URLs and external bookmarks.

Implement the known mappings through `redirects()` in `next.config.ts`. Use `permanent: false` during QA, then switch to `permanent: true` only after the target anchors ship and production tests pass. Next.js documents those settings as method-preserving `307` and `308` responses. Source: [Next.js redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects). Use the dynamic source pattern `/vehicles/:slug`. Verify that each `Location` retains `#stack`, `#mission`, or `#autonomy` on the production host. If the host strips fragments, redirect to `/` and use a temporary query-to-anchor bridge for the Stack and Mission migrations.

## 7. Long homepage story

The page is one operation, told in chapters. Every chapter advances the state and uses one dominant message.

### Chapter 0: navigation and orientation

**Purpose:** Establish the category before any product name appears.

**Chrome:**

- Quiet sticky header with a thin divider.
- No floating glass pill.
- Homepage anchors show the active chapter.
- Field Notes and Careers remain routes.
- One solid `Talk to engineering` action.

**Behavior:**

- The header starts transparent over the hero and resolves to a solid tide-teal or warm-paper surface based on the current chapter.
- Anchor changes update focus only when directly activated, never during normal scroll.
- Mobile navigation is a true focus-managed dialog.

### Chapter 1: autonomy

**Anchor:** `#autonomy`

**Purpose:** Make the category and memory hook unavoidable within five seconds.

**Draft copy:**

- Category: `Operational autonomy`
- Texture word: `AUTONOMY`
- Statement: `Command that survives uncertainty.`
- Deck: `Karta builds the autonomy layer that helps systems stay oriented, act within human-approved intent, and return a reviewable record as conditions degrade.`
- Primary solid action: `Talk to engineering`
- Secondary text link: `See autonomy in operation`

**Visual:**

- Deep tide-teal field with derived deep-current depth.
- One enormous `AUTONOMY` word using a Karta-owned terrain texture mask.
- Low-contrast procedural topography behind or beneath the text, using the existing HeroTerrain system only if the composition stays readable.
- A uniform deep-current copy-safe zone behind the deck and actions, or a composition that keeps animated terrain outside that column.
- No aircraft, vehicle, drone, map target, or combat imagery.

**Motion:**

- One orchestrated entrance.
- Slow mask-position scan while the hero is visible.
- Optional terrain-confidence shift tied to the first scroll.
- Static solid text and static terrain for reduced motion, low power, or no WebGL.

**Acceptance:**

- Key statement and action fit within a 768px-tall laptop viewport.
- Body text meets AA contrast.
- The texture word remains readable when CSS masking is unsupported.

### Chapter 2: conditions change

**Anchor:** `#operation`

**Purpose:** Open the curiosity gap and introduce the antagonist: compound uncertainty.

**Draft copy:**

- Heading: `Conditions do not fail one at a time.`
- Body: `Positioning degrades. Links become intermittent. Operator attention narrows. An autonomy stack cannot depend on the conditions most likely to disappear.`
- Turn: `The point is not to pretend nothing changed. It is to change behavior without losing intent.`

**Operational sequence:**

1. Human intent, geometry, and bounds are approved.
2. Position confidence begins to fall.
3. The communications link becomes intermittent.
4. A proposed change approaches or crosses a boundary.
5. The story tests a design requirement: behavior must remain within approved local authority, and action beyond that authority must surface a human gate. Public capability copy requires an approved mechanism, failure behavior, evidence, conditions, and boundary.
6. The story asks how state and record reconcile after interruption. Describe reconciliation as a capability only after its conflict behavior, timing, evidence, and limits are approved.

**Visual:**

- One continuous route or decision line, not a flight path.
- State nodes show `intent`, `confidence`, `link`, `boundary`, `authority`, and `record`.
- Constraint zones use oxblood patterns and labels.
- Returned or system-confirmed state uses aqua plus text and shape. Aqua never implies independent validation.
- No baked metrics or timestamps until supplied by engineering.

**Motion:**

- Desktop may pin the visualization while normal-flow copy changes the state.
- Mobile uses a vertical sequence with no pinning.
- Reduced motion presents all six states as a static ordered diagram and prose.

**Credibility rule:**

Do not end with `the mission completes anyway`. Show what the system knows, what it may do, what it cannot do, and what requires human authority.

### Chapter 3: definition

**Purpose:** Answer the curiosity gap with the simplest useful model.

**Draft copy:**

- Heading: `Three responsibilities close the loop.`
- Lead: `Operational autonomy must preserve orientation, intent, and accountability together.`
- Mnemonic:
  - `Know where you are, and how sure you are.`
  - `Know what to do next, within approved intent.`
  - `Know why an action was allowed.`

**Visual:**

- Full field-sand chapter with warm-ink text.
- Three statements arranged as a connected sequence, not equal cards.
- Product names enter after each statement in smaller type.

### Chapter 4: the stack

**Anchor:** `#stack`

**Purpose:** Explain the architecture as one operational loop rather than three independent products.

#### 4A. Orientation, SkyAnchor

**Draft heading:** `Know where you are, and how sure you are.`

**Provisional technical line:** `SkyAnchor publishes a position estimate with explicit confidence, designed for operation without continuous GNSS contact.`

**Visible artifact required:**

- representative position and confidence trace
- named ground-truth method
- behavior as confidence degrades
- tested conditions and failure boundary

**Do not publish until supported:** no-GPS absolutes, sub-50ms latency, universal environment language, or malformed product renders.

#### 4B. Bounded action, TENERE

**Draft heading:** `Turn human intent into bounded action.`

**Provisional technical line:** `TENERE composes an editable mission plan from goals, geometry, and constraints, then surfaces decisions that require human authority.`

**Visible artifact required:**

- input intent and constraints
- resulting mission graph
- conflict or violation case
- reversibility and human gate
- test conditions

**Do not publish until supported:** one-operator-to-twelve shorthand, generic `AI planning`, automatic completion, or universal integration claims.

#### 4C. Accountability, Kiksuya

**Draft heading:** `Know why an action was allowed.`

**Provisional technical line:** `Kiksuya connects policy, authority, and the operational record so actions can be reviewed in context.`

**Visible artifact required:**

- approved redacted policy version
- clause attribution
- representative action and timestamp method
- record scope and retention
- replay or export artifact

**Do not publish until supported:** `every decision`, `frame-level`, or universal audit claims.

**Stack layout:**

- Three full-width responsibility bands.
- One persistent line carries intent down and state or record back.
- Each band shows one mechanism, one artifact, one operating condition, and one boundary.
- No icon grid, feature cards, or aircraft screenshots.

### Chapter 5: the loop closes

**Purpose:** Turn three responsibilities into one architecture.

**Draft copy:**

- Heading: `Intent goes down. Situation and record come back.`
- Closing line: `The loop is not closed until the record returns.`

**Visual:**

- Reuse and simplify the strongest existing GrandScheme or StackArchitecture SVG logic.
- Down path: intent, bounds, plan.
- Up path: position and confidence, state, decisions, audit.
- Human gates sit visibly on the loop.
- Aqua marks returned or system-confirmed state. Oxblood marks boundary and intervention. Evidence status remains explicit text.

### Chapter 6: proof

**Anchor:** `#proof`

**Purpose:** Replace vehicle-as-proof with inspectable evidence.

**Draft copy:**

- Heading: `Do not take the claim on faith. Inspect the trace.`
- Lead: `A capability claim is useful only when its mechanism, conditions, and boundary are visible.`

**Proof row grammar:**

| Column | Content |
| --- | --- |
| Question | The operational question being tested. |
| Mechanism | What part of the stack produces the result. |
| Artifact | Trace, graph, log, policy clause, or approved screenshot. |
| Conditions | Environment, version, date, duration, workload, and test method. |
| Boundary | What the evidence does not establish. |
| Source | Field Note, report, evaluator, or approved programme reference. |

**Initial proof groups:**

1. Position and confidence under a named degraded-GNSS condition.
2. Constraint handling and human authority in a named mission-planning case.
3. Policy attribution and record replay for a named action class.

If real public evidence is not ready, ship a smaller proof section with honest architecture and boundaries. Do not substitute invented numbers.

### Chapter 7: mission and bounds

**Anchor:** `#mission`

**Purpose:** State why Karta builds autonomy and what must remain bounded.

**Draft copy:**

- Heading: `Capability without bounds is not operational autonomy.`
- Body: `Human intent defines authority. Uncertainty must be shown, not hidden. Material actions must return a record that can be examined.`

**Principles:**

1. Human intent defines the operating envelope.
2. The system exposes uncertainty and prohibited action.
3. Decisions requiring human authority are surfaced.
4. Named actions return a reviewable record at a validated scope.

**Identity checksum:**

- Statement: `The one who acts must be accountable.`
- Use the Karta etymology once.
- Confirm the exact Sanskrit spelling, grammatical form, pronunciation, and approved translation before publishing.

**Visual:**

- Start with a bounded oxblood field, then resolve to sand as the principles become explicit.
- Use boundary geometry and policy fragments, not military symbology.

### Chapter 8: built close to the work

**Purpose:** Humanize the company without using place as unsupported proof.

**Draft copy:**

- Heading: `Built close to the work.`
- Body: approved facts about the Hyderabad team, facilities, test practice, and deployment responsibilities.

**Visual:**

- Existing Hyderabad imagery may be reused if art-directed into the new palette.
- Prefer real team, test, and environment photography without vehicles when available.

**Boundary:**

Hyderabad is identity and context. It becomes evidence only when paired with an approved fact.

### Chapter 9: evidence and people

**Purpose:** Hand off to the two separate destinations without turning the homepage into a link farm.

**Field Notes preview:**

- Two or three latest evidence-led notes.
- Row fields: date, category, finding, conditions, reading time.
- Action: `Read Field Notes`.

**Careers preview:**

- Statement: `Build command that survives uncertainty.`
- One concise description of the hard problems.
- Show open-role count only if sourced from current data.
- Action: `Build it with us`.

### Chapter 10: technical conversation

**Anchor:** `#contact`

**Purpose:** Convert the reader after the category, mechanism, evidence, and boundary have been established.

**Draft copy:**

- Heading: `Put operational autonomy under real conditions.`
- Body: `Start with the conditions, interfaces, authority model, and evidence you need to inspect. Your first response comes from the engineering team.`
- Primary action: `Talk to engineering`.
- Secondary action: `Read Field Notes`.
- Quiet tertiary link: `Build it with us`.

## 8. Field Notes page

### Role

Field Notes is the public evidence layer. It is not a generic company blog.

### Landing structure

1. Short header with the purpose of the collection.
2. Optional category filters only when enough notes exist.
3. Divided rows, no floating cards.
4. Each row leads with the finding.

### Row content

- publication date
- category
- concrete finding
- test or operating conditions
- author and role
- reading time

### Article template

1. **Finding:** one sentence.
2. **Question:** what was being investigated.
3. **Conditions:** environment, versions, inputs, duration, and method.
4. **Observation:** what occurred.
5. **Mechanism:** why the stack behaved that way.
6. **Boundary:** what the finding does not prove.
7. **Implication:** what changes in design, doctrine, or operations.
8. **Artifacts and sources:** approved traces, diagrams, logs, or references.

### Editorial requirements

- Replace vehicle-specific examples where they are not necessary to the technical point.
- Keep generic `system` or `platform` language when the platform dependency matters.
- Do not turn mock data into evidence.
- Every number names the source and conditions.

## 9. Careers page

### Hero

- Heading: `Build command that survives uncertainty.`
- Body: the work spans degraded sensing, confidence, constraint solving, mission interfaces, policy systems, testing, and deployment.

### Story

1. The hard problems.
2. How the team works.
3. What ownership means in practice.
4. Open roles.
5. Application path.

### Role rows

- discipline
- role title
- concrete hard problem
- location
- employment type and seniority
- action

### Content migration

- Remove Kari, Cerana, Dorsata, Apis, and new-airframe ownership language.
- Reframe sensor and edge work around platform-neutral integration and validated operating envelopes.
- Support culture claims with concrete practices such as test ownership, code review, deployment participation, and after-action learning.

## 10. Talk to Engineering page

Keep `/engage` as the endpoint, but change all visible language to `Talk to engineering`.

### Recommended intent choices

- technical evaluation
- integration
- programme or procurement
- research or partnership
- media
- careers, routed to Careers where appropriate

### Form behavior

- Visible labels and explicit required fields.
- Inline error text and an error summary.
- `aria-live` or alert semantics for async success and failure.
- Direct submit label such as `Send to engineering`.
- Clear privacy and response expectations.

## 11. Design system summary

The complete visual contract lives in [`DESIGN.md`](../DESIGN.md). Key decisions:

- Thesis: field atlas crossed with an audited runtime.
- Primary fields: tide teal `#13737A` and field sand `#FBCA89`.
- Boundary: oxblood `#88393C`.
- Returned or system-confirmed state: aqua `#81D1D0`. This is a runtime-state color, not an evidence credential.
- Accessible derived text: warm paper `#FFF3DE` and warm ink `#152E2F`.
- Type: Anek Latin and Anek Devanagari, with Azeret Mono only for real instrument data.
- Signature: one terrain-masked `AUTONOMY` word.
- Layout: asymmetric long-form chapters, full-width stack bands, divided proof rows.
- Imagery: terrain, contours, field surfaces, approved UI artifacts, no vehicles.
- Motion: four meaningful moments, full reduced-motion fallbacks.

## 12. Asset plan

### Reuse after palette and accessibility review

- procedural HeroTerrain and its static fallback
- SVG loop and path-drawing logic from GrandScheme or StackArchitecture
- Hyderabad image as identity context
- logo assets
- grain and grid techniques at lower intensity

### Replace

- `public/imagery/mission-corridor.jpg`, because aircraft silhouettes and flight labels are baked into the asset
- root `terrain.png` and `terrain 2.png`, because they contain aircraft symbols and are not production-routed assets
- current TENERE screenshot, because it is aircraft and airfield led
- current Kiksuya screenshot, because it contains platform counts and tracks
- current SkyAnchor render, because the visible product label appears malformed

### New assets required

1. Karta-owned grayscale terrain texture for the hero mask, under `350 KB`.
2. Vehicle-free operational corridor or decision-state visual.
3. Approved orientation and confidence trace.
4. Approved mission constraint and human-gate artifact.
5. Approved policy or audit artifact.
6. Optional vehicle-free team, field, or environment photography.
7. Updated Open Graph artwork using the new palette.

### Asset safety

- Confirm license and provenance for every texture and photograph.
- Remove embedded classifications, coordinates, names, and programme data unless approved.
- Label mockups as illustrative. Label real artifacts with scope and redaction.
- Provide meaningful alt text or mark decorative imagery as decorative.

## 13. Repository migration map

### Retire or remove during implementation

- `app/stack/page.tsx`, after `#stack` ships and its redirect passes QA
- `app/mission/page.tsx`, after `#mission` ships and its redirect passes QA
- `app/vehicles/page.tsx`
- `app/vehicles/[slug]/page.tsx`
- `components/sections/Vehicles.tsx`
- `components/3d/VehicleModelScene.tsx`
- `components/3d/VehicleModelScene.inner.tsx`
- `lib/3d-assets.ts`
- vehicle types, objects, and helpers in `lib/catalog.ts`
- `public/imagery/kari.jpeg`
- `public/imagery/cerana.jpeg`
- `public/imagery/dorsata.jpg`

### Reframe

- `app/page.tsx`
- `components/sections/Hero.tsx`
- `components/sections/DeniedEnvironment.tsx`
- `components/sections/MissionMap.tsx`
- `components/sections/Manifesto.tsx`
- `components/sections/GrandScheme.tsx`
- `components/sections/OperatingBounds.tsx`
- `components/sections/Hyderabad.tsx`
- `components/chrome/Nav.tsx`
- `components/chrome/Footer.tsx`
- `app/not-found.tsx`
- `app/field-notes/page.tsx`
- `app/field-notes/[slug]/page.tsx`
- `app/careers/page.tsx`
- `app/careers/[slug]/page.tsx`
- `app/engage/page.tsx`
- `components/forms/EngageForm.tsx`
- `lib/content/roles.ts`
- `lib/content/notes.ts`
- `components/sections/stack/StackArchitecture.tsx`
- `components/sections/stack/StackLayerSection.tsx`
- `components/sections/stack/stack-data.ts`

### Consolidate

Stack copy currently drifts across `lib/catalog.ts`, `components/sections/stack/stack-data.ts`, and `components/sections/GrandScheme.tsx`. Create one platform-neutral source of truth, for example `lib/content/autonomy-stack.ts`, then render both homepage and proof components from that model.

### Global and SEO updates

- `app/globals.css`: replace legacy navy, azure, cyan, amber, and light-theme naming with semantic new tokens.
- `lib/useThemeColors.ts`: align shader colors with the new semantic palette.
- `app/manifest.ts`: update theme and background colors.
- `app/opengraph-image.tsx`: update message and palette.
- `app/layout.tsx`: update metadata and unify the site URL source with sitemap and robots.
- `app/sitemap.ts`: remove vehicle, Stack, and Mission destination routes; retain Field Notes and Careers detail routes.
- `app/robots.ts`: verify site URL consistency.
- `app/not-found.tsx`: remove Vehicles and the existing dead `/products` link.
- `README.md` and `ASSETS.md`: rewrite the architecture and asset policy.

### Primitive cleanup

- Rename legacy components and tokens such as `AmberSweep` and `text-amber` when their semantic role changes.
- Keep `PageHeader`, `NestedCTA`, `Reveal`, `useAnimeBoot`, `useSectionProgress`, and `ScrubCounter` where they still match the design.
- Use `DoppelrandCard` and `SpecTable` only where true grouping or comparison requires them.

## 14. Technical architecture

### Existing stack to preserve

- Next.js 16 App Router
- React 19 and strict TypeScript
- Tailwind CSS 4
- Framer Motion 12
- Anime.js 4
- Lenis, with stricter motion gating
- React Three Fiber for at most one optional terrain scene
- Phosphor icons
- Zod form validation and the existing API route

### No new dependency required

- Implement texture masking in CSS.
- Use Framer Motion for scroll-linked state.
- Use Anime.js only for sequenced text or SVG timelines.
- Do not add GSAP.

### Server and client boundaries

- Render copy, navigation data, stack content, proof rows, Field Note rows, and Career rows on the server.
- Restrict client components to the mission-state sequence, chapter progress, mobile navigation, forms, and optional WebGL.
- Avoid separate observers and RAF loops in every section.

### WebGL budget

The existing hero terrain uses a continuously animated `240 x 240` mesh and per-frame camera work. Preserve only if it materially supports the story.

- Dynamic import remains mandatory.
- Suspend offscreen and when the document is hidden.
- Add mobile, low-power, and data-saver gating.
- Cap DPR.
- Keep one active WebGL scene maximum.
- Use a visually complete static fallback.

## 15. Accessibility plan

### Existing gaps to fix

- Add a skip link to the existing `main#content`.
- Add `aria-current` and active chapter semantics.
- Make the mobile menu move, trap, and restore focus; mark background content inert.
- Add live-region or alert semantics to async form states.
- Close reduced-motion gaps in navigation, forms, Operating Bounds, and decorative sweeps.
- Decide whether the terrain canvas is decorative or a labeled image, then expose it consistently.
- Fix the current `useReducedMotionSafe` lint failure.

### New component requirements

- Masked text has a solid fallback and remains accessible text.
- All diagrams have adjacent prose equivalents.
- State uses text, shape, and icon in addition to color.
- Sticky visualization never changes reading order.
- No information depends on hover, pointer location, or animation.
- Touch targets are at least 44px.
- Forced-colors and keyboard-only use remain complete.

## 16. Performance plan

- Keep initial hero copy server-rendered.
- Load the terrain scene after the useful page shell.
- Compress the texture mask and all imagery.
- Pause mask movement, WebGL, and section animation offscreen.
- Remove persistent `will-change` after entrances.
- Limit backdrop blur on sticky chrome.
- Reassess Lenis against the long-page CPU cost and disable it on constrained devices.
- Remove vehicle 3D code and unused public assets from the production graph.
- Run a bundle comparison before and after the redesign.

## 17. Implementation phases

### Phase 0: claim and asset gate

- Approve the core sentence and memory hook.
- Validate the public role of SkyAnchor, TENERE, and Kiksuya.
- Approve or reject each current metric.
- Gather the minimum real artifacts for orientation, bounded planning, and record.
- Confirm Karta's Sanskrit spelling and translation.
- Approve a vehicle-free asset list.

**Exit:** the claim matrix has signed approval from the required engineering, legal, and programme owners. No homepage claim lacks an owner, approved wording, evidence requirement, and boundary.

Phase 3 cannot begin until this exit condition is met. Phase 1 and Phase 2 may build neutral tokens, primitives, data structure, and navigation, but they must not turn provisional capability language into public copy.

### Phase 1: foundation

- Implement semantic color tokens and derived accessible neutrals.
- Load the new font system and verify language rendering.
- Update global surfaces, focus, typography, spacing, and motion policy.
- Fix baseline lint and accessibility primitives.
- Build the texture-mask primitive with fallback and performance gating.

**Exit:** a component preview demonstrates color, type, buttons, rows, focus, mask fallback, and reduced motion.

### Phase 2: content model and chrome

- Create one autonomy-stack data model.
- Update navigation, footer, metadata, and CTA labels.
- Add active chapter and route states.
- Implement the route redirect policy.

**Exit:** global navigation represents only the target IA and works keyboard-first.

### Phase 3: long homepage

- Build Autonomy hero.
- Build the vehicle-free operation sequence.
- Build the definition and three stack bands.
- Build the closed loop.
- Build proof rows and Field Notes links.
- Build Mission, identity, previews, and closing action.

**Exit:** the page tells one complete story in normal flow with no placeholder evidence presented as fact.

### Phase 4: separate pages

- Redesign Field Notes list and article grammar.
- Redesign Careers and role detail pages.
- Update Talk to Engineering form and response states.

**Exit:** all retained routes use the same design contract and message hierarchy.

### Phase 5: vehicle removal and content cleanup

- Remove vehicle routes, components, data types, models, imagery, and docs.
- Replace baked aircraft visuals.
- Rewrite generic vehicle-first copy where it does not carry technical meaning.
- Update `app/sitemap.ts`, navigation, footer, 404, metadata, and every other `VEHICLES` catalogue consumer in the same change that removes the catalogue so the build never contains a dangling import.
- Run a repository-wide scan for vehicle names and route references.

**Exit:** no public route, asset, metadata entry, sitemap item, navigation item, or internal link presents vehicles.

### Phase 6: SEO, accessibility, and performance

- Update manifest, Open Graph, robots, remaining structured metadata, and site URL handling. Sitemap vehicle cleanup is already atomic with Phase 5.
- Complete keyboard, reduced-motion, forced-colors, screen-reader, and form-state work.
- Profile JavaScript, animation, WebGL, images, and Core Web Vitals.

**Exit:** all automated checks pass and the no-motion path is fully usable.

### Phase 7: visual and editorial QA

- Review at mobile, tablet, small laptop, desktop, and wide desktop sizes.
- Review under bright and dim display conditions.
- Run five-second and one-scroll retell tests.
- Re-confirm every previously approved claim with engineering and the appropriate approval owner after it is placed in the final composition.
- Verify real artifacts, redactions, alt text, and source labels.

**Exit:** every acceptance criterion in this document passes.

## 18. Verification matrix

### Automated

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- link and redirect crawl
- repository-wide vehicle and stale-route scan
- accessibility checks for headings, landmarks, labels, contrast, focus, and live regions
- production bundle comparison

### Manual

- keyboard-only navigation
- mobile menu focus trap and restoration
- screen-reader reading order
- reduced motion
- forced colors
- no WebGL
- WebGL failure
- low-power mobile
- slow network and disabled JavaScript shell
- form validation, server error, and success
- anchor navigation and back button behavior
- long-page reading on a 1366 x 768 display

### Editorial

- category visible in five seconds
- plain definition repeatable after one scroll
- one beat per chapter
- operator remains protagonist
- every term gets a plain anchor first
- every number has source and conditions
- every claim shows a boundary
- no mission-completion-at-any-cost implication
- no vehicle-led content or imagery

## 19. Baseline findings before implementation

- `npm run typecheck` passes.
- `npm run lint` currently fails in `components/motion/useReducedMotionSafe.ts` because state is set synchronously inside an effect.
- Lint also warns that `ENVELOPES` is unused in `components/sections/Hyderabad.tsx`.
- The 404 contains a dead `/products` link.
- The mobile nav dialog lacks complete focus management.
- Async form status is not announced.
- Reduced-motion coverage is incomplete.
- The global site URL is inconsistent between layout metadata and sitemap or robots.
- Current mission and product imagery contains baked aircraft or platform content.

These are existing baseline issues, not regressions introduced by the strategy work.

## 20. Definition of done

The redesign is done when:

1. The homepage owns operational autonomy as one category.
2. `Command that survives uncertainty` is visible and supported by the full story.
3. Landing, Stack, and Mission read as one continuous page.
4. Field Notes and Careers remain focused separate routes.
5. Vehicle routes, names, specs, models, imagery, and airframe-as-proof are absent from the public site.
6. The texture-masked `AUTONOMY` treatment is singular, owned, accessible, and performant.
7. The four brand colors have consistent semantic roles and accessible text pairings.
8. SkyAnchor, TENERE, and Kiksuya appear as responsibilities inside one loop.
9. Every public claim shows mechanism, artifact, conditions, and boundary.
10. The full experience works with keyboard, reduced motion, forced colors, no WebGL, and small screens.
11. Typecheck, lint, build, link, redirect, and accessibility checks pass.
12. A cold visitor can accurately retell what Karta does after one scroll.

## 21. Recommended approval checkpoint

Approve these items before UI implementation begins:

1. Core category: `Operational autonomy`.
2. Memory hook: `Command that survives uncertainty.`
3. Homepage route consolidation and redirect policy.
4. Strict no-vehicle visual and product scope.
5. Field atlas plus audited runtime design thesis.
6. Palette roles and Anek-led typography.
7. Proof-first claim contract.
8. Karta-owned terrain texture for the single masked word.

If those eight decisions hold, implementation can proceed without reopening the central strategy in every section.
