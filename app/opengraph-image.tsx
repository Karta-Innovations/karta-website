import { ImageResponse } from "next/og";

/**
 * Default Open Graph card. Dark ops register on purpose - social feeds are
 * where the "denied environment" framing has one second to land. Uses the
 * bundled sans (satori default); brand fonts are not loaded here to keep
 * the route dependency-free.
 */

export const alt =
  "Karta Innovations - Autonomy that works where GPS does not";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#051112";
const FG = "#F5F3EC";
const MUTED = "#B7C6C3";
const SAND = "#FBCA89";
const AQUA = "#81D1D0";
const EDGE = "rgba(255, 255, 255, 0.14)";

const LOOP_PHASES = ["01", "02", "03", "04"];

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
          backgroundColor: INK,
          backgroundImage:
            "radial-gradient(60% 80% at 10% 0%, rgba(251, 202, 137, 0.22), transparent 60%), radial-gradient(50% 70% at 90% 10%, rgba(19, 115, 122, 0.34), transparent 58%)",
          padding: "64px 72px",
          color: FG,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.22em",
            color: SAND,
          }}
        >
          <span>KARTA INNOVATIONS</span>
          <span style={{ color: MUTED, fontSize: 18 }}>17.454°N 78.500°E</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            Autonomy that works where GPS does not.
          </div>
          <div style={{ fontSize: 28, color: MUTED, maxWidth: 900 }}>
            Navigation, decision and audit that keep working through GPS loss,
            comms gaps and overloaded operators.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${EDGE}`,
            paddingTop: 36,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {LOOP_PHASES.map((n, i) => (
              <div
                key={n}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 54,
                    height: 54,
                    borderRadius: 27,
                    border: `2px solid ${i === 3 ? AQUA : SAND}`,
                    color: i === 3 ? AQUA : SAND,
                    fontSize: 20,
                  }}
                >
                  {n}
                </div>
                {i < 3 ? (
                  <div
                    style={{
                      width: 44,
                      height: 2,
                      backgroundColor: SAND,
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, letterSpacing: "0.18em", color: MUTED }}>
            EDGE · COMMAND · THEATRE
          </div>
        </div>
      </div>
    ),
    size,
  );
}
