import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
    await requireAdmin();

    let stats = {
        pendingCount: 0,
        totalPrompts: 0,
        approvedCount: 0,
        totalUsers: 0,
    };

    try {
        // Fetch stats and storyboards
        const [pendingCount, totalPrompts, totalUsers, approvedCount, storyboards] = await Promise.all([
            prisma.prompt.count({ where: { status: "PENDING" } }),
            prisma.prompt.count(),
            prisma.user.count(),
            prisma.prompt.count({ where: { status: "APPROVED" } }),
            prisma.storyboard.findMany({ orderBy: { order: "asc" } }),
        ]);

        stats = {
            pendingCount,
            totalPrompts,
            approvedCount,
            totalUsers,
        };

        return <AdminDashboardClient stats={stats} storyboards={storyboards} />;
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        // Stats will remain at 0 if there's an error
        return <AdminDashboardClient stats={stats} storyboards={[]} />;
    }
}
