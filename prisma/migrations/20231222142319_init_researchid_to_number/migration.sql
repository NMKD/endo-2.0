/*
  Warnings:

  - The `researchId` column on the `circles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "circles" DROP COLUMN "researchId",
ADD COLUMN     "researchId" INTEGER;
