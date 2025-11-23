import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updatePrompt } from "@/app/actions/prompts";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditPromptPage({ params }: { params: Promise<{ id: string }> }) {
    await requireAdmin();
    const { id } = await params;

    const prompt = await prisma.prompt.findUnique({
        where: { id },
    });

    if (!prompt) {
        notFound();
    }

    async function update(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;
        const promptText = formData.get("promptText") as string;
        const tags = formData.getAll("tags") as string[];

        await updatePrompt(id, { title, promptText, tags });
        redirect("/admin");
    }

    const AVAILABLE_TAGS = ["He", "She", "Couple"];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link href="/admin" className="flex items-center gap-2 text-text/60 hover:text-text mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Link>

            <h1 className="text-2xl font-bold mb-6">Edit Prompt</h1>

            <form action={update} className="space-y-6 bg-surface p-6 rounded-xl border border-border">
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        name="title"
                        defaultValue={prompt.title}
                        required
                        className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Prompt Text</label>
                    <textarea
                        name="promptText"
                        defaultValue={prompt.promptText}
                        required
                        rows={6}
                        className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex flex-wrap gap-3">
                        {AVAILABLE_TAGS.map((tag) => (
                            <label key={tag} className="flex items-center gap-2 cursor-pointer bg-background p-2 rounded-lg border border-border hover:border-primary transition-colors">
                                <input
                                    type="checkbox"
                                    name="tags"
                                    value={tag}
                                    defaultChecked={prompt.tags.includes(tag)}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium">{tag}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                        Save Changes
                    </button>
                    <Link
                        href="/admin"
                        className="px-6 py-2 rounded-lg border border-border hover:bg-accent-light transition-colors text-center"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
