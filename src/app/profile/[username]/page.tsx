import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Instagram, Youtube, Twitter, Globe } from "lucide-react";
import PromptCard from "@/components/prompts/PromptCard";
import Header from "@/components/layout/Header";

export default async function UserProfilePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const currentUserData = await currentUser();

    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive",
            }
        },
        include: {
            prompts: {
                where: { status: "APPROVED" },
                orderBy: { createdAt: "desc" },
            },
            _count: {
                select: {
                    prompts: { where: { status: "APPROVED" } },
                    likes: true,
                },
            },
        },
    });

    if (!user) {
        notFound();
    }



    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl border border-accent-light p-8 mb-8">
                        <div className="flex items-start gap-6">
                            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-primary/20 flex-shrink-0">
                                {user.avatar ? (
                                    <Image src={user.avatar} alt={user.name || ""} fill className="object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-primary">
                                        {user.name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-text">{user.name || user.username}</h1>
                                        <p className="text-text/60">@{user.username}</p>
                                    </div>
                                    {currentUserData?.id === user.clerkId && (
                                        <a
                                            href="/profile/edit"
                                            className="px-4 py-2 bg-surface hover:bg-accent-light border border-accent-light rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Edit Profile
                                        </a>
                                    )}
                                </div>

                                {user.bio && <p className="mt-3 text-text/80">{user.bio}</p>}

                                {/* Social Links */}
                                <div className="flex gap-3 mt-4">
                                    {user.instagram && (
                                        <a
                                            href={`https://instagram.com/${user.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-surface transition-colors"
                                        >
                                            <Instagram className="h-5 w-5 text-text/60" />
                                        </a>
                                    )}
                                    {user.youtube && (
                                        <a
                                            href={`https://youtube.com/@${user.youtube}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-surface transition-colors"
                                        >
                                            <Youtube className="h-5 w-5 text-text/60" />
                                        </a>
                                    )}
                                    {user.twitter && (
                                        <a
                                            href={`https://twitter.com/${user.twitter}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-surface transition-colors"
                                        >
                                            <Twitter className="h-5 w-5 text-text/60" />
                                        </a>
                                    )}
                                    {user.website && (
                                        <a
                                            href={user.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-surface transition-colors"
                                        >
                                            <Globe className="h-5 w-5 text-text/60" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 pt-6 border-t border-accent-light">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{user._count.prompts}</div>
                                <div className="text-sm text-text/60">Prompts</div>
                            </div>
                        </div>
                    </div>

                    {/* Prompts Grid */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Prompts by {user.username}</h2>
                        {user.prompts.length === 0 ? (
                            <div className="text-center py-12 text-text/60">
                                No prompts yet
                            </div>
                        ) : (
                            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                                {user.prompts.map((prompt) => (
                                    <PromptCard
                                        key={prompt.id}
                                        id={prompt.id}
                                        title={prompt.title}
                                        promptText={prompt.promptText}
                                        mediaUrl={prompt.mediaUrl}
                                        creator={user.username || user.name || "Unknown"}

                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
