/**
 * @license Copyright 2017 Google Inc.
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
 * @fileoverview Firebase Storage API.
 * @externs
 */

/**
 * Gets the {@link firebase.storage.Storage `Storage`} service for the default
 * app or a given app.
 *
 * `firebase.storage()` can be called with no arguments to access the default
 * app's {@link firebase.storage.Storage `Storage`} service or as
 * `firebase.storage(app)` to access the
 * {@link firebase.storage.Storage `Storage`} service associated with a
 * specific app.
 *
 * @example
 * // Get the Storage service for the default app
 * var defaultStorage = firebase.storage();
 *
 * @example
 * // Get the Storage service for a given app
 * var otherStorage = firebase.storage(otherApp);
 *
 * @namespace
 * @param {!firebase.app.App=} app The app to create a storage service for.
 *     If not passed, uses the default app.
 *
 * @return {!firebase.storage.Storage}
 */
firebase.storage = function (app) {};

/**
 * Gets the {@link firebase.storage.Storage `Storage`} service for the current
 * app, optionally initialized with a custom storage bucket.
 *
 * @example
 * var storage = app.storage();
 * // The above is shorthand for:
 * // var storage = firebase.storage(app);
 *
 * @example
 * var storage = app.storage("gs://your-app.appspot.com");
 *
 * @param {string=} url The gs:// url to your Firebase Storage Bucket.
 *     If not passed, uses the app's default Storage Bucket.
 * @return {!firebase.storage.Storage}
 */
firebase.app.App.prototype.storage = function (url) {};

/**
 * The Firebase Storage service interface.
 *
 * Do not call this constructor directly. Instead, use
 * {@link firebase.storage `firebase.storage()`}.
 *
 * See
 * {@link
 *   https://firebase.google.com/docs/storage/web/start/
 *   Get Started on Web}
 * for a full guide on how to use the Firebase Storage service.
 *
 * @interface
 */
firebase.storage.Storage = function () {};

/**
 * The {@link firebase.app.App app} associated with the `Storage` service
 * instance.
 *
 * @example
 * var app = storage.app;
 *
 * @type {!firebase.app.App}
 */
firebase.storage.Storage.prototype.app;

/**
 * Returns a reference for the given path in the default bucket.
 * @param {string=} path A relative path to initialize the reference with,
 *     for example `path/to/image.jpg`. If not passed, the returned reference
 *     points to the bucket root.
 * @return {!firebase.storage.Reference} A reference for the given path.
 */
firebase.storage.Storage.prototype.ref = function (path) {};

/**
 * Returns a reference for the given absolute URL.
 * @param {string} url A URL in the form: <br />
 *     1) a gs:// URL, for example `gs://bucket/files/image.png` <br />
 *     2) a download URL taken from object metadata. <br />
 *     @see {@link firebase.storage.FullMetadata.prototype.downloadURLs}
 * @return {!firebase.storage.Reference} A reference for the given URL.
 */
firebase.storage.Storage.prototype.refFromURL = function (url) {};

/**
 * The maximum time to retry operations other than uploads or downloads in
 * milliseconds.
 * @type {number}
 */
firebase.storage.Storage.prototype.maxOperationRetryTime;

/**
 * @param {number} time The new maximum operation retry time in milliseconds.
 * @see {@link firebase.storage.Storage.prototype.maxOperationRetryTime}
 */
firebase.storage.Storage.prototype.setMaxOperationRetryTime = function (
  time
) {};

/**
 * The maximum time to retry uploads in milliseconds.
 * @type {number}
 */
firebase.storage.Storage.prototype.maxUploadRetryTime;

/**
 * @param {number} time The new maximum upload retry time in milliseconds.
 * @see {@link firebase.storage.Storage.prototype.maxUploadRetryTime}
 */
firebase.storage.Storage.prototype.setMaxUploadRetryTime = function (time) {};

/**
 * Represents a reference to a Google Cloud Storage object. Developers can
 * upload, download, and delete objects, as well as get/set object metadata.
 * @interface
 */
firebase.storage.Reference = function () {};

/**
 * Returns a gs:// URL for this object in the form
 *   `gs://<bucket>/<path>/<to>/<object>`
 * @return {string} The gs:// URL.
 */
firebase.storage.Reference.prototype.toString = function () {};

/**
 * Returns a reference to a relative path from this reference.
 * @param {string} path The relative path from this reference.
 *     Leading, trailing, and consecutive slashes are removed.
 * @return {!firebase.storage.Reference} The reference a the given path.
 */
firebase.storage.Reference.prototype.child = function (path) {};

/**
 * Uploads data to this reference's location.
 * @param {!Blob|!Uint8Array|!ArrayBuffer} data The data to upload.
 * @param {!firebase.storage.UploadMetadata=} metadata Metadata for the newly
 *     uploaded object.
 * @return {!firebase.storage.UploadTask} An object that can be used to monitor
 *     and manage the upload.
 */
firebase.storage.Reference.prototype.put = function (data, metadata) {};

/**
 * @enum {string}
 * An enumeration of the possible string formats for upload.
 */
firebase.storage.StringFormat = {
  /**
   * Indicates the string should be interpreted "raw", that is, as normal text.
   * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
   * sequence.
   * Example: The string 'Hello! \ud83d\ude0a' becomes the byte sequence
   * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
   */
  RAW: 'raw',
  /**
   * Indicates the string should be interpreted as base64-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64: 'base64',
  /**
   * Indicates the string should be interpreted as base64url-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64URL: 'base64url',
  /**
   * Indicates the string is a data URL, such as one obtained from
   * canvas.toDataURL().
   * Example: the string 'data:application/octet-stream;base64,aaaa'
   * becomes the byte sequence
   * 69 a6 9a
   * (the content-type "application/octet-stream" is also applied, but can
   * be overridden in the metadata object).
   */
  DATA_URL: 'data_url'
};

/**
 * Uploads string data to this reference's location.
 * @param {string} data The string to upload.
 * @param {!firebase.storage.StringFormat=} format The format of the string to
 *     upload.
 * @param {!firebase.storage.UploadMetadata=} metadata Metadata for the newly
 *     uploaded object.
 * @return {!firebase.storage.UploadTask}
 * @throws If the format is not an allowed format, or if the given string
 *     doesn't conform to the specified format.
 */
firebase.storage.Reference.prototype.putString = function (
  data,
  format,
  metadata
) {};

/**
 * Deletes the object at this reference's location.
 * @return {!firebase.Promise<void>} A Promise that resolves if the deletion
 *     succeeded and rejects if it failed, including if the object didn't exist.
 */
firebase.storage.Reference.prototype.delete = function () {};

/**
 * Fetches metadata for the object at this location, if one exists.
 * @return {!firebase.Promise<firebase.storage.FullMetadata>} A Promise that
 *     resolves with the metadata, or rejects if the fetch failed, including if
 *     the object did not exist.
 */
firebase.storage.Reference.prototype.getMetadata = function () {};

/**
 * Updates the metadata for the object at this location, if one exists.
 * @param {!firebase.storage.SettableMetadata} metadata The new metadata.
 *     Setting a property to 'null' removes it on the server, while leaving
 *     a property as 'undefined' has no effect.
 * @return {!firebase.Promise<firebase.storage.FullMetadata>} A Promise that
 *     resolves with the full updated metadata or rejects if the updated failed,
 *     including if the object did not exist.
 */
firebase.storage.Reference.prototype.updateMetadata = function (metadata) {};

/**
 * Fetches a long lived download URL for this object.
 * @return {!firebase.Promise<string>} A Promise that resolves with the download
 *     URL or rejects if the fetch failed, including if the object did not
 *     exist.
 */
firebase.storage.Reference.prototype.getDownloadURL = function () {};

/**
 * A reference pointing to the parent location of this reference, or null if
 * this reference is the root.
 * @type {?firebase.storage.Reference}
 */
firebase.storage.Reference.prototype.parent;

/**
 * A reference to the root of this reference's bucket.
 * @type {!firebase.storage.Reference}
 */
firebase.storage.Reference.prototype.root;

/**
 * The name of the bucket containing this reference's object.
 * @type {string}
 */
firebase.storage.Reference.prototype.bucket;

/**
 * The full path of this object.
 * @type {string}
 */
firebase.storage.Reference.prototype.fullPath;

/**
 * The short name of this object, which is the last component of the full path.
 * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
 * @type {string}
 */
firebase.storage.Reference.prototype.name;

/**
 * The storage service associated with this reference.
 * @type {!firebase.storage.Storage}
 */
firebase.storage.Reference.prototype.storage;

/**
 * Object metadata that can be set at any time.
 * @interface
 */
firebase.storage.SettableMetadata = function () {};

/**
 * Served as the 'Cache-Control' header on object download.
 * @type {?string|undefined}
 */
firebase.storage.SettableMetadata.prototype.cacheControl;

/**
 * Served as the 'Content-Disposition' header on object download.
 * @type {?string|undefined}
 */
firebase.storage.SettableMetadata.prototype.contentDisposition;

/**
 * Served as the 'Content-Encoding' header on object download.
 * @type {?string|undefined}
 */
firebase.storage.SettableMetadata.prototype.contentEncoding;

/**
 * Served as the 'Content-Language' header on object download.
 * @type {?string|undefined}
 */
firebase.storage.SettableMetadata.prototype.contentLanguage;

/**
 * Served as the 'Content-Type' header on object download.
 * @type {?string|undefined}
 */
firebase.storage.SettableMetadata.prototype.contentType;

/**
 * Additional user-defined custom metadata.
 * @type {?Object<string>|undefined}
 */
firebase.storage.SettableMetadata.prototype.customMetadata;

/**
 * Object metadata that can be set at upload.
 * @interface
 * @extends {firebase.storage.SettableMetadata}
 */
firebase.storage.UploadMetadata = function () {};

/**
 * A Base64-encoded MD5 hash of the object being uploaded.
 * @type {?string|undefined}
 */
firebase.storage.UploadMetadata.prototype.md5Hash;

/**
 * The full set of object metadata, including read-only properties.
 * @interface
 * @extends {firebase.storage.UploadMetadata}
 */
firebase.storage.FullMetadata = function () {};

/**
 * The bucket this object is contained in.
 * @type {string}
 */
firebase.storage.FullMetadata.prototype.bucket;

/**
 * The object's generation.
 * @type {string}
 * @see {@link https://cloud.google.com/storage/docs/generations-preconditions}
 */
firebase.storage.FullMetadata.prototype.generation;

/**
 * The object's metageneration.
 * @type {string}
 * @see {@link https://cloud.google.com/storage/docs/generations-preconditions}
 */
firebase.storage.FullMetadata.prototype.metageneration;

/**
 * The full path of this object.
 * @type {string}
 */
firebase.storage.FullMetadata.prototype.fullPath;

/**
 * The short name of this object, which is the last component of the full path.
 * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
 * @type {string}
 */
firebase.storage.FullMetadata.prototype.name;

/**
 * The size of this object, in bytes.
 * @type {number}
 */
firebase.storage.FullMetadata.prototype.size;

/**
 * A date string representing when this object was created.
 * @type {string}
 */
firebase.storage.FullMetadata.prototype.timeCreated;

/**
 * A date string representing when this object was last updated.
 * @type {string}
 */
firebase.storage.FullMetadata.prototype.updated;

/**
 * An array of long-lived download URLs. Always contains at least one URL.
 * @type {!Array<string>}
 */
firebase.storage.FullMetadata.prototype.downloadURLs;

/**
 * An event that is triggered on a task.
 * @enum {string}
 * @see {@link firebase.storage.UploadTask.prototype.on}
 */
firebase.storage.TaskEvent = {
  /**
   * For this event,
   * <ul>
   *   <li>The `next` function is triggered on progress updates and when the
   *       task is paused/resumed with a
   *       {@link firebase.storage.UploadTaskSnapshot} as the first
   *       argument.</li>
   *   <li>The `error` function is triggered if the upload is canceled or fails
   *       for another reason.</li>
   *   <li>The `complete` function is triggered if the upload completes
   *       successfully.</li>
   * </ul>
   */
  STATE_CHANGED: 'state_changed'
};

/**
 * Represents the current state of a running upload.
 * @enum {string}
 */
firebase.storage.TaskState = {
  /** Indicates that the task is still running and making progress. */
  RUNNING: 'running',
  /** Indicates that the task is paused. */
  PAUSED: 'paused',
  /** Indicates that the task completed successfully. */
  SUCCESS: 'success',
  /** Indicates that the task was canceled. */
  CANCELED: 'canceled',
  /** Indicates that the task failed for a reason other than being canceled. */
  ERROR: 'error'
};

/**
 * Represents the process of uploading an object. Allows you to monitor and
 * manage the upload.
 * @interface
 */
firebase.storage.UploadTask = function () {};

/**
 * This object behaves like a Promise, and resolves with its snapshot data when
 * the upload completes.
 * @param {(?function(!firebase.storage.UploadTaskSnapshot):*)=} onFulfilled
 *     The fulfillment callback. Promise chaining works as normal.
 * @param {(?function(!Error):*)=} onRejected The rejection callback.
 * @return {!firebase.Promise}
 */
firebase.storage.UploadTask.prototype.then = function (
  onFulfilled,
  onRejected
) {};

/**
 * Equivalent to calling `then(null, onRejected)`.
 * @param {!function(!Error):*} onRejected
 * @return {!firebase.Promise}
 */
firebase.storage.UploadTask.prototype.catch = function (onRejected) {};

/**
 * Listens for events on this task.
 *
 * Events have three callback functions (referred to as `next`, `error`, and
 * `complete`).
 *
 * If only the event is passed, a function that can be used to register the
 * callbacks is returned. Otherwise, the callbacks are passed after the event.
 *
 * Callbacks can be passed either as three separate arguments <em>or</em> as the
 * `next`, `error`, and `complete` properties of an object. Any of the three
 * callbacks is optional, as long as at least one is specified. In addition,
 * when you add your callbacks, you get a function back. You can call this
 * function to unregister the associated callbacks.
 *
 * @example <caption>Pass callbacks separately or in an object.</caption>
 * var next = function(snapshot) {};
 * var error = function(error) {};
 * var complete = function() {};
 *
 * // The first example.
 * uploadTask.on(
 *     firebase.storage.TaskEvent.STATE_CHANGED,
 *     next,
 *     error,
 *     complete);
 *
 * // This is equivalent to the first example.
 * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
 *   'next': next,
 *   'error': error,
 *   'complete': complete
 * });
 *
 * // This is equivalent to the first example.
 * var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
 * subscribe(next, error, complete);
 *
 * // This is equivalent to the first example.
 * var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
 * subscribe({
 *   'next': next,
 *   'error': error,
 *   'complete': complete
 * });
 *
 * @example <caption>Any callback is optional.</caption>
 * // Just listening for completion, this is legal.
 * uploadTask.on(
 *     firebase.storage.TaskEvent.STATE_CHANGED,
 *     null,
 *     null,
 *     function() {
 *       console.log('upload complete!');
 *     });
 *
 * // Just listening for progress/state changes, this is legal.
 * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
 *   var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
 *   console.log(percent + "% done");
 * });
 *
 * // This is also legal.
 * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
 *   'complete': function() {
 *     console.log('upload complete!');
 *   }
 * });
 *
 * @example <caption>Use the returned function to remove callbacks.</caption>
 * var unsubscribe = uploadTask.on(
 *     firebase.storage.TaskEvent.STATE_CHANGED,
 *     function(snapshot) {
 *       var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
 *       console.log(percent + "% done");
 *       // Stop after receiving one update.
 *       unsubscribe();
 *     });
 *
 * // This code is equivalent to the above.
 * var handle = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
 * unsubscribe = handle(function(snapshot) {
 *   var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
 *   console.log(percent + "% done");
 *   // Stop after receiving one update.
 *   unsubscribe();
 * });
 *
 * @param {!firebase.storage.TaskEvent} event The event to listen for.
 * @param {(?firebase.Observer<firebase.storage.UploadTaskSnapshot,Error>|
 *       ?function(!Object))=} nextOrObserver
 *     The `next` function, which gets called for each item in
 *     the event stream, or an observer object with some or all of these three
 *     properties (`next`, `error`, `complete`).
 * @param {?function(!Error)=} error A function that gets called with an Error
 *     if the event stream ends due to an error.
 * @param {?firebase.CompleteFn=} complete A function that gets called if the
 *     event stream ends normally.
 * @return {
 *     !firebase.Unsubscribe|
 *     !function(?function(!Object),?function(!Error)=,?firebase.CompleteFn=)
 *       :!firebase.Unsubscribe}
 *     If only the event argument is passed, returns a function you can use to
 *     add callbacks (see the examples above). If more than just the event
 *     argument is passed, returns a function you can call to unregister the
 *     callbacks.
 */
firebase.storage.UploadTask.prototype.on = function (
  event,
  nextOrObserver,
  error,
  complete
) {};

/**
 * Resumes a paused task. Has no effect on a running or failed task.
 * @return {boolean} True if the resume had an effect.
 */
firebase.storage.UploadTask.prototype.resume = function () {};

/**
 * Pauses a running task. Has no effect on a paused or failed task.
 * @return {boolean} True if the pause had an effect.
 */
firebase.storage.UploadTask.prototype.pause = function () {};

/**
 * Cancels a running task. Has no effect on a complete or failed task.
 * @return {boolean} True if the cancel had an effect.
 */
firebase.storage.UploadTask.prototype.cancel = function () {};

/**
 * A snapshot of the current task state.
 * @type {!firebase.storage.UploadTaskSnapshot}
 */
firebase.storage.UploadTask.prototype.snapshot;

/**
 * Holds data about the current state of the upload task.
 * @interface
 */
firebase.storage.UploadTaskSnapshot = function () {};

/**
 * The number of bytes that have been successfully uploaded so far.
 * @type {number}
 */
firebase.storage.UploadTaskSnapshot.prototype.bytesTransferred;

/**
 * The total number of bytes to be uploaded.
 * @type {number}
 */
firebase.storage.UploadTaskSnapshot.prototype.totalBytes;

/**
 * The current state of the task.
 * @type {firebase.storage.TaskState}
 */
firebase.storage.UploadTaskSnapshot.prototype.state;

/**
 * Before the upload completes, contains the metadata sent to the server.
 * After the upload completes, contains the metadata sent back from the server.
 * @type {!firebase.storage.FullMetadata}
 */
firebase.storage.UploadTaskSnapshot.prototype.metadata;

/**
 * After the upload completes, contains a long-lived download URL for the
 * object. Also accessible in metadata.
 * @type {?string}
 */
firebase.storage.UploadTaskSnapshot.prototype.downloadURL;

/**
 * The task of which this is a snapshot.
 * @type {!firebase.storage.UploadTask}
 */
firebase.storage.UploadTaskSnapshot.prototype.task;

/**
 * The reference that spawned this snapshot's upload task.
 * @type {!firebase.storage.Reference}
 */
firebase.storage.UploadTaskSnapshot.prototype.ref;
