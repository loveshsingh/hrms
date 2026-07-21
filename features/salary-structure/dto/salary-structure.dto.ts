export interface SalaryStructureItemDto {

  componentId: string;

  amount?: number;

  percentage?: number;

  formula?: string;

  calculationMethod:
    "FIXED"
    | "PERCENTAGE"
    | "FORMULA";

}

export interface CreateSalaryStructureDto {

  employeeId: string;

  name: string;

  effectiveFrom: Date;

  effectiveTo?: Date;

  items: SalaryStructureItemDto[];

}