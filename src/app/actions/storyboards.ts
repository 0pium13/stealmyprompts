"use server";

import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createStoryboard(formData: FormData) {
    try {
        // 1. Verify Admin
        const user = await requireAdmin();
        if (!user) {
            return { error: "Unauthorized" };
        }

        // 2. Get Data
        const title = formData.get("title") as string;
        const videoUrl = formData.get("videoUrl") as string;
        const description = formData.get("description") as string;
        const script = formData.get("script") as string;
        const workflowNotes = formData.get("workflowNotes") as string;
        const pdfUrl = formData.get("pdfUrl") as string;
        const promptsUsedRaw = formData.get("promptsUsed") as string;

        if (!title || !videoUrl) {
            return { error: "Title and Video URL are required" };
        }

        let promptsUsed = undefined;
        if (promptsUsedRaw) {
            try {
                promptsUsed = JSON.parse(promptsUsedRaw);
            } catch (e) {
                // If not valid JSON, store as string array with one item or just ignore
                // For now, let's assume valid JSON or empty
                console.error("Invalid JSON for promptsUsed");
            }
        }

        // 3. Create Storyboard
        // Get max order to append to end
        const maxOrder = await prisma.storyboard.aggregate({
            _max: { order: true },
        });
        const order = (maxOrder._max.order || 0) + 1;

        await prisma.storyboard.create({
            data: {
                title,
                videoUrl,
                description,
                script,
                workflowNotes,
                pdfUrl,
                promptsUsed: promptsUsed || undefined,
                creatorId: user.id,
                order,
            },
        });

        // 4. Revalidate
        revalidatePath("/admin");
        revalidatePath("/storyboards");

        return { success: true };
    } catch (error) {
        console.error("Error creating storyboard:", error);
        return { error: "Failed to create storyboard" };
    }
}

export async function updateStoryboard(id: string, formData: FormData) {
    try {
        const user = await requireAdmin();
        if (!user) return { error: "Unauthorized" };

        const title = formData.get("title") as string;
        const videoUrl = formData.get("videoUrl") as string;
        const description = formData.get("description") as string;
        const script = formData.get("script") as string;
        const workflowNotes = formData.get("workflowNotes") as string;
        const pdfUrl = formData.get("pdfUrl") as string;
        const promptsUsedRaw = formData.get("promptsUsed") as string;

        let promptsUsed = undefined;
        if (promptsUsedRaw) {
            try {
                promptsUsed = JSON.parse(promptsUsedRaw);
            } catch (e) {
                console.error("Invalid JSON for promptsUsed");
            }
        }

        await prisma.storyboard.update({
            where: { id },
            data: {
                title,
                videoUrl,
                description,
                script,
                workflowNotes,
                pdfUrl,
                promptsUsed: promptsUsed || undefined
            },
        });

        revalidatePath("/admin");
        revalidatePath("/storyboards");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update storyboard" };
    }
}

export async function deleteStoryboard(id: string) {
    try {
        const user = await requireAdmin();
        if (!user) return { error: "Unauthorized" };

        await prisma.storyboard.delete({ where: { id } });

        revalidatePath("/admin");
        revalidatePath("/storyboards");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete storyboard" };
    }
}

export async function reorderStoryboards(items: { id: string; order: number }[]) {
    try {
        const user = await requireAdmin();
        if (!user) return { error: "Unauthorized" };

        await prisma.$transaction(
            items.map((item) =>
                prisma.storyboard.update({
                    where: { id: item.id },
                    data: { order: item.order },
                })
            )
        );

        revalidatePath("/admin");
        revalidatePath("/storyboards");
        return { success: true };
    } catch (error) {
        return { error: "Failed to reorder storyboards" };
    }
}
