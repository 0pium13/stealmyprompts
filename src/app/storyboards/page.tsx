import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Storyboard } from "@prisma/client";

const getYoutubeThumbnail = (url: string | null) => {
    if (!url) return "/placeholder.jpg";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "/placeholder.jpg";
};

export default async function StoryboardsPage() {
    const storyboards = await prisma.storyboard.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Storyboards & BTS</h1>
                    <p className="text-text/60 max-w-2xl mx-auto">
                        Deep dives into the creative process. See how full projects go from initial prompt to final render.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {storyboards.map((storyboard) => (
                        <Link
                            key={storyboard.id}
                            href={`/storyboards/${storyboard.id}`}
                            className="group block bg-surface rounded-xl overflow-hidden border border-accent-light hover:border-primary transition-colors"
                        >
                            <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={getYoutubeThumbnail(storyboard.videoUrl)}
                                    alt={storyboard.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-white/90 text-black px-4 py-2 rounded-full font-medium text-sm">
                                        View BTS
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {storyboard.title}
                                </h3>
                                <p className="text-text/60 text-sm line-clamp-2">
                                    {storyboard.description || "No description available."}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {storyboards.length === 0 && (
                        <div className="col-span-full text-center py-12 text-text/60">
                            No storyboards found. Check back later!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
