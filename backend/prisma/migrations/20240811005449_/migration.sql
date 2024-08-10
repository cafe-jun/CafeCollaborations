/*
  Warnings:

  - The `region` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recruit_members` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `duration_type` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "region",
ADD COLUMN     "region" "Region",
DROP COLUMN "recruit_members",
ADD COLUMN     "recruit_members" "RecruitMember",
DROP COLUMN "duration_type",
ADD COLUMN     "duration_type" "DurationType";
