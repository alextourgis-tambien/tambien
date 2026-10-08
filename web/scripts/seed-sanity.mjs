import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { randomUUID } from "node:crypto";
import ts from "typescript";
import { createClient } from "@sanity/client";

// Run from studio with `npm run seed`. Existing drafts are never replaced.
const web = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = JSON.parse(
  await readFile(path.join(web, "src/data/assets.json"), "utf8"),
);
let source = await readFile(path.join(web, "src/data/seed.ts"), "utf8");
source = source
  .replace(
    /import assets from ['"]\.\/assets\.json['"];?/,
    `const assets=${JSON.stringify(assets)};`,
  )
  .replace(
    /import\s*\{\s*localized as l\s*\}\s*from ['"]@\/lib\/i18n['"];?/,
    "const l=(en,fr,es)=>({en,fr,es});",
  );
const code = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { seed } = await import(
  `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
);
const dryRun = process.argv.includes("--dry-run");
const token =
  process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
if (!dryRun && !token)
  throw new Error(
    "Connexion requise : depuis studio, lancer npm run seed après sanity login.",
  );
const client = createClient({
  projectId: "kxrtuoyl",
  dataset: "production",
  apiVersion: "2026-10-08",
  useCdn: false,
  token,
});
const uploads = new Map();
async function upload(src) {
  if (!uploads.has(src))
    uploads.set(
      src,
      (async () => {
        if (dryRun) return `image-dryrun-${uploads.size}-100x100-png`;
        const file = path.join(web, "public", src);
        const asset = await client.assets.upload(
          "image",
          await readFile(file),
          { filename: path.basename(file) },
        );
        return asset._id;
      })(),
    );
  return {
    _type: "image",
    asset: { _type: "reference", _ref: await uploads.get(src) },
  };
}
async function convert(value) {
  if (Array.isArray(value))
    return Promise.all(
      value.map(async (item, index) => {
        const converted = await convert(item);
        return converted && typeof converted === "object"
          ? { _key: `item-${index}`, ...converted }
          : converted;
      }),
    );
  if (!value || typeof value !== "object") return value;
  if (value.src && value.width && value.height) {
    return {
      _type: "media",
      image: await upload(value.src),
      alt: value.alt,
      frameWidth: value.width,
      frameHeight: value.height,
      ...(value.background ? { background: value.background } : {}),
      ...(value.crop ? { crop: value.crop } : {}),
      ...(value.embedSearch ? { embedSearch: true } : {}),
      ...(value.overlay
        ? {
            overlay: {
              image: await upload(value.overlay.src),
              width: value.overlay.width,
              height: value.overlay.height,
            },
          }
        : {}),
    };
  }
  const result = {};
  for (const [key, item] of Object.entries(value))
    if (item !== undefined) result[key] = await convert(item);
  if (
    [
      "text",
      "image",
      "imagePair",
      "imageText",
      "video",
      "gallery",
      "quote",
      "statement",
      "spacer",
      "credits",
    ].includes(value._type) &&
    !value.asset
  ) {
    result.kind = value._type;
    result._type = "contentBlock";
  }
  return result;
}
const id = (type, name) => `${type}-${name}`;
const documents = [];
function add(type, data, name) {
  documents.push({
    _type: type,
    ...data,
    _id: `drafts.${name || id(type, data._id)}`,
  });
}
for (const [order, service] of seed.settings.services.entries())
  add(
    "service",
    { ...service, slug: { _type: "slug", current: service.slug }, order },
    id("service", service.slug),
  );
const storedProjects = dryRun
  ? []
  : await client.fetch(
      '*[_type == "project" && defined(slug.current)]{_id,"slug":slug.current}',
      {},
      { perspective: "raw" },
    );
const projectIds = new Map(
  storedProjects.map((project) => [
    project.slug,
    project._id.replace(/^drafts\./, ""),
  ]),
);
const existingSlugs = new Set(projectIds.keys());
for (const project of seed.projects) {
  if (!projectIds.has(project.slug)) projectIds.set(project.slug, randomUUID());
}
for (const project of seed.projects) {
  if (existingSlugs.has(project.slug)) continue;
  add(
    "project",
    {
      ...project,
      slug: { _type: "slug", current: project.slug },
      services: (project.services || []).map((slug) => ({
        _type: "reference",
        _ref: id("service", slug),
        _weak: true,
        _strengthenOnPublish: { type: "service" },
      })),
      related: (project.related || []).map((ref) => ({
        _type: "reference",
        _ref: projectIds.get(
          seed.projects.find((item) => item._id === ref)?.slug || ref,
        ),
        _weak: true,
        _strengthenOnPublish: { type: "project" },
      })),
    },
    projectIds.get(project.slug),
  );
}
for (const item of seed.feed) {
  const { projectSlug, ...data } = item;
  add("feedItem", {
    ...data,
    ...(projectSlug
      ? {
          project: {
            _type: "reference",
            _ref: projectIds.get(projectSlug),
            _weak: true,
            _strengthenOnPublish: { type: "project" },
          },
        }
      : {}),
  });
}
for (const [order, step] of seed.process.entries())
  add("processStep", { ...step, order }, id("processStep", step._key));
for (const [order, item] of seed.testimonials.entries())
  add("testimonial", { ...item, order });
for (const [order, item] of seed.offers.entries())
  add("offer", { ...item, order });
for (const item of seed.pages)
  add("page", {
    ...item,
    name: item.slug,
    slug: { _type: "slug", current: item.slug },
  });
const settings = { ...seed.settings };
delete settings.services;
settings.clients = await Promise.all(
  settings.clients.map(async ({ icon, ...client }) => ({
    ...client,
    ...(icon ? { icon: await upload(icon) } : {}),
  })),
);
add("settings", settings, "settings");
const converted = await Promise.all(documents.map(convert));
if (dryRun) {
  console.log(
    `Validé : ${converted.length} brouillons, ${uploads.size} images. Aucun contenu envoyé.`,
  );
} else {
  let transaction = client.transaction();
  for (const document of converted)
    transaction = transaction.createIfNotExists(document);
  await transaction.commit();
  console.log(
    `Import terminé : ${converted.length} documents préparés en brouillon. Publier les réglages en dernier après validation.`,
  );
}
