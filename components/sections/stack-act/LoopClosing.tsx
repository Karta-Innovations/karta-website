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
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-current-deep px-6 py-20 md:px-10 md:py-32">
      <div className="relative z-10 mx-auto max-w-[90rem]">
        {/* Heading */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="mx-auto max-w-[70ch] text-center"
        >
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.04em] text-fg">
            Human intent. One connected stack.
          </h2>
          <p className="mt-6 text-[18px] leading-[1.65] text-fg-muted">
            An operator approves the mission and its limits. SkyAnchor estimates
            position. TENERE plans and adapts the mission within those limits.
            Kiksuya keeps the rules and decision history available for review.
            The operator uses that record to shape the next mission.
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
          className="mx-auto mt-12 max-w-[60ch] text-center font-display text-[clamp(1.3rem,2.5vw,1.8rem)] font-medium leading-[1.3] tracking-[-0.03em] text-flare"
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
 * - Forward path (flare) shows intent flowing down
 * - Return arc (return) shows audit flowing back
 * - The path draws once as the diagram enters view
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

  return (
    <div ref={ref} className="mx-auto mt-12 max-w-[1100px]">
      <ol className="loop-mobile" aria-label="How the autonomy stack works">
        {[
          ["Operator", "Approve the mission and its limits."],
          ["SkyAnchor", "Estimate position and show confidence."],
          ["TENERE", "Plan and adapt within approved limits."],
          ["Kiksuya", "Connect decisions to their authorising rules."],
        ].map(([name, description], index) => (
          <li key={name}>
            <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{name}</h3><p>{description}</p></div>
          </li>
        ))}
        <li className="loop-mobile__return"><span aria-hidden>↩</span><p>The operator reviews the record before the next mission.</p></li>
      </ol>
      <svg
        viewBox="0 0 960 260"
        className="loop-desktop h-auto w-full"
        role="img"
        aria-label="The autonomy loop: the operator approves intent, SkyAnchor estimates position, TENERE adapts the mission, and Kiksuya records the decision. The operator reviews the record before planning the next mission."
      >
        {/* Forward segments: the route signal carries intent down. */}
        {[0, 1, 2].map((i) => {
          const x1 = NODE_CX[i] + NODE_R + 7;
          const x2 = NODE_CX[i + 1] - NODE_R - 7;
          return (
            <g key={`seg-${i}`}>
              <ScrubbedPath
                d={`M ${x1} ${NODE_CY} L ${x2} ${NODE_CY}`}
                stroke="var(--color-route)"
                progress={scrollYProgress}
                range={[i * 0.18, i * 0.18 + 0.18]}
                reduce={reduce}
              />
              <ScrubbedHead
                d={`M ${x2 - 8} ${NODE_CY - 6} L ${x2} ${NODE_CY} L ${x2 - 8} ${NODE_CY + 6}`}
                stroke="var(--color-route)"
                progress={scrollYProgress}
                at={i * 0.18 + 0.16}
                reduce={reduce}
              />
            </g>
          );
        })}

        {/* Return arc carries the audit back. */}
        <g>
          <ScrubbedPath
            d={returnPath}
            stroke="var(--color-return)"
            progress={scrollYProgress}
            range={[0.52, 0.94]}
            reduce={reduce}
          />
        </g>
        <ScrubbedHead
          d={`M ${left - 7} ${NODE_CY - 7} L ${left} ${NODE_CY} L ${left - 7} ${NODE_CY + 7}`}
          stroke="var(--color-return)"
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
            fill="var(--color-surface)"
            stroke="var(--color-route)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[0]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-night-ink)"
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
            fill="var(--color-surface)"
            stroke="var(--color-route)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[1]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-night-ink)"
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
            fill="var(--color-surface)"
            stroke="var(--color-route)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[2]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-night-ink)"
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
            fill="var(--color-surface)"
            stroke="var(--color-return)"
            strokeWidth={1.5}
          />
          <text
            x={NODE_CX[3]}
            y={NODE_CY + 5}
            textAnchor="middle"
            fill="var(--color-night-ink)"
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
