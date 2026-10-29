import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { prisma } from "@aetheria/database";
import { registerAccount, verifyEmail } from "../src/accounts";
import { requireAdminAccess, requireOrganizationMembership, requireUser } from "../src/authorization";
import { sendVerificationEmail } from "../src/email";
import { AccessError } from "../src/errors";
import { verifyPassword } from "../src/password";
import { hashVerificationToken } from "../src/tokens";

vi.mock("../src/email", () => ({ sendVerificationEmail: vi.fn().mockResolvedValue(undefined) }));

const suffix = randomUUID();
const slug = `auth-test-${suffix}`;
const email = `auth-${suffix}@example.test`;
const password = "original integration passphrase";
let organizationId = "";
let userId = "";
let token = "";

beforeAll(async () => {
  const url = new URL(process.env.DATABASE_URL || "mysql://localhost/missing");
  if (!url.pathname.endsWith("_test")) throw new Error("Auth integration tests require a dedicated database whose name ends with _test.");
  const organization = await prisma.organization.create({ data: { slug, name: "Authentication integration organization" } });
  organizationId = organization.id;
});

afterAll(async () => {
  if (organizationId) {
    const ids = (await prisma.organizationMembership.findMany({ where: { organizationId }, select: { userId: true } })).map((row) => row.userId);
    await prisma.verificationToken.deleteMany({ where: { identifier: { in: ids.map((id) => `email:${id}`) } } });
    await prisma.auditLog.deleteMany({ where: { organizationId } });
    await prisma.consentRecord.deleteMany({ where: { organizationId } });
    await prisma.organizationMembership.deleteMany({ where: { organizationId } });
    await prisma.user.deleteMany({ where: { id: { in: ids } } });
    await prisma.organization.delete({ where: { id: organizationId } });
  }
  await prisma.$disconnect();
});

describe.sequential("registration and organization authorization against MySQL", () => {
  it("persists only a password hash, student role, consent and token digest", async () => {
    const result = await registerAccount({ name: "Integration Student", email, password, acceptTerms: true }, { organizationSlug: slug });
    expect(result.message).toContain("verification");
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userId = user.id;
    expect(user.emailVerified).toBeNull();
    expect(user.passwordHash).not.toBe(password);
    expect(await verifyPassword(password, user.passwordHash!)).toBe(true);
    expect(await prisma.organizationMembership.findFirst({ where: { userId, organizationId } })).toHaveProperty("role", "STUDENT");
    expect(await prisma.consentRecord.count({ where: { userId, organizationId, granted: true } })).toBe(1);
    const delivery = vi.mocked(sendVerificationEmail).mock.calls.find((call) => call[0] === email);
    expect(delivery).toBeDefined();
    token = delivery![1];
    const stored = await prisma.verificationToken.findUnique({ where: { token: hashVerificationToken(token) } });
    expect(stored).not.toBeNull();
    expect(stored!.token).not.toBe(token);
  });
  it("denies an unverified session and atomically consumes verification once", async () => {
    const auth = async () => ({ user: { id: userId }, expires: "2030-01-01" });
    await expect(requireUser(auth)).rejects.toMatchObject({ status: 401 });
    const attempts = await Promise.allSettled([verifyEmail(token), verifyEmail(token)]);
    expect(attempts.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    expect(attempts.filter((result) => result.status === "rejected")).toHaveLength(1);
    await expect(requireUser(auth)).resolves.toHaveProperty("id", userId);
    expect(await prisma.verificationToken.count({ where: { identifier: `email:${userId}` } })).toBe(0);
    expect(await prisma.auditLog.count({ where: { organizationId, action: "account.email_verified" } })).toBe(1);
  });
  it("enforces current roles, organization scope and revocation against persisted records", async () => {
    const auth = async () => ({ user: { id: userId }, expires: "2030-01-01" });
    await expect(requireAdminAccess(auth, slug)).rejects.toMatchObject({ status: 403 });
    await expect(requireOrganizationMembership(auth, `missing-${suffix}`)).rejects.toMatchObject({ status: 403 });
    await prisma.organizationMembership.update({ where: { userId_organizationId: { userId, organizationId } }, data: { role: "ADMIN" } });
    await expect(requireAdminAccess(auth, slug)).resolves.toHaveProperty("membership.role", "ADMIN");
    await prisma.organizationMembership.update({ where: { userId_organizationId: { userId, organizationId } }, data: { revokedAt: new Date() } });
    await expect(requireAdminAccess(auth, slug)).rejects.toMatchObject({ status: 403 });
  });
  it("rejects expired verification tokens", async () => {
    const expiredToken = "f".repeat(64);
    await prisma.verificationToken.create({ data: { identifier: `email:${userId}`, token: hashVerificationToken(expiredToken), expires: new Date(Date.now() - 60_000) } });
    await expect(verifyEmail(expiredToken)).rejects.toMatchObject({ code: "INVALID_OR_EXPIRED_TOKEN" });
  });
  it("does not report registration success when email delivery fails", async () => {
    vi.mocked(sendVerificationEmail).mockRejectedValueOnce(new AccessError("EMAIL_UNAVAILABLE", 503, "Email unavailable"));
    await expect(registerAccount({ name: "Delivery Failure", email: `failure-${suffix}@example.test`, password, acceptTerms: true }, { organizationSlug: slug })).rejects.toMatchObject({ code: "EMAIL_UNAVAILABLE", status: 503 });
  });
});
