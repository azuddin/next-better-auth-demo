-- CreateTable
CREATE TABLE "rateLimit" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "count" INTEGER,
    "lastRequest" INTEGER,

    CONSTRAINT "rateLimit_pkey" PRIMARY KEY ("id")
);
