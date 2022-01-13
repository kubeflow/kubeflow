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
import { BatchId, TargetId } from '../core/types';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
/**
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */
export declare class ReferenceSet {
    private refsByKey;
    private refsByTarget;
    /** Returns true if the reference set contains no references. */
    isEmpty(): boolean;
    /** Adds a reference to the given document key for the given ID. */
    addReference(key: DocumentKey, id: TargetId | BatchId): void;
    /** Add references to the given document keys for the given ID. */
    addReferences(keys: DocumentKeySet, id: TargetId | BatchId): void;
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    removeReference(key: DocumentKey, id: TargetId | BatchId): void;
    removeReferences(keys: DocumentKeySet, id: TargetId | BatchId): void;
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    removeReferencesForId(id: TargetId | BatchId): DocumentKey[];
    removeAllReferences(): void;
    private removeRef;
    referencesForId(id: TargetId | BatchId): DocumentKeySet;
    containsKey(key: DocumentKey): boolean;
}
export declare class DocReference {
    key: DocumentKey;
    targetOrBatchId: TargetId | BatchId;
    constructor(key: DocumentKey, targetOrBatchId: TargetId | BatchId);
    /** Compare by key then by ID */
    static compareByKey(left: DocReference, right: DocReference): number;
    /** Compare by ID then by key */
    static compareByTargetId(left: DocReference, right: DocReference): number;
}
