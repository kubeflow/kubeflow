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
import { DatabaseId } from '../core/database_info';
import { SequenceNumberSyncer } from '../core/listen_sequence';
import { JsonProtoSerializer } from '../remote/serializer';
import { AsyncQueue } from '../util/async_queue';
import { DocumentLike, WindowLike } from '../util/types';
import { BundleCache } from './bundle_cache';
import { IndexManager } from './index_manager';
import { IndexedDbLruDelegateImpl } from './indexeddb_lru_delegate_impl';
import { IndexedDbMutationQueue } from './indexeddb_mutation_queue';
import { IndexedDbRemoteDocumentCache } from './indexeddb_remote_document_cache';
import { IndexedDbTargetCache } from './indexeddb_target_cache';
import { LruParams } from './lru_garbage_collector';
import { Persistence, PrimaryStateListener } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction, PersistenceTransactionMode } from './persistence_transaction';
import { ClientId } from './shared_client_state';
/**
 * The name of the main (and currently only) IndexedDB database. This name is
 * appended to the prefix provided to the IndexedDbPersistence constructor.
 */
export declare const MAIN_DATABASE = "main";
/**
 * An IndexedDB-backed instance of Persistence. Data is stored persistently
 * across sessions.
 *
 * On Web only, the Firestore SDKs support shared access to its persistence
 * layer. This allows multiple browser tabs to read and write to IndexedDb and
 * to synchronize state even without network connectivity. Shared access is
 * currently optional and not enabled unless all clients invoke
 * `enablePersistence()` with `{synchronizeTabs:true}`.
 *
 * In multi-tab mode, if multiple clients are active at the same time, the SDK
 * will designate one client as the “primary client”. An effort is made to pick
 * a visible, network-connected and active client, and this client is
 * responsible for letting other clients know about its presence. The primary
 * client writes a unique client-generated identifier (the client ID) to
 * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
 * update this entry, another client can acquire the lease and take over as
 * primary.
 *
 * Some persistence operations in the SDK are designated as primary-client only
 * operations. This includes the acknowledgment of mutations and all updates of
 * remote documents. The effects of these operations are written to persistence
 * and then broadcast to other tabs via LocalStorage (see
 * `WebStorageSharedClientState`), which then refresh their state from
 * persistence.
 *
 * Similarly, the primary client listens to notifications sent by secondary
 * clients to discover persistence changes written by secondary clients, such as
 * the addition of new mutations and query targets.
 *
 * If multi-tab is not enabled and another tab already obtained the primary
 * lease, IndexedDbPersistence enters a failed state and all subsequent
 * operations will automatically fail.
 *
 * Additionally, there is an optimization so that when a tab is closed, the
 * primary lease is released immediately (this is especially important to make
 * sure that a refreshed tab is able to immediately re-acquire the primary
 * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
 * since it is an asynchronous API. So in addition to attempting to give up the
 * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
 * LocalStorage which acts as an indicator that another tab should go ahead and
 * take the primary lease immediately regardless of the current lease timestamp.
 *
 * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
 * longer optional.
 */
export declare class IndexedDbPersistence implements Persistence {
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    private readonly allowTabSynchronization;
    private readonly persistenceKey;
    private readonly clientId;
    private readonly queue;
    private readonly window;
    private readonly document;
    private readonly sequenceNumberSyncer;
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    private readonly forceOwningTab;
    private simpleDb;
    private listenSequence;
    private _started;
    private isPrimary;
    private networkEnabled;
    private dbName;
    /** Our window.unload handler, if registered. */
    private windowUnloadHandler;
    private inForeground;
    private serializer;
    /** Our 'visibilitychange' listener if registered. */
    private documentVisibilityHandler;
    /** The client metadata refresh task. */
    private clientMetadataRefresher;
    /** The last time we garbage collected the client metadata object store. */
    private lastGarbageCollectionTime;
    /** A listener to notify on primary state changes. */
    private primaryStateListener;
    private readonly targetCache;
    private readonly indexManager;
    private readonly remoteDocumentCache;
    private readonly bundleCache;
    private readonly webStorage;
    readonly referenceDelegate: IndexedDbLruDelegateImpl;
    constructor(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    allowTabSynchronization: boolean, persistenceKey: string, clientId: ClientId, lruParams: LruParams, queue: AsyncQueue, window: WindowLike | null, document: DocumentLike | null, serializer: JsonProtoSerializer, sequenceNumberSyncer: SequenceNumberSyncer, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    forceOwningTab: boolean);
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @returns Whether persistence was enabled.
     */
    start(): Promise<void>;
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    setPrimaryStateListener(primaryStateListener: PrimaryStateListener): Promise<void>;
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
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    private updateClientMetadataAndTryBecomePrimary;
    private verifyPrimaryLease;
    private removeClientMetadata;
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    private maybeGarbageCollectMultiClientState;
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    private scheduleClientMetadataAndPrimaryLeaseRefreshes;
    /** Checks whether `client` is the local client. */
    private isLocalClient;
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    private canActAsPrimary;
    shutdown(): Promise<void>;
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    private filterActiveClients;
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    getActiveClients(): Promise<ClientId[]>;
    get started(): boolean;
    getMutationQueue(user: User): IndexedDbMutationQueue;
    getTargetCache(): IndexedDbTargetCache;
    getRemoteDocumentCache(): IndexedDbRemoteDocumentCache;
    getIndexManager(): IndexManager;
    getBundleCache(): BundleCache;
    runTransaction<T>(action: string, mode: PersistenceTransactionMode, transactionOperation: (transaction: PersistenceTransaction) => PersistencePromise<T>): Promise<T>;
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    private verifyAllowTabSynchronization;
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    private acquireOrExtendPrimaryLease;
    static isAvailable(): boolean;
    /** Checks the primary lease and removes it if we are the current primary. */
    private releasePrimaryLeaseIfHeld;
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */
    private isWithinAge;
    private attachVisibilityHandler;
    private detachVisibilityHandler;
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    private attachWindowUnloadHook;
    private detachWindowUnloadHook;
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    private isClientZombied;
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    private markClientZombied;
    /** Removes the zombied client entry if it exists. */
    private removeClientZombiedEntry;
    private zombiedClientLocalStorageKey;
}
/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */
export declare function indexedDbStoragePrefix(databaseId: DatabaseId, persistenceKey: string): string;
export declare function indexedDbClearPersistence(persistenceKey: string): Promise<void>;
