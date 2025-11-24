import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Check if the current user is an admin
 * Reads from Clerk's publicMetadata.role
 */
export async function isAdmin(): Promise<boolean> {
    const user = await currentUser();
    if (!user) return false;

    return user.publicMetadata?.role === "admin";
}

/**
 * Require admin access - throws error if not admin
 * Use this in server components/actions that need admin access
 */
export async function requireAdmin() {
    // Use Clerk auth to get userId from cookies (works in server components)
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
        return; // unreachable but satisfies TypeScript
    }

    // Fetch user from DB to verify role
    const prisma = (await import("@/lib/prisma")).default;
    const dbUser = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { id: true, role: true, username: true }
    });

    if (!dbUser || dbUser.role !== "ADMIN") {
        redirect("/");
        return;
    }

    return dbUser;
}

/**
 * Get current user ID from Clerk
 */
export async function getCurrentUserId(): Promise<string | null> {
    const { userId } = await auth();
    return userId;
}

/**
 * Require authentication - redirects to sign-in if not authenticated
 */
export async function requireAuth() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return userId;
}
