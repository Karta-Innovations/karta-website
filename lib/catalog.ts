export interface SpecRowData {
  label: string;
  value: string;
  unit?: string;
}

export type StackLayerId = "edge" | "command" | "theatre";
export type StackProductSlug = "skyanchor" | "tenere" | "kiksuya";

export interface StackLayer {
  number: "L1" | "L2" | "L3";
  layer: "Edge" | "Command" | "Theatre";
  product: "SkyAnchor" | "TENERE" | "Kiksuya";
  slug: StackProductSlug;
  altitude: string;
  byline: string;
  description: string;
  image: string;
  problem: string;
  approach: string;
  capabilities: string[];
  integrations: string[];
  posture: SpecRowData[];
}

/**
 * The Karta autonomy stack.
 * Three altitudes of decision-making. Each layer ships as a real product.
 */
export const STACK_LAYERS: StackLayer[] = [
  {
    number: "L1",
    layer: "Edge",
    product: "SkyAnchor",
    slug: "skyanchor",
    altitude: "On-vehicle · deterministic loop",
    byline: "Positioning designed for GNSS denial. Terrain-relative, visual-inertial, sealed.",
    description:
      "SkyAnchor is the on-vehicle positioning system. It fuses visual-inertial odometry, terrain-relative navigation, and barometric integration into a single position estimate with calibrated uncertainty - designed to hold a usable estimate through sustained GNSS denial.",
    image: "/imagery/skyanchor.jpeg",
    problem:
      "GNSS is the single most fragile dependency in the autonomy stack. Jamming, urban canyons, and high-latitude operation all silence it. Without a substitute, the vehicle stops being useful.",
    approach:
      "SkyAnchor runs on the vehicle and combines onboard sensing with terrain maps to estimate position when satellite navigation is degraded. It reports both the estimate and its uncertainty, so mission software can account for how much confidence to place in the position.",
    capabilities: [
      "Visual-inertial odometry with multi-camera support",
      "Terrain-relative navigation against on-board map tiles",
      "Bounded drift on terrain-relative fix",
      "Bounded behaviour as confidence degrades",
      "Deterministic - no online learning in the flight loop",
    ],
    integrations: [
      "Third-party PX4-class autopilots",
      "Karta platform integration layer",
      "TENERE pose consumer",
    ],
    posture: [
      { label: "Compute", value: "ARM + accelerator" },
      { label: "Process", value: "Single, deterministic" },
      { label: "Map", value: "On-board tiles" },
    ],
  },
  {
    number: "L2",
    layer: "Command",
    product: "TENERE",
    slug: "tenere",
    altitude: "Operator station · ground",
    byline: "Mission composer. Prioritises the next action across vehicles.",
    description:
      "TENERE is the operator's mission composer. It turns intent - a goal, a geometry, a set of bounds - into a sortie graph executable across one or many vehicles. It is designed to make one operator viable beyond a single aircraft.",
    image: "/imagery/tenere-mission-planning.jpeg",
    problem:
      "Operator cognitive bandwidth is finite. Naively, a fleet just multiplies the operator's workload. The solution is not to remove the operator. It is to compose mission intent at a higher level of abstraction and surface only the decisions that need a human.",
    approach:
      "TENERE helps operators plan and coordinate missions across vehicles. Operators define goals, routes and approved limits; the planning interface helps them review plans, identify conflicts and adapt missions within those bounds.",
    capabilities: [
      "Mission graph composition with explicit bounds",
      "Multi-vehicle deconfliction at composition time",
      "After-action telemetry and decision audit",
      "Doctrine-aware planning surface operators can read and edit",
      "Designed for multi-vehicle command within approved bounds",
    ],
    integrations: [
      "Karta platform integration",
      "Kiksuya doctrine runtime",
      "Standard military comms stacks",
    ],
    posture: [
      { label: "Operator scaling", value: "Multi-vehicle by design" },
      { label: "Doctrine encoding", value: "Kiksuya policy" },
      { label: "After-action audit", value: "Structured, per decision" },
    ],
  },
  {
    number: "L3",
    layer: "Theatre",
    product: "Kiksuya",
    slug: "kiksuya",
    altitude: "Squadron scale · regional",
    byline: "The memory layer. Doctrine, audit and cross-echelon coordination.",
    description:
      "Kiksuya is the doctrine and memory runtime. It is where rules of engagement, geometry constraints, and authority gates live as first-class code - auditable, versioned, signed, and remembered across sorties and echelons. The name is borrowed from a word meaning to remember.",
    image: "/imagery/tenere.jpg",
    problem:
      "Doctrine in most autonomy stacks is a slide deck. It is not enforced by the code, it is not versioned, and it cannot be audited after the fact. That gap is where bad outcomes happen. The same goes for institutional memory across sorties - most stacks forget.",
    approach:
      "Kiksuya connects mission plans with the rules and approvals that govern them. It is designed to show which rule authorises each planned action and retain that context alongside the mission record, so operators can review what happened and why.",
    capabilities: [
      "Doctrine encoded as versioned, signed policy",
      "Per-action authority audit trail",
      "Plan-level dry-run with explicit clause attribution",
      "Federated memory across echelons and bases",
      "Traceability designed to reach from authorization to flight record",
    ],
    integrations: [
      "TENERE planner",
      "Karta platform integration",
      "Customer-published doctrine packs",
    ],
    posture: [
      { label: "Federation latency", value: "Seconds, not realtime" },
      { label: "Link posture", value: "Intermittent-tolerant" },
      { label: "Fleet scale", value: "Squadron · multi-base" },
      { label: "Policy composition", value: "Hierarchical" },
    ],
  },
];


export function getStackLayer(slug: string): StackLayer | undefined {
  return STACK_LAYERS.find((l) => l.slug === slug);
}
