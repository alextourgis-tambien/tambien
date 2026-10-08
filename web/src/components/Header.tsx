"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { labels, languages, type Language } from "@/lib/i18n";
import type { Settings } from "@/lib/types";
import { homeAssets } from "@/data/seed";
export function Header({
  lang,
  settings,
}: {
  lang: Language;
  settings: Settings;
}) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const t = labels[lang];
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat(lang, {
          timeZone: "Europe/Madrid",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
          timeZoneName: "shortOffset",
        }).format(new Date()),
      );
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [lang]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const entries = [
    { title: t.work, url: `/${lang}/work` },
    { title: t.studio, url: `/${lang}/studio` },
    { title: t.services, url: `/${lang}/studio#services` },
    { title: t.pricing, url: `/${lang}/pricing` },
    ...(settings.email
      ? [{ title: "Email", url: `mailto:${settings.email}` }]
      : []),
    ...(settings.youtubeUrl
      ? [{ title: "YouTube", url: settings.youtubeUrl }]
      : []),
    { title: t.event, url: `/${lang}/event` },
    ...(settings.toolsUrl ? [{ title: "Tools", url: settings.toolsUrl }] : []),
  ];
  return (
    <>
      <a className="skip-link" href="#content">
        {t.skip}
      </a>
      <header className="header">
        <Link href={`/${lang}`} className="brand">
          <Image src={homeAssets.imgVector} width={21} height={19} alt="" />
          {settings.siteName}
        </Link>
        <span className="clock">
          Barcelona <span>{time}</span>
        </span>
        <nav className="header-nav" aria-label={t.menu}>
          <Link href={`/${lang}/work`}>{t.work}</Link>
          <Link href={`/${lang}/studio#services`}>{t.services}</Link>
          <button
            ref={trigger}
            className="menu-trigger pill"
            onClick={() => setOpen(true)}
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            +
          </button>
        </nav>
        <div className="header-contact">
          <a className="pill dark" href={settings.callUrl}>
            {t.call}
          </a>
          {settings.whatsappUrl ? (
            <a className="pill" href={settings.whatsappUrl}>
              WhatsApp
            </a>
          ) : null}
        </div>
      </header>
      <dialog
        id="site-menu"
        ref={dialog}
        className="menu-dialog"
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(false);
        }}
      >
        <div className="menu-panel">
          <button
            className="pill menu-close"
            aria-label={t.close}
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <nav aria-label={t.menu}>
            {entries.map((entry, index) => (
              <Link
                key={entry.url}
                href={entry.url}
                onClick={() => setOpen(false)}
              >
                <span>{entry.title}</span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </Link>
            ))}
          </nav>
          <div className="language-links">
            {languages.map((language) => (
              <Link
                key={language}
                href={pathname.replace(/^\/(fr|en|es)/, `/${language}`)}
                hrefLang={language}
                lang={language}
                aria-current={language === lang ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {language.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
