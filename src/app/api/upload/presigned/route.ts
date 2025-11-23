import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
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
    try {
        await requireAuth();

        const { filename, contentType } = await request.json();
        const uniqueFilename = `${randomUUID()}-${filename}`;

        console.log('[R2 Upload] Generating presigned URL for:', uniqueFilename);
        console.log('[R2 Upload] Bucket:', process.env.R2_BUCKET_NAME);

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
        console.error("[R2 Upload] Error generating signed URL:", error);
        return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
    }
}
