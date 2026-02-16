import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the JWT token (works on Edge runtime)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const userRole = token?.role as string | undefined;

  // Public routes that don't need protection
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") || pathname.startsWith("/reset-password");

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
    if (userRole === "VENDOR") {
      return NextResponse.redirect(new URL("/dashboard/vendor", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }

  // --- Protected Dashboard Routes ---

  // Admin dashboard
  if (pathname.startsWith("/dashboard/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Vendor dashboard
  if (pathname.startsWith("/dashboard/vendor")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userRole !== "VENDOR" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Customer dashboard
  if (pathname.startsWith("/dashboard/customer")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Checkout requires authentication
  if (pathname.startsWith("/checkout")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // --- Protected API Routes ---

  // Admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Vendor API routes (note: /api/vendor/ not /api/vendors/)
  if (pathname.startsWith("/api/vendor/")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (userRole !== "VENDOR" && userRole !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // User API routes
  if (pathname.startsWith("/api/user/")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Orders API requires authentication
  if (pathname.startsWith("/api/orders")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Vendor application requires authentication (any role can apply)
  if (pathname.startsWith("/api/vendors/apply")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/api/admin/:path*",
    "/api/vendor/:path*",
    "/api/vendors/:path*",
    "/api/user/:path*",
    "/api/orders/:path*",
  ],
};

