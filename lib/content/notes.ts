export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "spec"; title?: string; rows: { k: string; v: string }[] }
  | { type: "code"; language?: string; content: string };

export interface FieldNote {
  slug: string;
  title: string;
  summary: string;
  author: string;
  role: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  body: NoteBlock[];
}

export const NOTES: FieldNote[] = [
  {
    slug: "skyanchor-uncertainty",
    title: "Why SkyAnchor treats location as confidence, not certainty",
    summary:
      "A short note on why GPS-denied navigation should expose trust, not just coordinates.",
    author: "Sarath Irigireddy",
    role: "Edge stack lead",
    date: "2026-06-30",
    readingMinutes: 6,
    tags: ["Edge", "SkyAnchor", "Autonomy", "Engineering"],
    body: [
      {
        type: "p",
        text: "Most navigation systems speak in coordinates. Latitude, longitude, altitude. Maybe velocity. Maybe orientation.",
      },
      {
        type: "p",
        text: "That is useful, but incomplete.",
      },
      {
        type: "p",
        text: "A vehicle does not only need to know where it is. It needs to know how much confidence it should place in that answer.",
      },
      {
        type: "p",
        text: "This distinction becomes critical when GPS is unreliable, degraded, or unavailable. In those conditions, location is no longer a single clean fact coming from one trusted source. It becomes an estimate formed from partial signals, changing conditions, and varying confidence.",
      },
      {
        type: "p",
        text: "SkyAnchor is built around that reality.",
      },
      {
        type: "h2",
        text: "Position alone is not enough",
      },
      {
        type: "p",
        text: "A coordinate without confidence can be dangerous.",
      },
      {
        type: "p",
        text: "It may look precise even when the underlying system is uncertain. It may continue updating even when the evidence supporting it has weakened. It may be consumed by planners, displays, autonomy logic, or flight systems as if it were ground truth.",
      },
      {
        type: "p",
        text: "That is the failure mode we care about.",
      },
      {
        type: "quote",
        text: "A system should not silently become less certain while continuing to sound equally confident.",
      },
      {
        type: "p",
        text: "SkyAnchor's role is to make that confidence visible.",
      },
      {
        type: "h2",
        text: "What SkyAnchor publishes",
      },
      {
        type: "p",
        text: "SkyAnchor does not treat position as a bare number.",
      },
      {
        type: "p",
        text: "It exposes a navigation belief: where the vehicle is estimated to be, how fresh that estimate is, and how much trust downstream systems should place in it.",
      },
      {
        type: "p",
        text: "That lets other parts of the stack make better decisions.",
      },
      {
        type: "ul",
        items: [
          "A planner can wait when location confidence is low.",
          "A mission system can avoid committing to precise actions until the estimate improves.",
          "A safety layer can distinguish between \"known position\" and \"best current guess.\"",
          "An operator interface can show degraded navigation before it becomes a surprise.",
        ],
      },
      {
        type: "p",
        text: "The important point is not the internal technique. The important point is the contract: consumers receive both the estimate and the confidence around it.",
      },
      {
        type: "h2",
        text: "GPS-denied does not mean guessing",
      },
      {
        type: "p",
        text: "GPS-denied navigation is often misunderstood as replacing GPS with one alternate source.",
      },
      {
        type: "p",
        text: "That is not the right framing.",
      },
      {
        type: "p",
        text: "In real operation, confidence changes over time. Some moments provide strong evidence. Other moments are ambiguous. Some signals are fresh. Some are stale. Some are useful for broad awareness but not for precise commitments.",
      },
      {
        type: "p",
        text: "SkyAnchor is designed so the system can say:",
      },
      {
        type: "ul",
        items: [
          "\"I have a strong estimate.\"",
          "\"I have a usable but aging estimate.\"",
          "\"I am uncertain.\"",
          "\"I should not publish this as valid global position.\"",
        ],
      },
      {
        type: "p",
        text: "That last sentence matters. Knowing when not to claim certainty is part of navigation.",
      },
      {
        type: "h2",
        text: "Why this matters downstream",
      },
      {
        type: "p",
        text: "Autonomy stacks are made of consumers.",
      },
      {
        type: "ul",
        items: [
          "Controllers consume state.",
          "Mission logic consumes state.",
          "Maps consume state.",
          "Human interfaces consume state.",
          "Safety systems consume state.",
        ],
      },
      {
        type: "p",
        text: "If all of them receive only a coordinate, they must either trust it blindly or invent their own confidence rules after the fact.",
      },
      {
        type: "p",
        text: "SkyAnchor gives them a cleaner interface.",
      },
      {
        type: "p",
        text: "Instead of asking every downstream component to guess whether the estimate is trustworthy, the navigation layer carries that information forward. This makes confidence a shared property of the running system, not an undocumented assumption buried inside one node.",
      },
      {
        type: "h2",
        text: "Different by design",
      },
      {
        type: "p",
        text: "Many systems optimize for producing a position as often as possible.",
      },
      {
        type: "p",
        text: "SkyAnchor is stricter.",
      },
      {
        type: "p",
        text: "It is designed to avoid turning weak evidence into confident output. It favors explicit uncertainty over false precision. It treats freshness, confidence, and validity as first-class parts of the navigation product.",
      },
      {
        type: "p",
        text: "That makes the system more conservative, but also more honest.",
      },
      {
        type: "p",
        text: "And in autonomy, honesty is not a cosmetic property. It is what allows the rest of the stack to behave safely.",
      },
      {
        type: "h2",
        text: "Cost",
      },
      {
        type: "p",
        text: "This costs engineering effort.",
      },
      {
        type: "p",
        text: "It is easier to publish a coordinate. It is harder to publish confidence. It is harder still to make downstream systems respect that confidence.",
      },
      {
        type: "p",
        text: "But the payoff is important: failures that used to be silent become visible. Degradation becomes a state the system can reason about, not an accident discovered too late.",
      },
      {
        type: "p",
        text: "SkyAnchor's core principle is simple:",
      },
      {
        type: "quote",
        text: "The vehicle should not only know where it thinks it is. It should know how much it should trust that belief.",
        cite: "SkyAnchor operating principle",
      },
    ],
  },
];

export function getNote(slug: string): FieldNote | undefined {
  return NOTES.find((n) => n.slug === slug);
}
