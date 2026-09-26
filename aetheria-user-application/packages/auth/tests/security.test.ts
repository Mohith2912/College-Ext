import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "../src/password";
import { canReadPublished, hasCurrentVerification, hasRole, isCurrentMembership, ADMIN_ROLES } from "../src/policy";
import { createVerificationToken, hashVerificationToken } from "../src/tokens";

describe("password security", () => {
  it("uses independent salts and rejects incorrect passwords and malformed hashes", async () => {
    const password = "an original and long passphrase";
    const [first, second] = await Promise.all([hashPassword(password), hashPassword(password)]);
    expect(first).toMatch(/^\$argon2id\$/);
    expect(first).not.toBe(second);
    expect(await verifyPassword(password, first)).toBe(true);
    expect(await verifyPassword("a wrong but lengthy password", first)).toBe(false);
    expect(await verifyPassword(password, "broken hash")).toBe(false);
  });
});
describe("authorization policy", () => {
  it("denies a valid role in another organization and revoked membership", () => {
    expect(isCurrentMembership({ organizationId: "one", deletedAt: null, revokedAt: null }, "two")).toBe(false);
    expect(isCurrentMembership({ organizationId: "one", deletedAt: null, revokedAt: new Date() }, "one")).toBe(false);
    expect(hasRole("CONTENT_EDITOR", ADMIN_ROLES)).toBe(false);
    expect(hasRole("ADMIN", ADMIN_ROLES)).toBe(true);
  });
  it("requires unexpired, unrevoked verification, including exact expiry boundary", () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const valid = { status: "APPROVED", expiresAt: new Date(now.getTime() + 1), revokedAt: null };
    expect(hasCurrentVerification(valid, now)).toBe(true);
    expect(hasCurrentVerification({ ...valid, expiresAt: now }, now)).toBe(false);
    expect(hasCurrentVerification({ ...valid, expiresAt: null }, now)).toBe(false);
    expect(hasCurrentVerification({ ...valid, revokedAt: now }, now)).toBe(false);
    expect(hasCurrentVerification({ ...valid, status: "PENDING" }, now)).toBe(false);
  });
  it("never exposes unpublished, deleted, or cross-organization public content", () => {
    const content = { status: "PUBLISHED", organizationId: "one", deletedAt: null };
    expect(canReadPublished(content, "one")).toBe(true);
    expect(canReadPublished(content, "two")).toBe(false);
    expect(canReadPublished({ ...content, status: "DRAFT" }, "one")).toBe(false);
    expect(canReadPublished({ ...content, deletedAt: new Date() }, "one")).toBe(false);
  });
});
describe("verification tokens", () => {
  it("creates unpredictable tokens and stores only a reproducible digest", () => {
    const first = createVerificationToken();
    const second = createVerificationToken();
    expect(first.token).toHaveLength(64);
    expect(first.token).not.toBe(second.token);
    expect(first.tokenHash).not.toBe(first.token);
    expect(hashVerificationToken(first.token)).toBe(first.tokenHash);
  });
});
