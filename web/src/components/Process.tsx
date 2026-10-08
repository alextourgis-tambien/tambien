"use client";
import { useState } from "react";
import { translate, type Language } from "@/lib/i18n";
import type { ProcessStep, Settings } from "@/lib/types";
import { Media } from "./Media";
import { useFollower } from "./useFollower";
export function Process({
  steps,
  lang,
  settings,
}: {
  steps: ProcessStep[];
  lang: Language;
  settings: Settings;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { area, follower, move, reset } = useFollower<HTMLDivElement>();
  const active = steps.find((step) => step._key === hovered);
  return (
    <section
      ref={area}
      className="process"
      aria-labelledby="process-title"
      onPointerMove={move}
      onPointerLeave={() => {
        setHovered(null);
        reset();
      }}
    >
      <div className="process-intro">
        <h2 id="process-title">{translate(settings.processIntro, lang)}</h2>
        <p>{translate(settings.processSubline, lang)}</p>
      </div>
      <div>
        {steps.map((step) => (
          <div
            className="process-step"
            key={step._key}
            onPointerEnter={() => setHovered(step._key)}
          >
            <button
              className="process-summary"
              aria-expanded={expanded === step._key}
              aria-controls={`step-${step._key}`}
              onClick={() =>
                setExpanded(expanded === step._key ? null : step._key)
              }
            >
              <span>{translate(step.title, lang)}</span>
              <span>{translate(step.summary, lang)}</span>
              <span>{translate(step.time, lang)}</span>
            </button>
            <div
              className="process-reveal"
              data-open={expanded === step._key}
              id={`step-${step._key}`}
              inert={expanded !== step._key}
            >
              <div>
                <div className="process-detail">
                  <p>{translate(step.description, lang)}</p>
                  {step.media ? (
                    <Media
                      media={step.media}
                      lang={lang}
                      className="process-mobile-media"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={follower}
        className="process-follow"
        data-visible={!!active?.media}
        aria-hidden="true"
      >
        {active?.media ? <Media media={active.media} lang={lang} /> : null}
      </div>
    </section>
  );
}
