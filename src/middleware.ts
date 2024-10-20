import { NextRequest, NextResponse } from "next/server";

import { isProtectedRoute } from "./lib/utils";

export const protectedRoutes = [
  "/dashboard",
  "/dashboard/**",
  "/*/dashboard",
  "/*/dashboard/**",
];

export default async function middleware(request: NextRequest) {
  const baseURL = request.nextUrl.origin;
  const pathname = request.nextUrl.pathname;
  const authcookie =
    [
      request.cookies.get("__Secure-better-auth.csrf_token")?.value,
      request.cookies.get("__Secure-better-auth.session_token")?.value,
      request.cookies.get("better-auth.csrf_token")?.value,
      request.cookies.get("better-auth.session_token")?.value,
    ].filter((c) => c && c.length > 0).length >= 2;

  if (["/sign-in", "/sign-up"].includes(pathname) && authcookie) {
    return NextResponse.redirect(new URL("/dashboard", baseURL));
  }

  if (isProtectedRoute(pathname) && !authcookie) {
    return NextResponse.redirect(
      new URL(`/sign-in?redirectTo=${pathname}`, baseURL)
    );
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
