import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testStoryboard() {
    try {
        console.log('Testing database connection...')

        // Test connection
        await prisma.$connect()
        console.log('✅ Database connected')

        // Check if storyboard table exists
        const count = await prisma.storyboard.count()
        console.log(`✅ Storyboard table exists with ${count} records`)

        // Try to create a test storyboard
        const testStoryboard = await prisma.storyboard.create({
            data: {
                title: 'Test Storyboard',
                videoUrl: 'https://www.youtube.com/watch?v=test',
                description: 'Test description',
                script: null,
                workflowNotes: null,
                pdfUrl: null,
                creatorId: 'test-user-id',
                order: 999,
            },
        })

        console.log('✅ Test storyboard created:', testStoryboard.id)

        // Delete test storyboard
        await prisma.storyboard.delete({ where: { id: testStoryboard.id } })
        console.log('✅ Test storyboard deleted')

    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

testStoryboard()
