import Header from "@/components/layout/Header";
import FilterBar from "@/components/prompts/FilterBar";
import PromptCard from "@/components/prompts/PromptCard";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

export default async function PromptsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string; sort?: string; tag?: string }>;
}) {
    const params = await searchParams;
    const search = params.search || "";
    const sort = params.sort || "newest";
    const tag = params.tag;

    const user = await currentUser();
    const isAdmin = user?.publicMetadata?.role === 'admin';

    // Build where clause
    const whereClause: any = {
        status: 'APPROVED',
    };

    if (search) {
        whereClause.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { promptText: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (tag) {
        whereClause.tags = {
            has: tag
        };
    }

    // Build orderBy clause
    const orderBy: any = sort === 'popular'
        ? { createdAt: 'desc' }
        : { createdAt: 'desc' };

    const prompts = await prisma.prompt.findMany({
        where: whereClause,
        orderBy,
        include: { creator: true },
        take: 50,
    });

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="bg-surface py-12 border-b border-accent-light">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Explore Prompts</h1>
                    <p className="text-text/60 max-w-2xl mx-auto">
                        Discover amazing AI prompts created by our community.
                    </p>
                </div>
            </div>

            <FilterBar />

            <section className="container mx-auto px-4 py-8">
                {prompts.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {prompts.map((prompt) => (
                            <PromptCard
                                key={prompt.id}
                                id={prompt.id}
                                title={prompt.title}
                                promptText={prompt.promptText}
                                mediaUrl={prompt.mediaUrl}
                                creator={prompt.creator?.username || prompt.creator?.name || prompt.creatorName || 'Anonymous'}
                                tags={prompt.tags}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-text/60">No prompts found. Try a different search.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
