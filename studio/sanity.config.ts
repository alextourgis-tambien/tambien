import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemaTypes";
export default defineConfig({
  name: "tambien",
  title: "También — Contenus",
  projectId: "kxrtuoyl",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("También")
          .items([
            S.listItem()
              .title("Réglages du site")
              .child(
                S.document().schemaType("settings").documentId("settings"),
              ),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "settings",
            ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin:
          process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (options) =>
      options.filter((option) => option.templateId !== "settings"),
  },
});
