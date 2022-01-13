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
import { QueryResult } from '../local/local_store_impl';
import { DocumentKeySet, DocumentMap } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { DocumentSet } from '../model/document_set';
import { TargetChange } from '../remote/remote_event';
import { Query } from './query';
import { OnlineState } from './types';
import { DocumentChangeSet, ViewSnapshot } from './view_snapshot';
export declare type LimboDocumentChange = AddedLimboDocument | RemovedLimboDocument;
export declare class AddedLimboDocument {
    key: DocumentKey;
    constructor(key: DocumentKey);
}
export declare class RemovedLimboDocument {
    key: DocumentKey;
    constructor(key: DocumentKey);
}
/** The result of applying a set of doc changes to a view. */
export interface ViewDocumentChanges {
    /** The new set of docs that should be in the view. */
    documentSet: DocumentSet;
    /** The diff of these docs with the previous set of docs. */
    changeSet: DocumentChangeSet;
    /**
     * Whether the set of documents passed in was not sufficient to calculate the
     * new state of the view and there needs to be another pass based on the
     * local cache.
     */
    needsRefill: boolean;
    mutatedKeys: DocumentKeySet;
}
export interface ViewChange {
    snapshot?: ViewSnapshot;
    limboChanges: LimboDocumentChange[];
}
/**
 * View is responsible for computing the final merged truth of what docs are in
 * a query. It gets notified of local and remote changes to docs, and applies
 * the query filters and limits to determine the most correct possible results.
 */
export declare class View {
    private query;
    /** Documents included in the remote target */
    private _syncedDocuments;
    private syncState;
    /**
     * A flag whether the view is current with the backend. A view is considered
     * current after it has seen the current flag from the backend and did not
     * lose consistency within the watch stream (e.g. because of an existence
     * filter mismatch).
     */
    private current;
    private documentSet;
    /** Documents in the view but not in the remote target */
    private limboDocuments;
    /** Document Keys that have local changes */
    private mutatedKeys;
    /** Query comparator that defines the document order in this view. */
    private docComparator;
    constructor(query: Query, 
    /** Documents included in the remote target */
    _syncedDocuments: DocumentKeySet);
    /**
     * The set of remote documents that the server has told us belongs to the target associated with
     * this view.
     */
    get syncedDocuments(): DocumentKeySet;
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */
    computeDocChanges(docChanges: DocumentMap, previousChanges?: ViewDocumentChanges): ViewDocumentChanges;
    private shouldWaitForSyncedDocument;
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param updateLimboDocuments - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */
    applyChanges(docChanges: ViewDocumentChanges, updateLimboDocuments: boolean, targetChange?: TargetChange): ViewChange;
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    applyOnlineStateChange(onlineState: OnlineState): ViewChange;
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    private shouldBeInLimbo;
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    private applyTargetChange;
    private updateLimboDocuments;
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */
    synchronizeWithPersistedState(queryResult: QueryResult): ViewChange;
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    computeInitialSnapshot(): ViewSnapshot;
}
