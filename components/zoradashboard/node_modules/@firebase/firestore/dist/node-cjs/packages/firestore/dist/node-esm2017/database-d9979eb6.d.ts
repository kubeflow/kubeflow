declare class ArrayUnionFieldValueImpl extends FieldValue {
    constructor(methodName: any, _elements: any);
    _elements: any;
    _toFieldTransform(context: any): FieldTransform;
    isEqual(other: any): boolean;
}
/** Immutable class holding a blob (binary data) */
declare class Blob {
    static fromBase64String(base64: any): Blob;
    static fromUint8Array(array: any): Blob;
    constructor(_delegate: any);
    _delegate: any;
    toBase64(): any;
    toUint8Array(): any;
    isEqual(other: any): any;
    toString(): string;
}
declare class CollectionReference extends Query {
    get id(): any;
    get path(): any;
    get parent(): DocumentReference | null;
    doc(documentPath: any): DocumentReference;
    add(data: any): Promise<DocumentReference>;
}
declare class DeleteFieldValueImpl extends FieldValue {
    _toFieldTransform(context: any): null;
    isEqual(other: any): boolean;
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
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */
declare class FieldPath {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    constructor(...fieldNames: any[]);
    _internalPath: FieldPath$1;
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */
    isEqual(other: any): boolean;
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
declare class GeoPoint {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    constructor(latitude: any, longitude: any);
    _lat: any;
    _long: any;
    /**
     * The latitude of this `GeoPoint` instance.
     */
    get latitude(): any;
    /**
     * The longitude of this `GeoPoint` instance.
     */
    get longitude(): any;
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    isEqual(other: any): boolean;
    /** Returns a JSON-serializable representation of this GeoPoint. */
    toJSON(): {
        latitude: any;
        longitude: any;
    };
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    _compareTo(other: any): 1 | -1 | 0;
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
 * The persistence provider included with the full Firestore SDK.
 */
declare class IndexedDbPersistenceProvider {
    enableIndexedDbPersistence(firestore: any, forceOwnership: any): any;
    enableMultiTabIndexedDbPersistence(firestore: any): any;
    clearIndexedDbPersistence(firestore: any): Promise<any>;
}
declare class NumericIncrementFieldValueImpl extends FieldValue {
    constructor(methodName: any, _operand: any);
    _operand: any;
    _toFieldTransform(context: any): FieldTransform;
    isEqual(other: any): boolean;
}
declare class Query {
    constructor(firestore: any, _delegate: any);
    firestore: any;
    _delegate: any;
    _userDataWriter: UserDataWriter;
    where(fieldPath: any, opStr: any, value: any): Query;
    orderBy(fieldPath: any, directionStr: any): Query;
    limit(n: any): Query;
    limitToLast(n: any): Query;
    startAt(...args: any[]): Query;
    startAfter(...args: any[]): Query;
    endBefore(...args: any[]): Query;
    endAt(...args: any[]): Query;
    isEqual(other: any): boolean;
    get(options: any): Promise<QuerySnapshot>;
    onSnapshot(...args: any[]): () => void;
    withConverter(converter: any): Query;
}
declare class ServerTimestampFieldValueImpl extends FieldValue {
    _toFieldTransform(context: any): FieldTransform;
    isEqual(other: any): boolean;
}
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
declare class Timestamp {
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
    static fromDate(date: any): Timestamp;
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    static fromMillis(milliseconds: any): Timestamp;
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
    constructor(seconds: any, nanoseconds: any);
    seconds: any;
    nanoseconds: any;
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
    _compareTo(other: any): 1 | -1 | 0;
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    isEqual(other: any): boolean;
    /** Returns a textual representation of this Timestamp. */
    toString(): string;
    /** Returns a JSON-serializable representation of this Timestamp. */
    toJSON(): {
        seconds: any;
        nanoseconds: any;
    };
    /**
     * Converts this object to a primitive string, which allows Timestamp objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    valueOf(): string;
}
declare class WriteBatch {
    constructor(_delegate: any);
    _delegate: any;
    set(documentRef: any, data: any, options: any): WriteBatch;
    update(documentRef: any, dataOrField: any, value: any, ...moreFieldsAndValues: any[]): WriteBatch;
    delete(documentRef: any): WriteBatch;
    commit(): any;
}
declare class ArrayRemoveFieldValueImpl extends FieldValue {
    constructor(methodName: any, _elements: any);
    _elements: any;
    _toFieldTransform(context: any): FieldTransform;
    isEqual(other: any): boolean;
}
/** A dot-separated path for navigating sub-objects within a document. */
declare class FieldPath$1 extends BasePath {
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    static isValidIdentifier(segment: any): boolean;
    /**
     * The field designating the key of a document.
     */
    static keyField(): FieldPath$1;
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
    static fromServerFormat(path: any): FieldPath$1;
    static emptyPath(): FieldPath$1;
    construct(segments: any, offset: any, length: any): FieldPath$1;
    canonicalString(): any;
    toString(): any;
    /**
     * Returns true if this field references the key of a document.
     */
    isKeyField(): boolean;
}
/**
 * Compat class for Firestore. Exposes Firestore Legacy API, but delegates
 * to the functional API of firestore-exp.
 */
declare class Firestore {
    constructor(databaseIdOrApp: any, _delegate: any, _persistenceProvider: any);
    _delegate: any;
    _persistenceProvider: any;
    INTERNAL: {
        delete: () => any;
    };
    _appCompat: any;
    get _databaseId(): any;
    settings(settingsLiteral: any): void;
    useEmulator(host: any, port: any, options?: {}): void;
    enableNetwork(): any;
    disableNetwork(): any;
    enablePersistence(settings: any): any;
    clearPersistence(): any;
    terminate(): any;
    waitForPendingWrites(): Promise<any>;
    onSnapshotsInSync(arg: any): () => void;
    get app(): any;
    collection(pathString: any): CollectionReference;
    doc(pathString: any): DocumentReference;
    collectionGroup(collectionId: any): Query;
    runTransaction(updateFunction: any): Promise<any>;
    batch(): WriteBatch;
    loadBundle(bundleData: any): void;
    namedQuery(name: any): void;
}
/**
 * A reference to a transaction.
 */
declare class Transaction {
    constructor(_firestore: any, _delegate: any);
    _firestore: any;
    _delegate: any;
    _userDataWriter: UserDataWriter;
    get(documentRef: any): any;
    set(documentRef: any, data: any, options: any): Transaction;
    update(documentRef: any, dataOrField: any, value: any, ...moreFieldsAndValues: any[]): Transaction;
    delete(documentRef: any): Transaction;
}
/**
 * A reference to a particular document in a collection in the database.
 */
declare class DocumentReference {
    static forPath(path: any, firestore: any, converter: any): DocumentReference;
    static forKey(key: any, firestore: any, converter: any): DocumentReference;
    constructor(firestore: any, _delegate: any);
    firestore: any;
    _delegate: any;
    _userDataWriter: UserDataWriter;
    get id(): any;
    get parent(): CollectionReference;
    get path(): any;
    collection(pathString: any): CollectionReference;
    isEqual(other: any): boolean;
    set(value: any, options: any): Promise<any>;
    update(fieldOrUpdateData: any, value: any, ...moreFieldsAndValues: any[]): Promise<any>;
    delete(): Promise<any>;
    onSnapshot(...args: any[]): () => void;
    get(options: any): Promise<DocumentSnapshot>;
    withConverter(converter: any): DocumentReference;
}
declare class DocumentSnapshot {
    constructor(_firestore: any, _delegate: any);
    _firestore: any;
    _delegate: any;
    get ref(): DocumentReference;
    get id(): any;
    get metadata(): any;
    get exists(): any;
    data(options: any): any;
    get(fieldPath: any, options: any): any;
    isEqual(other: any): any;
}
declare class QueryDocumentSnapshot extends DocumentSnapshot {
}
declare class QuerySnapshot {
    constructor(_firestore: any, _delegate: any);
    _firestore: any;
    _delegate: any;
    get query(): Query;
    get metadata(): any;
    get size(): any;
    get empty(): any;
    get docs(): any;
    docChanges(options: any): any;
    forEach(callback: any, thisArg: any): void;
    isEqual(other: any): any;
}
/**
 * Constant used to indicate the LRU garbage collection should be disabled.
 * Set this value as the `cacheSizeBytes` on the settings passed to the
 * `Firestore` instance.
 */
declare const CACHE_SIZE_UNLIMITED: -1;
/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
declare class FirebaseFirestore extends FirebaseFirestore$1 {
    _queue: AsyncQueueImpl;
}
/**
 * Loads a Firestore bundle into the local cache.
 *
 * @param firestore - The `Firestore` instance to load bundles for for.
 * @param bundleData - An object representing the bundle to be loaded. Valid objects are
 *   `ArrayBuffer`, `ReadableStream<Uint8Array>` or `string`.
 *
 * @returns
 *   A `LoadBundleTask` object, which notifies callers with progress updates, and completion
 *   or error events. It can be used as a `Promise<LoadBundleTaskProgress>`.
 */
declare function loadBundle(firestore: any, bundleData: any): LoadBundleTask;
/**
 * Reads a Firestore `Query` from local cache, identified by the given name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once in local
 * cache, use this method to extract a `Query` by name.
 */
declare function namedQuery(firestore: any, name: any): any;
declare function setLogLevel(level: any): void;
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
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */
declare class FieldValue {
    /**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
    constructor(_methodName: any);
    _methodName: any;
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
/** A field path and the TransformOperation to perform upon it. */
declare class FieldTransform {
    constructor(field: any, transform: any);
    field: any;
    transform: any;
}
declare class UserDataWriter extends AbstractUserDataWriter {
    constructor(firestore: any);
    firestore: any;
    convertBytes(bytes: any): Blob;
    convertReference(name: any): DocumentReference;
}
/**
 * Path represents an ordered sequence of string segments.
 */
declare class BasePath {
    static comparator(p1: any, p2: any): 1 | -1 | 0;
    constructor(segments: any, offset: any, length: any);
    segments: any;
    offset: any;
    len: any;
    get length(): any;
    isEqual(other: any): boolean;
    child(nameOrPath: any): any;
    /** The index of one past the last segment of the path. */
    limit(): any;
    popFirst(size: any): any;
    popLast(): any;
    firstSegment(): any;
    lastSegment(): any;
    get(index: any): any;
    isEmpty(): boolean;
    isPrefixOf(other: any): boolean;
    isImmediateParentOf(potentialChild: any): boolean;
    forEach(fn: any): void;
    toArray(): any;
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
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
declare class FirebaseFirestore$1 {
    /** @hideconstructor */
    constructor(databaseIdOrApp: any, authProvider: any);
    type: string;
    _persistenceKey: string;
    _settings: FirestoreSettings;
    _settingsFrozen: boolean;
    _databaseId: DatabaseId;
    _credentials: EmptyCredentialsProvider | FirebaseCredentialsProvider;
    _app: any;
    /**
     * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
     * instance.
     */
    get app(): any;
    get _initialized(): boolean;
    get _terminated(): boolean;
    _setSettings(settings: any): void;
    _getSettings(): FirestoreSettings;
    _freezeSettings(): FirestoreSettings;
    _delete(): Promise<void>;
    _terminateTask: Promise<void> | undefined;
    /** Returns a JSON-serializable representation of this Firestore instance. */
    toJSON(): {
        app: any;
        databaseId: DatabaseId;
        settings: FirestoreSettings;
    };
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    _terminate(): Promise<void>;
}
declare class AsyncQueueImpl {
    tail: Promise<void>;
    retryableOps: any[];
    _isShuttingDown: boolean;
    delayedOperations: any[];
    failure: any;
    operationInProgress: boolean;
    skipNonRestrictedTasks: boolean;
    timerIdsToSkip: any[];
    backoff: ExponentialBackoff;
    visibilityHandler: () => void;
    get isShuttingDown(): boolean;
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    enqueueAndForget(op: any): void;
    enqueueAndForgetEvenWhileRestricted(op: any): void;
    enterRestrictedMode(purgeExistingTasks: any): void;
    enqueue(op: any): Promise<any>;
    enqueueRetryable(op: any): void;
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    retryNextOp(): Promise<void>;
    enqueueInternal(op: any): Promise<any>;
    enqueueAfterDelay(timerId: any, delayMs: any, op: any): DelayedOperation;
    verifyNotFailed(): void;
    verifyOperationInProgress(): void;
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    drain(): Promise<void>;
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    containsDelayedOperation(timerId: any): boolean;
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    runAllDelayedOperationsUntil(lastTimerId: any): Promise<void>;
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    skipDelaysForTimerId(timerId: any): void;
    /** Called once a DelayedOperation is run or canceled. */
    removeDelayedOperation(op: any): void;
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
 * Represents the task of loading a Firestore bundle. It provides progress of bundle
 * loading, as well as task completion and error events.
 *
 * The API is compatible with `Promise<LoadBundleTaskProgress>`.
 */
declare class LoadBundleTask {
    _progressObserver: {};
    _taskCompletionResolver: Deferred;
    _lastProgress: {
        taskState: string;
        totalBytes: number;
        totalDocuments: number;
        bytesLoaded: number;
        documentsLoaded: number;
    };
    /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */
    onProgress(next: any, error: any, complete: any): void;
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    catch(onRejected: any): Promise<any>;
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    then(onFulfilled: any, onRejected: any): Promise<any>;
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */
    private _completeWith;
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */
    private _failWith;
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */
    private _updateProgress;
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
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */
declare class AbstractUserDataWriter {
    convertValue(value: any, serverTimestampBehavior?: string): any;
    convertObject(mapValue: any, serverTimestampBehavior: any): {};
    convertGeoPoint(value: any): GeoPoint;
    convertArray(arrayValue: any, serverTimestampBehavior: any): any;
    convertServerTimestamp(value: any, serverTimestampBehavior: any): any;
    convertTimestamp(value: any): Timestamp;
    convertDocumentKey(name: any, expectedDatabaseId: any): DocumentKey;
}
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied firestore.Settings object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
declare class FirestoreSettings {
    constructor(settings: any);
    host: any;
    ssl: any;
    credentials: any;
    ignoreUndefinedProperties: boolean;
    cacheSizeBytes: any;
    experimentalForceLongPolling: boolean;
    experimentalAutoDetectLongPolling: boolean;
    useFetchStreams: boolean;
    isEqual(other: any): boolean;
}
/** Represents the database ID a Firestore client is associated with. */
declare class DatabaseId {
    constructor(projectId: any, database: any);
    projectId: any;
    database: any;
    get isDefaultDatabase(): boolean;
    isEqual(other: any): boolean;
}
/** A CredentialsProvider that always yields an empty token. */
declare class EmptyCredentialsProvider {
    /**
     * Stores the listener registered with setChangeListener()
     * This isn't actually necessary since the UID never changes, but we use this
     * to verify the listen contract is adhered to in tests.
     */
    changeListener: any;
    getToken(): Promise<null>;
    invalidateToken(): void;
    setChangeListener(asyncQueue: any, changeListener: any): void;
    removeChangeListener(): void;
}
declare class FirebaseCredentialsProvider {
    constructor(authProvider: any);
    /** Tracks the current User. */
    currentUser: User;
    /** Promise that allows blocking on the initialization of Firebase Auth. */
    authDeferred: Deferred;
    /**
     * Counter used to detect if the token changed while a getToken request was
     * outstanding.
     */
    tokenCounter: number;
    forceRefresh: boolean;
    auth: any;
    asyncQueue: any;
    tokenListener: () => void;
    getToken(): any;
    invalidateToken(): void;
    setChangeListener(asyncQueue: any, changeListener: any): void;
    changeListener: any;
    removeChangeListener(): void;
    getUser(): User;
}
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
declare class ExponentialBackoff {
    constructor(queue: any, timerId: any, initialDelayMs?: number, backoffFactor?: number, maxDelayMs?: number);
    queue: any;
    timerId: any;
    initialDelayMs: number;
    backoffFactor: number;
    maxDelayMs: number;
    currentBaseMs: number;
    timerPromise: any;
    /** The last backoff attempt, as epoch milliseconds. */
    lastAttemptTime: number;
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */
    reset(): void;
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    resetToMax(): void;
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    backoffAndRun(op: any): void;
    skipBackoff(): void;
    cancel(): void;
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
    jitterDelayMs(): number;
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
declare class DelayedOperation {
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
    static createAndSchedule(asyncQueue: any, timerId: any, delayMs: any, op: any, removalCallback: any): DelayedOperation;
    constructor(asyncQueue: any, timerId: any, targetTimeMs: any, op: any, removalCallback: any);
    asyncQueue: any;
    timerId: any;
    targetTimeMs: any;
    op: any;
    removalCallback: any;
    deferred: Deferred;
    then: <TResult1 = any, TResult2 = never>(onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    start(delayMs: any): void;
    timerHandle: NodeJS.Timeout | null | undefined;
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
    cancel(reason: any): void;
    handleDelayElapsed(): void;
    clearTimeout(): void;
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
declare class Deferred {
    promise: Promise<any>;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
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
declare class DocumentKey {
    static fromPath(path: any): DocumentKey;
    static fromName(name: any): DocumentKey;
    static comparator(k1: any, k2: any): 1 | -1 | 0;
    static isDocumentKey(path: any): boolean;
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    static fromSegments(segments: any): DocumentKey;
    constructor(path: any);
    path: any;
    /** Returns true if the document is in the specified collectionId. */
    hasCollectionId(collectionId: any): boolean;
    isEqual(other: any): boolean;
    toString(): any;
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
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
declare class User {
    constructor(uid: any);
    uid: any;
    isAuthenticated(): boolean;
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    toKey(): string;
    isEqual(otherUser: any): boolean;
}
declare namespace User {
    const UNAUTHENTICATED: User;
    const GOOGLE_CREDENTIALS: User;
    const FIRST_PARTY: User;
}
export { ArrayUnionFieldValueImpl as A, Blob as B, CollectionReference as C, DeleteFieldValueImpl as D, FieldPath as F, GeoPoint as G, IndexedDbPersistenceProvider as I, NumericIncrementFieldValueImpl as N, Query as Q, ServerTimestampFieldValueImpl as S, Timestamp as T, WriteBatch as W, ArrayRemoveFieldValueImpl as a, FieldPath$1 as b, Firestore as c, Transaction as d, DocumentReference as e, DocumentSnapshot as f, QueryDocumentSnapshot as g, QuerySnapshot as h, CACHE_SIZE_UNLIMITED as i, FirebaseFirestore as j, loadBundle as l, namedQuery as n, setLogLevel as s };
