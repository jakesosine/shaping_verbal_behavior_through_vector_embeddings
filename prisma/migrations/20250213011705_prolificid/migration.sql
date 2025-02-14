/*
  Warnings:

  - A unique constraint covering the columns `[prolificId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "prolificId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_prolificId_key" ON "User"("prolificId");
