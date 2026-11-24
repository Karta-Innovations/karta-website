/**
 * TENERE and the integration stack, as set out in the November 2026 company
 * introduction and the SkyAnchor technical overview. The roadmap is not
 * published on the site, so only what flies today is listed here.
 */

export const TENERE = {
  name: "TENERE",
  kind: "Swarm-native ground control station",
  status: "In production",
  headline: ["Ground control,", "built for swarms."],
  lede: "Operators set goals and limits. TENERE plans, deconflicts vehicles and adapts within them, on any MAVLink-enabled vehicle.",
  features: [
    {
      n: "01",
      title: "Mission graphs with explicit bounds",
      body: "Waypoints, heights and the geofence volume are drawn in three dimensions before anything flies.",
    },
    {
      n: "02",
      title: "Multi-vehicle deconfliction",
      body: "Conflicts between vehicles are resolved as the plan is composed, not discovered in the air.",
    },
    {
      n: "03",
      title: "After-action telemetry and decision audit",
      body: "A time-stamped record of what each vehicle did and when, kept for review.",
    },
    {
      n: "04",
      title: "A planning surface operators can edit",
      body: "Every leg shows its height and distance, and stays readable and editable by the operator.",
    },
  ],
  modules: ["Swarm engine", "Indian grid system", "3D map generation", "Terminal guidance", "Object detection and tracking"],
} as const;

export interface StackLayer {
  name: string;
  product?: string;
  detail?: string;
  state: "now" | "yours";
}

export const STACK_KARTA: StackLayer[] = [
  { name: "Operators and command", product: "TENERE", state: "now" },
  { name: "Mission autonomy", state: "now" },
  { name: "Perception and navigation", product: "SkyAnchor", state: "now" },
];

export const STACK_YOURS: StackLayer[] = [
  { name: "Your autopilot", detail: "PX4, ArduPilot or another", state: "yours" },
  { name: "Your platform", detail: "Airframe, propulsion and sensors", state: "yours" },
];

export const STACK_NOTES = [
  { title: "What stays yours", body: "Your airframe and your autopilot: PX4, ArduPilot or another." },
  { title: "What Karta adds", body: "Navigation, mission autonomy and command, above the seam." },
  { title: "How they meet", body: "Over MAVLink, with mounting customised or modular to suit your aircraft." },
];

export const COMPANY = {
  statement: "A world-class robotics company out of India, solving India’s autonomy bottleneck.",
  pillars: [
    {
      label: "Vision",
      body: "India’s autonomy stack: the intelligence layer that lets unmanned systems perceive, understand, navigate and decide for themselves.",
    },
    {
      label: "Why now",
      body: "As hardware commoditises, the advantage moves to the software, the data and the autonomy stack.",
    },
    {
      label: "Team",
      body: "Experts and PhDs with experience at major drone and autonomy companies in the US and Europe.",
    },
  ],
} as const;
