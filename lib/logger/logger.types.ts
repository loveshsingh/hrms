export type LogLevel =
  | "INFO"
  | "WARN"
  | "ERROR"
  | "DEBUG";

export interface LogContext {
  module: string;
  action: string;
  userId?: string;
  companyId?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
}