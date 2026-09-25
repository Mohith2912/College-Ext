import { z } from "zod";

export const roleSchema = z.enum(["STUDENT", "VERIFIED_STUDENT", "CONTENT_EDITOR", "REVIEWER", "ADMIN", "SUPER_ADMIN"]);
export type Role = z.infer<typeof roleSchema>;
export const publicationStatusSchema = z.enum(["DRAFT", "IN_REVIEW", "PUBLISHED", "ARCHIVED"]);
export const uuidSchema = z.string().uuid();
export const emailSchema = z.string().trim().toLowerCase().max(254).email("Enter a valid email address.");
export const passwordSchema = z.string().min(12, "Use at least 12 characters.").max(128, "Use no more than 128 characters.");
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: emailSchema,
  password: passwordSchema,
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "Accept the terms and privacy policy to continue." }) }),
}).strict();
export const signInSchema = z.object({ email: emailSchema, password: z.string().min(1).max(128) });
export const verifyEmailSchema = z.object({ token: z.string().regex(/^[a-f0-9]{64}$/, "This verification link is invalid.") }).strict();
export const resendVerificationSchema = z.object({ email: emailSchema }).strict();
export const paginationSchema = z.object({ page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(20) });
export const slugSchema = z.string().min(1).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export function normalizeSlug(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100).replace(/-+$/g, "");
}
export const courseFilterSchema = paginationSchema.extend({ term: slugSchema.optional(), query: z.string().trim().max(100).optional() });
export const readingPreferencesSchema = z.object({ theme: z.enum(["light", "sepia", "dark", "system"]).default("light"), readingScale: z.number().int().min(85).max(140).default(100), readingWidth: z.enum(["comfortable", "wide"]).default("comfortable"), reducedMotion: z.boolean().default(false) }).strict();
export const progressSchema = z.object({ moduleId: uuidSchema, percentage: z.number().min(0).max(100), headingId: z.string().max(160).optional() }).strict();
export const bookmarkSchema = z.object({ moduleId: uuidSchema, headingId: z.string().max(160).optional(), note: z.string().max(2000).optional() }).strict();
export const noteDraftSchema = z.object({ title: z.string().trim().min(3).max(180), markdown: z.string().min(1).max(200_000), summary: z.string().max(1000).optional() }).strict();
export const apiErrorCodeSchema = z.enum(["UNAUTHENTICATED", "FORBIDDEN", "NOT_FOUND", "VALIDATION_ERROR", "INVALID_OR_EXPIRED_TOKEN", "RATE_LIMITED", "ORIGIN_REJECTED", "UNSUPPORTED_MEDIA_TYPE", "PAYLOAD_TOO_LARGE", "EMAIL_UNAVAILABLE", "SERVICE_UNAVAILABLE", "INTERNAL_ERROR"]);
export const apiErrorSchema = z.object({ ok: z.literal(false), error: z.object({ code: apiErrorCodeSchema, message: z.string(), fields: z.record(z.array(z.string())).optional() }) });
export function apiSuccessSchema<T extends z.ZodTypeAny>(data: T) { return z.object({ ok: z.literal(true), data }); }
export const registrationResponseSchema = apiSuccessSchema(z.object({ message: z.string() }));
export type RegisterInput = z.infer<typeof registerSchema>;

const optionalString = z.preprocess((value) => value === "" ? undefined : value, z.string().optional());
const optionalUrl = z.preprocess((value) => value === "" ? undefined : value, z.string().url().optional());
export const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: optionalUrl,
  AUTH_SECRET: optionalString,
  USERS_URL: z.string().url().default("http://localhost:3000"),
  ORGANIZATION_SLUG: slugSchema.default("aetheria"),
  SMTP_HOST: optionalString,
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(1025),
  SMTP_USER: optionalString,
  SMTP_PASSWORD: optionalString,
  SMTP_FROM: z.string().default("Aetheria Study Companion <hello@localhost>"),
  SMTP_SECURE: z.enum(["true", "false"]).default("false").transform((value) => value === "true"),
  TRUST_PROXY: z.enum(["true", "false"]).default("false").transform((value) => value === "true"),
});
export type Environment = z.infer<typeof environmentSchema>;

/** Parse configuration without requiring services or secrets during a Next.js build. */
export function readEnvironment(source: Record<string, string | undefined> = process.env): Environment {
  return environmentSchema.parse(source);
}

/** Call at request time: a production server must never substitute a development secret. */
export function requireRuntimeEnvironment(source: Record<string, string | undefined> = process.env): Environment & { AUTH_SECRET: string; DATABASE_URL: string } {
  const env = readEnvironment(source);
  if (!env.DATABASE_URL || !/^mysql:\/\//.test(env.DATABASE_URL)) throw new Error("A MySQL DATABASE_URL is required at runtime.");
  if (!env.AUTH_SECRET || env.AUTH_SECRET.length < 32) throw new Error("AUTH_SECRET must contain at least 32 characters.");
  if (env.NODE_ENV === "production") { const url=new URL(env.USERS_URL); if(url.protocol!=="https:"&&!["localhost","127.0.0.1","[::1]"].includes(url.hostname)) throw new Error("The production application URL must use HTTPS (except local loopback previews)."); }
  return { ...env, AUTH_SECRET: env.AUTH_SECRET, DATABASE_URL: env.DATABASE_URL };
}

export { z };
