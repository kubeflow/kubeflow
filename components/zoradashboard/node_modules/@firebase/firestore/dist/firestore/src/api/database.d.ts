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
import { FirebaseApp } from '@firebase/app-types';
import { FirebaseService } from '@firebase/app-types/private';
import { CollectionReference as PublicCollectionReference, DocumentChange as PublicDocumentChange, DocumentChangeType as PublicDocumentChangeType, DocumentData, DocumentData as PublicDocumentData, DocumentReference as PublicDocumentReference, DocumentSnapshot as PublicDocumentSnapshot, FieldPath as PublicFieldPath, FirebaseFirestore as PublicFirestore, FirestoreDataConverter as PublicFirestoreDataConverter, GetOptions as PublicGetOptions, LogLevel as PublicLogLevel, OrderByDirection as PublicOrderByDirection, PersistenceSettings as PublicPersistenceSettings, Query as PublicQuery, QueryDocumentSnapshot as PublicQueryDocumentSnapshot, QuerySnapshot as PublicQuerySnapshot, SetOptions as PublicSetOptions, Settings as PublicSettings, SnapshotListenOptions as PublicSnapshotListenOptions, SnapshotOptions as PublicSnapshotOptions, Transaction as PublicTransaction, UpdateData as PublicUpdateData, WhereFilterOp as PublicWhereFilterOp, WriteBatch as PublicWriteBatch } from '@firebase/firestore-types';
import { Compat, EmulatorMockTokenOptions } from '@firebase/util';
import { LoadBundleTask, FirebaseFirestore as ExpFirebaseFirestore, Query as ExpQuery, CollectionReference as ExpCollectionReference, DocumentReference as ExpDocumentReference, Unsubscribe, DocumentChange as ExpDocumentChange, DocumentSnapshot as ExpDocumentSnapshot, QuerySnapshot as ExpQuerySnapshot, SnapshotMetadata, Transaction as ExpTransaction, WriteBatch as ExpWriteBatch, AbstractUserDataWriter } from '../../exp/index';
import { DatabaseId } from '../core/database_info';
import { UntypedFirestoreDataConverter } from '../lite/user_data_reader';
import { DocumentKey } from '../model/document_key';
import { FieldPath, ResourcePath } from '../model/path';
import { ByteString } from '../util/byte_string';
import { Blob } from './blob';
import { CompleteFn, ErrorFn, NextFn, PartialObserver } from './observer';
/**
 * A persistence provider for either memory-only or IndexedDB persistence.
 * Mainly used to allow optional inclusion of IndexedDB code.
 */
export interface PersistenceProvider {
    enableIndexedDbPersistence(firestore: Firestore, forceOwnership: boolean): Promise<void>;
    enableMultiTabIndexedDbPersistence(firestore: Firestore): Promise<void>;
    clearIndexedDbPersistence(firestore: Firestore): Promise<void>;
}
/**
 * The persistence provider included with the memory-only SDK. This provider
 * errors for all attempts to access persistence.
 */
export declare class MemoryPersistenceProvider implements PersistenceProvider {
    enableIndexedDbPersistence(firestore: Firestore, forceOwnership: boolean): Promise<void>;
    enableMultiTabIndexedDbPersistence(firestore: Firestore): Promise<void>;
    clearIndexedDbPersistence(firestore: Firestore): Promise<void>;
}
/**
 * The persistence provider included with the full Firestore SDK.
 */
export declare class IndexedDbPersistenceProvider implements PersistenceProvider {
    enableIndexedDbPersistence(firestore: Firestore, forceOwnership: boolean): Promise<void>;
    enableMultiTabIndexedDbPersistence(firestore: Firestore): Promise<void>;
    clearIndexedDbPersistence(firestore: Firestore): Promise<void>;
}
/**
 * Compat class for Firestore. Exposes Firestore Legacy API, but delegates
 * to the functional API of firestore-exp.
 */
export declare class Firestore implements PublicFirestore, FirebaseService, Compat<ExpFirebaseFirestore> {
    readonly _delegate: ExpFirebaseFirestore;
    private _persistenceProvider;
    _appCompat?: FirebaseApp;
    constructor(databaseIdOrApp: DatabaseId | FirebaseApp, _delegate: ExpFirebaseFirestore, _persistenceProvider: PersistenceProvider);
    get _databaseId(): DatabaseId;
    settings(settingsLiteral: PublicSettings): void;
    useEmulator(host: string, port: number, options?: {
        mockUserToken?: EmulatorMockTokenOptions;
    }): void;
    enableNetwork(): Promise<void>;
    disableNetwork(): Promise<void>;
    enablePersistence(settings?: PublicPersistenceSettings): Promise<void>;
    clearPersistence(): Promise<void>;
    terminate(): Promise<void>;
    waitForPendingWrites(): Promise<void>;
    onSnapshotsInSync(observer: PartialObserver<void>): Unsubscribe;
    onSnapshotsInSync(onSync: () => void): Unsubscribe;
    get app(): FirebaseApp;
    INTERNAL: {
        delete: () => Promise<void>;
    };
    collection(pathString: string): PublicCollectionReference;
    doc(pathString: string): PublicDocumentReference;
    collectionGroup(collectionId: string): PublicQuery;
    runTransaction<T>(updateFunction: (transaction: PublicTransaction) => Promise<T>): Promise<T>;
    batch(): PublicWriteBatch;
    loadBundle(bundleData: ArrayBuffer | ReadableStream<ArrayBuffer> | string): LoadBundleTask;
    namedQuery(name: string): Promise<PublicQuery<DocumentData> | null>;
}
export declare class UserDataWriter extends AbstractUserDataWriter {
    protected firestore: Firestore;
    constructor(firestore: Firestore);
    protected convertBytes(bytes: ByteString): Blob;
    protected convertReference(name: string): DocumentReference;
}
export declare function setLogLevel(level: PublicLogLevel): void;
/**
 * A reference to a transaction.
 */
export declare class Transaction implements PublicTransaction, Compat<ExpTransaction> {
    private readonly _firestore;
    readonly _delegate: ExpTransaction;
    private _userDataWriter;
    constructor(_firestore: Firestore, _delegate: ExpTransaction);
    get<T>(documentRef: PublicDocumentReference<T>): Promise<PublicDocumentSnapshot<T>>;
    set<T>(documentRef: DocumentReference<T>, data: Partial<T>, options: PublicSetOptions): Transaction;
    set<T>(documentRef: DocumentReference<T>, data: T): Transaction;
    update(documentRef: PublicDocumentReference<unknown>, data: PublicUpdateData): Transaction;
    update(documentRef: PublicDocumentReference<unknown>, field: string | PublicFieldPath, value: unknown, ...moreFieldsAndValues: unknown[]): Transaction;
    delete(documentRef: PublicDocumentReference<unknown>): Transaction;
}
export declare class WriteBatch implements PublicWriteBatch, Compat<ExpWriteBatch> {
    readonly _delegate: ExpWriteBatch;
    constructor(_delegate: ExpWriteBatch);
    set<T>(documentRef: DocumentReference<T>, data: Partial<T>, options: PublicSetOptions): WriteBatch;
    set<T>(documentRef: DocumentReference<T>, data: T): WriteBatch;
    update(documentRef: PublicDocumentReference<unknown>, data: PublicUpdateData): WriteBatch;
    update(documentRef: PublicDocumentReference<unknown>, field: string | PublicFieldPath, value: unknown, ...moreFieldsAndValues: unknown[]): WriteBatch;
    delete(documentRef: PublicDocumentReference<unknown>): WriteBatch;
    commit(): Promise<void>;
}
/**
 * A reference to a particular document in a collection in the database.
 */
export declare class DocumentReference<T = PublicDocumentData> implements PublicDocumentReference<T>, Compat<ExpDocumentReference<T>> {
    readonly firestore: Firestore;
    readonly _delegate: ExpDocumentReference<T>;
    private _userDataWriter;
    constructor(firestore: Firestore, _delegate: ExpDocumentReference<T>);
    static forPath<U>(path: ResourcePath, firestore: Firestore, converter: UntypedFirestoreDataConverter<U> | null): DocumentReference<U>;
    static forKey<U>(key: DocumentKey, firestore: Firestore, converter: UntypedFirestoreDataConverter<U> | null): DocumentReference<U>;
    get id(): string;
    get parent(): PublicCollectionReference<T>;
    get path(): string;
    collection(pathString: string): PublicCollectionReference<PublicDocumentData>;
    isEqual(other: PublicDocumentReference<T>): boolean;
    set(value: Partial<T>, options: PublicSetOptions): Promise<void>;
    set(value: T): Promise<void>;
    update(value: PublicUpdateData): Promise<void>;
    update(field: string | PublicFieldPath, value: unknown, ...moreFieldsAndValues: unknown[]): Promise<void>;
    delete(): Promise<void>;
    onSnapshot(observer: PartialObserver<PublicDocumentSnapshot<T>>): Unsubscribe;
    onSnapshot(options: PublicSnapshotListenOptions, observer: PartialObserver<PublicDocumentSnapshot<T>>): Unsubscribe;
    onSnapshot(onNext: NextFn<PublicDocumentSnapshot<T>>, onError?: ErrorFn, onCompletion?: CompleteFn): Unsubscribe;
    onSnapshot(options: PublicSnapshotListenOptions, onNext: NextFn<PublicDocumentSnapshot<T>>, onError?: ErrorFn, onCompletion?: CompleteFn): Unsubscribe;
    get(options?: PublicGetOptions): Promise<PublicDocumentSnapshot<T>>;
    withConverter(converter: null): PublicDocumentReference<PublicDocumentData>;
    withConverter<U>(converter: PublicFirestoreDataConverter<U>): PublicDocumentReference<U>;
}
/**
 * Iterates the list of arguments from an `onSnapshot` call and returns the
 * first argument that may be an `SnapshotListenOptions` object. Returns an
 * empty object if none is found.
 */
export declare function extractSnapshotOptions(args: unknown[]): PublicSnapshotListenOptions;
/**
 * Creates an observer that can be passed to the firestore-exp SDK. The
 * observer converts all observed values into the format expected by the classic
 * SDK.
 *
 * @param args - The list of arguments from an `onSnapshot` call.
 * @param wrapper - The function that converts the firestore-exp type into the
 * type used by this shim.
 */
export declare function wrapObserver<CompatType, ExpType>(args: unknown[], wrapper: (val: ExpType) => CompatType): PartialObserver<ExpType>;
/**
 * Options interface that can be provided to configure the deserialization of
 * DocumentSnapshots.
 */
export interface SnapshotOptions extends PublicSnapshotOptions {
}
export declare class DocumentSnapshot<T = PublicDocumentData> implements PublicDocumentSnapshot<T>, Compat<ExpDocumentSnapshot<T>> {
    private readonly _firestore;
    readonly _delegate: ExpDocumentSnapshot<T>;
    constructor(_firestore: Firestore, _delegate: ExpDocumentSnapshot<T>);
    get ref(): DocumentReference<T>;
    get id(): string;
    get metadata(): SnapshotMetadata;
    get exists(): boolean;
    data(options?: PublicSnapshotOptions): T | undefined;
    get(fieldPath: string | PublicFieldPath, options?: PublicSnapshotOptions): any;
    isEqual(other: DocumentSnapshot<T>): boolean;
}
export declare class QueryDocumentSnapshot<T = PublicDocumentData> extends DocumentSnapshot<T> implements PublicQueryDocumentSnapshot<T> {
    data(options?: PublicSnapshotOptions): T;
}
export declare class Query<T = PublicDocumentData> implements PublicQuery<T>, Compat<ExpQuery<T>> {
    readonly firestore: Firestore;
    readonly _delegate: ExpQuery<T>;
    private readonly _userDataWriter;
    constructor(firestore: Firestore, _delegate: ExpQuery<T>);
    where(fieldPath: string | FieldPath, opStr: PublicWhereFilterOp, value: unknown): Query<T>;
    orderBy(fieldPath: string | FieldPath, directionStr?: PublicOrderByDirection): Query<T>;
    limit(n: number): Query<T>;
    limitToLast(n: number): Query<T>;
    startAt(...args: any[]): Query<T>;
    startAfter(...args: any[]): Query<T>;
    endBefore(...args: any[]): Query<T>;
    endAt(...args: any[]): Query<T>;
    isEqual(other: PublicQuery<T>): boolean;
    get(options?: PublicGetOptions): Promise<QuerySnapshot<T>>;
    onSnapshot(observer: PartialObserver<PublicQuerySnapshot<T>>): Unsubscribe;
    onSnapshot(options: PublicSnapshotListenOptions, observer: PartialObserver<PublicQuerySnapshot<T>>): Unsubscribe;
    onSnapshot(onNext: NextFn<PublicQuerySnapshot<T>>, onError?: ErrorFn, onCompletion?: CompleteFn): Unsubscribe;
    onSnapshot(options: PublicSnapshotListenOptions, onNext: NextFn<PublicQuerySnapshot<T>>, onError?: ErrorFn, onCompletion?: CompleteFn): Unsubscribe;
    withConverter(converter: null): Query<PublicDocumentData>;
    withConverter<U>(converter: PublicFirestoreDataConverter<U>): Query<U>;
}
export declare class DocumentChange<T = PublicDocumentData> implements PublicDocumentChange<T>, Compat<ExpDocumentChange<T>> {
    private readonly _firestore;
    readonly _delegate: ExpDocumentChange<T>;
    constructor(_firestore: Firestore, _delegate: ExpDocumentChange<T>);
    get type(): PublicDocumentChangeType;
    get doc(): QueryDocumentSnapshot<T>;
    get oldIndex(): number;
    get newIndex(): number;
}
export declare class QuerySnapshot<T = PublicDocumentData> implements PublicQuerySnapshot<T>, Compat<ExpQuerySnapshot<T>> {
    readonly _firestore: Firestore;
    readonly _delegate: ExpQuerySnapshot<T>;
    constructor(_firestore: Firestore, _delegate: ExpQuerySnapshot<T>);
    get query(): Query<T>;
    get metadata(): SnapshotMetadata;
    get size(): number;
    get empty(): boolean;
    get docs(): Array<QueryDocumentSnapshot<T>>;
    docChanges(options?: PublicSnapshotListenOptions): Array<PublicDocumentChange<T>>;
    forEach(callback: (result: QueryDocumentSnapshot<T>) => void, thisArg?: unknown): void;
    isEqual(other: QuerySnapshot<T>): boolean;
}
export declare class CollectionReference<T = PublicDocumentData> extends Query<T> implements PublicCollectionReference<T> {
    readonly firestore: Firestore;
    readonly _delegate: ExpCollectionReference<T>;
    constructor(firestore: Firestore, _delegate: ExpCollectionReference<T>);
    get id(): string;
    get path(): string;
    get parent(): DocumentReference<PublicDocumentData> | null;
    doc(documentPath?: string): DocumentReference<T>;
    add(data: T): Promise<DocumentReference<T>>;
    isEqual(other: CollectionReference<T>): boolean;
    withConverter(converter: null): CollectionReference<PublicDocumentData>;
    withConverter<U>(converter: PublicFirestoreDataConverter<U>): CollectionReference<U>;
}
