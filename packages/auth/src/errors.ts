import { z, type apiErrorCodeSchema } from "@aetheria/validation";

export class AccessError extends Error {
  constructor(public readonly code: z.infer<typeof apiErrorCodeSchema>, public readonly status: number, message: string, public readonly retryAfter?: number) {
    super(message);
    this.name = "AccessError";
  }
}
export function authErrorResponse(error: unknown): Response {
  if (error instanceof z.ZodError) {
    return Response.json({ ok: false, error: { code: "VALIDATION_ERROR", message: "Check the highlighted fields and try again.", fields: error.flatten().fieldErrors } }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  if (error instanceof AccessError) {
    return Response.json({ ok: false, error: { code: error.code, message: error.message } }, { status: error.status, headers: { "Cache-Control": "no-store", ...(error.retryAfter ? { "Retry-After": String(error.retryAfter) } : {}) } });
  }
  // Never return provider errors, credential-bearing connection strings, or stack traces.
  console.error(JSON.stringify({ event: "request_failed", errorType: error instanceof Error ? error.name : "UnknownError" }));
  return Response.json({ ok: false, error: { code: "SERVICE_UNAVAILABLE", message: "This service is temporarily unavailable. Please try again shortly." } }, { status: 503, headers: { "Cache-Control": "no-store" } });
}
