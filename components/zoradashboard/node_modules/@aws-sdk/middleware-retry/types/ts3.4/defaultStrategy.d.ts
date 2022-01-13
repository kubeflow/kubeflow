import { SdkError } from "@aws-sdk/smithy-client";
import { FinalizeHandler, FinalizeHandlerArguments, MetadataBearer, Provider, RetryStrategy } from "@aws-sdk/types";
/**
 * The default value for how many HTTP requests an SDK should make for a
 * single SDK operation invocation before giving up
 */
export declare const DEFAULT_MAX_ATTEMPTS = 3;
/**
 * The default retry algorithm to use.
 */
export declare const DEFAULT_RETRY_MODE = "standard";
/**
 * Determines whether an error is retryable based on the number of retries
 * already attempted, the HTTP status code, and the error received (if any).
 *
 * @param error         The error encountered.
 */
export interface RetryDecider {
    (error: SdkError): boolean;
}
/**
 * Determines the number of milliseconds to wait before retrying an action.
 *
 * @param delayBase The base delay (in milliseconds).
 * @param attempts  The number of times the action has already been tried.
 */
export interface DelayDecider {
    (delayBase: number, attempts: number): number;
}
/**
 * Interface that specifies the retry quota behavior.
 */
export interface RetryQuota {
    /**
     * returns true if retry tokens are available from the retry quota bucket.
     */
    hasRetryTokens: (error: SdkError) => boolean;
    /**
     * returns token amount from the retry quota bucket.
     * throws error is retry tokens are not available.
     */
    retrieveRetryTokens: (error: SdkError) => number;
    /**
     * releases tokens back to the retry quota.
     */
    releaseRetryTokens: (releaseCapacityAmount?: number) => void;
}
/**
 * Strategy options to be passed to StandardRetryStrategy
 */
export interface StandardRetryStrategyOptions {
    retryDecider?: RetryDecider;
    delayDecider?: DelayDecider;
    retryQuota?: RetryQuota;
}
export declare class StandardRetryStrategy implements RetryStrategy {
    private readonly maxAttemptsProvider;
    private retryDecider;
    private delayDecider;
    private retryQuota;
    readonly mode = "standard";
    constructor(maxAttemptsProvider: Provider<number>, options?: StandardRetryStrategyOptions);
    private shouldRetry;
    private getMaxAttempts;
    retry<Input extends object, Ouput extends MetadataBearer>(next: FinalizeHandler<Input, Ouput>, args: FinalizeHandlerArguments<Input>): Promise<{
        response: unknown;
        output: Ouput;
    }>;
}
