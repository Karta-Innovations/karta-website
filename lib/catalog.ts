export interface SpecRowData {
  label: string;
  value: string;
  unit?: string;
}

export type PlatformSlug = "kari" | "cerana" | "dorsata";

export interface Vehicle {
  slug: PlatformSlug;
  name: string;
  family: string;
  /** Three short descriptors that anchor the platform's character. */
  descriptors: [string, string, string];
  byline: string;
  description: string;
  image: string;
  /**
   * Optional flight-video loop, e.g. "/video/cerana-flight.mp4". When set, the
   * vehicle detail hero plays it muted + looped with `image` as the poster /
   * fallback. Leave undefined to keep the still image. See SOLUTIONS-ASSETS.md.
   */
  video?: string;
  capabilities: string[];
  doctrine: string;
  specs: SpecRowData[];
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

export const VEHICLES: Vehicle[] = [
  {
    slug: "kari",
    name: "Kari",
    family: "Apis · short-range scout",
    descriptors: ["Nimble", "Modular", "Precise"],
    byline:
      "A compact quadrotor built for surveillance where agility, adaptability, and precision matter most.",
    description:
      "Kari is the smallest member of the Apis family. Its streamlined form factor is engineered for tight spaces and stable flight in complex environments, with mission-specific payloads that swap quickly in the field. Kari is where Karta's autonomy stack runs on the smallest possible airframe - the proof that the Edge layer is real.",
    image: "/imagery/kari.jpeg",
    capabilities: [
      "Single-operator launch with sub-2-minute setup",
      "Rapid payload reconfiguration between sorties",
      "Encrypted-link comms with autonomous fallback posture",
      "Full Edge stack on board, no GNSS dependency",
    ],
    doctrine:
      "Kari is built for short-range surveillance and reconnaissance. When it carries a designation payload, the effect decision stays with a human and is logged against doctrine in Kiksuya. The airframe never decides on its own.",
    specs: [
      { label: "Configuration", value: "Quadrotor" },
      { label: "Size", value: "11–13", unit: "in" },
      { label: "MTOW", value: "4", unit: "kg" },
      { label: "Payload", value: "450", unit: "g" },
      { label: "Endurance", value: "35+", unit: "min" },
      { label: "Comms range", value: "10", unit: "km · encrypted" },
      { label: "Service ceiling", value: "1.5", unit: "km AGL" },
      { label: "Max speed", value: "15", unit: "m/s" },
      { label: "Propulsion", value: "Brushless electric" },
      { label: "Launch / recovery", value: "Autonomous VTOL" },
    ],
  },
  {
    slug: "cerana",
    name: "Cerana",
    family: "Apis · long-endurance fixed wing",
    descriptors: ["Enduring", "Agile", "Dependable"],
    byline:
      "A hybrid VTOL fixed-wing built from the ground up. Endurance and manoeuvrability shaped by years of aircraft design.",
    description:
      "Cerana is a tailless fixed-wing platform engineered for sortie endurance and the manoeuvrability operators actually use. Every detail is shaped by the realities of field operations - rapid deployment, dependable performance, minimal friction between setup and mission-ready. Cerana carries the reference build of the Karta autonomy stack.",
    image: "/imagery/cerana.jpeg",
    capabilities: [
      "Hybrid VTOL - vertical takeoff, fixed-wing cruise",
      "Tailless airframe optimised for low-radar-cross-section sorties",
      "Long-loiter watchstanding across denied terrain",
      "Reference platform for SkyAnchor + TENERE integration",
    ],
    doctrine:
      "Cerana flies bounded sortie graphs composed in TENERE. Long-loiter watchstanding is its primary mode. Where a sortie includes designation or handoff, every step carries the doctrine clause that authorized it, and the authority stays human.",
    specs: [
      { label: "Configuration", value: "Hybrid fixed-wing VTOL" },
      { label: "Wingspan", value: "2,200", unit: "mm" },
      { label: "MTOW", value: "8", unit: "kg" },
      { label: "Payload", value: "2", unit: "kg" },
      { label: "Endurance", value: "100+", unit: "min" },
      { label: "Comms range", value: "40", unit: "km · encrypted" },
      { label: "Service ceiling", value: "3,000", unit: "m AGL" },
      { label: "Wind resistance", value: "Level 5", unit: "35 kn" },
      { label: "Propulsion", value: "Brushless electric" },
      { label: "Launch / recovery", value: "Autonomous VTOL" },
    ],
  },
  {
    slug: "dorsata",
    name: "Dorsata",
    family: "Apis · heavy multirotor",
    descriptors: ["Persistent", "Capable", "Modular"],
    byline:
      "A medium multirotor for heavier payloads and long-loiter missions where rotor lift earns the watch.",
    description:
      "Dorsata is the heavy-lift multirotor in the Apis family. It carries larger sensor packages - visual, thermal, mmWave - and watches longer than any other multirotor in its class. Where Kari is a scout and Cerana is a fixed-wing watchstander, Dorsata is the mid-envelope platform that brings multirotor lift to long-loiter sorties.",
    image: "/imagery/dorsata.png",
    capabilities: [
      "Heavier sensor payloads - visual, LWIR, mmWave",
      "Long-loiter multirotor envelope, 90+ min on station",
      "Sustained operation in monsoon and high-altitude regimes",
      "Reference heavy-multirotor for the Karta autonomy stack",
    ],
    doctrine:
      "Dorsata composes sorties in TENERE. It is operated for long-watch ISR, inspection, and logistics. When it carries a delivery payload, the drop is a planned, authorized action on the sortie graph, audited like any other.",
    specs: [
      { label: "Configuration", value: "Multirotor" },
      { label: "Size", value: "21–23", unit: "in" },
      { label: "MTOW", value: "10", unit: "kg" },
      { label: "Payload", value: "4", unit: "kg max" },
      { label: "Endurance", value: "90+", unit: "min" },
      { label: "Comms range", value: "20", unit: "km · encrypted" },
      { label: "Wind resistance", value: "Level 5", unit: "35 kn" },
      { label: "Propulsion", value: "Brushless electric" },
      { label: "Launch / recovery", value: "Autonomous VTOL" },
    ],
  },
];

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
    altitude: "On-vehicle · sub-50ms",
    byline: "GPS-denied positioning. Terrain-relative, visual-inertial, sealed.",
    description:
      "SkyAnchor is the on-vehicle positioning system. It fuses visual-inertial odometry, terrain-relative navigation, and barometric integration into a single posed estimate with calibrated uncertainty - usable for the duration of a sortie without any GNSS contact.",
    image: "/imagery/skyanchor.jpeg",
    problem:
      "GNSS is the single most fragile dependency in the autonomy stack. Jamming, urban canyons, and high-latitude operation all silence it. Without a substitute, the vehicle stops being useful.",
    approach:
      "SkyAnchor runs as a single deterministic process on-vehicle. There is no cloud, no model download, no online learning. The fusion is exposed as a service with explicit confidence intervals, so downstream consumers can reason about pose uncertainty instead of pretending it doesn't exist.",
    capabilities: [
      "Visual-inertial odometry with multi-camera support",
      "Terrain-relative navigation against on-board map tiles",
      "Bounded drift on terrain-relative fix",
      "Bounded behaviour as confidence degrades",
      "Deterministic - no online learning in the flight loop",
    ],
    integrations: [
      "Kari, Cerana, Dorsata",
      "Third-party PX4-class autopilots",
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
      "TENERE is the operator's mission composer. It turns intent - a goal, a geometry, a set of bounds - into a sortie graph executable across one or many vehicles. It is what makes one operator viable at fleet scale.",
    image: "/imagery/tenere.png",
    problem:
      "Operator cognitive bandwidth is finite. Naively, a fleet just multiplies the operator's workload. The solution is not to remove the operator. It is to compose mission intent at a higher level of abstraction and surface only the decisions that need a human.",
    approach:
      "TENERE is a constraint solver wrapped in an editor. Operators express what they want as bounded intent; TENERE deconflicts, plans, and runs the sortie graph. Every action is reversible. Every decision the operator did not see was provably out-of-scope of what they asked.",
    capabilities: [
      "Mission graph composition with explicit bounds",
      "Multi-vehicle deconfliction at composition time",
      "After-action telemetry and decision audit at frame rate",
      "Doctrine-aware planning surface operators can read and edit",
      "One operator scales to a squadron of vehicles",
    ],
    integrations: [
      "Karta Apis family",
      "Kiksuya doctrine runtime",
      "Standard military comms stacks",
    ],
    posture: [
      { label: "Vehicles per operator", value: "up to 12" },
      { label: "Doctrine encoding", value: "Kiksuya policy" },
      { label: "After-action audit", value: "Frame-level" },
      { label: "Latency budget", value: "200", unit: "ms" },
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
    image: "/imagery/kiksuya.png",
    problem:
      "Doctrine in most autonomy stacks is a slide deck. It is not enforced by the code, it is not versioned, and it cannot be audited after the fact. That gap is where bad outcomes happen. The same goes for institutional memory across sorties - most stacks forget.",
    approach:
      "Kiksuya is a runtime that takes operator intent and a published doctrine, and produces an executable plan annotated with which doctrine clauses authorise which step. The annotation is logged at telemetry frame rate, federated across echelons, and survives the sortie. Doctrine becomes a property of the running plan, not a checkbox on a slide.",
    capabilities: [
      "Doctrine encoded as versioned, signed policy",
      "Per-action authority audit trail",
      "Plan-level dry-run with explicit clause attribution",
      "Federated memory across echelons and bases",
      "Procurement-grade traceability from contract to flight",
    ],
    integrations: [
      "TENERE planner",
      "Karta Apis family",
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

export function getVehicle(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}

export function getStackLayer(slug: string): StackLayer | undefined {
  return STACK_LAYERS.find((l) => l.slug === slug);
}
