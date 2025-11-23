import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Checking for 'demo' data...");

    // 1. Find 'parth' user to assign prompts to
    const parthUser = await prisma.user.findFirst({
        where: {
            username: {
                equals: "parth",
                mode: "insensitive",
            },
        },
    });

    if (!parthUser) {
        console.error("❌ User 'parth' not found! Cannot reassign prompts.");
        return;
    }
    console.log(`✅ Found target user: ${parthUser.username} (${parthUser.id})`);

    // 2. Find prompts with creatorName 'demo' or 'Demo'
    const demoPrompts = await prisma.prompt.findMany({
        where: {
            OR: [
                { creatorName: { equals: "demo", mode: "insensitive" } },
                { creatorName: { equals: "@demo", mode: "insensitive" } },
            ],
        },
    });

    console.log(`Found ${demoPrompts.length} prompts with creatorName 'demo'.`);

    // 3. Reassign prompts
    if (demoPrompts.length > 0) {
        console.log("🔄 Reassigning prompts to 'parth'...");
        const result = await prisma.prompt.updateMany({
            where: {
                id: { in: demoPrompts.map(p => p.id) },
            },
            data: {
                creatorId: parthUser.id,
                creatorName: parthUser.username,
            },
        });
        console.log(`✅ Reassigned ${result.count} prompts.`);
    }

    // 4. Check for 'demo' user and delete if exists
    const demoUser = await prisma.user.findFirst({
        where: {
            username: {
                equals: "demo",
                mode: "insensitive",
            },
        },
    });

    if (demoUser) {
        console.log(`Found 'demo' user (${demoUser.id}). Deleting...`);
        // First ensure no other relations block deletion (though cascade should handle it usually, but let's be safe)
        // Reassign any remaining prompts just in case (though we did updateMany above based on creatorName, this is by creatorId)
        await prisma.prompt.updateMany({
            where: { creatorId: demoUser.id },
            data: {
                creatorId: parthUser.id,
                creatorName: parthUser.username,
            },
        });

        await prisma.user.delete({
            where: { id: demoUser.id },
        });
        console.log("✅ Deleted 'demo' user.");
    } else {
        console.log("No 'demo' user found in User table.");
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
