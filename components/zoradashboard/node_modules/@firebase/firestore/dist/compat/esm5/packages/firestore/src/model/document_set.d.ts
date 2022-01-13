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
import { Document } from './document';
import { DocumentComparator } from './document_comparator';
import { DocumentKey } from './document_key';
/**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */
export declare class DocumentSet {
    /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */
    static emptySet(oldSet: DocumentSet): DocumentSet;
    private comparator;
    private keyedMap;
    private sortedSet;
    /** The default ordering is by key if the comparator is omitted */
    constructor(comp?: DocumentComparator);
    has(key: DocumentKey): boolean;
    get(key: DocumentKey): Document | null;
    first(): Document | null;
    last(): Document | null;
    isEmpty(): boolean;
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    indexOf(key: DocumentKey): number;
    get size(): number;
    /** Iterates documents in order defined by "comparator" */
    forEach(cb: (doc: Document) => void): void;
    /** Inserts or updates a document with the same key */
    add(doc: Document): DocumentSet;
    /** Deletes a document with a given key */
    delete(key: DocumentKey): DocumentSet;
    isEqual(other: DocumentSet | null | undefined): boolean;
    toString(): string;
    private copy;
}
