-- AlterTable
ALTER TABLE "circles" ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "dateStartReserach" DROP NOT NULL,
ALTER COLUMN "dateStartCleaningFinal" DROP NOT NULL,
ALTER COLUMN "dateStartWashingManual" DROP NOT NULL,
ALTER COLUMN "dateStartWashingMachine" DROP NOT NULL;
