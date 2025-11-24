import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { auth } from "@clerk/nextjs/server";
import { requireAuth } from "@/lib/auth";

const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});

export async function POST(request: Request) {
    console.log('[R2 Upload] === NEW UPLOAD REQUEST ===');

    try {
        // Use auth() instead of requireAuth() for API routes
        const { userId } = await auth();
        console.log('[R2 Upload] User ID:', userId ? 'Present' : 'Missing');

        if (!userId) {
            console.log('[R2 Upload] Unauthorized - no userId');
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { filename, contentType } = await request.json();
        console.log('[R2 Upload] Filename:', filename);
        console.log('[R2 Upload] Content Type:', contentType);

        const uniqueFilename = `${randomUUID()}-${filename}`;

        console.log('[R2 Upload] Generating presigned URL for:', uniqueFilename);
        console.log('[R2 Upload] Bucket:', process.env.R2_BUCKET_NAME);
        console.log('[R2 Upload] Account ID:', process.env.R2_ACCOUNT_ID ? 'Present' : 'Missing');
        console.log('[R2 Upload] Access Key:', process.env.R2_ACCESS_KEY_ID ? 'Present' : 'Missing');
        console.log('[R2 Upload] Secret Key:', process.env.R2_SECRET_ACCESS_KEY ? 'Present' : 'Missing');

        const signedUrl = await getSignedUrl(
            R2,
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: uniqueFilename,
                ContentType: contentType,
            }),
            { expiresIn: 3600 }
        );

        // Construct public URL (assuming public access or custom domain)
        // If R2_PUBLIC_DOMAIN is set, use it. Otherwise use generic R2 dev URL logic (which is tricky without domain)
        // User didn't specify public domain var, but usually it's needed. I'll assume R2_PUBLIC_DOMAIN or fallback.
        const publicUrl = process.env.R2_PUBLIC_DOMAIN
            ? `${process.env.R2_PUBLIC_DOMAIN}/${uniqueFilename}`
            : `https://${process.env.R2_BUCKET_NAME}.r2.dev/${uniqueFilename}`; // Fallback

        console.log('[R2 Upload] Generated public URL:', publicUrl);
        console.log('[R2 Upload] Presigned URL generated successfully');

        return NextResponse.json({ url: signedUrl, publicUrl });
    } catch (error) {
        console.error("[R2 Upload] ❌ ERROR:", error);
        console.error("[R2 Upload] Error name:", (error as Error).name);
        console.error("[R2 Upload] Error message:", (error as Error).message);
        console.error("[R2 Upload] Error stack:", (error as Error).stack);
        return NextResponse.json({
            error: "Failed to generate upload URL",
            details: (error as Error).message
        }, { status: 500 });
    }
}
