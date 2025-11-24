import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAdminCheck() {
    try {
        // Your Clerk ID
        const clerkId = 'user_35p3U9f5s6bhwuTvQQgi4Y4TW08'

        const dbUser = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true, role: true, username: true }
        })

        console.log('DB User:', dbUser)

        if (!dbUser) {
            console.log('❌ User not found in database')
            return
        }

        if (dbUser.role !== 'ADMIN') {
            console.log('❌ User is not admin, role:', dbUser.role)
            return
        }

        console.log('✅ Admin check passed for:', dbUser.username)
        console.log('✅ User ID:', dbUser.id)

    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

testAdminCheck()
