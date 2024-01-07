-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'TECH', 'DOCTOR');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endoscopes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "temp_cirles_test" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "kindId" INTEGER,
    "manufacturerId" INTEGER,
    "departmentId" INTEGER,

    CONSTRAINT "endoscopes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kind" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Kind_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facilities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dvu" BOOLEAN NOT NULL DEFAULT false,
    "concentration" TEXT NOT NULL,

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "researchs" (
    "id" SERIAL NOT NULL,
    "date_research" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT NOT NULL,
    "endoscopeId" INTEGER NOT NULL,
    "transactions" BOOLEAN NOT NULL,
    "userId" INTEGER,
    "test" BOOLEAN NOT NULL,

    CONSTRAINT "researchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryFinalCleaning" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "test" BOOLEAN NOT NULL DEFAULT false,
    "facilityId" INTEGER,
    "historyResearchId" INTEGER,

    CONSTRAINT "HistoryFinalCleaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryManualCleaning" (
    "id" SERIAL NOT NULL,
    "temperature" INTEGER NOT NULL,
    "solutionConcentration" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "facilityId" INTEGER,
    "historyResearchId" INTEGER,

    CONSTRAINT "HistoryManualCleaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryMachineCleaning" (
    "id" SERIAL NOT NULL,
    "solutionConcentration" TEXT NOT NULL,
    "numberMdm" INTEGER NOT NULL,
    "circle" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "processingMode" INTEGER NOT NULL,
    "facilityId" INTEGER,
    "historyResearchId" INTEGER,

    CONSTRAINT "HistoryMachineCleaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endoscopeId" INTEGER,
    "number_store" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "endoscopeId" INTEGER,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Research" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "endoscopeId" INTEGER,
    "patientId" TEXT NOT NULL,
    "researchId" INTEGER NOT NULL,
    "date_research" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cleaning" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "endoscopeId" INTEGER,
    "start_time" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "researchId" INTEGER NOT NULL,

    CONSTRAINT "Cleaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Washing" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "endoscopeId" INTEGER,
    "start_time" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "researchId" INTEGER NOT NULL,

    CONSTRAINT "Washing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WashingMachine" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "endoscopeId" INTEGER,
    "start_time" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "researchId" INTEGER NOT NULL,

    CONSTRAINT "WashingMachine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "researchs_patientId_key" ON "researchs"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_endoscopeId_key" ON "Store"("endoscopeId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_endoscopeId_key" ON "Booking"("endoscopeId");

-- CreateIndex
CREATE UNIQUE INDEX "Research_endoscopeId_key" ON "Research"("endoscopeId");

-- CreateIndex
CREATE UNIQUE INDEX "Research_patientId_key" ON "Research"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Research_researchId_key" ON "Research"("researchId");

-- CreateIndex
CREATE UNIQUE INDEX "Cleaning_endoscopeId_key" ON "Cleaning"("endoscopeId");

-- CreateIndex
CREATE UNIQUE INDEX "Cleaning_patientId_key" ON "Cleaning"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Cleaning_researchId_key" ON "Cleaning"("researchId");

-- CreateIndex
CREATE UNIQUE INDEX "Washing_endoscopeId_key" ON "Washing"("endoscopeId");

-- CreateIndex
CREATE UNIQUE INDEX "Washing_patientId_key" ON "Washing"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Washing_researchId_key" ON "Washing"("researchId");

-- CreateIndex
CREATE UNIQUE INDEX "WashingMachine_endoscopeId_key" ON "WashingMachine"("endoscopeId");

-- CreateIndex
CREATE UNIQUE INDEX "WashingMachine_patientId_key" ON "WashingMachine"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "WashingMachine_researchId_key" ON "WashingMachine"("researchId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endoscopes" ADD CONSTRAINT "endoscopes_kindId_fkey" FOREIGN KEY ("kindId") REFERENCES "Kind"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endoscopes" ADD CONSTRAINT "endoscopes_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endoscopes" ADD CONSTRAINT "endoscopes_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "researchs" ADD CONSTRAINT "researchs_endoscopeId_fkey" FOREIGN KEY ("endoscopeId") REFERENCES "endoscopes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "researchs" ADD CONSTRAINT "researchs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryFinalCleaning" ADD CONSTRAINT "HistoryFinalCleaning_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryFinalCleaning" ADD CONSTRAINT "HistoryFinalCleaning_historyResearchId_fkey" FOREIGN KEY ("historyResearchId") REFERENCES "researchs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryManualCleaning" ADD CONSTRAINT "HistoryManualCleaning_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryManualCleaning" ADD CONSTRAINT "HistoryManualCleaning_historyResearchId_fkey" FOREIGN KEY ("historyResearchId") REFERENCES "researchs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryMachineCleaning" ADD CONSTRAINT "HistoryMachineCleaning_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryMachineCleaning" ADD CONSTRAINT "HistoryMachineCleaning_historyResearchId_fkey" FOREIGN KEY ("historyResearchId") REFERENCES "researchs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_endoscopeId_fkey" FOREIGN KEY ("endoscopeId") REFERENCES "endoscopes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Research" ADD CONSTRAINT "Research_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Washing" ADD CONSTRAINT "Washing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WashingMachine" ADD CONSTRAINT "WashingMachine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
