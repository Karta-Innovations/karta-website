"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * THE LOOP CLOSES
 * Full-width dark band with:
 * - Heading: "Intent goes down. Situation and record come back."
 * - Loop diagram (adapted from GrandScheme)
 * - Closing line: "The loop is not closed until the record returns."
 */

const NODE_CX = [130, 363, 597, 830];
const NODE_CY = 96;
const NODE_R = 36;

export function LoopClosing() {
  const reduce = useReducedMotionSafe();

  const reveal: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative bg-current-deep px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[90rem]">
        {/* Heading */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="mx-auto max-w-[70ch] text-center"
        >
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.04em] text-fg">
            Intent goes down. Situation and record come back.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.65] text-fg-muted">
            The autonomy loop is a four-step circuit. It begins when an operator
            expresses intent. SkyAnchor surfaces the situation. TENERE adapts the
            mission. Kiksuya records why each action was allowed. Then, audit
            becomes the next intent — the loop runs again.
          </p>
        </motion.div>

        {/* Loop diagram */}
        <LoopDiagram reduce={reduce} />

        {/* Closing line */}
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="mx-auto mt-12 max-w-[60ch] text-center font-display text-[clamp(1.3rem,2.5vw,1.8rem)] font-medium leading-[1.3] tracking-[-0.03em] text-sand"
        >
          The loop is not closed until the record returns.
        </motion.p>
      </div>
    </section>
  );
}

/**
 * LOOP DIAGRAM
 * Redrawn from GrandScheme for the homepage act:
 * - Four phases as nodes
 * - Forward path (sand) shows intent flowing down
 * - Return arc (aqua) shows audit flowing back
 * - Pulse orbits when not in reduced motion
 */
function LoopDiagram({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 35%"],
  });

  const bottom = NODE_CY + NODE_R;
  const right = NODE_CX[3] + NODE_R;
  const left = NODE_CX[0] - NODE_R;

  // Return arc: down the right, across the bottom, up the left, arrowhead back
  const returnArc = `C ${right + 37} ${NODE_CY} ${right + 41} ${NODE_CY + 28} ${right + 41} ${NODE_CY + 56} C ${right + 41} ${NODE_CY + 98} ${right + 17} ${NODE_CY + 120} ${right - 17} ${NODE_CY + 120} L ${left + 17} ${NODE_CY + 120} C ${left - 17} ${NODE_CY + 120} ${left - 41} ${NODE_CY + 98} ${left - 41} ${NODE_CY + 56} C ${left - 41} ${NODE_CY + 28} ${left - 37} ${NODE_CY} ${left} ${NODE_CY}`;
  const returnPath = `M ${right} ${NODE_CY} ${returnArc}`;
  const circuitPath = `M ${left} ${NODE_CY} L ${right} ${NODE_CY} ${returnArc}`;

  const pulseOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <div ref={ref} className="mx-auto mt-12 max-w-[1100px]">
      <svg
        viewBox="0 0 960 260"
        className="h-auto w-full"
        role="img"
        aria-label="The autonomy loop: Intent enters at the operator, SkyAnchor surfaces position, TENERE adapts the mission, Kiksuya records the decision, and audit flows back as the next intent."
      >
        {/* Orbiting signal pulse */}
        {!reduce ? (
          <motion.g style={{ opacity: pulseOpacity }}>
            <circle
              r={4.5}
              fill="var(--color-sand)"
              style={{ filter: "drop-shadow(0 0 6px var(--color-sand))" }}
            >
              <animateMotion
                dur="6.4s"
                repeatCount="indefinite"
                path={circuitPath}
              />
            </circle>
          </motion.g>
        ) : null}

        {/* Forward segments (sand) — intent flowing down */}
        {[0, 1, 2].map((i) => {
          const x1 = NODE_CX[i] + NODE_R + 7;
          const x2 = NODE_CX[i + 1] - NODE_R - 7;
          return (
            <g key={`seg-${i}`}>
              <ScrubbedPath
                d={`M ${x1} ${NODE_CY} L ${x2} ${NODE_CY}`}
                stroke="var(--color-sand)"
                progress={scrollYProgress}
                range={[i * 0.18, i * 0.18 + 0.18]}
                reduce={reduce}
              />
              <ScrubbedHead
                d={`M ${x2 - 8} ${NODE_CY - 6} L ${x2} ${NODE_CY} L ${x2 - 8} ${NODE_CY + 6}`}
                stroke="var(--color-sand)"
                progress={scrollYProgress}
                at={i * 0.18 + 0.16}
                reduce={reduce}
              />
            </g>
          );
        })}

        {/* Return arc (aqua) — audit flowing back */}
        <g style={{ filter: "drop-shadow(0 0 7px color-mix(in srgb, var(--color-aqua) 45%, transparent))" }}>
          <ScrubbedPath
            d={returnPath}
            stroke="var(--color-aqua)"
            progress={scrollYProgress}
            range={[0.52, 0.94]}
            reduce={reduce}
          />
        </g>
        <ScrubbedHead
          d={`M ${left - 7} ${NODE_CY - 7} L ${left} ${NODE_CY} L ${left - 7} ${NODE_CY + 7}`}
          stroke="var(--color-aqua)"
          progress={scrollYProgress}
          at={0.93}
          reduce={reduce}
        />

        {/* Phase nodes */}
        <g>
          <circle
            cx={NODE_CX[0]}
            cy={NODE_CY}
            r={NODE_R}
            fill="var(--color-teal)"
            stroke="var(--color-sand)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[0]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-warm-ink)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            01
          </text>
          <text
            x={NODE_CX[0]}
            y={bottom + 26}
            textAnchor="middle"
            fill="var(--color-fg)"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Intent
          </text>
          <text
            x={NODE_CX[0]}
            y={bottom + 44}
            textAnchor="middle"
            fill="var(--color-fg-tertiary)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
            }}
          >
            OPERATOR
          </text>
        </g>

        <g>
          <circle
            cx={NODE_CX[1]}
            cy={NODE_CY}
            r={NODE_R}
            fill="var(--color-teal)"
            stroke="var(--color-sand)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[1]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-warm-ink)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            02
          </text>
          <text
            x={NODE_CX[1]}
            y={bottom + 26}
            textAnchor="middle"
            fill="var(--color-fg)"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Position
          </text>
          <text
            x={NODE_CX[1]}
            y={bottom + 44}
            textAnchor="middle"
            fill="var(--color-fg-tertiary)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
            }}
          >
            SKYANCHOR
          </text>
        </g>

        <g>
          <circle
            cx={NODE_CX[2]}
            cy={NODE_CY}
            r={NODE_R}
            fill="var(--color-teal)"
            stroke="var(--color-sand)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[2]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-warm-ink)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            03
          </text>
          <text
            x={NODE_CX[2]}
            y={bottom + 26}
            textAnchor="middle"
            fill="var(--color-fg)"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Mission
          </text>
          <text
            x={NODE_CX[2]}
            y={bottom + 44}
            textAnchor="middle"
            fill="var(--color-fg-tertiary)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
            }}
          >
            TENERE
          </text>
        </g>

        <g>
          <circle
            cx={NODE_CX[3]}
            cy={NODE_CY}
            r={NODE_R}
            fill="var(--color-teal)"
            stroke="var(--color-aqua)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[3]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-warm-ink)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            04
          </text>
          <text
            x={NODE_CX[3]}
            y={bottom + 26}
            textAnchor="middle"
            fill="var(--color-fg)"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Record
          </text>
          <text
            x={NODE_CX[3]}
            y={bottom + 44}
            textAnchor="middle"
            fill="var(--color-fg-tertiary)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
            }}
          >
            KIKSUYA
          </text>
        </g>
      </svg>
    </div>
  );
}

interface ScrubbedPathProps {
  d: string;
  stroke: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}

function ScrubbedPath({
  d,
  stroke,
  progress,
  range,
  reduce,
}: ScrubbedPathProps) {
  const pathLength = useTransform(progress, range, [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={reduce ? undefined : { pathLength }}
    />
  );
}

interface ScrubbedHeadProps {
  d: string;
  stroke: string;
  progress: MotionValue<number>;
  at: number;
  reduce: boolean;
}

function ScrubbedHead({ d, stroke, progress, at, reduce }: ScrubbedHeadProps) {
  const opacity = useTransform(progress, [at, Math.min(at + 0.04, 1)], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={reduce ? undefined : { opacity }}
    />
  );
}
