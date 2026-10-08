import { PortableText } from "next-sanity";
import { translate, type Language } from "@/lib/i18n";
import type { ContentBlock } from "@/lib/types";
import { Media } from "./Media";
function embedUrl(value: string) {
  try {
    const url = new URL(value);
    if (["youtube.com", "www.youtube.com", "youtu.be"].includes(url.hostname)) {
      const id =
        url.hostname === "youtu.be"
          ? url.pathname.slice(1)
          : url.searchParams.get("v");
      if (id && /^[\w-]{11}$/.test(id))
        return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (url.hostname === "vimeo.com" && /^\/\d+$/.test(url.pathname))
      return `https://player.vimeo.com/video${url.pathname}`;
  } catch {}
  return null;
}
export function Video({
  url,
  title,
  poster,
}: {
  url: string;
  title: string;
  poster?: string;
}) {
  if (/^https?:\/\/[^?#]+\.mp4(?:[?#]|$)/i.test(url))
    return (
      <video
        className="video"
        src={url}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label={title}
      />
    );
  const source = embedUrl(url);
  return source ? (
    <iframe
      className="video"
      src={source}
      title={title}
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <a href={url}>{title}</a>
  );
}
export function Blocks({
  blocks,
  lang,
}: {
  blocks: ContentBlock[];
  lang: Language;
}) {
  return (
    <div className="blocks">
      {blocks.map((block) => (
        <section key={block._key} className={`block block-${block._type}`}>
          {block._type === "spacer" ? (
            <div
              style={{ height: `${Math.min(block.height || 64, 240) / 16}rem` }}
            />
          ) : null}
          {block.title ? <h2>{translate(block.title, lang)}</h2> : null}
          {block.image ? <Media media={block.image} lang={lang} /> : null}
          {block.images ? (
            <div className="block-gallery">
              {block.images.map((media, index) => (
                <Media key={media.src + index} media={media} lang={lang} />
              ))}
            </div>
          ) : null}
          {block.text?.[lang] ? (
            <PortableText value={block.text[lang]} />
          ) : null}
          {block._type === "video" && block.url ? (
            <Video url={block.url} title={translate(block.title, lang)} />
          ) : null}
          {block.quote ? (
            <blockquote>
              {translate(block.quote, lang)}
              {block.attribution ? <cite>{block.attribution}</cite> : null}
            </blockquote>
          ) : null}
          {block.credits?.map((credit) => (
            <p key={credit.name}>
              {credit.name} — {translate(credit.role, lang)}
            </p>
          ))}
          {block.caption ? (
            <p className="caption">{translate(block.caption, lang)}</p>
          ) : null}
        </section>
      ))}
    </div>
  );
}
