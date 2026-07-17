import { auditRepository } from "../repositories/audit.repository";

import { CreateAuditLogInput } from "../types/audit.types";
import { Prisma, PrismaClient } from "@prisma/client";

export class AuditService {
  async createLog(
    data: CreateAuditLogInput,
    db?: PrismaClient | Prisma.TransactionClient,
  ) {
    return auditRepository.create(data, db);
  }
}

export const auditService = new AuditService();
