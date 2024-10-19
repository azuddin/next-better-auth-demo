import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await prisma.session.findFirst({
    where: { id: data.id },
  });
  if (!result) {
    return NextResponse.json({ message: "not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "ok!" });
}
