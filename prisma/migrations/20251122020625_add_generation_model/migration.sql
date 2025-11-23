/*
  Warnings:

  - You are about to drop the column `isScraped` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `sourceUrl` on the `Prompt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PromptStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "isScraped",
DROP COLUMN "sourceUrl",
ADD COLUMN     "cameraSettings" JSONB,
ADD COLUMN     "copies" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "featuredOrder" INTEGER,
ADD COLUMN     "negativePrompt" TEXT,
ADD COLUMN     "status" "PromptStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "style" TEXT[],
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "username" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "youtube" TEXT;

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "originalPrompt" TEXT NOT NULL,
    "enhancedPrompt" TEXT NOT NULL,
    "gridImageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "style" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Generation_userId_idx" ON "Generation"("userId");

-- CreateIndex
CREATE INDEX "Generation_createdAt_idx" ON "Generation"("createdAt");

-- CreateIndex
CREATE INDEX "Prompt_status_idx" ON "Prompt"("status");

-- CreateIndex
CREATE INDEX "Prompt_featured_featuredOrder_idx" ON "Prompt"("featured", "featuredOrder");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
