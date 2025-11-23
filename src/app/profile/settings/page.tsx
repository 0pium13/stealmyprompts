import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ProfileSettingsForm } from "@/components/profile/ProfileSettingsForm";
import { redirect } from "next/navigation";

export default async function ProfileSettingsPage() {
    const userId = await requireAuth();
    const clerkUser = await currentUser();

    if (!clerkUser) {
        redirect("/sign-in");
    }

    // Get or create user in database
    let user = await prisma.user.findUnique({
        where: { clerkId: clerkUser.id },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                clerkId: clerkUser.id,
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                name: clerkUser.firstName || null,
            },
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-text mb-8">Profile Settings</h1>
                <ProfileSettingsForm user={user} />
            </div>
        </div>
    );
}
