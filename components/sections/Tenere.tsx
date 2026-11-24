import { InViewVideo } from "@/components/media/InViewVideo";
import { Frame } from "@/components/motion/Frame";
import { Words } from "@/components/motion/Words";
import { TENERE } from "@/lib/stack";

/** TENERE: the ground control station, shown working. */
export function Tenere() {
  return (
    <section id="tenere" className="tenere section" data-tone="night" aria-labelledby="tenere-title">
      <div className="wrap">
        <div className="head">
          <div className="head__label">
            <p className="label" data-reveal>
              TENERE <span className="muted">· Ground control station</span>
            </p>
            <p className="state state--now tenere__state" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              In production
            </p>
          </div>
          <Words as="h2" id="tenere-title" className="t-1 head__title" text={[...TENERE.headline]} />
          <p className="lede head__body" data-reveal style={{ "--d": "200ms" } as React.CSSProperties}>
            {TENERE.lede}
          </p>
        </div>

        <Frame className="tenere__film">
          <InViewVideo
            src="/media/tenere-mission.mp4"
            poster="/media/tenere-mission-poster.jpg"
            label="Screen recording of TENERE. A survey mission is planned and flown inside a three-dimensional geofence volume drawn over satellite imagery."
          />
        </Frame>
        <p className="caption">
          <span>
            <strong>TENERE</strong> planning and flying a survey mission inside its geofence volume
          </span>
          <span>Screen recording</span>
        </p>

        <ol className="tenere__features">
          {TENERE.features.map((feature, index) => (
            <li key={feature.n} data-reveal style={{ "--d": `${index * 80}ms` } as React.CSSProperties}>
              <span className="label label--soft tabular">{feature.n}</span>
              <h3 className="t-4">{feature.title}</h3>
              <p className="body">{feature.body}</p>
            </li>
          ))}
        </ol>

        <div className="tenere__modules" data-reveal>
          <p className="label label--soft">Modules</p>
          <ul>
            {TENERE.modules.map((module) => (
              <li key={module}>{module}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
