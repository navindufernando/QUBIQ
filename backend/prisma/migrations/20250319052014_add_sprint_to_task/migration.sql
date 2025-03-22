/*
  Warnings:

  - You are about to drop the column `sprintId` on the `Task` table. All the data in the column will be lost.
  - Made the column `week` on table `EfficiencyRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `EfficiencyRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `efficiency` on table `EfficiencyRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `EfficiencyRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `month` on table `PerformanceRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `PerformanceRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `completed` on table `PerformanceRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `overdue` on table `PerformanceRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `PerformanceRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectName` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sprintName` on table `Sprint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Sprint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Sprint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Sprint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tasksCompleted` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentLoad` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isActive` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_sprintId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_projectId_fkey";

-- AlterTable
ALTER TABLE "EfficiencyRecord" ALTER COLUMN "week" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "efficiency" SET NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PerformanceRecord" ALTER COLUMN "month" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "completed" SET NOT NULL,
ALTER COLUMN "overdue" SET NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectName" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sprint" ALTER COLUMN "sprintName" SET NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "sprintId",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL,
ALTER COLUMN "tasksCompleted" SET NOT NULL,
ALTER COLUMN "currentLoad" SET NOT NULL,
ALTER COLUMN "isActive" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
