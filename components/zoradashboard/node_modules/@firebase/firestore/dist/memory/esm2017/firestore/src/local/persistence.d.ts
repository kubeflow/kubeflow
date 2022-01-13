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
import { TargetId } from '../core/types';
import { DocumentKey } from '../model/document_key';
import { BundleCache } from './bundle_cache';
import { IndexManager } from './index_manager';
import { LocalStore } from './local_store';
import { MutationQueue } from './mutation_queue';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction, PersistenceTransactionMode } from './persistence_transaction';
import { RemoteDocumentCache } from './remote_document_cache';
import { TargetCache } from './target_cache';
import { TargetData } from './target_data';
/**
 * Callback type for primary state notifications. This callback can be
 * registered with the persistence layer to get notified when we transition from
 * primary to secondary state and vice versa.
 *
 * Note: Instances can only toggle between Primary and Secondary state if
 * IndexedDB persistence is enabled and multiple clients are active. If this
 * listener is registered with MemoryPersistence, the callback will be called
 * exactly once marking the current instance as Primary.
 */
export declare type PrimaryStateListener = (isPrimary: boolean) => Promise<void>;
/**
 * A ReferenceDelegate instance handles all of the hooks into the document-reference lifecycle. This
 * includes being added to a target, being removed from a target, being subject to mutation, and
 * being mutated by the user.
 *
 * Different implementations may do different things with each of these events. Not every
 * implementation needs to do something with every lifecycle hook.
 *
 * PORTING NOTE: since sequence numbers are attached to transactions in this
 * client, the ReferenceDelegate does not need to deal in transactional
 * semantics (onTransactionStarted/Committed()), nor does it need to track and
 * generate sequence numbers (getCurrentSequenceNumber()).
 */
export interface ReferenceDelegate {
    /** Notify the delegate that the given document was added to a target. */
    addReference(txn: PersistenceTransaction, targetId: TargetId, doc: DocumentKey): PersistencePromise<void>;
    /** Notify the delegate that the given document was removed from a target. */
    removeReference(txn: PersistenceTransaction, targetId: TargetId, doc: DocumentKey): PersistencePromise<void>;
    /**
     * Notify the delegate that a target was removed. The delegate may, but is not obligated to,
     * actually delete the target and associated data.
     */
    removeTarget(txn: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    /**
     * Notify the delegate that a document may no longer be part of any views or
     * have any mutations associated.
     */
    markPotentiallyOrphaned(txn: PersistenceTransaction, doc: DocumentKey): PersistencePromise<void>;
    /** Notify the delegate that a limbo document was updated. */
    updateLimboDocument(txn: PersistenceTransaction, doc: DocumentKey): PersistencePromise<void>;
}
/**
 * Persistence is the lowest-level shared interface to persistent storage in
 * Firestore.
 *
 * Persistence is used to create MutationQueue and RemoteDocumentCache
 * instances backed by persistence (which might be in-memory or LevelDB).
 *
 * Persistence also exposes an API to create and run PersistenceTransactions
 * against persistence. All read / write operations must be wrapped in a
 * transaction. Implementations of PersistenceTransaction / Persistence only
 * need to guarantee that writes made against the transaction are not made to
 * durable storage until the transaction resolves its PersistencePromise.
 * Since memory-only storage components do not alter durable storage, they are
 * free to ignore the transaction.
 *
 * This contract is enough to allow the LocalStore be be written
 * independently of whether or not the stored state actually is durably
 * persisted. If persistent storage is enabled, writes are grouped together to
 * avoid inconsistent state that could cause crashes.
 *
 * Concretely, when persistent storage is enabled, the persistent versions of
 * MutationQueue, RemoteDocumentCache, and others (the mutators) will
 * defer their writes into a transaction. Once the local store has completed
 * one logical operation, it commits the transaction.
 *
 * When persistent storage is disabled, the non-persistent versions of the
 * mutators ignore the transaction. This short-cut is allowed because
 * memory-only storage leaves no state so it cannot be inconsistent.
 *
 * This simplifies the implementations of the mutators and allows memory-only
 * implementations to supplement the persistent ones without requiring any
 * special dual-store implementation of Persistence. The cost is that the
 * LocalStore needs to be slightly careful about the order of its reads and
 * writes in order to avoid relying on being able to read back uncommitted
 * writes.
 */
export interface Persistence {
    /**
     * Whether or not this persistence instance has been started.
     */
    readonly started: boolean;
    readonly referenceDelegate: ReferenceDelegate;
    /** Starts persistence. */
    start(): Promise<void>;
    /**
     * Releases any resources held during eager shutdown.
     */
    shutdown(): Promise<void>;
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    setDatabaseDeletedListener(databaseDeletedListener: () => Promise<void>): void;
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    setNetworkEnabled(networkEnabled: boolean): void;
    /**
     * Returns a MutationQueue representing the persisted mutations for the
     * given user.
     *
     * Note: The implementation is free to return the same instance every time
     * this is called for a given user. In particular, the memory-backed
     * implementation does this to emulate the persisted implementation to the
     * extent possible (e.g. in the case of uid switching from
     * sally=&gt;jack=&gt;sally, sally's mutation queue will be preserved).
     */
    getMutationQueue(user: User): MutationQueue;
    /**
     * Returns a TargetCache representing the persisted cache of targets.
     *
     * Note: The implementation is free to return the same instance every time
     * this is called. In particular, the memory-backed implementation does this
     * to emulate the persisted implementation to the extent possible.
     */
    getTargetCache(): TargetCache;
    /**
     * Returns a RemoteDocumentCache representing the persisted cache of remote
     * documents.
     *
     * Note: The implementation is free to return the same instance every time
     * this is called. In particular, the memory-backed implementation does this
     * to emulate the persisted implementation to the extent possible.
     */
    getRemoteDocumentCache(): RemoteDocumentCache;
    /**
     * Returns a BundleCache representing the persisted cache of loaded bundles.
     *
     * Note: The implementation is free to return the same instance every time
     * this is called. In particular, the memory-backed implementation does this
     * to emulate the persisted implementation to the extent possible.
     */
    getBundleCache(): BundleCache;
    /**
     * Returns an IndexManager instance that manages our persisted query indexes.
     *
     * Note: The implementation is free to return the same instance every time
     * this is called. In particular, the memory-backed implementation does this
     * to emulate the persisted implementation to the extent possible.
     */
    getIndexManager(): IndexManager;
    /**
     * Performs an operation inside a persistence transaction. Any reads or writes
     * against persistence must be performed within a transaction. Writes will be
     * committed atomically once the transaction completes.
     *
     * Persistence operations are asynchronous and therefore the provided
     * transactionOperation must return a PersistencePromise. When it is resolved,
     * the transaction will be committed and the Promise returned by this method
     * will resolve.
     *
     * @param action - A description of the action performed by this transaction,
     * used for logging.
     * @param mode - The underlying mode of the IndexedDb transaction. Can be
     * 'readonly', 'readwrite' or 'readwrite-primary'. Transactions marked
     * 'readwrite-primary' can only be executed by the primary client. In this
     * mode, the transactionOperation will not be run if the primary lease cannot
     * be acquired and the returned promise will be rejected with a
     * FAILED_PRECONDITION error.
     * @param transactionOperation - The operation to run inside a transaction.
     * @returns A promise that is resolved once the transaction completes.
     */
    runTransaction<T>(action: string, mode: PersistenceTransactionMode, transactionOperation: (transaction: PersistenceTransaction) => PersistencePromise<T>): Promise<T>;
}
/**
 * Interface implemented by the LRU scheduler to start(), stop() and restart
 * garbage collection.
 */
export interface GarbageCollectionScheduler {
    readonly started: boolean;
    start(localStore: LocalStore): void;
    stop(): void;
}
