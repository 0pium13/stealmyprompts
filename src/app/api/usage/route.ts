import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { checkRateLimits } from '@/lib/ratelimit';

export async function GET(request: NextRequest) {
    const user = await currentUser();
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    const { success, remaining } = await checkRateLimits(user?.id || "", ip);

    return NextResponse.json({
        allowed: success,
        remaining,
        total: 3
    });
}
