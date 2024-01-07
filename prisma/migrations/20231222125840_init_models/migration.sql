/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cleaning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Research` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Washing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WashingMachine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cleaning" DROP CONSTRAINT "Cleaning_userId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryFinalCleaning" DROP CONSTRAINT "HistoryFinalCleaning_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryMachineCleaning" DROP CONSTRAINT "HistoryMachineCleaning_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryManualCleaning" DROP CONSTRAINT "HistoryManualCleaning_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "Research" DROP CONSTRAINT "Research_userId_fkey";

-- DropForeignKey
ALTER TABLE "Washing" DROP CONSTRAINT "Washing_userId_fkey";

-- DropForeignKey
ALTER TABLE "WashingMachine" DROP CONSTRAINT "WashingMachine_userId_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Cleaning";

-- DropTable
DROP TABLE "Research";

-- DropTable
DROP TABLE "Washing";

-- DropTable
DROP TABLE "WashingMachine";

-- CreateTable
CREATE TABLE "circles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "endoscopeId" INTEGER,
    "isBooking" BOOLEAN NOT NULL,
    "isResearch" BOOLEAN NOT NULL,
    "isCleanigFinal" BOOLEAN NOT NULL,
    "isWashingManual" BOOLEAN NOT NULL,
    "isWashingMachine" BOOLEAN NOT NULL,
    "patientId" TEXT NOT NULL,
    "dateStartReserach" TIMESTAMP(3) NOT NULL,
    "dateStartCleaningFinal" TIMESTAMP(3) NOT NULL,
    "dateStartWashingManual" TIMESTAMP(3) NOT NULL,
    "dateStartWashingMachine" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "circles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "circles_endoscopeId_key" ON "circles"("endoscopeId");

-- AddForeignKey
ALTER TABLE "circles" ADD CONSTRAINT "circles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
