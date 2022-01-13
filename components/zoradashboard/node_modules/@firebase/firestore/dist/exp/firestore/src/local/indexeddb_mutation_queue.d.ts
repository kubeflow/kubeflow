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
import { User } from '../auth/user';
import { Query } from '../core/query';
import { BatchId } from '../core/types';
import { Timestamp } from '../lite/timestamp';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { MutationBatch } from '../model/mutation_batch';
import { SortedMap } from '../util/sorted_map';
import { IndexManager } from './index_manager';
import { LocalSerializer } from './local_serializer';
import { MutationQueue } from './mutation_queue';
import { ReferenceDelegate } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
/** A mutation queue for a specific user, backed by IndexedDB. */
export declare class IndexedDbMutationQueue implements MutationQueue {
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    private userId;
    private readonly serializer;
    private readonly indexManager;
    private readonly referenceDelegate;
    /**
     * Caches the document keys for pending mutation batches. If the mutation
     * has been removed from IndexedDb, the cached value may continue to
     * be used to retrieve the batch's document keys. To remove a cached value
     * locally, `removeCachedMutationKeys()` should be invoked either directly
     * or through `removeMutationBatches()`.
     *
     * With multi-tab, when the primary client acknowledges or rejects a mutation,
     * this cache is used by secondary clients to invalidate the local
     * view of the documents that were previously affected by the mutation.
     */
    private documentKeysByBatchId;
    constructor(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    userId: string, serializer: LocalSerializer, indexManager: IndexManager, referenceDelegate: ReferenceDelegate);
    /**
     * Creates a new mutation queue for the given user.
     * @param user - The user for which to create a mutation queue.
     * @param serializer - The serializer to use when persisting to IndexedDb.
     */
    static forUser(user: User, serializer: LocalSerializer, indexManager: IndexManager, referenceDelegate: ReferenceDelegate): IndexedDbMutationQueue;
    checkEmpty(transaction: PersistenceTransaction): PersistencePromise<boolean>;
    addMutationBatch(transaction: PersistenceTransaction, localWriteTime: Timestamp, baseMutations: Mutation[], mutations: Mutation[]): PersistencePromise<MutationBatch>;
    lookupMutationBatch(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    lookupMutationKeys(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<DocumentKeySet | null>;
    getNextMutationBatchAfterBatchId(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    getHighestUnacknowledgedBatchId(transaction: PersistenceTransaction): PersistencePromise<BatchId>;
    getAllMutationBatches(transaction: PersistenceTransaction): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKey(transaction: PersistenceTransaction, documentKey: DocumentKey): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKeys(transaction: PersistenceTransaction, documentKeys: SortedMap<DocumentKey, unknown>): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingQuery(transaction: PersistenceTransaction, query: Query): PersistencePromise<MutationBatch[]>;
    private lookupMutationBatches;
    removeMutationBatch(transaction: PersistenceTransaction, batch: MutationBatch): PersistencePromise<void>;
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    removeCachedMutationKeys(batchId: BatchId): void;
    performConsistencyCheck(txn: PersistenceTransaction): PersistencePromise<void>;
    containsKey(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
    /** Returns the mutation queue's metadata from IndexedDb. */
    private getMutationQueueMetadata;
}
/** Returns true if any mutation queue contains the given document. */
export declare function mutationQueuesContainKey(txn: PersistenceTransaction, docKey: DocumentKey): PersistencePromise<boolean>;
