import Link from "@/components/AppLink";
import { labels, translate, type Language } from "@/lib/i18n";
import type { FeedItem, Settings } from "@/lib/types";
import { Media } from "./Media";
export function Feed({
  items,
  lang,
  settings,
}: {
  items: FeedItem[];
  lang: Language;
  settings: Settings;
}) {
  return (
    <div className="feed-grid">
      {[0, 1, 2, 3].map((column) => (
        <div className="feed-column" key={column}>
          {items
            .filter((_, index) => index % 4 === column)
            .map((item, index) => {
              const href = item.projectSlug
                ? `/${lang}/projects/${item.projectSlug}`
                : item.kind === "event"
                  ? `/${lang}/event`
                  : item.url ||
                    (item.kind === "youtube" ? settings.youtubeUrl : undefined);
              const content = (
                <>
                  <Media
                    media={item.media}
                    lang={lang}
                    priority={index === 0}
                  />
                  <h2>{translate(item.title, lang)}</h2>
                  <p>{translate(item.description, lang)}</p>
                  <span className="pill category">
                    {labels[lang][item.kind === "event" ? "event" : item.kind]}
                  </span>
                </>
              );
              return (
                <article
                  className="feed-card"
                  key={item._id}
                  style={
                    { "--reading-order": item.order } as React.CSSProperties
                  }
                >
                  {href ? (
                    <Link data-motion-card href={href}>
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </article>
              );
            })}
        </div>
      ))}
    </div>
  );
}
