import { readEnvironment, type z } from "@aetheria/validation";
import { AccessError } from "./errors";

export type AppSurface = "users" | "admin";
export function assertTrustedOrigin(request: Request, surface: AppSurface = "users"): void {
  const env = readEnvironment();
  const expected = new URL(surface === "users" ? env.USERS_URL : env.ADMIN_URL).origin;
  const origin = request.headers.get("origin");
  if (!origin || origin !== expected) throw new AccessError("ORIGIN_REJECTED", 403, "Open the form from this application and try again.");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") throw new AccessError("ORIGIN_REJECTED", 403, "This request must originate from this application.");
}
export async function parseJsonRequest<T extends z.ZodTypeAny>(request: Request, schema: T, maximumBytes = 16_384): Promise<z.infer<T>> {
  if (request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") throw new AccessError("UNSUPPORTED_MEDIA_TYPE", 415, "Send this request as JSON.");
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isFinite(declared) || declared < 0 || declared > maximumBytes) throw new AccessError("PAYLOAD_TOO_LARGE", 413, "This request is too large.");
  if (!request.body) throw new AccessError("VALIDATION_ERROR", 400, "Provide a request body.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      length += part.value.length;
      if (length > maximumBytes) {
        await reader.cancel();
        throw new AccessError("PAYLOAD_TOO_LARGE", 413, "This request is too large.");
      }
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
  let parsed: unknown;
  try { parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)); } catch { throw new AccessError("VALIDATION_ERROR", 400, "This request contains invalid JSON."); }
  return schema.parse(parsed);
}

/** TRUST_PROXY requires the ingress to strip and replace forwarded headers. */
export function requestAddress(request?: Request): string {
  if (!request || !readEnvironment().TRUST_PROXY) return "untrusted-network";
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 128) || "unknown";
}
