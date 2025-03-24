/*
  Warnings:

  - Made the column `userId` on table `Sprint` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Sprint" DROP CONSTRAINT "Sprint_userId_fkey";

-- AlterTable
ALTER TABLE "Sprint" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
