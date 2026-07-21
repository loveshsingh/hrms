import { NextRequest } from "next/server";

import { createSalaryStructureSchema } from "@/features/salary-structure/validators/salary-structure.validator";

import { salaryStructureService } from "@/features/salary-structure/services/salary-structure.service";

import { ApiResponse } from "@/lib/api-response";

import { handleApiError } from "@/lib/handle-api-error";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = createSalaryStructureSchema.parse(body);

    const result = await salaryStructureService.create(data);

    return ApiResponse.success(result, "Salary Structure created", 201);
  } catch (error) {
    return handleApiError(error);
  }
}
