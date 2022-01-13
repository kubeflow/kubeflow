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
import { EmptyCredentialsProvider } from '../../../src/api/credentials';
import { SnapshotVersion } from '../../../src/core/snapshot_version';
import { MutationResult } from '../../../src/model/mutation';
import { PersistentListenStream, PersistentWriteStream, WatchStreamListener, WriteStreamListener } from '../../../src/remote/persistent_stream';
import { DocumentWatchChange, ExistenceFilterChange, WatchTargetChange } from '../../../src/remote/watch_change';
import { AsyncQueueImpl } from '../../../src/util/async_queue_impl';
import { FirestoreError } from '../../../src/util/error';
/**
 * StreamEventType combines the events that can be observed by the
 * WatchStreamListener and WriteStreamListener.
 */
declare type StreamEventType = 'handshakeComplete' | 'mutationResult' | 'watchChange' | 'open' | 'close';
declare class StreamStatusListener implements WatchStreamListener, WriteStreamListener {
    private pendingCallbacks;
    private pendingPromises;
    /**
     * Returns a Promise that resolves when the next callback fires. Resolves the
     * returned Promise immediately if there is already an unprocessed callback.
     *
     * This method asserts that the observed callback type matches
     * `expectedCallback`.
     */
    awaitCallback(expectedCallback: StreamEventType): Promise<void>;
    /**
     * Verifies that we did not encounter any unexpected callbacks.
     */
    verifyNoPendingCallbacks(): void;
    onHandshakeComplete(): Promise<void>;
    onMutationResult(commitVersion: SnapshotVersion, results: MutationResult[]): Promise<void>;
    onWatchChange(watchChange: DocumentWatchChange | WatchTargetChange | ExistenceFilterChange, snapshot: SnapshotVersion): Promise<void>;
    onOpen(): Promise<void>;
    onClose(err?: FirestoreError): Promise<void>;
    private resolvePending;
}
export declare function withTestWriteStream(fn: (writeStream: PersistentWriteStream, streamListener: StreamStatusListener, queue: AsyncQueueImpl) => Promise<void>, credentialsProvider?: EmptyCredentialsProvider): Promise<void>;
export declare function withTestWatchStream(fn: (watchStream: PersistentListenStream, streamListener: StreamStatusListener) => Promise<void>): Promise<void>;
export {};
