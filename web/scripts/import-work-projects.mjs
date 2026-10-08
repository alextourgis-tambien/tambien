import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { randomUUID } from "node:crypto";
import ts from "typescript";
import { createClient } from "@sanity/client";

// Add newly identified portfolio projects as drafts; never replace editor content.
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
const token =
  process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
if (!token)
  throw new Error(
    "Run with the Sanity CLI: sanity exec scripts/import-work-projects.mjs --with-user-token",
  );
const client = createClient({
  projectId: "kxrtuoyl",
  dataset: "production",
  apiVersion: "2026-10-08",
  useCdn: false,
  token,
  perspective: "raw",
});
const existing = await client.fetch(
  '*[_type == "project" && defined(slug.current)]{"slug":slug.current}',
);
const known = new Set(existing.map((item) => item.slug));
for (const project of seed.projects) {
  if (known.has(project.slug)) continue;
  const asset = await client.assets.upload(
    "image",
    await readFile(path.join(web, "public", project.cover.src)),
    { filename: path.basename(project.cover.src) },
  );
  const { cover, slug, ...fields } = project;
  // A random draft ID avoids encoding names in persistent content identifiers.
  await client.create({
    ...fields,
    _id: `drafts.${randomUUID()}`,
    _type: "project",
    slug: { _type: "slug", current: slug },
    cover: {
      _type: "media",
      frameWidth: cover.width,
      frameHeight: cover.height,
      alt: { _type: "localized", ...cover.alt },
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    },
    title: { _type: "localized", ...fields.title },
    description: { _type: "localized", ...fields.description },
  });
  console.log(`Added draft: ${project.name}`);
}
