import Header from "@/components/layout/Header";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Copy } from "lucide-react";
import { notFound } from "next/navigation";
import { CopyPromptButton } from "@/components/prompts/CopyPromptButton";

export default async function PromptDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const prompt = await prisma.prompt.findUnique({
        where: { id },
        include: { creator: true },
    });

    if (!prompt || prompt.status !== 'APPROVED') {
        notFound();
    }

    const creatorName = prompt.creator?.username || prompt.creator?.name || prompt.creatorName || 'Anonymous';

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="relative w-full overflow-hidden">
                        {prompt.mediaUrl ? (
                            <img
                                src={prompt.mediaUrl}
                                alt={prompt.title}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                            />
                        ) : (
                            <div className="flex h-64 w-full items-center justify-center text-text/40 bg-surface rounded-2xl">
                                <span>No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-text mb-2">{prompt.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-text/60">
                                <span>by @{creatorName}</span>
                            </div>
                        </div>

                        {/* Prompt Text */}
                        <div>
                            <h2 className="text-lg font-semibold text-text mb-2">Prompt</h2>
                            <div className="bg-surface border border-accent-light rounded-xl p-4">
                                <p className="text-sm text-text/80 font-mono whitespace-pre-wrap">
                                    {prompt.promptText}
                                </p>
                            </div>
                            <CopyPromptButton promptText={prompt.promptText} promptId={prompt.id} />
                        </div>

                        {/* Stats */}

                    </div>
                </div>
            </div>
        </main>
    );
}
