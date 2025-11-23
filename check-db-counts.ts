
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCounts() {
    try {
        const promptCount = await prisma.prompt.count();
        const userCount = await prisma.user.count();
        console.log(`Prompts: ${promptCount}`);
        console.log(`Users: ${userCount}`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkCounts();
