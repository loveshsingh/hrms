import { Employee } from "@prisma/client";
import { EmployeeResponseDto } from "../dtos/employee-response.dto";

export function toEmployeeResponseDto(
  employee: Employee
): EmployeeResponseDto {
  return {
    id: employee.id,
    employeeCode: employee.employeeCode,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    mobile: employee.mobile,
    status: employee.status,
  };
}