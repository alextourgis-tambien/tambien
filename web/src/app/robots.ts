import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: process.env.SITE_INDEXABLE === "true" ? "/" : undefined,
      disallow: process.env.SITE_INDEXABLE === "true" ? "/api/" : "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
