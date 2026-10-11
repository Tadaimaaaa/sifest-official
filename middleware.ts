import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/auth/adminAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSession(sessionToken);

    // If accessing /admin/login while already logged in, redirect to /admin
    if (pathname === "/admin/login") {
      if (session) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // If trying to access protected /admin routes without a valid session, redirect to /admin/login
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("from", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
