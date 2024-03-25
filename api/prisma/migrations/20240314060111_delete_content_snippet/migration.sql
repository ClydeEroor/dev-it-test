/*
  Warnings:

  - You are about to drop the column `contentSnippet` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Article` table. All the data in the column will be lost.
  - Added the required column `videolink` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "contentSnippet",
DROP COLUMN "guid",
ADD COLUMN     "videolink" TEXT NOT NULL;
