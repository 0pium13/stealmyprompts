-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "featuredOrder" INTEGER,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
