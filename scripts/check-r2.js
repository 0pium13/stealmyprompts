const { S3Client, ListBucketsCommand, PutBucketCorsCommand, GetBucketCorsCommand } = require("@aws-sdk/client-s3");

// Load env vars from .env file manually since we're running a script
const fs = require('fs');
const path = require('path');
const envPath = path.resolve(__dirname, '../.env');
const envConfig = require('dotenv').config({ path: envPath });

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error("Missing R2 credentials in .env");
    process.exit(1);
}

const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

async function main() {
    try {
        console.log("Listing buckets...");
        const { Buckets } = await client.send(new ListBucketsCommand({}));
        console.log("Buckets found:", Buckets.map(b => b.Name));

        const bucketName = process.env.R2_BUCKET_NAME;
        if (!bucketName) {
            console.log("R2_BUCKET_NAME not set in .env");
            return;
        }

        const bucketExists = Buckets.find(b => b.Name === bucketName);
        if (!bucketExists) {
            console.error(`Bucket '${bucketName}' not found in account!`);
            console.log("Please update R2_BUCKET_NAME in .env to one of the buckets listed above.");
            return;
        }

        console.log(`Checking CORS for bucket: ${bucketName}`);
        try {
            const cors = await client.send(new GetBucketCorsCommand({ Bucket: bucketName }));
            console.log("Current CORS:", JSON.stringify(cors, null, 2));
        } catch (e) {
            console.log("No CORS configuration found (or error fetching it).");
        }

        console.log("Setting CORS policy...");
        await client.send(new PutBucketCorsCommand({
            Bucket: bucketName,
            CORSConfiguration: {
                CORSRules: [
                    {
                        AllowedHeaders: ["*"],
                        AllowedMethods: ["PUT", "POST", "GET", "HEAD"],
                        AllowedOrigins: ["*"], // For development. In prod, lock this down.
                        ExposeHeaders: ["ETag"],
                        MaxAgeSeconds: 3000,
                    },
                ],
            },
        }));
        console.log("CORS policy set successfully!");

    } catch (err) {
        console.error("Error:", err);
    }
}

main();
