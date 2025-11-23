import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        await requireAuth();
        const clerkUser = await currentUser();

        if (!clerkUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { username, bio, avatar, instagram, youtube, twitter, website } = body;

        // Check if username is taken
        if (username) {
            const existing = await prisma.user.findFirst({
                where: {
                    username,
                    NOT: { clerkId: clerkUser.id },
                },
            });

            if (existing) {
                return NextResponse.json(
                    { error: "Username already taken" },
                    { status: 400 }
                );
            }
        }

        const user = await prisma.user.upsert({
            where: { clerkId: clerkUser.id },
            update: {
                username,
                bio,
                avatar,
                instagram,
                youtube,
                twitter,
                website,
            },
            create: {
                clerkId: clerkUser.id,
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                name: clerkUser.firstName || null,
                username,
                bio,
                avatar,
                instagram,
                youtube,
                twitter,
                website,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
