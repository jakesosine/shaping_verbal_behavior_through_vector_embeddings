CREATE EXTENSION IF NOT EXISTS vector;
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "prolificId" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hasBackground" BOOLEAN NOT NULL DEFAULT false,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundInfo" (
    "id" SERIAL NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "agerange" TEXT NOT NULL,
    "highested" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BackgroundInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "comparisonDescription" TEXT NOT NULL DEFAULT '',
    "attempts" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "embedding" vector,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskResponse" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "attempt" INTEGER NOT NULL,
    "cosineSimilarity" DOUBLE PRECISION NOT NULL,
    "userDescription" TEXT NOT NULL,
    "embedding" vector,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TaskResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransformedCosineSimilarity" (
    "id" SERIAL NOT NULL,
    "taskResponseId" INTEGER NOT NULL,
    "cosineSimilarity" DOUBLE PRECISION NOT NULL,
    "oneMinusCosineSimilarity" DOUBLE PRECISION NOT NULL,
    "loggedValue" DOUBLE PRECISION NOT NULL,
    "absoluteValue" DOUBLE PRECISION NOT NULL,
    "dividedValue" DOUBLE PRECISION NOT NULL,
    "normalizedValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TransformedCosineSimilarity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "BackgroundInfo" ADD CONSTRAINT "BackgroundInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskResponse" ADD CONSTRAINT "TaskResponse_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskResponse" ADD CONSTRAINT "TaskResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransformedCosineSimilarity" ADD CONSTRAINT "TransformedCosineSimilarity_taskResponseId_fkey" FOREIGN KEY ("taskResponseId") REFERENCES "TaskResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
