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
import { CollectionReference, DocumentReference, DocumentSnapshot, Firestore, Query, QuerySnapshot } from '../../src/api/database';
import { DocumentKeySet } from '../../src/model/collections';
import { JsonObject } from '../../src/model/object_value';
/**
 * A mock Firestore. Will not work for integration test.
 */
export declare const FIRESTORE: Firestore;
export declare function firestore(): Firestore;
export declare function newTestFirestore(projectId?: string): Firestore;
export declare function collectionReference(path: string): CollectionReference;
export declare function documentReference(path: string): DocumentReference;
export declare function documentSnapshot(path: string, data: JsonObject<unknown> | null, fromCache: boolean): DocumentSnapshot;
export declare function query(path: string): Query;
/**
 * A convenience method for creating a particular query snapshot for tests.
 *
 * @param path - To be used in constructing the query.
 * @param oldDocs - Provides the prior set of documents in the QuerySnapshot.
 * Each entry maps to a document, with the key being the document id, and the
 * value being the document contents.
 * @param docsToAdd - Specifies data to be added into the query snapshot as of
 * now. Each entry maps to a document, with the key being the document id, and
 * the value being the document contents.
 * @param mutatedKeys - The list of document with pending writes.
 * @param fromCache - Whether the query snapshot is cache result.
 * @param syncStateChanged - Whether the sync state has changed.
 * @returns A query snapshot that consists of both sets of documents.
 */
export declare function querySnapshot(path: string, oldDocs: {
    [key: string]: JsonObject<unknown>;
}, docsToAdd: {
    [key: string]: JsonObject<unknown>;
}, mutatedKeys: DocumentKeySet, fromCache: boolean, syncStateChanged: boolean): QuerySnapshot;
