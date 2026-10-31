import { NextRequest, NextResponse } from "next/server";

function contentSecurityPolicy(nonce: string): string {
  const development = process.env.NODE_ENV !== "production";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Static course assets should never have restrictive middleware CSP applied
  if (
    pathname.startsWith('/ADSA') ||
    pathname.startsWith('/FAIML') ||
    pathname.startsWith('/OOPJ') ||
    pathname.startsWith('/ESD1') ||
    pathname.startsWith('/CN-') ||
    pathname.startsWith('/cn-')
  ) {
    return NextResponse.next();
  }

  const nonce = crypto.randomUUID();
  const policy = contentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", policy);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", policy);
  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|manifest.webmanifest|robots.txt|sitemap.xml|cn-units|CN-Unit|CN-Unit-two|CN-Unit-3|CN-unit-4|CN-Unit-5|OOPJ|ESD1|FAIML|ADSA).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
