import { getPayload, type Application } from "@/lib/solutions";

/**
 * Mission-aware instrument schematic for the console focus panel. Reads the
 * application's primary payload category and draws a matching sensor visual
 * (scan, reticle, grid, rings, spectrum, bands, trajectory). Pure SVG in the
 * brand's instrument register, no fabricated photography. A single sweep line
 * animates across; the global reduced-motion rule neutralises it.
 */

type Variant = "sweep" | "reticle" | "grid" | "rings" | "wave" | "band" | "arc";

function variantFor(app: Application): Variant {
  const category = getPayload(app.payloadSlugs[0])?.category;
  switch (category) {
    case "Ranging":
      return "reticle";
    case "Mapping":
      return "grid";
    case "Radar":
      return "rings";
    case "RF":
      return "wave";
    case "Spectral":
      return "band";
    case "Logistics":
      return "arc";
    case "Imaging":
    default:
      return "sweep";
  }
}

const STRUCT = "var(--color-fg-tertiary)";
const ACCENT = "var(--color-amber)";

export function MissionSchematic({ app }: { app: Application }) {
  const variant = variantFor(app);
  const label = getPayload(app.payloadSlugs[0])?.chipLabel ?? "SENSOR";

  return (
    <svg
      viewBox="0 0 480 150"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${app.name} sensor schematic`}
    >
      {/* faint baseline grid */}
      <g stroke={STRUCT} strokeWidth="0.5" opacity="0.18">
        {[30, 60, 90, 120].map((y) => (
          <line key={y} x1="0" y1={y} x2="480" y2={y} />
        ))}
        {[80, 160, 240, 320, 400].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="150" />
        ))}
      </g>

      {renderMotif(variant)}

      {/* corner ticks */}
      <g stroke={STRUCT} strokeWidth="1" opacity="0.55">
        <path d="M10 10 h14 M10 10 v14" fill="none" />
        <path d="M470 10 h-14 M470 10 v14" fill="none" />
        <path d="M10 140 h14 M10 140 v-14" fill="none" />
        <path d="M470 140 h-14 M470 140 v-14" fill="none" />
      </g>

      {/* labels */}
      <text
        x="16"
        y="26"
        fill={STRUCT}
        fontSize="8"
        letterSpacing="1.5"
        fontFamily="ui-monospace, monospace"
      >
        {label.toUpperCase()} · FEED
      </text>
      <text
        x="464"
        y="26"
        fill={ACCENT}
        fontSize="8"
        letterSpacing="1.5"
        textAnchor="end"
        fontFamily="ui-monospace, monospace"
      >
        LIVE
      </text>

      {/* sweep line */}
      <defs>
        <linearGradient id="ms-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
          <stop offset="50%" stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        className="mission-sweep"
        x="0"
        y="0"
        width="26"
        height="150"
        fill="url(#ms-sweep)"
        opacity="0.5"
      />
    </svg>
  );
}

function renderMotif(variant: Variant) {
  switch (variant) {
    case "reticle":
      return (
        <g fill="none" stroke={ACCENT} strokeWidth="1.2">
          <line x1="240" y1="55" x2="240" y2="95" opacity="0.8" />
          <line x1="218" y1="75" x2="262" y2="75" opacity="0.8" />
          <circle cx="240" cy="75" r="18" opacity="0.5" />
          <circle cx="240" cy="75" r="30" opacity="0.25" />
          <rect x="222" y="57" width="36" height="36" opacity="0.4" />
        </g>
      );
    case "grid":
      return (
        <g fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.55">
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`h${i}`}
              x1={100 + i * 18}
              y1={120 - i * 6}
              x2={380 - i * 18}
              y2={120 - i * 6}
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`v${i}`}
              x1={100 + i * 47}
              y1="120"
              x2={160 + i * 27}
              y2="96"
            />
          ))}
        </g>
      );
    case "rings":
      return (
        <g fill="none" stroke={ACCENT}>
          {[22, 42, 62].map((r, i) => (
            <circle
              key={r}
              cx="240"
              cy="78"
              r={r}
              strokeWidth="1"
              opacity={0.6 - i * 0.15}
            />
          ))}
          <line
            x1="240"
            y1="78"
            x2="300"
            y2="48"
            strokeWidth="1.2"
            opacity="0.8"
          />
          <circle cx="288" cy="55" r="3" fill={ACCENT} stroke="none" />
        </g>
      );
    case "wave":
      return (
        <g stroke={ACCENT} strokeWidth="2" opacity="0.7">
          {[60, 110, 160, 210, 260, 310, 360, 410].map((x, i) => {
            const h = [16, 34, 22, 46, 28, 52, 20, 38][i];
            return <line key={x} x1={x} y1={108} x2={x} y2={108 - h} />;
          })}
        </g>
      );
    case "band":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="120"
              y={48 + i * 11}
              width="240"
              height="7"
              fill={ACCENT}
              opacity={0.5 - i * 0.08}
            />
          ))}
        </g>
      );
    case "arc":
      return (
        <g fill="none" stroke={ACCENT} strokeWidth="1.2">
          <path d="M90 120 Q240 20 390 120" opacity="0.6" strokeDasharray="4 5" />
          <circle cx="90" cy="120" r="4" fill={ACCENT} stroke="none" />
          <path d="M384 114 l6 12 l6 -12 z" fill={ACCENT} stroke="none" opacity="0.85" />
        </g>
      );
    case "sweep":
    default:
      return (
        <g fill="none" stroke={ACCENT} strokeWidth="1">
          <line x1="40" y1="100" x2="440" y2="100" opacity="0.4" />
          {[120, 200, 280, 360].map((x) => (
            <line key={x} x1={x} y1="96" x2={x} y2="104" opacity="0.5" />
          ))}
          <rect x="210" y="58" width="60" height="44" opacity="0.6" />
          <line x1="240" y1="50" x2="240" y2="58" opacity="0.5" />
          <circle cx="240" cy="80" r="3" fill={ACCENT} stroke="none" />
        </g>
      );
  }
}
