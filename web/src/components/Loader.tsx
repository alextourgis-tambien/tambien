"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useLinkStatus } from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import assets from "@/data/assets.json";
function LoaderMark() {
  const { lang } = useParams<{ lang: string }>();
  const label =
    lang === "es" ? "Cargando" : lang === "en" ? "Loading" : "Chargement";
  return (
    <div className="loader-mark" role="status" aria-live="polite">
      <Image src={assets.home.imgVector} width={21} height={19} alt="" />
      <span aria-hidden="true">
        También<span className="loader-dot">.</span>
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
export function InitialLoader() {
  const [done, setDone] = useState(false);
  if (done) return null;
  // CSS also dismisses the loader when JavaScript is unavailable or slow.
  return (
    <div
      className="initial-loader"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setDone(true);
      }}
    >
      <LoaderMark />
    </div>
  );
}
export function NavigationLoader() {
  const { pending } = useLinkStatus();
  return pending
    ? createPortal(
        <div className="navigation-loader">
          <LoaderMark />
        </div>,
        document.body,
      )
    : null;
}
