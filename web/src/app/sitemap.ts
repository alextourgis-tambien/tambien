import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { languages } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.SITE_INDEXABLE !== "true") return [];
  const content = await getContent();
  const paths = [
    "",
    "/work",
    "/pricing",
    "/resources",
    "/tools/fluent",
    ...content.pages
      .filter((page) => !page.seo?.noIndex)
      .map((page) => `/${page.slug}`),
    ...content.projects
      .filter((project) => !project.seo?.noIndex)
      .map((project) => `/projects/${project.slug}`),
  ];
  return languages.flatMap((lang) =>
    paths.map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${siteUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
