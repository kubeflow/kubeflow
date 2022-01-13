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
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
/** A queue of mutations to apply to the remote store. */
export interface MutationQueue {
    /** Returns true if this queue contains no mutation batches. */
    checkEmpty(transaction: PersistenceTransaction): PersistencePromise<boolean>;
    /**
     * Creates a new mutation batch and adds it to this mutation queue.
     *
     * @param transaction - The transaction this operation is scoped to.
     * @param localWriteTime - The original write time of this mutation.
     * @param baseMutations - Mutations that are used to populate the base values
     * when this mutation is applied locally. These mutations are used to locally
     * overwrite values that are persisted in the remote document cache.
     * @param mutations - The user-provided mutations in this mutation batch.
     */
    addMutationBatch(transaction: PersistenceTransaction, localWriteTime: Timestamp, baseMutations: Mutation[], mutations: Mutation[]): PersistencePromise<MutationBatch>;
    /**
     * Loads the mutation batch with the given batchId.
     */
    lookupMutationBatch(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    /**
     * Gets the first unacknowledged mutation batch after the passed in batchId
     * in the mutation queue or null if empty.
     *
     * @param batchId - The batch to search after, or BATCHID_UNKNOWN for the
     * first mutation in the queue.
     *
     * @returns the next mutation or null if there wasn't one.
     */
    getNextMutationBatchAfterBatchId(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    /**
     * Gets the largest (latest) batch id in mutation queue for the current user
     * that is pending server response, returns `BATCHID_UNKNOWN` if the queue is
     * empty.
     *
     * @returns the largest batch id in the mutation queue that is not
     * acknowledged.
     */
    getHighestUnacknowledgedBatchId(transaction: PersistenceTransaction): PersistencePromise<BatchId>;
    /** Gets all mutation batches in the mutation queue. */
    getAllMutationBatches(transaction: PersistenceTransaction): PersistencePromise<MutationBatch[]>;
    /**
     * Finds all mutation batches that could possibly affect the given
     * document key. Not all mutations in a batch will necessarily affect the
     * document key, so when looping through the batch you'll need to check that
     * the mutation itself matches the key.
     *
     * Batches are guaranteed to be in sorted order.
     *
     * Note that because of this requirement implementations are free to return
     * mutation batches that don't contain the document key at all if it's
     * convenient.
     */
    getAllMutationBatchesAffectingDocumentKey(transaction: PersistenceTransaction, documentKey: DocumentKey): PersistencePromise<MutationBatch[]>;
    /**
     * Finds all mutation batches that could possibly affect the given set of
     * document keys. Not all mutations in a batch will necessarily affect each
     * key, so when looping through the batch you'll need to check that the
     * mutation itself matches the key.
     *
     * Batches are guaranteed to be in sorted order.
     *
     * Note that because of this requirement implementations are free to return
     * mutation batches that don't contain any of the document keys at all if it's
     * convenient.
     */
    getAllMutationBatchesAffectingDocumentKeys(transaction: PersistenceTransaction, documentKeys: SortedMap<DocumentKey, unknown>): PersistencePromise<MutationBatch[]>;
    /**
     * Finds all mutation batches that could affect the results for the given
     * query. Not all mutations in a batch will necessarily affect the query, so
     * when looping through the batch you'll need to check that the mutation
     * itself matches the query.
     *
     * Batches are guaranteed to be in sorted order.
     *
     * Note that because of this requirement implementations are free to return
     * mutation batches that don't match the query at all if it's convenient.
     *
     * NOTE: A PatchMutation does not need to include all fields in the query
     * filter criteria in order to be a match (but any fields it does contain do
     * need to match).
     */
    getAllMutationBatchesAffectingQuery(transaction: PersistenceTransaction, query: Query): PersistencePromise<MutationBatch[]>;
    /**
     * Removes the given mutation batch from the queue. This is useful in two
     * circumstances:
     *
     * + Removing an applied mutation from the head of the queue
     * + Removing a rejected mutation from anywhere in the queue
     *
     * Multi-Tab Note: This operation should only be called by the primary client.
     */
    removeMutationBatch(transaction: PersistenceTransaction, batch: MutationBatch): PersistencePromise<void>;
    /**
     * Performs a consistency check, examining the mutation queue for any
     * leaks, if possible.
     */
    performConsistencyCheck(transaction: PersistenceTransaction): PersistencePromise<void>;
}
