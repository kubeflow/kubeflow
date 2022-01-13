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
import { ListenSequenceNumber, TargetId } from '../core/types';
import { Document } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { JsonProtoSerializer } from '../remote/serializer';
import { ActiveTargets, LruDelegate, LruGarbageCollector, LruParams } from './lru_garbage_collector';
import { MemoryBundleCache } from './memory_bundle_cache';
import { MemoryIndexManager } from './memory_index_manager';
import { MemoryRemoteDocumentCache } from './memory_remote_document_cache';
import { MemoryTargetCache } from './memory_target_cache';
import { MutationQueue } from './mutation_queue';
import { Persistence, ReferenceDelegate } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction, PersistenceTransactionMode } from './persistence_transaction';
import { TargetData } from './target_data';
/**
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */
export declare class MemoryPersistence implements Persistence {
    /**
     * Note that these are retained here to make it easier to write tests
     * affecting both the in-memory and IndexedDB-backed persistence layers. Tests
     * can create a new LocalStore wrapping this Persistence instance and this
     * will make the in-memory persistence layer behave as if it were actually
     * persisting values.
     */
    private readonly indexManager;
    private mutationQueues;
    private readonly remoteDocumentCache;
    private readonly targetCache;
    private readonly bundleCache;
    private readonly listenSequence;
    private serializer;
    private _started;
    readonly referenceDelegate: MemoryReferenceDelegate;
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    constructor(referenceDelegateFactory: (p: MemoryPersistence) => MemoryReferenceDelegate, serializer: JsonProtoSerializer);
    start(): Promise<void>;
    shutdown(): Promise<void>;
    get started(): boolean;
    setDatabaseDeletedListener(): void;
    setNetworkEnabled(): void;
    getIndexManager(): MemoryIndexManager;
    getMutationQueue(user: User): MutationQueue;
    getTargetCache(): MemoryTargetCache;
    getRemoteDocumentCache(): MemoryRemoteDocumentCache;
    getBundleCache(): MemoryBundleCache;
    runTransaction<T>(action: string, mode: PersistenceTransactionMode, transactionOperation: (transaction: PersistenceTransaction) => PersistencePromise<T>): Promise<T>;
    mutationQueuesContainKey(transaction: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
}
/**
 * Memory persistence is not actually transactional, but future implementations
 * may have transaction-scoped state.
 */
export declare class MemoryTransaction extends PersistenceTransaction {
    readonly currentSequenceNumber: ListenSequenceNumber;
    constructor(currentSequenceNumber: ListenSequenceNumber);
}
export interface MemoryReferenceDelegate extends ReferenceDelegate {
    documentSize(doc: Document): number;
    onTransactionStarted(): void;
    onTransactionCommitted(txn: PersistenceTransaction): PersistencePromise<void>;
}
export declare class MemoryEagerDelegate implements MemoryReferenceDelegate {
    private readonly persistence;
    /** Tracks all documents that are active in Query views. */
    private localViewReferences;
    /** The list of documents that are potentially GCed after each transaction. */
    private _orphanedDocuments;
    private constructor();
    static factory(persistence: MemoryPersistence): MemoryEagerDelegate;
    private get orphanedDocuments();
    addReference(txn: PersistenceTransaction, targetId: TargetId, key: DocumentKey): PersistencePromise<void>;
    removeReference(txn: PersistenceTransaction, targetId: TargetId, key: DocumentKey): PersistencePromise<void>;
    markPotentiallyOrphaned(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    removeTarget(txn: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    onTransactionStarted(): void;
    onTransactionCommitted(txn: PersistenceTransaction): PersistencePromise<void>;
    updateLimboDocument(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    documentSize(doc: Document): number;
    private isReferenced;
}
export declare class MemoryLruDelegate implements ReferenceDelegate, LruDelegate {
    private readonly persistence;
    private orphanedSequenceNumbers;
    readonly garbageCollector: LruGarbageCollector;
    constructor(persistence: MemoryPersistence, lruParams: LruParams);
    onTransactionStarted(): void;
    onTransactionCommitted(txn: PersistenceTransaction): PersistencePromise<void>;
    forEachTarget(txn: PersistenceTransaction, f: (q: TargetData) => void): PersistencePromise<void>;
    getSequenceNumberCount(txn: PersistenceTransaction): PersistencePromise<number>;
    private orphanedDocumentCount;
    forEachOrphanedDocumentSequenceNumber(txn: PersistenceTransaction, f: (sequenceNumber: ListenSequenceNumber) => void): PersistencePromise<void>;
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    removeOrphanedDocuments(txn: PersistenceTransaction, upperBound: ListenSequenceNumber): PersistencePromise<number>;
    markPotentiallyOrphaned(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    removeTarget(txn: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    addReference(txn: PersistenceTransaction, targetId: TargetId, key: DocumentKey): PersistencePromise<void>;
    removeReference(txn: PersistenceTransaction, targetId: TargetId, key: DocumentKey): PersistencePromise<void>;
    updateLimboDocument(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    documentSize(document: Document): number;
    private isPinned;
    getCacheSize(txn: PersistenceTransaction): PersistencePromise<number>;
}
