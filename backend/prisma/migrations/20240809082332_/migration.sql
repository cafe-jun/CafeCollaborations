/*
  Warnings:

  - You are about to drop the column `regionCode` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "regionCode",
ADD COLUMN     "durationType" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "recruitdMember" TEXT,
ADD COLUMN     "region" TEXT;
