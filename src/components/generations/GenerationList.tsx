"use client";

import { useState } from "react";
import GenerationCard from "./GenerationCard";
import { getGenerations } from "@/app/actions/generations";
import { Loader2, Search } from "lucide-react";

interface Generation {
    id: string;
    title: string;
    originalPrompt: string;
    gridImageUrl: string;
    createdAt: Date;
    user: {
        name: string | null;
        username: string | null;
    } | null;
}

interface GenerationListProps {
    initialGenerations: Generation[];
    initialHasMore: boolean;
    search?: string;
    sort?: string;
}

export default function GenerationList({
    initialGenerations,
    initialHasMore,
    search,
    sort,
}: GenerationListProps) {
    const [generations, setGenerations] = useState<Generation[]>(initialGenerations);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;

        try {
            const result = await getGenerations({
                page: nextPage,
                search,
                sort,
            });

            // Cast the result to match the interface if needed, though it should match
            setGenerations((prev) => [...prev, ...result.generations as any]);
            setHasMore(result.hasMore);
            setPage(nextPage);
        } catch (error) {
            console.error("Failed to load more generations:", error);
        } finally {
            setLoading(false);
        }
    };

    if (generations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-surface p-6 rounded-full mb-4">
                    <Search className="h-8 w-8 text-text/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">No generations found</h3>
                <p className="text-text/60 max-w-md">
                    {search
                        ? `No results found for "${search}". Try different keywords.`
                        : "No generations available yet. Be the first to create one!"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {generations.map((generation) => (
                    <GenerationCard
                        key={generation.id}
                        id={generation.id}
                        title={generation.title}
                        originalPrompt={generation.originalPrompt}
                        gridImageUrl={generation.gridImageUrl}
                        creator={generation.user || {}}
                        createdAt={generation.createdAt}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-full border border-accent-light bg-white px-8 py-3 text-sm font-medium text-text hover:bg-surface hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? "Loading..." : "Load More Generations"}
                    </button>
                </div>
            )}
        </div>
    );
}
