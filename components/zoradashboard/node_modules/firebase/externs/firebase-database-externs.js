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
 * @fileoverview Firebase Database API.
 * @externs
 */

/**
 * Gets the {@link firebase.database.Database `Database`} service for the
 * default app or a given app.
 *
 * `firebase.database()` can be called with no arguments to access the default
 * app's {@link firebase.database.Database `Database`} service or as
 * `firebase.database(app)` to access the
 * {@link firebase.database.Database `Database`} service associated with a
 * specific app.
 *
 * `firebase.database` is also a namespace that can be used to access global
 * constants and methods associated with the `Database` service.
 *
 * @example
 * // Get the Database service for the default app
 * var defaultDatabase = firebase.database();
 *
 * @example
 * // Get the Database service for a specific app
 * var otherDatabase = firebase.database(app);
 *
 * @namespace
 * @param {!firebase.app.App=} app Optional app whose Database service to
 *   return. If not provided, the default Database service will be returned.
 * @return {!firebase.database.Database} The default Database service if no app
 *   is provided or the Database service associated with the provided app.
 */
firebase.database = function (app) {};

/**
 * Gets the {@link firebase.database.Database `Database`} service for the
 * current app.
 *
 * @example
 * var database = app.database();
 * // The above is shorthand for:
 * // var database = firebase.database(app);
 *
 * @return {!firebase.database.Database}
 */
firebase.app.App.prototype.database = function () {};

/**
 * The Firebase Database service interface.
 *
 * Do not call this constructor directly. Instead, use
 * {@link firebase.database `firebase.database()`}.
 *
 * See
 * {@link
 *   https://firebase.google.com/docs/database/web/start/
 *   Installation &amp; Setup in JavaScript}
 * for a full guide on how to use the Firebase Database service.
 *
 * @interface
 */
firebase.database.Database = function () {};

/**
 * Logs debugging information to the console.
 *
 * @example
 * // Enable logging
 * firebase.database.enableLogging(true);
 *
 * @example
 * // Disable logging
 * firebase.database.enableLogging(false);
 *
 * @example
 * // Enable logging across page refreshes
 * firebase.database.enableLogging(true, true);
 *
 * @example
 * // Provide custom logger which prefixes log statements with "[FIREBASE]"
 * firebase.database.enableLogging(function(message) {
 *   console.log("[FIREBASE]", message);
 * });
 *
 * @param {(boolean|function(string))=} logger Enables logging if `true`;
 *   disables logging if `false`. You can also provide a custom logger function
 *   to control how things get logged.
 * @param {boolean=} persistent Remembers the logging state between page
 *   refreshes if `true`.
 */
firebase.database.enableLogging = function (logger, persistent) {};

/**
 * @namespace
 */
firebase.database.ServerValue = {};

/**
 * A placeholder value for auto-populating the current timestamp (time
 * since the Unix epoch, in milliseconds) as determined by the Firebase
 * servers.
 *
 * @example
 * var sessionsRef = firebase.database().ref("sessions");
 * sessionsRef.push({
 *   startedAt: firebase.database.ServerValue.TIMESTAMP
 * });
 *
 * @const {!Object}
 */
firebase.database.ServerValue.TIMESTAMP;

/**
 * The {@link firebase.app.App app} associated with the `Database` service
 * instance.
 *
 * @example
 * var app = database.app;
 *
 * @type {!firebase.app.App}
 */
firebase.database.Database.prototype.app;

/**
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided path. If no path is provided, the `Reference`
 * will point to the root of the Database.
 *
 * @example
 * // Get a reference to the root of the Database
 * var rootRef = firebase.database().ref();
 *
 * @example
 * // Get a reference to the /users/ada node
 * var adaRef = firebase.database().ref("users/ada");
 * // The above is shorthand for the following operations:
 * //var rootRef = firebase.database().ref();
 * //var adaRef = rootRef.child("users/ada");
 *
 * @param {string=} path Optional path representing the location the returned
 *   `Reference` will point. If not provided, the returned `Reference` will
 *   point to the root of the Database.
 * @return {!firebase.database.Reference} If a path is provided, a `Reference`
 *   pointing to the provided path. Otherwise, a `Reference` pointing to the
 *   root of the Database.
 */
firebase.database.Database.prototype.ref = function (path) {};

/**
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided Firebase URL.
 *
 * An exception is thrown if the URL is not a valid Firebase Database URL or it
 * has a different domain than the current `Database` instance.
 *
 * Note that all query parameters (`orderBy`, `limitToLast`, etc.) are ignored
 * and are not applied to the returned `Reference`.
 *
 * @example
 * // Get a reference to the root of the Database
 * var rootRef = firebase.database().ref("https://<DATABASE_NAME>.firebaseio.com");
 *
 * @example
 * // Get a reference to the /users/ada node
 * var adaRef = firebase.database().ref("https://<DATABASE_NAME>.firebaseio.com/users/ada");
 *
 * @param {string} url The Firebase URL at which the returned `Reference` will
 *   point.
 * @return {!firebase.database.Reference} A `Reference` pointing to the provided
 *   Firebase URL.
 */
firebase.database.Database.prototype.refFromURL = function (url) {};

/**
 * Disconnects from the server (all Database operations will be completed
 * offline).
 *
 * The client automatically maintains a persistent connection to the Database
 * server, which will remain active indefinitely and reconnect when
 * disconnected. However, the `goOffline()` and `goOnline()` methods may be used
 * to control the client connection in cases where a persistent connection is
 * undesirable.
 *
 * While offline, the client will no longer receive data updates from the
 * Database. However, all Database operations performed locally will continue to
 * immediately fire events, allowing your application to continue behaving
 * normally. Additionally, each operation performed locally will automatically
 * be queued and retried upon reconnection to the Database server.
 *
 * To reconnect to the Database and begin receiving remote events, see
 * `goOnline()`.
 *
 * @example
 * firebase.database().goOffline();
 */
firebase.database.Database.prototype.goOffline = function () {};

/**
 * Reconnects to the server and synchronizes the offline Database state
 * with the server state.
 *
 * This method should be used after disabling the active connection with
 * `goOffline()`. Once reconnected, the client will transmit the proper data
 * and fire the appropriate events so that your client "catches up"
 * automatically.
 *
 * @example
 * firebase.database().goOnline();
 */
firebase.database.Database.prototype.goOnline = function () {};

/**
 * A `Reference` represents a specific location in your Database and can be used
 * for reading or writing data to that Database location.
 *
 * You can reference the root or child location in your Database by calling
 * `firebase.database().ref()` or `firebase.database().ref("child/path")`.
 *
 * Writing is done with the `set()` method and reading can be done with the
 * `on()` method. See
 * {@link
 *   https://firebase.google.com/docs/database/web/read-and-write
 *   Read and Write Data on the Web}
 *
 * @interface
 * @extends {firebase.database.Query}
 */
firebase.database.Reference = function () {};

/**
 * The last part of the `Reference`'s path.
 *
 * For example, `"ada"` is the key for
 * `https://<DATABASE_NAME>.firebaseio.com/users/ada`.
 *
 * The key of a root `Reference` is `null`.
 *
 * @example
 * // The key of a root reference is null
 * var rootRef = firebase.database().ref();
 * var key = rootRef.key;  // key === null
 *
 * @example
 * // The key of any non-root reference is the last token in the path
 * var adaRef = firebase.database().ref("users/ada");
 * var key = adaRef.key;  // key === "ada"
 * key = adaRef.child("name/last").key;  // key === "last"
 *
 * @type {string|null}
 */
firebase.database.Reference.prototype.key;

/**
 * Gets a `Reference` for the location at the specified relative path.
 *
 * The relative path can either be a simple child name (for example, "ada") or
 * a deeper slash-separated path (for example, "ada/name/first").
 *
 * @example
 * var usersRef = firebase.database().ref('users');
 * var adaRef = usersRef.child('ada');
 * var adaFirstNameRef = adaRef.child('name/first');
 * var path = adaFirstNameRef.toString();
 * // path is now 'https://sample-app.firebaseio.com/users/ada/name/first'
 *
 * @param {string} path A relative path from this location to the desired child
 *   location.
 * @return {!firebase.database.Reference} The specified child location.
 */
firebase.database.Reference.prototype.child = function (path) {};

/**
 * The parent location of a `Reference`.
 *
 * The parent of a root `Reference` is `null`.
 *
 * @example
 * // The parent of a root reference is null
 * var rootRef = firebase.database().ref();
 * parent = rootRef.parent;  // parent === null
 *
 * @example
 * // The parent of any non-root reference is the parent location
 * var usersRef = firebase.database().ref("users");
 * var adaRef = firebase.database().ref("users/ada");
 * // usersRef and adaRef.parent represent the same location
 *
 * @type {?firebase.database.Reference}
 */
firebase.database.Reference.prototype.parent;

/**
 * The root `Reference` of the Database.
 *
 * @example
 * // The root of a root reference is itself
 * var rootRef = firebase.database().ref();
 * // rootRef and rootRef.root represent the same location
 *
 * @example
 * // The root of any non-root reference is the root location
 * var adaRef = firebase.database().ref("users/ada");
 * // rootRef and adaRef.root represent the same location
 *
 * @type {!firebase.database.Reference}
 */
firebase.database.Reference.prototype.root;

/**
 * @type {string}
 */
firebase.database.Reference.prototype.path;

/**
 * Writes data to this Database location.
 *
 * This will overwrite any data at this location and all child locations.
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ("value", "child_added", etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * Passing `null` for the new value is equivalent to calling `remove()`; namely,
 * all data at this location and all child locations will be deleted.
 *
 * `set()` will remove any priority stored at this location, so if priority is
 * meant to be preserved, you need to use `setWithPriority()` instead.
 *
 * Note that modifying data with `set()` will cancel any pending transactions
 * at that location, so extreme care should be taken if mixing `set()` and
 * `transaction()` to modify the same data.
 *
 * A single `set()` will generate a single "value" event at the location where
 * the `set()` was performed.
 *
 * @example
 * var adaNameRef = firebase.database().ref('users/ada/name');
 * adaNameRef.child('first').set('Ada');
 * adaNameRef.child('last').set('Lovelace');
 * // We've written 'Ada' to the Database location storing Ada's first name,
 * // and 'Lovelace' to the location storing her last name.
 *
 * @example
 * adaNameRef.set({ first: 'Ada', last: 'Lovelace' });
 * // Exact same effect as the previous example, except we've written
 * // Ada's first and last name simultaneously.
 *
 * @example
 * adaNameRef.set({ first: 'Ada', last: 'Lovelace' })
 *   .then(function() {
 *     console.log('Synchronization succeeded');
 *   })
 *   .catch(function(error) {
 *     console.log('Synchronization failed');
 *   });
 * // Same as the previous example, except we will also log a message
 * // when the data has finished synchronizing.
 *
 * @param {*} value The value to be written (string, number, boolean, object,
 *   array, or null).
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.Promise<void>} Resolves when write to server is complete.
 */
firebase.database.Reference.prototype.set = function (value, onComplete) {};

/**
 * Writes multiple values to the Database at once.
 *
 * The `values` argument contains multiple property-value pairs that will be
 * written to the Database together. Each child property can either be a simple
 * property (for example, "name") or a relative path (for example,
 * "name/first") from the current location to the data to update.
 *
 * As opposed to the `set()` method, `update()` can be use to selectively update
 * only the referenced properties at the current location (instead of replacing
 * all the child properties at the current location).
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ('value', 'child_added', etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * A single `update()` will generate a single "value" event at the location
 * where the `update()` was performed, regardless of how many children were
 * modified.
 *
 * Note that modifying data with `update()` will cancel any pending
 * transactions at that location, so extreme care should be taken if mixing
 * `update()` and `transaction()` to modify the same data.
 *
 * Passing `null` to `update()` will remove the data at this location.
 *
 * See
 * {@link
 *  https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html
 *  Introducing multi-location updates and more}.
 *
 * @example
 * var adaNameRef = firebase.database().ref('users/ada/name');
 * // Modify the 'first' and 'last' properties, but leave other data at
 * // adaNameRef unchanged.
 * adaNameRef.update({ first: 'Ada', last: 'Lovelace' });
 *
 * @param {!Object} values Object containing multiple values.
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.Promise<void>} Resolves when update on server is complete.
 */
firebase.database.Reference.prototype.update = function (values, onComplete) {};

/**
 * Writes data the Database location. Like `set()` but also specifies the
 * priority for that data.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data
 *  Sorting and filtering data}).
 *
 * @param {*} newVal
 * @param {string|number|null} newPriority
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.Reference.prototype.setWithPriority = function (
  newVal,
  newPriority,
  onComplete
) {};

/**
 * Removes the data at this Database location.
 *
 * Any data at child locations will also be deleted.
 *
 * The effect of the remove will be visible immediately and the corresponding
 * event 'value' will be triggered. Synchronization of the remove to the
 * Firebase servers will also be started, and the returned Promise will resolve
 * when complete. If provided, the onComplete callback will be called
 * asynchronously after synchronization has finished.
 *
 * @example
 * var adaRef = firebase.database().ref('users/ada');
 * adaRef.remove()
 *   .then(function() {
 *     console.log("Remove succeeded.")
 *   })
 *   .catch(function(error) {
 *     console.log("Remove failed: " + error.message)
 *   });
 *
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.Promise<void>} Resolves when remove on server is complete.
 */
firebase.database.Reference.prototype.remove = function (onComplete) {};

/**
 * Atomically modifies the data at this location.
 *
 * Atomically modify the data at this location. Unlike a normal `set()`, which
 * just overwrites the data regardless of its previous value, `transaction()` is
 * used to modify the existing value to a new value, ensuring there are no
 * conflicts with other clients writing to the same location at the same time.
 *
 * To accomplish this, you pass `transaction()` an update function which is used
 * to transform the current value into a new value. If another client writes to
 * the location before your new value is successfully written, your update
 * function will be called again with the new current value, and the write will
 * be retried. This will happen repeatedly until your write succeeds without
 * conflict or you abort the transaction by not returning a value from your
 * update function.
 *
 * Note: Modifying data with `set()` will cancel any pending transactions at
 * that location, so extreme care should be taken if mixing `set()` and
 * `transaction()` to update the same data.
 *
 * Note: When using transactions with Security and Firebase Rules in place, be
 * aware that a client needs `.read` access in addition to `.write` access in
 * order to perform a transaction. This is because the client-side nature of
 * transactions requires the client to read the data in order to transactionally
 * update it.
 *
 * @example
 * // Increment Ada's rank by 1.
 * var adaRankRef = firebase.database().ref('users/ada/rank');
 * adaRankRef.transaction(function(currentRank) {
 *   // If users/ada/rank has never been set, currentRank will be `null`.
 *   return currentRank + 1;
 * });
 *
 * @example
 * // Try to create a user for ada, but only if the user id 'ada' isn't
 * // already taken
 * var adaRef = firebase.database().ref('users/ada');
 * adaRef.transaction(function(currentData) {
 *   if (currentData === null) {
 *     return { name: { first: 'Ada', last: 'Lovelace' } };
 *   } else {
 *     console.log('User ada already exists.');
 *     return; // Abort the transaction.
 *   }
 * }, function(error, committed, snapshot) {
 *   if (error) {
 *     console.log('Transaction failed abnormally!', error);
 *   } else if (!committed) {
 *     console.log('We aborted the transaction (because ada already exists).');
 *   } else {
 *     console.log('User ada added!');
 *   }
 *   console.log("Ada's data: ", snapshot.val());
 * });
 *
 *
 * @param {function(*): *} transactionUpdate A developer-supplied function which
 *   will be passed the current data stored at this location (as a JavaScript
 *   object). The function should return the new value it would like written (as
 *   a JavaScript object). If `undefined` is returned (i.e. you return with no
 *   arguments) the transaction will be aborted and the data at this location
 *   will not be modified.
 * @param {(function(?Error, boolean,
 *                   ?firebase.database.DataSnapshot))=} onComplete A callback
 *   function that will be called when the transaction completes. The callback
 *   is passed three arguments: a possibly-null `Error`, a `boolean` indicating
 *   whether the transaction was committed, and a `DataSnapshot` indicating the
 *   final result. If the transaction failed abnormally, the first argument will
 *   be an `Error` object indicating the failure cause. If the transaction
 *   finished normally, but no data was committed because no data was returned
 *   from `transactionUpdate`, then second argument will be false. If the
 *   transaction completed and committed data to Firebase, the second argument
 *   will be true. Regardless, the third argument will be a `DataSnapshot`
 *   containing the resulting data in this location.
 * @param {boolean=} applyLocally By default, events are raised each time the
 *   transaction update function runs. So if it is run multiple times, you may
 *   see intermediate states. You can set this to false to suppress these
 *   intermediate states and instead wait until the transaction has completed
 *   before events are raised.
 * @return {!firebase.Promise<{
 *   committed: boolean,
 *   snapshot: ?firebase.database.DataSnapshot
 * }>} Returns a Promise that can optionally be used instead of the onComplete
 *   callback to handle success and failure.
 */
firebase.database.Reference.prototype.transaction = function (
  transactionUpdate,
  onComplete,
  applyLocally
) {};

/**
 * Sets a priority for the data at this Database location.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data
 *  Sorting and filtering data}).
 *
 * @param {string|number|null} priority
 * @param {function(?Error)} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.Reference.prototype.setPriority = function (
  priority,
  onComplete
) {};

/**
 * @interface
 * @extends {firebase.database.Reference}
 * @extends {firebase.Thenable<void>}
 */
firebase.database.ThenableReference = function () {};

/**
 * Generates a new child location using a unique key and returns its
 * `Reference`.
 *
 * This is the most common pattern for adding data to a collection of items.
 *
 * If you provide a value to `push()`, the value will be written to the
 * generated location. If you don't pass a value, nothing will be written to the
 * Database and the child will remain empty (but you can use the `Reference`
 * elsewhere).
 *
 * The unique key generated by `push()` are ordered by the current time, so the
 * resulting list of items will be chronologically sorted. The keys are also
 * designed to be unguessable (they contain 72 random bits of entropy).
 *
 *
 * See
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data
 *  Append to a list of data}
 * </br>See
 * {@link
 *  https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html
 *  The 2^120 Ways to Ensure Unique Identifiers}
 *
 * @example
 * var messageListRef = firebase.database().ref('message_list');
 * var newMessageRef = messageListRef.push();
 * newMessageRef.set({
 *   'user_id': 'ada',
 *   'text': 'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.'
 * });
 * // We've appended a new message to the message_list location.
 * var path = newMessageRef.toString();
 * // path will be something like
 * // 'https://sample-app.firebaseio.com/message_list/-IKo28nwJLH0Nc5XeFmj'
 *
 * @param {*=} value Optional value to be written at the generated location.
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.database.ThenableReference} Combined `Promise` and
 *   `Reference`; resolves when write is complete, but can be used immediately
 *   as the `Reference` to the child location.
 */
firebase.database.Reference.prototype.push = function (value, onComplete) {};

/**
 * Returns an `OnDisconnect` object - see
 * {@link
 *   https://firebase.google.com/docs/database/web/offline-capabilities
 *   Enabling Offline Capabilities in JavaScript} for more information on how
 * to use it.
 *
 * @return {!firebase.database.OnDisconnect}
 */
firebase.database.Reference.prototype.onDisconnect = function () {};

/**
 * A `Query` sorts and filters the data at a Database location so only a subset
 * of the child data is included. This can be used to order a collection of
 * data by some attribute (for example, height of dinosaurs) as well as to
 * restrict a large list of items (for example, chat messages) down to a number
 * suitable for synchronizing to the client. Queries are created by chaining
 * together one or more of the filter methods defined here.
 *
 * Just as with a `Reference`, you can receive data from a `Query` by using the
 * `on()` method. You will only receive events and `DataSnapshot`s for the
 * subset of the data that matches your query.
 *
 * Read our documentation on
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data
 *  Sorting and filtering data} for more information.
 *
 * @interface
 */
firebase.database.Query = function () {};

/**
 * Returns a `Reference` to the `Query`'s location.
 *
 * @type {!firebase.database.Reference}
 */
firebase.database.Query.prototype.ref;

/**
 * Returns whether or not the current and provided queries represent the same
 * location, have the same query parameters, and are from the same instance of
 * `firebase.app.App`.
 *
 * Two `Reference` objects are equivalent if they represent the same location
 * and are from the same instance of `firebase.app.App`.
 *
 * Two `Query` objects are equivalent if they represent the same location, have
 * the same query parameters, and are from the same instance of
 * `firebase.app.App`. Equivalent queries share the same sort order, limits, and
 * starting and ending points.
 *
 * @example
 * var rootRef = firebase.database.ref();
 * var usersRef = rootRef.child("users");
 *
 * usersRef.isEqual(rootRef);  // false
 * usersRef.isEqual(rootRef.child("users"));  // true
 * usersRef.parent.isEqual(rootRef);  // true
 *
 * @example
 * var rootRef = firebase.database.ref();
 * var usersRef = rootRef.child("users");
 * var usersQuery = usersRef.limitToLast(10);
 *
 * usersQuery.isEqual(usersRef);  // false
 * usersQuery.isEqual(usersRef.limitToLast(10));  // true
 * usersQuery.isEqual(rootRef.limitToLast(10));  // false
 * usersQuery.isEqual(usersRef.orderByKey().limitToLast(10));  // false
 *
 * @param {firebase.database.Query} other The query to compare against.
 * @return {boolean} Whether or not the current and provided queries are
 *   equivalent.
 */
firebase.database.Query.prototype.isEqual = function (other) {};

/**
 * Listens for data changes at a particular location.
 *
 * This is the primary way to read data from a Database. Your callback
 * will be triggered for the initial data and again whenever the data changes.
 * Use `off( )` to stop receiving updates. See
 * {@link https://firebase.google.com/docs/database/web/retrieve-data
 *   Retrieve Data on the Web}
 * for more details.
 *
 * <h4>value event</h4>
 *
 * This event will trigger once with the initial data stored at this location,
 * and then trigger again each time the data changes. The `DataSnapshot` passed
 * to the callback will be for the location at which `on()` was called. It
 * won't trigger until the entire contents has been synchronized. If the
 * location has no data, it will be triggered with an empty `DataSnapshot`
 * (`val()` will return `null`).
 *
 * <h4>child_added event</h4>
 *
 * This event will be triggered once for each initial child at this location,
 * and it will be triggered again every time a new child is added. The
 * `DataSnapshot` passed into the callback will reflect the data for the
 * relevant child. For ordering purposes, it is passed a second argument which
 * is a string containing the key of the previous sibling child by sort order,
 * or `null` if it is the first child.
 *
 * <h4>child_removed event</h4>
 *
 * This event will be triggered once every time a child is removed. The
 * `DataSnapshot` passed into the callback will be the old data for the child
 * that was removed. A child will get removed when either:
 *
 * - a client explicitly calls `remove()` on that child or one of its ancestors
 * - a client calls `set(null)` on that child or one of its ancestors
 * - that child has all of its children removed
 * - there is a query in effect which now filters out the child (because it's
 *   sort order changed or the max limit was hit)
 *
 * <h4>child_changed event</h4>
 *
 * This event will be triggered when the data stored in a child (or any of its
 * descendants) changes. Note that a single `child_changed` event may represent
 * multiple changes to the child. The `DataSnapshot` passed to the callback will
 * contain the new child contents. For ordering purposes, the callback is also
 * passed a second argument which is a string containing the key of the previous
 * sibling child by sort order, or `null` if it is the first child.
 *
 * <h4>child_moved event</h4>
 *
 * This event will be triggered when a child's sort order changes such that its
 * position relative to its siblings changes. The `DataSnapshot` passed to the
 * callback will be for the data of the child that has moved. It is also passed
 * a second argument which is a string containing the key of the previous
 * sibling child by sort order, or `null` if it is the first child.
 *
 * @example <caption>Handle a new value:</caption>
 * ref.on('value', function(dataSnapshot) {
 *   ...
 * });
 *
 * @example <caption>Handle a new child:</caption>
 * ref.on('child_added', function(childSnapshot, prevChildKey) {
 *   ...
 * });
 *
 * @example <caption>Handle child removal:</caption>
 * ref.on('child_removed', function(oldChildSnapshot) {
 *   ...
 * });
 *
 * @example <caption>Handle child data changes:</caption>
 * ref.on('child_changed', function(childSnapshot, prevChildKey) {
 *   ...
 * });
 *
 * @example <caption>Handle child ordering changes:</caption>
 * ref.on('child_moved', function(childSnapshot, prevChildKey) {
 *   ...
 * });
 *
 * @param {string} eventType One of the following strings: "value",
 *   "child_added", "child_changed", "child_removed", or "child_moved."
 * @param {!function(firebase.database.DataSnapshot, string=)} callback A
 *   callback that fires when the specified event occurs. The callback will be
 *   passed a DataSnapshot. For ordering purposes, "child_added",
 *   "child_changed", and "child_moved" will also be passed a string containing
 *   the key of the previous child, by sort order, or `null` if it is the
 *   first child.
 * @param {(function(Error)|Object)=} cancelCallbackOrContext An optional
 *   callback that will be notified if your event subscription is ever canceled
 *   because your client does not have permission to read this data (or it had
 *   permission but has now lost it). This callback will be passed an `Error`
 *   object indicating why the failure occurred.
 * @param {Object=} context If provided, this object will be used as `this`
 *   when calling your callback(s).
 * @return {!function(firebase.database.DataSnapshot, string=)} The provided
 *   callback function is returned unmodified. This is just for convenience if
 *   you want to pass an inline function to `on()` but store the callback
 *   function for later passing to `off()`.
 */
firebase.database.Query.prototype.on = function (
  eventType,
  callback,
  cancelCallbackOrContext,
  context
) {};

/**
 * Detaches a callback previously attached with `on()`.
 *
 * Detach a callback previously attached with `on()`. Note that if `on()` was
 * called multiple times with the same eventType and callback, the callback
 * will be called multiple times for each event, and `off()` must be called
 * multiple times to remove the callback. Calling `off()` on a parent listener
 * will not automatically remove listeners registered on child nodes, `off()`
 * must also be called on any child listeners to remove the callback.
 *
 * If a callback is not specified, all callbacks for the specified eventType
 * will be removed. Similarly, if no eventType or callback is specified, all
 * callbacks for the `Reference` will be removed.
 *
 * @example
 * var onValueChange = function(dataSnapshot) {  ... };
 * ref.on('value', onValueChange);
 * ref.child('meta-data').on('child_added', onChildAdded);
 * // Sometime later...
 * ref.off('value', onValueChange);
 *
 * // You must also call off() for any child listeners on ref
 * // to cancel those callbacks
 * ref.child('meta-data').off('child_added', onValueAdded);
 *
 * @example
 * // Or you can save a line of code by using an inline function
 * // and on()'s return value.
 * var onValueChange = ref.on('value', function(dataSnapshot) { ... });
 * // Sometime later...
 * ref.off('value', onValueChange);
 *
 * @param {string=} eventType One of the following strings: "value",
 *   "child_added", "child_changed", "child_removed", or "child_moved."
 * @param {function(!firebase.database.DataSnapshot, ?string=)=} callback The
 *   callback function that was passed to `on()`.
 * @param {Object=} context The context that was passed to `on()`.
 */
firebase.database.Query.prototype.off = function (
  eventType,
  callback,
  context
) {};

/**
 * Listens for exactly one event of the specified event type, and then stops
 * listening.
 *
 * This is equivalent to calling {@link firebase.database.Query#on `on()`}, and
 * then calling {@link firebase.database.Query#off `off()`} inside the callback
 * function. See {@link firebase.database.Query#on `on()`} for details on the
 * event types.
 *
 * @example
 * // Basic usage of .once() to read the data located at ref.
 * ref.once('value')
 *   .then(function(dataSnapshot) {
 *     // handle read data.
 *   });
 *
 * @param {string} eventType One of the following strings: "value",
 *   "child_added", "child_changed", "child_removed", or "child_moved."
 * @param {function(!firebase.database.DataSnapshot, string=)=} successCallback A
 *   callback that fires when the specified event occurs. The callback will be
 *   passed a DataSnapshot. For ordering purposes, "child_added",
 *   "child_changed", and "child_moved" will also be passed a string containing
 *   the key of the previous child by sort order, or `null` if it is the
 *   first child.
 * @param {(function(Error)|Object)=} failureCallbackOrContext An optional
 *   callback that will be notified if your client does not have permission to
 *   read the data. This callback will be passed an `Error` object indicating
 *   why the failure occurred.
 * @param {Object=} context If provided, this object will be used as `this`
 *   when calling your callback(s).
 * @return {!firebase.Promise<*>}
 */
firebase.database.Query.prototype.once = function (
  eventType,
  successCallback,
  failureCallbackOrContext,
  context
) {};

/**
 * Generates a new `Query` limited to the first specific number of children.
 *
 * The `limitToFirst()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the first 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToFirst()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#filtering_data
 *  Filtering data}.
 *
 * @example
 * // Find the two shortest dinosaurs.
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByChild("height").limitToFirst(2).on("child_added", function(snapshot) {
 *   // This will be called exactly two times (unless there are less than two
 *   // dinosaurs in the Database).
 *
 *   // It will also get fired again if one of the first two dinosaurs is
 *   // removed from the data set, as a new dinosaur will now be the second
 *   // shortest.
 *   console.log(snapshot.key);
 * });
 *
 * @param {number} limit The maximum number of nodes to include in this query.
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.limitToFirst = function (limit) {};

/**
 * Generates a new `Query` object limited to the last specific number of
 * children.
 *
 * The `limitToLast()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the last 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToLast()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#filtering_data
 *  Filtering data}.
 *
 * @example
 * // Find the two heaviest dinosaurs.
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByChild("weight").limitToLast(2).on("child_added", function(snapshot) {
 *   // This callback will be triggered exactly two times, unless there are
 *   // fewer than two dinosaurs stored in the Database. It will also get fired
 *   // for every new, heavier dinosaur that gets added to the data set.
 *   console.log(snapshot.key);
 * });
 *
 * @param {number} limit The maximum number of nodes to include in this query.
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.limitToLast = function (limit) {};

/**
 * Generates a new `Query` object ordered by the specified child key.
 *
 * Queries can only order by one key at a time. Calling `orderByChild()`
 * multiple times on the same query is an error.
 *
 * Firebase queries allow you to order your data by any child key on the fly.
 * However, if you know in advance what your indexes will be, you can define
 * them via the .indexOn rule in your Security Rules for better performance. See
 * the {@link https://firebase.google.com/docs/database/security/indexing-data
 * .indexOn} rule for more information.
 *
 * You can read more about `orderByChild()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sort_data
 *  Sort data}.
 *
 * @example
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByChild("height").on("child_added", function(snapshot) {
 *   console.log(snapshot.key + " was " + snapshot.val().height + " m tall");
 * });
 *
 * @param {string} path
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByChild = function (path) {};

/**
 * Generates a new `Query` object ordered by key.
 *
 * Sorts the results of a query by their (ascending) key values.
 *
 * You can read more about `orderByKey()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sort_data
 *  Sort data}.
 *
 * @example
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByKey().on("child_added", function(snapshot) {
 *   console.log(snapshot.key);
 * });
 *
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByKey = function () {};

/**
 * Generates a new `Query` object ordered by priority.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sort_data
 *  Sort data} for alternatives to priority.
 *
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByPriority = function () {};

/**
 * Generates a new `Query` object ordered by value.
 *
 * If the children of a query are all scalar values (string, number, or
 * boolean), you can order the results by their (ascending) values.
 *
 * You can read more about `orderByValue()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sort_data
 *  Sort data}.
 *
 * @example
 * var scoresRef = firebase.database().ref("scores");
 * scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
 *   snapshot.forEach(function(data) {
 *     console.log("The " + data.key + " score is " + data.val());
 *   });
 * });
 *
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByValue = function () {};

/**
 * Creates a `Query` with the specified starting point.
 *
 * Using `startAt()`, `endAt()`, and `equalTo()` allows you to choose arbitrary
 * starting and ending points for your queries.
 *
 * The starting point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name greater than or
 * equal to the specified key.
 *
 * You can read more about `startAt()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#filtering_data
 *  Filtering data}.
 *
 * @example
 * // Find all dinosaurs that are at least three meters tall.
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByChild("height").startAt(3).on("child_added", function(snapshot) {
 *   console.log(snapshot.key)
 * });
 *
 * @param {number|string|boolean|null} value The value to start at. The argument
 *   type depends on which `orderBy*()` function was used in this query.
 *   Specify a value that matches the `orderBy*()` type. When used in
 *   combination with `orderByKey()`, the value must be a string.
 * @param {string=} key The child key to start at. This argument is only allowed
 *   if ordering by child, value, or priority.
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.startAt = function (value, key) {};

/**
 * Creates a `Query` with the specified ending point.
 *
 * Using `startAt()`, `endAt()`, and `equalTo()` allows you to choose arbitrary
 * starting and ending points for your queries.
 *
 * The ending point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name less than or equal
 * to the specified key.
 *
 * You can read more about `endAt()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#filtering_data
 *  Filtering data}.
 *
 * @example
 * // Find all dinosaurs whose names come before Pterodactyl lexicographically.
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
 *   console.log(snapshot.key);
 * });
 *
 * @param {number|string|boolean|null} value The value to end at. The argument
 *   type depends on which `orderBy*()` function was used in this query.
 *   Specify a value that matches the `orderBy*()` type. When used in
 *   combination with `orderByKey()`, the value must be a string.
 * @param {string=} key The child key to end at, among the children with the
 *   previously specified priority. This argument is only allowed if ordering by
 *   child, value, or priority.
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.endAt = function (value, key) {};

/**
 * Creates a `Query` that includes children that match the specified value.
 *
 * Using `startAt()`, `endAt()`, and `equalTo()` allows us to choose arbitrary
 * starting and ending points for our queries.
 *
 * The optional key argument can be used to further limit the range of the
 * query. If it is specified, then children that have exactly the specified
 * value must also have exactly the specified key as their key name. This can be
 * used to filter result sets with many matches for the same value.
 *
 * You can read more about `equalTo()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#filtering_data
 *  Filtering data}.
 *
 * @example
 * // Find all dinosaurs whose height is exactly 25 meters.
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
 *   console.log(snapshot.key);
 * });
 *
 * @param {number|string|boolean|null} value The value to match for. The
 *   argument type depends on which `orderBy*()` function was used in this
 *   query. Specify a value that matches the `orderBy*()` type. When used in
 *   combination with `orderByKey()`, the value must be a string.
 * @param {string=} key The child key to start at, among the children with the
 *   previously specified priority. This argument is only allowed if ordering by
 *   child, value, or priority.
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.equalTo = function (value, key) {};

/**
 * Gets the absolute URL for this location.
 *
 * The `toString()` method returns a URL that is ready to be put into a browser,
 * curl command, or a `firebase.database().refFromURL()` call. Since all of
 * those expect the URL to be url-encoded, `toString()` returns an encoded URL.
 *
 * Append '.json' to the returned URL when typed into a browser to download
 * JSON-formatted data. If the location is secured (that is, not publicly
 * readable), you will get a permission-denied error.
 *
 * @example
 * // Calling toString() on a root Firebase reference returns the URL where its
 * // data is stored within the Database:
 * var rootRef = firebase.database().ref();
 * var rootUrl = rootRef.toString();
 * // rootUrl === "https://sample-app.firebaseio.com/".
 *
 * // Calling toString() at a deeper Firebase reference returns the URL of that
 * // deep path within the Database:
 * var adaRef = rootRef.child('users/ada');
 * var adaURL = adaRef.toString();
 * // adaURL === "https://sample-app.firebaseio.com/users/ada".
 *
 * @return {string} The absolute URL for this location.
 * @override
 */
firebase.database.Query.prototype.toString = function () {};

/**
 * Returns a JSON-serializable representation of this object.
 *
 * @return {!Object} A JSON-serializable representation of this object.
 */
firebase.database.Query.prototype.toJSON = function () {};

/**
 * A `DataSnapshot` contains data from a Database location.
 *
 * Any time you read data from the Database, you receive the data as a
 * `DataSnapshot`. A `DataSnapshot` is passed to the event callbacks you attach
 * with `on()` or `once()`. You can extract the contents of the snapshot as a
 * JavaScript object by calling the `val()` method. Alternatively, you can
 * traverse into the snapshot by calling `child()` to return child snapshots
 * (which you could then call `val()` on).
 *
 * A `DataSnapshot` is an efficiently generated, immutable copy of the data at
 * a Database location. It cannot be modified and will never change (to modify
 * data, you always call the `set()` method on a `Reference` directly).
 *
 * @interface
 */
firebase.database.DataSnapshot = function () {};

/**
 * Extracts a JavaScript value from a `DataSnapshot`.
 *
 * Depending on the data in a `DataSnapshot`, the `val()` method may return a
 * scalar type (string, number, or boolean), an array, or an object. It may also
 * return null, indicating that the `DataSnapshot` is empty (contains no data).
 *
 * @example
 * // Write and then read back a string from the Database.
 * ref.set("hello")
 *   .then(function() {
 *     return ref.once("value");
 *   })
 *   .then(function(snapshot) {
 *     var data = snapshot.val(); // data === "hello"
 *   });
 *
 * @example
 * // Write and then read back a JavaScript object from the Database.
 * ref.set({ name: "Ada", age: 36 })
 *   .then(function() {
 *    return ref.once("value");
 *   })
 *   .then(function(snapshot) {
 *     var data = snapshot.val();
 *     // data is { "name": "Ada", "age": 36 }
 *     // data.name === "Ada"
 *     // data.age === 36
 *   });
 *
 * @return {*} The DataSnapshot's contents as a JavaScript value (Object,
 *   Array, string, number, boolean, or `null`).
 */
firebase.database.DataSnapshot.prototype.val = function () {};

/**
 * Exports the entire contents of the DataSnapshot as a JavaScript object.
 *
 * The `exportVal()` method is similar to `val()`, except priority information
 * is included (if available), making it suitable for backing up your data.
 *
 * @return {*} The DataSnapshot's contents as a JavaScript value (Object,
 *   Array, string, number, boolean, or `null`).
 */
firebase.database.DataSnapshot.prototype.exportVal = function () {};

/**
 * Returns true if this `DataSnapshot` contains any data. It is slightly more
 * efficient than using `snapshot.val() !== null`.
 *
 * @example
 * // Assume we have the following data in the Database:
 * {
 *   "name": {
 *     "first": "Ada",
 *     "last": "Lovelace"
 *   }
 * }
 *
 * // Test for the existence of certain keys within a DataSnapshot
 * var ref = firebase.database().ref("users/ada");
 * ref.once("value")
 *   .then(function(snapshot) {
 *     var a = snapshot.exists();  // true
 *     var b = snapshot.child("name").exists(); // true
 *     var c = snapshot.child("name/first").exists(); // true
 *     var d = snapshot.child("name/middle").exists(); // false
 *   });
 *
 * @return {boolean}
 */
firebase.database.DataSnapshot.prototype.exists = function () {};

/**
 * Gets another `DataSnapshot` for the location at the specified relative path.
 *
 * Passing a relative path to the `child()` method of a DataSnapshot returns
 * another `DataSnapshot` for the location at the specified relative path. The
 * relative path can either be a simple child name (for example, "ada") or a
 * deeper, slash-separated path (for example, "ada/name/first"). If the child
 * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
 * whose value is `null`) is returned.
 *
 * @example
 * // Assume we have the following data in the Database:
 * {
 *   "name": {
 *     "first": "Ada",
 *     "last": "Lovelace"
 *   }
 * }
 *
 * // Test for the existence of certain keys within a DataSnapshot
 * var ref = firebase.database().ref("users/ada");
 * ref.once("value")
 *   .then(function(snapshot) {
 *     var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
 *     var firstName = snapshot.child("name/first").val(); // "Ada"
 *     var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
 *     var age = snapshot.child("age").val(); // null
 *   });
 *
 * @param {string} path A relative path to the location of child data.
 * @return {!firebase.database.DataSnapshot}
 */
firebase.database.DataSnapshot.prototype.child = function (path) {};

/**
 * Returns true if the specified child path has (non-null) data.
 *
 * @example
 * // Assume we have the following data in the Database:
 * {
 *   "name": {
 *     "first": "Ada",
 *     "last": "Lovelace"
 *   }
 * }
 *
 * // Determine which child keys in DataSnapshot have data.
 * var ref = firebase.database().ref("users/ada");
 * ref.once("value")
 *   .then(function(snapshot) {
 *     var hasName = snapshot.hasChild("name"); // true
 *     var hasAge = snapshot.hasChild("age"); // false
 *   });
 *
 * @param {string} path A relative path to the location of a potential child.
 * @return {boolean} `true` if data exists at the specified child path; else
 *  `false`.
 */
firebase.database.DataSnapshot.prototype.hasChild = function (path) {};

/**
 * Gets the priority value of the data in this `DataSnapshot`.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data
 *  Sorting and filtering data}).
 *
 * @return {string|number|null}
 */
firebase.database.DataSnapshot.prototype.getPriority = function () {};

/**
 * Enumerates the top-level children in the `DataSnapshot`.
 *
 * Because of the way JavaScript objects work, the ordering of data in the
 * JavaScript object returned by `val()` is not guaranteed to match the ordering
 * on the server nor the ordering of `child_added` events. That is where
 * `forEach()` comes in handy. It guarantees the children of a `DataSnapshot`
 * will be iterated in their query order.
 *
 * If no explicit `orderBy*()` method is used, results are returned
 * ordered by key (unless priorities are used, in which case, results are
 * returned by priority).
 *
 * @example
 *
 * // Assume we have the following data in the Database:
 * {
 *   "users": {
 *     "ada": {
 *       "first": "Ada",
 *       "last": "Lovelace"
 *     },
 *     "alan": {
 *       "first": "Alan",
 *       "last": "Turing"
 *     }
 *   }
 * }
 *
 * // Loop through users in order with the forEach() method. The callback
 * // provided to forEach() will be called synchronously with a DataSnapshot
 * // for each child:
 * var query = firebase.database().ref("users").orderByKey();
 * query.once("value")
 *   .then(function(snapshot) {
 *     snapshot.forEach(function(childSnapshot) {
 *       // key will be "ada" the first time and "alan" the second time
 *       var key = childSnapshot.key;
 *       // childData will be the actual contents of the child
 *       var childData = childSnapshot.val();
 *   });
 * });
 *
 * @example
 * // You can cancel the enumeration at any point by having your callback
 * // function return true. For example, the following code sample will only
 * // fire the callback function one time:
 * var query = firebase.database().ref("users").orderByKey();
 * query.once("value")
 *   .then(function(snapshot) {
 *     snapshot.forEach(function(childSnapshot) {
 *       var key = childSnapshot.key; // "ada"
 *
 *       // Cancel enumeration
 *       return true;
 *   });
 * });
 *
 * @param {function(!firebase.database.DataSnapshot): boolean} action A function
 *   that will be called for each child DataSnapshot. The callback can return
 *   true to cancel further enumeration.
 * @return {boolean} true if enumeration was canceled due to your callback
 *   returning true.
 */
firebase.database.DataSnapshot.prototype.forEach = function (action) {};

/**
 * Returns whether or not the `DataSnapshot` has any non-`null` child
 * properties.
 *
 * You can use `hasChildren()` to determine if a `DataSnapshot` has any
 * children. If it does, you can enumerate them using `forEach()`. If it
 * doesn't, then either this snapshot contains a primitive value (which can be
 * retrieved with `val()`) or it is empty (in which case, `val()` will return
 * `null`).
 *
 * @example
 * // Assume we have the following data in the Database:
 * {
 *   "name": {
 *     "first": "Ada",
 *     "last": "Lovelace"
 *   }
 * }
 *
 * var ref = firebase.database().ref("users/ada");
 * ref.once("value")
 *   .then(function(snapshot) {
 *     var a = snapshot.hasChildren(); // true
 *     var b = snapshot.child("name").hasChildren(); // true
 *     var c = snapshot.child("name/first").hasChildren(); // false
 *   });
 *
 * @return {boolean} true if this snapshot has any children; else false.
 */
firebase.database.DataSnapshot.prototype.hasChildren = function () {};

/**
 * The key (last part of the path) of the location of this `DataSnapshot`.
 *
 * The last token in a Database location is considered its key. For example,
 * "ada" is the key for the /users/ada/ node. Accessing the key on any
 * `DataSnapshot` will return the key for the location that generated it.
 * However, accessing the key on the root URL of a Database will return `null`.
 *
 * @example
 * // Assume we have the following data in the Database:
 * {
 *   "name": {
 *     "first": "Ada",
 *     "last": "Lovelace"
 *   }
 * }
 *
 * var ref = firebase.database().ref("users/ada");
 * ref.once("value")
 *   .then(function(snapshot) {
 *     var key = snapshot.key; // "ada"
 *     var childKey = snapshot.child("name/last").key; // "last"
 *   });
 *
 * @example
 * var rootRef = firebase.database().ref();
 * rootRef.once("value")
 *   .then(function(snapshot) {
 *     var key = snapshot.key; // null
 *     var childKey = snapshot.child("users/ada").key; // "ada"
 *   });
 *
 * @type {string|null}
 */
firebase.database.DataSnapshot.prototype.key;

/**
 * Returns the number of child properties of this `DataSnapshot`.
 *
 * @example
 * // Assume we have the following data in the Database:
 * {
 *   "name": {
 *     "first": "Ada",
 *     "last": "Lovelace"
 *   }
 * }
 *
 * var ref = firebase.database().ref("users/ada");
 * ref.once("value")
 *   .then(function(snapshot) {
 *     var a = snapshot.numChildren(); // 1 ("name")
 *     var b = snapshot.child("name").numChildren(); // 2 ("first", "last")
 *     var c = snapshot.child("name/first").numChildren(); // 0
 *   });
 *
 * @return {number}
 */
firebase.database.DataSnapshot.prototype.numChildren = function () {};

/**
 * The `Reference` for the location that generated this `DataSnapshot`.
 *
 * @type {!firebase.database.Reference}
 */
firebase.database.DataSnapshot.prototype.ref;

/**
 * Returns a JSON-serializable representation of this object.
 *
 * @return {?Object} A JSON-serializable representation of this object.
 */
firebase.database.DataSnapshot.prototype.toJSON = function () {};

/**
 * The `onDisconnect` class allows you to write or clear data when your client
 * disconnects from the Database server. These updates occur whether your
 * client disconnects cleanly or not, so you can rely on them to clean up data
 * even if a connection is dropped or a client crashes.
 *
 * The `onDisconnect` class is most commonly used to manage presence in
 * applications where it is useful to detect how many clients are connected and
 * when other clients disconnect. See
 * {@link
 *   https://firebase.google.com/docs/database/web/offline-capabilities
 *   Enabling Offline Capabilities in JavaScript} for more information.
 *
 * To avoid problems when a connection is dropped before the requests can be
 * transferred to the Database server, these functions should be called before
 * writing any data.
 *
 * Note that `onDisconnect` operations are only triggered once. If you want an
 * operation to occur each time a disconnect occurs, you'll need to re-establish
 * the `onDisconnect` operations each time you reconnect.
 *
 * @interface
 */
firebase.database.OnDisconnect = function () {};

/**
 * Cancels all previously queued `onDisconnect()` set or update events for this
 * location and all children.
 *
 * If a write has been queued for this location via a `set()` or `update()` at a
 * parent location, the write at this location will be canceled, though writes
 * to sibling locations will still occur.
 *
 * @example
 * var ref = firebase.database().ref("onlineState");
 * ref.onDisconnect().set(false);
 * // ... sometime later
 * ref.onDisconnect().cancel();
 *
 * @param {function(?Error)=} onComplete An optional callback function that will
 *   be called when synchronization to the server has completed. The callback
 *   will be passed a single parameter: null for success, or an Error object
 *   indicating a failure.
 * @return {!firebase.Promise<void>} Resolves when synchronization to the server
 *   is complete.
 */
firebase.database.OnDisconnect.prototype.cancel = function (onComplete) {};

/**
 * Ensures the data at this location is deleted when the client is disconnected
 * (due to closing the browser, navigating to a new page, or network issues).
 *
 * @param {function(?Error)=} onComplete An optional callback function that will
 *   be called when synchronization to the server has completed. The callback
 *   will be passed a single parameter: null for success, or an Error object
 *   indicating a failure.
 * @return {!firebase.Promise<void>} Resolves when synchronization to the server
 *   is complete.
 */
firebase.database.OnDisconnect.prototype.remove = function (onComplete) {};

/**
 * Ensures the data at this location is set to the specified value when the
 * client is disconnected (due to closing the browser, navigating to a new page,
 * or network issues).
 *
 * `set()` is especially useful for implementing "presence" systems, where a
 * value should be changed or cleared when a user disconnects so that they
 * appear "offline" to other users. See
 * {@link
 *   https://firebase.google.com/docs/database/web/offline-capabilities
 *   Enabling Offline Capabilities in JavaScript} for more information.
 *
 * Note that `onDisconnect` operations are only triggered once. If you want an
 * operation to occur each time a disconnect occurs, you'll need to re-establish
 * the `onDisconnect` operations each time.
 *
 * @example
 * var ref = firebase.database().ref("users/ada/status");
 * ref.onDisconnect().set("I disconnected!");
 *
 * @param {*} value The value to be written to this location on
 *   disconnect (can be an object, array, string, number, boolean, or null).
 * @param {function(?Error)=} onComplete An optional callback function that
 *   will be called when synchronization to the Database server has completed.
 *   The callback will be passed a single parameter: null for success, or an
 *   `Error` object indicating a failure.
 * @return {!firebase.Promise<void>} Resolves when synchronization to the
 *   Database is complete.
 */
firebase.database.OnDisconnect.prototype.set = function (value, onComplete) {};

/**
 * Ensures the data at this location is set to the specified value and priority
 * when the client is disconnected (due to closing the browser, navigating to a
 * new page, or network issues).
 *
 * @param {*} value
 * @param {number|string|null} priority
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.OnDisconnect.prototype.setWithPriority = function (
  value,
  priority,
  onComplete
) {};

/**
 * Writes multiple values at this location when the client is disconnected (due
 * to closing the browser, navigating to a new page, or network issues).
 *
 * The `values` argument contains multiple property-value pairs that will be
 * written to the Database together. Each child property can either be a simple
 * property (for example, "name") or a relative path (for example, "name/first")
 * from the current location to the data to update.
 *
 * As opposed to the `set()` method, `update()` can be use to selectively update
 * only the referenced properties at the current location (instead of replacing
 * all the child properties at the current location).
 *
 * See more examples using the connected version of
 * {@link firebase.database.Reference#update `update()`}.
 *
 * @example
 * var ref = firebase.database().ref("users/ada");
 * ref.update({
 *    onlineState: true,
 *    status: "I'm online."
 * });
 * ref.onDisconnect().update({
 *   onlineState: false,
 *   status: "I'm offline."
 * });
 *
 * @param {!Object} values Object containing multiple values.
 * @param {function(?Error)=} onComplete An optional callback function that will
 *   be called when synchronization to the server has completed. The
 *   callback will be passed a single parameter: null for success, or an Error
 *   object indicating a failure.
 * @return {!firebase.Promise<void>} Resolves when synchronization to the
 *   Database is complete.
 */
firebase.database.OnDisconnect.prototype.update = function (
  values,
  onComplete
) {};
