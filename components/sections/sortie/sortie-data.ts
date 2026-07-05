/**
 * The Sortie — single source of truth for the fault-conditions scene.
 *
 * One flight, four compounding failures. The stage animates against these
 * timings; the log renders this copy. Timings are in milliseconds relative to
 * the start of the loop. Nominal (0..NOMINAL_MS) and the reset tail
 * (RESET_START..LOOP_MS) are stage-only segments with no log entry.
 */

export interface SortieAct {
  /** 0-based fault index. */
  id: number;
  /** Two-digit display code, e.g. "01". */
  code: string;
  /** Short fault label for the rail and log header. */
  label: string;
  /** Log entry headline. */
  title: string;
  /** Plain-language explanation (log body). */
  body: string;
  /** Telemetry chips shown when the act is active/past. */
  telemetry: { k: string; v: string }[];
  /** One-line resolution shown once the act is past. */
  resolution: string;
  /** One-line stage caption while the act is live. */
  caption: string;
  /** Loop-relative start time (ms), inclusive. */
  tStart: number;
  /** Loop-relative end time (ms), exclusive. */
  tEnd: number;
}

/** Nominal intro before the first fault. */
export const NOMINAL_MS = 6000;
/** Start of the fade-to-black reset tail. */
export const RESET_START = 44000;
/** Total loop length including the reset tail. */
export const LOOP_MS = 46000;

export const NOMINAL_CAPTION = "TRACKING · GNSS LOCK 8/8";
export const RESET_CAPTION = "SORTIE COMPLETE · NEXT SORTIE";

export const ACTS: SortieAct[] = [
  {
    id: 0,
    code: "01",
    label: "GPS denied",
    title: "Signal vanishes mid-mission.",
    body:
      "Jamming, urban canyons, or polar latitudes silence GPS. The aircraft has to keep knowing where it is from what it can see and feel on board, with no outside help.",
    telemetry: [
      { k: "GNSS lock", v: "LOST" },
      { k: "Fallback", v: "VIO + TRN" },
      { k: "Pose", v: "Bounded uncertainty" },
    ],
    resolution: "Recovered: VIO + TRN hold ±2.4 m.",
    caption: "GNSS LOST · HOLDING ON VIO + TRN",
    tStart: 6000,
    tEnd: 16000,
  },
  {
    id: 1,
    code: "02",
    label: "Comms jammed",
    title: "The link to the operator is gone.",
    body:
      "Jamming, terrain shadow, or plain distance cut the radio link. The aircraft keeps flying the mission it was given, inside the rules it was given, and reports back the moment the link returns.",
    telemetry: [
      { k: "Uplink BW", v: "0 kbps" },
      { k: "Last contact", v: "T-00:04:12" },
      { k: "Mission state", v: "CONTINUING" },
    ],
    resolution: "Link reacquired: report transmitted on return.",
    caption: "UPLINK JAMMED · FLYING THE PLAN",
    tStart: 16000,
    tEnd: 26000,
  },
  {
    id: 2,
    code: "03",
    label: "Cameras blind",
    title: "Cameras lose the world.",
    body:
      "Sandstorm, monsoon rain, smoke, night. When cameras fail, the aircraft switches to heat and radar, and keeps an honest estimate of how sure it is about what it sees.",
    telemetry: [
      { k: "Visibility", v: "<8m" },
      { k: "Primary sensor", v: "LWIR + radar" },
      { k: "Pose confidence", v: "0.74" },
    ],
    resolution: "Fusion held: pose confidence 0.74.",
    caption: "CAMERAS BLIND · THERMAL + RADAR",
    tStart: 26000,
    tEnd: 35000,
  },
  {
    id: 3,
    code: "04",
    label: "Operator overload",
    title: "One operator, twelve aircraft.",
    body:
      "No human can watch twelve screens at once. The Command layer plans across every aircraft and interrupts the operator only for the calls that genuinely need human judgement.",
    telemetry: [
      { k: "Vehicles in flight", v: "12" },
      { k: "Operator actions / min", v: "<3" },
      { k: "Handled autonomously", v: "97%" },
    ],
    resolution: "Operator load held: <3 actions per minute.",
    caption: "1 OPERATOR · 12 AIRCRAFT",
    tStart: 35000,
    tEnd: 44000,
  },
];

/**
 * Fault index active at loop-relative time `ms`.
 * Returns -1 during the nominal intro, the fault's id during its window, and
 * holds the last fault (3) through the reset tail so the rail never flickers.
 */
export function actIndexAtTime(ms: number): number {
  if (ms < NOMINAL_MS) return -1;
  if (ms >= RESET_START) return ACTS.length - 1;
  for (const act of ACTS) {
    if (ms >= act.tStart && ms < act.tEnd) return act.id;
  }
  return -1;
}

/** Formats loop-relative ms as a `T+MM:SS` mission clock. */
export function formatMissionClock(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `T+${pad(mm)}:${pad(ss)}`;
}
