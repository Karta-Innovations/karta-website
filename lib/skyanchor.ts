/**
 * SkyAnchor product facts. Specifications are the ones printed in the
 * November 2026 SkyAnchor film and technical overview; change them here only
 * when the source documents change.
 *
 * How SkyAnchor navigates is proprietary. Nothing here explains the method,
 * and the specification leaves out the rows that would.
 */

export const SKYANCHOR = {
  name: "SkyAnchor",
  partNumber: "KA-SEN-2604-A",
  kind: "Visual navigation module",
  status: "In production",
  headline: "Built where GPS ends.",
  lede: "End-to-end operation without GPS: take-off, flight and landing inside jammed and spoofed airspace. One sealed module, sensor and compute, customised or modular to suit your aircraft.",
} as const;

export const SKYANCHOR_FIGURES = [
  { value: "100 × 114 × 51", unit: "mm", label: "Size" },
  { value: "280", unit: "g", label: "Mass" },
  { value: "12", unit: "V", label: "Power input" },
  { value: "5 to 10", unit: "Hz", label: "Update rate" },
] as const;

/** What it means on the aircraft. How SkyAnchor navigates is proprietary and is not described on the site. */
export const SKYANCHOR_PROPERTIES = [
  {
    label: "Passive",
    title: "No radio signal to jam or spoof.",
    body: "It transmits nothing and listens for nothing. There is no signal to deny and none to forge.",
  },
  {
    label: "Self-contained",
    title: "Everything it needs is on board.",
    body: "No link to the ground station is needed to hold a position.",
  },
  {
    label: "Sustained",
    title: "Accuracy that holds for the whole flight.",
    body: "5.6 m median after 32 minutes without GPS input, against the aircraft’s own GPS.",
  },
] as const;

export const SKYANCHOR_CALLOUTS = [
  { n: "1", label: "Downward camera", x: 77.5, y: 67.5 },
  { n: "2", label: "Sealed enclosure", x: 21, y: 50 },
  { n: "3", label: "Mounting points", x: 25, y: 6 },
  { n: "4", label: "Compute inside", x: 50, y: 33 },
] as const;

export interface SpecGroup {
  title: string;
  rows: { k: string; v: string }[];
}

export const SKYANCHOR_SPECS: SpecGroup[] = [
  {
    title: "Navigation",
    rows: [
      { k: "Method", v: "Visual navigation" },
      { k: "Output", v: "Position, heading and uncertainty" },
      { k: "Update rate", v: "5 to 10 Hz" },
      { k: "Accuracy", v: "5.6 m median · 25 m P98" },
    ],
  },
  {
    title: "Integration",
    rows: [
      { k: "Autopilots", v: "PX4 and ArduPilot; others on request" },
      { k: "Link", v: "MAVLink" },
      { k: "Airframes", v: "Quadrotors, VTOL and fixed-wing" },
      { k: "Mounting", v: "Customised or modular, to suit the aircraft" },
    ],
  },
  {
    title: "Hardware",
    rows: [
      { k: "Enclosure", v: "Sealed, on-vehicle" },
      { k: "Compute", v: "Embedded ARM processor, GPU-accelerated" },
      { k: "Camera", v: "Downward; multi-camera support" },
      { k: "Mass", v: "280 grams" },
      { k: "Size", v: "100 × 114 × 51 mm" },
      { k: "Power input", v: "12 V" },
    ],
  },
  {
    title: "Environment",
    rows: [
      { k: "Altitude", v: "Flown to about 2,500 m above take-off" },
      { k: "Lighting", v: "Day and low light; full dark in testing" },
      { k: "Temperature", v: "−20 to 40 °C" },
    ],
  },
];
