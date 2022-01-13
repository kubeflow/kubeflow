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
import { BatchId, TargetId } from '../core/types';
import { DocumentKeySet } from '../model/collections';
import { MutationBatchResult } from '../model/mutation_batch';
import { FirestoreError } from '../util/error';
import { RemoteEvent } from './remote_event';
/**
 * An interface that describes the actions the RemoteStore needs to perform on
 * a cooperating synchronization engine.
 */
export interface RemoteSyncer {
    /**
     * Applies one remote event to the sync engine, notifying any views of the
     * changes, and releasing any pending mutation batches that would become
     * visible because of the snapshot version the remote event contains.
     */
    applyRemoteEvent?(remoteEvent: RemoteEvent): Promise<void>;
    /**
     * Rejects the listen for the given targetID. This can be triggered by the
     * backend for any active target.
     *
     * @param targetId - The targetID corresponds to one previously initiated by
     * the user as part of TargetData passed to listen() on RemoteStore.
     * @param error - A description of the condition that has forced the rejection.
     * Nearly always this will be an indication that the user is no longer
     * authorized to see the data matching the target.
     */
    rejectListen?(targetId: TargetId, error: FirestoreError): Promise<void>;
    /**
     * Applies the result of a successful write of a mutation batch to the sync
     * engine, emitting snapshots in any views that the mutation applies to, and
     * removing the batch from the mutation queue.
     */
    applySuccessfulWrite?(result: MutationBatchResult): Promise<void>;
    /**
     * Rejects the batch, removing the batch from the mutation queue, recomputing
     * the local view of any documents affected by the batch and then, emitting
     * snapshots with the reverted value.
     */
    rejectFailedWrite?(batchId: BatchId, error: FirestoreError): Promise<void>;
    /**
     * Returns the set of remote document keys for the given target ID. This list
     * includes the documents that were assigned to the target when we received
     * the last snapshot.
     */
    getRemoteKeysForTarget?(targetId: TargetId): DocumentKeySet;
    /**
     * Updates all local state to match the pending mutations for the given user.
     * May be called repeatedly for the same user.
     */
    handleCredentialChange?(user: User): Promise<void>;
}
