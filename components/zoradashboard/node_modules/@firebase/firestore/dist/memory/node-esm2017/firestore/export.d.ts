/**
 * @license
 * Copyright 2020 Google LLC
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
import { Firestore, Query } from './src/api/database';
import { LoadBundleTask } from './src/exp/bundle';
export { Blob } from './src/api/blob';
export { CollectionReference, DocumentReference, DocumentSnapshot, Firestore, Query, QueryDocumentSnapshot, QuerySnapshot, IndexedDbPersistenceProvider, MemoryPersistenceProvider, Transaction, WriteBatch, setLogLevel } from './src/api/database';
export { CACHE_SIZE_UNLIMITED } from './src/exp/database';
export { GeoPoint } from './src/api/geo_point';
export { FieldPath } from './src/api/field_path';
export { FieldValue } from './src/api/field_value';
export { Timestamp } from './src/api/timestamp';
export { FirebaseFirestore as ExpFirebaseFirestore } from './src/exp/database';
export declare function loadBundle(this: Firestore, data: ArrayBuffer | ReadableStream<Uint8Array> | string): LoadBundleTask;
export declare function namedQuery(this: Firestore, queryName: string): Promise<Query | null>;
