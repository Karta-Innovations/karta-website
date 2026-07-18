# Product

## Register

brand

## Current direction

This branch redesigns Karta around one category and one memorable promise:

- **Category:** operational autonomy
- **Memory hook:** command that survives uncertainty
- **Plain definition:** Karta builds the autonomy layer that helps systems stay oriented, act within human-approved intent, and return a reviewable record as operating conditions degrade.
- **Stack mnemonic:** know where you are; know what to do next; know why it was allowed.
- **Retell test:** Karta builds operational autonomy that preserves human command when signals and conditions become uncertain.

This is a proposal for public messaging. Capability language remains draft until engineering, legal, and programme owners approve the mechanism, evidence, operating conditions, and boundary behind each claim.

## Users

Three audiences use the site, in this order:

1. **Defense customers and government evaluators.** They need to understand the category quickly, then inspect mechanisms, doctrine, limits, and evidence. They should never have to infer whether a statement is a product claim, a design goal, or a published result.
2. **Engineers and technical talent.** They need to see hard problems, real system boundaries, and the relationship between code, field testing, human authority, and accountability.
3. **Press and general visitors.** They need a plain-language explanation within one viewport and a story they can repeat accurately after one scroll.

The page opens in plain language and earns technical depth. Product names appear only after their operational responsibility has been made clear.

## Product purpose

Karta Innovations builds an operational autonomy layer for unmanned systems. The public story is organized around three responsibilities that form one closed loop:

1. **Orientation:** know where the system is and how much confidence to place in that estimate. SkyAnchor carries this responsibility.
2. **Bounded action:** translate human intent, geometry, and constraints into an editable mission plan. TENERE carries this responsibility.
3. **Accountability:** connect policy, authority, and the operational record so actions can be reviewed in context. Kiksuya carries this responsibility.

The website no longer presents vehicles as a product pillar or as proof of the autonomy stack. Vehicle names, catalog pages, specifications, galleries, 3D models, and vehicle-led imagery leave the public experience. Generic references to unmanned systems remain only when they are required to explain what operational autonomy controls.

The homepage absorbs the current landing, stack, and mission content into one long narrative. Field Notes and Careers remain separate destinations. Talk to Engineering remains the conversion endpoint.

## The sticky idea

The story uses Chip Heath and Dan Heath's SUCCESs framework from *Made to Stick*. The framework describes memorable ideas as Simple, Unexpected, Concrete, Credible, Emotional, and carried through Stories. Simplicity here means prioritization, not merely shorter copy. The [official SUCCESs model](https://heathbrothers.com/wp-content/uploads/resources/mts-made-to-stick-model.pdf) is the editorial source of truth.

| Principle | Karta application |
| --- | --- |
| Simple | One category and one promise: operational autonomy preserves human command under uncertainty. The three products are responsibilities inside one loop, not separate pitches. |
| Unexpected | Challenge the assumption that autonomy means removing the operator. Useful autonomy preserves command when conditions degrade. |
| Concrete | Show one operation from approved intent through degraded positioning and communications to a reviewable record. Show route state, confidence, bounds, gates, and decisions. |
| Credible | Present each claim as claim, mechanism, visible artifact, test conditions, and known boundary. Let visitors inspect a trace instead of asking them to trust an adjective. |
| Emotional | Make the operator's need for clarity and accountability the human stake. Avoid fear, spectacle, and war imagery. |
| Stories | Build the homepage as one challenge story. The operator is the protagonist, compound uncertainty is the antagonist, and the stack enables bounded action. |

## Narrative roles

- **Protagonist:** the human who sets intent and remains accountable.
- **Antagonist:** uncertainty that compounds across position, communications, workload, and environment.
- **Enabler:** the operational autonomy loop.
- **Guide:** Karta, expressed through mechanisms, boundaries, and engineering evidence.
- **Resolution:** not completion at any cost. The resolution is bounded behavior, visible uncertainty, retained human authority, and an inspectable record.

## Information architecture

### Primary routes

- `/`: one long page containing Autonomy, Operation, Stack, Proof, Mission, and the closing action.
- `/field-notes`: the public evidence layer for engineering findings and operational reports.
- `/field-notes/[slug]`: a structured technical note.
- `/careers`: hard problems, working principles, and open roles.
- `/careers/[slug]`: role detail and application route.
- `/engage`: the technical conversation form.

### Homepage anchors

- `#autonomy`
- `#operation`
- `#stack`
- `#proof`
- `#mission`
- `#contact`

### Legacy route behavior

- `/stack` redirects to `/#stack`.
- `/mission` redirects to `/#mission`.
- `/vehicles` and `/vehicles/[slug]` redirect to `/#autonomy`.
- Legacy routes are removed from the sitemap, navigation, footer, internal links, and structured metadata.

## Scope boundary: no vehicle-led story

Remove from the public website:

- vehicle and airframe names
- the Apis family category
- vehicle routes and route metadata
- vehicle specifications and galleries
- vehicle photography, silhouettes, icons, and 3D models
- airframes as evidence for the autonomy stack
- vehicle-first language in careers and corporate messaging

Allowed when technically necessary:

- the phrases `unmanned system`, `autonomous system`, or `platform integration`
- a generic system state in a diagram, represented by a route cursor, node, or trace rather than an aircraft silhouette
- a technical note that discusses a platform dependency when the dependency is essential to the finding

## Message hierarchy

### Level 1: category

**Operational autonomy**

This phrase owns the hero, metadata, navigation language, and retell test.

### Level 2: memorable promise

**Command that survives uncertainty.**

This is the short memory hook. It describes the design intent of the system, not an unconditional performance guarantee.

### Level 3: unexpected reframe

**Autonomy is not the absence of command. It is command that persists as conditions change.**

### Level 4: stack mnemonic

- Know where you are, and how sure you are.
- Know what to do next, within approved intent.
- Know why an action was allowed.

### Level 5: product names

- SkyAnchor: orientation and confidence
- TENERE: bounded mission planning
- Kiksuya: policy, authority, and record

## Voice

The voice is calm, exact, field-grounded, and accountable.

### Write like this

- Start with the plain-language job, then introduce the technical term.
- Use short declarative sentences for claims.
- Name the mechanism and the boundary beside the claim.
- Describe a human action, a system state, or an inspectable artifact.
- Use numbers only with source, conditions, date, and scope.
- State uncertainty directly.
- Prefer `Talk to engineering` and `Read the technical note` to generic discovery language.

### Do not write like this

- AI-powered
- next-generation
- seamless
- game-changing
- autonomous teammate
- works anywhere
- works without GPS or communications
- mission completes anyway
- every decision is logged
- one operator runs twelve systems
- safe, secure, reliable, failsafe, field-proven, or procurement-grade without a named standard and evidence
- targeting, kill-chain, weapon-effect, or fear-led language

## Credibility contract

Every public capability follows this sequence:

> Claim -> mechanism -> visible artifact -> test conditions -> known boundary

Minimum proof requirements:

| Claim family | Required public evidence |
| --- | --- |
| Position without continuous GNSS | Test route and duration, ground-truth method, error distribution, drift, environment, compute, and failure conditions. |
| Confidence-bounded position | Calibration or coverage plot, a representative confidence trace, and demonstrated behavior as confidence degrades. |
| Multi-system operator scaling | Mission type, training level, workload measure, intervention rate, automation level, and system count. |
| Mission composition and conflict resolution | Example intent and constraints, generated graph, violation case, reversibility, and human authority gates. |
| Doctrine and audit | Redacted policy version, clause attribution, timestamping method, record scope, retention, and replay or export artifact. |
| Intermittent communications | Defined outage profile, local behavior, reconnection behavior, reconciliation, and prohibited actions during loss. |
| Deterministic runtime | A scoped architecture statement that names the deterministic process, fixed model versions, and what falls outside that guarantee. |
| Integration | Supported compute, interfaces, maturity status, environmental range, and security posture. |
| External validation | Named programme, customer, evaluator, certification, or partner only with written permission and exact scope. |

Until evidence is approved, use design-intent language such as `designed for`, `intended to`, or `surfaces`, and place a clear boundary beside it.

Hyderabad is identity and operating context. It becomes credibility only when paired with approved facts about facilities, test capability, deployments, or team expertise.

## Calls to action

1. **Commercial:** Talk to engineering.
2. **Narrative:** See autonomy in operation, scrolling to `#operation`.
3. **Technical trust:** Read Field Notes.
4. **Talent:** Build it with us.

Use one solid action in any viewport. Avoid `Learn more`, `Explore`, and `Engage` as visible labels.

## Separate page roles

### Field Notes

Field Notes is the public evidence layer, not a company blog. Each note should follow:

> question -> conditions -> observation -> boundary -> implication

Suggested categories:

- position under uncertainty
- bounded mission planning
- doctrine as code
- operational testing
- human factors and interface design

Open each note with the finding. Do not bury the boundary at the end.

### Careers

Careers opens with: **Build command that survives uncertainty.**

Show the actual work:

- degraded sensing and confidence calibration
- constraint solving and mission planning
- auditable command interfaces
- policy systems and reviewable records
- integration, testing, and field deployment

Culture statements must be supported by concrete working practices.

## Success criteria

- A five-second visitor can say, `Karta builds operational autonomy.`
- A one-scroll visitor can retell the plain definition without product jargon.
- The operator remains the protagonist.
- Every fold advances a distinct story beat.
- Every technical term receives a plain-language anchor first.
- Every number names its source and conditions.
- Every capability includes a visible boundary.
- No vehicle name, catalog, gallery, model, specification, or airframe-as-proof remains.
- The primary action is unmistakably `Talk to engineering`.
- The page never implies mission completion at any cost.

## Accessibility and inclusion

- Body text meets WCAG AA contrast against every surface.
- Information is never encoded by color alone.
- The long homepage remains fully readable without motion, WebGL, or smooth scrolling.
- `prefers-reduced-motion`, forced-colors, keyboard navigation, and visible focus are first-class states.
- Masked display text remains real text with a solid-color fallback.
- Technical diagrams include adjacent text summaries and do not depend on hover.
