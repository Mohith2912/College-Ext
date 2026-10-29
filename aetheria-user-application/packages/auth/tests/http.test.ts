import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "@aetheria/validation";
import { assertTrustedOrigin, parseJsonRequest, requestAddress } from "../src/http";

afterEach(() => vi.unstubAllEnvs());
describe("custom route security", () => {
  it("requires the exact configured application origin", () => {
    vi.stubEnv("USERS_URL", "https://study.example.com");
    expect(() => assertTrustedOrigin(new Request("https://study.example.com/api", { headers: { origin: "https://study.example.com" } }))).not.toThrow();
    expect(() => assertTrustedOrigin(new Request("https://study.example.com/api", { headers: { origin: "https://other.example.com" } }))).toThrow();
    expect(() => assertTrustedOrigin(new Request("https://study.example.com/api"))).toThrow();
  });
  it("limits streamed bodies even without content-length", async () => {
    const request = new Request("https://example.com", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: "x".repeat(100) }) });
    await expect(parseJsonRequest(request, z.object({ text: z.string() }), 50)).rejects.toMatchObject({ status: 413 });
  });
  it("rejects wrong content type and invalid JSON", async () => {
    await expect(parseJsonRequest(new Request("https://example.com", { method: "POST", body: "{}" }), z.object({}))).rejects.toMatchObject({ status: 415 });
    await expect(parseJsonRequest(new Request("https://example.com", { method: "POST", body: "{", headers: { "Content-Type": "application/json" } }), z.object({}))).rejects.toMatchObject({ status: 400 });
  });
  it("ignores spoofed forwarded addresses unless the deployment trusts its proxy", () => {
    vi.stubEnv("TRUST_PROXY", "false");
    expect(requestAddress(new Request("https://example.com", { headers: { "x-forwarded-for": "203.0.113.8" } }))).toBe("untrusted-network");
    vi.stubEnv("TRUST_PROXY", "true");
    expect(requestAddress(new Request("https://example.com", { headers: { "x-forwarded-for": "203.0.113.8, 10.0.0.1" } }))).toBe("203.0.113.8");
  });
  it("uses Vercel's platform-controlled client address", () => {
    vi.stubEnv("TRUST_PROXY", "false");
    vi.stubEnv("VERCEL", "1");
    expect(requestAddress(new Request("https://example.com", { headers: {
      "x-vercel-forwarded-for": "198.51.100.4",
      "x-forwarded-for": "203.0.113.8",
    } }))).toBe("198.51.100.4");
  });
});
