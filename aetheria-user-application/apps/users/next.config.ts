import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['@prisma/client', '@node-rs/argon2'],
  webpack(config) { config.externals.push({ '@node-rs/argon2': 'commonjs @node-rs/argon2' }); return config; },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-DNS-Prefetch-Control', value: 'off' },
      { key: 'Origin-Agent-Cluster', value: '?1' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), serial=()' },
    ] }, { source: '/cn-units/:path*', headers: [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'self'; object-src 'none'; base-uri 'self'" },
    ] }, ...['CN-Unit', 'CN-Unit-two', 'CN-Unit-3', 'CN-unit-4', 'CN-Unit-5', 'OOPJ', 'ESD1'].map(folder => ({
      source: `/${folder}/:path*`, headers: [
        { key: 'Cache-Control', value: 'no-store' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'self'; object-src 'none'; base-uri 'self'" },
      ],
    }))];
  },
};
export default nextConfig;
