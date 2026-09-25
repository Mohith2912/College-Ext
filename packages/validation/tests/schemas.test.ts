import { describe, expect, it } from "vitest";
import { normalizeSlug, registerSchema, requireRuntimeEnvironment, readingPreferencesSchema, verifyEmailSchema } from "../src/index";

describe("request validation", () => {
  it("normalizes email and rejects unknown privilege fields", () => {
    const input = { name: "Ada Student", email: " ADA@EXAMPLE.COM ", password: "a sufficiently long password", acceptTerms: true };
    expect(registerSchema.parse(input).email).toBe("ada@example.com");
    expect(registerSchema.safeParse({ ...input, role: "ADMIN" }).success).toBe(false);
  });
  it("rejects weak passwords and omitted consent", () => {
    expect(registerSchema.safeParse({ name: "Ada", email: "ada@example.com", password: "short", acceptTerms: true }).success).toBe(false);
    expect(registerSchema.safeParse({ name: "Ada", email: "ada@example.com", password: "long enough password" }).success).toBe(false);
  });
  it("bounds reader scale and verification token size", () => {
    expect(readingPreferencesSchema.safeParse({ readingScale: 141 }).success).toBe(false);
    expect(verifyEmailSchema.safeParse({ token: "a".repeat(64) }).success).toBe(true);
    expect(verifyEmailSchema.safeParse({ token: "anything" }).success).toBe(false);
  });
  it("normalizes safe human-readable slugs", () => {
    expect(normalizeSlug("  Économics & Society!  ")).toBe("economics-society");
  });
  it("fails closed without production secrets and HTTPS", () => {
    expect(() => requireRuntimeEnvironment({ NODE_ENV: "production" })).toThrow();
    expect(() => requireRuntimeEnvironment({ NODE_ENV: "production", DATABASE_URL: "mysql://user:password@localhost/db", AUTH_SECRET: "a".repeat(40), USERS_URL: "http://example.com", ADMIN_URL: "https://admin.example.com" })).toThrow("HTTPS");
  });
});
