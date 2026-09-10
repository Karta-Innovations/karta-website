import { ImageResponse } from "next/og";

/**
 * Default Open Graph card, aligned with the daylight palette. Uses the
 * bundled sans (Satori default); brand fonts are not loaded here to keep
 * the route dependency-free.
 */

export const alt =
  "Karta Innovations - Command that survives uncertainty";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#F7F8FA";
const FG = "#0B1020";
const MUTED = "#515B6D";
const FLARE = "#C8962E";
const RETURN = "#765619";
const EDGE = "rgba(11, 16, 32, 0.14)";

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
            color: FG,
          }}
        >
          <span>KARTA INNOVATIONS</span>
          <span style={{ color: MUTED, fontSize: 18 }}>
            17.454 N / 78.500 E
          </span>
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
            Command that survives uncertainty.
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
            {LOOP_PHASES.map((phase, index) => (
              <div
                key={phase}
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
                    border: `2px solid ${index === 3 ? RETURN : FLARE}`,
                    color: index === 3 ? RETURN : FG,
                    fontSize: 20,
                  }}
                >
                  {phase}
                </div>
                {index < 3 ? (
                  <div
                    style={{
                      width: 44,
                      height: 2,
                      backgroundColor: FLARE,
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, letterSpacing: "0.18em", color: MUTED }}>
            EDGE / COMMAND / THEATRE
          </div>
        </div>
      </div>
    ),
    size,
  );
}
