import { auth, currentUser } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    console.log('[Auth Debug] === DIAGNOSTIC REQUEST ===');

    // 1. Check Env Vars
    const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = process.env.CLERK_SECRET_KEY;

    // 2. Check Request Headers
    const headers = Object.fromEntries(request.headers);

    // 3. Check Auth Status via multiple methods
    let authResult = null;
    let getAuthResult = null;
    let userResult = null;

    try {
        // Method A: auth()
        const authObj = await auth();
        authResult = {
            userId: authObj.userId,
            sessionId: authObj.sessionId,
        };

        // Method B: getAuth(req)
        const getAuthObj = getAuth(request);
        getAuthResult = {
            userId: getAuthObj.userId,
            sessionId: getAuthObj.sessionId,
        };

        // Method C: currentUser()
        const user = await currentUser();
        userResult = {
            id: user?.id,
            email: user?.emailAddresses[0]?.emailAddress
        };

        return NextResponse.json({
            status: 'ok',
            env: {
                pubKeyPrefix: pubKey ? pubKey.substring(0, 10) : null,
                secretKeyPrefix: secretKey ? secretKey.substring(0, 10) : null,
            },
            auth: authResult,
            getAuth: getAuthResult,
            currentUser: userResult,
            cookies: headers.cookie ? headers.cookie.split(';').map(c => c.trim().split('=')[0]) : []
        });
    } catch (e) {
        console.error('[Auth Debug] Auth Error:', e);
        return NextResponse.json({ error: (e as Error).message, stack: (e as Error).stack }, { status: 500 });
    }
}
