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
import { SnapshotVersion } from '../core/snapshot_version';
import { TargetId } from '../core/types';
import { TargetData } from '../local/target_data';
import { DocumentKeySet } from '../model/collections';
import { MutableDocument } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { ByteString } from '../util/byte_string';
import { FirestoreError } from '../util/error';
import { ExistenceFilter } from './existence_filter';
import { RemoteEvent } from './remote_event';
/**
 * Internal representation of the watcher API protocol buffers.
 */
export declare type WatchChange = DocumentWatchChange | WatchTargetChange | ExistenceFilterChange;
/**
 * Represents a changed document and a list of target ids to which this change
 * applies.
 *
 * If document has been deleted NoDocument will be provided.
 */
export declare class DocumentWatchChange {
    /** The new document applies to all of these targets. */
    updatedTargetIds: TargetId[];
    /** The new document is removed from all of these targets. */
    removedTargetIds: TargetId[];
    /** The key of the document for this change. */
    key: DocumentKey;
    /**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
    newDoc: MutableDocument | null;
    constructor(
    /** The new document applies to all of these targets. */
    updatedTargetIds: TargetId[], 
    /** The new document is removed from all of these targets. */
    removedTargetIds: TargetId[], 
    /** The key of the document for this change. */
    key: DocumentKey, 
    /**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
    newDoc: MutableDocument | null);
}
export declare class ExistenceFilterChange {
    targetId: TargetId;
    existenceFilter: ExistenceFilter;
    constructor(targetId: TargetId, existenceFilter: ExistenceFilter);
}
export declare const enum WatchTargetChangeState {
    NoChange = 0,
    Added = 1,
    Removed = 2,
    Current = 3,
    Reset = 4
}
export declare class WatchTargetChange {
    /** What kind of change occurred to the watch target. */
    state: WatchTargetChangeState;
    /** The target IDs that were added/removed/set. */
    targetIds: TargetId[];
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    resumeToken: ByteString;
    /** An RPC error indicating why the watch failed. */
    cause: FirestoreError | null;
    constructor(
    /** What kind of change occurred to the watch target. */
    state: WatchTargetChangeState, 
    /** The target IDs that were added/removed/set. */
    targetIds: TargetId[], 
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    resumeToken?: ByteString, 
    /** An RPC error indicating why the watch failed. */
    cause?: FirestoreError | null);
}
/**
 * Interface implemented by RemoteStore to expose target metadata to the
 * WatchChangeAggregator.
 */
export interface TargetMetadataProvider {
    /**
     * Returns the set of remote document keys for the given target ID as of the
     * last raised snapshot.
     */
    getRemoteKeysForTarget(targetId: TargetId): DocumentKeySet;
    /**
     * Returns the TargetData for an active target ID or 'null' if this target
     * has become inactive
     */
    getTargetDataForTarget(targetId: TargetId): TargetData | null;
}
/**
 * A helper class to accumulate watch changes into a RemoteEvent.
 */
export declare class WatchChangeAggregator {
    private metadataProvider;
    constructor(metadataProvider: TargetMetadataProvider);
    /** The internal state of all tracked targets. */
    private targetStates;
    /** Keeps track of the documents to update since the last raised snapshot. */
    private pendingDocumentUpdates;
    /** A mapping of document keys to their set of target IDs. */
    private pendingDocumentTargetMapping;
    /**
     * A list of targets with existence filter mismatches. These targets are
     * known to be inconsistent and their listens needs to be re-established by
     * RemoteStore.
     */
    private pendingTargetResets;
    /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */
    handleDocumentChange(docChange: DocumentWatchChange): void;
    /** Processes and adds the WatchTargetChange to the current set of changes. */
    handleTargetChange(targetChange: WatchTargetChange): void;
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    forEachTarget(targetChange: WatchTargetChange, fn: (targetId: TargetId) => void): void;
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    handleExistenceFilter(watchChange: ExistenceFilterChange): void;
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    createRemoteEvent(snapshotVersion: SnapshotVersion): RemoteEvent;
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    addDocumentToTarget(targetId: TargetId, document: MutableDocument): void;
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    removeDocumentFromTarget(targetId: TargetId, key: DocumentKey, updatedDocument: MutableDocument | null): void;
    removeTarget(targetId: TargetId): void;
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    private getCurrentDocumentCountForTarget;
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    recordPendingTargetRequest(targetId: TargetId): void;
    private ensureTargetState;
    private ensureDocumentTargetMapping;
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    protected isActiveTarget(targetId: TargetId): boolean;
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    protected targetDataForActiveTarget(targetId: TargetId): TargetData | null;
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    private resetTarget;
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    private targetContainsDocument;
}
