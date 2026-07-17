import { prisma } from "@/lib/prisma";

import { CreateAuditLogInput } from "../types/audit.types";

export class AuditRepository {
  async create(data: CreateAuditLogInput) {
    return prisma.auditLog.create({
      data,
    });
  }
}

export const auditRepository = new AuditRepository();
