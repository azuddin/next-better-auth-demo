// import { authMiddleware } from "better-auth/next-js";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/dashboard/*"];

const matchGlobPattern = (pathname: string, pattern: string) => {
  // Remove trailing slashes for consistency
  const cleanPathname = pathname.replace(/\/$/, "");
  const cleanPattern = pattern.replace(/\/$/, "");

  // Convert wildcard patterns (e.g., "/dashboard/*") to a regex
  const regex = new RegExp("^" + cleanPattern.replace(/\*/g, ".*"));
  return regex.test(cleanPathname);
};

export const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((pattern) => matchGlobPattern(pathname, pattern));
};

// export default authMiddleware({
//   customRedirect: async (session, request) => {
//     const baseURL = request.nextUrl.origin;
//     const pathname = request.nextUrl.pathname;

//     if (["/sign-in", "/sign-up"].includes(pathname) && session) {
//       return NextResponse.redirect(new URL("/dashboard", baseURL));
//     }

//     if (isProtectedRoute(pathname) && !session) {
//       return NextResponse.redirect(
//         new URL(`/sign-in?redirectTo=${pathname}`, baseURL)
//       );
//     }

//     return NextResponse.next();
//   },
// });
export default async function (request: NextRequest) {
  const baseURL = request.nextUrl.origin;
  const pathname = request.nextUrl.pathname;
  const authcookie =
    [
      request.cookies.get("better-auth.csrf_token")?.value,
      request.cookies.get("better-auth.session_token")?.value,
    ].length === 2;

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
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*"], // Use Next.js dynamic routing for general matching
};
