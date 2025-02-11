-- CreateTable
CREATE TABLE "TransformedCosineSimilarity" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "cosineSimilarity" DOUBLE PRECISION NOT NULL,
    "cosineSimilarityPlus" DOUBLE PRECISION NOT NULL,
    "oneMinusCosineSimilarity" DOUBLE PRECISION NOT NULL,
    "loggedValue" DOUBLE PRECISION NOT NULL,
    "absoluteValue" DOUBLE PRECISION NOT NULL,
    "dividedValue" DOUBLE PRECISION NOT NULL,
    "normalizedValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TransformedCosineSimilarity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransformedCosineSimilarity" ADD CONSTRAINT "TransformedCosineSimilarity_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
