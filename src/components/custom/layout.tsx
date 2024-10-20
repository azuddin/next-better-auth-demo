"use client";
import React, { useEffect } from "react";

import { getServerSession } from "@/lib/actions";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSession = async () => await getServerSession();

  useEffect(() => {
    handleSession();
  }, []);

  return <div id="protected-layout">{children}</div>;
}
