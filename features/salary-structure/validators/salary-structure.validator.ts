import { z } from "zod";

export const salaryStructureItemSchema =
z.object({

  componentId:
  z.string().uuid(),

  amount:
  z.number().optional(),

  percentage:
  z.number().optional(),

  formula:
  z.string().optional(),

  calculationMethod:
  z.enum([
    "FIXED",
    "PERCENTAGE",
    "FORMULA"
  ])

});

export const createSalaryStructureSchema =
z.object({

  employeeId:
  z.string().uuid(),

  name:
  z.string().min(2),

  effectiveFrom:
  z.coerce.date(),

  effectiveTo:
  z.coerce.date().optional(),

  items:
  z.array(
    salaryStructureItemSchema
  ).min(1)

});

export type CreateSalaryStructureInput = z.infer<typeof createSalaryStructureSchema>;

export type CreateSalaryStructureItemInput = z.infer<typeof salaryStructureItemSchema>;