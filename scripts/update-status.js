const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const result = await prisma.prompt.updateMany({
            where: {
                status: 'PENDING' // or just update all if that's the goal, but safer to target pending
            },
            data: {
                status: 'APPROVED'
            }
        });
        console.log(`Updated ${result.count} prompts to APPROVED`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
