export interface CreateAuditLogInput {
  companyId: string;

  userId?: string;

  entity: string;

  entityId: string;

  action: "CREATE" | "UPDATE" | "DELETE";

  oldValues?: object;
  newValues?: object;

  ipAddress?: string;

  userAgent?: string;
}
