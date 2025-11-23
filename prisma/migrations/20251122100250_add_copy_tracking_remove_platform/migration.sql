/*
  Warnings:

  - You are about to drop the column `copies` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Prompt` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Prompt_likesCount_idx";

-- DropIndex
DROP INDEX "Prompt_platform_idx";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "copies",
DROP COLUMN "likesCount",
DROP COLUMN "platform",
ADD COLUMN     "copiesCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PromptCopy" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromptCopy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PromptCopy_promptId_idx" ON "PromptCopy"("promptId");

-- CreateIndex
CREATE INDEX "PromptCopy_userId_idx" ON "PromptCopy"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PromptCopy_promptId_userId_key" ON "PromptCopy"("promptId", "userId");

-- CreateIndex
CREATE INDEX "Prompt_copiesCount_idx" ON "Prompt"("copiesCount");

-- AddForeignKey
ALTER TABLE "PromptCopy" ADD CONSTRAINT "PromptCopy_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptCopy" ADD CONSTRAINT "PromptCopy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
