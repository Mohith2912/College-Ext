import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  user: { findUnique: vi.fn(), update: vi.fn() },
  organization: { findFirst: vi.fn() },
  organizationMembership: { findFirst: vi.fn() },
  course: { findFirst: vi.fn() },
  institutionalVerification: { findFirst: vi.fn() },
  transcript: { findFirst: vi.fn() },
  enrollment: { findFirst: vi.fn() },
}));
vi.mock("@aetheria/database", () => ({ prisma: db }));
import { requireAdminAccess, requireOrganizationMembership, requireOwnership, requireTranscriptAccess, requireUser, requireVerifiedStudent } from "../src/authorization";

const session = { user: { id: "student-id", name: "Student", email: "student@example.com" }, expires: "2030-01-01" };
const auth = async () => session;
beforeEach(() => {
  vi.resetAllMocks();
  db.user.findUnique.mockResolvedValue({ ...session.user, emailVerified: new Date(), deletedAt: null });
  db.organization.findFirst.mockResolvedValue({ id: "org-one", slug: "aetheria" });
  db.organizationMembership.findFirst.mockResolvedValue({ organizationId: "org-one", userId: "student-id", role: "STUDENT", revokedAt: null, deletedAt: null });
});

describe("server authorization boundaries", () => {
  it("rejects a deleted account even when an old session still exists", async () => {
    db.user.findUnique.mockResolvedValue({ ...session.user, emailVerified: new Date(), deletedAt: new Date() });
    await expect(requireUser(auth)).rejects.toMatchObject({ status: 401 });
  });
  it("requires a membership scoped to the resolved organization", async () => {
    db.organizationMembership.findFirst.mockResolvedValue(null);
    await expect(requireOrganizationMembership(auth, "another-org")).rejects.toMatchObject({ status: 403 });
    expect(db.organizationMembership.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ userId: "student-id", organizationId: "org-one", deletedAt: null, revokedAt: null }) }));
  });
  it("rechecks admin privilege on every request", async () => {
    db.organizationMembership.findFirst.mockResolvedValueOnce({ role: "ADMIN" }).mockResolvedValueOnce({ role: "STUDENT" });
    await expect(requireAdminAccess(auth)).resolves.toHaveProperty("membership.role", "ADMIN");
    await expect(requireAdminAccess(auth)).rejects.toMatchObject({ status: 403 });
  });
  it("does not grant restricted access from a role name alone", async () => {
    db.organizationMembership.findFirst.mockResolvedValue({ role: "VERIFIED_STUDENT" });
    db.institutionalVerification.findFirst.mockResolvedValue(null);
    await expect(requireVerifiedStudent(auth)).rejects.toMatchObject({ status: 403 });
  });
  it("requires current enrollment in addition to current verification", async () => {
    db.transcript.findFirst.mockResolvedValue({ id: "restricted", visibility: "ENROLLED_STUDENTS", module: { courseId: "course-one" } });
    db.institutionalVerification.findFirst.mockResolvedValue({ status: "APPROVED", expiresAt: new Date(Date.now() + 60_000), revokedAt: null });
    db.enrollment.findFirst.mockResolvedValue(null);
    await expect(requireTranscriptAccess(auth, "restricted")).rejects.toMatchObject({ status: 403 });
  });
  it("rejects another user's private resource and a cross-organization owner match", () => {
    expect(() => requireOwnership({ userId: "another" }, "student-id")).toThrow();
    expect(() => requireOwnership({ userId: "student-id", organizationId: "org-two" }, "student-id", "org-one")).toThrow();
  });
});
