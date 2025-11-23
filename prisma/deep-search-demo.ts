import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Deep search for 'demo'...");

    // 1. Search Users
    const demoUsers = await prisma.user.findMany({
        where: {
            OR: [
                { username: { contains: "demo", mode: "insensitive" } },
                { name: { contains: "demo", mode: "insensitive" } },
                { email: { contains: "demo", mode: "insensitive" } },
            ],
        },
    });
    console.log(`Found ${demoUsers.length} users with 'demo' in name/username/email.`);
    demoUsers.forEach(u => console.log(` - ${u.username} (${u.email})`));

    // 2. Search Prompts
    const demoPrompts = await prisma.prompt.findMany({
        where: {
            OR: [
                { creatorName: { contains: "demo", mode: "insensitive" } },
            ],
        },
    });
    console.log(`Found ${demoPrompts.length} prompts with 'demo' in creatorName.`);
    demoPrompts.forEach(p => console.log(` - Prompt ${p.id}: creatorName='${p.creatorName}'`));

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
