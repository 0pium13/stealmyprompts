"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const ITEMS_PER_PAGE = 12;

export async function getPrompts({
    page = 1,
    search = "",
    sort = "newest",
}: {
    page?: number;
    search?: string;
    sort?: string;
}) {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const where: Prisma.PromptWhereInput = {
        status: "APPROVED",
        ...(search && {
            OR: [
                { title: { contains: search, mode: "insensitive" } },
                { promptText: { contains: search, mode: "insensitive" } },
            ],
        }),
    };

    const orderBy =
        sort === "popular"
            ? { createdAt: "desc" as const }
            : { createdAt: "desc" as const };

    try {
        const [prompts, total] = await Promise.all([
            prisma.prompt.findMany({
                where,
                orderBy,
                skip,
                take: ITEMS_PER_PAGE,
                include: {
                    creator: {
                        select: {
                            name: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            }),
            prisma.prompt.count({ where }),
        ]);

        return {
            prompts,
            hasMore: skip + prompts.length < total,
            total,
        };
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return { prompts: [], hasMore: false, total: 0 };
    }
}

export async function updatePrompt(id: string, data: {
    title?: string;
    promptText?: string;
    tags?: string[];
}) {
    await requireAdmin();

    try {
        await prisma.prompt.update({
            where: { id },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.promptText && { promptText: data.promptText }),
                ...(data.tags && { tags: data.tags }),
            },
        });

        revalidatePath("/prompts");
        revalidatePath(`/prompts/${id}`);
        revalidatePath("/admin");

        return { success: true };
    } catch (error) {
        console.error("Error updating prompt:", error);
        return { error: "Failed to update prompt" };
    }
}
