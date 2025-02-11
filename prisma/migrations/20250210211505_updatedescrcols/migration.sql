/*
  Warnings:

  - You are about to drop the column `taskId` on the `TransformedCosineSimilarity` table. All the data in the column will be lost.
  - Added the required column `taskResponseId` to the `TransformedCosineSimilarity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransformedCosineSimilarity" DROP CONSTRAINT "TransformedCosineSimilarity_taskId_fkey";

-- AlterTable
ALTER TABLE "TransformedCosineSimilarity" DROP COLUMN "taskId",
ADD COLUMN     "taskResponseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TransformedCosineSimilarity" ADD CONSTRAINT "TransformedCosineSimilarity_taskResponseId_fkey" FOREIGN KEY ("taskResponseId") REFERENCES "TaskResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
