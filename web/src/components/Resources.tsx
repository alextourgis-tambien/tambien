"use client";
import { useState } from "react";
import Link from "./AppLink";
import { Media } from "./Media";
import { useFollower } from "./useFollower";
import { translate, type Language } from "@/lib/i18n";
import type { Resource, Page } from "@/lib/types";

export function Resources({
  page,
  items,
  lang,
}: {
  page: Page;
  items: Resource[];
  lang: Language;
}) {
  const [active, setActive] = useState<Resource | null>(null);
  const { area, follower, move, reset } = useFollower<HTMLDivElement>({
    allowVerticalOverflow: true,
  });
  return (
    <section
      ref={area}
      className="process resources-list"
      onPointerMove={move}
      onPointerLeave={() => {
        setActive(null);
        reset();
      }}
    >
      <div className="process-intro">
        <h1>{translate(page.title, lang)}</h1>
        <p>{translate(page.description, lang)}</p>
      </div>
      {items.map((item) => (
        <div
          className="process-step"
          key={item._key}
          onPointerEnter={() => setActive(item)}
        >
          <Link
            className="process-summary resource-link"
            href={item.url.startsWith("/") ? `/${lang}${item.url}` : item.url}
          >
            <span>{item.name}</span>
            <span>{translate(item.title, lang)}</span>
            <span className="resource-category">
              {translate(item.category, lang)} <span aria-hidden="true">↗</span>
            </span>
          </Link>
        </div>
      ))}
      <div
        ref={follower}
        className="process-follow resource-preview"
        data-visible={!!active}
        aria-hidden="true"
      >
        {active?.media ? (
          <Media media={active.media} lang={lang} />
        ) : active ? (
          <div className={`resource-sample resource-sample-${active._key}`}>
            {active._key === "fluent" ? (
              <>
                <span>Fluent</span>
                <code>clamp(min, fluid, max)</code>
                <span>Desktop → Tablet → Mobile</span>
              </>
            ) : (
              <>
                <span>Aa Bb Cc</span>
                <div className="resource-swatches">
                  <i />
                  <i />
                  <i />
                </div>
                <span>También Style Guide</span>
              </>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
