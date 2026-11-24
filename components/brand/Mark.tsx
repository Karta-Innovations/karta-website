import { cn } from "@/lib/cn";
import bronze from "./fix-sheen.json";

/**
 * The Karta mark, drawn as vector from the master artwork: the same outlines
 * as the supplied logo files. The chevron and stem are set flat, in the ink
 * of whatever ground they sit on. The position fix keeps the bronze of the
 * master logo.
 *
 * Reading the mark: the chevron is a heading, the bronze point is a position
 * fix, the stem is the one who acts.
 */

export const MARK_VIEWBOX = "76 62 108 134";
/** Width divided by height of the mark artwork. */
export const MARK_RATIO = 108 / 134;

export const MARK_PATHS = {
  outer:
    "M133.39 65.07L117.516 65.074L93.523 88.441C74.637 105.387 72.781 122.336 90.781 139.285L127.48 176.031L136.127 167.635L99.504 130.875C88.629 121.117 89.48 110.957 98.211 100.531Z",
  inner:
    "M133.426 65.039L147.352 64.914L106.57 105.133C100.313 111.59 100.047 118.488 107.414 125.945L142.18 161.18L136.145 167.652L99.504 130.875C88.629 121.117 89.48 110.957 98.211 100.531Z",
  stem:
    "M164.313 193.488L180.09 179.922C180.105 159.078 180.121 138.234 180.137 117.395C179.52 104.73 167.113 104.734 157.488 105.305L157.578 118.953C160.77 119.492 163.063 121.188 164.09 124.43Z",
  fix: { cx: 136.262, cy: 108.535, r: 11.746 },
} as const;

/**
 * The bronze fix, as vector. The master logo shades the point like turned
 * metal: its colour changes with the angle around the centre. `fix-sheen.json`
 * holds that colour sampled every four degrees from the master artwork, and
 * this draws it as a fan of wedges over a base disc.
 */
export function fixWedges(cx: number, cy: number, r: number): { d: string; fill: string }[] {
  const step = (Math.PI * 2) / bronze.sheen.length;
  // Each wedge runs a little past its neighbours so no seam shows between them.
  const lap = step * 0.14;
  const at = (angle: number) => `${(cx + Math.cos(angle) * r).toFixed(3)} ${(cy + Math.sin(angle) * r).toFixed(3)}`;
  return bronze.sheen.map((fill, index) => ({
    fill,
    d: `M${cx} ${cy}L${at(index * step - lap)}A${r} ${r} 0 0 1 ${at((index + 1) * step + lap)}Z`,
  }));
}

export const FIX_BASE = bronze.base;
const FIX = fixWedges(MARK_PATHS.fix.cx, MARK_PATHS.fix.cy, MARK_PATHS.fix.r);

interface MarkProps {
  /** Rendered height in pixels; width follows the artwork. */
  size?: number;
  /** `tone` sets the fix in bronze. `mono` is one colour throughout. */
  variant?: "tone" | "mono";
  className?: string;
  /** Accessible name. Omit when the mark sits beside the wordmark. */
  title?: string;
}

export function Mark({ size = 32, variant = "tone", className, title }: MarkProps) {
  const mono = variant === "mono";
  const { cx, cy, r } = MARK_PATHS.fix;

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={Math.round(size * MARK_RATIO * 100) / 100}
      height={size}
      className={cn("mark", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path className="mark__outer" d={MARK_PATHS.outer} fill="currentColor" opacity={mono ? 1 : 0.42} />
      <path className="mark__inner" d={MARK_PATHS.inner} fill="currentColor" />
      <path className="mark__stem" d={MARK_PATHS.stem} fill="currentColor" />
      {mono ? (
        <circle className="mark__fix" cx={cx} cy={cy} r={r} fill="currentColor" />
      ) : (
        <g className="mark__fix">
          <circle cx={cx} cy={cy} r={r} fill={FIX_BASE} />
          {FIX.map((wedge, index) => (
            <path key={index} d={wedge.d} fill={wedge.fill} />
          ))}
        </g>
      )}
    </svg>
  );
}
