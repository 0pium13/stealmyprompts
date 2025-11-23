/*
  Warnings:

  - You are about to drop the column `copiesCount` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `featuredOrder` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the `PromptCopy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_promptId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "PromptCopy" DROP CONSTRAINT "PromptCopy_promptId_fkey";

-- DropForeignKey
ALTER TABLE "PromptCopy" DROP CONSTRAINT "PromptCopy_userId_fkey";

-- DropIndex
DROP INDEX "Prompt_copiesCount_idx";

-- DropIndex
DROP INDEX "Prompt_featured_featuredOrder_idx";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "copiesCount",
DROP COLUMN "featured",
DROP COLUMN "featuredOrder",
DROP COLUMN "views";

-- AlterTable
ALTER TABLE "Storyboard" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "script" TEXT,
ADD COLUMN     "workflowNotes" TEXT;

-- DropTable
DROP TABLE "PromptCopy";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
