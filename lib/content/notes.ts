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
    title: "Why SkyAnchor publishes uncertainty, not position",
    summary:
      "A short note on why our on-vehicle pose estimate is exposed with explicit confidence - and what that lets every downstream consumer do correctly.",
    author: "K. Mehrotra",
    role: "Edge stack lead",
    date: "2026-04-18",
    readingMinutes: 6,
    tags: ["Edge", "SkyAnchor", "Engineering"],
    body: [
      {
        type: "p",
        text: "Every autonomy stack we have looked at - open-source, commercial, defence-supplied - exposes pose as a single number triple. (x, y, z) in some frame. Sometimes a quaternion. Almost never a confidence.",
      },
      {
        type: "p",
        text: "Downstream consumers then act as if the pose is true. They plan against it. They draw on maps. They make commitments. When the underlying estimator silently degrades - drift accumulates, terrain match falls - nothing in the system notices until something goes wrong.",
      },
      {
        type: "h2",
        text: "SkyAnchor publishes a posterior",
      },
      {
        type: "p",
        text: "SkyAnchor's output is not (x, y, z). It is a calibrated posterior over pose, summarised as a mean and a covariance, with metadata about which fix modalities contributed and at what confidence.",
      },
      {
        type: "ul",
        items: [
          "Visual-inertial odometry contribution and its drift rate",
          "Terrain-relative match score and matched-frame age",
          "Barometric integration confidence",
          "Last GNSS contact (if any), and how long ago",
        ],
      },
      {
        type: "h2",
        text: "What this enables",
      },
      {
        type: "p",
        text: "TENERE consumes the posterior, not the mean. Mission graphs can be authored against pose-uncertainty constraints - \"do not commit to the corridor unless lateral 1-sigma is under 6 metres\" - and the planner can hold actions until they would be safe to execute.",
      },
      {
        type: "p",
        text: "Kiksuya consumes the posterior too. Doctrine clauses can be written in terms of confidence. \"No effect authority below pose confidence X.\" The bound becomes a property of the running plan, not a checkbox on a slide.",
      },
      {
        type: "quote",
        text: "The vehicle never silently becomes less safe.",
        cite: "Karta operating principle",
      },
      {
        type: "h2",
        text: "Cost",
      },
      {
        type: "p",
        text: "It is more work. Calibrating uncertainty is harder than reporting it. The benefit is that every downstream consumer that uses the posterior is, by construction, safer than one that does not - and the failure modes that used to be silent become loud.",
      },
    ],
  },
  {
    slug: "doctrine-as-code",
    title: "Doctrine as code: what Kiksuya actually does",
    summary:
      "Why rules of engagement, geometry constraints, and authority gates belong in a versioned runtime - not a slide deck.",
    author: "S. Ranganathan",
    role: "Doctrine runtime",
    date: "2026-05-02",
    readingMinutes: 8,
    tags: ["Doctrine", "Kiksuya", "Operations"],
    body: [
      {
        type: "p",
        text: "Most autonomy stacks treat doctrine as a separate artefact - a slide deck, a PDF, a procurement annex. The runtime never reads it. The audit log never references it. The vehicle, in flight, has no way to point at the clause that authorised its last action.",
      },
      {
        type: "p",
        text: "Kiksuya is built on the opposite assumption. Doctrine is a versioned, signed runtime artefact. Every plan TENERE produces is annotated, action by action, with the doctrine clause that authorises it. The annotation is logged at telemetry frame rate and survives the sortie.",
      },
      {
        type: "h2",
        text: "What this lets us claim",
      },
      {
        type: "ul",
        items: [
          "Procurement-grade traceability from contract to flight",
          "Doctrine packs that can be exchanged between programmes without code changes",
          "After-action review that points at clauses, not just events",
          "Operators who can read and edit the doctrine the system enforces",
        ],
      },
      {
        type: "h2",
        text: "What this lets us not claim",
      },
      {
        type: "p",
        text: "We do not claim that the existence of a doctrine layer makes autonomy safe. We claim that without one, the safety claims of any autonomy stack are unfalsifiable. Kiksuya makes the claim falsifiable.",
      },
    ],
  },
];

export function getNote(slug: string): FieldNote | undefined {
  return NOTES.find((n) => n.slug === slug);
}
