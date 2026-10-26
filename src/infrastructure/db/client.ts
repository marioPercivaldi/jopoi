import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/config/env";
import * as schema from "@/infrastructure/db/schema";

const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

// Reuse one connection pool across hot reloads in development.
const sql = globalForDb.sql ?? postgres(env().DATABASE_URL, { prepare: false });
if (env().NODE_ENV !== "production") globalForDb.sql = sql;

export const db = drizzle(sql, { schema, casing: "snake_case" });

export type Database = typeof db;
