
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        console.log('🗑️  Clearing database...');

        // Delete in order of dependencies
        await prisma.generation.deleteMany({});
        await prisma.submission.deleteMany({});
        await prisma.like.deleteMany({});
        await prisma.storyboard.deleteMany({});
        await prisma.prompt.deleteMany({});
        await prisma.user.deleteMany({});

        console.log('✅ Database cleared successfully!');
    } catch (e) {
        console.error('❌ Error clearing database:', e);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
