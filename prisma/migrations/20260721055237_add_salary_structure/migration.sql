/*
  Warnings:

  - You are about to drop the column `amount` on the `SalaryStructure` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `SalaryStructure` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `SalaryStructure` table. All the data in the column will be lost.
  - You are about to drop the column `salaryComponentId` on the `SalaryStructure` table. All the data in the column will be lost.
  - Added the required column `componentId` to the `SalaryStructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SalaryStructure` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CalculationMethod" AS ENUM ('FIXED', 'PERCENTAGE', 'FORMULA');

-- DropForeignKey
ALTER TABLE "SalaryStructure" DROP CONSTRAINT "SalaryStructure_salaryComponentId_fkey";

-- DropIndex
DROP INDEX "SalaryStructure_salaryComponentId_idx";

-- AlterTable
ALTER TABLE "SalaryStructure" DROP COLUMN "amount",
DROP COLUMN "deletedAt",
DROP COLUMN "percentage",
DROP COLUMN "salaryComponentId",
ADD COLUMN     "componentId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SalaryStructureItem" (
    "id" TEXT NOT NULL,
    "salaryStructureId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "amount" DECIMAL(12,2),
    "percentage" DECIMAL(5,2),
    "formula" TEXT,
    "calculationMethod" "CalculationMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalaryStructureItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SalaryStructure" ADD CONSTRAINT "SalaryStructure_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "SalaryComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryStructureItem" ADD CONSTRAINT "SalaryStructureItem_salaryStructureId_fkey" FOREIGN KEY ("salaryStructureId") REFERENCES "SalaryStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryStructureItem" ADD CONSTRAINT "SalaryStructureItem_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "SalaryComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
