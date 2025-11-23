'use server';

import prisma from "@/lib/prisma";

export async function getGenerations({
    page = 1,
    search = "",
    sort = "newest",
}: {
    page?: number;
    search?: string;
    sort?: string;
}) {
    const limit = 20;
    const skip = (page - 1) * limit;

    const where: any = {
        isPublic: true,
    };

    if (search) {
        // Use full-text search if query is present
        // Format query for Prisma fullTextSearch: "word1 & word2"
        const searchQuery = search.trim().split(/\s+/).join(" & ");
        where.OR = [
            { originalPrompt: { search: searchQuery } },
            { enhancedPrompt: { search: searchQuery } },
            { title: { search: searchQuery } },
            { user: { username: { contains: search, mode: 'insensitive' } } },
            { user: { name: { contains: search, mode: 'insensitive' } } },
        ];
    }

    const orderBy: any = {};
    if (sort === "oldest") {
        orderBy.createdAt = "asc";
    } else {
        orderBy.createdAt = "desc";
    }

    const [generations, total] = await Promise.all([
        prisma.generation.findMany({
            where,
            orderBy,
            take: limit,
            skip,
            include: {
                user: true,
            },
        }),
        prisma.generation.count({ where }),
    ]);

    return {
        generations,
        hasMore: skip + generations.length < total,
        total,
    };
}
