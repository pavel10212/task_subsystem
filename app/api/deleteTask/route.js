import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req) {
  try {
    const { task: body } = await req.json();

    const task = await prisma.task.findFirst({
      where: { id: body.id },
    });

    await prisma.task.delete({
      where: { id: body.id },
    });

    const updateData = {
      assignedTasks: {
        decrement: 1,
      },
    };

    if (task.status === "Completed") {
      console.log("Task is completed");
      updateData.completedTasks = {
        decrement: 1,
      };
    }

    await prisma.user.update({
      where: { id: body.userId },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Error deleting task", error: error.message },
      { status: 500 }
    );
  }
}
