import { ImageResponse } from "next/og";
import { FIX_BASE, MARK_PATHS, MARK_VIEWBOX, fixWedges } from "@/components/brand/Mark";

/**
 * The default social card: the mark, the line, and the two systems in
 * production, on night indigo. Uses the bundled sans so
 * the route has no font dependency.
 */

export const alt = "Karta Innovations. The brain for unmanned systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#0B0F2E";
const SAFFRON = "#F26A21";
const CREAM = "#F4F0E8";
const MUTED = "rgba(244, 240, 232, 0.7)";
const LINE = "rgba(244, 240, 232, 0.22)";

const SYSTEMS = [
  { value: "SkyAnchor", label: "Navigation without GPS" },
  { value: "TENERE", label: "Ground control, built for swarms" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 68px",
          color: CREAM,
          backgroundColor: NIGHT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg viewBox={MARK_VIEWBOX} width="58" height="72">
              <path d={MARK_PATHS.outer} fill={CREAM} opacity="0.42" />
              <path d={MARK_PATHS.inner} fill={CREAM} />
              <path d={MARK_PATHS.stem} fill={CREAM} />
              <circle cx={MARK_PATHS.fix.cx} cy={MARK_PATHS.fix.cy} r={MARK_PATHS.fix.r} fill={FIX_BASE} />
              {fixWedges(MARK_PATHS.fix.cx, MARK_PATHS.fix.cy, MARK_PATHS.fix.r).map((wedge, index) => (
                <path key={index} d={wedge.d} fill={wedge.fill} />
              ))}
            </svg>
            <span style={{ fontSize: 24, letterSpacing: "0.3em" }}>KARTA INNOVATIONS</span>
          </div>
          <span style={{ fontSize: 18, letterSpacing: "0.2em", color: MUTED }}>HYDERABAD, INDIA</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span style={{ fontSize: 19, letterSpacing: "0.2em", color: SAFFRON }}>INDIA’S AUTONOMY STACK</span>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.01em", maxWidth: 1040, textTransform: "uppercase" }}>
            The brain for unmanned systems.
          </div>
        </div>

        <div style={{ display: "flex", borderTop: `1px solid ${LINE}`, paddingTop: 26 }}>
          {SYSTEMS.map((figure, index) => (
            <div
              key={figure.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 6,
                paddingLeft: index === 0 ? 0 : 28,
                borderLeft: index === 0 ? "none" : `1px solid ${LINE}`,
              }}
            >
              <span style={{ fontSize: 46, fontWeight: 400, letterSpacing: "-0.03em" }}>{figure.value}</span>
              <span style={{ fontSize: 19, color: MUTED }}>{figure.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
