import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "@aetheria/validation";
import { assertTrustedOrigin, parseJsonRequest } from "../src/http";

afterEach(() => vi.unstubAllEnvs());
describe("custom route security", () => {
  it("requires the exact configured app origin and rejects the other surface", () => {
    vi.stubEnv("USERS_URL", "https://study.example.com");
    vi.stubEnv("ADMIN_URL", "https://admin.example.com");
    expect(() => assertTrustedOrigin(new Request("https://study.example.com/api", { headers: { origin: "https://study.example.com" } }))).not.toThrow();
    expect(() => assertTrustedOrigin(new Request("https://study.example.com/api", { headers: { origin: "https://admin.example.com" } }))).toThrow();
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
});
