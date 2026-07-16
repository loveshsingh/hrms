import { ApiError } from "@/lib/api-error";
import { employeeRepository } from "../repositories/employee.repository";

import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
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

  async findMany() {
    return employeeRepository.findMany();
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
