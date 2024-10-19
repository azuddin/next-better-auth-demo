import { prisma } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const result = await prisma.session.findFirst({
    where: { id: req.body.id },
  });
  if (!result)
    return NextResponse.json({ message: "not found" }, { status: 404 });
  return NextResponse.json({ message: "ok!" });
}
