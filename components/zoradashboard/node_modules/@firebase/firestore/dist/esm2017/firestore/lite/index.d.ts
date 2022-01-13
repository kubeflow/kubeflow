/**
 * Firestore Lite
 *
 * @remarks Firestore Lite is a small online-only SDK that allows read
 * and write access to your Firestore database. All operations connect
 * directly to the backend, and `onSnapshot()` APIs are not supported.
 * @packageDocumentation
 */
export { Settings } from '../src/lite/settings';
export { FirebaseFirestore, initializeFirestore, getFirestore, terminate, useFirestoreEmulator } from '../src/lite/database';
export { SetOptions, DocumentData, UpdateData, DocumentReference, Query, CollectionReference, collection, collectionGroup, doc, refEqual, queryEqual } from '../src/lite/reference';
export { endAt, endBefore, startAt, startAfter, limit, limitToLast, orderBy, OrderByDirection, where, WhereFilterOp, query, QueryConstraint, QueryConstraintType } from '../src/lite/query';
export { addDoc, deleteDoc, updateDoc, setDoc, getDoc, getDocs } from '../src/lite/reference_impl';
export { FieldPath, documentId } from '../src/lite/field_path';
export { FieldValue } from '../src/lite/field_value';
export { increment, arrayRemove, arrayUnion, serverTimestamp, deleteField } from '../src/lite/field_value_impl';
export { FirestoreDataConverter, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, snapshotEqual } from '../src/lite/snapshot';
export { WriteBatch, writeBatch } from '../src/lite/write_batch';
export { Transaction, runTransaction } from '../src/lite/transaction';
export { setLogLevel, LogLevelString as LogLevel } from '../src/util/log';
export { Bytes } from '../src/lite/bytes';
export { GeoPoint } from '../src/lite/geo_point';
export { Timestamp } from '../src/lite/timestamp';
export { FirestoreErrorCode, FirestoreError } from '../src/util/error';
