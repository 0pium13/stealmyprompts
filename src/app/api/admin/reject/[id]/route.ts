import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();

        const { id } = await params;

        await prisma.prompt.update({
            where: { id },
            data: { status: "REJECTED" },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error rejecting prompt:", error);
        return NextResponse.json(
            { error: "Failed to reject prompt" },
            { status: 500 }
        );
    }
}
