# Product and message

## Register

brand

## Positioning · November 2026

This follows the November 2026 company introduction, which supersedes the "operational autonomy" framing of the earlier site.

- **Line:** The brain for unmanned systems.
- **Category:** India's autonomy stack.
- **Plain definition:** Karta builds the intelligence layer that lets unmanned systems navigate, perceive and decide for themselves. It starts with knowing where you are when GPS is jammed or spoofed.
- **Proof in one breath:** With the aircraft's own GPS dragged up to 27.1 km away, or jammed for 96 % of a flight, the autopilot flew on SkyAnchor.
- **Name:** कर्ता. The one who acts. And answers for it.

## The frame: three questions

An unmanned system has to answer three questions by itself. The whole site hangs on them, and each carries its status.

| | Question | Status | Carried by |
| --- | --- | --- | --- |
| 01 | Where am I? | Demonstrated | SkyAnchor |
| 02 | What is around me? | Next phase | 360 degree perception; obstacle avoidance and object tracking in development |
| 03 | What should I do? | Next phase | Mission autonomy in TENERE today; collaborative swarms and autonomous copilots in development |

Never present a "next phase" capability as available.

## What exists today

Two systems in production.

**SkyAnchor**, visual navigation module (P/N KA-SEN-2604-A). End-to-end operation without GPS: take-off, flight and landing inside jammed and spoofed airspace. One sealed module, sensor and compute, feeding the autopilot over MAVLink. 100 × 114 × 51 mm, 280 g, 12 V. PX4 and ArduPilot. How it navigates is proprietary and is not described on the site (see "What the site does not show").

**TENERE**, swarm-native ground control station. Operators set goals and limits; TENERE plans, deconflicts vehicles and adapts within them, on any MAVLink-enabled vehicle. Modules: swarm engine, Indian grid system, 3D map generation, terminal guidance, object detection and tracking.

Karta sits above the customer's autopilot. They keep their platform. The seam is MAVLink.

## Users

1. **Defence customers, UAV manufacturers and government evaluators.** They need the category in five seconds, then mechanisms, results and limits. They should never have to guess whether a statement is a result, a specification or a plan.
2. **Engineers and technical talent.** They need to see hard problems and a team that flies what it writes.
3. **Press, investors and general visitors.** They need a story they can repeat accurately after one scroll.

## Page narrative

The homepage is short: who Karta is and what it ships. Flights have a page of their own.

**Home (`/`)**

1. **Claim.** The line, set on the brand plate until Karta's own film takes its place.
2. **What we build.** One sentence, then the two systems in production.
3. **Frame.** The three questions, with what has flown and what has not.
4. **SkyAnchor.** The object and four figures.
5. **TENERE.** The ground control station, working.
6. **Integration.** Karta sits above your autopilot.
7. **Company.** कर्ता, and who is behind it.
8. **Action.** Let’s fly it on your platform.

**SkyAnchor (`/skyanchor`)**: the product, what it means on the aircraft, and the specification.

Anchors on home: `#questions`, `#skyanchor`, `#tenere`, `#stack`, `#company`, `#contact`.

Other routes: `/field-notes`, `/field-notes/[slug]`, `/careers`, `/careers/[slug]`, `/engage`. `/stack`, `/mission`, `/vehicles`, `/evidence` and `/products` redirect.

## What the site does not show

Decided by the founders on 23 November 2026.

- **How SkyAnchor navigates.** It is proprietary. The site says what SkyAnchor does (navigation without GPS, by sight) and what it has flown, never how: no description of the method, no footage of what it sees, no diagram of its pipeline, and no specification row that gives the method away. The charts show where the aircraft went, not how that was worked out, and the flight data shipped with the site carries no record of it.
- **The roadmap.** No levels, dates, phases or planned layers. The stack diagram lists only what flies today. The three questions keep their status ("Demonstrated", "Next phase") because the public introduction states it.
- **Flights.** Taken off the site entirely on 24 November 2026. The page, replays, figures and data are archived at `/home/sarath/Videos/website/flights` with notes on putting them back.
- **The brand page.** Removed for launch on 24 November 2026; the brand kit lives at `/home/sarath/Videos/website/branding`.
- **Other people's aircraft.** The VTOL in the Pokhran footage belongs to a vendor, and its footage is not Karta's to use. None of it is on the site. The hero holds the brand plate until Karta supplies a film of its own.
- **The marketing films.** The brand film and the two flight-test films are not on the site: they show how SkyAnchor sees the ground.

## Credibility contract

Every public result follows this order:

> What was flown → the number → what it was measured against → where it stops being true

- Numbers come only from the field reports and replays. The source of truth for the site is `lib/evidence.ts`; each figure there carries its `basis`, and each flight its `boundary`.
- GPS1 is the aircraft's own GNSS receiver. Define it on first use.
- Where no independent truth existed, say so. The 0.4 m touchdown is SkyAnchor's own figure and is labelled that way.
- Print the uncomfortable facts beside the good ones: the manual landing on the aided-start flight, the first-attack median that includes the climb.
- The flight of 4 November is described as SkyAnchor navigating with its GPS input cut, checked against the aircraft's own GPS. Do not describe the autopilot as flying on SkyAnchor in that flight.
- Specifications are the published ones (`lib/skyanchor.ts`), less the rows that describe the method.

## Voice

Calm, exact and from the field. Short sentences that a person would say.

Write:

- Start with what was flown, then say what it means.
- One idea to a sentence. "GPS falls 450 metres in one second." "None of it happened."
- On the homepage, say "its own GPS". On the flights page, where the reports are quoted, GPS1 is defined once and used.
- Name things exactly: SkyAnchor, TENERE.
- "Talk to engineering" is the action. "See the flights", "Replay every flight" and "Request a replay and report" are the secondary ones.

Do not write:

- AI-powered, next-generation, seamless, game-changing.
- Unjammable, spoof-proof, works anywhere, mission completes anyway.
- A number without a flight, a date and a reference.
- A plan written as if it had already flown.
- Fear, spectacle or weapon-effect language.
- Em dashes, and headings that restate the heading above.

## Decisions made for the public site

These follow from what the public one-page introduction chose to say, and are easy to reverse.

- **No named team.** The site uses the introduction's line about the team. Founder and team names appear only in the confidential deck, so they are not on the site.
- **No vehicle catalogue.**
- **Kiksuya is not presented.** The November introduction lists two systems in production.
- **No seed-round material.** Nothing from the confidential deck's funding slides is used.
- **The mark is flat, the fix is bronze.** The site sets the chevron and stem of the official outlines in one flat ink. The fix keeps the bronze of the logo files, redrawn as vector (the founders chose this over a red fix on 23 November 2026).
- **Full replays stay on request.** The site replays each flight from a reduced copy of its log, in local metres with no coordinates. The offline replay and the one-page report are offered to evaluators by email.

## Calls to action

1. Commercial: Talk to engineering.
2. Evidence: See the flights; replay every flight; request a replay and report.
3. Talent: Open roles in Hyderabad.

One solid action in any view.

## Success criteria

- A five-second visitor can say what Karta does and that it has been flown under jamming and spoofing.
- A one-scroll visitor can repeat the three questions.
- Every number names what it was measured against.
- Nothing "next phase" reads as available.
- The primary action is unmistakably Talk to engineering.

## Accessibility and inclusion

- Body text meets WCAG AA on both themes.
- State is never carried by colour alone: every chip and readout has words.
- The page is readable without motion, canvas or smooth scrolling.
- Reduced motion, keyboard navigation and visible focus are first-class states.
