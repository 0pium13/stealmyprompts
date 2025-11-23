"use client";

import Image from "next/image";
import { Copy, Heart, Edit, Trash2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PromptCardProps {
    id: string;
    title: string;
    promptText: string;
    mediaUrl: string;
    creator: string;

    tags?: string[];
    isAdmin?: boolean;
}

export default function PromptCard({
    id,
    title,
    promptText,
    mediaUrl,
    creator,
    tags = [],
    isAdmin = false,
}: PromptCardProps) {
    const [copied, setCopied] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageErrorMessage, setImageErrorMessage] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();

        // Try modern Clipboard API first
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(promptText);
            } else {
                // Fallback for browsers that don't support Clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = promptText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }

            setCopied(true);
            toast.success("Prompt copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error("Failed to copy to clipboard");
            return;
        }



        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // First click - show confirmation state
        if (!deleting) {
            setDeleting(true);

            // Reset after 3 seconds if not confirmed
            setTimeout(() => {
                setDeleting(false);
            }, 3000);
            return;
        }

        // Second click - actually delete
        try {
            const res = await fetch(`/api/admin/delete-prompt/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Prompt deleted successfully");
                router.refresh();
            } else {
                toast.error(data.error || "Failed to delete prompt");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <a
            href={`/prompts/${id}`}
            className="group relative break-inside-avoid rounded-2xl border border-accent-light bg-white p-3 transition-all hover:-translate-y-1 hover:shadow-lg block"
        >
            {/* Admin Controls Overlay */}
            {isAdmin && (
                <div className="absolute top-2 left-2 z-10 flex gap-1">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `/admin/edit-prompt/${id}`;
                        }}
                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white p-1.5 shadow-lg transition-colors"
                        title="Edit Prompt"
                    >
                        <Edit className="h-3 w-3" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(e);
                        }}
                        className={`rounded-full text-white p-1.5 shadow-lg transition-all ${deleting
                            ? 'bg-yellow-600 hover:bg-yellow-700 animate-pulse'
                            : 'bg-red-600 hover:bg-red-700'
                            }`}
                        title={deleting ? "Click again to confirm delete" : "Delete Prompt"}
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </div>
            )}

            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface">
                {mediaUrl && !imageError ? (
                    <Image
                        src={mediaUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                            setImageError(true);
                            setImageErrorMessage((e as any).message || 'Failed to load image');
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text/40">
                        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs text-center px-2 break-all">
                            {imageError ? (imageErrorMessage || 'Image Unavailable') : 'No Image'}
                            <br />
                            <span className="text-[10px] opacity-50">{mediaUrl}</span>
                        </span>
                    </div>
                )}

                {/* Copy Button - Always Visible */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCopy(e);
                    }}
                    className="absolute bottom-2 right-2 rounded-full bg-primary hover:bg-primary/90 text-white p-2 shadow-lg transition-all"
                    title="Copy Prompt"
                >
                    {copied ? (
                        <span className="text-xs font-bold px-1">✓ Copied!</span>
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </button>
            </div>

            <div className="mt-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight text-text line-clamp-2">
                        {title}
                    </h3>
                </div>

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {tags.map(tag => (
                            <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 bg-accent-light/50 text-text/70 rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Fixed Height Prompt Text */}
                <div className="h-20 overflow-y-auto text-xs text-text/60 font-mono bg-surface p-2 rounded-lg">
                    {promptText}
                </div>

                <div className="flex items-center justify-between pt-2">
                    {creator && creator !== 'Anonymous' && creator !== 'Unknown' ? (
                        <div
                            role="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.location.href = `/profile/${creator}`;
                            }}
                            className="flex items-center gap-2 text-xs text-text/80 hover:text-primary transition-colors group/username cursor-pointer"
                        >
                            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold group-hover/username:bg-primary/30 transition-colors">
                                {creator[0]?.toUpperCase()}
                            </div>
                            <span className="font-medium">@{creator}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-xs text-text/60">
                            <div className="h-5 w-5 rounded-full bg-surface flex items-center justify-center text-text/60 font-bold">
                                {creator?.[0]?.toUpperCase() || '?'}
                            </div>
                            <span className="font-medium">@{creator || 'Anonymous'}</span>
                        </div>
                    )}


                </div>
            </div>
        </a>
    );
}
