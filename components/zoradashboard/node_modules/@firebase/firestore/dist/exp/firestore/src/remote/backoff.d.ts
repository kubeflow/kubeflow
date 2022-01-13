/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AsyncQueue, TimerId } from '../util/async_queue';
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
export declare class ExponentialBackoff {
    /**
     * The AsyncQueue to run backoff operations on.
     */
    private readonly queue;
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    private readonly timerId;
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    private readonly initialDelayMs;
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */
    private readonly backoffFactor;
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */
    private readonly maxDelayMs;
    private currentBaseMs;
    private timerPromise;
    /** The last backoff attempt, as epoch milliseconds. */
    private lastAttemptTime;
    constructor(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    queue: AsyncQueue, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    timerId: TimerId, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    initialDelayMs?: number, 
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */
    backoffFactor?: number, 
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */
    maxDelayMs?: number);
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */
    reset(): void;
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    resetToMax(): void;
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    backoffAndRun(op: () => Promise<void>): void;
    skipBackoff(): void;
    cancel(): void;
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
    private jitterDelayMs;
}
