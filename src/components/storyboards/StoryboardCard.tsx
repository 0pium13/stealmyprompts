import Image from "next/image";
import Link from "next/link";
import { Play, FileText, Layers } from "lucide-react";

interface StoryboardCardProps {
    id: string;
    title: string;
    thumbnailUrl: string;
    creator: string;
    promptsCount: number;
    hasPdf: boolean;
}

export default function StoryboardCard({
    id,
    title,
    thumbnailUrl,
    creator,
    promptsCount,
    hasPdf,
}: StoryboardCardProps) {
    return (
        <Link href={`/storyboards/${id}`} className="group block">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface border border-accent-light">
                <Image
                    src={thumbnailUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="rounded-full bg-white/90 p-3 text-primary shadow-lg backdrop-blur-sm">
                        <Play className="h-6 w-6 fill-current" />
                    </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                    {hasPdf && (
                        <Link
                            href={`/storyboards/${id}`}
                            className="flex-1 bg-surface hover:bg-surface/80 text-text text-center py-2.5 rounded-xl font-medium transition-colors text-sm"
                        >
                            View BTS
                        </Link>
                    )}
                    <div className="flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                        <Layers className="h-3 w-3" /> {promptsCount} Shots
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <h3 className="font-semibold text-text group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-text/60">by {creator}</p>
            </div>
        </Link>
    );
}
