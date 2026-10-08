import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "node_modules-incomplete/**",
    ".next/**",
    "design-reference/**",
    "next-env.d.ts",
    "sanity.types.ts",
  ]),
]);
