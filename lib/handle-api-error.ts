import { ZodError } from "zod";

import { ApiError } from "./api-error";
import { ApiResponse } from "./api-response";
import { Logger } from "./logger/logger";

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return ApiResponse.error(
      "Validation failed.",
      400,
      error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    );
  }

  if (error instanceof ApiError) {
    return ApiResponse.error(error.message, error.statusCode, error.errors);
  }

  Logger.error("Unhandled application error", {
    module: "API",
    action: "UnhandledException",
    metadata: {
      error,
    },
  });

  return ApiResponse.error("Internal Server Error", 500);
}
