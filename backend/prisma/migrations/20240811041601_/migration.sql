-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "created_at" DROP NOT NULL;
