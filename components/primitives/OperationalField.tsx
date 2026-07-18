"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

export type OperationalFieldVariant =
  | "corridor"
  | "stack"
  | "boundary"
  | "return";

interface OperationalFieldProps {
  variant?: OperationalFieldVariant;
  animated?: boolean;
  className?: string;
}

interface FieldGeometry {
  contours: readonly string[];
  route: string;
  nodes: readonly (readonly [number, number])[];
  label: string;
  labelAt: readonly [number, number];
}

const FIELDS = {
  corridor: {
    contours: [
      "M-30 86 C154 12 278 126 438 72 S726 42 990 122",
      "M-34 164 C138 94 292 198 446 142 S748 106 998 190",
      "M-38 240 C150 180 296 272 464 220 S750 192 1002 270",
      "M-42 322 C140 260 306 350 474 302 S754 278 1006 350",
      "M-46 408 C128 344 306 432 486 392 S770 366 1010 436",
      "M-50 496 C126 428 322 512 500 480 S780 452 1014 526",
    ],
    route: "M-24 354 C146 322 248 228 408 258 S682 382 984 202",
    nodes: [
      [130, 326],
      [408, 258],
      [692, 342],
      [896, 248],
    ],
    label: "CORRIDOR / 06",
    labelAt: [694, 326],
  },
  stack: {
    contours: [
      "M86 446 C54 316 128 140 292 72 C452 6 698 68 830 190 C958 308 916 472 744 536",
      "M166 432 C126 322 188 180 314 126 C450 68 648 110 754 206 C862 304 824 426 692 480",
      "M246 408 C214 326 258 226 356 184 C460 140 594 166 674 238 C750 306 724 390 632 430",
      "M322 382 C300 330 330 270 394 242 C464 214 548 230 598 278 C650 324 632 374 574 400",
      "M30 516 C204 474 326 532 478 506 S752 462 930 510",
    ],
    route: "M112 474 C236 426 256 316 374 292 C500 266 562 352 690 302 C772 270 828 202 914 162",
    nodes: [
      [112, 474],
      [374, 292],
      [690, 302],
      [914, 162],
    ],
    label: "STACK / LAYER 04",
    labelAt: [612, 458],
  },
  boundary: {
    contours: [
      "M-20 126 C170 40 284 156 452 104 S764 42 990 150",
      "M-26 226 C142 148 308 252 468 204 S750 158 996 252",
      "M-32 334 C152 254 310 356 484 314 S770 270 1002 364",
      "M-38 450 C144 366 328 468 506 432 S786 388 1008 484",
      "M138 542 L188 154 L432 72 L716 126 L858 462 L620 554 Z",
    ],
    route: "M138 542 L188 154 L432 72 L716 126 L858 462 L620 554 Z",
    nodes: [
      [188, 154],
      [432, 72],
      [716, 126],
      [858, 462],
      [620, 554],
      [138, 542],
    ],
    label: "BOUNDARY / B-12",
    labelAt: [624, 518],
  },
  return: {
    contours: [
      "M-28 104 C154 30 292 152 448 98 S728 54 990 122",
      "M-32 190 C142 118 292 230 458 176 S746 132 996 212",
      "M-36 282 C136 210 308 316 476 268 S760 226 1002 306",
      "M-40 380 C130 306 320 412 494 368 S778 324 1008 408",
      "M-44 486 C138 406 330 512 514 472 S794 430 1014 514",
    ],
    route: "M92 182 C244 118 374 170 440 274 C506 378 624 428 780 374 C868 344 902 266 838 226 C786 192 724 232 690 292 C634 392 486 474 278 426 C172 402 108 338 132 270",
    nodes: [
      [92, 182],
      [440, 274],
      [780, 374],
      [690, 292],
      [278, 426],
      [132, 270],
    ],
    label: "RETURN / VERIFIED",
    labelAt: [676, 416],
  },
} satisfies Record<OperationalFieldVariant, FieldGeometry>;

const CONTOUR_TONES = [
  "var(--color-mineral)",
  "var(--color-sage)",
  "var(--color-field-tan)",
] as const;

export function OperationalField({
  variant = "corridor",
  animated = true,
  className,
}: OperationalFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "180px 0px" });
  const field = FIELDS[variant];
  const routeColor =
    variant === "boundary"
      ? "var(--color-boundary)"
      : variant === "return"
        ? "var(--color-return)"
        : "var(--color-route)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active={animated && inView}
      className={cn(
        "operational-field",
        `operational-field--${variant}`,
        className,
      )}
    >
      <svg viewBox="0 0 960 600" fill="none" focusable="false">
        <g className="operational-field__drift">
          {field.contours.map((path, index) => (
            <path
              key={path}
              d={path}
              stroke={CONTOUR_TONES[index % CONTOUR_TONES.length]}
              strokeWidth={index === field.contours.length - 1 ? 1.15 : 0.8}
              strokeDasharray={index % 2 === 0 ? "1 0" : "7 10"}
              opacity={0.2 + (index % 3) * 0.08}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <path
          className="operational-field__route"
          d={field.route}
          stroke={routeColor}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="22 10 3 10"
          vectorEffect="non-scaling-stroke"
        />

        {field.nodes.map(([cx, cy], index) => (
          <rect
            key={`${cx}-${cy}`}
            className="operational-field__node"
            x={cx - 4}
            y={cy - 4}
            width="8"
            height="8"
            fill={index === field.nodes.length - 1 ? routeColor : "var(--color-ink)"}
            stroke={routeColor}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <text
          className="operational-field__word"
          x={field.labelAt[0]}
          y={field.labelAt[1]}
          fill="var(--color-fg-tertiary)"
        >
          {field.label}
        </text>
      </svg>
    </div>
  );
}
