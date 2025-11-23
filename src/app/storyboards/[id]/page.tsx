import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, FileText, Settings, Download, Layers } from "lucide-react";

export default async function StoryboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const storyboard = await prisma.storyboard.findUnique({
        where: { id },
        include: { creator: true },
    });

    if (!storyboard) {
        notFound();
    }

    // Extract YouTube ID
    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = storyboard.videoUrl ? getYoutubeId(storyboard.videoUrl) : null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
                href="/storyboards"
                className="inline-flex items-center gap-2 text-text/60 hover:text-primary transition-colors mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Storyboards
            </Link>

            <div className="space-y-6">
                {/* Video Player */}
                {videoId && (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={storyboard.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* Info */}
                <div>
                    <h1 className="text-3xl font-bold text-text mb-2">{storyboard.title}</h1>

                    <div className="flex items-center gap-4 text-sm text-text/60 mb-6">
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{storyboard.creator.username || storyboard.creator.name || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(storyboard.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {storyboard.description && (
                        <div className="prose prose-invert max-w-none mb-8">
                            <p className="text-text/80 whitespace-pre-wrap">{storyboard.description}</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column: Script & Notes */}
                        <div className="space-y-8">
                            {storyboard.script && (
                                <div className="bg-surface border border-border rounded-xl p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Script
                                    </h2>
                                    <div className="prose prose-invert max-w-none text-sm">
                                        <p className="whitespace-pre-wrap text-text/80">{storyboard.script}</p>
                                    </div>
                                </div>
                            )}

                            {storyboard.workflowNotes && (
                                <div className="bg-surface border border-border rounded-xl p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Settings className="h-5 w-5 text-primary" />
                                        Workflow & Settings
                                    </h2>
                                    <div className="prose prose-invert max-w-none text-sm">
                                        <p className="whitespace-pre-wrap text-text/80">{storyboard.workflowNotes}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Prompts & Assets */}
                        <div className="space-y-8">
                            {storyboard.pdfUrl && (
                                <div className="bg-surface border border-border rounded-xl p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Download className="h-5 w-5 text-primary" />
                                        Assets
                                    </h2>
                                    <a
                                        href={storyboard.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 rounded-lg transition-colors"
                                    >
                                        <FileText className="h-4 w-4" />
                                        Download Storyboard PDF
                                    </a>
                                </div>
                            )}

                            {storyboard.promptsUsed && (
                                <div className="bg-surface border border-border rounded-xl p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Layers className="h-5 w-5 text-primary" />
                                        Prompts Used
                                    </h2>
                                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                        {Array.isArray(storyboard.promptsUsed) && storyboard.promptsUsed.map((prompt: any, i: number) => (
                                            <div key={i} className="bg-background p-3 rounded-lg border border-border text-sm font-mono text-text/70 break-words">
                                                {typeof prompt === 'string' ? prompt : JSON.stringify(prompt, null, 2)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
