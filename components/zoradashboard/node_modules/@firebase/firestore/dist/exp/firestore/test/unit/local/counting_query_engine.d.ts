/**
 * @license
 * Copyright 2019 Google LLC
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
import { Query } from '../../../src/core/query';
import { SnapshotVersion } from '../../../src/core/snapshot_version';
import { LocalDocumentsView } from '../../../src/local/local_documents_view';
import { PersistencePromise } from '../../../src/local/persistence_promise';
import { PersistenceTransaction } from '../../../src/local/persistence_transaction';
import { QueryEngine } from '../../../src/local/query_engine';
import { DocumentKeySet, DocumentMap } from '../../../src/model/collections';
/**
 * A test-only query engine that forwards all API calls and exposes the number
 * of documents and mutations read.
 */
export declare class CountingQueryEngine extends QueryEngine {
    /**
     * The number of mutations returned by the MutationQueue's
     * `getAllMutationBatchesAffectingQuery()` API (since the last call to
     * `resetCounts()`)
     */
    mutationsReadByQuery: number;
    /**
     * The number of mutations returned by the MutationQueue's
     * `getAllMutationBatchesAffectingDocumentKey()` and
     * `getAllMutationBatchesAffectingDocumentKeys()` APIs (since the last call
     * to `resetCounts()`)
     */
    mutationsReadByKey: number;
    /**
     * The number of documents returned by the RemoteDocumentCache's
     * `getDocumentsMatchingQuery()` API (since the last call to `resetCounts()`)
     */
    documentsReadByQuery: number;
    /**
     * The number of documents returned by the RemoteDocumentCache's `getEntry()`
     * and `getEntries()` APIs (since the last call to `resetCounts()`)
     */
    documentsReadByKey: number;
    resetCounts(): void;
    getDocumentsMatchingQuery(transaction: PersistenceTransaction, query: Query, lastLimboFreeSnapshotVersion: SnapshotVersion, remoteKeys: DocumentKeySet): PersistencePromise<DocumentMap>;
    setLocalDocumentsView(localDocuments: LocalDocumentsView): void;
    private wrapRemoteDocumentCache;
    private wrapMutationQueue;
}
