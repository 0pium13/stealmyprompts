# StealmyPrompts.ai - Tier 1 MVP Setup

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Update `.env` with your API keys:

```env
# Gemini API (Get from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL_TEXT=gemini-1.5-flash
GEMINI_MODEL_IMAGE=imagen-3-fast-generate-001

# Upstash Redis (Get from https://console.upstash.com/)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here

# Cloudflare R2 (Already configured)
R2_ACCOUNT_ID=aca34c812a9fff2ebca728babff026f4
R2_ACCESS_KEY_ID=9e012b97964dd77dc4582cb156059d4b
R2_SECRET_ACCESS_KEY=4875ed2ea04bdf097889ef76bdf4b254d227d3ceffd7f39f68063a5e5765b30b
R2_BUCKET_NAME=stealmyprompts-images
R2_PUBLIC_DOMAIN=https://pub-aca34c812a9fff2ebca728babff026f4.r2.dev

# Clerk (Already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLWxvY3VzdC0yMC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_uRn3d6lcV6Grtz2jYYZn0lJJQpjrqirHbQDydh3qlH

# Database (Already configured)
DATABASE_URL="postgresql://neondb_owner:npg_cYGmL2g3vsPM@ep-wild-shadow-adz0a0mx-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### 3. Run Development Server
```bash
npm run dev
```

## Features

### Grid-Shot Protocol
- **1 API call = 3 images** (wide, medium, close-up)
- Saves 66% of Gemini quota
- CSS-based virtual crop for display

### Rate Limiting
- **User limit**: 3 generations per 24 hours
- **Global limit**: 95 generations per 24 hours (safety buffer)
- Powered by Upstash Redis

### Image Storage
- Cloudflare R2 with edge caching
- `Cache-Control: immutable` prevents Class B charges
- Automatic watermark badge

## How It Works

1. **User submits prompt** → `/submit`
2. **Prompt enhancement** → Gemini Text API (separate quota)
3. **Grid generation** → Gemini Image API (1 call for 3 panels)
4. **Upload to R2** → With edge caching headers
5. **Display** → CSS crops show 3 separate angles

## API Routes

- `POST /api/generate` - Generate 3-panel grid image
- `GET /api/usage` - Check remaining quota

## Pages

- `/submit` - AI generation interface
- `/generations/[id]` - View generated images
- `/prompts` - Browse all generations (existing)

## Free Tier Limits

- **Gemini**: 15 RPM, 100/day
- **Upstash Redis**: 500k commands/day
- **R2**: 10M Class B operations (cached = free)
- **Neon**: 512MB storage

All limits are respected by the implementation.
