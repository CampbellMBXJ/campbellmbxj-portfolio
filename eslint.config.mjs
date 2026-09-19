import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Next's React/import/accessibility plugins still use pre-ESLint 10 context APIs.
  ...fixupConfigRules(nextVitals),
  // The bundled Babel parser does not yet support ESLint 10's scope API.
  { languageOptions: { parser: tseslint.parser } },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "test-results/**"]),
]);
