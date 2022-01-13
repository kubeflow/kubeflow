/**
 * A list of logger's log level. These levels are sorted in
 * order of increasing severity. Each log level includes itself and all
 * the levels behind itself.
 *
 * @example new Logger({logLevel: 'warn'}) will print all the warn and error
 * message.
 */
export declare type LogLevel = "all" | "log" | "info" | "warn" | "error" | "off";
/**
 * An object consumed by Logger constructor to initiate a logger object.
 */
export interface LoggerOptions {
    logger?: Logger;
    logLevel?: LogLevel;
}
/**
 * Represents a logger object that is available in HandlerExecutionContext
 * throughout the middleware stack.
 */
export interface Logger {
    debug(content: object): void;
    info(content: object): void;
    warn(content: object): void;
    error(content: object): void;
}
