"use client";
import { HoverLabel } from "./HoverLabel";
import Image from "next/image";
import { labels, translate, type Language } from "@/lib/i18n";
import type { Settings } from "@/lib/types";
import { homeAssets } from "@/data/seed";
import { useFollower } from "./useFollower";
export function ContactCTA({
  lang,
  settings,
}: {
  lang: Language;
  settings: Settings;
}) {
  const t = labels[lang];
  const { area, follower, move } = useFollower<HTMLAnchorElement>({
    trackOnArrival: true,
  });
  return (
    <section
      ref={area}
      onPointerMove={move}
      className="contact-cta"
      aria-labelledby="contact-title"
    >
      <div className="cta-mark">
        <Image src={homeAssets.imgVector1} width={710} height={642} alt="" />
      </div>
      <div className="cta-content">
        <h2 id="contact-title">
          {translate(settings.cta, lang)}
          <br />
          <span>{translate(settings.ctaSecondary, lang)}</span>
        </h2>
        <div className="cta-actions">
          <a href={settings.callUrl}>
            <HoverLabel>{t.call}</HoverLabel>
          </a>
          {settings.whatsappUrl ? (
            <a href={settings.whatsappUrl}>
              <HoverLabel>WhatsApp</HoverLabel>
            </a>
          ) : null}
          <a ref={follower} className="founder" href={settings.callUrl}>
            <Image
              src={homeAssets.imgRectangle2}
              width={42}
              height={42}
              alt="Alex"
            />
            <span>
              <strong>{t.contact}</strong>
              <span>{t.founder}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
