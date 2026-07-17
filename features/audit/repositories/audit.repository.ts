import { prisma } from "@/lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

import { CreateAuditLogInput } from "../types/audit.types";

export class AuditRepository {
  async create(
    data: CreateAuditLogInput,
    db: PrismaClient | Prisma.TransactionClient = prisma,
  ) {
    return db.auditLog.create({
      data,
    });
  }
}

export const auditRepository = new AuditRepository();
