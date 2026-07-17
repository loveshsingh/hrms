import { LogContext, LogLevel } from "./logger.types";

export class Logger {
  private static log(
    level: LogLevel,
    message: string,
    context: LogContext
  ) {
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level,
        message,
        ...context,
      })
    );
  }

  static info(
    message: string,
    context: LogContext
  ) {
    this.log("INFO", message, context);
  }

  static warn(
    message: string,
    context: LogContext
  ) {
    this.log("WARN", message, context);
  }

  static error(
    message: string,
    context: LogContext
  ) {
    this.log("ERROR", message, context);
  }

  static debug(
    message: string,
    context: LogContext
  ) {
    this.log("DEBUG", message, context);
  }
}