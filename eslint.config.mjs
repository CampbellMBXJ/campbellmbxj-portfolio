import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

const pageImports = ["@/pages/**", "**/pages/**"];
const featureImports = ["@/features/**", "**/features/**"];
const shellImports = ["@/components/tv-shell/**", "**/tv-shell/**"];
const routingImports = ["@/routing/**", "**/routing/**", "next/router", "next/navigation"];
const restrictImports = (patterns) => ["error", { patterns }];

export default defineConfig([
  // Next's React/import/accessibility plugins still use pre-ESLint 10 context APIs.
  ...fixupConfigRules(nextVitals),
  // The bundled Babel parser does not yet support ESLint 10's scope API.
  { languageOptions: { parser: tseslint.parser } },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrictImports(pageImports) },
  },
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrictImports([...pageImports, ...featureImports, ...shellImports, ...routingImports]) },
  },
  {
    files: ["src/components/tv-shell/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrictImports([...pageImports, ...featureImports]) },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrictImports([...pageImports, ...shellImports, ...routingImports]) },
  },
  {
    files: ["src/features/projects/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrictImports([...pageImports, ...shellImports, ...routingImports, "@/features/work/**", "**/work/**"]) },
  },
  {
    files: ["src/features/work/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrictImports([...pageImports, ...shellImports, ...routingImports, "@/features/projects/**", "**/projects/**"]) },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "test-results/**"]),
]);
