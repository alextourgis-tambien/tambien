import { InitialLoader } from "@/components/Loader";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { isLanguage, languages } from "@/lib/i18n";
import { SanityLive } from "@/sanity/live";
import "../globals.css";
const diatype = localFont({
  src: [
    { path: "../../../public/fonts/ABCDiatype-Regular.woff2", weight: "400" },
    { path: "../../../public/fonts/ABCDiatype-Medium.woff2", weight: "500" },
    { path: "../../../public/fonts/ABCDiatype-Bold.woff2", weight: "700" },
  ],
  variable: "--font-diatype",
  display: "swap",
});
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return (
    <html
      data-scroll-behavior="smooth"
      lang={lang}
      className={diatype.variable}
    >
      <body>
        <InitialLoader />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
