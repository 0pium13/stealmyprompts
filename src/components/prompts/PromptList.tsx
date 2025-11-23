"use client";

import { useState } from "react";
import PromptCard from "./PromptCard";
import { getPrompts } from "@/app/actions/prompts";
import { Loader2 } from "lucide-react";

interface Prompt {
    id: string;
    title: string;
    promptText: string;
    mediaUrl: string;

    creator?: {
        name: string | null;
        username: string | null;
    } | null;
    creatorName?: string | null;
}

interface PromptListProps {
    initialPrompts: Prompt[];
    initialHasMore: boolean;
    search?: string;
    sort?: string;
}

export default function PromptList({
    initialPrompts,
    initialHasMore,
    search,
    sort,
}: PromptListProps) {
    const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;

        try {
            const result = await getPrompts({
                page: nextPage,
                search,
                sort,
            });

            setPrompts((prev) => [...prev, ...result.prompts]);
            setHasMore(result.hasMore);
            setPage(nextPage);
        } catch (error) {
            console.error("Failed to load more prompts:", error);
        } finally {
            setLoading(false);
        }
    };

    if (prompts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-surface p-6 rounded-full mb-4">
                    <SearchIcon className="h-8 w-8 text-text/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">No prompts found</h3>
                <p className="text-text/60 max-w-md">
                    {search
                        ? `No results found for "${search}". Try different keywords.`
                        : "No prompts available yet. Be the first to submit!"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {prompts.map((prompt) => (
                    <PromptCard
                        key={prompt.id}
                        id={prompt.id}
                        title={prompt.title}
                        promptText={prompt.promptText}
                        mediaUrl={prompt.mediaUrl}
                        creator={prompt.creator?.username || prompt.creator?.name || prompt.creatorName || "Anonymous"}

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
                        {loading ? "Loading..." : "Load More Prompts"}
                    </button>
                </div>
            )}
        </div>
    );
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
    );
}
