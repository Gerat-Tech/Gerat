import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "gerat-mission-control-jwt-secret-key-2026-production-secure"
);

const COOKIE_NAME = "gerat_session";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /dashboard paths
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  let user = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      user = payload;
    } catch {
      user = null;
    }
  }

  const isLoginPage = pathname === "/dashboard/login";

  // If visiting /dashboard/login while already logged in, redirect to /dashboard
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If visiting protected dashboard page without valid session, redirect to /dashboard/login
  if (!isLoginPage && !user) {
    const loginUrl = new URL("/dashboard/login", request.url);
    if (pathname !== "/dashboard") {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
