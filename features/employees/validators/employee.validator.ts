import { z } from "zod";
import {
  EmployeeStatus,
  EmploymentType,
  Gender,
} from "@prisma/client";

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(3).max(20),

  firstName: z.string().min(1).max(100),

  lastName: z.string().min(1).max(100),

  fatherName: z.string().max(100).optional(),

  email: z.email(),

  mobile: z.string().regex(/^[6-9]\d{9}$/),

  dateOfBirth: z.coerce.date(),

  dateOfJoining: z.coerce.date(),

  gender: z.nativeEnum(Gender),

  employmentType: z.nativeEnum(EmploymentType),

  status: z.nativeEnum(EmployeeStatus),

  addressLine1: z.string().optional(),

  addressLine2: z.string().optional(),

  city: z.string().optional(),

  state: z.string().optional(),

  country: z.string().optional(),

  postalCode: z.string().optional(),

  aadhaarNumber: z.string().optional(),

  panNumber: z.string().optional(),

  uanNumber: z.string().optional(),

  esicNumber: z.string().optional(),

  emergencyContactName: z.string().optional(),

  emergencyContactPhone: z.string().optional(),

  emergencyContactRelation: z.string().optional(),

  profilePhotoUrl: z.string().url().optional(),

  companyId: z.string(),

  departmentId: z.string(),

  designationId: z.string(),
});

export const updateEmployeeSchema =
  createEmployeeSchema.partial();

export type CreateEmployeeInput =
  z.infer<typeof createEmployeeSchema>;

export type UpdateEmployeeInput =
  z.infer<typeof updateEmployeeSchema>;

export const employeeListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: z.nativeEnum(EmployeeStatus).optional(),
  sortBy: z
    .enum(["employeeCode", "firstName", "createdAt", "dateOfJoining"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type EmployeeListQueryInput = z.infer<typeof employeeListQuerySchema>;