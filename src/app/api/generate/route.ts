import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { enhancePrompt, generateGridImage } from '@/lib/gemini';
import { uploadGridImage } from '@/lib/r2';
import { checkRateLimits, tripCircuitBreaker } from '@/lib/ratelimit';
import prisma from '@/lib/prisma';

async function ensureUserExists(user: any) {
    if (!user) return null;

    let dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName || user.username || "Anonymous",
                username: user.username || `user_${user.id.slice(0, 8)}`,
                role: "USER",
            },
        });
    }

    return dbUser;
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds for generation
export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const { prompt, title } = await request.json();

        if (!prompt || !title) {
            return NextResponse.json(
                { error: 'Title and prompt are required' },
                { status: 400 }
            );
        }

        // Rate limit check
        console.log('[Generate] Checking rate limits...');
        const rateCheck = await checkRateLimits(user?.id || '', ip);
        if (!rateCheck.success) {
            return NextResponse.json(
                { error: rateCheck.reason, remaining: 0 },
                { status: 429 }
            );
        }

        // Step 1: Enhance prompt (Gemini Text - separate quota)
        console.log('[Generate] Enhancing prompt...');
        const enhanced = await enhancePrompt(prompt);
        console.log('[Generate] Enhanced:', enhanced);

        // Step 2: Generate grid image (Gemini Image - 1 API call)
        console.log('[Generate] Generating grid image...');
        let imageBuffer: Uint8Array;
        try {
            imageBuffer = await generateGridImage(enhanced);
        } catch (error: any) {
            console.error("Gemini Error:", error);
            // if (error.message?.includes('429') || error.message?.includes('Resource has been exhausted')) {
            //     await tripCircuitBreaker();
            //     throw new Error('Global API limit reached. Please try again in 1 minute.');
            // }
            throw error; // Throw raw error to see it in UI
        }
        console.log('[Generate] Image generated, size:', imageBuffer.length, 'bytes');

        // Step 3: Upload to R2 with edge caching
        console.log('[Generate] Uploading to R2...');
        const gridImageUrl = await uploadGridImage(imageBuffer);
        console.log('[Generate] Uploaded to:', gridImageUrl);

        // Step 4: Save to database
        const dbUser = await ensureUserExists(user);
        const generation = await prisma.generation.create({
            data: {
                title,
                originalPrompt: prompt,
                enhancedPrompt: enhanced,
                gridImageUrl,
                userId: dbUser?.id || null,
                isPublic: true,
            }
        });

        console.log('[Generate] Success! Generation ID:', generation.id);

        return NextResponse.json({
            success: true,
            generationId: generation.id,
            gridImageUrl,
            enhanced,
            remaining: rateCheck.remaining - 1
        });

    } catch (error: any) {
        console.error('[Generate] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Generation failed' },
            { status: 500 }
        );
    }
}
