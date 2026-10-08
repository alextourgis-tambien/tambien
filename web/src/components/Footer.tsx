import Link from "@/components/AppLink";
import { ContactCTA } from "./ContactCTA";
import { labels, languages, type Language } from "@/lib/i18n";
import type { Settings } from "@/lib/types";

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
      <ContactCTA
        lang={lang}
        settings={settings}
        showMark={!["/about", "/studio"].includes(path)}
      />
      <footer className="footer">
        <nav aria-label="Footer">
          {[
            ["", t.home],
            ["work", t.work],
            ["studio", t.studio],
            ["pricing", t.pricing],
            ["event", t.event],
            ["resources", t.resources],
            ["legals", t.legals],
          ].map(([url, title]) => (
            <Link key={url} href={`/${lang}${url ? "/" + url : ""}`}>
              <span>{title}</span>
            </Link>
          ))}
          {settings.youtubeUrl ? (
            <a href={settings.youtubeUrl}>YouTube</a>
          ) : null}
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
