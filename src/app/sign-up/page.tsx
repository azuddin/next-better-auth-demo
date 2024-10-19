"use client";
import OAuthButton from "@/components/auth/oauth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client"; //import the auth client
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const route = useRouter();
  const [email, setEmail] = useState("ahmad@azuddin.com");
  const [password, setPassword] = useState("ZAQ!xsw2");
  const [name, setName] = useState("ahmad azuddin");

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
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
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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

      <Button onClick={signUp}>Sign Up</Button>
      <OAuthButton></OAuthButton>
      <Link href={"/sign-in"}>Sign In</Link>
    </div>
  );
}
