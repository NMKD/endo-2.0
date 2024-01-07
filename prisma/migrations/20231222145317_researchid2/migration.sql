/*
  Warnings:

  - You are about to drop the column `researchId` on the `circles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[historyResearchId]` on the table `circles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "circles_researchId_key";

-- AlterTable
ALTER TABLE "circles" DROP COLUMN "researchId",
ADD COLUMN     "historyResearchId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "circles_historyResearchId_key" ON "circles"("historyResearchId");
