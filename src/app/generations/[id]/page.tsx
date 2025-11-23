import Header from '@/components/layout/Header';
import GridImageDisplay from '@/components/GridImageDisplay';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const generation = await prisma.generation.findUnique({
        where: { id },
        include: { user: true }
    });

    if (!generation) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">{generation.title}</h1>
                    <p className="text-text/60 mb-6">
                        by {generation.user?.username || generation.user?.name || 'Anonymous'}
                    </p>

                    <GridImageDisplay
                        gridImageUrl={generation.gridImageUrl}
                        title={generation.title}
                    />

                    <div className="mt-8 space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Original Prompt</h2>
                            <p className="text-text/80 bg-surface p-4 rounded-lg">
                                {generation.originalPrompt}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Enhanced Prompt</h2>
                            <p className="text-text/80 bg-surface p-4 rounded-lg font-mono text-sm">
                                {generation.enhancedPrompt}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
