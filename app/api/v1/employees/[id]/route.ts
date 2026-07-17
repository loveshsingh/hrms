import { NextRequest } from "next/server";

import { ApiResponse } from "@/lib/api-response";
import { handleApiError } from "@/lib/handle-api-error";
import { employeeService } from "@/features/employees/services/employee.service";
import {
  employeeIdSchema,
  updateEmployeeSchema,
} from "@/features/employees/validators/employee.validator";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = employeeIdSchema.parse(resolvedParams);

    const employee = await employeeService.findById(id);

    return ApiResponse.success(employee, "Employee retrieved successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = employeeIdSchema.parse(resolvedParams);

    const body = await request.json();
    const validatedData = updateEmployeeSchema.parse(body);

    const updatedEmployee = await employeeService.update(id, validatedData);

    return ApiResponse.success(updatedEmployee, "Employee updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  try {
    const resolvedParams = await params;
    const { id } = employeeIdSchema.parse(resolvedParams);

    const result = await employeeService.delete(id);

    return ApiResponse.success(result, "Employee deleted successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}