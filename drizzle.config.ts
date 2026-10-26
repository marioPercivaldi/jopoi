import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env.local", ".env"] });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infrastructure/db/schema",
  // Migrations live where the Supabase CLI applies them, so there is one history for both tools.
  out: "./supabase/migrations",
  migrations: { prefix: "supabase" },
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:54422/postgres",
  },
  strict: true,
  verbose: true,
});
