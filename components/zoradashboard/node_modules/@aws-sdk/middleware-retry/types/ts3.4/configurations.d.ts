import { LoadedConfigSelectors } from "@aws-sdk/node-config-provider";
import { Provider, RetryStrategy } from "@aws-sdk/types";
export declare const ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
export declare const CONFIG_MAX_ATTEMPTS = "max_attempts";
export declare const NODE_MAX_ATTEMPT_CONFIG_OPTIONS: LoadedConfigSelectors<number>;
export interface RetryInputConfig {
    /**
     * The maximum number of times requests that encounter retryable failures should be attempted.
     */
    maxAttempts?: number | Provider<number>;
    /**
     * The strategy to retry the request. Using built-in exponential backoff strategy by default.
     */
    retryStrategy?: RetryStrategy;
}
interface PreviouslyResolved {
}
export interface RetryResolvedConfig {
    maxAttempts: Provider<number>;
    retryStrategy: RetryStrategy;
}
export declare const resolveRetryConfig: <T>(input: T & PreviouslyResolved & RetryInputConfig) => T & RetryResolvedConfig;
export declare const ENV_RETRY_MODE = "AWS_RETRY_MODE";
export declare const CONFIG_RETRY_MODE = "retry_mode";
export declare const NODE_RETRY_MODE_CONFIG_OPTIONS: LoadedConfigSelectors<string>;
export {};
