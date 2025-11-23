import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FeaturedPromptCard } from "@/components/admin/FeaturedPromptCard";

export default async function FeaturedPromptsPage() {
    await requireAdmin();

    const approvedPrompts = await prisma.prompt.findMany({
        where: { status: "APPROVED" },
        include: {
            creator: true,
        },
        orderBy: [
            { featured: "desc" },
            { featuredOrder: "asc" },
            { createdAt: "desc" },
        ],
    });

    const featuredPrompts = approvedPrompts.filter((p) => p.featured);
    const nonFeaturedPrompts = approvedPrompts.filter((p) => !p.featured);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text">Featured Prompts</h1>
                <p className="text-text/60 mt-2">
                    Manage which prompts appear on the homepage
                </p>
            </div>

            {featuredPrompts.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Currently Featured</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {featuredPrompts.map((prompt) => (
                            <FeaturedPromptCard key={prompt.id} prompt={prompt} />
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-xl font-semibold mb-4">Approved Prompts</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {nonFeaturedPrompts.map((prompt) => (
                        <FeaturedPromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            </div>
        </div>
    );
}
