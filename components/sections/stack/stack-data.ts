import {
  STACK_LAYERS,
  type StackLayer,
  type StackProductSlug,
} from "@/lib/catalog";

export const STACK_BY_SLUG = Object.fromEntries(
  STACK_LAYERS.map((layer) => [layer.slug, layer]),
) as Record<StackProductSlug, StackLayer>;

export interface ProofStat {
  label: string;
  value: string;
}

/** View-model for the concise per-layer sections. Identity comes from the
 *  catalog; this adds the one-line role, the three proof readouts, and the
 *  layer imagery (the layer-named files, not the catalog defaults). */
export interface StackView {
  role: string;
  image: string;
  alt: string;
  proof: ProofStat[];
}

export const STACK_VIEW: Record<StackProductSlug, StackView> = {
  skyanchor: {
    role: "Position the vehicle can trust without GPS, with a confidence interval on every fix.",
    image: "/imagery/skyanchor.jpeg",
    alt: "The SkyAnchor edge positioning module, a sealed sensor unit.",
    proof: [],
  },
  tenere: {
    role: "Bounded operator intent becomes a sortie graph, deconflicted across the fleet.",
    image: "/imagery/tenere.jpg",
    alt: "The TENERE mission composer over a live airfield.",
    proof: [
      { label: "Per operator", value: "≤12" },
      { label: "Audit", value: "Frame-level" },
      { label: "Latency", value: "200 ms" },
    ],
  },
  kiksuya: {
    role: "Doctrine, authority, and audit, remembered and provable across the theatre.",
    image: "/imagery/kiksuya.jpg",
    alt: "The Kiksuya theatre dashboard with doctrine zones and an audit log.",
    proof: [
      { label: "Scale", value: "Squadron" },
      { label: "Policy", value: "Hierarchical" },
      { label: "Memory", value: "Federated" },
    ],
  },
};

/* ---- Architecture diagram model (top altitude to bottom) ---- */

export interface DiagramBand {
  slug: StackProductSlug;
  altitude: string;
  job: string;
  proof?: string;
}

export const DIAGRAM_BANDS: DiagramBand[] = [
  {
    slug: "kiksuya",
    altitude: "Squadron",
    job: "Doctrine, authority, audit",
    proof: "Frame-level audit",
  },
  {
    slug: "tenere",
    altitude: "Operator",
    job: "Composes the mission",
    proof: "≤12 vehicles / operator",
  },
  {
    slug: "skyanchor",
    altitude: "On-vehicle",
    job: "Position without GPS",
  },
];

export interface DiagramExchange {
  /** Flows down (intent / command) between this band and the next. */
  down: string;
  /** Flows up (situation / audit) between this band and the next. */
  up: string;
}

export const DIAGRAM_EXCHANGES: DiagramExchange[] = [
  { down: "intent + doctrine", up: "audit" },
  { down: "sortie graph", up: "pose + confidence" },
];

export const DIAGRAM_TOP = "Operator intent · published doctrine";
export const DIAGRAM_BOTTOM = "Autonomous action · confidence posture";
