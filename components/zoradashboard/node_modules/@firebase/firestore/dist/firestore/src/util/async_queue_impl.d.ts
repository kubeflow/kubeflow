/**
 * @license
 * Copyright 2020 Google LLC
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
import { AsyncQueue, DelayedOperation, TimerId } from './async_queue';
import { FirestoreError } from './error';
export declare class AsyncQueueImpl implements AsyncQueue {
    private tail;
    private retryableOps;
    private _isShuttingDown;
    private delayedOperations;
    failure: FirestoreError | null;
    private operationInProgress;
    private skipNonRestrictedTasks;
    private timerIdsToSkip;
    private backoff;
    private visibilityHandler;
    constructor();
    get isShuttingDown(): boolean;
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    enqueueAndForget<T extends unknown>(op: () => Promise<T>): void;
    enqueueAndForgetEvenWhileRestricted<T extends unknown>(op: () => Promise<T>): void;
    enterRestrictedMode(purgeExistingTasks?: boolean): void;
    enqueue<T extends unknown>(op: () => Promise<T>): Promise<T>;
    enqueueRetryable(op: () => Promise<void>): void;
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    private retryNextOp;
    private enqueueInternal;
    enqueueAfterDelay<T extends unknown>(timerId: TimerId, delayMs: number, op: () => Promise<T>): DelayedOperation<T>;
    private verifyNotFailed;
    verifyOperationInProgress(): void;
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    drain(): Promise<void>;
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    containsDelayedOperation(timerId: TimerId): boolean;
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    runAllDelayedOperationsUntil(lastTimerId: TimerId): Promise<void>;
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    skipDelaysForTimerId(timerId: TimerId): void;
    /** Called once a DelayedOperation is run or canceled. */
    private removeDelayedOperation;
}
export declare function newAsyncQueue(): AsyncQueue;
