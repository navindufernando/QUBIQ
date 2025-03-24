-- AlterTable
ALTER TABLE "Sprint" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Sprint_userId_idx" ON "Sprint"("userId");

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
