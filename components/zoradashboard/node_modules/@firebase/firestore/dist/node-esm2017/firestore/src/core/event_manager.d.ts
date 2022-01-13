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
import { FirestoreError } from '../util/error';
import { EventHandler } from '../util/misc';
import { ObjectMap } from '../util/obj_map';
import { Query } from './query';
import { OnlineState } from './types';
import { ViewSnapshot } from './view_snapshot';
/**
 * Holds the listeners and the last received ViewSnapshot for a query being
 * tracked by EventManager.
 */
declare class QueryListenersInfo {
    viewSnap: ViewSnapshot | undefined;
    listeners: QueryListener[];
}
/**
 * Interface for handling events from the EventManager.
 */
export interface Observer<T> {
    next: EventHandler<T>;
    error: EventHandler<FirestoreError>;
}
/**
 * EventManager is responsible for mapping queries to query event emitters.
 * It handles "fan-out". -- Identical queries will re-use the same watch on the
 * backend.
 *
 * PORTING NOTE: On Web, EventManager `onListen` and `onUnlisten` need to be
 * assigned to SyncEngine's `listen()` and `unlisten()` API before usage. This
 * allows users to tree-shake the Watch logic.
 */
export interface EventManager {
    onListen?: (query: Query) => Promise<ViewSnapshot>;
    onUnlisten?: (query: Query) => Promise<void>;
}
export declare function newEventManager(): EventManager;
export declare class EventManagerImpl implements EventManager {
    queries: ObjectMap<Query, QueryListenersInfo>;
    onlineState: OnlineState;
    snapshotsInSyncListeners: Set<Observer<void>>;
    /** Callback invoked when a Query is first listen to. */
    onListen?: (query: Query) => Promise<ViewSnapshot>;
    /** Callback invoked once all listeners to a Query are removed. */
    onUnlisten?: (query: Query) => Promise<void>;
}
export declare function eventManagerListen(eventManager: EventManager, listener: QueryListener): Promise<void>;
export declare function eventManagerUnlisten(eventManager: EventManager, listener: QueryListener): Promise<void>;
export declare function eventManagerOnWatchChange(eventManager: EventManager, viewSnaps: ViewSnapshot[]): void;
export declare function eventManagerOnWatchError(eventManager: EventManager, query: Query, error: FirestoreError): void;
export declare function eventManagerOnOnlineStateChange(eventManager: EventManager, onlineState: OnlineState): void;
export declare function addSnapshotsInSyncListener(eventManager: EventManager, observer: Observer<void>): void;
export declare function removeSnapshotsInSyncListener(eventManager: EventManager, observer: Observer<void>): void;
export interface ListenOptions {
    /** Raise events even when only the metadata changes */
    readonly includeMetadataChanges?: boolean;
    /**
     * Wait for a sync with the server when online, but still raise events while
     * offline.
     */
    readonly waitForSyncWhenOnline?: boolean;
}
/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */
export declare class QueryListener {
    readonly query: Query;
    private queryObserver;
    /**
     * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
     * observer. This flag is set to true once we've actually raised an event.
     */
    private raisedInitialEvent;
    private options;
    private snap;
    private onlineState;
    constructor(query: Query, queryObserver: Observer<ViewSnapshot>, options?: ListenOptions);
    /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */
    onViewSnapshot(snap: ViewSnapshot): boolean;
    onError(error: FirestoreError): void;
    /** Returns whether a snapshot was raised. */
    applyOnlineStateChange(onlineState: OnlineState): boolean;
    private shouldRaiseInitialEvent;
    private shouldRaiseEvent;
    private raiseInitialEvent;
}
export {};
