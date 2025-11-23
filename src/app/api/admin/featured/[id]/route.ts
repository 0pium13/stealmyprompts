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
        const body = await request.json();
        const { featured, featuredOrder } = body;

        await prisma.prompt.update({
            where: { id },
            data: {
                featured,
                featuredOrder: featured ? featuredOrder : null,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating featured status:", error);
        return NextResponse.json(
            { error: "Failed to update featured status" },
            { status: 500 }
        );
    }
}
