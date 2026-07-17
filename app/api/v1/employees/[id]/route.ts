import { NextRequest } from "next/server";

import { ApiResponse } from "@/lib/api-response";
import { handleApiError } from "@/lib/handle-api-error";
import { employeeService } from "@/features/employees/services/employee.service";
import { employeeIdSchema } from "@/features/employees/validators/employee.validator";

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
