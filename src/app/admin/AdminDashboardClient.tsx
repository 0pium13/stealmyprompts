"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Video, LayoutDashboard, Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { createStoryboard, updateStoryboard, deleteStoryboard, reorderStoryboards } from "@/app/actions/storyboards";
import { toast } from "sonner";
import { Storyboard } from "@prisma/client";

interface AdminStats {
    pendingCount: number;
    totalPrompts: number;
    approvedCount: number;
    totalUsers: number;
}

import { useRouter } from "next/navigation";

export default function AdminDashboardClient({ stats, storyboards }: { stats: AdminStats; storyboards: Storyboard[] }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"prompts" | "storyboards">("prompts");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const statCards = [
        {
            title: "Pending Prompts",
            value: stats.pendingCount,
            href: "/admin/pending",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
        },
        {
            title: "Total Prompts",
            value: stats.totalPrompts,
            href: "/prompts",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Approved Prompts",
            value: stats.approvedCount,
            href: "/admin/featured",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Total Users",
            value: stats.totalUsers,
            href: "#",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    async function handleAddStoryboard(formData: FormData) {
        setIsSubmitting(true);
        try {
            const result = await createStoryboard(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Storyboard created successfully!");
                (document.getElementById("storyboard-form") as HTMLFormElement).reset();
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to create storyboard");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleUpdateStoryboard(id: string, formData: FormData) {
        try {
            const result = await updateStoryboard(id, formData);
            if (result.error) toast.error(result.error);
            else {
                toast.success("Updated successfully");
                setEditingId(null);
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to update");
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        try {
            const result = await deleteStoryboard(id);
            if (result.error) toast.error(result.error);
            else {
                toast.success("Deleted successfully");
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    }

    async function handleMove(index: number, direction: "up" | "down") {
        const newStoryboards = [...storyboards];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newStoryboards.length) return;

        // Swap
        [newStoryboards[index], newStoryboards[targetIndex]] = [newStoryboards[targetIndex], newStoryboards[index]];

        // Update orders
        const updates = newStoryboards.map((s, i) => ({ id: s.id, order: i }));

        try {
            await reorderStoryboards(updates);
            toast.success("Reordered successfully");
            router.refresh();
        } catch (error) {
            toast.error("Failed to reorder");
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text">Admin Dashboard</h1>
                <p className="text-text/60 mt-2">Manage prompts, users, and content</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-border">
                <button
                    onClick={() => setActiveTab("prompts")}
                    className={`pb-4 px-4 font-medium transition-colors relative ${activeTab === "prompts" ? "text-primary" : "text-text/60 hover:text-text"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Prompts & Stats
                    </div>
                    {activeTab === "prompts" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
                <button
                    onClick={() => setActiveTab("storyboards")}
                    className={`pb-4 px-4 font-medium transition-colors relative ${activeTab === "storyboards" ? "text-primary" : "text-text/60 hover:text-text"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Storyboards
                    </div>
                    {activeTab === "storyboards" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
            </div>

            {/* Prompts Tab */}
            {activeTab === "prompts" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat) => (
                            <Link key={stat.title} href={stat.href}>
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-text/60">{stat.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    {/* Quick Actions... (same as before) */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <Link href="/admin/pending" className="block p-3 rounded-lg bg-surface hover:bg-accent-light transition-colors">
                                    <div className="font-semibold">Review Pending Prompts</div>
                                    <div className="text-sm text-text/60">{stats.pendingCount} prompts waiting for approval</div>
                                </Link>
                                <Link href="/admin/featured" className="block p-3 rounded-lg bg-surface hover:bg-accent-light transition-colors">
                                    <div className="font-semibold">Manage Featured Prompts</div>
                                    <div className="text-sm text-text/60">Control homepage featured section</div>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Storyboards Tab */}
            {activeTab === "storyboards" && (
                <div className="grid gap-8 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Create Form */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5 text-primary" />
                                Add New Storyboard
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form id="storyboard-form" action={handleAddStoryboard} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input name="title" required placeholder="e.g. Cinematic Car Chase" className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">YouTube URL</label>
                                    <input name="videoUrl" required placeholder="https://www.youtube.com/watch?v=..." className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">PDF/Flipbook URL</label>
                                    <input name="pdfUrl" placeholder="https://..." className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea name="description" rows={2} className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Script</label>
                                    <textarea name="script" rows={3} placeholder="Scene 1: INT. NIGHT..." className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Workflow Notes</label>
                                    <textarea name="workflowNotes" rows={3} placeholder="Used Midjourney v6 with..." className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Prompts (JSON Array)</label>
                                    <textarea name="promptsUsed" rows={3} placeholder='["/imagine prompt: ...", ...]' className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary outline-none font-mono text-xs" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                                    {isSubmitting ? "Creating..." : "Create Storyboard"}
                                </button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold">Manage Storyboards</h2>
                        {storyboards.map((storyboard, index) => (
                            <Card key={storyboard.id} className="overflow-hidden">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="flex flex-col gap-1">
                                        <button onClick={() => handleMove(index, "up")} disabled={index === 0} className="p-1 hover:bg-surface rounded disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                                        <button onClick={() => handleMove(index, "down")} disabled={index === storyboards.length - 1} className="p-1 hover:bg-surface rounded disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                                    </div>

                                    <div className="flex-1">
                                        {editingId === storyboard.id ? (
                                            <form action={(fd) => handleUpdateStoryboard(storyboard.id, fd)} className="space-y-2">
                                                <input name="title" defaultValue={storyboard.title} className="w-full p-1 border rounded" placeholder="Title" />
                                                <input name="videoUrl" defaultValue={storyboard.videoUrl || ""} className="w-full p-1 border rounded" placeholder="Video URL" />
                                                <input name="pdfUrl" defaultValue={storyboard.pdfUrl || ""} className="w-full p-1 border rounded" placeholder="PDF URL" />
                                                <textarea name="description" defaultValue={storyboard.description || ""} className="w-full p-1 border rounded" placeholder="Description" rows={2} />
                                                <textarea name="script" defaultValue={storyboard.script || ""} className="w-full p-1 border rounded" placeholder="Script" rows={2} />
                                                <textarea name="workflowNotes" defaultValue={storyboard.workflowNotes || ""} className="w-full p-1 border rounded" placeholder="Workflow Notes" rows={2} />
                                                <textarea name="promptsUsed" defaultValue={storyboard.promptsUsed ? JSON.stringify(storyboard.promptsUsed) : ""} className="w-full p-1 border rounded font-mono text-xs" placeholder="Prompts JSON" rows={2} />

                                                <div className="flex gap-2">
                                                    <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded text-sm">Save</button>
                                                    <button type="button" onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">Cancel</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div>
                                                <h3 className="font-semibold">{storyboard.title}</h3>
                                                <p className="text-sm text-text/60 truncate">{storyboard.videoUrl}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setEditingId(storyboard.id)} className="p-2 hover:bg-surface rounded text-blue-500"><Pencil className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete(storyboard.id)} className="p-2 hover:bg-surface rounded text-red-500"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {storyboards.length === 0 && <p className="text-text/60 text-center py-8">No storyboards yet.</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
