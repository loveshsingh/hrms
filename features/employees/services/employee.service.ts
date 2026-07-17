import { ApiError } from "@/lib/api-error";
import { employeeRepository } from "../repositories/employee.repository";

import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeListQueryInput,
} from "../validators/employee.validator";
import { toEmployeeResponseDto } from "../mappers/employee.mapper";

export class EmployeeService {
  async create(data: CreateEmployeeInput) {
    const existingEmployeeCode = await employeeRepository.findByEmployeeCode(
      data.employeeCode,
    );

    if (existingEmployeeCode) {
      throw new ApiError(409, "Employee code already exists.");
    }

    const existingEmail = await employeeRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new ApiError(409, "Email already exists.");
    }

    return employeeRepository.create(data);
  }

  async findById(id: string) {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new ApiError(404, "Employee not found.");
    }

    return toEmployeeResponseDto(employee);;
  }

  async findMany(params: Partial<EmployeeListQueryInput> = {}) {
    const { employees, total } = await employeeRepository.findMany(params);
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const totalPages = Math.ceil(total / pageSize);

    return {
      items: employees.map(toEmployeeResponseDto),
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    };
  }

  async update(id: string, data: UpdateEmployeeInput) {
    await this.findById(id);

    return employeeRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return employeeRepository.softDelete(id);
  }

  async count() {
    return employeeRepository.count();
  }
}

export const employeeService = new EmployeeService();
