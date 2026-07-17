import { PERMISSIONS }
from "../authorization/permissions";

export function getCurrentUser() {

  return {

    id:"user_001",

    companyId:"company_001",

    role:"HR_ADMIN",

    permissions:[

      PERMISSIONS.EMPLOYEE_CREATE,

      PERMISSIONS.EMPLOYEE_READ,

      PERMISSIONS.EMPLOYEE_UPDATE,

      PERMISSIONS.EMPLOYEE_DELETE

    ]

  };

}