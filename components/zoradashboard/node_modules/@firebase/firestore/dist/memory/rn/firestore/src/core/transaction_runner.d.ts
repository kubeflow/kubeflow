/**
 * @license
 * Copyright 2019 Google LLC
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
import { Datastore } from '../remote/datastore';
import { AsyncQueue } from '../util/async_queue';
import { Deferred } from '../util/promise';
import { Transaction } from './transaction';
export declare const DEFAULT_MAX_ATTEMPTS_COUNT = 5;
/**
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */
export declare class TransactionRunner<T> {
    private readonly asyncQueue;
    private readonly datastore;
    private readonly updateFunction;
    private readonly deferred;
    private attemptsRemaining;
    private backoff;
    constructor(asyncQueue: AsyncQueue, datastore: Datastore, updateFunction: (transaction: Transaction) => Promise<T>, deferred: Deferred<T>);
    /** Runs the transaction and sets the result on deferred. */
    run(): void;
    private runWithBackOff;
    private tryRunUpdateFunction;
    private handleTransactionError;
    private isRetryableTransactionError;
}
