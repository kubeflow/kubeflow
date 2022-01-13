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
import { Token } from '../../../src/api/credentials';
import { ComponentConfiguration, MemoryOfflineComponentProvider, OnlineComponentProvider, MultiTabOfflineComponentProvider } from '../../../src/core/component_provider';
import { Observer } from '../../../src/core/event_manager';
import { Query } from '../../../src/core/query';
import { ViewSnapshot } from '../../../src/core/view_snapshot';
import { IndexedDbPersistence } from '../../../src/local/indexeddb_persistence';
import { MemoryPersistence } from '../../../src/local/memory_persistence';
import { GarbageCollectionScheduler, Persistence } from '../../../src/local/persistence';
import { PersistencePromise } from '../../../src/local/persistence_promise';
import { PersistenceTransaction, PersistenceTransactionMode } from '../../../src/local/persistence_transaction';
import { SharedClientState } from '../../../src/local/shared_client_state';
import { Mutation } from '../../../src/model/mutation';
import * as api from '../../../src/protos/firestore_proto_api';
import { Connection, Stream } from '../../../src/remote/connection';
import { Datastore } from '../../../src/remote/datastore';
import { StreamBridge } from '../../../src/remote/stream_bridge';
import { AsyncQueue } from '../../../src/util/async_queue';
import { FirestoreError } from '../../../src/util/error';
import { Deferred } from '../../../src/util/promise';
import { WindowLike } from '../../../src/util/types';
import { FakeDocument } from '../../util/test_platform';
import { PersistenceAction } from './spec_test_runner';
/**
 * A test-only MemoryPersistence implementation that is able to inject
 * transaction failures.
 */
export declare class MockMemoryPersistence extends MemoryPersistence {
    injectFailures: PersistenceAction[];
    runTransaction<T>(action: string, mode: PersistenceTransactionMode, transactionOperation: (transaction: PersistenceTransaction) => PersistencePromise<T>): Promise<T>;
}
/**
 * A test-only IndexedDbPersistence implementation that is able to inject
 * transaction failures.
 */
export declare class MockIndexedDbPersistence extends IndexedDbPersistence {
    injectFailures: PersistenceAction[];
    runTransaction<T>(action: string, mode: PersistenceTransactionMode, transactionOperation: (transaction: PersistenceTransaction) => PersistencePromise<T>): Promise<T>;
}
export declare class MockOnlineComponentProvider extends OnlineComponentProvider {
    private readonly connection;
    constructor(connection: MockConnection);
    createDatastore(cfg: ComponentConfiguration): Datastore;
}
export declare class MockMultiTabOfflineComponentProvider extends MultiTabOfflineComponentProvider {
    private readonly window;
    private readonly document;
    persistence: MockIndexedDbPersistence;
    constructor(window: WindowLike, document: FakeDocument, onlineComponentProvider: OnlineComponentProvider);
    createGarbageCollectionScheduler(cfg: ComponentConfiguration): GarbageCollectionScheduler | null;
    createSharedClientState(cfg: ComponentConfiguration): SharedClientState;
    createPersistence(cfg: ComponentConfiguration): MockIndexedDbPersistence;
}
export declare class MockMemoryOfflineComponentProvider extends MemoryOfflineComponentProvider {
    private readonly gcEnabled;
    persistence: MockMemoryPersistence;
    connection: MockConnection;
    constructor(gcEnabled: boolean);
    createGarbageCollectionScheduler(cfg: ComponentConfiguration): GarbageCollectionScheduler | null;
    createPersistence(cfg: ComponentConfiguration): Persistence;
}
export declare class MockConnection implements Connection {
    private queue;
    watchStream: StreamBridge<api.ListenRequest, api.ListenResponse> | null;
    writeStream: StreamBridge<api.WriteRequest, api.WriteResponse> | null;
    /**
     * Used to make sure a write was actually sent out on the network before the
     * test runner continues.
     */
    writeSendBarriers: Array<Deferred<api.WriteRequest>>;
    /**
     * The set of mutations sent out before there was a corresponding
     * writeSendBarrier.
     */
    earlyWrites: api.WriteRequest[];
    /** The total number of requests sent to the watch stream. */
    watchStreamRequestCount: number;
    /** The total number of requests sent to the write stream. */
    writeStreamRequestCount: number;
    nextWriteStreamToken: number;
    constructor(queue: AsyncQueue);
    /**
     * Tracks the currently active watch targets as detected by the mock watch
     * stream, as a mapping from target ID to query Target.
     */
    activeTargets: {
        [targetId: number]: api.Target;
    };
    /** A Deferred that is resolved once watch opens. */
    watchOpen: Deferred<void>;
    /** Whether the Watch stream is open. */
    isWatchOpen: boolean;
    invokeRPC<Req>(rpcName: string, request: Req): never;
    invokeStreamingRPC<Req>(rpcName: string, request: Req): never;
    waitForWriteRequest(): Promise<api.WriteRequest>;
    waitForWatchOpen(): Promise<void>;
    ackWrite(commitTime?: api.Timestamp, mutationResults?: api.WriteResult[]): void;
    failWrite(err: FirestoreError): void;
    private resetAndCloseWriteStream;
    failWatchStream(err?: FirestoreError): void;
    private resetAndCloseWatchStream;
    openStream<Req, Resp>(rpcName: string, token: Token | null): Stream<Req, Resp>;
}
/**
 * An Observer<ViewSnapshot> that forwards events to the provided callback.
 */
export declare class EventAggregator implements Observer<ViewSnapshot> {
    private query;
    private pushEvent;
    constructor(query: Query, pushEvent: (e: QueryEvent) => void);
    next(view: ViewSnapshot): void;
    error(error: Error): void;
}
/**
 * FIFO queue that tracks all outstanding mutations for a single test run.
 * As these mutations are shared among the set of active clients, any client can
 * add or retrieve mutations.
 */
export declare class SharedWriteTracker {
    private writes;
    push(write: Mutation[]): void;
    peek(): Mutation[];
    shift(): Mutation[];
}
/**
 * Interface used for object that contain exactly one of either a view snapshot
 * or an error for the given query.
 */
export interface QueryEvent {
    query: Query;
    view?: ViewSnapshot;
    error?: FirestoreError;
}
