"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface GenerationCardProps {
    id: string;
    title: string;
    originalPrompt: string;
    gridImageUrl: string;
    creator: {
        username?: string | null;
        name?: string | null;
    };
    createdAt: Date;
}

export default function GenerationCard({
    id,
    title,
    originalPrompt,
    gridImageUrl,
    creator,
}: GenerationCardProps) {
    return (
        <div className="group relative break-inside-avoid rounded-2xl border border-accent-light bg-white p-3 transition-all hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/generations/${id}`} className="block">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-surface">
                    {/* Show Wide Shot (Left Panel) by default */}
                    <Image
                        src={gridImageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                            objectPosition: '0% 50%' // Focus on left panel (Wide Shot)
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Watermark Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        Google watermark
                    </div>
                </div>
            </Link>

            <div className="mt-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/generations/${id}`} className="font-semibold leading-tight text-text line-clamp-1 hover:text-primary transition-colors">
                        {title}
                    </Link>
                </div>

                <p className="text-xs text-text/60 line-clamp-2 font-mono bg-surface p-2 rounded-lg">
                    {originalPrompt}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs text-text/80">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {(creator.username || creator.name || "A")[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium">@{creator.username || creator.name || "Anonymous"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
