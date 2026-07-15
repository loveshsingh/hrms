-- CreateTable
CREATE TABLE "PayrollItemComponent" (
    "id" TEXT NOT NULL,
    "payrollItemId" TEXT NOT NULL,
    "salaryComponentId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "componentName" TEXT NOT NULL,
    "componentCode" TEXT NOT NULL,
    "componentType" "SalaryComponentType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "calculationType" "SalaryCalculationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayrollItemComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PayrollItemComponent_payrollItemId_idx" ON "PayrollItemComponent"("payrollItemId");

-- CreateIndex
CREATE INDEX "PayrollItemComponent_salaryComponentId_idx" ON "PayrollItemComponent"("salaryComponentId");

-- CreateIndex
CREATE INDEX "PayrollItemComponent_companyId_idx" ON "PayrollItemComponent"("companyId");

-- AddForeignKey
ALTER TABLE "PayrollItemComponent" ADD CONSTRAINT "PayrollItemComponent_payrollItemId_fkey" FOREIGN KEY ("payrollItemId") REFERENCES "PayrollItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollItemComponent" ADD CONSTRAINT "PayrollItemComponent_salaryComponentId_fkey" FOREIGN KEY ("salaryComponentId") REFERENCES "SalaryComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollItemComponent" ADD CONSTRAINT "PayrollItemComponent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
