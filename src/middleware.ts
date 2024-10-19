import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/dashboard/*"];

const matchGlobPattern = (pathname: string, pattern: string) => {
  // Remove trailing slashes for consistency
  const cleanPathname = pathname.replace(/\/$/, "");
  const cleanPattern = pattern.replace(/\/$/, "");

  // Convert wildcard patterns (e.g., "/dashboard/*") to a regex
  const regex = new RegExp("^" + cleanPattern.replace(/\*/g, ".*"));
  return regex.test(cleanPathname);
};

const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((pattern) => matchGlobPattern(pathname, pattern));
};

export default authMiddleware({
  customRedirect: async (session, request) => {
    const baseURL = request.nextUrl.origin;
    const pathname = request.nextUrl.pathname;

    if (["/sign-in", "/sign-up"].includes(pathname) && session) {
      return NextResponse.redirect(new URL("/dashboard", baseURL));
    }

    if (isProtectedRoute(pathname) && !session) {
      return NextResponse.redirect(
        new URL(`/sign-in?redirectTo=${pathname}`, baseURL)
      );
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*"], // Use Next.js dynamic routing for general matching
};
