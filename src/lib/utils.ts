import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { protectedRoutes } from "@/middleware";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const matchGlobPattern = (pathname: string, pattern: string) => {
  const cleanPathname = pathname.replace(/\/$/, "");
  const cleanPattern = pattern.replace(/\/$/, "");

  const regexPattern =
    "^" +
    cleanPattern
      .replace(/\*\*/g, ".*") // '**' matches multiple levels
      .replace(/\/\*/g, "/[^/]+") // '/*' matches exactly one path segment
      .replace(/\*/g, "[^/]*"); // '*' in other places matches any characters except '/'

  const regex = new RegExp(regexPattern);
  return regex.test(cleanPathname);
};

export const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((pattern) => matchGlobPattern(pathname, pattern));
};
