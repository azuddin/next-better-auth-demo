"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { isProtectedRoute } from "@/middleware";

import { auth } from "./auth";

export async function getServerSession() {
  const headersObj = headers();
  const pathname = headersObj.get("x-current-path");
  const cookie =
    [
      cookies().get("better-auth.csrf_token")?.value,
      cookies().get("better-auth.session_token")?.value,
    ].length === 2;
  const isprotected = pathname ? isProtectedRoute(pathname) : undefined;

  const session = await auth.api.getSession({
    headers: headersObj,
  });

  if (!session && isprotected) {
    if (cookie) {
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
