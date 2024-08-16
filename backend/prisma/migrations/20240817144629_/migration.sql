/*
  Warnings:

  - You are about to drop the column `duration_type` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "duration_type",
ADD COLUMN     "duration" "duration_types",
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
