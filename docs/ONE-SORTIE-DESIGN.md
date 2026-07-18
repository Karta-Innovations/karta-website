# One Sortie — the operational-autonomy one-page redesign

**Date:** 2026-07-18
**Branch:** `redesign/v3-operational-autonomy`
**Status:** Approved direction from founder; this doc is the build contract.
**Method:** *Made to Stick* (Chip & Dan Heath) — the SUCCESs checklist applied literally to every fold.
**References:** HyperFrames `texture-mask-text` (terrain-filled display type), getdesign.md (this doc + root `DESIGN.md` are the machine-readable spec an AI builder or a human can execute from).

## 0. Relationship to the prior blueprint

`docs/OPERATIONAL_AUTONOMY_REDESIGN_PLAN.md` (the strategy blueprint written on the `codex/operational-autonomy-redesign` branch) covers the same initiative. This spec **supersedes it as the build contract** while adopting its strongest material:

**Adopted from the blueprint:**
- Memory hook: **"Command that survives uncertainty."** — used as the categorical line beneath the hero display type, and as the Careers headline.
- CTA language contract: visible primary action is always **"Talk to engineering"** (never "Engage", "Learn more", or "Explore"). `/engage` stays as the URL only.
- Claim honesty rules: no invented performance metrics presented as fact; every number is either a real sourced figure or clearly framed as part of a **representative scenario**; no "mission completes anyway" implication — the story ends with a reviewable record, not an unconditional guarantee.
- Route map and redirect policy (identical conclusions), sitemap/manifest/OG cleanup list, and the baseline-defect list (§10 below folds it in: `useReducedMotionSafe` lint failure, unused `ENVELOPES` in Hyderabad, dead `/products` link in 404, skip link, form live-region).

**Synthesis update (2026-07-18, mid-build):** the full contract docs (`DESIGN.md`, `PRODUCT.md`, blueprint refinements) landed in the working tree during implementation. Decisions taken to merge them with this spec:

- **Adopted:** the color-state architecture — teal and sand are true *primary fields*, not accents on black. Act surfaces: launch = teal-black night → brief = tide-teal field → denial = deep current plunging to black (oxblood faults) → the stack mnemonic band = **light field-sand with warm-ink text** (dawn: the answer arrives) → stack layers = deep-current/teal bands (aqua artifacts) → doctrine = bounded oxblood field resolving toward sand → Hyderabad = teal, warm → landing = night ink. Derived neutrals adopted: warm paper `#FFF3DE`, warm ink `#152E2F`, deep current `#082E31`, pale tide `#E1F0ED`, field muted `#D8C8AF`. Oxblood semantics widened: denial *and* doctrine-boundary.
- **Adopted:** Anek Latin (display/body) plus nine matching Anek Indian-script cuts for the hero identity, with Azeret Mono for instrument data, via `next/font/google`.
- **Adopted:** PRODUCT.md's approved message hierarchy verbatim — hero texture word `AUTONOMY`, hook *"Command that survives uncertainty."*, deck = the plain definition, banned-phrase list (so no "every decision logged" absolutes in copy). CTA: one solid `Talk to engineering`; `See autonomy in operation` is a secondary text link to the operation act.
- **Adopted:** redirects via `next.config.ts` `redirects()` with `permanent: false` during QA.
- **Still diverging (this spec wins):** the two founder-supplied mission plates stay as a single planned-versus-field comparison. The contract's blanket aircraft-imagery ban is relaxed to "no vehicle *marketing*"; the plates are the story's concrete spine and the founder's demonstrated taste. The current page structure is `#launch/#brief/#stack/#mission/#hyderabad/#landing`; `#denial` remains an inner compatibility anchor and `/vehicles*` redirects to `/`.

**Where this spec deliberately diverges:**
- **The terrain plates stay.** The blueprint rejects `terrain.png` / `mission-corridor.jpg` because aircraft symbols are baked in. Decision: removing *vehicle product marketing* is not the same as banning aircraft from mission illustration. The plates are founder-supplied cinematic art (the established taste on this project), and the whole page is framed as one representative sortie — an aircraft in the mission map is the story, not a product pitch. The framing label `REPRESENTATIVE SORTIE · ILLUSTRATIVE` (mono, on both plates) enforces the honesty rule instead.
- **Typography decision superseded:** the implemented system uses Anek Latin, matching Anek Indian-script cuts, and Azeret Mono.
- **The story is a sortie, not an abstract decision-line.** The blueprint's chapter arc (intent → degradation → gate → record) is preserved, but told through the two owned plates and a mission clock rather than a new abstract state diagram we would have to invent assets for.

---

## 1. The core (Simple)

*Made to Stick* rule one: find the core, then strip everything that is not the core.

> **Karta builds operational autonomy: unmanned aircraft that keep flying when GPS, comms and daylight are taken away — with every decision held by a human, and every decision logged.**

That is the only idea on the website. Everything else — three stack layers, doctrine, Hyderabad, careers — exists to make that one sentence retellable by a cold visitor after one scroll.

**Commander's intent for every fold:** if a section does not make "keeps operating when everything is taken away, accountably" more believable or more vivid, it does not ship.

**What gets stripped (the hard part of Simple):**

- **Vehicles are removed from the website.** No `/vehicles` routes, no vehicle grid on the homepage, no vehicle cards, no 3D model scaffolding in the page flow. Airframes are carriers of the idea, not the idea. (Careers copy may still mention airframes as work context — that is fine; they are no longer a marketing surface.)
- `/stack` and `/mission` stop being destination pages. Their content folds into the one page; the old URLs 301-redirect to `/#stack` and `/#mission` so nothing breaks.
- One page tells the whole story. Field Notes and Careers remain separate pages (they are libraries, not story beats).

## 2. Who it must work for

Unchanged from `PRODUCT.md`, in priority order: defense evaluators (need credibility + auditability), engineers deciding whether to join (need hard problems + honesty), cold public/press (need the core in one viewport, zero jargon). Plain-English anchor before every technical term, always.

## 3. The method — SUCCESs, applied

| Principle | How this site does it |
|---|---|
| **Simple** | One core idea, stated in the hero, proven through the scroll, restated at landing. Vehicles cut. One page. |
| **Unexpected** | The site leads with **failure**, not capability. Fold 2 shows a perfect mission plan; fold 3 lets the night take it apart (GPS gone, comms jammed, cameras blind). The curiosity gap: *"The aircraft is still on corridor. Position error: 4 m. How?"* — the reader must scroll to close the gap. |
| **Concrete** | No abstractions. A mission clock (T-00:00 → T+01:42:00) runs the page. Named failures with timestamps. Metres of drift. Spec tables. Coordinates (17.454 N · 78.500 E). Banned words: "solutions", "cutting-edge", "next-generation", "revolutionize". |
| **Credible** | Anti-hype engineering voice. Testable details: doctrine clause IDs, an audit-log excerpt a procurement officer could ask to see, per-layer spec tables, integration lists. Ground truth: Hyderabad, a real facility, real roles with real contacts. Field Notes = engineers showing their reasoning in public. |
| **Emotional** | Accountability as identity: **कर्ता — "the one who acts, and answers for it."** The operator's stakes, not the machine's: *"Your team is on the ridge. The machine must not guess."* Careers appeal to self-identity: problems hard enough to matter. |
| **Stories** | The entire page **is** one story — a single night sortie from launch to landing. The scroll is the flight. The reader runs the simulation mentally (springboard story): plan → denial → the stack answers → rules held → wheels down, log closed. |

## 4. Information architecture

```
/                 ONE LONG PAGE — the sortie (launch → denial → stack → mission → ground truth → landing)
/field-notes      library — engineering essays (kept, restyled)
/field-notes/[slug]
/careers          library — open roles (kept, restyled)
/careers/[slug]
/engage           conversion surface (kept, restyled; form + Resend unchanged)
/stack   → 301 →  /#stack        (permanent redirect)
/mission → 301 →  /#mission      (permanent redirect)
/vehicles*  → 301 → /            (removed; redirect to home)
```

**Nav (pill):** Field Notes · Careers · Engage — plus in-page anchors Stack (`/#stack`) and Doctrine (`/#mission`) that smooth-scroll when already on `/`.
**Footer:** stack layer links become `/#skyanchor`, `/#tenere`, `/#kiksuya` anchors. Vehicles column removed. 404 quick-nav updated (also fixes the dead `/products` link).

## 5. The page — act by act

The page is a mission. A persistent, subtle route line advances with scroll position. Section IDs double as anchors: `#launch`, `#brief` (including the `#denial` compatibility anchor), `#stack` (`#skyanchor` / `#tenere` / `#kiksuya`), `#mission`, `#hyderabad`, `#landing`.

> **Narrative revision, 2026-07-18:** The former `THE BRIEF` and `THE NIGHT` acts are now one `OperationalReality` section. The old "The plan is perfect" and "Then the night takes the plan apart" headlines are retired. One headline, one detailed operating argument, one planned-versus-field visual, and one three-condition response rail now hand directly into the autonomy stack. This revision supersedes the separate Act 1 and Act 2 descriptions below.

### Act 0 — `#launch` · T-00:00:00 · LAUNCH

**The move:** texture-mask-text hero. Two-line display type — **OPERATIONAL / AUTONOMY** — filled with the warm aerial-terrain plate (`terrain.png` sampled from its clean bottom-left region, the corridor light streaking through the letterforms). The terrain lives *inside* the words: the machine carries the map within it. Slow drift of the fill (`background-position` over ~40 s, reduced-motion: static). Everything else on the fold is quiet: near-black teal ink, one mono eyebrow, one subline, two CTAs.

- Eyebrow (mono): `KARTA INNOVATIONS · T-00:00:00 · LAUNCH · 17.454 N 78.500 E`
- Categorical line (display, sand key words): **"Command that survives uncertainty."**
- Subline (the core, verbatim): *"We build the layer that keeps unmanned aircraft flying when GPS, comms and daylight are taken away — every decision held by a human, every decision logged."*
- CTAs: **Fly the sortie** (sand primary, scrolls to `#brief`) · **Talk to engineering** (ghost, `/engage`)
- Bottom telemetry strip (mono, aqua): `DISTANCE 72.4 KM · DURATION 01:42:00 · MAX ELEV 1,850 M · WEATHER CLEAR · WIND 12 KTS NE` — concrete from the first viewport, and it foreshadows the plate the reader is about to see.

*SUCCESs served: Simple (the core, once, plainly), Concrete (real mission numbers before any claim).*

### Act 1 — `#brief` · T-01:12:00 · THE BRIEF

**The move:** pattern establishment before the pattern break. Full-bleed presentation of the **daylight corridor plate** (`terrain.png`, complete with LAUNCH → OBJECTIVE corridor, risk zones, legend). Calm, warm, confident.

- Headline: **"The plan is perfect."**
- Body: *"Corridor plotted around three risk zones. Weather clear. Fuel margins good. Every mission starts like this — on a map, in daylight, with everything known."*
- The three risk zones get quiet mono callouts (FAILURE 1 · NO GPS / FAILURE 2 · COMMS JAMMED / FAILURE 3 · CONGESTED AIR) — they read as routine planning annotations here. Their real meaning detonates in the next act.

*SUCCESs served: Unexpected (setup), Concrete (a real brief, not a metaphor).*

### Act 2 — `#denial` · T+00:38:00 · THE NIGHT

**The move:** the pattern break. Cut to the **night isometric plate** (existing `mission-corridor.jpg` / `terrain 2.png` treatment — keep the current MissionMap composition and mission-log column; it already does this act well). The denied-plunge darkening runs here. Oxblood (`#88393C`) becomes the act's accent: fault halos, log warnings.

- Headline: **"Then the night takes the plan apart."**
- Three beats on scroll, mission-log lines as canonical text:
  - `T+00:38 · FAILURE 1 — GPS constellation lost. Position source: none.`
  - `T+00:51 · FAILURE 2 — Command link jammed. Operator unreachable.`
  - `T+01:07 · FAILURE 3 — Congested air. Three aircraft, one corridor, no coordination channel.`
- The curiosity gap, alone on its own line, sand text on near-black:
  **`T+01:08 · Aircraft still on corridor. Position error: 4 m. How?`**

*SUCCESs served: Unexpected (the gap that pulls the whole scroll), Concrete (timestamps, metres), Emotional (stakes: an aircraft alone in the dark).*

### Act 3 — `#stack` · THE ANSWER — three layers, one closed loop

**The move:** fold the entire `/stack` page in, but every layer is introduced as *the thing that just saved the mission at a named minute*. Plain-English anchor first, name second, depth on approach. Keep the loop diagram (intent flows down, situation and audit flow up) as the act's close. Spec tables and integration lists stay — they are the Credible layer.

- Act intro: **"It kept flying because position, decision and memory don't live in one fragile place. Three layers. One closed loop."**
- `#skyanchor` — **It knows where it is.** *SkyAnchor · Edge.* `T+00:38, GPS gone:` visual-inertial + terrain-relative + barometric fusion; position as *confidence, not certainty*. Spec table + "reads like an instrument" confidence readout.
- `#tenere` — **It knows what to do next.** *TENERE · Command.* `T+00:51, link jammed:` the mission graph continues inside pre-authorized bounds; one operator, many aircraft; deconfliction without a channel.
- `#kiksuya` — **It remembers why.** *Kiksuya · Theatre.* `T+01:07 and every minute:` doctrine clauses as executable constraints; every decision annotated against the clause that allowed it. Includes a 4–6 line **audit-log excerpt** (mono, aqua on ink) — the single most credibility-dense artifact on the site.

*SUCCESs served: Simple (three anchors a visitor can retell), Concrete (named minutes), Credible (specs, clause IDs, audit excerpt).*

### Act 4 — `#mission` · THE RULES

**The move:** fold `/mission` in. Doctrine as the emotional turn: autonomy is only tolerable because it is bounded and accountable.

- Headline: **"Autonomy without accountability is a liability."**
- The four operating principles (01 bounded autonomy · 02 integration discipline · 03 audit-by-design · 04 allied export), tightened to two lines each.
- The identity moment lives in the hero. The word Karta cycles as one shaped unit through Devanagari, Telugu, Tamil, Kannada, Malayalam, Gujarati, Gurmukhi, Bangla, and Odia while the English accountability explanation stays fixed.

*SUCCESs served: Credible (doctrine you can hold us to), Emotional (identity, responsibility).*

### Act 5 — `#hyderabad` · GROUND TRUTH

**The move:** keep the Hyderabad section, tightened. Place = proof. Built, integrated and flown from Hyderabad; coordinates repeated from the hero eyebrow.

*SUCCESs served: Credible (a real place, a real team), Emotional (ground under the story).*

### Act 6 — `#landing` · T+01:42:00 · WHEELS DOWN

**The move:** close the story and the loop. The mission clock stops. A final mono log line: `T+01:42:00 · WHEELS DOWN · SORTIE COMPLETE · RECORD SEALED · READY FOR REVIEW.` (No invented decision counts — the claim is the *record exists and can be inspected*, per the honesty rules.) Then the core restated once (Simple: say it, prove it, say it again), and the asks:

- **Talk to engineering** (sand primary → `/engage`) — *"No sales team exists."*
- **Fly the next one** (ghost → `/careers`)
- Quiet third link: *Field notes — how we think, in public* → `/field-notes`
- The landing closes on the final Field Notes link, without a decorative text coda.

*SUCCESs served: Stories (the sortie completes), Simple (core restated), Credible (the record, not a promise, is the ending).*

**Honesty framing (applies to Acts 1–3):** both plates and the mission log carry a quiet mono label — `REPRESENTATIVE SORTIE · ILLUSTRATIVE`. Scenario numbers (72.4 km, 4 m drift, timestamps) are story furniture, clearly inside the scenario frame; they are never presented as measured product performance. Real performance claims live only in spec tables sourced from `lib/catalog.ts` content that engineering already stands behind.

## 6. Color system — "warm light in a cold night"

> **Palette revision, 2026-07-18:** The current build uses **Field Atlas**, derived from the supplied Karta palette: sage `#66785F`, mineral gray `#A0A4A0`, field tan `#B89A7A`, route orange `#E67E22`, and brick red `#C0392B`. Sage is re-derived into graphite surfaces, mineral gray carries information, tan adds physical context, brick red marks human intent and constraint, and orange is restricted to narrow route traces. Dark mineral separation prevents flag-like orange, light, and green groupings. The CSS defines the system in OKLCH and retains historic class names only as compatibility aliases. This revision supersedes the values and hue-specific rules below; the state semantics and sortie structure remain active.

The palette is the story: **teal-black night** (the operating environment), **warm sand light** (the corridor, the human decision, the way home), **oxblood** (what the night takes), **aqua** (the instruments that keep talking).

### Tokens (Tailwind v4 `@theme`, `app/globals.css`)

Surfaces re-derived from teal-black (replacing navy):

| Token | Value | Role |
|---|---|---|
| `--color-surface-deep` | `#030C0C` | footer well, deepest step |
| `--color-ink` | `#051112` | page baseline |
| `--color-ink-2` | `#0A1D1E` | content sections |
| `--color-surface` | `#0E2627` | cards, raised panels |
| `--color-raised` | `#133335` | feature cores (replaces indigo) |
| `--color-raised-hi` | `#1A4547` | hover surfaces (replaces indigo-hi) |
| `--color-border` | `#16393B` / strong `#1F5254` | lines |
| `--color-fg` | `#F5F3EC` | primary copy (warm off-white, pairs with sand) |
| `--color-fg-muted` | `#B7C6C3` | body/secondary |
| `--color-fg-tertiary` | `#6F8E8B` | mono captions |

Brand and accents:

| Token | Value | Role | Contrast on `--color-ink` (approx) |
|---|---|---|---|
| `--color-teal` | `#13737A` (`-hi #1FA3AC`, `-deep #0B4A4F`) | **Primary brand.** Fills, strokes, hover states, chips, diagram lines, large display. White/fg text *on* teal chips ≈ 5.6:1 ✓ | ≈ 3.2:1 → large text / non-text only |
| `--color-sand` | `#FBCA89` (`-dim #D9A968`) | **Primary luminous accent.** Primary buttons (ink text on sand ≈ 12:1 ✓), headline highlights, the corridor light, mission-clock, curiosity-gap lines | ≈ 12:1 ✓ any size |
| `--color-oxblood` | `#88393C` (`-hi #B05054`) | **Denial accent.** Fault halos, failure fills, the plunge act. Never body text; pair with fg/sand text | ≈ 2:1 → fills/strokes only |
| `--color-aqua` | `#81D1D0` | **Telemetry accent.** Mono readouts, audit excerpt, spec strokes, log lines | ≈ 9.8:1 ✓ labels/telemetry |

**Compatibility aliases (transition only):** `--color-amber → sand`, `--color-amber-hi → sand`, `--color-amber-deep → teal-deep`, `--color-gold → aqua`, `--color-indigo → raised`. Existing `text-amber`/`bg-amber`/`text-gold` utilities keep working during the retheme; new/edited components use the semantic names. `lib/useThemeColors.ts` DARK constant updated to match (3D/canvas colors).

State colors: `--color-alert` re-seats on `oxblood-hi #B05054`, `--color-ok #6FBF9E`, `--color-warn #FBCA89` (sand doubles as warn/live — one warm color, one meaning family).

### Rules

- Sand is precious. It marks *human light in the system*: CTAs, the clock, the corridor, the gap line, headline key words. If a fold has more than two sand elements, it has too many.
- Oxblood only appears while something is being taken away (Acts 1 annotations → Act 2). It should never appear after `#stack` begins answering — the palette itself tells the story arc.
- Aqua is instrument voice only — mono type and strokes, never prose.
- Duotone imagery tint updates from azure/cyan-screen to **teal/sand-screen** so photography sits in the new world.

## 7. Typography & the texture-mask-text primitive

Implemented fonts: **Anek Latin** for display/body, matching **Anek Indian-script cuts** for the multilingual Karta word, and **Azeret Mono** for telemetry/labels. The script word uses a fixed-height slot and changes only with opacity and transform.

**New primitive — `.texture-text`** (adapted from HyperFrames texture-mask-text to our stack, no GSAP — CSS + existing motion conventions):

```css
.texture-text {
  background-image:
    linear-gradient(rgba(5,17,18,0.18), rgba(5,17,18,0.30)), /* legibility scrim inside letters */
    var(--texture-url);
  background-size: var(--texture-size, 160%);
  background-position: var(--texture-pos, 30% 65%);
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 12px rgba(3,12,12,0.55)); /* contour shadow, per the reference */
}
.texture-text-fallback { color: var(--color-sand); } /* if clip unsupported / texture fails */
```

- Asset: `terrain.png` → optimized to `public/textures/terrain-brief.jpg` (~quality 85, ≤600 KB, 2400w). `--texture-pos` tuned so letterforms sample clean terrain + a streak of corridor light, not the baked-in labels.
- Motion: `background-position` drifts a few percent over ~40 s via CSS keyframes; `prefers-reduced-motion`: static. (Only `transform/opacity/clip-path/filter` normally animate — `background-position` on a GPU-composited text layer at this cadence is the one sanctioned exception; if it janks in verification, fall back to a masked `<div>` with `transform` drift.)
- Usage budget: hero display and act numerals (optional, subtle). Nowhere else - it is a signature, not a wallpaper.

## 8. Components — keep / kill / new

**Keep (retheme only):** Nav, Footer (link changes), Grain, SmoothScroll, BootScript, PageHeader, NestedCTA, SpecTable, DoppelrandCard, CoordinateStrip, RenderBlock, EngageForm + `/api/engage`, MissionMap + mission-log (becomes Act 2), Manifesto content (feeds Act 4), GrandScheme loop diagram (closes Act 3), Hyderabad, useReducedMotionSafe, useAnimeBoot, lib/motion.ts.

**Kill:** `app/vehicles/**`, `components/sections/Vehicles.tsx`, vehicle detail scaffolding, `components/3d/VehicleModelScene*`, `lib/3d-assets.ts` vehicle allowlist, `VEHICLES` array in `lib/catalog.ts` (and its sitemap/footer/404 references). `app/stack/**` and `app/mission/**` page bodies (content migrates into home sections; routes become redirects).

**New:** `TextureText` primitive (+ CSS), `MissionClock` (mono eyebrow clock, scroll-keyed per act — static text per act, not a janky live counter), `BriefPlate` (Act 1 full-bleed plate with callouts), `StackAct` (three-layer fold-in composed from existing StackLayerSection pieces), `LandingAct` (log close + CTAs), redirects in `next.config.ts`.

## 9. Motion & accessibility (unchanged conventions, new beats)

- Every animated component through `useReducedMotionSafe()`; reduced variants keep opacity/color, drop movement; pinned/scroll scenes collapse to fully readable static layouts. Scroll-driven `useScroll` refs stay inside their own component. Constants from `lib/motion.ts` only.
- One signature moment per act: hero texture drift · brief plate calm reveal · night plunge + log ticks · loop diagram draw · doctrine line-by-line settle · landing log close.
- WCAG AA: body copy only ever `fg`/`fg-muted` on ink surfaces; teal and oxblood never carry small text; sand and aqua verified above (~12:1 / ~9.8:1). Focus visible on all chrome. The mission log remains the canonical DOM text for the animated plate (existing aria pattern).

## 10. Build plan (phases = commits)

1. `feat: retheme tokens to teal/sand/oxblood/aqua` — globals.css @theme + aliases, useThemeColors DARK, duotone tint, DESIGN.md rewrite.
2. `feat: texture-text primitive + optimized terrain assets` — CSS class, asset pipeline (terrain.png → public/textures/), fallback.
3. `feat: hero act — texture-masked OPERATIONAL AUTONOMY` — new hero, telemetry strip, CTAs.
4. `feat: brief + night acts` — Act 1 BriefPlate; Act 2 retint (oxblood halos) + curiosity-gap line.
5. `feat: fold stack into home` — StackAct with three layers + loop diagram + audit excerpt; anchors.
6. `feat: fold mission into home` — doctrine act + कर्ता moment; Hyderabad tighten; landing act.
7. `feat: remove vehicles; redirects; nav/footer/sitemap/404` — IA changes.
8. `chore: field-notes + careers restyle pass` — verify token inheritance, fix stragglers; Careers headline becomes "Command that survives uncertainty."
9. `fix: baseline defects` — `useReducedMotionSafe` lint failure, unused `ENVELOPES` in Hyderabad, dead `/products` 404 link, skip link to `#content`, form async status live-region.
10. `docs: PRODUCT.md + ASSETS.md updates` — vehicles removed from purpose/asset list; texture assets documented.
11. Verify: typecheck, lint, build, browser pass per fold (desktop + mobile), reduced-motion pass, then adversarial review workflow; fixes.

## 11. Acceptance criteria

- A cold visitor can retell the core after one scroll (the PRODUCT.md success test, now sharper: they can also name "it knows where it is / what to do next / it remembers why").
- `/` tells the complete sortie; `/stack`, `/mission`, `/vehicles*` redirect; no vehicle marketing surface remains; Field Notes, Careers, Engage work and sit in the new palette.
- The hero renders the texture-masked display with a sand-text fallback when `background-clip: text` is unavailable.
- Palette discipline holds: oxblood absent after Act 2; ≤2 sand elements per fold; body copy always fg tokens; AA verified.
- Full reduced-motion pass: every act readable, no blank holes, no motion.
- `next build` clean; no dead links (including the old 404 `/products` reference — removed).
