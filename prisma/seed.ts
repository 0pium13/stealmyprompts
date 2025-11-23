import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SAMPLE_PROMPTS = [
    {
        title: "Cyberpunk Street Food",
        promptText: "Cinematic shot of a cyberpunk street food vendor in Neo-Tokyo, neon lights, rain slicked streets, steam rising, highly detailed, 8k --ar 16:9 --v 6.0",
        mediaUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "NeonDreamer",
        likesCount: 124,
    },
    {
        title: "Ethereal Forest Spirit",
        promptText: "A glowing translucent spirit deer in a bioluminescent forest, magical atmosphere, soft lighting, dreamlike, fantasy art --ar 3:4",
        mediaUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "ForestWalker",
        likesCount: 89,
    },
    {
        title: "Futuristic Space Station",
        promptText: "Wide angle shot of a pristine white space station interior, minimal design, view of earth from large window, 2001 a space odyssey vibe --video",
        mediaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        platform: "Sora",
        creatorName: "SpaceCadet",
        likesCount: 256,
    },
    {
        title: "Vintage Portrait 1920s",
        promptText: "Black and white photography, 1920s flapper girl portrait, grain, authentic vintage look, leica m6 --ar 2:3",
        mediaUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "TimeTraveler",
        likesCount: 45,
    },
    {
        title: "Abstract Fluid Art",
        promptText: "Swirling liquid gold and black ink, macro photography, depth of field, abstract expressionism, 4k texture",
        mediaUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
        platform: "Runway",
        creatorName: "ArtFlow",
        likesCount: 112,
    },
    {
        title: "Isometric Tiny Home",
        promptText: "Isometric view of a cozy tiny home in the woods, cutaway view, detailed interior, warm lighting, 3d render style, blender cycles",
        mediaUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "TinyBuilder",
        likesCount: 330,
    },
    {
        title: "Underwater City",
        promptText: "Bioluminescent underwater city, massive glass domes, submarines, coral reefs, deep blue ocean, cinematic lighting --v 6.0",
        mediaUrl: "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "AquaMan",
        likesCount: 210,
    },
    {
        title: "Steampunk Airship",
        promptText: "Massive steampunk airship floating above clouds, brass gears, steam engines, victorian aesthetic, golden hour lighting",
        mediaUrl: "https://images.unsplash.com/photo-1506422748879-887454f9cdff?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "SteamPunk",
        likesCount: 150,
    },
    {
        title: "Minimalist Desert House",
        promptText: "Modern concrete house in the middle of a desert, sunset, long shadows, cactus, architectural photography, 8k",
        mediaUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "ArchiViz",
        likesCount: 95,
    },
    {
        title: "Neon Tokyo Rain",
        promptText: "Tokyo street at night, heavy rain, neon reflections on wet asphalt, umbrella, cinematic blade runner vibes",
        mediaUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "BladeRunner",
        likesCount: 420,
    },
    {
        title: "Alien Planet Landscape",
        promptText: "Alien landscape with purple sky, multiple moons, strange flora, red rocks, sci-fi concept art, matte painting",
        mediaUrl: "https://images.unsplash.com/photo-1614730341194-75c6074065db?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "SciFiArt",
        likesCount: 180,
    },
    {
        title: "Macro Eye",
        promptText: "Extreme close up of a human eye, detailed iris, reflection of a city in the pupil, 8k resolution, macro lens",
        mediaUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "MacroMaster",
        likesCount: 300,
    },
    {
        title: "Cybernetic Samurai",
        promptText: "Samurai with cybernetic armor, glowing katana, traditional japanese temple background, cherry blossoms falling, futuristic",
        mediaUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "CyberSamurai",
        likesCount: 275,
    },
    {
        title: "Retro Diner 50s",
        promptText: "Classic 1950s american diner interior, checkerboard floor, red leather booths, neon sign, milkshake, vintage photography",
        mediaUrl: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "RetroVibes",
        likesCount: 130,
    },
    {
        title: "Post Apocalyptic City",
        promptText: "Overgrown city ruins, nature reclaiming skyscrapers, moss, vines, sunlight breaking through clouds, the last of us style",
        mediaUrl: "https://images.unsplash.com/photo-1509515837298-2c67a3933321?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "Wasteland",
        likesCount: 220,
    },
    {
        title: "Crystal Cave",
        promptText: "Cave filled with massive glowing crystals, purple and blue lighting, explorer with a torch, fantasy adventure",
        mediaUrl: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "CaveExplorer",
        likesCount: 160,
    },
    {
        title: "Viking Longship",
        promptText: "Viking longship sailing in stormy seas, lightning, waves crashing, dramatic lighting, epic composition",
        mediaUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "VikingSaga",
        likesCount: 190,
    },
    {
        title: "Origami Animals",
        promptText: "Paper origami animals coming to life in a forest, depth of field, soft lighting, whimsical, 3d render",
        mediaUrl: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "PaperCraft",
        likesCount: 140,
    },
    {
        title: "Noir Detective",
        promptText: "Film noir detective office, rainy window, cigarette smoke, shadow blinds, black and white, high contrast",
        mediaUrl: "https://images.unsplash.com/photo-1440448867247-52734930774c?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "NoirFilm",
        likesCount: 110,
    },
    {
        title: "Floating Islands",
        promptText: "Floating islands in the sky, waterfalls falling into clouds, fantasy kingdom, bright blue sky, ghibli style",
        mediaUrl: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "SkyKingdom",
        likesCount: 310,
    },
    {
        title: "Cyberpunk Girl",
        promptText: "Portrait of a cyberpunk girl with neon hair, cybernetic implants, futuristic city background, bokeh, 8k",
        mediaUrl: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "CyberPortrait",
        likesCount: 240,
    },
    {
        title: "Haunted House",
        promptText: "Creepy old victorian house on a hill, full moon, fog, bats, horror movie poster style",
        mediaUrl: "https://images.unsplash.com/photo-1505554898845-a95866147446?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "HorrorFan",
        likesCount: 100,
    },
    {
        title: "Robot Coffee Shop",
        promptText: "Cute robot barista serving coffee in a futuristic cafe, warm lighting, cozy atmosphere, detailed machinery",
        mediaUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "RoboCafe",
        likesCount: 280,
    },
    {
        title: "Dragon Attack",
        promptText: "Fire breathing dragon attacking a medieval castle, knights defending, epic battle scene, cinematic lighting",
        mediaUrl: "https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "DragonSlayer",
        likesCount: 350,
    },
    {
        title: "Zen Garden",
        promptText: "Peaceful japanese zen garden, sand raked in patterns, bonsai tree, soft sunlight, meditation atmosphere",
        mediaUrl: "https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "ZenMaster",
        likesCount: 170,
    },
    {
        title: "Synthwave Highway",
        promptText: "Driving on a highway towards a retro sun, grid landscape, purple and pink neon, synthwave aesthetic, 80s style",
        mediaUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "SynthWave",
        likesCount: 260,
    },
    {
        title: "Snowy Mountain Cabin",
        promptText: "Cozy log cabin in snowy mountains, smoke from chimney, northern lights in sky, winter wonderland",
        mediaUrl: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "WinterLover",
        likesCount: 230,
    },
    {
        title: "Cyberpunk Motorcycle",
        promptText: "Futuristic motorcycle design, sleek lines, neon glowing wheels, parked in a dark alley, product photography",
        mediaUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "MotoFuture",
        likesCount: 200,
    },
    {
        title: "Ancient Library",
        promptText: "Endless library with towering bookshelves, flying books, magical dust, hogwarts style, mystery",
        mediaUrl: "https://images.unsplash.com/photo-1507842217121-9d71d230a33e?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "BookWorm",
        likesCount: 290,
    },
    {
        title: "Pixel Art City",
        promptText: "Pixel art style city skyline at night, animated lights, retro game aesthetic, 16-bit",
        mediaUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
        platform: "Midjourney",
        creatorName: "PixelArtist",
        likesCount: 155,
    }
];

async function main() {
    console.log('Start seeding ...');

    // Create a default user if not exists
    const user = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            email: 'demo@example.com',
            name: 'Demo User',
            clerkId: 'user_demo_123',
        },
    });

    for (const [index, prompt] of SAMPLE_PROMPTS.entries()) {
        const { likesCount, platform, ...validData } = prompt as any;

        await prisma.prompt.create({
            data: {
                ...validData,
                creatorId: user.id,
                tags: ['demo', 'seed'],
                status: 'APPROVED',
                featured: index < 12, // Feature the first 12 prompts
                featuredOrder: index,
            },
        });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
