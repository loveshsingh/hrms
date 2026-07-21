/*
  Warnings:

  - You are about to drop the column `calculationType` on the `SalaryComponent` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `SalaryComponent` table. All the data in the column will be lost.
  - You are about to drop the column `isStatutory` on the `SalaryComponent` table. All the data in the column will be lost.
  - You are about to drop the column `componentId` on the `SalaryStructure` table. All the data in the column will be lost.
  - Added the required column `calculationMethod` to the `SalaryComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sequence` to the `SalaryStructureItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormulaBase" AS ENUM ('BASIC', 'GROSS', 'CTC', 'CUSTOM');

-- AlterEnum
ALTER TYPE "CalculationMethod" ADD VALUE 'RULE';

-- DropForeignKey
ALTER TABLE "SalaryStructure" DROP CONSTRAINT "SalaryStructure_componentId_fkey";

-- AlterTable
ALTER TABLE "SalaryComponent" DROP COLUMN "calculationType",
DROP COLUMN "deletedAt",
DROP COLUMN "isStatutory",
ADD COLUMN     "calculationMethod" "CalculationMethod" NOT NULL,
ADD COLUMN     "formula" TEXT,
ADD COLUMN     "formulaBase" "FormulaBase",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isEsicApplicable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPfApplicable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SalaryStructure" DROP COLUMN "componentId";

-- AlterTable
ALTER TABLE "SalaryStructureItem" ADD COLUMN     "formulaBase" "FormulaBase",
ADD COLUMN     "sequence" INTEGER NOT NULL,
ALTER COLUMN "percentage" SET DATA TYPE DECIMAL(8,2);
