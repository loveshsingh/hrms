import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeListQueryInput,
} from "../validators/employee.validator";

export class EmployeeRepository {
  async create(data: CreateEmployeeInput) {
    return prisma.employee.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        department: true,
        designation: true,
        bankAccount: true,
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
    await prisma.employee.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });

    return prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async softDelete(id: string) {
    return prisma.employee.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findMany(params: Partial<EmployeeListQueryInput> = {}) {
    const {
      page = 1,
      pageSize = 20,
      search,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: Prisma.EmployeeWhereInput = {
      deletedAt: null,
    };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { employeeCode: { contains: search, mode: "insensitive" } },
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy = {
      [sortBy]: sortOrder,
    };

    const [employees, total] = await prisma.$transaction([
      prisma.employee.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      prisma.employee.count({
        where,
      }),
    ]);

    return {
      employees,
      total,
    };
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
