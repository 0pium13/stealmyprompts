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
    const user = await currentUser();

    if (!user || user.publicMetadata?.role !== "admin") {
        redirect("/");
    }

    return user;
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
