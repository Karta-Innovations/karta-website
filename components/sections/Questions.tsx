import Link from "next/link";
import { Words } from "@/components/motion/Words";

const QUESTIONS = [
  {
    n: "01",
    question: "Where am I?",
    answer: "Visual navigation, validated against military-grade jammers and spoofers with Tier-1 UAV manufacturers.",
    state: "now",
    stateLabel: "Demonstrated",
    link: { label: "SkyAnchor", href: "/skyanchor" },
  },
  {
    n: "02",
    question: "What is around me?",
    answer: "360-degree perception. Obstacle avoidance and object tracking are in development.",
    state: "next",
    stateLabel: "Next phase",
  },
  {
    n: "03",
    question: "What should I do?",
    answer: "Intelligent decision-making. Mission autonomy runs in TENERE today; collaborative swarms and autonomous copilots are in development.",
    state: "next",
    stateLabel: "Next phase",
  },
] as const;

/** The frame the whole company hangs on, with what has flown and what has not. */
export function Questions() {
  return (
    <section id="questions" className="questions section" data-tone="cream" aria-labelledby="questions-title">
      <div className="wrap">
        <div className="head">
          <p className="label head__label" data-reveal>
            What autonomy has to answer
          </p>
          <Words
            as="h2"
            id="questions-title"
            className="t-2 head__title"
            text="Three questions every unmanned system must answer by itself."
          />
        </div>

        <ol className="questions__list">
          {QUESTIONS.map((item, index) => (
            <li key={item.n} className="questions__row" data-reveal style={{ "--d": `${index * 110}ms` } as React.CSSProperties}>
              <span className="label label--soft tabular questions__n">{item.n}</span>
              <h3 className="t-1 questions__q">{item.question}</h3>
              <p className="body questions__a">
                {item.answer}
                {"link" in item ? (
                  <>
                    {" "}
                    <Link href={item.link.href} className="link">
                      {item.link.label}
                    </Link>
                  </>
                ) : null}
              </p>
              <span className={`state state--${item.state} questions__state`}>{item.stateLabel}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
