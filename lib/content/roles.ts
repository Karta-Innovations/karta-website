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
      "Own the perception subsystem on the airframe. Visual-inertial, thermal, mmWave radar fusion under tight power and latency budgets. You will ship code that flies.",
    doYou: [
      "Have shipped a perception system to a production embedded target",
      "Read accelerometer and gyro datasheets for fun",
      "Care more about calibrated uncertainty than benchmark headlines",
      "Want to fly what you write",
    ],
    responsibilities: [
      "Own the perception pipeline across Kari, Cerana and Dorsata",
      "Define and enforce on-vehicle uncertainty calibration",
      "Drive sensor selection and integration on new airframes",
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
      "Build the mission composer that lets one operator command a fleet. Constraint solving, sortie graphs, after-action audit at telemetry-frame rate. You will design the surface operators use in the worst hours of their day.",
    doYou: [
      "Have built a system humans rely on in high-stakes situations",
      "Treat cognitive bandwidth as a hard constraint, not a UX detail",
      "Believe planners should be auditable, not just performant",
      "Have read enough field reports to know what failure mode you are designing against",
    ],
    responsibilities: [
      "Architect TENERE's mission graph + constraint solver",
      "Define the after-action audit surface from telemetry to PDF",
      "Partner with Edge and Doctrine teams on interface contracts",
      "Ride along on field deployments to ground designs in reality",
    ],
    niceToHave: [
      "Background in optimisation, planning, or formal methods",
      "Experience with mission-critical UI work",
      "Working knowledge of allied-export defence procurement",
    ],
    contact: "info@kartainnovations.com",
  },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
