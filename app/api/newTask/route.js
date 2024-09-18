import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const user = await prisma.user.findFirst({
            where: {id: body.userId}
        });

        if (body.status === 'Completed') {
            body.completedAt = new Date();
        }

        const unfinishedTasks = user.assignedTasks - user.completedTasks;

        if ((unfinishedTasks + 1) > user.taskLoad) {
            return NextResponse.json({message: 'User task load is full'}, {status: 400});
        }


        await prisma.task.create({
            data: {
                indexId: body.indexId,
                title: body.title,
                description: body.description,
                userId: body.userId,
                assigneeName: user.name,
                status: body.status,
                dueDate: body.dueDate,
                priority: body.priority,
                completedAt: body.completedAt
            }
        });

        await prisma.user.update({
            where: {id: body.userId},
            data: {
                assignedTasks: {
                    increment: 1
                }
            }
        });

        return NextResponse.json({message: 'Task created successfully'}, {status: 201});
    } catch
        (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({message: 'Error creating task'}, {status: 500});
    }
}