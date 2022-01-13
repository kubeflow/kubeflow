import { DelayFunction } from '../types';
export declare class NonRetryableError extends Error {
    readonly nonRetryable = true;
    constructor(message: string);
}
/**
 * @private
 * Internal use of Amplify only
 */
export declare function retry(functionToRetry: Function, args: any[], delayFn: DelayFunction, attempt?: number): any;
/**
 * @private
 * Internal use of Amplify only
 */
export declare const jitteredExponentialRetry: (functionToRetry: Function, args: any[], maxDelayMs?: number) => any;
