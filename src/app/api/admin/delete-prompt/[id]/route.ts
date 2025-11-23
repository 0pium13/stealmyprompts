import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();

        const { id } = await params;

        await prisma.prompt.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return NextResponse.json(
            { error: "Failed to delete prompt" },
            { status: 500 }
        );
    }
}
