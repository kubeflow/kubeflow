/**
 * Firestore Lite
 *
 * @remarks Firestore Lite is a small online-only SDK that allows read
 * and write access to your Firestore database. All operations connect
 * directly to the backend, and `onSnapshot()` APIs are not supported.
 * @packageDocumentation
 */

import { DocumentData as DocumentData_2 } from '@firebase/firestore-types';
import { EmulatorMockTokenOptions } from '@firebase/util';
import { FirebaseApp } from '@firebase/app-exp';
import { FirebaseAuthInternalName } from '@firebase/auth-interop-types';
import { _FirebaseService } from '@firebase/app-exp';
import { LogLevelString as LogLevel } from '@firebase/logger';
import { Provider } from '@firebase/component';
import { SetOptions as SetOptions_2 } from '@firebase/firestore-types';

/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */
declare abstract class AbstractUserDataWriter {
    convertValue(value: Value, serverTimestampBehavior?: ServerTimestampBehavior): unknown;
    private convertObject;
    private convertGeoPoint;
    private convertArray;
    private convertServerTimestamp;
    private convertTimestamp;
    protected convertDocumentKey(name: string, expectedDatabaseId: DatabaseId): DocumentKey;
    protected abstract convertReference(name: string): unknown;
    protected abstract convertBytes(bytes: ByteString): unknown;
}

/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * The result of this write will only be reflected in document reads that occur
 * after the returned Promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A Promise resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend.
 */
export declare function addDoc<T>(reference: CollectionReference<T>, data: T): Promise<DocumentReference<T>>;

declare interface ApiClientObjectMap<T> {
    [k: string]: T;
}

/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */
export declare function arrayRemove(...elements: unknown[]): FieldValue;

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */
export declare function arrayUnion(...elements: unknown[]): FieldValue;

declare interface AsyncQueue {
    readonly isShuttingDown: boolean;
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    enqueueAndForget<T extends unknown>(op: () => Promise<T>): void;
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue without waiting for it to complete (i.e. we ignore the Promise result).
     */
    enqueueAndForgetEvenWhileRestricted<T extends unknown>(op: () => Promise<T>): void;
    /**
     * Initialize the shutdown of this queue. Once this method is called, the
     * only possible way to request running an operation is through
     * `enqueueEvenWhileRestricted()`.
     *
     * @param purgeExistingTasks Whether already enqueued tasked should be
     * rejected (unless enqueued wih `enqueueEvenWhileRestricted()`). Defaults
     * to false.
     */
    enterRestrictedMode(purgeExistingTasks?: boolean): void;
    /**
     * Adds a new operation to the queue. Returns a promise that will be resolved
     * when the promise returned by the new operation is (with its value).
     */
    enqueue<T extends unknown>(op: () => Promise<T>): Promise<T>;
    /**
     * Enqueue a retryable operation.
     *
     * A retryable operation is rescheduled with backoff if it fails with a
     * IndexedDbTransactionError (the error type used by SimpleDb). All
     * retryable operations are executed in order and only run if all prior
     * operations were retried successfully.
     */
    enqueueRetryable(op: () => Promise<void>): void;
    /**
     * Schedules an operation to be queued on the AsyncQueue once the specified
     * `delayMs` has elapsed. The returned DelayedOperation can be used to cancel
     * or fast-forward the operation prior to its running.
     */
    enqueueAfterDelay<T extends unknown>(timerId: TimerId, delayMs: number, op: () => Promise<T>): DelayedOperation<T>;
    /**
     * Verifies there's an operation currently in-progress on the AsyncQueue.
     * Unfortunately we can't verify that the running code is in the promise chain
     * of that operation, so this isn't a foolproof check, but it should be enough
     * to catch some bugs.
     */
    verifyOperationInProgress(): void;
}

/**
 * Path represents an ordered sequence of string segments.
 */
declare abstract class BasePath<B extends BasePath<B>> {
    private segments;
    private offset;
    private len;
    constructor(segments: string[], offset?: number, length?: number);
    /**
     * Abstract constructor method to construct an instance of B with the given
     * parameters.
     */
    protected abstract construct(segments: string[], offset?: number, length?: number): B;
    /**
     * Returns a String representation.
     *
     * Implementing classes are required to provide deterministic implementations as
     * the String representation is used to obtain canonical Query IDs.
     */
    abstract toString(): string;
    get length(): number;
    isEqual(other: B): boolean;
    child(nameOrPath: string | B): B;
    /** The index of one past the last segment of the path. */
    private limit;
    popFirst(size?: number): B;
    popLast(): B;
    firstSegment(): string;
    lastSegment(): string;
    get(index: number): string;
    isEmpty(): boolean;
    isPrefixOf(other: this): boolean;
    isImmediateParentOf(potentialChild: this): boolean;
    forEach(fn: (segment: string) => void): void;
    toArray(): string[];
    static comparator<T extends BasePath<T>>(p1: BasePath<T>, p2: BasePath<T>): number;
}

/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */
declare class Bound {
    readonly position: Value[];
    readonly before: boolean;
    constructor(position: Value[], before: boolean);
}

/**
 * An immutable object representing an array of bytes.
 */
export declare class Bytes {
    _byteString: ByteString;
    /** @hideconstructor */
    constructor(byteString: ByteString);
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */
    static fromBase64String(base64: string): Bytes;
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    static fromUint8Array(array: Uint8Array): Bytes;
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    toBase64(): string;
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */
    toUint8Array(): Uint8Array;
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */
    toString(): string;
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */
    isEqual(other: Bytes): boolean;
}

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
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 */
declare class ByteString {
    private readonly binaryString;
    static readonly EMPTY_BYTE_STRING: ByteString;
    private constructor();
    static fromBase64String(base64: string): ByteString;
    static fromUint8Array(array: Uint8Array): ByteString;
    toBase64(): string;
    toUint8Array(): Uint8Array;
    approximateByteSize(): number;
    compareTo(other: ByteString): number;
    isEqual(other: ByteString): boolean;
}

/**
 * Gets a `CollectionReference` instance that refers to the collection at
 * the specified absolute path.
 *
 * @param firestore - A reference to the root Firestore instance.
 * @param path - A slash-separated path to a collection.
 * @param pathSegments - Additional path segments to apply relative to the first
 * argument.
 * @throws If the final path has an even number of segments and does not point
 * to a collection.
 * @returns The `CollectionReference` instance.
 */
export declare function collection(firestore: FirebaseFirestore, path: string, ...pathSegments: string[]): CollectionReference<DocumentData>;

/**
 * Gets a `CollectionReference` instance that refers to a subcollection of
 * `reference` at the the specified relative path.
 *
 * @param reference - A reference to a collection.
 * @param path - A slash-separated path to a collection.
 * @param pathSegments - Additional path segments to apply relative to the first
 * argument.
 * @throws If the final path has an even number of segments and does not point
 * to a collection.
 * @returns The `CollectionReference` instance.
 */
export declare function collection(reference: CollectionReference<unknown>, path: string, ...pathSegments: string[]): CollectionReference<DocumentData>;

/**
 * Gets a `CollectionReference` instance that refers to a subcollection of
 * `reference` at the the specified relative path.
 *
 * @param reference - A reference to a Firestore document.
 * @param path - A slash-separated path to a collection.
 * @param pathSegments - Additional path segments that will be applied relative
 * to the first argument.
 * @throws If the final path has an even number of segments and does not point
 * to a collection.
 * @returns The `CollectionReference` instance.
 */
export declare function collection(reference: DocumentReference, path: string, ...pathSegments: string[]): CollectionReference<DocumentData>;

/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root Firestore instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */
export declare function collectionGroup(firestore: FirebaseFirestore, collectionId: string): Query<DocumentData>;

/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */
export declare class CollectionReference<T = DocumentData> extends Query<T> {
    readonly _path: ResourcePath;
    /** The type of this Firestore reference. */
    readonly type = "collection";
    /** @hideconstructor */
    constructor(firestore: FirebaseFirestore, converter: FirestoreDataConverter<T> | null, _path: ResourcePath);
    /** The collection's identifier. */
    get id(): string;
    /**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */
    get path(): string;
    /**
     * A reference to the containing `DocumentReference` if this is a
     * subcollection. If this isn't a subcollection, the reference is null.
     */
    get parent(): DocumentReference<DocumentData> | null;
    /**
     * Applies a custom data converter to this CollectionReference, allowing you
     * to use your own custom model objects with Firestore. When you call {@link
     * addDoc} with the returned `CollectionReference` instance, the provided
     * converter will convert between Firestore data and your custom type `U`.
     *
     * @param converter - Converts objects to and from Firestore.
     * @returns A `CollectionReference<U>` that uses the provided converter.
     */
    withConverter<U>(converter: FirestoreDataConverter<U>): CollectionReference<U>;
    /**
     * Removes the current converter.
     *
     * @param converter - `null` removes the current converter.
     * @returns A `CollectionReference<DocumentData>` that does not use a
     * converter.
     */
    withConverter(converter: null): CollectionReference<DocumentData>;
}

declare type CompositeFilterOp = 'OPERATOR_UNSPECIFIED' | 'AND';

/**
 * A Listener for credential change events. The listener should fetch a new
 * token and may need to invalidate other state if the current user has also
 * changed.
 */
declare type CredentialChangeListener = (user: User) => Promise<void>;

/**
 * Provides methods for getting the uid and token for the current user and
 * listening for changes.
 */
declare interface CredentialsProvider {
    /** Requests a token for the current user. */
    getToken(): Promise<Token | null>;
    /**
     * Marks the last retrieved token as invalid, making the next GetToken request
     * force-refresh the token.
     */
    invalidateToken(): void;
    /**
     * Specifies a listener to be notified of credential changes
     * (sign-in / sign-out, token changes). It is immediately called once with the
     * initial user.
     *
     * The change listener is invoked on the provided AsyncQueue.
     */
    setChangeListener(asyncQueue: AsyncQueue, changeListener: CredentialChangeListener): void;
    /** Removes the previously-set change listener. */
    removeChangeListener(): void;
}

/** Settings for private credentials */
declare type CredentialsSettings = FirstPartyCredentialsSettings | ProviderCredentialsSettings;

/** Represents the database ID a Firestore client is associated with. */
declare class DatabaseId {
    readonly projectId: string;
    readonly database: string;
    constructor(projectId: string, database?: string);
    get isDefaultDatabase(): boolean;
    isEqual(other: {}): boolean;
}

/**
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */
declare abstract class Datastore {
    abstract terminate(): void;
}

/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */
declare class DelayedOperation<T extends unknown> implements PromiseLike<T> {
    private readonly asyncQueue;
    readonly timerId: TimerId;
    readonly targetTimeMs: number;
    private readonly op;
    private readonly removalCallback;
    private timerHandle;
    private readonly deferred;
    private constructor();
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */
    static createAndSchedule<R extends unknown>(asyncQueue: AsyncQueue, timerId: TimerId, delayMs: number, op: () => Promise<R>, removalCallback: (op: DelayedOperation<R>) => void): DelayedOperation<R>;
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    private start;
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    skipDelay(): void;
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    cancel(reason?: string): void;
    then: <TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
    private handleDelayElapsed;
    private clearTimeout;
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * The deletion will only be reflected in document reads that occur after the
 * returned Promise resolves. If the client is offline, the
 * delete fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend.
 */
export declare function deleteDoc(reference: DocumentReference<unknown>): Promise<void>;

/**
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */
export declare function deleteField(): FieldValue;

/**
 * The direction of sorting in an order by.
 */
declare const enum Direction {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

/**
 * Gets a `DocumentReference` instance that refers to the document at the
 * specified abosulute path.
 *
 * @param firestore - A reference to the root Firestore instance.
 * @param path - A slash-separated path to a document.
 * @param pathSegments - Additional path segments that will be applied relative
 * to the first argument.
 * @throws If the final path has an odd number of segments and does not point to
 * a document.
 * @returns The `DocumentReference` instance.
 */
export declare function doc(firestore: FirebaseFirestore, path: string, ...pathSegments: string[]): DocumentReference<DocumentData>;

/**
 * Gets a `DocumentReference` instance that refers to a document within
 * `reference` at the specified relative path. If no path is specified, an
 * automatically-generated unique ID will be used for the returned
 * `DocumentReference`.
 *
 * @param reference - A reference to a collection.
 * @param path - A slash-separated path to a document. Has to be omitted to use
 * auto-genrated IDs.
 * @param pathSegments - Additional path segments that will be applied relative
 * to the first argument.
 * @throws If the final path has an odd number of segments and does not point to
 * a document.
 * @returns The `DocumentReference` instance.
 */
export declare function doc<T>(reference: CollectionReference<T>, path?: string, ...pathSegments: string[]): DocumentReference<T>;

/**
 * Gets a `DocumentReference` instance that refers to a document within
 * `reference` at the specified relative path.
 *
 * @param reference - A reference to a Firestore document.
 * @param path - A slash-separated path to a document.
 * @param pathSegments - Additional path segments that will be applied relative
 * to the first argument.
 * @throws If the final path has an odd number of segments and does not point to
 * a document.
 * @returns The `DocumentReference` instance.
 */
export declare function doc(reference: DocumentReference<unknown>, path: string, ...pathSegments: string[]): DocumentReference<DocumentData>;

/**
 * Represents a document in Firestore with a key, version, data and whether the
 * data has local mutations applied to it.
 */
declare interface Document_2 {
    /** The key for this document */
    readonly key: DocumentKey;
    /**
     * The version of this document if it exists or a version at which this
     * document was guaranteed to not exist.
     */
    readonly version: SnapshotVersion;
    /** The underlying data of this document or an empty value if no data exists. */
    readonly data: ObjectValue;
    /** Returns whether local mutations were applied via the mutation queue. */
    readonly hasLocalMutations: boolean;
    /** Returns whether mutations were applied based on a write acknowledgment. */
    readonly hasCommittedMutations: boolean;
    /**
     * Whether this document had a local mutation applied that has not yet been
     * acknowledged by Watch.
     */
    readonly hasPendingWrites: boolean;
    /**
     * Returns whether this document is valid (i.e. it is an entry in the
     * RemoteDocumentCache, was created by a mutation or read from the backend).
     */
    isValidDocument(): boolean;
    /**
     * Returns whether the document exists and its data is known at the current
     * version.
     */
    isFoundDocument(): boolean;
    /**
     * Returns whether the document is known to not exist at the current version.
     */
    isNoDocument(): boolean;
    /**
     * Returns whether the document exists and its data is unknown at the current
     * version.
     */
    isUnknownDocument(): boolean;
    isEqual(other: Document_2 | null | undefined): boolean;
    toString(): string;
}

/**
 * Document data (for use with {@link @firebase/firestore/lite#(setDoc:1)}) consists of fields mapped to
 * values.
 */
export declare interface DocumentData {
    /** A mapping between a field and its value. */
    [field: string]: any;
}

/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */
export declare function documentId(): FieldPath;

declare class DocumentKey {
    readonly path: ResourcePath;
    constructor(path: ResourcePath);
    static fromPath(path: string): DocumentKey;
    static fromName(name: string): DocumentKey;
    /** Returns true if the document is in the specified collectionId. */
    hasCollectionId(collectionId: string): boolean;
    isEqual(other: DocumentKey | null): boolean;
    toString(): string;
    static comparator(k1: DocumentKey, k2: DocumentKey): number;
    static isDocumentKey(path: ResourcePath): boolean;
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    static fromSegments(segments: string[]): DocumentKey;
}

/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */
export declare class DocumentReference<T = DocumentData> {
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    readonly converter: FirestoreDataConverter<T> | null;
    readonly _key: DocumentKey;
    /** The type of this Firestore reference. */
    readonly type = "document";
    /**
     * The {@link FirebaseFirestore} the document is in.
     * This is useful for performing transactions, for example.
     */
    readonly firestore: FirebaseFirestore;
    /** @hideconstructor */
    constructor(firestore: FirebaseFirestore, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    converter: FirestoreDataConverter<T> | null, _key: DocumentKey);
    get _path(): ResourcePath;
    /**
     * The document's identifier within its collection.
     */
    get id(): string;
    /**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */
    get path(): string;
    /**
     * The collection this `DocumentReference` belongs to.
     */
    get parent(): CollectionReference<T>;
    /**
     * Applies a custom data converter to this `DocumentReference`, allowing you
     * to use your own custom model objects with Firestore. When you call {@link
     * @firebase/firestore/lite#(setDoc:1)}, {@link @firebase/firestore/lite#getDoc}, etc. with the returned `DocumentReference`
     * instance, the provided converter will convert between Firestore data and
     * your custom type `U`.
     *
     * @param converter - Converts objects to and from Firestore.
     * @returns A `DocumentReference<U>` that uses the provided converter.
     */
    withConverter<U>(converter: FirestoreDataConverter<U>): DocumentReference<U>;
    /**
     * Removes the current converter.
     *
     * @param converter - `null` removes the current converter.
     * @returns A `DocumentReference<DocumentData>` that does not use a converter.
     */
    withConverter(converter: null): DocumentReference<DocumentData>;
}

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */
export declare class DocumentSnapshot<T = DocumentData> {
    _firestore: FirebaseFirestore;
    _userDataWriter: AbstractUserDataWriter;
    _key: DocumentKey;
    _document: Document_2 | null;
    _converter: UntypedFirestoreDataConverter<T> | null;
    /** @hideconstructor protected */
    constructor(_firestore: FirebaseFirestore, _userDataWriter: AbstractUserDataWriter, _key: DocumentKey, _document: Document_2 | null, _converter: UntypedFirestoreDataConverter<T> | null);
    /** Property of the `DocumentSnapshot` that provides the document's ID. */
    get id(): string;
    /**
     * The `DocumentReference` for the document included in the `DocumentSnapshot`.
     */
    get ref(): DocumentReference<T>;
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */
    exists(): this is QueryDocumentSnapshot<T>;
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */
    data(): T | undefined;
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    get(fieldPath: string | FieldPath): any;
}

/**
 * Creates a `QueryConstraint` that modifies the result set to end at the
 * provided document (inclusive). The end position is relative to the order of
 * the query. The document must contain all of the fields provided in the
 * orderBy of the query.
 *
 * @param snapshot - The snapshot of the document to end at.
 * @returns A `QueryConstraint` to pass to `query()`
 */
export declare function endAt(snapshot: DocumentSnapshot<unknown>): QueryConstraint;

/**
 * Creates a `QueryConstraint` that modifies the result set to end at the
 * provided fields relative to the order of the query. The order of the field
 * values must match the order of the order by clauses of the query.
 *
 * @param fieldValues - The field values to end this query at, in order
 * of the query's order by.
 * @returns A `QueryConstraint` to pass to `query()`
 */
export declare function endAt(...fieldValues: unknown[]): QueryConstraint;

/**
 * Creates a `QueryConstraint` that modifies the result set to end before the
 * provided document (exclusive). The end position is relative to the order of
 * the query. The document must contain all of the fields provided in the
 * orderBy of the query.
 *
 * @param snapshot - The snapshot of the document to end before.
 * @returns A `QueryConstraint` to pass to `query()`
 */
export declare function endBefore(snapshot: DocumentSnapshot<unknown>): QueryConstraint;

/**
 * Creates a `QueryConstraint` that modifies the result set to end before the
 * provided fields relative to the order of the query. The order of the field
 * values must match the order of the order by clauses of the query.
 *
 * @param fieldValues - The field values to end this query before, in order
 * of the query's order by.
 * @returns A `QueryConstraint` to pass to `query()`
 */
export declare function endBefore(...fieldValues: unknown[]): QueryConstraint;

declare type FieldFilterOp = 'OPERATOR_UNSPECIFIED' | 'LESS_THAN' | 'LESS_THAN_OR_EQUAL' | 'GREATER_THAN' | 'GREATER_THAN_OR_EQUAL' | 'EQUAL' | 'NOT_EQUAL' | 'ARRAY_CONTAINS' | 'IN' | 'ARRAY_CONTAINS_ANY' | 'NOT_IN';

/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */
declare class FieldMask {
    readonly fields: FieldPath_2[];
    constructor(fields: FieldPath_2[]);
    /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */
    covers(fieldPath: FieldPath_2): boolean;
    isEqual(other: FieldMask): boolean;
}

/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */
export declare class FieldPath {
    /** Internal representation of a Firestore field path. */
    readonly _internalPath: FieldPath_2;
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    constructor(...fieldNames: string[]);
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */
    isEqual(other: FieldPath): boolean;
}

/** A dot-separated path for navigating sub-objects within a document. */
declare class FieldPath_2 extends BasePath<FieldPath_2> {
    protected construct(segments: string[], offset?: number, length?: number): FieldPath_2;
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    private static isValidIdentifier;
    canonicalString(): string;
    toString(): string;
    /**
     * Returns true if this field references the key of a document.
     */
    isKeyField(): boolean;
    /**
     * The field designating the key of a document.
     */
    static keyField(): FieldPath_2;
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    static fromServerFormat(path: string): FieldPath_2;
    static emptyPath(): FieldPath_2;
}

/** A field path and the TransformOperation to perform upon it. */
declare class FieldTransform {
    readonly field: FieldPath_2;
    readonly transform: TransformOperation;
    constructor(field: FieldPath_2, transform: TransformOperation);
}

declare type FieldTransformSetToServerValue = 'SERVER_VALUE_UNSPECIFIED' | 'REQUEST_TIME';

/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */
export declare abstract class FieldValue {
    _methodName: string;
    /**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
    constructor(_methodName: string);
    /** Compares `FieldValue`s for equality. */
    abstract isEqual(other: FieldValue): boolean;
    abstract _toFieldTransform(context: ParseContext): FieldTransform | null;
}

declare abstract class Filter {
    abstract matches(doc: Document_2): boolean;
}

/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
export declare class FirebaseFirestore implements FirestoreService {
    type: 'firestore-lite' | 'firestore';
    readonly _databaseId: DatabaseId;
    readonly _persistenceKey: string;
    _credentials: CredentialsProvider;
    private _settings;
    private _settingsFrozen;
    private _terminateTask?;
    _app?: FirebaseApp;
    /** @hideconstructor */
    constructor(databaseIdOrApp: DatabaseId | FirebaseApp, authProvider: Provider<FirebaseAuthInternalName>);
    /**
     * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
     * instance.
     */
    get app(): FirebaseApp;
    get _initialized(): boolean;
    get _terminated(): boolean;
    _setSettings(settings: PrivateSettings): void;
    _getSettings(): FirestoreSettings;
    _freezeSettings(): FirestoreSettings;
    _delete(): Promise<void>;
    /** Returns a JSON-serializable representation of this Firestore instance. */
    toJSON(): object;
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    protected _terminate(): Promise<void>;
}

/**
 * Converter used by `withConverter()` to transform user objects of type `T`
 * into Firestore data.
 *
 * Using the converter allows you to specify generic type arguments when
 * storing and retrieving objects from Firestore.
 *
 * @example
 * ```typescript
 * class Post {
 *   constructor(readonly title: string, readonly author: string) {}
 *
 *   toString(): string {
 *     return this.title + ', by ' + this.author;
 *   }
 * }
 *
 * const postConverter = {
 *   toFirestore(post: Post): firebase.firestore.DocumentData {
 *     return {title: post.title, author: post.author};
 *   },
 *   fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): Post {
 *     const data = snapshot.data(options)!;
 *     return new Post(data.title, data.author);
 *   }
 * };
 *
 * const postSnap = await firebase.firestore()
 *   .collection('posts')
 *   .withConverter(postConverter)
 *   .doc().get();
 * const post = postSnap.data();
 * if (post !== undefined) {
 *   post.title; // string
 *   post.toString(); // Should be defined
 *   post.someNonExistentProperty; // TS error
 * }
 * ```
 */
export declare interface FirestoreDataConverter<T> {
    /**
     * Called by the Firestore SDK to convert a custom model object of type `T`
     * into a plain Javascript object (suitable for writing directly to the
     * Firestore database). Used with {@link @firebase/firestore/lite#(setDoc:1)}, {@link @firebase/firestore/lite#(WriteBatch.set:1)}
     * and {@link @firebase/firestore/lite#(Transaction.set:1)}.
     */
    toFirestore(modelObject: T): DocumentData;
    /**
     * Called by the Firestore SDK to convert a custom model object of type `T`
     * into a plain Javascript object (suitable for writing directly to the
     * Firestore database). Used with {@link @firebase/firestore/lite#(setDoc:1)}, {@link @firebase/firestore/lite#(WriteBatch.set:1)}
     * and {@link @firebase/firestore/lite#(Transaction.set:1)} with `merge:true` or `mergeFields`.
     */
    toFirestore(modelObject: Partial<T>, options: SetOptions): DocumentData;
    /**
     * Called by the Firestore SDK to convert Firestore data into an object of
     * type T. You can access your data by calling: `snapshot.data()`.
     *
     * @param snapshot - A `QueryDocumentSnapshot` containing your data and
     * metadata.
     */
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T;
}

/** An error returned by a Firestore operation. */
export declare class FirestoreError extends Error {
    /**
     * The backend error code associated with this error.
     */
    readonly code: FirestoreErrorCode;
    /**
     * A custom error description.
     */
    readonly message: string;
    /** The custom name for all FirestoreErrors. */
    readonly name: string;
    /** The stack of the error. */
    readonly stack?: string;
    /** @hideconstructor */
    constructor(
    /**
     * The backend error code associated with this error.
     */
    code: FirestoreErrorCode, 
    /**
     * A custom error description.
     */
    message: string);
}

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
/**
 * The set of Firestore status codes. The codes are the same at the ones
 * exposed by gRPC here:
 * https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
 *
 * Possible values:
 * - 'cancelled': The operation was cancelled (typically by the caller).
 * - 'unknown': Unknown error or an error from a different error domain.
 * - 'invalid-argument': Client specified an invalid argument. Note that this
 *   differs from 'failed-precondition'. 'invalid-argument' indicates
 *   arguments that are problematic regardless of the state of the system
 *   (e.g. an invalid field name).
 * - 'deadline-exceeded': Deadline expired before operation could complete.
 *   For operations that change the state of the system, this error may be
 *   returned even if the operation has completed successfully. For example,
 *   a successful response from a server could have been delayed long enough
 *   for the deadline to expire.
 * - 'not-found': Some requested document was not found.
 * - 'already-exists': Some document that we attempted to create already
 *   exists.
 * - 'permission-denied': The caller does not have permission to execute the
 *   specified operation.
 * - 'resource-exhausted': Some resource has been exhausted, perhaps a
 *   per-user quota, or perhaps the entire file system is out of space.
 * - 'failed-precondition': Operation was rejected because the system is not
 *   in a state required for the operation's execution.
 * - 'aborted': The operation was aborted, typically due to a concurrency
 *   issue like transaction aborts, etc.
 * - 'out-of-range': Operation was attempted past the valid range.
 * - 'unimplemented': Operation is not implemented or not supported/enabled.
 * - 'internal': Internal errors. Means some invariants expected by
 *   underlying system has been broken. If you see one of these errors,
 *   something is very broken.
 * - 'unavailable': The service is currently unavailable. This is most likely
 *   a transient condition and may be corrected by retrying with a backoff.
 * - 'data-loss': Unrecoverable data loss or corruption.
 * - 'unauthenticated': The request does not have valid authentication
 *   credentials for the operation.
 */
export declare type FirestoreErrorCode = 'cancelled' | 'unknown' | 'invalid-argument' | 'deadline-exceeded' | 'not-found' | 'already-exists' | 'permission-denied' | 'resource-exhausted' | 'failed-precondition' | 'aborted' | 'out-of-range' | 'unimplemented' | 'internal' | 'unavailable' | 'data-loss' | 'unauthenticated';

/**
 * An interface implemented by FirebaseFirestore that provides compatibility
 * with the usage in this file.
 *
 * This interface mainly exists to remove a cyclic dependency.
 */
declare interface FirestoreService extends _FirebaseService {
    _credentials: CredentialsProvider;
    _persistenceKey: string;
    _databaseId: DatabaseId;
    _terminated: boolean;
    _freezeSettings(): FirestoreSettings;
}

/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied firestore.Settings object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
declare class FirestoreSettings {
    /** The hostname to connect to. */
    readonly host: string;
    /** Whether to use SSL when connecting. */
    readonly ssl: boolean;
    readonly cacheSizeBytes: number;
    readonly experimentalForceLongPolling: boolean;
    readonly experimentalAutoDetectLongPolling: boolean;
    readonly ignoreUndefinedProperties: boolean;
    readonly useFetchStreams: boolean;
    credentials?: any;
    constructor(settings: PrivateSettings);
    isEqual(other: FirestoreSettings): boolean;
}

declare namespace firestoreV1ApiClientInterfaces {
    interface ArrayValue {
        values?: Value[];
    }
    interface BatchGetDocumentsRequest {
        database?: string;
        documents?: string[];
        mask?: DocumentMask;
        transaction?: string;
        newTransaction?: TransactionOptions;
        readTime?: string;
    }
    interface BatchGetDocumentsResponse {
        found?: Document;
        missing?: string;
        transaction?: string;
        readTime?: string;
    }
    interface BeginTransactionRequest {
        options?: TransactionOptions;
    }
    interface BeginTransactionResponse {
        transaction?: string;
    }
    interface CollectionSelector {
        collectionId?: string;
        allDescendants?: boolean;
    }
    interface CommitRequest {
        database?: string;
        writes?: Write[];
        transaction?: string;
    }
    interface CommitResponse {
        writeResults?: WriteResult[];
        commitTime?: string;
    }
    interface CompositeFilter {
        op?: CompositeFilterOp;
        filters?: Filter[];
    }
    interface Cursor {
        values?: Value[];
        before?: boolean;
    }
    interface Document {
        name?: string;
        fields?: ApiClientObjectMap<Value>;
        createTime?: Timestamp_2;
        updateTime?: Timestamp_2;
    }
    interface DocumentChange {
        document?: Document;
        targetIds?: number[];
        removedTargetIds?: number[];
    }
    interface DocumentDelete {
        document?: string;
        removedTargetIds?: number[];
        readTime?: Timestamp_2;
    }
    interface DocumentMask {
        fieldPaths?: string[];
    }
    interface DocumentRemove {
        document?: string;
        removedTargetIds?: number[];
        readTime?: string;
    }
    interface DocumentTransform {
        document?: string;
        fieldTransforms?: FieldTransform[];
    }
    interface DocumentsTarget {
        documents?: string[];
    }
    interface Empty {
    }
    interface ExistenceFilter {
        targetId?: number;
        count?: number;
    }
    interface FieldFilter {
        field?: FieldReference;
        op?: FieldFilterOp;
        value?: Value;
    }
    interface FieldReference {
        fieldPath?: string;
    }
    interface FieldTransform {
        fieldPath?: string;
        setToServerValue?: FieldTransformSetToServerValue;
        appendMissingElements?: ArrayValue;
        removeAllFromArray?: ArrayValue;
        increment?: Value;
    }
    interface Filter {
        compositeFilter?: CompositeFilter;
        fieldFilter?: FieldFilter;
        unaryFilter?: UnaryFilter;
    }
    interface Index {
        name?: string;
        collectionId?: string;
        fields?: IndexField[];
        state?: IndexState;
    }
    interface IndexField {
        fieldPath?: string;
        mode?: IndexFieldMode;
    }
    interface LatLng {
        latitude?: number;
        longitude?: number;
    }
    interface ListCollectionIdsRequest {
        pageSize?: number;
        pageToken?: string;
    }
    interface ListCollectionIdsResponse {
        collectionIds?: string[];
        nextPageToken?: string;
    }
    interface ListDocumentsResponse {
        documents?: Document[];
        nextPageToken?: string;
    }
    interface ListIndexesResponse {
        indexes?: Index[];
        nextPageToken?: string;
    }
    interface ListenRequest {
        addTarget?: Target;
        removeTarget?: number;
        labels?: ApiClientObjectMap<string>;
    }
    interface ListenResponse {
        targetChange?: TargetChange;
        documentChange?: DocumentChange;
        documentDelete?: DocumentDelete;
        documentRemove?: DocumentRemove;
        filter?: ExistenceFilter;
    }
    interface MapValue {
        fields?: ApiClientObjectMap<Value>;
    }
    interface Operation {
        name?: string;
        metadata?: ApiClientObjectMap<any>;
        done?: boolean;
        error?: Status;
        response?: ApiClientObjectMap<any>;
    }
    interface Order {
        field?: FieldReference;
        direction?: OrderDirection;
    }
    interface Precondition {
        exists?: boolean;
        updateTime?: Timestamp_2;
    }
    interface Projection {
        fields?: FieldReference[];
    }
    interface QueryTarget {
        parent?: string;
        structuredQuery?: StructuredQuery;
    }
    interface ReadOnly {
        readTime?: string;
    }
    interface ReadWrite {
        retryTransaction?: string;
    }
    interface RollbackRequest {
        transaction?: string;
    }
    interface RunQueryRequest {
        parent?: string;
        structuredQuery?: StructuredQuery;
        transaction?: string;
        newTransaction?: TransactionOptions;
        readTime?: string;
    }
    interface RunQueryResponse {
        transaction?: string;
        document?: Document;
        readTime?: string;
        skippedResults?: number;
    }
    interface Status {
        code?: number;
        message?: string;
        details?: Array<ApiClientObjectMap<any>>;
    }
    interface StructuredQuery {
        select?: Projection;
        from?: CollectionSelector[];
        where?: Filter;
        orderBy?: Order[];
        startAt?: Cursor;
        endAt?: Cursor;
        offset?: number;
        limit?: number | {
            value: number;
        };
    }
    interface Target {
        query?: QueryTarget;
        documents?: DocumentsTarget;
        resumeToken?: string | Uint8Array;
        readTime?: Timestamp_2;
        targetId?: number;
        once?: boolean;
    }
    interface TargetChange {
        targetChangeType?: TargetChangeTargetChangeType;
        targetIds?: number[];
        cause?: Status;
        resumeToken?: string | Uint8Array;
        readTime?: Timestamp_2;
    }
    interface TransactionOptions {
        readOnly?: ReadOnly;
        readWrite?: ReadWrite;
    }
    interface UnaryFilter {
        op?: UnaryFilterOp;
        field?: FieldReference;
    }
    interface Value {
        nullValue?: ValueNullValue;
        booleanValue?: boolean;
        integerValue?: string | number;
        doubleValue?: string | number;
        timestampValue?: Timestamp_2;
        stringValue?: string;
        bytesValue?: string | Uint8Array;
        referenceValue?: string;
        geoPointValue?: LatLng;
        arrayValue?: ArrayValue;
        mapValue?: MapValue;
    }
    interface Write {
        update?: Document;
        delete?: string;
        verify?: string;
        transform?: DocumentTransform;
        updateMask?: DocumentMask;
        updateTransforms?: FieldTransform[];
        currentDocument?: Precondition;
    }
    interface WriteRequest {
        streamId?: string;
        writes?: Write[];
        streamToken?: string | Uint8Array;
        labels?: ApiClientObjectMap<string>;
    }
    interface WriteResponse {
        streamId?: string;
        streamToken?: string | Uint8Array;
        writeResults?: WriteResult[];
        commitTime?: Timestamp_2;
    }
    interface WriteResult {
        updateTime?: Timestamp_2;
        transformResults?: Value[];
    }
}

declare interface FirstPartyCredentialsSettings {
    ['type']: 'gapi';
    ['client']: unknown;
    ['sessionIndex']: string;
    ['iamToken']: string | null;
}

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
/**
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */
export declare class GeoPoint {
    private _lat;
    private _long;
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    constructor(latitude: number, longitude: number);
    /**
     * The latitude of this `GeoPoint` instance.
     */
    get latitude(): number;
    /**
     * The longitude of this `GeoPoint` instance.
     */
    get longitude(): number;
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    isEqual(other: GeoPoint): boolean;
    /** Returns a JSON-serializable representation of this GeoPoint. */
    toJSON(): {
        latitude: number;
        longitude: number;
    };
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    _compareTo(other: GeoPoint): number;
}

/**
 * Reads the document referred to by the specified document reference.
 *
 * All documents are directly fetched from the server, even if the document was
 * previously read or modified. Recent modifications are only reflected in the
 * retrieved `DocumentSnapshot` if they have already been applied by the
 * backend. If the client is offline, the read fails. If you like to use
 * caching or see local modifications, please use the full Firestore SDK.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the current
 * document contents.
 */
export declare function getDoc<T>(reference: DocumentReference<T>): Promise<DocumentSnapshot<T>>;

/**
 * Executes the query and returns the results as a {@link QuerySnapshot}.
 *
 * All queries are executed directly by the server, even if the the query was
 * previously executed. Recent modifications are only reflected in the retrieved
 * results if they have already been applied by the backend. If the client is
 * offline, the operation fails. To see previously cached result and local
 * modifications, use the full Firestore SDK.
 *
 * @param query - The `Query` to execute.
 * @returns A Promise that will be resolved with the results of the query.
 */
export declare function getDocs<T>(query: Query<T>): Promise<QuerySnapshot<T>>;

/**
 * Returns the existing instance of Firestore that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned Firestore
 * instance is associated with.
 * @returns The `Firestore` instance of the provided app.
 */
export declare function getFirestore(app?: FirebaseApp): FirebaseFirestore;

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */
export declare function increment(n: number): FieldValue;

declare type IndexFieldMode = 'MODE_UNSPECIFIED' | 'ASCENDING' | 'DESCENDING';

declare type IndexState = 'STATE_UNSPECIFIED' | 'CREATING' | 'READY' | 'ERROR';

/**
 * Initializes a new instance of Cloud Firestore with the provided settings.
 * Can only be called before any other functions, including
 * {@link getFirestore}. If the custom settings are empty, this function is
 * equivalent to calling {@link getFirestore}.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} with which the `Firestore` instance will
 * be associated.
 * @param settings - A settings object to configure the `Firestore` instance.
 * @returns A newly initialized Firestore instance.
 */
export declare function initializeFirestore(app: FirebaseApp, settings: Settings): FirebaseFirestore;

/**
 * Creates a `QueryConstraint` that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created `Query`.
 */
export declare function limit(limit: number): QueryConstraint;

/**
 * Creates a `QueryConstraint` that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created `Query`.
 */
export declare function limitToLast(limit: number): QueryConstraint;

declare const enum LimitType {
    First = "F",
    Last = "L"
}
export { LogLevel }

declare type MapValue = firestoreV1ApiClientInterfaces.MapValue;

/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `applySetMutationToRemoteDocument()` for an
 * example).
 */
declare abstract class Mutation {
    abstract readonly type: MutationType;
    abstract readonly key: DocumentKey;
    abstract readonly precondition: Precondition;
    abstract readonly fieldTransforms: FieldTransform[];
}

declare const enum MutationType {
    Set = 0,
    Patch = 1,
    Delete = 2,
    Verify = 3
}

/**
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */
declare class ObjectValue {
    readonly value: {
        mapValue: MapValue;
    };
    constructor(value: {
        mapValue: MapValue;
    });
    static empty(): ObjectValue;
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    field(path: FieldPath_2): Value | null;
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    set(path: FieldPath_2, value: Value): void;
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    setAll(data: Map<FieldPath_2, Value | null>): void;
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */
    delete(path: FieldPath_2): void;
    isEqual(other: ObjectValue): boolean;
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */
    private getFieldsMap;
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */
    private applyChanges;
    clone(): ObjectValue;
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */
declare class OrderBy {
    readonly field: FieldPath_2;
    readonly dir: Direction;
    constructor(field: FieldPath_2, dir?: Direction);
}

/**
 * Creates a `QueryConstraint` that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created `Query`.
 */
export declare function orderBy(fieldPath: string | FieldPath, directionStr?: OrderByDirection): QueryConstraint;

/**
 * The direction of a {@link orderBy} clause is specified as 'desc' or 'asc'
 * (descending or ascending).
 */
export declare type OrderByDirection = 'desc' | 'asc';

declare type OrderDirection = 'DIRECTION_UNSPECIFIED' | 'ASCENDING' | 'DESCENDING';

declare interface ParseContext {
    readonly databaseId: DatabaseId;
    readonly ignoreUndefinedProperties: boolean;
}

/** The result of parsing document data (e.g. for a setData call). */
declare class ParsedSetData {
    readonly data: ObjectValue;
    readonly fieldMask: FieldMask | null;
    readonly fieldTransforms: FieldTransform[];
    constructor(data: ObjectValue, fieldMask: FieldMask | null, fieldTransforms: FieldTransform[]);
    toMutation(key: DocumentKey, precondition: Precondition): Mutation;
}

/** The result of parsing "update" data (i.e. for an updateData call). */
declare class ParsedUpdateData {
    readonly data: ObjectValue;
    readonly fieldMask: FieldMask;
    readonly fieldTransforms: FieldTransform[];
    constructor(data: ObjectValue, fieldMask: FieldMask, fieldTransforms: FieldTransform[]);
    toMutation(key: DocumentKey, precondition: Precondition): Mutation;
}

/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */
declare class Precondition {
    readonly updateTime?: SnapshotVersion | undefined;
    readonly exists?: boolean | undefined;
    private constructor();
    /** Creates a new empty Precondition. */
    static none(): Precondition;
    /** Creates a new Precondition with an exists flag. */
    static exists(exists: boolean): Precondition;
    /** Creates a new Precondition based on a version a document exists at. */
    static updateTime(version: SnapshotVersion): Precondition;
    /** Returns whether this Precondition is empty. */
    get isNone(): boolean;
    isEqual(other: Precondition): boolean;
}

/** Undocumented, private additional settings not exposed in our public API. */
declare interface PrivateSettings extends Settings {
    credentials?: CredentialsSettings;
    cacheSizeBytes?: number;
    experimentalForceLongPolling?: boolean;
    experimentalAutoDetectLongPolling?: boolean;
    useFetchStreams?: boolean;
}

declare interface ProviderCredentialsSettings {
    ['type']: 'provider';
    ['client']: CredentialsProvider;
}

/**
 * A `Query` refers to a Query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */
export declare class Query<T = DocumentData> {
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    readonly converter: FirestoreDataConverter<T> | null;
    readonly _query: Query_2;
    /** The type of this Firestore reference. */
    readonly type: 'query' | 'collection';
    /**
     * The `FirebaseFirestore` for the Firestore database (useful for performing
     * transactions, etc.).
     */
    readonly firestore: FirebaseFirestore;
    /** @hideconstructor protected */
    constructor(firestore: FirebaseFirestore, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    converter: FirestoreDataConverter<T> | null, _query: Query_2);
    /**
     * Removes the current converter.
     *
     * @param converter - `null` removes the current converter.
     * @returns A `Query<DocumentData>` that does not use a converter.
     */
    withConverter(converter: null): Query<DocumentData>;
    /**
     * Applies a custom data converter to this query, allowing you to use your own
     * custom model objects with Firestore. When you call {@link getDocs} with
     * the returned query, the provided converter will convert between Firestore
     * data and your custom type `U`.
     *
     * @param converter - Converts objects to and from Firestore.
     * @returns A `Query<U>` that uses the provided converter.
     */
    withConverter<U>(converter: FirestoreDataConverter<U>): Query<U>;
}

/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */
export declare function query<T>(query: Query<T>, ...queryConstraints: QueryConstraint[]): Query<T>;

/**
 * The Query interface defines all external properties of a query.
 *
 * QueryImpl implements this interface to provide memoization for `queryOrderBy`
 * and `queryToTarget`.
 */
declare interface Query_2 {
    readonly path: ResourcePath;
    readonly collectionGroup: string | null;
    readonly explicitOrderBy: OrderBy[];
    readonly filters: Filter[];
    readonly limit: number | null;
    readonly limitType: LimitType;
    readonly startAt: Bound | null;
    readonly endAt: Bound | null;
}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */
export declare abstract class QueryConstraint {
    /** The type of this query constraints */
    abstract readonly type: QueryConstraintType;
    /**
     * Takes the provided `Query` and returns a copy of the `Query` with this
     * `QueryConstraint` applied.
     */
    abstract _apply<T>(query: Query<T>): Query<T>;
}

/** Describes the different query constraints available in this SDK. */
export declare type QueryConstraintType = 'where' | 'orderBy' | 'limit' | 'limitToLast' | 'startAt' | 'startAfter' | 'endAt' | 'endBefore';

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */
export declare class QueryDocumentSnapshot<T = DocumentData> extends DocumentSnapshot<T> {
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */
    data(): T;
}

/**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */
export declare function queryEqual<T>(left: Query<T>, right: Query<T>): boolean;

/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */
export declare class QuerySnapshot<T = DocumentData> {
    readonly _docs: Array<QueryDocumentSnapshot<T>>;
    /**
     * The query on which you called {@link getDocs} in order to get this
     * `QuerySnapshot`.
     */
    readonly query: Query<T>;
    /** @hideconstructor */
    constructor(_query: Query<T>, _docs: Array<QueryDocumentSnapshot<T>>);
    /** An array of all the documents in the `QuerySnapshot`. */
    get docs(): Array<QueryDocumentSnapshot<T>>;
    /** The number of documents in the `QuerySnapshot`. */
    get size(): number;
    /** True if there are no documents in the `QuerySnapshot`. */
    get empty(): boolean;
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */
    forEach(callback: (result: QueryDocumentSnapshot<T>) => void, thisArg?: unknown): void;
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */
export declare function refEqual<T>(left: DocumentReference<T> | CollectionReference<T>, right: DocumentReference<T> | CollectionReference<T>): boolean;

/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */
declare class ResourcePath extends BasePath<ResourcePath> {
    protected construct(segments: string[], offset?: number, length?: number): ResourcePath;
    canonicalString(): string;
    toString(): string;
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    static fromString(...pathComponents: string[]): ResourcePath;
    static emptyPath(): ResourcePath;
}

/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */
export declare function runTransaction<T>(firestore: FirebaseFirestore, updateFunction: (transaction: Transaction) => Promise<T>): Promise<T>;

/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */
export declare function serverTimestamp(): FieldValue;

declare type ServerTimestampBehavior = 'estimate' | 'previous' | 'none';

/**
 * Writes to the document referred to by the specified `DocumentReference`. If
 * the document does not yet exist, it will be created.
 *
 * The result of this write will only be reflected in document reads that occur
 * after the returned Promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to write.
 * @param data - A map of the fields and values for the document.
 * @returns A Promise resolved once the data has been successfully written
 * to the backend.
 */
export declare function setDoc<T>(reference: DocumentReference<T>, data: T): Promise<void>;

/**
 * Writes to the document referred to by the specified `DocumentReference`. If
 * the document does not yet exist, it will be created. If you provide `merge`
 * or `mergeFields`, the provided data can be merged into an existing document.
 *
 * The result of this write will only be reflected in document reads that occur
 * after the returned Promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to write.
 * @param data - A map of the fields and values for the document.
 * @param options - An object to configure the set behavior.
 * @returns A Promise resolved once the data has been successfully written
 * to the backend.
 */
export declare function setDoc<T>(reference: DocumentReference<T>, data: Partial<T>, options: SetOptions): Promise<void>;

/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */
export declare function setLogLevel(logLevel: LogLevel): void;

/**
 * An options object that configures the behavior of {@link @firebase/firestore/lite#(setDoc:1)}, {@link
 * @firebase/firestore/lite#(WriteBatch.set:1)} and {@link @firebase/firestore/lite#(Transaction.set:1)} calls. These calls can be
 * configured to perform granular merges instead of overwriting the target
 * documents in their entirety by providing a `SetOptions` with `merge: true`.
 *
 * @param merge - Changes the behavior of a `setDoc()` call to only replace the
 * values specified in its data argument. Fields omitted from the `setDoc()`
 * call remain untouched.
 * @param mergeFields - Changes the behavior of `setDoc()` calls to only replace
 * the specified field paths. Any field path that is not specified is ignored
 * and remains untouched.
 */
export declare type SetOptions = {
    readonly merge?: boolean;
} | {
    readonly mergeFields?: Array<string | FieldPath>;
};

/**
 * Specifies custom configurations for your Cloud Firestore instance.
 * You must set these before invoking any other methods.
 */
export declare interface Settings {
    /** The hostname to connect to. */
    host?: string;
    /** Whether to use SSL when connecting. */
    ssl?: boolean;
    /**
     * Whether to skip nested properties that are set to `undefined` during
     * object serialization. If set to `true`, these properties are skipped
     * and not written to Firestore. If set to `false` or omitted, the SDK
     * throws an exception when it encounters properties of type `undefined`.
     */
    ignoreUndefinedProperties?: boolean;
}

/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */
export declare function snapshotEqual<T>(left: DocumentSnapshot<T> | QuerySnapshot<T>, right: DocumentSnapshot<T> | QuerySnapshot<T>): boolean;

/**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */
declare class SnapshotVersion {
    private timestamp;
    static fromTimestamp(value: Timestamp): SnapshotVersion;
    static min(): SnapshotVersion;
    private constructor();
    compareTo(other: SnapshotVersion): number;
    isEqual(other: SnapshotVersion): boolean;
    /** Returns a number representation of the version for use in spec tests. */
    toMicroseconds(): number;
    toString(): string;
    toTimestamp(): Timestamp;
}

/**
 * Creates a `QueryConstraint` that modifies the result set to start after the
 * provided document (exclusive). The starting position is relative to the order
 * of the query. The document must contain all of the fields provided in the
 * orderBy of the query.
 *
 * @param snapshot - The snapshot of the document to start after.
 * @returns A `QueryConstraint` to pass to `query()`
 */
export declare function startAfter(snapshot: DocumentSnapshot<unknown>): QueryConstraint;

/**
 * Creates a `QueryConstraint` that modifies the result set to start after the
 * provided fields relative to the order of the query. The order of the field
 * values must match the order of the order by clauses of the query.
 *
 * @param fieldValues - The field values to start this query after, in order
 * of the query's order by.
 * @returns A `QueryConstraint` to pass to `query()`
 */
export declare function startAfter(...fieldValues: unknown[]): QueryConstraint;

/**
 * Creates a `QueryConstraint` that modifies the result set to start at the
 * provided document (inclusive). The starting position is relative to the order
 * of the query. The document must contain all of the fields provided in the
 * `orderBy` of this query.
 *
 * @param snapshot - The snapshot of the document to start at.
 * @returns A `QueryConstraint` to pass to `query()`.
 */
export declare function startAt(snapshot: DocumentSnapshot<unknown>): QueryConstraint;

/**
 * Creates a `QueryConstraint` that modifies the result set to start at the
 * provided fields relative to the order of the query. The order of the field
 * values must match the order of the order by clauses of the query.
 *
 * @param fieldValues - The field values to start this query at, in order
 * of the query's order by.
 * @returns A `QueryConstraint` to pass to `query()`.
 */
export declare function startAt(...fieldValues: unknown[]): QueryConstraint;

declare type TargetChangeTargetChangeType = 'NO_CHANGE' | 'ADD' | 'REMOVE' | 'CURRENT' | 'RESET';

/**
 * Terminates the provided Firestore instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` functions
 * may be used. Any other function will throw a `FirestoreError`. Termination
 * does not cancel any pending writes, and any promises that are awaiting a
 * response from the server will not be resolved.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link getFirestore}.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all of
 * its resources or in combination with {@link clearIndexedDbPersistence} to
 * ensure that all local state is destroyed between test runs.
 *
 * @param firestore - The Firestore instance to terminate.
 * @returns A promise that is resolved when the instance has been successfully
 * terminated.
 */
export declare function terminate(firestore: FirebaseFirestore): Promise<void>;

/**
 * Wellknown "timer" IDs used when scheduling delayed operations on the
 * AsyncQueue. These IDs can then be used from tests to check for the presence
 * of operations or to run them early.
 *
 * The string values are used when encoding these timer IDs in JSON spec tests.
 */
declare const enum TimerId {
    /** All can be used with runDelayedOperationsEarly() to run all timers. */
    All = "all",
    /**
     * The following 4 timers are used in persistent_stream.ts for the listen and
     * write streams. The "Idle" timer is used to close the stream due to
     * inactivity. The "ConnectionBackoff" timer is used to restart a stream once
     * the appropriate backoff delay has elapsed.
     */
    ListenStreamIdle = "listen_stream_idle",
    ListenStreamConnectionBackoff = "listen_stream_connection_backoff",
    WriteStreamIdle = "write_stream_idle",
    WriteStreamConnectionBackoff = "write_stream_connection_backoff",
    /**
     * A timer used in online_state_tracker.ts to transition from
     * OnlineState.Unknown to Offline after a set timeout, rather than waiting
     * indefinitely for success or failure.
     */
    OnlineStateTimeout = "online_state_timeout",
    /**
     * A timer used to update the client metadata in IndexedDb, which is used
     * to determine the primary leaseholder.
     */
    ClientMetadataRefresh = "client_metadata_refresh",
    /** A timer used to periodically attempt LRU Garbage collection */
    LruGarbageCollection = "lru_garbage_collection",
    /**
     * A timer used to retry transactions. Since there can be multiple concurrent
     * transactions, multiple of these may be in the queue at a given time.
     */
    TransactionRetry = "transaction_retry",
    /**
     * A timer used to retry operations scheduled via retryable AsyncQueue
     * operations.
     */
    AsyncQueueRetry = "async_queue_retry"
}

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
/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */
export declare class Timestamp {
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    readonly seconds: number;
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    readonly nanoseconds: number;
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */
    static now(): Timestamp;
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */
    static fromDate(date: Date): Timestamp;
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    static fromMillis(milliseconds: number): Timestamp;
    /**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */
    constructor(
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    seconds: number, 
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    nanoseconds: number);
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    toDate(): Date;
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */
    toMillis(): number;
    _compareTo(other: Timestamp): number;
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    isEqual(other: Timestamp): boolean;
    /** Returns a textual representation of this Timestamp. */
    toString(): string;
    /** Returns a JSON-serializable representation of this Timestamp. */
    toJSON(): {
        seconds: number;
        nanoseconds: number;
    };
    /**
     * Converts this object to a primitive string, which allows Timestamp objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    valueOf(): string;
}

declare type Timestamp_2 = string | {
    seconds?: string | number;
    nanos?: number;
};

declare interface Token {
    /** Type of token. */
    type: TokenType;
    /**
     * The user with which the token is associated (used for persisting user
     * state on disk, etc.).
     */
    user: User;
    /** Extra header values to be passed along with a request */
    authHeaders: {
        [header: string]: string;
    };
}

declare type TokenType = 'OAuth' | 'FirstParty';

/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
export declare class Transaction {
    protected readonly _firestore: FirebaseFirestore;
    private readonly _transaction;
    private readonly _dataReader;
    /** @hideconstructor */
    constructor(_firestore: FirebaseFirestore, _transaction: Transaction_2);
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */
    get<T>(documentRef: DocumentReference<T>): Promise<DocumentSnapshot<T>>;
    /**
     * Writes to the document referred to by the provided {@link
     * DocumentReference}. If the document does not exist yet, it will be created.
     *
     * @param documentRef - A reference to the document to be set.
     * @param data - An object of the fields and values for the document.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    set<T>(documentRef: DocumentReference<T>, data: T): this;
    /**
     * Writes to the document referred to by the provided {@link
     * DocumentReference}. If the document does not exist yet, it will be created.
     * If you provide `merge` or `mergeFields`, the provided data can be merged
     * into an existing document.
     *
     * @param documentRef - A reference to the document to be set.
     * @param data - An object of the fields and values for the document.
     * @param options - An object to configure the set behavior.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    set<T>(documentRef: DocumentReference<T>, data: Partial<T>, options: SetOptions): this;
    /**
     * Updates fields in the document referred to by the provided {@link
     * DocumentReference}. The update will fail if applied to a document that does
     * not exist.
     *
     * @param documentRef - A reference to the document to be updated.
     * @param data - An object containing the fields and values with which to
     * update the document. Fields can contain dots to reference nested fields
     * within the document.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    update(documentRef: DocumentReference<unknown>, data: UpdateData): this;
    /**
     * Updates fields in the document referred to by the provided {@link
     * DocumentReference}. The update will fail if applied to a document that does
     * not exist.
     *
     * Nested fields can be updated by providing dot-separated field path
     * strings or by providing `FieldPath` objects.
     *
     * @param documentRef - A reference to the document to be updated.
     * @param field - The first field to update.
     * @param value - The first value.
     * @param moreFieldsAndValues - Additional key/value pairs.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    update(documentRef: DocumentReference<unknown>, field: string | FieldPath, value: unknown, ...moreFieldsAndValues: unknown[]): this;
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    delete(documentRef: DocumentReference<unknown>): this;
}

/**
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */
declare class Transaction_2 {
    private datastore;
    private readVersions;
    private mutations;
    private committed;
    /**
     * A deferred usage error that occurred previously in this transaction that
     * will cause the transaction to fail once it actually commits.
     */
    private lastWriteError;
    /**
     * Set of documents that have been written in the transaction.
     *
     * When there's more than one write to the same key in a transaction, any
     * writes after the first are handled differently.
     */
    private writtenDocs;
    constructor(datastore: Datastore);
    lookup(keys: DocumentKey[]): Promise<Document_2[]>;
    set(key: DocumentKey, data: ParsedSetData): void;
    update(key: DocumentKey, data: ParsedUpdateData): void;
    delete(key: DocumentKey): void;
    commit(): Promise<void>;
    private recordVersion;
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    private precondition;
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    private preconditionForUpdate;
    private write;
    private ensureCommitNotCalled;
}

/** Used to represent a field transform on a mutation. */
declare class TransformOperation {
    private _;
}

declare type UnaryFilterOp = 'OPERATOR_UNSPECIFIED' | 'IS_NAN' | 'IS_NULL' | 'IS_NOT_NAN' | 'IS_NOT_NULL';

/**
 * An untyped Firestore Data Converter interface that is shared between the
 * lite, firestore-exp and classic SDK.
 */
declare interface UntypedFirestoreDataConverter<T> {
    toFirestore(modelObject: T): DocumentData_2;
    toFirestore(modelObject: Partial<T>, options: SetOptions_2): DocumentData_2;
    fromFirestore(snapshot: unknown, options?: unknown): T;
}

/**
 * Update data (for use with {@link @firebase/firestore/lite#(updateDoc:1)}) consists of field paths (e.g.
 * 'foo' or 'foo.baz') mapped to values. Fields that contain dots reference
 * nested fields within the document.
 */
export declare interface UpdateData {
    /** A mapping between a dot-separated field path and its value. */
    [fieldPath: string]: any;
}

/**
 * Updates fields in the document referred to by the specified
 * `DocumentReference`. The update will fail if applied to a document that does
 * not exist.
 *
 * The result of this update will only be reflected in document reads that occur
 * after the returned Promise resolves. If the client is offline, the
 * update fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to update.
 * @param data - An object containing the fields and values with which to
 * update the document. Fields can contain dots to reference nested fields
 * within the document.
 * @returns A Promise resolved once the data has been successfully written
 * to the backend.
 */
export declare function updateDoc(reference: DocumentReference<unknown>, data: UpdateData): Promise<void>;

/**
 * Updates fields in the document referred to by the specified
 * `DocumentReference` The update will fail if applied to a document that does
 * not exist.
 *
 * Nested fields can be updated by providing dot-separated field path
 * strings or by providing `FieldPath` objects.
 *
 * The result of this update will only be reflected in document reads that occur
 * after the returned Promise resolves. If the client is offline, the
 * update fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to update.
 * @param field - The first field to update.
 * @param value - The first value.
 * @param moreFieldsAndValues - Additional key value pairs.
 * @returns A Promise resolved once the data has been successfully written
 * to the backend.
 */
export declare function updateDoc(reference: DocumentReference<unknown>, field: string | FieldPath, value: unknown, ...moreFieldsAndValues: unknown[]): Promise<void>;

/**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The Firestore instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */
export declare function useFirestoreEmulator(firestore: FirebaseFirestore, host: string, port: number, options?: {
    mockUserToken?: EmulatorMockTokenOptions;
}): void;

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
/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
declare class User {
    readonly uid: string | null;
    /** A user with a null UID. */
    static readonly UNAUTHENTICATED: User;
    static readonly GOOGLE_CREDENTIALS: User;
    static readonly FIRST_PARTY: User;
    constructor(uid: string | null);
    isAuthenticated(): boolean;
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    toKey(): string;
    isEqual(otherUser: User): boolean;
}

declare type Value = firestoreV1ApiClientInterfaces.Value;

declare type ValueNullValue = 'NULL_VALUE';

/**
 * Creates a `QueryConstraint` that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created `Query`.
 */
export declare function where(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown): QueryConstraint;

/**
 * Filter conditions in a {@link where} clause are specified using the
 * strings '&lt;', '&lt;=', '==', '!=', '&gt;=', '&gt;', 'array-contains', 'in',
 * 'array-contains-any', and 'not-in'.
 */
export declare type WhereFilterOp = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';

/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */
export declare class WriteBatch {
    private readonly _firestore;
    private readonly _commitHandler;
    private readonly _dataReader;
    private _mutations;
    private _committed;
    /** @hideconstructor */
    constructor(_firestore: FirebaseFirestore, _commitHandler: (m: Mutation[]) => Promise<void>);
    /**
     * Writes to the document referred to by the provided {@link
     * DocumentReference}. If the document does not exist yet, it will be created.
     *
     * @param documentRef - A reference to the document to be set.
     * @param data - An object of the fields and values for the document.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    set<T>(documentRef: DocumentReference<T>, data: T): WriteBatch;
    /**
     * Writes to the document referred to by the provided {@link
     * DocumentReference}. If the document does not exist yet, it will be created.
     * If you provide `merge` or `mergeFields`, the provided data can be merged
     * into an existing document.
     *
     * @param documentRef - A reference to the document to be set.
     * @param data - An object of the fields and values for the document.
     * @param options - An object to configure the set behavior.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    set<T>(documentRef: DocumentReference<T>, data: Partial<T>, options: SetOptions): WriteBatch;
    /**
     * Updates fields in the document referred to by the provided {@link
     * DocumentReference}. The update will fail if applied to a document that does
     * not exist.
     *
     * @param documentRef - A reference to the document to be updated.
     * @param data - An object containing the fields and values with which to
     * update the document. Fields can contain dots to reference nested fields
     * within the document.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    update(documentRef: DocumentReference<unknown>, data: UpdateData): WriteBatch;
    /**
     * Updates fields in the document referred to by this {@link
     * DocumentReference}. The update will fail if applied to a document that does
     * not exist.
     *
     * Nested fields can be update by providing dot-separated field path strings
     * or by providing `FieldPath` objects.
     *
     * @param documentRef - A reference to the document to be updated.
     * @param field - The first field to update.
     * @param value - The first value.
     * @param moreFieldsAndValues - Additional key value pairs.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    update(documentRef: DocumentReference<unknown>, field: string | FieldPath, value: unknown, ...moreFieldsAndValues: unknown[]): WriteBatch;
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    delete(documentRef: DocumentReference<unknown>): WriteBatch;
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A Promise resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */
    commit(): Promise<void>;
    private _verifyNotCommitted;
}

/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single WriteBatch
 * is 500.
 *
 * The result of these writes will only be reflected in document reads that
 * occur after the returned Promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @returns A `WriteBatch` that can be used to atomically execute multiple
 * writes.
 */
export declare function writeBatch(firestore: FirebaseFirestore): WriteBatch;

export { }
