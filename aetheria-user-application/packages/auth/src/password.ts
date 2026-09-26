import { Algorithm, hash, verify } from "@node-rs/argon2";

const options = { algorithm: Algorithm.Argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1, outputLen: 32 } as const;
export async function hashPassword(password: string): Promise<string> {
  if (password.length < 12 || password.length > 128) throw new Error("Passwords must contain 12 to 128 characters.");
  return hash(password, options);
}
export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  if (!password || password.length > 128 || !encoded.startsWith("$argon2id$")) return false;
  try { return await verify(encoded, password); } catch { return false; }
}
