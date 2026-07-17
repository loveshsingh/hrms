import { auditRepository }
from "../repositories/audit.repository";

import { CreateAuditLogInput }
from "../types/audit.types";

export class AuditService {

  async createLog(
    data: CreateAuditLogInput
  ) {

    return auditRepository.create(data);

  }

}

export const auditService =
new AuditService();