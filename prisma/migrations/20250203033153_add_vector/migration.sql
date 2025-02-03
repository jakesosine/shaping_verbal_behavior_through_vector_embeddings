-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "embedding" vector,
ADD COLUMN     "expertDescription" TEXT NOT NULL DEFAULT '';
