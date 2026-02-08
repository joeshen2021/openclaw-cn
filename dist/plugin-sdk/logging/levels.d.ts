export declare const ALLOWED_LOG_LEVELS: readonly ["silent", "fatal", "error", "warn", "info", "debug", "trace"];
export type LogLevel = (typeof ALLOWED_LOG_LEVELS)[number];
export declare function normalizeLogLevel(level?: string, fallback?: LogLevel): "silent" | "fatal" | "error" | "warn" | "info" | "debug" | "trace";
export declare function levelToMinLevel(level: LogLevel): number;
