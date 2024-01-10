/*
  Warnings:

  - You are about to drop the column `circle` on the `HistoryMachineCleaning` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "researchs_patientId_key";

-- AlterTable
ALTER TABLE "HistoryMachineCleaning" DROP COLUMN "circle";
