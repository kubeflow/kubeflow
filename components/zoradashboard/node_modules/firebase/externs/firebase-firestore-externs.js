/**
 * @license Copyright 2018 Google Inc.
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
 * @fileoverview Cloud Firestore API.
 * @externs
 */

/**
 * @namespace firebase.firestore
 * @param {!firebase.app.App=} app
 *
 * @return {!firebase.firestore.Firestore} Firestore
 */
firebase.firestore = function (app) {};

/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use
 * {@link firebase.firestore `firebase.firestore()`}.
 *
 * @interface
 */
firebase.firestore.Firestore = function () {};

/**
 * Specifies custom configurations for your Cloud Firestore instance.
 * You must set these before invoking any other methods.
 *
 * @interface
 */
firebase.firestore.Settings = function () {};

/**
 * Enables the use of `Timestamps` for timestamp fields in `DocumentSnapshots`.
 *
 * Currently, Firestore returns timestamp fields as `Date` but `Date` only
 * supports millisecond precision, which leads to truncation and causes
 * unexpected behavior when using a timestamp from a snapshot as a part
 * of a subsequent query.
 *
 * Setting `timestampsInSnapshots` to `true` will cause Firestore to return
 * `Timestamp` values instead of `Date`, which avoids truncation. Note that you
 * must also change any code that uses `Date` to use `Timestamp` instead.
 *
 * WARNING: In the future, `timestampsInSnapshots: true` will become the
 * default and this option will be removed. You should change your code to
 * use `Timestamp` and opt-in to this new behavior as soon as you can.
 *
 * @type {boolean}
 */
firebase.firestore.Settings.prototype.timestampsInSnapshots;

/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param {string} logLevel
 *   The verbosity you set for activity and error logging. Can be any of
 *   the following values:
 *
 *   <ul>
 *     <li><code>debug</code> for the most verbose logging level, primarily for
 *     dubugging.</li>
 *     <li><code>error</code> to log errors only.</li>
 *     <li><code>silent</code> to turn off logging.</li>
 *   </ul>
 */
firebase.firestore.Firestore.prototype.setLogLevel = function (logLevel) {};

/**
 * Specifies custom settings to be used to configure the `Firestore`
 * instance. Must be set before invoking any other methods.
 *
 * @param {!firebase.firestore.Settings} settings
 *   The settings for your Cloud Firestore instance.
 */
firebase.firestore.Firestore.prototype.settings = function (settings) {};

/**
 * Attempts to enable persistent storage, if possible.
 *
 * Must be called before any other methods (other than settings()).
 *
 * If this fails, enablePersistence() will reject the promise it returns.
 * Note that even after this failure, the firestore instance will remain
 * usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @return {!Promise<void>} A promise that represents
 *   successfully enabling persistent storage.
 */
firebase.firestore.Firestore.prototype.enablePersistence = function () {};

/**
 * Re-enables use of the network for this Firestore instance after a prior
 * call to {@link firebase.firestore.Firestore#disableNetwork
 * `disableNetwork()`}.
 *
 * @return {!Promise<void>} A promise that is resolved once the network has been
 *   enabled.
 */
firebase.firestore.Firestore.prototype.enableNetwork = function () {};

/**
 * Disables network usage for this instance. It can be re-enabled via
 * {@link firebase.firestore.Firestore#enableNetwork `enableNetwork()`}. While
 * the network is disabled, any snapshot listeners or get() calls will return
 * results from cache, and any write operations will be queued until the network
 * is restored.
 *
 * @return {!Promise<void>} A promise that is resolved once the network has been
 *   disabled.
 */
firebase.firestore.Firestore.prototype.disableNetwork = function () {};

/**
 * Gets a `CollectionReference` instance that refers to the collection at
 * the specified path.
 *
 * @param {string} collectionPath
 *   A slash-separated path to a collection.
 *
 * @return {!firebase.firestore.CollectionReference}
 *   The `CollectionReference` instance.
 */
firebase.firestore.Firestore.prototype.collection = function (
  collectionPath
) {};

/**
 * Gets a `DocumentReference` instance that refers to the document at the
 * specified path.
 *
 * @param {string} documentPath
 *   A slash-separated path to a document.
 *
 * @return {!firebase.firestore.DocumentReference}
 *   The `DocumentReference` instance.
 */
firebase.firestore.Firestore.prototype.doc = function (documentPath) {};

/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * @param {function(!firebase.firestore.Transaction)} updateFunction
 *   The function to execute within the transaction context.
 *
 * @return {!Promise}
 *   If the transaction completed successfully or was explicitly aborted
 *   (the `updateFunction` returned a failed promise),
 *   the promise returned by the updateFunction is returned here. Else, if the
 *   transaction failed, a rejected promise with the corresponding failure
 *   error will be returned.
 */
firebase.firestore.Firestore.prototype.runTransaction = function (
  updateFunction
) {};

/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation.
 *
 * @return {!firebase.firestore.WriteBatch}
 *   A `WriteBatch` that can be used to atomically execute multiple writes.
 */
firebase.firestore.Firestore.prototype.batch = function () {};

/**
 * The {@link firebase.app.App app} associated with this `Firestore` service
 * instance.
 *
 * @type {!firebase.app.App}
 */
firebase.firestore.Firestore.prototype.app;

/**
 * An immutable object representing a geo point in Cloud Firestore. The geo
 * point is represented as latitude/longitude pair.
 * @constructor
 *
 * @param {number} latitude
 *   Latitude values are in the range of -90 to 90.
 *
 * @param {number} longitude
 *   Longitude values are in the range of -180 to 180.
 */
firebase.firestore.GeoPoint = function (latitude, longitude) {};

/**
 * The latitude of this GeoPoint instance.
 *
 * @type {number}
 */
firebase.firestore.GeoPoint.prototype.latitude;

/**
 * The longitude of this GeoPoint instance.
 *
 * @type {number}
 */
firebase.firestore.GeoPoint.prototype.longitude;

/**
 * Returns 'true' if this `GeoPoint` is equal to the provided one.
 *
 * @param {!firebase.firestore.GeoPoint} other
 *   The `GeoPoint` to compare against.
 *
 * @return {boolean} 'true' if this `GeoPoint` is equal to the provided one.
 */
firebase.firestore.GeoPoint.prototype.isEqual = function (other) {};

/**
 * An immutable object representing an array of bytes.
 * @interface
 */
firebase.firestore.Blob = function () {};

/**
 * Returns 'true' if this `Blob` is equal to the provided one.
 *
 * @param {!firebase.firestore.Blob} other
 *   The `Blob` to compare against.
 *
 * @return {boolean} 'true' if this `Blob` is equal to the provided one.
 */
firebase.firestore.Blob.prototype.isEqual = function (other) {};

/**
 * Creates a new Blob from the given Base64 string, converting it to bytes.
 *
 * @param {string} base64
 *   The Base64 string used to create the Blob object.
 *
 * @return {!firebase.firestore.Blob}
 *   The Blob created from the Base64 string.
 */
firebase.firestore.Blob.fromBase64String = function (base64) {};

/**
 * Creates a new Blob from the given Uint8Array.
 *
 * @param {!Uint8Array} array
 *   The Uint8Array used to create the Blob object.
 *
 * @return {!firebase.firestore.Blob}
 *   The Blob created from the Uint8Array.
 */
firebase.firestore.Blob.fromUint8Array = function (array) {};

/**
 * Returns the bytes of a Blob as a Base64-encoded string.
 *
 * @return {string}
 *   The Base64-encoded string created from the Blob object.
 */
firebase.firestore.Blob.prototype.toBase64 = function () {};

/**
 * Returns the bytes of a Blob in a new Uint8Array.
 *
 * @return {!Uint8Array}
 *   The Uint8Array created from the Blob object.
 */
firebase.firestore.Blob.prototype.toUint8Array = function () {};

/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a
 * transaction's `updateFunction` provides the methods to read and write data
 * within the transaction context. See `Firestore.runTransaction()`.
 * @interface
 */
firebase.firestore.Transaction = function () {};

/**
 * Reads the document referenced by the provided `DocumentReference.`
 *
 * @param {!firebase.firestore.DocumentReference} documentRef
 *   A reference to the document to be retrieved.
 *
 * @return {!Promise<!firebase.firestore.DocumentSnapshot>}
 *   A promise of the read data in a `DocumentSnapshot`.
 */
firebase.firestore.Transaction.prototype.get = function (documentRef) {};

/**
 * Writes to the document referred to by the provided `DocumentReference`.
 * If the document does not exist yet, it will be created. If you pass
 * options, the provided data can be merged into the existing document.
 *
 * @param {!firebase.firestore.DocumentReference} documentRef
 *   A reference to the document to be created.
 *
 * @param {!Object} data
 *   An object of the fields and values for the document.
 *
 * @param {!firebase.firestore.SetOptions=} options
 *   An object to configure the set behavior. Pass `{merge: true}` to only
 *   replace the values specified in the data argument. Fields omitted
 *   will remain untouched.
 *
 * @return {!firebase.firestore.Transaction}
 *   This `Transaction` instance. Used for chaining method calls.
 */
firebase.firestore.Transaction.prototype.set = function (
  documentRef,
  data,
  options
) {};

/**
 * Updates fields in the document referred to by this `DocumentReference`.
 * The update will fail if applied to a document that does not exist.
 *
 * Nested fields can be updated by providing dot-separated field path strings
 * or by providing FieldPath objects.
 *
 * @param {!firebase.firestore.DocumentReference} documentRef
 *   A reference to the document to be updated.
 *
 * @param {...*} var_args
 *   Either an object containing all of the fields and values to update, or a
 *   series of arguments alternating between fields (as string or
 *   {@link firebase.firestore.FieldPath} objects) and values.
 *
 * @return {!firebase.firestore.Transaction}
 *   This `Transaction` instance. Used for chaining method calls.
 */
firebase.firestore.Transaction.prototype.update = function (
  documentRef,
  var_args
) {};

/**
 * Deletes the document referred to by the provided `DocumentReference`.
 *
 * @param {!firebase.firestore.DocumentReference} documentRef
 *   A reference to the document to be deleted.
 *
 * @return {!firebase.firestore.Transaction}
 *   This `Transaction` instance. Used for chaining method calls.
 */
firebase.firestore.Transaction.prototype.delete = function (documentRef) {};

/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling the `Firestore.batch()`
 * function. It provides methods for adding writes to the write batch. None of
 * the writes are committed (or visible locally) until `WriteBatch.commit()`
 * is called.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 * @interface
 */
firebase.firestore.WriteBatch = function () {};

/**
 * Writes to the document referred to by the provided `DocumentReference`.
 * If the document does not exist yet, it will be created. If you pass
 * options, the provided data can be merged into the existing document.
 *
 * @param {!firebase.firestore.DocumentReference} documentRef
 *   A reference to the document to be created.
 *
 * @param {!Object} data
 *   An object of the fields and values for the document.
 *
 * @param {!firebase.firestore.SetOptions=} options
 *   An object to configure the set behavior. Pass `{merge: true}` to only
 *   replace the values specified in the data argument. Fields omitted
 *   will remain untouched.
 *
 * @return {!firebase.firestore.WriteBatch}
 *   This `WriteBatch` instance. Used for chaining method calls.
 */
firebase.firestore.WriteBatch.prototype.set = function (
  documentRef,
  data,
  options
) {};

/**
 * Updates fields in the document referred to by this `DocumentReference`.
 * The update will fail if applied to a document that does not exist.
 *
 * Nested fields can be updated by providing dot-separated field path strings
 * or by providing FieldPath objects.
 *
 * @param {!firebase.firestore.DocumentReference} documentRef
 *   A reference to the document to be updated.
 *
 * @param {...*} var_args
 *   Either an object containing all of the fields and values to update, or a
 *   series of arguments alternating between fields (as string or
 *   {@link firebase.firestore.FieldPath} objects) and values.
 *
 * @return {!firebase.firestore.WriteBatch}
 *   This `WriteBatch` instance. Used for chaining method calls.
 */
firebase.firestore.WriteBatch.prototype.update = function (
  documentRef,
  var_args
) {};

/**
 * Deletes the document referred to by the provided `DocumentReference`.
 *
 * @param {!firebase.firestore.DocumentReference} documentRef
 *   A reference to the document to be deleted.
 *
 * @return {!firebase.firestore.WriteBatch}
 *   This `WriteBatch` instance. Used for chaining method calls.
 */
firebase.firestore.WriteBatch.prototype.delete = function (documentRef) {};

/**
 * Commits all of the writes in this write batch as a single atomic unit.
 *
 * @return {!Promise<void>}
 *   A promise that resolves once all of the writes in the batch have been
 *   successfully written to the backend as an atomic unit. Note that it won't
 *   resolve while you're offline.
 */
firebase.firestore.WriteBatch.prototype.commit = function () {};

/**
 * An options object that configures the behavior of `set()` calls in
 * {@link firebase.firestore.DocumentReference#set DocumentReference}, {@link
 * firebase.firestore.WriteBatch#set WriteBatch} and {@link
 * firebase.firestore.Transaction#set Transaction}. These calls can be
 * configured to perform granular merges instead of overwriting the target
 * documents in their entirety by providing a `SetOptions` with `merge: true`.
 * @interface
 */
firebase.firestore.SetOptions = function () {};

/**
 * Changes the behavior of a set() call to only replace the values specified
 * in its data argument. Fields omitted from the set() call remain untouched.
 *
 * @type {boolean}
 */
firebase.firestore.SetOptions.prototype.merge;

/**
 * Changes the behavior of set() calls to only replace the specified field
 * paths. Any field path that is not specified is ignored and remains
 * untouched.
 *
 * @type {Array<string>|Array<firebase.firestore.FieldPath>}
 */
firebase.firestore.SetOptions.prototype.mergeFields;

/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist. A `DocumentReference` can
 * also be used to create a `CollectionReference` to a subcollection.
 * @interface
 */
firebase.firestore.DocumentReference = function () {};

/**
 * The document's identifier within its collection.
 * @type {string}
 */
firebase.firestore.DocumentReference.prototype.id;

/**
 * The {@link firebase.firestore.Firestore} the document is in.
 * This is useful for performing transactions, for example.
 * @type {!firebase.firestore.Firestore}
 */
firebase.firestore.DocumentReference.prototype.firestore;

/**
 * The Collection this `DocumentReference` belongs to.
 * @type {!firebase.firestore.CollectionReference}
 */
firebase.firestore.DocumentReference.prototype.parent;

/**
 * Gets a `CollectionReference` instance that refers to the collection at
 * the specified path.
 *
 * @param {string} collectionPath
 *   A slash-separated path to a collection.
 *
 * @return {!firebase.firestore.CollectionReference}
 *   The `CollectionReference` instance.
 */
firebase.firestore.DocumentReference.prototype.collection = function (
  collectionPath
) {};

/**
 * Writes to the document referred to by this `DocumentReference`.
 * If the document does not exist yet, it will be created. If you pass
 * options, the provided data can be merged into the existing document.
 *
 * @param {!Object} data
 *   An object of the fields and values for the document.
 *
 * @param {!firebase.firestore.SetOptions=} options
 *   An object to configure the set behavior. Pass `{merge: true}` to only
 *   replace the values specified in the data argument. Fields omitted
 *   will remain untouched.
 *
 * @return {!Promise<void>}
 *   A promise that resolves once the data has been successfully written to the
 *   backend. (Note that it won't resolve while you're offline).
 */
firebase.firestore.DocumentReference.prototype.set = function (
  data,
  options
) {};

/**
 * Updates fields in the document referred to by this `DocumentReference`.
 * The update will fail if applied to a document that does not exist.
 *
 * Nested fields can be updated by providing dot-separated field path strings
 * or by providing FieldPath objects.
 *
 * @param {...*} var_args
 *   Either an object containing all of the fields and values to update, or a
 *   series of arguments alternating between fields (as string or
 *   {@link firebase.firestore.FieldPath} objects) and values.
 *
 * @return {!Promise<void>}
 *   A promise that resolves once the data has been successfully written
 *   to the backend (Note that it won't resolve while you're offline).
 */
firebase.firestore.DocumentReference.prototype.update = function (var_args) {};

/**
 * Deletes the document referred to by this `DocumentReference`.
 *
 * @return {!Promise<void>}
 *   A promise that resolves once the document has been successfully
 *   deleted from the backend (Note that it won't resolve while you're offline).
 */
firebase.firestore.DocumentReference.prototype.delete = function () {};

/**
 * Reads the document referred to by this `DocumentReference`.
 *
 * @param {!firebase.firestore.GetOptions=} options An options object to
 *   configure how the data is retrieved.
 *
 * Note: When using the default behavior, `get()` attempts to provide up-to-date
 * data when possible by waiting for data from the server, but may return cached
 * data or fail if you are offline and the server cannot be reached.
 *
 * @return {!Promise<!firebase.firestore.DocumentSnapshot>}
 *   A promise that resolves with a `DocumentSnapshot` containing the current
 *   document contents.
 */
firebase.firestore.DocumentReference.prototype.get = function (options) {};

/**
 * Attaches a listener for DocumentSnapshot events. You may either pass
 * individual `onNext` and `onError` callbacks or pass a single `observer`
 * object with `next` and `error` callbacks. The listener can be cancelled by
 * calling the function that is returned when `onSnapshot` is called.
 *
 * @param {!firebase.firestore.SnapshotListenOptions|!Object|
           function(!firebase.firestore.DocumentSnapshot)}
 *   optionsOrObserverOrOnNext This can be an observer object or an onNext
 *   function callback. It can also be an options object containing
 *   { includeMetadataChanges: true } to opt into events even when only metadata
 *   changed.
 * @param {!Object|function(!firebase.firestore.DocumentSnapshot)|
 *         function(!Error)}
 *   observerOrOnNextOrOnError If you provided options, this will be an observer
 *   object or your onNext callback. Else, it is an optional onError callback.
 * @param {function(!Error)=} onError If you didn't provide
 *   options and didn't use an observer object, this is the optional onError
 *   callback.
 * @return {!function()} An unsubscribe function that can be called to cancel
 *   the snapshot listener.
 */
firebase.firestore.DocumentReference.prototype.onSnapshot = function (
  optionsOrObserverOrOnNext,
  observerOrOnNextOrOnError,
  onError
) {};

/**
 * Options that configure how data is retrieved from a `DocumentSnapshot`
 * (e.g. the desired behavior for server timestamps that have not yet been set
 * to their final value).
 * @interface
 */
firebase.firestore.SnapshotOptions = function () {};

/**
 * If set, controls the return value for server timestamps that have not yet
 * been set to their final value.
 *
 * By specifying 'estimate', pending server timestamps return an estimate
 * based on the local clock. This estimate will differ from the final value
 * and cause these values to change once the server result becomes available.
 *
 * By specifying 'previous', pending timestamps will be ignored and return
 * their previous value instead.
 *
 * If omitted or set to 'none', `null` will be returned by default until the
 * server value becomes available.
 *
 * @type {string|undefined}
 */
firebase.firestore.SnapshotOptions.prototype.serverTimestamps;

/**
 * Options that configure how data is retrieved for a `get()` request.
 * @interface
 */
firebase.firestore.GetOptions = function () {};

/**
 * Describes whether a `get()` call in Firestore should return data from the
 * server or from the cache.
 *
 * Setting to `default` (or not setting at all), causes Firestore to try to
 * retrieve an up-to-date (server-retrieved) snapshot, but fall back to
 * returning cached data if the server can't be reached.
 *
 * Setting to `server` causes Firestore to avoid the cache, generating an
 * error if the server cannot be reached. Note that the cache will still be
 * updated if the server request succeeds. Latency-compensation still takes
 * effect and any pending write operations will be visible in the
 * returned data (merged into the server-provided data).
 *
 * Setting to `cache` causes Firestore to immediately return a value from the
 * cache, bypassing the server completely. The returned value
 * may be stale with respect to the value on the server. If there is no cached
 * data, `DocumentReference.get()` will return an error and
 * `QuerySnapshot.get()` will return an empty `QuerySnapshot`.
 *
 * @type {string|undefined}
 */
firebase.firestore.GetOptions.prototype.source;

/**
 * Metadata about a snapshot, describing the state of the snapshot.
 * @interface
 */
firebase.firestore.SnapshotMetadata = function () {};

/**
 * True if the snapshot was created from cached data rather than guaranteed
 * up-to-date server data. If your listener has opted into metadata updates
 * (via `SnapshotListenOptions`)
 * you will receive another snapshot with `fromCache` set to false once
 * the client has received up-to-date data from the backend.
 *
 * @type {boolean}
 */
firebase.firestore.SnapshotMetadata.prototype.fromCache;

/**
 * True if the snapshot includes local writes (`set()` or
 * `update()` calls) that haven't been committed to the backend yet.
 *
 * If your listener has opted into metadata updates via
 * `SnapshotListenOptions`, you receive another
 * snapshot with `hasPendingWrites` set to false once the writes have been
 * committed to the backend.
 *
 * @type {boolean}
 */
firebase.firestore.SnapshotMetadata.prototype.hasPendingWrites;

/**
 * Returns 'true' if this `SnapshotMetadata` is equal to the provided one.
 *
 * @param {!firebase.firestore.SnapshotMetadata} other
 *   The `SnapshotMetadata` to compare against.
 *
 * @return {boolean}
 *   'true' if this `SnapshotMetadata` is equal to the provided one.
 */
firebase.firestore.SnapshotMetadata.prototype.isEqual = function (other) {};

/**
 * A `DocumentSnapshot` contains data read from a document in your Cloud
 * Firestore database. The data can be extracted with `.data()` or
 * `.get(<field>)` to get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists` property to
 * explicitly verify a document's existence.
 *
 * @constructor
 */
firebase.firestore.DocumentSnapshot = function () {};

/**
 * Property of the `DocumentSnapshot` that signals whether or not the data
 * exists. True if the document exists.
 *
 * @type {boolean}
 */
firebase.firestore.DocumentSnapshot.prototype.exists;

/**
 * The `DocumentReference` for the document included in the `DocumentSnapshot`.
 *
 * @type {!firebase.firestore.DocumentReference}
 */
firebase.firestore.DocumentSnapshot.prototype.ref;

/**
 * Property of the `DocumentSnapshot` that provides the document's ID.
 *
 * @type {string}
 */
firebase.firestore.DocumentSnapshot.prototype.id;

/**
 *  Metadata about the `DocumentSnapshot`, including information about its
 *  source and local modifications.
 *
 * @type {!firebase.firestore.SnapshotMetadata}
 */
firebase.firestore.DocumentSnapshot.prototype.metadata;

/**
 * An object containing all the data in a document.
 * @typedef {Object}
 */
firebase.firestore.DocumentData;

/**
 * Retrieves all fields in the document as an Object. Returns `undefined` if
 * the document doesn't exist.
 *
 * By default, `FieldValue.serverTimestamp()` values that have not yet been
 * set to their final value will be returned as `null`. You can override
 * this by passing an options object.
 *
 * @param {!firebase.firestore.SnapshotOptions=} options An options object to
 *   configure how data is retrieved from the snapshot (e.g. the desired
 *   behavior for server timestamps that have not yet been set to their final
 *   value).
 *
 * @return {(!firebase.firestore.DocumentData|undefined)}
 *   An object containing all fields in the specified document or 'undefined'
 *   if the document doesn't exist.
 */
firebase.firestore.DocumentSnapshot.prototype.data = function (options) {};

/**
 * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
 * document or field doesn't exist.
 *
 * By default, a `FieldValue.serverTimestamp()` that has not yet been set to
 * its final value will be returned as `null`. You can override this by
 * passing an options object.
 *
 * @param {(string|!firebase.firestore.FieldPath)} fieldPath
 *   The path (e.g. 'foo' or 'foo.bar') to a specific field.
 *
 * @param {!firebase.firestore.SnapshotOptions=} options An options object to
 *   configure how the field is retrieved  from the snapshot (e.g. the desired
 *   behavior for server timestamps that have not yet been set to their final
 *   value).
 *
 * @return {(*|undefined)}
 *   The data at the specified field location or undefined if no such field
 *   exists in the document.
 */
firebase.firestore.DocumentSnapshot.prototype.get = function (
  fieldPath,
  options
) {};

/**
 * Returns 'true' if this `DocumentSnapshot` is equal to the provided one.
 *
 * @param {!firebase.firestore.DocumentSnapshot} other
 *   The `DocumentSnapshot` to compare against.
 *
 * @return {boolean}
 *   'true' if this `DocumentSnapshot` is equal to the provided one.
 */
firebase.firestore.DocumentSnapshot.prototype.isEqual = function (other) {};

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * `undefined`.
 *
 * @constructor
 * @extends {firebase.firestore.DocumentSnapshot}
 */
firebase.firestore.QueryDocumentSnapshot = function () {};

/**
 * Retrieves all fields in the document as an Object.
 *
 * By default, `FieldValue.serverTimestamp()` values that have not yet been
 * set to their final value will be returned as `null`. You can override
 * this by passing an options object.
 *
 * @override
 *
 * @param {!firebase.firestore.SnapshotOptions=} options An options object to
 *   configure how data is retrieved from the snapshot (e.g. the desired
 *   behavior for server timestamps that have not yet been set to their
 *   final value).
 *
 * @return {!firebase.firestore.DocumentData}
 *   An object containing all fields in the specified document.
 */
firebase.firestore.QueryDocumentSnapshot.prototype.data = function (options) {};

/**
 * Options for use with `Query.onSnapshot() to control the behavior of the
 * snapshot listener.
 * @interface
 *
 */
firebase.firestore.SnapshotListenOptions = function () {};

/**
 * Raise an event even if only metadata of the query or document
 * changes. Default is false.
 *
 * @type {boolean}
 */
firebase.firestore.SnapshotListenOptions.prototype.includeMetadataChanges;

/**
 * A `Query` refers to a Query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 * @constructor
 */
firebase.firestore.Query = function () {};

/**
 * The `Firestore` for the Cloud Firestore database (useful for performing
 * transactions, etc.).
 *
 * @type {!firebase.firestore.Firestore}
 */
firebase.firestore.Query.prototype.firestore;

/**
 * Creates a new query that returns only documents that include the specified
 * fields and where the values satisfy the constraints provided.
 *
 * @param {(string|!firebase.firestore.FieldPath)} fieldPath
 *   The path to compare.
 *
 * @param {string} opStr
 *   The operation string (e.g "<", "<=", "==", ">", ">=").
 *
 * @param {*} value
 *   The value for comparison.
 *
 * @return {!firebase.firestore.Query}
 *   The created query.
 */
firebase.firestore.Query.prototype.where = function (
  fieldPath,
  opStr,
  value
) {};

/**
 * Creates a new query where the results are sorted by the
 * specified field, in descendin or ascending order.
 *
 * @param {(string|!firebase.firestore.FieldPath)} fieldPath
 *   The field to sort by.
 *
 * @param {string=} directionStr
 *   Optional direction to sort by (`asc` or `desc`). If not specified, the
 *   default order is ascending.
 *
 * @return {!firebase.firestore.Query}
 *   The created query.
 */
firebase.firestore.Query.prototype.orderBy = function (
  fieldPath,
  directionStr
) {};

/**
 * Creates a new query where the results are limited to the specified number of
 * documents.
 *
 * @param {number} limit
 *   The maximum number of items to return.
 *
 * @return {!firebase.firestore.Query}
 *   The created query.
 */
firebase.firestore.Query.prototype.limit = function (limit) {};

/**
 * Creates a new query where the results start at the provided document
 * (inclusive). The starting position is relative to the order of the query.
 * The document must contain all of the fields provided in the `orderBy` of
 * the query.
 *
 * @param {...*} snapshotOrVarArgs
 *   The snapshot of the document you want the query to start at or
 *   the field values to start this query at, in order of the query's order by.
 *
 * @return {!firebase.firestore.Query}
 *   The created query.
 */
firebase.firestore.Query.prototype.startAt = function (snapshotOrVarArgs) {};

/**
 * Creates a new query where the results start after the provided document
 * (exclusive). The starting position is relative to the order of the query.
 * The document must contain all of the fields provided in the `orderBy` of
 * this query.
 *
 * @param {...*} snapshotOrVarArgs
 *   The snapshot of the document to start after or
 *   the field values to start this query after, in order of the query's order
 *   by.
 *
 * @return {!firebase.firestore.Query}
 *   The created query.
 */
firebase.firestore.Query.prototype.startAfter = function (snapshotOrVarArgs) {};

/**
 * Creates a new query where the results end before the provided document
 * (exclusive). The end position is relative to the order of the query. The
 * document must contain all of the fields provided in the `orderBy` of this
 * query.
 *
 * @param {...*} snapshotOrVarArgs
 *   The snapshot of the document the query results should end before or
 *   the field values to end this query before, in order of the query's order
 *   by.
 *
 * @return {!firebase.firestore.Query}
 *   The created query.
 */
firebase.firestore.Query.prototype.endBefore = function (snapshotOrVarArgs) {};

/**
 * Creates a new query where the results end at the provided document
 * (inclusive). The end position is relative to the order of the query. The
 * document must contain all of the fields provided in the `orderBy` of this
 * query.
 *
 * @param {...*} snapshotOrVarArgs
 *   The snapshot of the document the query results should end at or
 *   the field values to end this query at, in order of the query's order by.
 *
 * @return {!firebase.firestore.Query}
 *   The created query.
 */
firebase.firestore.Query.prototype.endAt = function (snapshotOrVarArgs) {};

/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * @param {!firebase.firestore.GetOptions=} options An options object to
 *   configure how the data is retrieved.
 *
 * @return {!firebase.firestore.QuerySnapshot}
 *   A promise that will be resolved with the results of the query.
 */
firebase.firestore.Query.prototype.get = function (options) {};

/**
 * Attaches a listener for `QuerySnapshot` events. You may either pass
 * individual `onNext` and `onError` callbacks or pass a single observer
 * object with `next` and `error` callbacks. The listener can be cancelled by
 * calling the function that is returned when `onSnapshot` is called.
 *
 * NOTE: Although an `onCompletion` callback can be provided, it will
 * never be called because the snapshot stream is never-ending.
 *
 * @param {!firebase.firestore.SnapshotListenOptions|!Object|
 *         function(!firebase.firestore.DocumentSnapshot)}
 *   optionsOrObserverOrOnNext This can be an observer object or an onNext
 *   function callback. It can also be an options object containing
 *   { includeMetadataChanges: true } to opt into events even when only metadata
 *   changed.
 * @param {!Object|function(!firebase.firestore.DocumentSnapshot)|
 *         function(!Error)}
 *   observerOrOnNextOrOnError If you provided options, this will be an observer
 *   object or your onNext callback. Else, it is an optional onError callback.
 * @param {function(!Error)=} onError If you didn't provide
 *   options and didn't use an observer object, this is the optional onError
 *   callback.
 * @return {!function()} An unsubscribe function that can be called to cancel
 *   the snapshot listener.
 */
firebase.firestore.Query.prototype.onSnapshot = function (
  optionsOrObserverOrOnNext,
  observerOrOnNextOrOnError,
  onError
) {};

/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 * @interface
 */
firebase.firestore.QuerySnapshot = function () {};

/**
 * The query you called `get` or `onSnapshot` on to get the `QuerySnapshot`.
 * @type {!firebase.firestore.Query}
 */
firebase.firestore.QuerySnapshot.prototype.query;

/**
 * Metadata about this snapshot, concerning its source and if it has local
 * modifications.
 * @type {!firebase.firestore.SnapshotMetadata}
 */
firebase.firestore.QuerySnapshot.prototype.metadata;

/**
 * Returns an array of the document changes since the last snapshot. If this
 * is the first snapshot, all documents will be in the list as "added" changes.
 *
 * @param {firebase.firestore.SnapshotOptions=} options Options that control
 * whether metadata-only changes (i.e. only `DocumentSnapshot.metadata` changed)
 * should be included.
 */
firebase.firestore.QuerySnapshot.prototype.docChanges = function (options) {};

/**
 * An array of all the documents in the `QuerySnapshot`.
 * @type {!Array<!firebase.firestore.QueryDocumentSnapshot>}
 */
firebase.firestore.QuerySnapshot.prototype.docs;

/**
 * The number of documents in the `QuerySnapshot`.
 * @type {number}
 */
firebase.firestore.QuerySnapshot.prototype.size;

/**
 * True if there are no documents in the `QuerySnapshot`.
 * @type {boolean}
 */
firebase.firestore.QuerySnapshot.prototype.empty;

/**
 * Enumerates all of the documents in the `QuerySnapshot`.
 *
 * @param {function(!firebase.firestore.QueryDocumentSnapshot)} callback
 * @param {*=} thisArg
 *   The `this` binding for the callback.
 */
firebase.firestore.QuerySnapshot.prototype.forEach = function (
  callback,
  thisArg
) {};

/**
 * Returns 'true' if this `QuerySnapshot` is equal to the provided one.
 *
 * @param {!firebase.firestore.QuerySnapshot} other
 *   The `QuerySnapshot` to compare against.
 *
 * @return {boolean}
 *   'true' if this `QuerySnapshot` is equal to the provided one.
 */
firebase.firestore.QuerySnapshot.prototype.isEqual = function (other) {};

/**
 * A `DocumentChange` represents a change to a document matching a query.
 * It contains the document affected and the type of change that occurred.
 * @interface
 */
firebase.firestore.DocumentChange = function () {};

/**
 * The type of change that occurred.
 *
 * Possible values are 'added', 'modified', or 'removed'.
 * @type {string}
 */
firebase.firestore.DocumentChange.prototype.type;

/**
 * The document affected by this change.
 * @type {!firebase.firestore.QueryDocumentSnapshot}
 */
firebase.firestore.DocumentChange.prototype.doc;

/**
 * The index of the changed document in the result set immediately prior to
 * this `DocumentChange` (i.e. supposing that all prior `DocumentChange` objects
 * have been applied). Is -1 for 'added' events.
 * @type {number}
 */
firebase.firestore.DocumentChange.prototype.oldIndex;

/**
 * The index of the changed document in the result set immediately after
 * this `DocumentChange` (i.e. supposing that all prior `DocumentChange`
 * objects and the current `DocumentChange` object have been applied).
 * Is -1 for 'removed' events.
 * @type {number}
 */
firebase.firestore.DocumentChange.prototype.newIndex;

/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using the methods
 * inherited from `Query`).
 * @constructor
 * @extends {firebase.firestore.Query}
 */
firebase.firestore.CollectionReference = function () {};

/**
 * The collection's identifier.
 *
 * @type {string}
 */
firebase.firestore.CollectionReference.prototype.id;

/**
 * A reference to the containing `DocumentReference` if this is a subcollection.
 * If this isn't a subcollection, the reference is null.
 *
 * @type {?firebase.firestore.DocumentReference}
 */
firebase.firestore.CollectionReference.prototype.parent;

/**
 * Gets a `DocumentReference` for the document within the collection at the
 * specified path. If no path is specified, an automatically-generated
 * unique ID will be used for the returned `DocumentReference`.
 *
 * @param {string=} documentPath
 *   A slash-separated path to a document.
 *
 * @return {!firebase.firestore.DocumentReference}
 */
firebase.firestore.CollectionReference.prototype.doc = function (
  documentPath
) {};

/**
 * Adds a new document to this collection with the specified data, assigning
 * it a document ID automatically.
 *
 * @param {!firebase.firestore.DocumentData} data
 * @return {!Promise<!firebase.firestore.DocumentReference>}
 *   A Promise that resolves with a `DocumentReference` pointing to the newly
 *   created document after it has been written to the backend.
 */
firebase.firestore.CollectionReference.prototype.add = function (data) {};

/**
 * Returns 'true' if this `CollectionReference` is equal to the provided one.
 *
 * @param {!firebase.firestore.CollectionReference} other
 *   The `CollectionReference` to compare against.
 *
 * @return {boolean}
 *   'true' if this `CollectionReference` is equal to the provided one.
 */
firebase.firestore.CollectionReference.prototype.isEqual = function (other) {};

/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 * @interface
 */
firebase.firestore.FieldValue = function () {};

/**
 * Returns a sentinel used with `set()` or `update()` to include a
 * server-generated timestamp in the written data.
 * @return {!firebase.firestore.FieldValue}
 */
firebase.firestore.FieldValue.serverTimestamp = function () {};

/**
 * Returns a sentinel for use with `update()` to mark a field for deletion.
 * @return {!firebase.firestore.FieldValue}
 */
firebase.firestore.FieldValue.delete = function () {};

/**
 * Returns 'true' if this `FieldValue` is equal to the provided one.
 *
 * @param {!firebase.firestore.FieldValue} other
 *   The `FieldValue` to compare against.
 *
 * @return {boolean}
 *   'true' if this `FieldValue` is equal to the provided one.
 */
firebase.firestore.FieldValue.prototype.isEqual = function (other) {};

/**
 * A FieldPath refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a FieldPath by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 *
 * @param {...*} var_args
 *   A list of field names.
 *
 * @constructor
 */
firebase.firestore.FieldPath = function (var_args) {};

/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 *
 * @return {!firebase.firestore.FieldPath}
 */
firebase.firestore.FieldPath.documentId = function () {};

/**
 * Returns 'true' if this `FieldPath` is equal to the provided one.
 *
 * @param {!firebase.firestore.FieldPath} other
 *   The `FieldPath` to compare against.
 *
 * @return {boolean}
 *   'true' if this `FieldPath` is equal to the provided one.
 */
firebase.firestore.FieldPath.prototype.isEqual = function (other) {};

/**
 * The set of Cloud Firestore status codes. These status codes are also exposed
 * by [gRPC](https://github.com/grpc/grpc/blob/master/doc/statuscodes.md).
 *
 * Possible values:
 * - `cancelled`: The operation was cancelled (typically by the caller).
 * - `unknown`: Unknown error or an error from a different error domain.
 * - `invalid-argument`: Client specified an invalid argument. Note that this
 *   differs from `failed-precondition`. `invalid-argument` indicates
 *   arguments that are problematic regardless of the state of the system
 *   (e.g. an invalid field name).
 * - `deadline-exceeded`: Deadline expired before operation could complete.
 *   For operations that change the state of the system, this error may be
 *   returned even if the operation has completed successfully. For example,
 *   a successful response from a server could have been delayed long enough
 *   for the deadline to expire.
 * - `not-found`: Some requested document was not found.
 * - `already-exists`: Some document that we attempted to create already
 *   exists.
 * - `permission-denied`: The caller does not have permission to execute the
 *   specified operation.
 * - `resource-exhausted`: Some resource has been exhausted, perhaps a
 *   per-user quota, or perhaps the entire file system is out of space.
 * - `failed-precondition`: Operation was rejected because the system is not
 *   in a state required for the operation`s execution.
 * - `aborted`: The operation was aborted, typically due to a concurrency
 *   issue like transaction aborts, etc.
 * - `out-of-range`: Operation was attempted past the valid range.
 * - `unimplemented`: Operation is not implemented or not supported/enabled.
 * - `internal`: Internal errors. Means some invariants expected by
 *   underlying system has been broken. If you see one of these errors,
 *   something is very broken.
 * - `unavailable`: The service is currently unavailable. This is most likely
 *   a transient condition and may be corrected by retrying with a backoff.
 * - `data-loss`: Unrecoverable data loss or corruption.
 * - `unauthenticated`: The request does not have valid authentication
 *   credentials for the operation.
 * @interface
 */
firebase.firestore.FirestoreError = function () {};

/**
 * A Timestamp represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * Timestamps are encoded using the Proleptic Gregorian Calendar, which extends
 * the Gregorian calendar backwards to year one. Timestamps assume all
 * minutes are 60 seconds long, i.e. leap seconds are "smeared" so that no leap
 * second table is needed for interpretation. Possible timestamp values range
 * from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z.
 *
 * @see https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto
 *
 * @param {number} seconds The number of seconds of UTC time since Unix epoch
 *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
 *     9999-12-31T23:59:59Z inclusive.
 * @param {number} nanoseconds The non-negative fractions of a second at
 *     nanosecond resolution. Negative second values with fractions must
 *     still have non-negative nanoseconds values that count forward in time.
 *     Must be from 0 to 999,999,999 inclusive.
 *
 * @constructor
 */
firebase.firestore.Timestamp = function (seconds, nanoseconds) {};

/**
 * Get the current time as a Timestamp object.
 *
 * @return {!firebase.firestore.Timestamp} a new Timestamp.
 */
firebase.firestore.Timestamp.now = function () {};

/**
 * Creates a new timestamp from the given date.
 *
 * @param {!Date} date The date to initialize the `Timestamp` from.
 * @return {!firebase.firestore.Timestamp} A new `Timestamp` representing
 *     the same point in time as the given date.
 */
firebase.firestore.Timestamp.fromDate = function (date) {};

/**
 * Creates a new timestamp from the given number of milliseconds.
 *
 * @param {number} milliseconds Number of milliseconds since Unix epoch
 *     1970-01-01T00:00:00Z.
 * @return {!firebase.firestore.Timestamp} A new `Timestamp` representing the
 *     same point in time as the given number of milliseconds.
 */
firebase.firestore.Timestamp.fromMillis = function (milliseconds) {};

/**
 * Convert a Timestamp to a JavaScript `Date` object. This conversion causes
 * a loss of precision since `Date` objects only support millisecond precision.
 *
 * @return {!Date} a JavaScript date object.
 */
firebase.firestore.Timestamp.prototype.toDate = function () {};

/**
 * Convert a timestamp to a numeric timestamp (in milliseconds since epoch).
 * This operation causes a loss of precision.
 *
 * @return {!number} a numeric timestamp.
 */
firebase.firestore.Timestamp.prototype.toMillis = function () {};
