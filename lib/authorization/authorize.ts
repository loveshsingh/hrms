import { CurrentUser } from "./types";

import { ApiError } from "@/lib/api-error";

export function authorize(

  user: CurrentUser,

  permission: string

) {

  if (
    !user.permissions.includes(permission)
  ) {

    throw new ApiError(

      403,

      "You do not have permission to perform this action."

    );

  }

}