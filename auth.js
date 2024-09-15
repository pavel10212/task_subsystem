import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const {handlers, signIn, signOut, auth} = NextAuth({
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    throw new Error("User not found.");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password.");
                }

                return user;
            },
        }),
    ],
});