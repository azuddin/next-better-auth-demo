"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const signout = async () => {
    const data = await authClient.signOut();
    router.push("/");
  };

  return (
    <Button onClick={signout} variant={"destructive"}>
      Sign out
    </Button>
  );
}
