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
import { GetOptions } from '@firebase/firestore-types';
import { CredentialsProvider } from '../api/credentials';
import { User } from '../auth/user';
import { LoadBundleTask } from '../exp/bundle';
import { LocalStore } from '../local/local_store';
import { Document } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { AsyncQueue } from '../util/async_queue';
import { NamedQuery } from './bundle';
import { ComponentConfiguration, OfflineComponentProvider, OnlineComponentProvider } from './component_provider';
import { DatabaseId, DatabaseInfo } from './database_info';
import { EventManager, ListenOptions, Observer } from './event_manager';
import { Query } from './query';
import { SyncEngine } from './sync_engine';
import { Transaction } from './transaction';
import { ViewSnapshot } from './view_snapshot';
export declare const MAX_CONCURRENT_LIMBO_RESOLUTIONS = 100;
/**
 * FirestoreClient is a top-level class that constructs and owns all of the
 * pieces of the client SDK architecture. It is responsible for creating the
 * async queue that is shared by all of the other components in the system.
 */
export declare class FirestoreClient {
    private credentials;
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    asyncQueue: AsyncQueue;
    private databaseInfo;
    private user;
    private readonly clientId;
    private credentialListener;
    offlineComponents?: OfflineComponentProvider;
    onlineComponents?: OnlineComponentProvider;
    constructor(credentials: CredentialsProvider, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    asyncQueue: AsyncQueue, databaseInfo: DatabaseInfo);
    getConfiguration(): Promise<ComponentConfiguration>;
    setCredentialChangeListener(listener: (user: User) => Promise<void>): void;
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */
    verifyNotTerminated(): void;
    terminate(): Promise<void>;
}
export declare function setOfflineComponentProvider(client: FirestoreClient, offlineComponentProvider: OfflineComponentProvider): Promise<void>;
export declare function setOnlineComponentProvider(client: FirestoreClient, onlineComponentProvider: OnlineComponentProvider): Promise<void>;
export declare function getLocalStore(client: FirestoreClient): Promise<LocalStore>;
export declare function getSyncEngine(client: FirestoreClient): Promise<SyncEngine>;
export declare function getEventManager(client: FirestoreClient): Promise<EventManager>;
/** Enables the network connection and re-enqueues all pending operations. */
export declare function firestoreClientEnableNetwork(client: FirestoreClient): Promise<void>;
/** Disables the network connection. Pending operations will not complete. */
export declare function firestoreClientDisableNetwork(client: FirestoreClient): Promise<void>;
/**
 * Returns a Promise that resolves when all writes that were pending at the time
 * this method was called received server acknowledgement. An acknowledgement
 * can be either acceptance or rejection.
 */
export declare function firestoreClientWaitForPendingWrites(client: FirestoreClient): Promise<void>;
export declare function firestoreClientListen(client: FirestoreClient, query: Query, options: ListenOptions, observer: Partial<Observer<ViewSnapshot>>): () => void;
export declare function firestoreClientGetDocumentFromLocalCache(client: FirestoreClient, docKey: DocumentKey): Promise<Document | null>;
export declare function firestoreClientGetDocumentViaSnapshotListener(client: FirestoreClient, key: DocumentKey, options?: GetOptions): Promise<ViewSnapshot>;
export declare function firestoreClientGetDocumentsFromLocalCache(client: FirestoreClient, query: Query): Promise<ViewSnapshot>;
export declare function firestoreClientGetDocumentsViaSnapshotListener(client: FirestoreClient, query: Query, options?: GetOptions): Promise<ViewSnapshot>;
export declare function firestoreClientWrite(client: FirestoreClient, mutations: Mutation[]): Promise<void>;
export declare function firestoreClientAddSnapshotsInSyncListener(client: FirestoreClient, observer: Partial<Observer<void>>): () => void;
/**
 * Takes an updateFunction in which a set of reads and writes can be performed
 * atomically. In the updateFunction, the client can read and write values
 * using the supplied transaction object. After the updateFunction, all
 * changes will be committed. If a retryable error occurs (ex: some other
 * client has changed any of the data referenced), then the updateFunction
 * will be called again after a backoff. If the updateFunction still fails
 * after all retries, then the transaction will be rejected.
 *
 * The transaction object passed to the updateFunction contains methods for
 * accessing documents and collections. Unlike other datastore access, data
 * accessed with the transaction will not reflect local changes that have not
 * been committed. For this reason, it is required that all reads are
 * performed before any writes. Transactions must be performed while online.
 */
export declare function firestoreClientTransaction<T>(client: FirestoreClient, updateFunction: (transaction: Transaction) => Promise<T>): Promise<T>;
export declare function firestoreClientLoadBundle(client: FirestoreClient, databaseId: DatabaseId, data: ReadableStream<Uint8Array> | ArrayBuffer | string, resultTask: LoadBundleTask): void;
export declare function firestoreClientGetNamedQuery(client: FirestoreClient, queryName: string): Promise<NamedQuery | undefined>;
