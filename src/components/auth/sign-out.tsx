"use client";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

export default function SignOutButton() {
  const router = useRouter();
  const signout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Button onClick={signout} variant={"destructive"}>
      Sign out
    </Button>
  );
}
