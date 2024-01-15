/*
  Warnings:

  - A unique constraint covering the columns `[patientId]` on the table `researchs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "researchs_patientId_key" ON "researchs"("patientId");
