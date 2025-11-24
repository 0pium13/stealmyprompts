import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    console.log('[Auth Debug] === DIAGNOSTIC REQUEST ===');

    // 1. Check Env Vars
    const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = process.env.CLERK_SECRET_KEY;

    console.log('[Auth Debug] Env Vars:');
    console.log(`- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${pubKey ? pubKey.substring(0, 10) + '...' : 'MISSING'}`);
    console.log(`- CLERK_SECRET_KEY: ${secretKey ? secretKey.substring(0, 10) + '...' : 'MISSING'}`);

    // 2. Check Request Headers
    const headers = Object.fromEntries(request.headers);
    console.log('[Auth Debug] Request Headers (Cookies):', headers.cookie ? 'Present' : 'Missing');
    if (headers.cookie) {
        console.log('[Auth Debug] Cookie names:', headers.cookie.split(';').map(c => c.trim().split('=')[0]).join(', '));
    }

    // 3. Check Auth Status
    try {
        const { userId, sessionId, getToken } = await auth();
        console.log('[Auth Debug] Auth Result:');
        console.log(`- userId: ${userId}`);
        console.log(`- sessionId: ${sessionId}`);

        const token = await getToken();
        console.log(`- token: ${token ? 'Present' : 'Missing'}`);

        return NextResponse.json({
            status: 'ok',
            env: {
                pubKeyPrefix: pubKey ? pubKey.substring(0, 10) : null,
                secretKeyPrefix: secretKey ? secretKey.substring(0, 10) : null,
            },
            auth: {
                userId,
                sessionId,
                hasToken: !!token
            },
            cookies: headers.cookie ? headers.cookie.split(';').map(c => c.trim().split('=')[0]) : []
        });
    } catch (e) {
        console.error('[Auth Debug] Auth Error:', e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
