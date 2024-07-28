/*
  Warnings:

  - Added the required column `postTagId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "postTagId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_postTagId_fkey" FOREIGN KEY ("postTagId") REFERENCES "PostTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
