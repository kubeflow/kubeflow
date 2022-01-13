/**
 * @license
 * Copyright 2018 Google LLC
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
import { ListenSequenceNumber, TargetId } from '../core/types';
import { SortedMap } from '../util/sorted_map';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { TargetData } from './target_data';
/**
 * Describes a map whose keys are active target ids. We do not care about the type of the
 * values.
 */
export declare type ActiveTargets = SortedMap<TargetId, unknown>;
export declare const GC_DID_NOT_RUN: LruResults;
export declare const LRU_COLLECTION_DISABLED = -1;
export declare const LRU_DEFAULT_CACHE_SIZE_BYTES: number;
export declare class LruParams {
    readonly cacheSizeCollectionThreshold: number;
    readonly percentileToCollect: number;
    readonly maximumSequenceNumbersToCollect: number;
    private static readonly DEFAULT_COLLECTION_PERCENTILE;
    private static readonly DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT;
    static withCacheSize(cacheSize: number): LruParams;
    static readonly DEFAULT: LruParams;
    static readonly DISABLED: LruParams;
    constructor(cacheSizeCollectionThreshold: number, percentileToCollect: number, maximumSequenceNumbersToCollect: number);
}
export interface LruGarbageCollector {
    readonly params: LruParams;
    collect(txn: PersistenceTransaction, activeTargetIds: ActiveTargets): PersistencePromise<LruResults>;
    /** Given a percentile of target to collect, returns the number of targets to collect. */
    calculateTargetCount(txn: PersistenceTransaction, percentile: number): PersistencePromise<number>;
    /** Returns the nth sequence number, counting in order from the smallest. */
    nthSequenceNumber(txn: PersistenceTransaction, n: number): PersistencePromise<number>;
    /**
     * Removes documents that have a sequence number equal to or less than the
     * upper bound and are not otherwise pinned.
     */
    removeOrphanedDocuments(txn: PersistenceTransaction, upperBound: ListenSequenceNumber): PersistencePromise<number>;
    getCacheSize(txn: PersistenceTransaction): PersistencePromise<number>;
    /**
     * Removes targets with a sequence number equal to or less than the given
     * upper bound, and removes document associations with those targets.
     */
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
}
/**
 * Describes the results of a garbage collection run. `didRun` will be set to
 * `false` if collection was skipped (either it is disabled or the cache size
 * has not hit the threshold). If collection ran, the other fields will be
 * filled in with the details of the results.
 */
export interface LruResults {
    readonly didRun: boolean;
    readonly sequenceNumbersCollected: number;
    readonly targetsRemoved: number;
    readonly documentsRemoved: number;
}
/**
 * Persistence layers intending to use LRU Garbage collection should have
 * reference delegates that implement this interface. This interface defines the
 * operations that the LRU garbage collector needs from the persistence layer.
 */
export interface LruDelegate {
    readonly garbageCollector: LruGarbageCollector;
    /** Enumerates all the targets in the TargetCache. */
    forEachTarget(txn: PersistenceTransaction, f: (target: TargetData) => void): PersistencePromise<void>;
    getSequenceNumberCount(txn: PersistenceTransaction): PersistencePromise<number>;
    /**
     * Enumerates sequence numbers for documents not associated with a target.
     * Note that this may include duplicate sequence numbers.
     */
    forEachOrphanedDocumentSequenceNumber(txn: PersistenceTransaction, f: (sequenceNumber: ListenSequenceNumber) => void): PersistencePromise<void>;
    /**
     * Removes all targets that have a sequence number less than or equal to
     * `upperBound`, and are not present in the `activeTargetIds` set.
     *
     * @returns the number of targets removed.
     */
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    /**
     * Removes all unreferenced documents from the cache that have a sequence
     * number less than or equal to the given `upperBound`.
     *
     * @returns the number of documents removed.
     */
    removeOrphanedDocuments(txn: PersistenceTransaction, upperBound: ListenSequenceNumber): PersistencePromise<number>;
    getCacheSize(txn: PersistenceTransaction): PersistencePromise<number>;
}
