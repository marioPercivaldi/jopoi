import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

// All data access goes through the Drizzle ORM inside src/infrastructure.
const dataAccessOutsideInfrastructure = {
  group: ["postgres", "@supabase/supabase-js", "drizzle-orm", "drizzle-orm/*"],
  message: "Data access lives in src/infrastructure, through the Drizzle ORM.",
};

const restrictImports = (...patterns) => ({
  "no-restricted-imports": ["error", { patterns }],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/infrastructure/**", "src/domain/**", "src/application/**"],
    rules: restrictImports(dataAccessOutsideInfrastructure),
  },
  {
    // The domain layer holds pure business rules: no framework, database or provider imports.
    files: ["src/domain/**/*.ts"],
    rules: restrictImports(
      dataAccessOutsideInfrastructure,
      {
        group: ["next", "next/*", "react", "react-dom", "@supabase/*"],
        message:
          "src/domain must stay framework-free. Depend on a port and implement it in src/infrastructure.",
      },
      {
        group: ["@/application/*", "@/infrastructure/*", "@/app/*", "@/ui/*"],
        message: "src/domain cannot depend on outer layers.",
      },
    ),
  },
  {
    // Use cases talk to ports, never to concrete adapters or the UI.
    files: ["src/application/**/*.ts"],
    rules: restrictImports(dataAccessOutsideInfrastructure, {
      group: ["@/infrastructure/*", "@/app/*", "@/ui/*", "next", "next/*"],
      message: "src/application depends only on src/domain and its own ports.",
    }),
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "playwright-report/**",
  ]),
]);

export default eslintConfig;
