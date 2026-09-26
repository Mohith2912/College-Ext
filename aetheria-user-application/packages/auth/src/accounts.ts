import { prisma } from "@aetheria/database";
import { readEnvironment, registerSchema, verifyEmailSchema, type RegisterInput } from "@aetheria/validation";
import { AccessError } from "./errors";
import { sendVerificationEmail } from "./email";
import { requestAddress } from "./http";
import { hashPassword } from "./password";
import { consumeRateLimit } from "./rate-limit";
import { createVerificationToken, hashVerificationToken } from "./tokens";

const registrationMessage = "If this address needs verification, check its inbox for a link. You can sign in after verifying your email.";

export async function registerAccount(input: RegisterInput, options: { request?: Request; organizationSlug?: string } = {}): Promise<{ message: string }> {
  const data = registerSchema.parse(input);
  await consumeRateLimit("register-network", requestAddress(options.request), 20, 3600);
  await consumeRateLimit("register-email", data.email, 3, 3600);
  const organization = await prisma.organization.findFirst({ where: { slug: options.organizationSlug ?? readEnvironment().ORGANIZATION_SLUG, deletedAt: null } });
  if (!organization) throw new AccessError("SERVICE_UNAVAILABLE", 503, "Account registration is unavailable. Please try again later.");
  let user = await prisma.user.findUnique({ where: { email: data.email } });
  if (user?.emailVerified || user?.deletedAt) return { message: registrationMessage };
  if (!user) {
    const passwordHash = await hashPassword(data.password);
    try {
      user = await prisma.$transaction(async (tx) => {
        const created = await tx.user.create({ data: { name: data.name, email: data.email, passwordHash } });
        await tx.organizationMembership.create({ data: { userId: created.id, organizationId: organization.id, role: "STUDENT" } });
        await tx.consentRecord.create({ data: { organizationId: organization.id, userId: created.id, purpose: "terms-and-privacy", policyVersion: "2026-09-25", granted: true } });
        await tx.auditLog.create({ data: { organizationId: organization.id, actorId: created.id, action: "account.registered", entityType: "User", entityId: created.id, metadata: { policyVersion: "2026-09-25" } } });
        return created;
      });
    } catch (error) {
      if (typeof error !== "object" || error === null || !("code" in error) || error.code !== "P2002") throw error;
      user = await prisma.user.findUnique({ where: { email: data.email } });
    }
  }
  if (!user || user.emailVerified || user.deletedAt) return { message: registrationMessage };
  const { token, tokenHash } = createVerificationToken();
  await prisma.verificationToken.create({ data: { identifier: `email:${user.id}`, token: tokenHash, expires: new Date(Date.now() + 86_400_000) } });
  await sendVerificationEmail(user.email, token);
  return { message: registrationMessage };
}

export async function verifyEmail(rawToken: string, options: { request?: Request } = {}): Promise<{ message: string }> {
  const { token } = verifyEmailSchema.parse({ token: rawToken });
  await consumeRateLimit("verify-network", requestAddress(options.request), 60, 3600);
  await consumeRateLimit("verify-token", hashVerificationToken(token), 8, 3600);
  const tokenHash = hashVerificationToken(token);
  await prisma.$transaction(async (tx) => {
    const record = await tx.verificationToken.findUnique({ where: { token: tokenHash } });
    if (!record || record.expires <= new Date() || !record.identifier.startsWith("email:")) throw invalidToken();
    const userId = record.identifier.slice(6);
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user || user.deletedAt !== null || user.emailVerified !== null) throw invalidToken();
    // The guarded delete wins once even if two requests read the token concurrently.
    const claimed = await tx.verificationToken.deleteMany({ where: { id: record.id, token: tokenHash, expires: { gt: new Date() } } });
    if (claimed.count !== 1) throw invalidToken();
    await tx.user.update({ where: { id: userId }, data: { emailVerified: new Date() } });
    const memberships = await tx.organizationMembership.findMany({ where: { userId, deletedAt: null, revokedAt: null }, select: { organizationId: true } });
    for (const membership of memberships) {
      await tx.auditLog.create({ data: { organizationId: membership.organizationId, actorId: userId, action: "account.email_verified", entityType: "User", entityId: userId } });
    }
    await tx.verificationToken.deleteMany({ where: { identifier: record.identifier } });
  });
  return { message: "Your email is verified. You can now sign in." };
}

function invalidToken(): AccessError { return new AccessError("INVALID_OR_EXPIRED_TOKEN", 400, "This verification link has expired or was already used. Register again to request another link."); }
