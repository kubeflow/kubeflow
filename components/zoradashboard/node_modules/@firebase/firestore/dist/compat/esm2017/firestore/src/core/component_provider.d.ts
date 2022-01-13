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
import { CredentialsProvider } from '../api/credentials';
import { User } from '../auth/user';
import { IndexedDbPersistence } from '../local/indexeddb_persistence';
import { LocalStore } from '../local/local_store';
import { GarbageCollectionScheduler, Persistence } from '../local/persistence';
import { ClientId, SharedClientState } from '../local/shared_client_state';
import { Datastore } from '../remote/datastore';
import { RemoteStore } from '../remote/remote_store';
import { JsonProtoSerializer } from '../remote/serializer';
import { AsyncQueue } from '../util/async_queue';
import { DatabaseInfo } from './database_info';
import { EventManager } from './event_manager';
import { SyncEngine } from './sync_engine';
export interface ComponentConfiguration {
    asyncQueue: AsyncQueue;
    databaseInfo: DatabaseInfo;
    credentials: CredentialsProvider;
    clientId: ClientId;
    initialUser: User;
    maxConcurrentLimboResolutions: number;
}
/**
 * Initializes and wires components that are needed to interface with the local
 * cache. Implementations override `initialize()` to provide all components.
 */
export interface OfflineComponentProvider {
    persistence: Persistence;
    sharedClientState: SharedClientState;
    localStore: LocalStore;
    gcScheduler: GarbageCollectionScheduler | null;
    synchronizeTabs: boolean;
    initialize(cfg: ComponentConfiguration): Promise<void>;
    terminate(): Promise<void>;
}
/**
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */
export declare class MemoryOfflineComponentProvider implements OfflineComponentProvider {
    persistence: Persistence;
    sharedClientState: SharedClientState;
    localStore: LocalStore;
    gcScheduler: GarbageCollectionScheduler | null;
    synchronizeTabs: boolean;
    serializer: JsonProtoSerializer;
    initialize(cfg: ComponentConfiguration): Promise<void>;
    createGarbageCollectionScheduler(cfg: ComponentConfiguration): GarbageCollectionScheduler | null;
    createLocalStore(cfg: ComponentConfiguration): LocalStore;
    createPersistence(cfg: ComponentConfiguration): Persistence;
    createSharedClientState(cfg: ComponentConfiguration): SharedClientState;
    terminate(): Promise<void>;
}
/**
 * Provides all components needed for Firestore with IndexedDB persistence.
 */
export declare class IndexedDbOfflineComponentProvider extends MemoryOfflineComponentProvider {
    protected readonly onlineComponentProvider: OnlineComponentProvider;
    protected readonly cacheSizeBytes: number | undefined;
    protected readonly forceOwnership: boolean | undefined;
    persistence: IndexedDbPersistence;
    sharedClientState: SharedClientState;
    localStore: LocalStore;
    gcScheduler: GarbageCollectionScheduler | null;
    synchronizeTabs: boolean;
    constructor(onlineComponentProvider: OnlineComponentProvider, cacheSizeBytes: number | undefined, forceOwnership: boolean | undefined);
    initialize(cfg: ComponentConfiguration): Promise<void>;
    createLocalStore(cfg: ComponentConfiguration): LocalStore;
    createGarbageCollectionScheduler(cfg: ComponentConfiguration): GarbageCollectionScheduler | null;
    createPersistence(cfg: ComponentConfiguration): IndexedDbPersistence;
    createSharedClientState(cfg: ComponentConfiguration): SharedClientState;
}
/**
 * Provides all components needed for Firestore with multi-tab IndexedDB
 * persistence.
 *
 * In the legacy client, this provider is used to provide both multi-tab and
 * non-multi-tab persistence since we cannot tell at build time whether
 * `synchronizeTabs` will be enabled.
 */
export declare class MultiTabOfflineComponentProvider extends IndexedDbOfflineComponentProvider {
    protected readonly onlineComponentProvider: OnlineComponentProvider;
    protected readonly cacheSizeBytes: number | undefined;
    synchronizeTabs: boolean;
    constructor(onlineComponentProvider: OnlineComponentProvider, cacheSizeBytes: number | undefined);
    initialize(cfg: ComponentConfiguration): Promise<void>;
    createSharedClientState(cfg: ComponentConfiguration): SharedClientState;
}
/**
 * Initializes and wires the components that are needed to interface with the
 * network.
 */
export declare class OnlineComponentProvider {
    protected localStore: LocalStore;
    protected sharedClientState: SharedClientState;
    datastore: Datastore;
    eventManager: EventManager;
    remoteStore: RemoteStore;
    syncEngine: SyncEngine;
    initialize(offlineComponentProvider: OfflineComponentProvider, cfg: ComponentConfiguration): Promise<void>;
    createEventManager(cfg: ComponentConfiguration): EventManager;
    createDatastore(cfg: ComponentConfiguration): Datastore;
    createRemoteStore(cfg: ComponentConfiguration): RemoteStore;
    createSyncEngine(cfg: ComponentConfiguration, startAsPrimary: boolean): SyncEngine;
    terminate(): Promise<void>;
}
