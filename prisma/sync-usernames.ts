import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔄 Starting username sync...");

    // Find all prompts that have a creator
    const promptsWithCreator = await prisma.prompt.findMany({
        where: {
            creatorId: { not: null },
        },
        include: {
            creator: true,
        },
    });

    console.log(`Found ${promptsWithCreator.length} prompts with creators.`);

    let updatedCount = 0;

    for (const prompt of promptsWithCreator) {
        if (prompt.creator && prompt.creator.username && prompt.creatorName !== prompt.creator.username) {
            console.log(`Updating prompt ${prompt.id}: ${prompt.creatorName} -> ${prompt.creator.username}`);

            await prisma.prompt.update({
                where: { id: prompt.id },
                data: {
                    creatorName: prompt.creator.username,
                },
            });
            updatedCount++;
        }
    }

    console.log(`✅ Sync completed! Updated ${updatedCount} prompts.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
