/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.
  - The `region` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recruit_members` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `duration_type` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `category` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "categories" AS ENUM ('CA1000', 'CA1001', 'CA1002', 'CA1003', 'CA1004', 'CA1005', 'CA1006');

-- CreateEnum
CREATE TYPE "recruit_members" AS ENUM ('RM1000', 'RM1002', 'RM1003', 'RM1004');

-- CreateEnum
CREATE TYPE "duration_types" AS ENUM ('DU1000', 'DU1002', 'DU1003', 'DU1004');

-- CreateEnum
CREATE TYPE "regions" AS ENUM ('RE1000', 'RE1002', 'RE1003', 'RE1004', 'RE1005', 'RE1006', 'RE1007', 'RE1008', 'RE1009');

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3),
DROP COLUMN "region",
ADD COLUMN     "region" "regions",
DROP COLUMN "recruit_members",
ADD COLUMN     "recruit_members" "recruit_members",
DROP COLUMN "duration_type",
ADD COLUMN     "duration_type" "duration_types",
DROP COLUMN "category",
ADD COLUMN     "category" "categories" NOT NULL;

-- DropEnum
DROP TYPE "Category";

-- DropEnum
DROP TYPE "DurationType";

-- DropEnum
DROP TYPE "RecruitMember";

-- DropEnum
DROP TYPE "Region";
