"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FeaturedPromptCardProps {
    prompt: {
        id: string;
        title: string;
        promptText: string;
        mediaUrl: string;

        featured: boolean;
        featuredOrder: number | null;
        creator: {
            name: string | null;
            username: string | null;
        } | null;
        creatorName: string | null;
    };
}

export function FeaturedPromptCard({ prompt }: FeaturedPromptCardProps) {
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [order, setOrder] = useState(prompt.featuredOrder || 0);
    const router = useRouter();

    const toggleFeatured = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/featured/${prompt.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    featured: !prompt.featured,
                    featuredOrder: order,
                }),
            });

            if (response.ok) {
                toast.success(prompt.featured ? "Removed from featured" : "Added to featured");
                router.refresh();
            } else {
                toast.error("Failed to update featured status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const updateOrder = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/featured/${prompt.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    featured: prompt.featured,
                    featuredOrder: order,
                }),
            });

            if (response.ok) {
                toast.success("Order updated");
                router.refresh();
            } else {
                toast.error("Failed to update order");
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
                {prompt.featured && (
                    <div className="absolute top-2 left-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                    </div>
                )}

            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-text line-clamp-1">{prompt.title}</h3>
                <p className="text-xs text-text/60 line-clamp-2 font-mono bg-surface p-2 rounded-lg">
                    {prompt.promptText}
                </p>
                <div className="text-xs text-text/60">by {creatorDisplay}</div>
            </div>

            <div className="mt-4 space-y-2">
                {prompt.featured && (
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border border-accent-light rounded-lg text-sm"
                            placeholder="Order"
                        />
                        <button
                            onClick={updateOrder}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Update
                        </button>
                    </div>
                )}
                <button
                    onClick={toggleFeatured}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${prompt.featured
                        ? "bg-gray-600 hover:bg-gray-700 text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        }`}
                >
                    <Star className={`h-4 w-4 ${prompt.featured ? "" : "fill-current"}`} />
                    {prompt.featured ? "Remove from Featured" : "Add to Featured"}
                </button>
            </div>
        </div>
    );
}
