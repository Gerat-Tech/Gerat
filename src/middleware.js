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

  // Role-Based Access Control (RBAC) Route Clearance
  if (user && !isLoginPage && pathname !== "/dashboard") {
    const userRole = user.role || "VIEWER";

    if (userRole !== "SUPER_ADMIN") {
      const ALLOWED_ROLE_ROUTES = {
        OPERATIONS_LEAD: [
          "/dashboard",
          "/dashboard/inquiries",
          "/dashboard/team",
          "/dashboard/services",
        ],
        EDITOR: [
          "/dashboard",
          "/dashboard/insights",
          "/dashboard/portfolio",
        ],
        TECHNICAL_EDITOR: [
          "/dashboard",
          "/dashboard/insights",
          "/dashboard/portfolio",
        ],
        CREATIVE_EDITOR: [
          "/dashboard",
          "/dashboard/portfolio",
          "/dashboard/insights",
        ],
        VIEWER: [
          "/dashboard",
          "/dashboard/insights",
          "/dashboard/portfolio",
          "/dashboard/team",
          "/dashboard/services",
        ],
      };

      // Block VIEWER from any creation or edit routes
      if (userRole === "VIEWER" && (pathname.includes("/new") || pathname.includes("/edit"))) {
        const redirectUrl = new URL("/dashboard", request.url);
        redirectUrl.searchParams.set("unauthorized", "true");
        redirectUrl.searchParams.set("domain", pathname);
        return NextResponse.redirect(redirectUrl);
      }

      // Block OPERATIONS_LEAD from mutating team or service pillars
      if (
        userRole === "OPERATIONS_LEAD" &&
        (pathname.startsWith("/dashboard/team/") || pathname.startsWith("/dashboard/services/"))
      ) {
        const redirectUrl = new URL("/dashboard", request.url);
        redirectUrl.searchParams.set("unauthorized", "true");
        redirectUrl.searchParams.set("domain", pathname);
        return NextResponse.redirect(redirectUrl);
      }

      const allowedPrefixes = ALLOWED_ROLE_ROUTES[userRole] || ["/dashboard"];
      const isAllowed = allowedPrefixes.some((prefix) =>
        prefix === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(prefix)
      );

      if (!isAllowed) {
        const redirectUrl = new URL("/dashboard", request.url);
        redirectUrl.searchParams.set("unauthorized", "true");
        redirectUrl.searchParams.set("domain", pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
