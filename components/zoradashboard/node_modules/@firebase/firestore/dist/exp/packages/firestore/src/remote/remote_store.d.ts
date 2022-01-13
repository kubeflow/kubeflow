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
import { OnlineState, TargetId } from '../core/types';
import { LocalStore } from '../local/local_store';
import { TargetData } from '../local/target_data';
import { AsyncQueue } from '../util/async_queue';
import { ConnectivityMonitor } from './connectivity_monitor';
import { Datastore } from './datastore';
import { RemoteSyncer } from './remote_syncer';
/**
 * RemoteStore - An interface to remotely stored data, basically providing a
 * wrapper around the Datastore that is more reliable for the rest of the
 * system.
 *
 * RemoteStore is responsible for maintaining the connection to the server.
 * - maintaining a list of active listens.
 * - reconnecting when the connection is dropped.
 * - resuming all the active listens on reconnect.
 *
 * RemoteStore handles all incoming events from the Datastore.
 * - listening to the watch stream and repackaging the events as RemoteEvents
 * - notifying SyncEngine of any changes to the active listens.
 *
 * RemoteStore takes writes from other components and handles them reliably.
 * - pulling pending mutations from LocalStore and sending them to Datastore.
 * - retrying mutations that failed because of network problems.
 * - acking mutations to the SyncEngine once they are accepted or rejected.
 */
export interface RemoteStore {
    /**
     * SyncEngine to notify of watch and write events. This must be set
     * immediately after construction.
     */
    remoteSyncer: RemoteSyncer;
}
export declare function newRemoteStore(localStore: LocalStore, datastore: Datastore, asyncQueue: AsyncQueue, onlineStateHandler: (onlineState: OnlineState) => void, connectivityMonitor: ConnectivityMonitor): RemoteStore;
/** Re-enables the network. Idempotent. */
export declare function remoteStoreEnableNetwork(remoteStore: RemoteStore): Promise<void>;
/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */
export declare function remoteStoreDisableNetwork(remoteStore: RemoteStore): Promise<void>;
export declare function remoteStoreShutdown(remoteStore: RemoteStore): Promise<void>;
/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */
export declare function remoteStoreListen(remoteStore: RemoteStore, targetData: TargetData): void;
/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */
export declare function remoteStoreUnlisten(remoteStore: RemoteStore, targetId: TargetId): void;
export declare function canUseNetwork(remoteStore: RemoteStore): boolean;
/**
 * Attempts to fill our write pipeline with writes from the LocalStore.
 *
 * Called internally to bootstrap or refill the write pipeline and by
 * SyncEngine whenever there are new mutations to process.
 *
 * Starts the write stream if necessary.
 */
export declare function fillWritePipeline(remoteStore: RemoteStore): Promise<void>;
export declare function outstandingWrites(remoteStore: RemoteStore): number;
export declare function remoteStoreHandleCredentialChange(remoteStore: RemoteStore, user: User): Promise<void>;
/**
 * Toggles the network state when the client gains or loses its primary lease.
 */
export declare function remoteStoreApplyPrimaryState(remoteStore: RemoteStore, isPrimary: boolean): Promise<void>;
