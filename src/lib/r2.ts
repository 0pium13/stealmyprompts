import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function uploadGridImage(imageBuffer: Buffer | Uint8Array): Promise<string> {
    const fileName = `grid-${randomUUID()}.webp`;

    await R2.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileName,
        Body: imageBuffer,
        ContentType: "image/webp",
        // CRITICAL: Edge caching to avoid R2 Class B operation limits
        CacheControl: "public, max-age=31536000, immutable",
    }));

    return `${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;
}

export async function uploadAvatar(imageBuffer: Buffer | Uint8Array, contentType: string): Promise<string> {
    const ext = contentType.split('/')[1] || 'jpg';
    const fileName = `avatar-${randomUUID()}.${ext}`;

    await R2.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileName,
        Body: imageBuffer,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
    }));

    return `${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;
}
