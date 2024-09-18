import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth";

export async function GET() {
  const session = await auth();

  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  if (user.role !== "Admin") {
    return NextResponse.json([user]);
  }

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}