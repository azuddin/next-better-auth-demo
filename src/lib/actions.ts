"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";
import { isProtectedRoute } from "./utils";

export async function getServerSession() {
  const headersObj = headers();
  const pathname = headersObj.get("x-current-path");
  const cookie =
    [
      cookies().get("__Secure-better-auth.csrf_token")?.value,
      cookies().get("__Secure-better-auth.session_token")?.value,
      cookies().get("better-auth.csrf_token")?.value,
      cookies().get("better-auth.session_token")?.value,
    ].filter((c) => c && c.length > 0).length >= 2;
  const isprotected = pathname ? isProtectedRoute(pathname) : undefined;

  const session = await auth.api.getSession({
    headers: headersObj,
  });

  if (!session && isprotected) {
    if (cookie) {
      cookies().set("__Secure-better-auth.csrf_token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
      });
      cookies().set("__Secure-better-auth.session_token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
      });
      cookies().set("better-auth.csrf_token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
      });
      cookies().set("better-auth.session_token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
      });
    }

    redirect(`/sign-in?redirectTo=${pathname}`);
  }

  return session;
}
