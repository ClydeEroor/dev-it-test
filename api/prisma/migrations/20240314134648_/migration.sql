/*
  Warnings:

  - The `pubDate` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "pubDate",
ADD COLUMN     "pubDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
