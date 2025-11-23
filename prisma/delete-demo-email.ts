import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🗑️ Deleting 'demo@example.com' user...");

    // 1. Find 'parth'
    const parthUser = await prisma.user.findFirst({
        where: {
            username: {
                equals: "parth",
                mode: "insensitive",
            },
        },
    });

    if (!parthUser) {
        console.error("❌ User 'parth' not found!");
        return;
    }

    // 2. Find demo user
    const demoUser = await prisma.user.findUnique({
        where: { email: "demo@example.com" },
    });

    if (demoUser) {
        console.log(`Found demo user: ${demoUser.id}`);

        // 3. Reassign prompts
        const prompts = await prisma.prompt.updateMany({
            where: { creatorId: demoUser.id },
            data: {
                creatorId: parthUser.id,
                creatorName: parthUser.username,
            },
        });
        console.log(`Reassigned ${prompts.count} prompts to parth.`);

        // 4. Delete user
        await prisma.user.delete({
            where: { id: demoUser.id },
        });
        console.log("✅ Deleted demo user.");
    } else {
        console.log("No user found with email 'demo@example.com'");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
