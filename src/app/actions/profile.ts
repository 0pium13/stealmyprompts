"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { uploadAvatar } from "@/lib/r2";

export async function updateProfile(formData: FormData) {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const bio = formData.get("bio") as string;
    const instagram = formData.get("instagram") as string;
    const youtube = formData.get("youtube") as string;
    const twitter = formData.get("twitter") as string;
    const website = formData.get("website") as string;
    const avatarFile = formData.get("avatar") as File;

    // Basic validation
    if (bio && bio.length > 500) {
        return { error: "Bio must be less than 500 characters" };
    }

    let avatarUrl = undefined;
    if (avatarFile && avatarFile.size > 0) {
        if (avatarFile.size > 5 * 1024 * 1024) { // 5MB limit
            return { error: "Avatar must be less than 5MB" };
        }

        const buffer = Buffer.from(await avatarFile.arrayBuffer());
        avatarUrl = await uploadAvatar(buffer, avatarFile.type);
    }

    try {
        await prisma.user.update({
            where: { clerkId: user.id },
            data: {
                bio: bio || null,
                instagram: instagram || null,
                youtube: youtube || null,
                twitter: twitter || null,
                website: website || null,
                ...(avatarUrl && { avatar: avatarUrl }),
            },
        });

        // Fetch updated user to get username for redirect
        const updatedUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
            select: { username: true },
        });

        if (updatedUser?.username) {
            revalidatePath(`/profile/${updatedUser.username}`);
            redirect(`/profile/${updatedUser.username}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { error: "Failed to update profile" };
    }
}
