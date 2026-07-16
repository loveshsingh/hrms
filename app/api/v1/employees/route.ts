import { NextRequest } from "next/server";

import { ApiResponse } from "@/lib/api-response";
import { handleApiError } from "@/lib/handle-api-error";

import { employeeService } from "@/features/employees/services/employee.service";

import { createEmployeeSchema } from "@/features/employees/validators/employee.validator";

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json();

    const validatedData =
      createEmployeeSchema.parse(body);

    const employee =
      await employeeService.create(
        validatedData
      );

    return ApiResponse.success(
      employee,
      "Employee created successfully.",
      201
    );

  } catch (error) {

    return handleApiError(error);

  }

}