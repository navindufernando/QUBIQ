-- CreateTable
CREATE TABLE "CodingTime" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalCodingTimeMinutes" INTEGER NOT NULL,
    "qualityCodingTimeMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodingTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodingTime" ADD CONSTRAINT "CodingTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
