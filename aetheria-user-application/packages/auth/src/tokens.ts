import { createHash, randomBytes } from "node:crypto";

export function createVerificationToken(): { token: string; tokenHash: string } {
  const token = randomBytes(32).toString("hex");
  return { token, tokenHash: hashVerificationToken(token) };
}
export function hashVerificationToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
