/*
  Warnings:

  - A unique constraint covering the columns `[researchId]` on the table `circles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `circles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "circles_researchId_key" ON "circles"("researchId");

-- CreateIndex
CREATE UNIQUE INDEX "circles_patientId_key" ON "circles"("patientId");
