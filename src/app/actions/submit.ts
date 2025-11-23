'use server';

import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function submitPrompt(formData: FormData) {
    const user = await currentUser();
    if (!user) {
        throw new Error("You must be signed in to submit.");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const mediaUrl = formData.get("mediaUrl") as string;
    const promptText = formData.get("promptText") as string;
    const negativePrompt = formData.get("negativePrompt") as string;

    if (!title || !mediaUrl || !promptText) {
        throw new Error("Missing required fields");
    }

    // Check if user is admin
    const isAdmin = user.publicMetadata?.role === "admin";
    const status = isAdmin ? "APPROVED" : "PENDING";

    // Ensure user exists in our DB
    let dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName || user.username || "Anonymous",
                username: user.username || `user_${user.id.slice(0, 8)}`,
                role: isAdmin ? "ADMIN" : "USER",
            },
        });
    }

    const styles = formData.getAll("style") as string[];
    const tagsRaw = formData.get("tags") as string;
    const tags = tagsRaw ? JSON.parse(tagsRaw) : [];

    try {
        const cameraSettings = {
            lens: formData.get("camera_lens") as string,
            aperture: formData.get("camera_aperture") as string,
            shutter: formData.get("camera_shutter") as string,
        };

        if (type === "prompt") {
            await prisma.prompt.create({
                data: {
                    title,
                    promptText,
                    negativePrompt,
                    mediaUrl,
                    style: styles,
                    cameraSettings: cameraSettings as any, // Prisma expects Json
                    creatorId: dbUser.id,
                    status,
                    tags,
                },
            });
        } else {
            // Storyboard logic
            await prisma.storyboard.create({
                data: {
                    title,
                    description,
                    videoUrl: mediaUrl,
                    creatorId: dbUser.id,
                    promptsUsed: JSON.stringify([{ prompt: promptText }]),
                },
            });
        }

        revalidatePath("/");
        revalidatePath("/prompts");
        revalidatePath("/admin/pending");

        // Return success instead of redirecting immediately so we can show a toast/message
        return { success: true, status };
    } catch (error) {
        console.error("Submit Prompt Error:", error);
        return { success: false, error: (error as Error).message };
    }
}
