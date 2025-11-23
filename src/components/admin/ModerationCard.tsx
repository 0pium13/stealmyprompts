"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface ModerationCardProps {
    prompt: {
        id: string;
        title: string;
        promptText: string;
        mediaUrl: string;
        creator: {
            name: string | null;
            username: string | null;
        } | null;
        creatorName: string | null;
    };
}

export function ModerationCard({ prompt }: ModerationCardProps) {
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();

    const handleAction = async (action: "approve" | "reject") => {
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/${action}/${prompt.id}`, {
                method: "POST",
            });

            if (response.ok) {
                toast.success(`Prompt ${action}d successfully`);
                router.refresh();
            } else {
                toast.error(`Failed to ${action} prompt`);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const creatorDisplay =
        prompt.creator?.username ||
        prompt.creator?.name ||
        prompt.creatorName ||
        "Unknown";

    return (
        <div className="rounded-xl border border-accent-light bg-white p-4 shadow-sm">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface mb-3">
                {prompt.mediaUrl && !imageError ? (
                    <Image
                        src={prompt.mediaUrl}
                        alt={prompt.title}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text/40">
                        <svg
                            className="h-12 w-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-xs">
                            {imageError ? "Image Unavailable" : "No Image"}
                        </span>
                    </div>
                )}

            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-text line-clamp-1">{prompt.title}</h3>
                <p className="text-xs text-text/60 line-clamp-3 font-mono bg-surface p-2 rounded-lg">
                    {prompt.promptText}
                </p>
                <div className="text-xs text-text/60">by {creatorDisplay}</div>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => handleAction("approve")}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Check className="h-4 w-4" />
                    Approve
                </button>
                <button
                    onClick={() => handleAction("reject")}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <X className="h-4 w-4" />
                    Reject
                </button>
            </div>
        </div>
    );
}
