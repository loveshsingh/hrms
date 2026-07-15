import { prisma } from "@/lib/prisma";
import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from "../validators/employee.validator";

export class EmployeeRepository {
  async create(data: CreateEmployeeInput) {
    return prisma.employee.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmployeeCode(employeeCode: string) {
    return prisma.employee.findUnique({
      where: {
        employeeCode,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.employee.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, data: UpdateEmployeeInput) {
    return prisma.employee.update({
      where: {
        id,
      },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.employee.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findMany() {
    return prisma.employee.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async count() {
    return prisma.employee.count({
      where: {
        deletedAt: null,
      },
    });
  }
}

export const employeeRepository = new EmployeeRepository();
