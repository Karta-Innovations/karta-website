"use client";

import { motion } from "framer-motion";
import { EyebrowTag } from "@/components/primitives/EyebrowTag";
import { Check, X } from "@phosphor-icons/react/dist/ssr";

interface Position {
  label: string;
  body: string;
}

const WILL: Position[] = [
  {
    label: "Bounded autonomy",
    body:
      "Every decision the vehicle makes is constrained by an operator-approved doctrine. The system surfaces what it cannot do as clearly as what it can.",
  },
  {
    label: "Auditability",
    body:
      "Every flight produces a structured record of what was sensed, what was reasoned, and what was acted on - at telemetry-frame granularity.",
  },
  {
    label: "Human-on-the-loop",
    body:
      "Operators stay in command, even at fleet scale. Karta builds for cognitive bandwidth, not its replacement.",
  },
  {
    label: "Allied-export discipline",
    body:
      "Engineered for the doctrines we ship under, with export pathways consistent with allied use only.",
  },
];

const WONT: Position[] = [
  {
    label: "Targeting autonomy",
    body:
      "The vehicle does not select what to engage. Target selection remains a human act, governed by published rules of engagement.",
  },
  {
    label: "Opaque models",
    body:
      "No black-box decision making in the kill chain. If a model contributes to an operational decision, its inputs and confidence are exposed.",
  },
  {
    label: "Mass-effect speculation",
    body:
      "We do not pursue capabilities whose only credible use is indiscriminate effect.",
  },
  {
    label: "Sustainment shortcuts",
    body:
      "We do not ship systems we cannot maintain in the theatres they will fly. Spares, training, and updates are part of the product.",
  },
];

export function OperatingBounds() {
  return (
    <section
      id="bounds"
      className="relative bg-ink px-6 md:px-10 py-32 md:py-48 border-t border-border"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-[68ch] mb-24">
          <EyebrowTag className="mb-6">Operating bounds</EyebrowTag>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.035em] leading-[0.98] text-fg">
            What we will build. What we{" "}
            <span className="text-amber">will not</span>.
          </h2>
          <p className="mt-7 text-fg-muted text-[17px] leading-[1.65]">
            We treat doctrine as a product surface. The bounds below are not
            preferences - they are constraints in the codebase, in the
            integration tests, and in the procurement contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-2">
          <PositionColumn
            heading="We build for"
            icon={<Check weight="bold" size={14} />}
            iconColor="text-ok"
            positions={WILL}
          />
          <PositionColumn
            heading="We will not"
            icon={<X weight="bold" size={14} />}
            iconColor="text-alert"
            positions={WONT}
          />
        </div>
      </div>
    </section>
  );
}

interface PositionColumnProps {
  heading: string;
  icon: React.ReactNode;
  iconColor: string;
  positions: Position[];
}

function PositionColumn({ heading, icon, iconColor, positions }: PositionColumnProps) {
  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary pb-5 mb-2 border-b border-border">
        {heading}
      </div>
      <ul>
        {positions.map((p, i) => (
          <motion.li
            key={p.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="py-7 border-b border-border last:border-b-0"
          >
            <div className="flex items-start gap-4">
              <span
                className={`mt-1 size-6 inline-flex items-center justify-center rounded-full ring-1 ring-edge-strong ${iconColor}`}
              >
                {icon}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-fg">
                  {p.label}
                </h3>
                <p className="mt-2 text-fg-muted text-[15px] leading-[1.6]">
                  {p.body}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
