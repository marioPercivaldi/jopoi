import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { parseEnv } = await import("@/config/env");

describe("parseEnv", () => {
  it("accepts a postgres connection string", () => {
    const parsed = parseEnv({
      DATABASE_URL: "postgresql://postgres:postgres@127.0.0.1:54422/postgres",
    });
    expect(parsed.NODE_ENV).toBe("development");
  });

  it("fails when DATABASE_URL is missing", () => {
    expect(() => parseEnv({})).toThrow(/DATABASE_URL/);
  });

  it("fails when DATABASE_URL is not a postgres URL", () => {
    expect(() => parseEnv({ DATABASE_URL: "https://example.com" })).toThrow(/DATABASE_URL/);
  });
});
