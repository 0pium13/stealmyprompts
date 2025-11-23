import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ModerationCard } from "@/components/admin/ModerationCard";

export default async function PendingPromptsPage() {
    await requireAdmin();

    const pendingPrompts = await prisma.prompt.findMany({
        where: { status: "PENDING" },
        include: {
            creator: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text">Pending Prompts</h1>
                <p className="text-text/60 mt-2">
                    {pendingPrompts.length} prompts waiting for review
                </p>
            </div>

            {pendingPrompts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-text/60">No pending prompts to review</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pendingPrompts.map((prompt) => (
                        <ModerationCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            )}
        </div>
    );
}
