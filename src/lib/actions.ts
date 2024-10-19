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

  const cookie = cookies().get("better-auth.session_token")?.value;

  const isprotected = pathname ? isProtectedRoute(pathname) : undefined;
  if (!session && isprotected) {
    if (cookie) cookies().delete("better-auth.session_token");

    redirect(`/sign-in?redirectTo=${pathname}`);
  }

  return session;
}
