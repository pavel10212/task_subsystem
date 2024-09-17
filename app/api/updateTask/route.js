import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req) {
    try {
        const body = await req.json()
        if (body.status === 'Completed') {
            await prisma.task.update({
                where: {id: body.id},
                data: {
                    completedAt: new Date().toISOString()

                }
            })
            await prisma.user.update({
                where: {id: body.userId},
                data: {
                    completedTasks: {
                        increment: 1
                    }
                }
            })
        }
        await prisma.task.update({
            where: {id: body.id},
            data: {
                title: body.title,
                description: body.description,
                userId: body.userId,
                status: body.status,
                dueDate: body.dueDate,
                priority: body.priority
            }
        })
        return NextResponse.json({message: 'Task updated successfully'}, {status: 200})

    } catch
        (error) {
        console.error('Error updating task:', error)
        return NextResponse.json({message: 'Error updating task'}, {status: 500})
    }
}