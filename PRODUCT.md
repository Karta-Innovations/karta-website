# Product

## Register

brand

## Users

Three audiences land on this homepage, in priority order:

1. **Defense customers / government evaluators.** Procurement officers and military technologists assessing whether Karta's autonomy stack is credible, auditable, and deployable. They read past the fold; they need capability claims backed by doctrine and specifics.
2. **Engineers / talent.** Aerospace, robotics, and systems engineers deciding whether the problems are hard enough and the team serious enough to join. They respond to technical honesty and the stack's architecture.
3. **General public / press.** Cold visitors who must understand within one viewport what Karta does and why it matters, with zero aerospace vocabulary.

The story must open in plain language and deepen technically on approach. A first-time visitor should never hit an unexplained term before its plain-English anchor.

## Product Purpose

Karta Innovations builds the operational autonomy layer for unmanned systems: three proprietary software layers (SkyAnchor: positioning without GPS; TENERE: mission command for one operator running many vehicles; Kiksuya: doctrine, audit and memory across a theatre) plus three reference airframes (Kari, Cerana, Dorsata) that carry it. The homepage exists to make that story legible and monumental: problem (the denied environment) → answer (the stack) → proof (the vehicles) → credibility (Hyderabad, doctrine) → direct engagement with engineering.

Success: a cold visitor can retell "they make drones that keep working when GPS and comms fail, and every decision stays with a human and gets logged" after one scroll.

## Brand Personality

Grave, monumental, cinematic. The register of an instrument built for consequence, not a product being marketed. Vast dark scenes, slow confident reveals, weight. Sanskrit etymology (Karta = the one who acts, accountably) is identity, not decoration. Voice is engineering-direct: short declarative sentences, no hype adjectives, numbers where numbers exist.

## Anti-references

- **Generic SaaS landing page.** No centered hero + gradient blobs, no icon-card grids, no hero-metric template.
- **Military cliché.** No olive drab, stencil type, crosshairs, camo, war-movie tropes.
- **Crypto/neon tech.** No neon glows on black, cyberpunk grids, glitch effects. Dark here is atmosphere and consequence, not aesthetic edge.
- **Anduril clone.** The obvious defense-tech reference. Karta's look is its own: a fresh look at operational autonomy: cartography, telemetry, terrain, accountability.

## Design Principles

1. **Plain words first, depth on approach.** Every technical term gets a plain-English anchor before or beside it (SkyAnchor = "knows where it is", TENERE = "knows what to do next", Kiksuya = "remembers why"). Jargon without an anchor is a bug.
2. **Darkness is the operating environment.** Dark-only theme. The site lives where its systems live: night operations, denied signal, terrain. Light mode does not exist.
3. **One story, one scroll.** Each fold advances exactly one beat: problem → belief → answer → proof → ground truth → ask. No section repeats a beat.
4. **Motion carries meaning.** Animation dramatizes the story (signal decaying, the loop closing, telemetry ticking) or it doesn't ship. Entrance choreography is orchestrated per section, always reduced-motion safe.
5. **Engineering voice, not sales voice.** The CTA is a direct line to the team that ships the code. Copy never promises what doctrine doesn't allow.

## Accessibility & Inclusion

- WCAG AA contrast on all text against dark surfaces (accent azure #4D8DFF and cyan #22D3EE reserved for large text, strokes, and telemetry; body copy stays in the fg tokens).
- `prefers-reduced-motion` honored everywhere via the existing `useReducedMotionSafe()` convention: static or simplified variants for every animated section, never a blank hole.
- Scroll-hijacked sections (pinned scenes, horizontal carousel) must remain fully readable in their reduced-motion fallbacks.
- Keyboard navigation and visible focus on all interactive chrome.
