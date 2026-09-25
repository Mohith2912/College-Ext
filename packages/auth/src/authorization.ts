import type { Session } from "next-auth";
import { prisma } from "@aetheria/database";
import { readEnvironment, type Role } from "@aetheria/validation";
import { AccessError } from "./errors";
import { ADMIN_ROLES, EDIT_ROLES, REVIEW_ROLES, canReadPublished, hasCurrentVerification, hasRole } from "./policy";

export type SessionReader = () => Promise<Session | null>;

export async function requireUser(auth: SessionReader) {
  const session = await auth();
  if (!session?.user?.id) throw new AccessError("UNAUTHENTICATED", 401, "Sign in to continue.");
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true, name: true, email: true, emailVerified: true, deletedAt: true } });
  if (!user || user.deletedAt !== null || user.emailVerified === null) throw new AccessError("UNAUTHENTICATED", 401, "Sign in with a verified account to continue.");
  return user;
}

/** organizationSlug comes from server configuration/routing, never an unchecked body ID. */
export async function requireOrganizationMembership(auth: SessionReader, organizationSlug = readEnvironment().ORGANIZATION_SLUG) {
  const user = await requireUser(auth);
  const organization = await prisma.organization.findFirst({ where: { slug: organizationSlug, deletedAt: null } });
  if (!organization) throw denied();
  const membership = await prisma.organizationMembership.findFirst({ where: { userId: user.id, organizationId: organization.id, deletedAt: null, revokedAt: null } });
  if (!membership) throw denied();
  return { user, organization, membership };
}

export async function requireRole(auth: SessionReader, roles: readonly Role[], organizationSlug?: string) {
  const context = await requireOrganizationMembership(auth, organizationSlug);
  if (!hasRole(context.membership.role, roles)) throw denied();
  return context;
}
export function requireAdminAccess(auth: SessionReader, organizationSlug?: string) { return requireRole(auth, ADMIN_ROLES, organizationSlug); }
export function requireContentEditAccess(auth: SessionReader, organizationSlug?: string) { return requireRole(auth, EDIT_ROLES, organizationSlug); }
export function requireReviewAccess(auth: SessionReader, organizationSlug?: string) { return requireRole(auth, REVIEW_ROLES, organizationSlug); }

export async function requireCourseAccess(auth: SessionReader, courseId: string, organizationSlug?: string) {
  const context = await requireOrganizationMembership(auth, organizationSlug);
  const course = await prisma.course.findFirst({ where: { id: courseId, organizationId: context.organization.id, deletedAt: null } });
  if (!course) throw new AccessError("NOT_FOUND", 404, "This course is unavailable.");
  if (course.status !== "PUBLISHED" && !hasRole(context.membership.role, [...EDIT_ROLES, ...REVIEW_ROLES])) throw denied();
  return { ...context, course };
}

/** Shared publication guard for queries that already resolved the resource under its tenant. */
export function requirePublishedContentAccess<T extends { status: string; deletedAt: Date | null; organizationId: string }>(content: T | null, organizationId: string): T {
  if (!content || !canReadPublished(content, organizationId)) throw new AccessError("NOT_FOUND", 404, "This content is unavailable.");
  return content;
}

/** A role named VERIFIED_STUDENT alone never grants access: verification must be current. */
export async function requireVerifiedStudent(auth: SessionReader, organizationSlug?: string) {
  const context = await requireOrganizationMembership(auth, organizationSlug);
  const verification = await prisma.institutionalVerification.findFirst({ where: { userId: context.user.id, organizationId: context.organization.id, status: "APPROVED", deletedAt: null, revokedAt: null, expiresAt: { gt: new Date() } }, orderBy: { expiresAt: "desc" } });
  if (!hasCurrentVerification(verification)) throw new AccessError("FORBIDDEN", 403, "A current institutional verification is required for this material.");
  return { ...context, verification: verification! };
}

/** Only returns metadata after checking publication, organization, verification and enrollment. */
export async function requireTranscriptAccess(auth: SessionReader, transcriptId: string, organizationSlug?: string) {
  const context = await requireOrganizationMembership(auth, organizationSlug);
  const transcript = await prisma.transcript.findFirst({
    where: { id: transcriptId, organizationId: context.organization.id, status: "PUBLISHED", deletedAt: null, module: { status: "PUBLISHED", deletedAt: null, course: { status: "PUBLISHED", deletedAt: null } } },
    select: { id: true, organizationId: true, title: true, visibility: true, module: { select: { courseId: true } } },
  });
  if (!transcript) throw new AccessError("NOT_FOUND", 404, "This transcript is unavailable.");
  if (transcript.visibility === "PRIVATE") throw denied();
  if (transcript.visibility !== "PUBLIC") {
    await requireVerifiedStudent(auth, organizationSlug);
    if (transcript.visibility === "ENROLLED_STUDENTS") {
      const enrollment = await prisma.enrollment.findFirst({ where: { userId: context.user.id, organizationId: context.organization.id, revokedAt: null, deletedAt: null, offering: { courseId: transcript.module.courseId, organizationId: context.organization.id, deletedAt: null, term: { deletedAt: null } } } });
      if (!enrollment) throw denied();
    }
  }
  return { ...context, transcript };
}

export function requireOwnership(resource: { userId: string; organizationId?: string | null }, userId: string, organizationId?: string): void {
  if (resource.userId !== userId || (organizationId !== undefined && resource.organizationId !== organizationId)) throw denied();
}

/** Invalidates all issued sessions on password change, compromise, or administrative revocation. */
export async function revokeUserSessions(userId: string): Promise<void> {
  await prisma.user.update({ where: { id: userId }, data: { sessionVersion: { increment: 1 } } });
}
function denied(): AccessError { return new AccessError("FORBIDDEN", 403, "You do not have access to this resource."); }
