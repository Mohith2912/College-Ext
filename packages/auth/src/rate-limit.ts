import { createHash } from "node:crypto";
import { prisma } from "@aetheria/database";
import { AccessError } from "./errors";

export function rateLimitKey(action: string, identifier: string, windowSeconds: number, now = Date.now()): { key: string; resetAt: Date } {
  const slot = Math.floor(now / (windowSeconds * 1000));
  const digest = createHash("sha256").update(`${action}:${identifier}`).digest("hex");
  return { key: `${digest}:${slot}`, resetAt: new Date((slot + 1) * windowSeconds * 1000) };
}

/** Fixed windows persist across restarts and application replicas. Database failures fail closed. */
export async function consumeRateLimit(action: string, identifier: string, maximum: number, windowSeconds: number): Promise<void> {
  const { key, resetAt } = rateLimitKey(action, identifier, windowSeconds);
  const operation = () => prisma.rateLimitBucket.upsert({ where: { key }, create: { key, resetAt, count: 1 }, update: { count: { increment: 1 } }, select: { count: true } });
  let bucket: { count: number };
  try { bucket = await operation(); } catch (error) {
    // MySQL's Prisma emulation can race on first insert; the next upsert increments the winner.
    if (typeof error !== "object" || error === null || !("code" in error) || error.code !== "P2002") throw error;
    bucket = await operation();
  }
  if (bucket.count > maximum) throw new AccessError("RATE_LIMITED", 429, "Too many attempts. Please wait before trying again.", Math.max(1, Math.ceil((resetAt.getTime() - Date.now()) / 1000)));
}

/** Run from maintenance tooling. Retain a day of completed windows for abuse investigation. */
export async function pruneRateLimits(): Promise<number> {
  return (await prisma.rateLimitBucket.deleteMany({ where: { resetAt: { lt: new Date(Date.now() - 86_400_000) } } })).count;
}
