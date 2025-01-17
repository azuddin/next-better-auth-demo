"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import OAuthButton from "@/components/auth/oauth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client"; //import the auth client

export default function SignInPage() {
  const route = useRouter();
  const [email, setEmail] = useState("ahmad@azuddin.com");
  const [password, setPassword] = useState("ZAQ!xsw2");

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          route.push("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col space-y-4 max-w-sm mx-auto mt-10">
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={signIn}>Sign In</Button>
      <OAuthButton></OAuthButton>
      <Link href={"/sign-up"}>Sign Up</Link>
    </div>
  );
}
