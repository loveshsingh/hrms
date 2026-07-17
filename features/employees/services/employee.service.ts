import { ApiError } from "@/lib/api-error";
import { employeeRepository } from "../repositories/employee.repository";

import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeListQueryInput,
} from "../validators/employee.validator";
import {
  toEmployeeResponseDto,
  toEmployeeDetailDto,
} from "../mappers/employee.mapper";
import { EmployeeDetailDto } from "../dtos/employee-detail.dto";

export class EmployeeService {
  private async validateUniqueness(
    email?: string,
    employeeCode?: string,
    currentEmployee?: { email: string; employeeCode: string; id: string },
  ) {
    if (
      employeeCode !== undefined &&
      (!currentEmployee || employeeCode !== currentEmployee.employeeCode)
    ) {
      const existingCode =
        await employeeRepository.findByEmployeeCode(employeeCode);
      if (
        existingCode &&
        (!currentEmployee || existingCode.id !== currentEmployee.id)
      ) {
        throw new ApiError(409, "Employee code already exists.");
      }
    }

    if (
      email !== undefined &&
      (!currentEmployee || email !== currentEmployee.email)
    ) {
      const existingEmail = await employeeRepository.findByEmail(email);
      if (
        existingEmail &&
        (!currentEmployee || existingEmail.id !== currentEmployee.id)
      ) {
        throw new ApiError(409, "Email already exists.");
      }
    }
  }

  async create(data: CreateEmployeeInput) {
    await this.validateUniqueness(data.email, data.employeeCode);

    return employeeRepository.create(data);
  }

  async findById(id: string): Promise<EmployeeDetailDto> {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new ApiError(404, "Employee not found.");
    }

    return toEmployeeDetailDto(employee);
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
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new ApiError(404, "Employee not found.");
    }

    await this.validateUniqueness(data.email, data.employeeCode, employee);

    const updatedEmployee = await employeeRepository.update(id, data);
    if (!updatedEmployee) {
      throw new ApiError(404, "Employee not found.");
    }

    return toEmployeeResponseDto(updatedEmployee);
  }

  async delete(id: string) {
    const employee = await this.findById(id);

    const result = await employeeRepository.softDelete(id);

    if (result.count === 0) {
      throw new ApiError(404, "Employee not found.");
    }

    return {
      id: employee.id,
      message: "Employee deleted successfully.",
    };
  }

  async count() {
    return employeeRepository.count();
  }
}

export const employeeService = new EmployeeService();
