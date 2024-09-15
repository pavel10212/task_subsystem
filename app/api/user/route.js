import prisma from "@/lib/prisma";
import {auth} from "@/auth";
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()
    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    if (!user) {
        return NextResponse.json(
            {error: "User not found"},
            {status: 404}
        );
    }

    return NextResponse.json(
        {name: user.name, role: user.role, id: user.id},
        {status: 200}
    );
}