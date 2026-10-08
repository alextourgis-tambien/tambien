import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: { projectId: "kxrtuoyl", dataset: "production" },
  deployment: { appId: "cg5cj89kejp8hbfledze21pp" },
  typegen: {
    enabled: true,
    path: "../web/src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../web/sanity.types.ts",
    overloadClientMethods: true,
  },
});
