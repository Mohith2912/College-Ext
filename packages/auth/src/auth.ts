import { randomBytes } from "node:crypto";
import NextAuth, { type DefaultSession, type NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@aetheria/database";
import { requireRuntimeEnvironment, signInSchema } from "@aetheria/validation";
import { requestAddress, type AppSurface } from "./http";
import { hashPassword, verifyPassword } from "./password";
import { EDITORIAL_ROLES } from "./policy";
import { consumeRateLimit } from "./rate-limit";

declare module "next-auth" {
  interface Session { user: { id: string } & DefaultSession["user"] }
  interface User { sessionVersion?: number }
}
type AetheriaToken = { sub?: string; sessionVersion?: number; appSurface?: AppSurface; name?: string | null; email?: string | null };

let dummyPasswordHash: Promise<string> | undefined;
function getDummyPasswordHash(): Promise<string> { return dummyPasswordHash ??= hashPassword(randomBytes(32).toString("hex")); }

/** Each app has isolated cookies. JWTs hold identity, never cached roles or permissions. */
export function makeAuth(surface: AppSurface): NextAuthResult {
  return NextAuth(() => {
    // Auth.js lazy initialization allows static builds without injecting real secrets.
    const env = requireRuntimeEnvironment();
    const baseUrl = new URL(surface === "admin" ? env.ADMIN_URL : env.USERS_URL);
    const secure = baseUrl.protocol === "https:";
    const cookiePrefix = `${secure ? "__Secure-" : ""}aetheria.${surface}`;
    return {
      secret: env.AUTH_SECRET,
      trustHost: true,
      useSecureCookies: secure,
      session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
      pages: { signIn: "/login", error: "/login" },
      cookies: {
        sessionToken: { name: `${cookiePrefix}.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure } },
        csrfToken: { name: `${cookiePrefix}.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure } },
        callbackUrl: { name: `${cookiePrefix}.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure } },
      },
      providers: [Credentials({
        credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
        async authorize(credentials, request) {
          const parsed = signInSchema.safeParse(credentials);
          if (!parsed.success) return null;
          await consumeRateLimit(`login-network:${surface}`, requestAddress(request), 100, 900);
          await consumeRateLimit(`login-email:${surface}`, parsed.data.email, 10, 900);
          const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
          const passwordHash = user?.passwordHash ?? await getDummyPasswordHash();
          const passwordValid = await verifyPassword(parsed.data.password, passwordHash);
          if (!user || !passwordValid || user.deletedAt !== null || user.emailVerified === null) return null;
          const membership = await prisma.organizationMembership.findFirst({
            where: { userId: user.id, deletedAt: null, revokedAt: null, organization: { slug: env.ORGANIZATION_SLUG, deletedAt: null }, ...(surface === "admin" ? { role: { in: [...EDITORIAL_ROLES] } } : {}) },
          });
          if (!membership) return null;
          return { id: user.id, name: user.name, email: user.email, sessionVersion: user.sessionVersion };
        },
      })],
      callbacks: {
        async jwt({ token, user }) {
          const currentToken = token as typeof token & AetheriaToken;
          if (user) { currentToken.sub = user.id; currentToken.sessionVersion = user.sessionVersion; currentToken.appSurface = surface; }
          if (!currentToken.sub || currentToken.appSurface !== surface || typeof currentToken.sessionVersion !== "number") return null;
          const current = await prisma.user.findUnique({ where: { id: currentToken.sub }, select: { id: true, name: true, email: true, emailVerified: true, deletedAt: true, sessionVersion: true } });
          if (!current || current.deletedAt !== null || current.emailVerified === null || current.sessionVersion !== currentToken.sessionVersion) return null;
          const membership = await prisma.organizationMembership.findFirst({ where: { userId: current.id, deletedAt: null, revokedAt: null, organization: { slug: env.ORGANIZATION_SLUG, deletedAt: null }, ...(surface === "admin" ? { role: { in: [...EDITORIAL_ROLES] } } : {}) } });
          if (!membership) return null;
          currentToken.name = current.name;
          currentToken.email = current.email;
          return currentToken;
        },
        session({ session, token }) {
          session.user.id = token.sub!;
          session.user.name = token.name;
          session.user.email = token.email ?? "";
          return session;
        },
        redirect({ url }) {
          const destination = new URL(url, baseUrl);
          return destination.origin === baseUrl.origin ? destination.toString() : baseUrl.toString();
        },
      },
    };
  });
}
