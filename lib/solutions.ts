import type { PlatformSlug } from "./catalog";

/**
 * Solutions layer - the applications-led model that sits on top of the
 * platforms (lib/catalog.ts). Two verticals, a shared payload kit, and the
 * applications each payload unlocks. Drives /enterprise, /defense, the
 * homepage Solutions band, and the interactive mission console.
 */

export type VerticalId = "enterprise" | "defense";

export type PayloadCategory =
  | "Imaging"
  | "Mapping"
  | "Spectral"
  | "Radar"
  | "RF"
  | "Ranging"
  | "Logistics";

export interface Payload {
  slug: string;
  /** Full name for the payload catalog. */
  name: string;
  category: PayloadCategory;
  /** One line: what it senses or does. */
  senses: string;
  /** Short label used on chips and the console rail. */
  chipLabel: string;
  platformSlugs: PlatformSlug[];
  /** True for designation + delivery - framed as human-authorized, doctrine-bound. */
  doctrineSensitive?: boolean;
}

export interface ApplicationMetric {
  value: string;
  label: string;
}

export interface Application {
  slug: string;
  vertical: VerticalId;
  /** Outcome-led name, not a feature name. */
  name: string;
  /** One paragraph in mission-control register. */
  blurb: string;
  payloadSlugs: string[];
  platformSlugs: PlatformSlug[];
  /** Headline metric shown in the console focus panel. */
  metric: ApplicationMetric;
  /** Flagship applications render as full cards; the rest as a condensed list. */
  flagship: boolean;
}

export interface ProofPillar {
  title: string;
  body: string;
}

export interface VerticalConfig {
  id: VerticalId;
  label: string;
  eyebrow: string;
  /** Outcome headline for the hero. */
  heroTitle: string;
  heroLede: string;
  /** The wedge - 3-4 reasons Karta wins this vertical. */
  pillars: ProofPillar[];
  /** Per-vertical framing of the autonomy stack band. */
  stackEmphasis: string;
  closingTitle: string;
  closingBody: string;
}

/* ------------------------------------------------------------------ */
/*  Payloads - the modular sensing + effect kit the Apis family carries */
/* ------------------------------------------------------------------ */

export const PAYLOADS: Payload[] = [
  {
    slug: "eoir",
    name: "EO/IR gimbal",
    category: "Imaging",
    senses:
      "Daylight zoom and LWIR thermal. Detect, classify and track, day or night.",
    chipLabel: "EO/IR",
    platformSlugs: ["kari", "cerana", "dorsata"],
  },
  {
    slug: "lidar",
    name: "LiDAR",
    category: "Mapping",
    senses:
      "3D point clouds, volumetrics, structure and terrain models, canopy penetration.",
    chipLabel: "LiDAR",
    platformSlugs: ["dorsata", "cerana"],
  },
  {
    slug: "photogrammetry",
    name: "Photogrammetry camera",
    category: "Mapping",
    senses:
      "High-resolution ortho and oblique imagery for orthomosaics and digital twins.",
    chipLabel: "Photogrammetry",
    platformSlugs: ["cerana", "dorsata", "kari"],
  },
  {
    slug: "multispectral",
    name: "Multispectral / hyperspectral",
    category: "Spectral",
    senses:
      "Crop, vegetation and material signatures across bands the eye cannot see.",
    chipLabel: "Multispectral",
    platformSlugs: ["cerana", "dorsata"],
  },
  {
    slug: "mmwave",
    name: "mmWave / SAR-lite radar",
    category: "Radar",
    senses:
      "See through dust, smoke, fog and light foliage. All-weather detection and ground movement.",
    chipLabel: "mmWave",
    platformSlugs: ["cerana", "dorsata"],
  },
  {
    slug: "methane",
    name: "Gas / methane detector",
    category: "Spectral",
    senses: "TDLAS leak detection for pipelines, tanks and landfills.",
    chipLabel: "Methane",
    platformSlugs: ["cerana", "dorsata"],
  },
  {
    slug: "rf",
    name: "RF / SIGINT survey",
    category: "RF",
    senses: "Emitter mapping, spectrum and interference survey.",
    chipLabel: "RF/SIGINT",
    platformSlugs: ["cerana", "dorsata"],
  },
  {
    slug: "comms",
    name: "Comms relay / mesh node",
    category: "RF",
    senses:
      "Extend the network and hold the link across denied or remote terrain.",
    chipLabel: "Comms relay",
    platformSlugs: ["cerana", "dorsata"],
  },
  {
    slug: "designate",
    name: "Laser rangefinder / designation",
    category: "Ranging",
    senses:
      "Precise geolocation and target designation for human-authorized handoff. Never autonomous strike.",
    chipLabel: "Designation",
    platformSlugs: ["kari", "cerana"],
    doctrineSensitive: true,
  },
  {
    slug: "delivery",
    name: "Cargo / delivery module",
    category: "Logistics",
    senses:
      "Supply, medical and sensor-emplacement drop to sites cut off by terrain.",
    chipLabel: "Delivery",
    platformSlugs: ["dorsata", "cerana"],
    doctrineSensitive: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Applications - what the payloads enable, split by vertical         */
/* ------------------------------------------------------------------ */

export const APPLICATIONS: Application[] = [
  /* ---- Enterprise ---- */
  {
    slug: "energy-utilities",
    vertical: "enterprise",
    name: "Energy & utilities inspection",
    blurb:
      "Power lines, transmission towers, substations, solar and wind. Close-in condition assessment without rope access or a grounded crew, in the cluttered, signal-poor sites where commercial fleets drift.",
    payloadSlugs: ["eoir", "lidar"],
    platformSlugs: ["kari", "dorsata"],
    metric: { value: "10×", label: "faster than rope access" },
    flagship: true,
  },
  {
    slug: "oil-gas",
    vertical: "enterprise",
    name: "Oil, gas & pipeline integrity",
    blurb:
      "Survey the corridor, find the leak, inspect the tank and flare. Methane detection and all-weather sensing across the long, remote runs that ground patrols cover slowly and at risk.",
    payloadSlugs: ["methane", "eoir", "mmwave"],
    platformSlugs: ["cerana", "dorsata"],
    metric: { value: "40 km", label: "corridor per sortie" },
    flagship: true,
  },
  {
    slug: "mining",
    vertical: "enterprise",
    name: "Mining & aggregates",
    blurb:
      "Stockpile volumetrics, pit and bench survey, haul-road and tailings-dam monitoring. Centimetre-grade models from terrain that blocks GPS and weather that stops other aircraft.",
    payloadSlugs: ["lidar", "photogrammetry", "multispectral"],
    platformSlugs: ["dorsata", "cerana"],
    metric: { value: "cm", label: "volumetric accuracy" },
    flagship: true,
  },
  {
    slug: "construction",
    vertical: "enterprise",
    name: "Construction & infrastructure",
    blurb:
      "Progress digital twins, bridge and structure condition, as-built versus design. A repeatable, audited record of the site on a cadence you set.",
    payloadSlugs: ["photogrammetry", "lidar", "eoir"],
    platformSlugs: ["kari", "dorsata"],
    metric: { value: "weekly", label: "digital twin" },
    flagship: true,
  },
  {
    slug: "mapping",
    vertical: "enterprise",
    name: "Mapping & geospatial survey",
    blurb:
      "Wide-area orthomosaics, terrain models and corridor mapping. One long-endurance sortie covers ground that takes a survey team days.",
    payloadSlugs: ["photogrammetry", "lidar"],
    platformSlugs: ["cerana"],
    metric: { value: "100+ min", label: "wide-area sortie" },
    flagship: true,
  },
  {
    slug: "public-safety",
    vertical: "enterprise",
    name: "Public safety & emergency response",
    blurb:
      "Wildfire mapping, flood and disaster assessment, incident awareness. Day, night and through smoke, with a relay that keeps the picture live for the teams on the ground.",
    payloadSlugs: ["eoir", "mmwave", "comms"],
    platformSlugs: ["dorsata", "cerana"],
    metric: { value: "all-weather", label: "day and night" },
    flagship: true,
  },
  {
    slug: "agriculture",
    vertical: "enterprise",
    name: "Agriculture & forestry",
    blurb:
      "Crop health and yield, irrigation stress, forest health and anti-logging watch across spectral bands.",
    payloadSlugs: ["multispectral", "eoir"],
    platformSlugs: ["cerana", "dorsata"],
    metric: { value: "per-acre", label: "crop health" },
    flagship: false,
  },
  {
    slug: "search-rescue",
    vertical: "enterprise",
    name: "Search & rescue",
    blurb:
      "Thermal search in remote, low-visibility terrain, a comms relay to the team, and a supply drop to people once they are found.",
    payloadSlugs: ["eoir", "comms", "delivery"],
    platformSlugs: ["dorsata", "kari"],
    metric: { value: "thermal", label: "low-visibility search" },
    flagship: false,
  },
  {
    slug: "logistics",
    vertical: "enterprise",
    name: "Logistics & remote resupply",
    blurb:
      "Medical, supply and sensor-emplacement delivery to sites cut off by terrain or disaster, point to point, without a road.",
    payloadSlugs: ["delivery"],
    platformSlugs: ["dorsata", "cerana"],
    metric: { value: "point-to-point", label: "cut-off sites" },
    flagship: false,
  },
  {
    slug: "ports-rail",
    vertical: "enterprise",
    name: "Ports, rail & transport",
    blurb:
      "Perimeter and asset monitoring, rail-corridor inspection, port and yard awareness on an autonomous patrol.",
    payloadSlugs: ["eoir", "lidar", "mmwave"],
    platformSlugs: ["cerana", "dorsata"],
    metric: { value: "perimeter", label: "autonomous patrol" },
    flagship: false,
  },
  {
    slug: "telecom",
    vertical: "enterprise",
    name: "Telecom infrastructure",
    blurb:
      "Tower and antenna inspection, RF and spectrum survey, and network planning imagery.",
    payloadSlugs: ["eoir", "rf", "photogrammetry"],
    platformSlugs: ["kari", "dorsata"],
    metric: { value: "tower", label: "close inspection" },
    flagship: false,
  },

  /* ---- Defense ---- */
  {
    slug: "persistent-isr",
    vertical: "defense",
    name: "Persistent ISR",
    blurb:
      "Long-loiter watchstanding over wide, contested terrain. One operator holds the picture while the airframe holds the sky.",
    payloadSlugs: ["eoir", "mmwave"],
    platformSlugs: ["cerana"],
    metric: { value: "100+ min", label: "on station" },
    flagship: true,
  },
  {
    slug: "border-surveillance",
    vertical: "defense",
    name: "Border & frontier surveillance",
    blurb:
      "Line-watch and intrusion detection across denied, high-altitude frontier where GPS is unreliable and the weather is not forgiving.",
    payloadSlugs: ["eoir", "mmwave"],
    platformSlugs: ["cerana", "dorsata"],
    metric: { value: "40 km", label: "encrypted link" },
    flagship: true,
  },
  {
    slug: "force-protection",
    vertical: "defense",
    name: "Force protection & base security",
    blurb:
      "Autonomous perimeter patrol and intrusion response. Continuous coverage without continuous attention.",
    payloadSlugs: ["eoir", "mmwave", "comms"],
    platformSlugs: ["kari", "dorsata"],
    metric: { value: "24/7", label: "rotation" },
    flagship: true,
  },
  {
    slug: "convoy-overwatch",
    vertical: "defense",
    name: "Route & convoy overwatch",
    blurb:
      "Ahead-of-column reconnaissance. Ambush, obstacle and movement spotting before the convoy arrives.",
    payloadSlugs: ["eoir", "mmwave"],
    platformSlugs: ["kari", "cerana"],
    metric: { value: "15 km", label: "look-ahead" },
    flagship: true,
  },
  {
    slug: "recon-handoff",
    vertical: "defense",
    name: "Recon, designation & handoff",
    blurb:
      "Detect, classify, geolocate and designate for human-authorized handoff. Doctrine-gated and audited through Kiksuya, never an autonomous strike.",
    payloadSlugs: ["eoir", "designate"],
    platformSlugs: ["kari", "cerana"],
    metric: { value: "<1.2 m", label: "geolocation drift" },
    flagship: true,
  },
  {
    slug: "comms-mesh",
    vertical: "defense",
    name: "Comms relay & resilient mesh",
    blurb:
      "Extend the network and hold the link under EW and jamming, where fixed infrastructure cannot reach.",
    payloadSlugs: ["comms"],
    platformSlugs: ["cerana", "dorsata"],
    metric: { value: "EW-tolerant", label: "mesh link" },
    flagship: true,
  },
  {
    slug: "maritime",
    vertical: "defense",
    name: "Maritime domain awareness",
    blurb:
      "Littoral watch and small-vessel detection across the surface picture, all-weather.",
    payloadSlugs: ["eoir", "mmwave"],
    platformSlugs: ["cerana"],
    metric: { value: "littoral", label: "vessel detection" },
    flagship: false,
  },
  {
    slug: "counter-uas",
    vertical: "defense",
    name: "Counter-UAS cueing",
    blurb:
      "Detect and track small UAS and cue effectors. Sensing and cueing only, the kinetic decision stays with the human.",
    payloadSlugs: ["rf", "eoir"],
    platformSlugs: ["cerana", "dorsata"],
    metric: { value: "detect + cue", label: "airspace" },
    flagship: false,
  },
  {
    slug: "bda",
    vertical: "defense",
    name: "Battle damage assessment",
    blurb:
      "Rapid post-event reconnaissance and structured imagery for assessment. Sensing only.",
    payloadSlugs: ["eoir", "photogrammetry"],
    platformSlugs: ["cerana"],
    metric: { value: "rapid", label: "post-event recce" },
    flagship: false,
  },
  {
    slug: "csar",
    vertical: "defense",
    name: "Combat SAR support",
    blurb:
      "Locate, relay and deliver. Thermal search, a held link and a supply drop in support of recovery.",
    payloadSlugs: ["eoir", "comms", "delivery"],
    platformSlugs: ["dorsata"],
    metric: { value: "locate + relay", label: "recovery" },
    flagship: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Vertical configuration                                             */
/* ------------------------------------------------------------------ */

export const VERTICALS: Record<VerticalId, VerticalConfig> = {
  enterprise: {
    id: "enterprise",
    label: "Enterprise",
    eyebrow: "Enterprise solutions",
    heroTitle: "Inspect, map and monitor where other drones lose the signal.",
    heroLede:
      "One autonomy stack across energy, infrastructure, resources and response. The airframes that hold a watch in contested airspace also work the sites your operation cannot afford to get wrong.",
    pillars: [
      {
        title: "Works GPS-denied",
        body: "Substations, mine pits, under canopy, dense structure. SkyAnchor holds a fix with no satellite contact.",
      },
      {
        title: "All-weather, all-terrain",
        body: "Monsoon, high altitude, dust and heat. Tested across the envelopes that ground commercial fleets.",
      },
      {
        title: "One operator, many vehicles",
        body: "TENERE composes the sortie. One person runs the survey, not one person per drone.",
      },
      {
        title: "Audited by default",
        body: "Every sortie and decision logged and signed. Compliance and repeatability built in, not bolted on.",
      },
    ],
    stackEmphasis:
      "The Edge, Command and Theatre layers that make Karta dependable in contested airspace give enterprise teams repeatable, audited results.",
    closingTitle: "Put it to work on your sites.",
    closingBody:
      "Tell us the asset, the terrain and the cadence. We will scope the payload and the platform.",
  },
  defense: {
    id: "defense",
    label: "Defense",
    eyebrow: "Defense solutions",
    heroTitle: "Persistent eyes in contested, GPS-denied airspace.",
    heroLede:
      "ISR, overwatch and resilient comms that hold up where the link is jammed and the satellites are silent. Accountable autonomy under human intent, audited from contract to flight.",
    pillars: [
      {
        title: "GPS-denied by design",
        body: "Jamming and spoofing do not ground the mission. SkyAnchor flies the sortie on terrain and vision alone.",
      },
      {
        title: "One operator, a squadron",
        body: "TENERE turns intent into a deconflicted sortie graph across up to twelve vehicles.",
      },
      {
        title: "Doctrine-bound and audited",
        body: "Kiksuya enforces rules of engagement as signed policy. Every action carries the clause that authorized it.",
      },
      {
        title: "Tested in the envelope",
        body: "High altitude, arid, littoral and contested. Built close to the field, not the lab.",
      },
    ],
    stackEmphasis:
      "Edge holds position without GPS, Command scales one operator to a squadron, Theatre keeps doctrine and memory across echelons.",
    closingTitle: "Bring it to your theatre.",
    closingBody:
      "Tell us the mission and the bounds. We will bring the platform, the payload and the audit trail.",
  },
};

export const VERTICAL_IDS: VerticalId[] = ["enterprise", "defense"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getVertical(id: string): VerticalConfig | undefined {
  return VERTICAL_IDS.includes(id as VerticalId)
    ? VERTICALS[id as VerticalId]
    : undefined;
}

export function getApplicationsByVertical(vertical: VerticalId): Application[] {
  return APPLICATIONS.filter((a) => a.vertical === vertical);
}

export function getFlagshipApplications(vertical: VerticalId): Application[] {
  return getApplicationsByVertical(vertical).filter((a) => a.flagship);
}

export function getPayload(slug: string): Payload | undefined {
  return PAYLOADS.find((p) => p.slug === slug);
}

/** Payloads referenced by at least one application in the vertical, in PAYLOADS order. */
export function getPayloadsForVertical(vertical: VerticalId): Payload[] {
  const used = new Set(
    getApplicationsByVertical(vertical).flatMap((a) => a.payloadSlugs),
  );
  return PAYLOADS.filter((p) => used.has(p.slug));
}

/** Applications in a vertical that use a given payload. */
export function applicationsForPayload(
  payloadSlug: string,
  vertical: VerticalId,
): Application[] {
  return getApplicationsByVertical(vertical).filter((a) =>
    a.payloadSlugs.includes(payloadSlug),
  );
}
