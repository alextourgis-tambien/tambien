import type { Metadata } from "next";
import { languages, translate, type Language } from "./i18n";
import type { Seo, Settings } from "./types";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
export function metadata(
  lang: Language,
  path: string,
  title: string,
  description: string,
  settings: Settings,
  seo?: Seo,
): Metadata {
  const url = `${siteUrl}/${lang}${path}`;
  const seoTitle = translate(seo?.title, lang) || title;
  const seoDescription = translate(seo?.description, lang) || description;
  return {
    metadataBase: new URL(siteUrl),
    title: `${seoTitle} — ${settings.siteName}`,
    description: seoDescription,
    alternates: {
      canonical: seo?.canonical || url,
      languages: Object.fromEntries([
        ...languages.map((l) => [l, `${siteUrl}/${l}${path}`]),
        ["x-default", `${siteUrl}/fr${path}`],
      ]),
    },
    robots: {
      index: process.env.SITE_INDEXABLE === "true" && !seo?.noIndex,
      follow: true,
    },
    openGraph: {
      type: "website",
      url,
      title: translate(seo?.ogTitle, lang) || seoTitle,
      description: translate(seo?.ogDescription, lang) || seoDescription,
      siteName: settings.siteName,
      locale: { fr: "fr_FR", en: "en_GB", es: "es_ES" }[lang],
      images: seo?.ogImage ? [seo.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  };
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
