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
export declare type FulfilledHandler<T, R> = ((result: T) => R | PersistencePromise<R>) | null;
export declare type RejectedHandler<R> = ((reason: Error) => R | PersistencePromise<R>) | null;
export declare type Resolver<T> = (value?: T) => void;
export declare type Rejector = (error: Error) => void;
/**
 * PersistencePromise is essentially a re-implementation of Promise except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */
export declare class PersistencePromise<T> {
    private nextCallback;
    private catchCallback;
    private result;
    private error;
    private isDone;
    private callbackAttached;
    constructor(callback: (resolve: Resolver<T>, reject: Rejector) => void);
    catch<R>(fn: (error: Error) => R | PersistencePromise<R>): PersistencePromise<R>;
    next<R>(nextFn?: FulfilledHandler<T, R>, catchFn?: RejectedHandler<R>): PersistencePromise<R>;
    toPromise(): Promise<T>;
    private wrapUserFunction;
    private wrapSuccess;
    private wrapFailure;
    static resolve(): PersistencePromise<void>;
    static resolve<R>(result: R): PersistencePromise<R>;
    static reject<R>(error: Error): PersistencePromise<R>;
    static waitFor(all: {
        forEach: (cb: (el: PersistencePromise<any>) => void) => void;
    }): PersistencePromise<void>;
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    static or(predicates: Array<() => PersistencePromise<boolean>>): PersistencePromise<boolean>;
    /**
     * Given an iterable, call the given function on each element in the
     * collection and wait for all of the resulting concurrent PersistencePromises
     * to resolve.
     */
    static forEach<R, S>(collection: {
        forEach: (cb: (r: R, s: S) => void) => void;
    }, f: ((r: R, s: S) => PersistencePromise<void>) | ((r: R) => PersistencePromise<void>)): PersistencePromise<void>;
    static forEach<R>(collection: {
        forEach: (cb: (r: R) => void) => void;
    }, f: (r: R) => PersistencePromise<void>): PersistencePromise<void>;
}
