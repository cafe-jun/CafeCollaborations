/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "oauth_providers" AS ENUM ('KAKAO', 'GOOGLE', 'NAVER');

-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('ADMIN', 'AUTHOR', 'GUEST');

-- CreateEnum
CREATE TYPE "post_statuses" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "RecruitMember" AS ENUM ('RM1000', 'RM1002', 'RM1003', 'RM1004');

-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('DU1000', 'DU1002', 'DU1003', 'DU1004');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('RE1000', 'RE1002', 'RE1003', 'RE1004', 'RE1005', 'RE1006', 'RE1007', 'RE1008', 'RE1009');

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "post_tag" DROP CONSTRAINT "post_tag_postId_fkey";

-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_post_tag_id_fkey";

-- DropTable
DROP TABLE "post";

-- DropTable
DROP TABLE "post_tag";

-- DropTable
DROP TABLE "tag";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "OauthProvider";

-- DropEnum
DROP TYPE "PostStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "oauth_providers",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "user_roles" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image_id" INTEGER,
    "content" TEXT NOT NULL,
    "status" "post_statuses" NOT NULL,
    "region" TEXT,
    "recruit_members" TEXT,
    "duration_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" TIMESTAMP(3),
    "removed_at" TIMESTAMP(3),
    "published_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "post_tag_id" INTEGER NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_post_tag_id_fkey" FOREIGN KEY ("post_tag_id") REFERENCES "post_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
