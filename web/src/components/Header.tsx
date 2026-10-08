"use client";
import { HoverLabel } from "./HoverLabel";
import Link from "@/components/AppLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { labels, type Language } from "@/lib/i18n";
import type { Settings } from "@/lib/types";
import { homeAssets } from "@/data/seed";
function MenuIcon() {
  return (
    <svg
      width="37"
      height="26"
      viewBox="0 0 37 26"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="menu-plus">
        <path d="M19.0088 7v11.0098M24.0098 13.0078H13" stroke="currentColor" />
      </g>
    </svg>
  );
}
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
  const closing = useRef<Animation | null>(null);
  const closeMenu = () => {
    if (!dialog.current?.open || closing.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false);
      return;
    }
    const panel = dialog.current.querySelector(".menu-panel")!;
    const appearance = getComputedStyle(panel);
    closing.current = panel.animate(
      [
        { opacity: appearance.opacity, transform: appearance.transform },
        { opacity: 0, transform: "translateY(-6px) scale(.98)" },
      ],
      { duration: 180, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" },
    );
    dialog.current
      .querySelector(".menu-plus")
      ?.animate(
        [{ transform: "rotate(45deg)" }, { transform: "rotate(0deg)" }],
        { duration: 180, easing: "ease-out", fill: "forwards" },
      );
    closing.current.finished
      .then(() => {
        closing.current = null;
        setOpen(false);
      })
      .catch(() => {});
  };
  useEffect(() => () => closing.current?.cancel(), []);
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
      const box = trigger.current?.getBoundingClientRect();
      if (box && dialog.current) {
        dialog.current.style.left = `${Math.max(16, box.right - (225 * parseFloat(getComputedStyle(document.documentElement).fontSize)) / 16)}px`;
        dialog.current.style.top = `${box.bottom + 10}px`;
      }
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      dialog.current
        ?.querySelectorAll(".menu-panel, .menu-plus")
        .forEach((node) =>
          node.getAnimations().forEach((animation) => animation.cancel()),
        );
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const entries = [
    { title: t.work, url: `/${lang}/work` },
    { title: t.studio, url: `/${lang}/studio` },
    {
      title: "Email us",
      url: settings.email ? `mailto:${settings.email}` : "",
    },
    { title: "Youtube", url: settings.youtubeUrl || "" },
    { title: t.event, url: `/${lang}/event` },
    { title: "Tools *(soon)", url: settings.toolsUrl || "" },
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
          <Link href={`/${lang}/studio`}>{t.studio}</Link>
          <button
            ref={trigger}
            className="menu-trigger pill"
            onClick={() => setOpen(true)}
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <MenuIcon />
          </button>
        </nav>
        <div className="header-contact">
          <a className="pill dark" href={settings.callUrl}>
            <HoverLabel>{t.call}</HoverLabel>
          </a>
          {settings.whatsappUrl ? (
            <a className="pill" href={settings.whatsappUrl}>
              <HoverLabel>WhatsApp</HoverLabel>
            </a>
          ) : null}
        </div>
      </header>
      <dialog
        id="site-menu"
        ref={dialog}
        className="menu-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) closeMenu();
        }}
      >
        <div className="menu-panel">
          <button
            className="pill menu-trigger menu-close"
            aria-label={t.close}
            onClick={closeMenu}
          >
            <MenuIcon />
          </button>
          <nav aria-label={t.menu}>
            {entries.map((entry, index) => {
              const children = (
                <>
                  <span>{entry.title}</span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </>
              );
              return entry.url ? (
                <Link
                  key={index}
                  href={entry.url}
                  onClick={() => setOpen(false)}
                >
                  {children}
                </Link>
              ) : (
                <span
                  key={index}
                  className="menu-unavailable"
                  aria-disabled="true"
                >
                  {children}
                </span>
              );
            })}
          </nav>
          <div className="menu-languages">
            <div className="language-links">
              {(["en", "fr", "es"] as Language[]).map((language) => (
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
            <small>{String(entries.length + 1).padStart(2, "0")}</small>
          </div>
        </div>
      </dialog>
    </>
  );
}
