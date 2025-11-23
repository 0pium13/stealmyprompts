import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Checking user 'parth'...");

    // Find user by username (case-insensitive)
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: "parth",
                mode: "insensitive",
            },
        },
    });

    if (!user) {
        console.error("❌ User 'parth' not found!");
        return;
    }

    console.log(`Found user: ${user.username} (${user.id})`);
    console.log("Current links:", {
        instagram: user.instagram,
        youtube: user.youtube,
        twitter: user.twitter,
        website: user.website,
    });

    // Update if missing
    if (!user.instagram || !user.youtube) {
        console.log("📝 Updating social links...");
        await prisma.user.update({
            where: { id: user.id },
            data: {
                instagram: user.instagram || "parth_codes",
                youtube: user.youtube || "parth_dev",
                bio: user.bio || "AI enthusiast and developer. Check out my prompts!",
            },
        });
        console.log("✅ Updated social links for 'parth'");
    } else {
        console.log("✅ User already has social links");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
