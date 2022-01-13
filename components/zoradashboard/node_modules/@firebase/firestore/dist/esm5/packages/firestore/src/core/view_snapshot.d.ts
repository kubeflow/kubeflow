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
import { DocumentKeySet } from '../model/collections';
import { Document } from '../model/document';
import { DocumentSet } from '../model/document_set';
import { Query } from './query';
export declare const enum ChangeType {
    Added = 0,
    Removed = 1,
    Modified = 2,
    Metadata = 3
}
export interface DocumentViewChange {
    type: ChangeType;
    doc: Document;
}
export declare const enum SyncState {
    Local = 0,
    Synced = 1
}
/**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */
export declare class DocumentChangeSet {
    private changeMap;
    track(change: DocumentViewChange): void;
    getChanges(): DocumentViewChange[];
}
export declare class ViewSnapshot {
    readonly query: Query;
    readonly docs: DocumentSet;
    readonly oldDocs: DocumentSet;
    readonly docChanges: DocumentViewChange[];
    readonly mutatedKeys: DocumentKeySet;
    readonly fromCache: boolean;
    readonly syncStateChanged: boolean;
    readonly excludesMetadataChanges: boolean;
    constructor(query: Query, docs: DocumentSet, oldDocs: DocumentSet, docChanges: DocumentViewChange[], mutatedKeys: DocumentKeySet, fromCache: boolean, syncStateChanged: boolean, excludesMetadataChanges: boolean);
    /** Returns a view snapshot as if all documents in the snapshot were added. */
    static fromInitialDocuments(query: Query, documents: DocumentSet, mutatedKeys: DocumentKeySet, fromCache: boolean): ViewSnapshot;
    get hasPendingWrites(): boolean;
    isEqual(other: ViewSnapshot): boolean;
}
