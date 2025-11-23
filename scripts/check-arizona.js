const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env' });

const prisma = new PrismaClient();

async function checkArizona() {
    console.log("🔍 Searching for 'arizona' prompt...\n");

    const prompt = await prisma.prompt.findFirst({
        where: {
            title: {
                contains: 'arizona',
                mode: 'insensitive'
            }
        },
        include: {
            creator: true
        }
    });

    if (!prompt) {
        console.log("❌ No prompt found with 'arizona' in the title");
        return;
    }

    console.log("✅ Found prompt:");
    console.log("ID:", prompt.id);
    console.log("Title:", prompt.title);
    console.log("Status:", prompt.status);
    console.log("Platform:", prompt.platform);
    console.log("\n📸 Media URL:");
    console.log(prompt.mediaUrl);
    console.log("\n🔗 URL Analysis:");
    console.log("- Length:", prompt.mediaUrl.length);
    console.log("- Starts with https://:", prompt.mediaUrl.startsWith('https://'));
    console.log("- Contains r2.dev:", prompt.mediaUrl.includes('r2.dev'));
    console.log("- Domain:", new URL(prompt.mediaUrl).hostname);

    console.log("\n👤 Creator:");
    console.log("- Name:", prompt.creator?.name || 'N/A');
    console.log("- Username:", prompt.creator?.username || 'N/A');

    await prisma.$disconnect();
}

checkArizona().catch(console.error);
