import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import ProfileEditForm from "@/components/profile/ProfileEditForm";

export default async function ProfileEditPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
    });

    if (!dbUser) {
        redirect("/");
    }

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

                    <div className="bg-white rounded-2xl border border-accent-light p-8">
                        <ProfileEditForm user={dbUser} />
                    </div>
                </div>
            </div>
        </main>
    );
}
