import Link from "next/link";
import Image from "next/image";
import { labels, languages, translate, type Language } from "@/lib/i18n";
import type { Settings } from "@/lib/types";
import { homeAssets } from "@/data/seed";
export function Footer({
  lang,
  settings,
  path = "",
}: {
  lang: Language;
  settings: Settings;
  path?: string;
}) {
  const t = labels[lang];
  return (
    <>
      <section className="contact-cta" aria-labelledby="contact-title">
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
            <a href={settings.callUrl}>{t.call}</a>
            {settings.whatsappUrl ? (
              <a href={settings.whatsappUrl}>WhatsApp</a>
            ) : null}
            <a className="founder" href={settings.callUrl}>
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
      <footer className="footer">
        <nav aria-label="Footer">
          {[
            ["", t.home],
            ["work", t.work],
            ["studio", t.studio],
            ["pricing", t.pricing],
            ["event", t.event],
            ["legals", t.legals],
          ].map(([url, title]) => (
            <Link key={url} href={`/${lang}${url ? "/" + url : ""}`}>
              {title}
            </Link>
          ))}
          {settings.youtubeUrl ? (
            <a href={settings.youtubeUrl}>YouTube</a>
          ) : null}
          {settings.toolsUrl ? <a href={settings.toolsUrl}>Tools</a> : null}
        </nav>
        <div className="footer-social">
          {settings.socials.map((social) => (
            <a key={social.url} href={social.url}>
              {social.title}
            </a>
          ))}
        </div>
        <nav className="language-links" aria-label="Languages">
          {languages.map((language) => (
            <Link
              key={language}
              href={`/${language}${path}`}
              lang={language}
              hrefLang={language}
              aria-current={language === lang ? "true" : undefined}
            >
              {language.toUpperCase()}
            </Link>
          ))}
        </nav>
      </footer>
    </>
  );
}
