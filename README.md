# Steal My Prompts AI

A clean, light-themed AI prompt library and storyboard showcase platform.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Database**: PostgreSQL + Prisma
- **Scraping**: Python + Playwright

## Features
- **Prompt Library**: Browse thousands of prompts from Midjourney, Sora, Runway, etc.
- **Storyboards**: Behind-the-scenes look at AI films with scripts and shot breakdowns.
- **Light Theme**: Clean, professional UI with a primary yellow accent.
- **Submission System**: User-submitted prompts and storyboards.

## Getting Started

### 1. Prerequisites
- Node.js 18+
- Python 3.8+ (for scrapers)
- PostgreSQL database

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/stealmyprompts"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Installation
```bash
npm install
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### 6. Run Scrapers
```bash
cd scrapers
pip install -r requirements.txt
python scrape_midjourney.py
```

## Project Structure
- `src/app`: Next.js App Router pages
- `src/components`: UI components
- `prisma`: Database schema
- `scrapers`: Python scraping scripts
