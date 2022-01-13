/**
 * A structure shape with the error trait.
 * https://awslabs.github.io/smithy/spec/core.html#retryable-trait
 */
export interface RetryableTrait {
    /**
     * Indicates that the error is a retryable throttling error.
     */
    readonly throttling?: boolean;
}
