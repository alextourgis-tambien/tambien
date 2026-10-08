import { translate, type Language } from "@/lib/i18n";
import type { ProcessStep, Settings } from "@/lib/types";
import { Media } from "./Media";
export function Process({
  steps,
  lang,
  settings,
}: {
  steps: ProcessStep[];
  lang: Language;
  settings: Settings;
}) {
  return (
    <section className="process" aria-labelledby="process-title">
      <div className="process-intro">
        <h2 id="process-title">{translate(settings.processIntro, lang)}</h2>
        <p>{translate(settings.processSubline, lang)}</p>
      </div>
      <div>
        {steps.map((step, index) => (
          <details
            key={step._key}
            className="process-step"
            name="process"
            open={index === 1}
          >
            <summary>
              <h3>{translate(step.title, lang)}</h3>
              <span>{translate(step.summary, lang)}</span>
              <span>{translate(step.time, lang)}</span>
            </summary>
            <div className="process-detail">
              <p>{translate(step.description, lang)}</p>
              {step.media ? <Media media={step.media} lang={lang} /> : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
