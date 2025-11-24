import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                clerkId: true,
                username: true,
                name: true,
                role: true,
            }
        })

        console.log('Users in database:')
        console.log(JSON.stringify(users, null, 2))

        if (users.length === 0) {
            console.log('\n⚠️  No users found in database!')
            console.log('You need to log in to the site first to create your user record.')
        }

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkUsers()
