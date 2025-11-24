import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import FilterBar from "@/components/prompts/FilterBar";
import PromptCard from "@/components/prompts/PromptCard";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export const revalidate = 300; // Revalidate every 5 minutes

export default async function Home() {
    // Redirect admins to admin dashboard
    // Regular users and guests will see the homepage content below
    const user = await currentUser();
    const isAdmin = user?.publicMetadata?.role === 'admin';


    const featuredPrompts = await prisma.prompt.findMany({
        where: {
            status: 'APPROVED',
            featured: true
        },
        orderBy: { featuredOrder: 'asc' },
        select: {
            id: true,
            title: true,
            promptText: true,
            mediaUrl: true,
            tags: true,
            creatorName: true,
            creator: {
                select: {
                    username: true,
                    name: true,
                }
            }
        },
        take: 8,
    });

    return (
        <main className="min-h-screen bg-background">
            <Header />
            <Hero />
            <FilterBar />

            <section className="container mx-auto px-4 py-8">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        ✨ Featured Prompts
                    </h2>
                    {featuredPrompts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {featuredPrompts.map((prompt) => (
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
                        <div className="bg-surface border border-accent-light rounded-xl p-8 text-center">
                            <p className="text-text/60">No featured prompts yet. Feature some prompts from the admin panel!</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 flex justify-center">
                    <a
                        href="/prompts"
                        className="rounded-full border border-accent-light bg-white px-6 py-3 text-sm font-medium text-text hover:bg-surface hover:border-accent transition-colors"
                    >
                        View All Generations
                    </a>
                </div>
            </section>
        </main>
    );
}
