/**
 * @license
 * Copyright 2021 Google LLC
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
export { FieldPath, documentId } from '../src/exp/field_path';
export { FirebaseFirestore, initializeFirestore, getFirestore, enableIndexedDbPersistence, enableMultiTabIndexedDbPersistence, clearIndexedDbPersistence, waitForPendingWrites, disableNetwork, enableNetwork, terminate, useFirestoreEmulator, loadBundle, namedQuery, ensureFirestoreConfigured } from '../src/exp/database';
export { LoadBundleTask, LoadBundleTaskProgress, TaskState } from '../src/exp/bundle';
export { Settings, PersistenceSettings } from '../src/exp/settings';
export { DocumentChange, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, snapshotEqual, SnapshotOptions, FirestoreDataConverter, DocumentChangeType, SnapshotMetadata } from '../src/exp/snapshot';
export { DocumentReference, CollectionReference, Query, doc, collection, collectionGroup, SetOptions, DocumentData, UpdateData, refEqual, queryEqual } from '../src/exp/reference';
export { endAt, endBefore, startAt, startAfter, limit, limitToLast, where, orderBy, query, QueryConstraint, QueryConstraintType, OrderByDirection, WhereFilterOp } from '../src/exp/query';
export { Unsubscribe, SnapshotListenOptions } from '../src/exp/reference_impl';
export { runTransaction, Transaction } from '../src/exp/transaction';
export { getDoc, getDocFromCache, getDocFromServer, getDocs, getDocsFromCache, getDocsFromServer, onSnapshot, onSnapshotsInSync, setDoc, updateDoc, deleteDoc, addDoc, executeWrite } from '../src/exp/reference_impl';
export { FieldValue } from '../src/exp/field_value';
export { increment, arrayRemove, arrayUnion, serverTimestamp, deleteField } from '../src/exp/field_value_impl';
export { setLogLevel, LogLevelString as LogLevel } from '../src/util/log';
export { Bytes } from '../src/exp/bytes';
export { WriteBatch, writeBatch } from '../src/exp/write_batch';
export { GeoPoint } from '../src/exp/geo_point';
export { Timestamp } from '../src/exp/timestamp';
export { CACHE_SIZE_UNLIMITED } from '../src/exp/database';
export { FirestoreErrorCode, FirestoreError } from '../src/util/error';
export { AbstractUserDataWriter } from '../src/lite/user_data_writer';
