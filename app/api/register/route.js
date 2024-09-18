import {hash} from "bcryptjs";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const {name, email, password, role, taskLoad} = body;

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                taskLoad
            },
        });

        return NextResponse.json(
            {message: "User created successfully", userId: user.id},
            {status: 201}
        );
    } catch (error) {
        console.error("Registration error:", error);
        if (error.code === 'P2002') {
            return NextResponse.json(
                {error: "Email already exists"},
                {status: 409}
            );
        }
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}