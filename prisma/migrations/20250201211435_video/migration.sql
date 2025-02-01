-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
