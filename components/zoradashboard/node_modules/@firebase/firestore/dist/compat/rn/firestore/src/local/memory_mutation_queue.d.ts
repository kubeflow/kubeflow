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
import { Query } from '../core/query';
import { BatchId } from '../core/types';
import { Timestamp } from '../lite/timestamp';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { MutationBatch } from '../model/mutation_batch';
import { SortedMap } from '../util/sorted_map';
import { IndexManager } from './index_manager';
import { MutationQueue } from './mutation_queue';
import { ReferenceDelegate } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
export declare class MemoryMutationQueue implements MutationQueue {
    private readonly indexManager;
    private readonly referenceDelegate;
    /**
     * The set of all mutations that have been sent but not yet been applied to
     * the backend.
     */
    private mutationQueue;
    /** Next value to use when assigning sequential IDs to each mutation batch. */
    private nextBatchId;
    /** An ordered mapping between documents and the mutations batch IDs. */
    private batchesByDocumentKey;
    constructor(indexManager: IndexManager, referenceDelegate: ReferenceDelegate);
    checkEmpty(transaction: PersistenceTransaction): PersistencePromise<boolean>;
    addMutationBatch(transaction: PersistenceTransaction, localWriteTime: Timestamp, baseMutations: Mutation[], mutations: Mutation[]): PersistencePromise<MutationBatch>;
    lookupMutationBatch(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    getNextMutationBatchAfterBatchId(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    getHighestUnacknowledgedBatchId(): PersistencePromise<BatchId>;
    getAllMutationBatches(transaction: PersistenceTransaction): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKey(transaction: PersistenceTransaction, documentKey: DocumentKey): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKeys(transaction: PersistenceTransaction, documentKeys: SortedMap<DocumentKey, unknown>): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingQuery(transaction: PersistenceTransaction, query: Query): PersistencePromise<MutationBatch[]>;
    private findMutationBatches;
    removeMutationBatch(transaction: PersistenceTransaction, batch: MutationBatch): PersistencePromise<void>;
    removeCachedMutationKeys(batchId: BatchId): void;
    containsKey(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
    performConsistencyCheck(txn: PersistenceTransaction): PersistencePromise<void>;
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    private indexOfExistingBatchId;
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    private indexOfBatchId;
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    private findMutationBatch;
}
