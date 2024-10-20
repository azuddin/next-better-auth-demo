"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { isProtectedRoute } from "@/middleware";

import { auth } from "./auth";

export async function getServerSession() {
  const headersObj = headers();
  const pathname = headersObj.get("x-current-path");

  const session = await auth.api.getSession({
    headers: headersObj,
  });

  const cookie =
    [
      cookies().get("__Secure-better-auth.session_token")?.value,
      cookies().get("better-auth.session_token")?.value,
    ].filter((c) => c && c.length > 0).length > 0;

  const isprotected = pathname ? isProtectedRoute(pathname) : undefined;
  if (!session && isprotected) {
    if (cookie) {
      cookies().set("__Secure-better-auth.session_token", "", { maxAge: 0 });
      cookies().set("better-auth.session_token", "", { maxAge: 0 });
    }

    redirect(`/sign-in?redirectTo=${pathname}`);
  }

  return session;
}
