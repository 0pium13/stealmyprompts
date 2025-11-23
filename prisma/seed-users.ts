import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TEST_USERS = [
    {
        clerkId: "user_2bN0W0X0X0X0X0X0X0X0X0X0X01",
        email: "alex.creative@example.com",
        name: "Alex Creative",
        username: "alexcreative",
        bio: "Digital artist exploring the boundaries of AI generation. Love cyberpunk and synthwave aesthetics.",
        instagram: "alex.ai.art",
        twitter: "alexcreative",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
        clerkId: "user_2bN0W0X0X0X0X0X0X0X0X0X0X02",
        email: "sarah.prompts@example.com",
        name: "Sarah Prompts",
        username: "sarahp",
        bio: "Prompt engineer by day, dreamer by night. Sharing my best Midjourney discoveries.",
        youtube: "sarahprompts",
        website: "https://sarahprompts.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
        clerkId: "user_2bN0W0X0X0X0X0X0X0X0X0X0X03",
        email: "mike.maker@example.com",
        name: "Mike Maker",
        username: "mikemaker",
        bio: "Creating realistic portraits and landscapes. DM for collabs!",
        instagram: "mike.makes.art",
        twitter: "mikemaker",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
        clerkId: "user_2bN0W0X0X0X0X0X0X0X0X0X0X04",
        email: "luna.dreamer@example.com",
        name: "Luna Dreamer",
        username: "lunadreamer",
        bio: "Surrealist AI art. Exploring the dreamscape.",
        instagram: "luna.dreams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    },
    {
        clerkId: "user_2bN0W0X0X0X0X0X0X0X0X0X0X05",
        email: "cyber.punk@example.com",
        name: "Cyber Punk",
        username: "cyberpunk_2077",
        bio: "Neon lights and rainy streets. All things sci-fi.",
        twitter: "cyberpunk_art",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber",
    },
];

async function main() {
    console.log("🌱 Starting seed...");

    // 1. Create Users
    const createdUsers = [];
    for (const userData of TEST_USERS) {
        const user = await prisma.user.upsert({
            where: { clerkId: userData.clerkId },
            update: userData,
            create: userData,
        });
        createdUsers.push(user);
        console.log(`Created/Updated user: ${user.username}`);
    }

    // 2. Find Anonymous Prompts
    const anonymousPrompts = await prisma.prompt.findMany({
        where: {
            OR: [
                { creatorId: null },
                { creatorName: "Anonymous" },
                { creatorName: "Unknown" },
            ],
        },
    });

    console.log(`Found ${anonymousPrompts.length} anonymous prompts.`);

    // 3. Assign Prompts to Random Users
    if (anonymousPrompts.length > 0) {
        for (const prompt of anonymousPrompts) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];

            await prisma.prompt.update({
                where: { id: prompt.id },
                data: {
                    creatorId: randomUser.id,
                    creatorName: randomUser.username, // Update legacy field too just in case
                },
            });
        }
        console.log(`Assigned ${anonymousPrompts.length} prompts to random users.`);
    } else {
        console.log("No anonymous prompts to assign.");
    }

    console.log("✅ Seed completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
