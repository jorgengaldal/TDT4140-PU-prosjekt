import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (
    token &&
    (request.nextUrl.pathname.startsWith("/signup") ||
      request.nextUrl.pathname.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (
    !token &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/signup")
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
