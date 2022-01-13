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
import { ListenSequenceNumber, TargetId } from '../core/types';
import { DocumentKey } from '../model/document_key';
import { IndexedDbLruDelegate } from './indexeddb_lru_delegate';
import { ActiveTargets, LruGarbageCollector, LruParams } from './lru_garbage_collector';
import { Persistence } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { TargetData } from './target_data';
/** Provides LRU functionality for IndexedDB persistence. */
export declare class IndexedDbLruDelegateImpl implements IndexedDbLruDelegate {
    private readonly db;
    readonly garbageCollector: LruGarbageCollector;
    constructor(db: Persistence, params: LruParams);
    getSequenceNumberCount(txn: PersistenceTransaction): PersistencePromise<number>;
    private orphanedDocumentCount;
    forEachTarget(txn: PersistenceTransaction, f: (q: TargetData) => void): PersistencePromise<void>;
    forEachOrphanedDocumentSequenceNumber(txn: PersistenceTransaction, f: (sequenceNumber: ListenSequenceNumber) => void): PersistencePromise<void>;
    addReference(txn: PersistenceTransaction, targetId: TargetId, key: DocumentKey): PersistencePromise<void>;
    removeReference(txn: PersistenceTransaction, targetId: TargetId, key: DocumentKey): PersistencePromise<void>;
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    markPotentiallyOrphaned(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    private isPinned;
    removeOrphanedDocuments(txn: PersistenceTransaction, upperBound: ListenSequenceNumber): PersistencePromise<number>;
    removeTarget(txn: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    updateLimboDocument(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    private forEachOrphanedDocument;
    getCacheSize(txn: PersistenceTransaction): PersistencePromise<number>;
}
