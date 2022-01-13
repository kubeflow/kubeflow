import { LoggingProvider } from '../types';
import { Logger } from './logger-interface';
export declare enum LOG_TYPE {
    DEBUG = "DEBUG",
    ERROR = "ERROR",
    INFO = "INFO",
    WARN = "WARN",
    VERBOSE = "VERBOSE"
}
/**
 * Write logs
 * @class Logger
 */
export declare class ConsoleLogger implements Logger {
    name: string;
    level: LOG_TYPE | string;
    private _pluggables;
    private _config;
    /**
     * @constructor
     * @param {string} name - Name of the logger
     */
    constructor(name: string, level?: LOG_TYPE | string);
    static LOG_LEVEL: any;
    _padding(n: any): string;
    _ts(): string;
    configure(config?: object): object;
    /**
     * Write log
     * @method
     * @memeberof Logger
     * @param {LOG_TYPE|string} type - log type, default INFO
     * @param {string|object} msg - Logging message or object
     */
    _log(type: LOG_TYPE | string, ...msg: any[]): void;
    /**
     * Write General log. Default to INFO
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    log(...msg: any[]): void;
    /**
     * Write INFO log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    info(...msg: any[]): void;
    /**
     * Write WARN log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    warn(...msg: any[]): void;
    /**
     * Write ERROR log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    error(...msg: any[]): void;
    /**
     * Write DEBUG log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    debug(...msg: any[]): void;
    /**
     * Write VERBOSE log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    verbose(...msg: any[]): void;
    addPluggable(pluggable: LoggingProvider): void;
    listPluggables(): LoggingProvider[];
}
