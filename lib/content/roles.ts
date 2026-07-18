export interface Role {
  slug: string;
  title: string;
  team: string;
  location: string;
  seniority: string;
  postedAt: string;
  status: "open" | "closed";
  summary: string;
  doYou: string[];
  responsibilities: string[];
  niceToHave: string[];
  contact: string;
}

export const ROLES: Role[] = [
  {
    slug: "edge-perception-engineer",
    title: "Edge perception engineer",
    team: "Edge stack",
    location: "On-site",
    seniority: "Mid → senior",
    postedAt: "2026-05-10",
    status: "open",
    summary:
      "Own the perception subsystem on unmanned platforms. Visual-inertial, thermal, mmWave radar fusion under tight power and latency budgets. You will ship code that flies in validated operating envelopes.",
    doYou: [
      "Have shipped a perception system to a production embedded target",
      "Read accelerometer and gyro datasheets for fun",
      "Care more about calibrated uncertainty than benchmark headlines",
      "Want to see what you write operate in contested conditions",
    ],
    responsibilities: [
      "Own the perception pipeline across multiple validated platform integrations",
      "Define and enforce on-platform uncertainty calibration and confidence bounds",
      "Drive sensor selection and integration on new unmanned systems",
      "Field-deploy and field-debug across the operational envelope",
    ],
    niceToHave: [
      "ROS / DDS exposure",
      "Field experience in monsoon or high-altitude regimes",
      "Familiarity with state-estimation literature beyond textbook EKF",
    ],
    contact: "info@kartainnovations.com",
  },
  {
    slug: "command-systems-engineer",
    title: "Command systems engineer",
    team: "TENERE",
    location: "On-site · hybrid",
    seniority: "Senior",
    postedAt: "2026-05-12",
    status: "open",
    summary:
      "Build the mission composer that lets operators command fleets within validated bounds. Constraint solving, mission graphs, after-action audit at telemetry-frame rate. You will design the interface operators use in the worst hours of their day.",
    doYou: [
      "Have built a system humans rely on in high-stakes situations",
      "Treat cognitive bandwidth as a hard constraint, not a UX detail",
      "Believe planners should be auditable, not just performant",
      "Have read enough field reports to know what failure mode you are designing against",
    ],
    responsibilities: [
      "Architect TENERE's mission graph + constraint solver",
      "Define the after-action audit surface from telemetry to PDF and inspection tools",
      "Partner with Edge and Doctrine teams on integration contracts",
      "Ride along on field deployments to ground designs in operating reality",
    ],
    niceToHave: [
      "Background in optimisation, planning, or formal methods",
      "Experience with mission-critical UI and control systems",
      "Working knowledge of defence procurement and system integration",
    ],
    contact: "info@kartainnovations.com",
  },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
