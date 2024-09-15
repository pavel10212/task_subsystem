import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth";

export async function GET() {
    const session = await auth()

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    if (user.role !== "Admin") {
        const tasks = await prisma.task.findMany(
            {
                where: {
                    userId: user.id
                },
                select: {
                    id: true,
                    indexId: true,
                    title: true,
                    description: true,
                    assigneeName: true,
                    userId: true,
                    status: true,
                    dueDate: true,
                    completedAt: true,
                    createdAt: true
                }
            }
        );
        return NextResponse.json(tasks);
    }

    const tasks = await prisma.task.findMany(
        {
            select: {
                id: true,
                indexId: true,
                title: true,
                description: true,
                assigneeName: true,
                userId: true,
                status: true,
                dueDate: true,
                completedAt: true,
                createdAt: true
            }
        }
    );
    return NextResponse.json(tasks);
}