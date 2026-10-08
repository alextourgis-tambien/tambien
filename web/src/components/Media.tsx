import { CardCue } from "./CardCue";
import Image from "next/image";
import { translate, type Language } from "@/lib/i18n";
import type { Media as MediaType } from "@/lib/types";
export function Media({
  media,
  lang,
  priority = false,
  className = "",
}: {
  media: MediaType;
  lang: Language;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`media ${className}`}
      style={{
        aspectRatio: `${media.width}/${media.height}`,
        background: media.background,
      }}
    >
      <div className="motion-visual">
        {media.overlay ? (
          <Image
            src={media.overlay.src}
            alt={translate(media.alt, lang)}
            width={media.overlay.width}
            height={media.overlay.height}
            className="media-overlay"
            style={{
              width: `${(media.overlay.width / media.width) * 100}%`,
              height: "auto",
            }}
            sizes="(max-width: 700px) 65vw, 18vw"
          />
        ) : (
          <Image
            src={media.src}
            alt={translate(media.alt, lang)}
            fill
            priority={priority}
            sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 24vw"
            style={{
              objectFit: "cover",
              objectPosition: media.crop || "center",
            }}
          />
        )}
        {media.embedSearch ? (
          <div className="travel-search" aria-hidden="true">
            <span>
              City
              <br />
              <strong>Rome</strong>
            </span>
            <span>
              Type of experience
              <br />
              <strong>Private Tours in the City</strong>
            </span>
            <span className="pill dark">Discover</span>
          </div>
        ) : null}
      </div>
      <CardCue />
    </div>
  );
}
