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
 * @fileoverview Firebase Messaging API.
 * @externs
 */

/**
 * Gets the {@link firebase.messaging.Messaging `Messaging`} service for the
 * default app or a given app.
 *
 * `firebase.messaging()` can be called with no arguments to access the default
 * app's {@link firebase.messaging.Messaging `Messaging`} service or as
 * `firebase.messaging(app)` to access the
 * {@link firebase.messaging.Messaging `Messaging`} service associated with a
 * specific app.
 *
 * Calling `firebase.messaging()` in a service worker results in Firebase
 * generating notifications if the push message payload has a `notification`
 * parameter.
 *
 * @example
 * // Get the Messaging service for the default app
 * var defaultMessaging = firebase.messaging();
 *
 * @example
 * // Get the Messaging service for a given app
 * var otherMessaging = firebase.messaging(otherApp);
 *
 * @namespace
 * @param {!firebase.app.App=} app The app to create a Messaging service for.
 *     If not passed, uses the default app.
 *
 * @return {!firebase.messaging.Messaging}
 */
firebase.messaging = function (app) {};

/**
 * Gets the {@link firebase.messaging.Messaging `Messaging`} service for the
 * current app.
 *
 * @example
 * var messaging = app.messaging();
 * // The above is shorthand for:
 * // var messaging = firebase.messaging(app);
 *
 * @return {!firebase.messaging.Messaging}
 */
firebase.app.App.prototype.messaging = function () {};

/**
 * The Firebase Messaging service interface.
 *
 * Do not call this constructor directly. Instead, use
 * {@link firebase.messaging `firebase.messaging()`}.
 *
 * See
 * {@link
 *   https://firebase.google.com/docs/cloud-messaging/js/client
 *   Set Up a JavaScript Firebase Cloud Messaging Client App}
 * for a full guide on how to use the Firebase Messaging service.
 *
 * @interface
 */
firebase.messaging.Messaging = function () {};

/**
 * Notification permissions are required to send a user push messages.
 * Calling this method displays the permission dialog to the user and
 * resolves if the permission is granted.
 *
 * @return {firebase.Promise} The promise resolves if permission is
 *   granted. Otherwise, the promise is rejected with an error.
 */
firebase.messaging.Messaging.prototype.requestPermission = function () {};

/**
 * After calling `requestPermission()` you can call this method to get an FCM
 * registration token that can be used to send push messages to this user.
 *
 * @return {firebase.Promise<string>} The promise resolves if an FCM token can
 *   be retrieved. This method returns null if the current origin does not have
 *   permission to show notifications.
 */
firebase.messaging.Messaging.prototype.getToken = function () {};

/**
 * You should listen for token refreshes so your web app knows when FCM
 * has invalidated your existing token and you need to call `getToken()`
 * to get a new token.
 *
 * @param {!firebase.Observer<Object, void>|!function(!Object)}
 *     nextOrObserver This function, or observer object with `next` defined,
 *     is called when a token refresh has occurred.
 * @return {firebase.Unsubscribe} To stop listening for token
 *   refresh events execute this returned function.
 */
firebase.messaging.Messaging.prototype.onTokenRefresh = function (
  nextOrObserver
) {};

/**
 * When a push message is received and the user is currently on a page
 * for your origin, the message is passed to the page and an `onMessage()`
 * event is dispatched with the payload of the push message.
 *
 * NOTE: These events are dispatched when you have called
 * `setBackgroundMessageHandler()` in your service worker.
 *
 * @param {!firebase.Observer<Object, void>|!function(!Object)}
 *     nextOrObserver This function, or observer object with `next` defined,
 *     is called when a message is received and the user is currently viewing your page.
 * @return {firebase.Unsubscribe} To stop listening for messages
 *    execute this returned function.
 */
firebase.messaging.Messaging.prototype.onMessage = function (nextOrObserver) {};

/**
 * To forceably stop a registration token from being used, delete it
 * by calling this method.
 *
 * @param {!string} token The token to delete.
 * @return {firebase.Promise} The promise resolves when the token has been
 *   successfully deleted.
 */
firebase.messaging.Messaging.prototype.deleteToken = function (token) {};

/**
 * To use your own service worker for receiving push messages, you
 * can pass in your service worker registration in this method.
 *
 * @param {!ServiceWorkerRegistration} registration The service worker
 *   registration you wish to use for push messaging.
 */
firebase.messaging.Messaging.prototype.useServiceWorker = function (
  registration
) {};

/**
 * FCM directs push messages to your web page's `onMessage()` callback
 * if the user currently has it open. Otherwise, it calls
 * your callback passed into `setBackgroundMessageHandler()`.
 *
 * Your callback should return a promise that, once resolved, has
 * shown a notification.
 *
 * @param {!function(!Object)} callback The function to handle the push message.
 */
firebase.messaging.Messaging.prototype.setBackgroundMessageHandler = function (
  callback
) {};
