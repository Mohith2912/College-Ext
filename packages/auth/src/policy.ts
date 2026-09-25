import type { Role } from "@aetheria/validation";

export const EDITORIAL_ROLES: readonly Role[] = ["CONTENT_EDITOR", "REVIEWER", "ADMIN", "SUPER_ADMIN"];
export const ADMIN_ROLES: readonly Role[] = ["ADMIN", "SUPER_ADMIN"];
export const REVIEW_ROLES: readonly Role[] = ["REVIEWER", "ADMIN", "SUPER_ADMIN"];
export const EDIT_ROLES: readonly Role[] = ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"];

export function hasRole(role: string, allowed: readonly Role[]): boolean { return allowed.some((candidate) => candidate === role); }
export function isCurrentMembership(membership: { organizationId: string; deletedAt: Date | null; revokedAt: Date | null }, organizationId: string): boolean {
  return membership.organizationId === organizationId && membership.deletedAt === null && membership.revokedAt === null;
}
export function hasCurrentVerification(verification: { status: string; expiresAt: Date | null; revokedAt: Date | null } | null, now: Date = new Date()): boolean {
  return Boolean(verification && verification.status === "APPROVED" && verification.revokedAt === null && verification.expiresAt !== null && verification.expiresAt > now);
}
export function canReadPublished(content: { status: string; deletedAt: Date | null; organizationId: string }, organizationId: string): boolean {
  return content.organizationId === organizationId && content.status === "PUBLISHED" && content.deletedAt === null;
}
