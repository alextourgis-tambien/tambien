import "server-only";
import { cache } from "react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { SITE_QUERY } from "@/sanity/queries";
import { seed } from "@/data/seed";
import type { SITE_QUERY_RESULT } from "../../sanity.types";
import type { SiteContent, Media } from "./types";
import type { Localized } from "./i18n";
import type { SanityImageSource } from "@sanity/image-url";
// Sanity's stored shape is normalized at this boundary; the renderer uses one model.
function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize);
  if (!value || typeof value !== "object") return value;
  const obj = value as Record<string, unknown>;
  if (obj._type === "slug") return obj.current;
  if (obj._type === "media") {
    const image = obj.image as
      { _type?: string; asset?: { _ref?: string } } | undefined;
    const ref = image?.asset?._ref;
    if (!ref) return undefined;
    const dimensions = ref.match(/-(\d+)x(\d+)-/);
    const overlay = obj.overlay as
      { image?: SanityImageSource; width: number; height: number } | undefined;
    return {
      src: createImageUrlBuilder(client)
        .image(image as SanityImageSource)
        .format("webp")
        .width(2000)
        .url(),
      width: Number(obj.frameWidth || dimensions?.[1] || 1600),
      height: Number(obj.frameHeight || dimensions?.[2] || 1000),
      alt: normalize(obj.alt) as Localized,
      background: obj.background as string | undefined,
      crop: obj.crop as string | undefined,
      embedSearch: obj.embedSearch as boolean | undefined,
      overlay: overlay?.image
        ? {
            src: createImageUrlBuilder(client).image(overlay.image).url(),
            width: overlay.width,
            height: overlay.height,
          }
        : undefined,
    } satisfies Media;
  }
  if (
    obj._type === "image" &&
    (obj.asset as { _ref?: string } | undefined)?._ref
  )
    return createImageUrlBuilder(client)
      .image(obj as SanityImageSource)
      .format("webp")
      .width(1200)
      .url();
  const result = Object.fromEntries(
    Object.entries(obj)
      .filter(([, item]) => item !== null)
      .map(([key, item]) => [key, normalize(item)]),
  );
  if (obj._type === "contentBlock") result._type = obj.kind;
  if (obj._type === "processStep") result._key = obj._id;
  if (obj._type === "project") result.blocks = result.blocks || [];
  return result;
}
export const getContent = cache(async (): Promise<SiteContent> => {
  const result = await sanityFetch({ query: SITE_QUERY, stega: false });
  const data = result.data as SITE_QUERY_RESULT;
  if (!data.settings) return seed;
  const normalized = normalize(data) as Partial<SiteContent> & {
    services?: SiteContent["settings"]["services"];
  };
  const feed = (normalized.feed || [])
    .map((item) => {
      const source = item as typeof item & {
        project?: {
          slug: string;
          cover: Media;
          title: typeof item.title;
          description: typeof item.description;
        };
      };
      return {
        ...item,
        projectSlug: source.project?.slug,
        media: item.media || source.project?.cover,
        title: item.title || source.project?.title,
        description: item.description || source.project?.description,
      };
    })
    .filter((item) => item.media);
  return {
    ...seed,
    ...normalized,
    settings: {
      ...seed.settings,
      ...normalized.settings,
      services: normalized.services || seed.settings.services,
    },
    feed,
    process: (normalized.process || seed.process).map((step, index) => ({
      ...step,
      media: step.media || seed.process[index]?.media,
    })),
  };
});
