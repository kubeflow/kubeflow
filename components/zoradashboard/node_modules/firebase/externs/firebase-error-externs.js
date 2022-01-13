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
 * @fileoverview Firebase Error API.
 * @externs
 */

//--------------------------//
//  firebase.FirebaseError  //
//--------------------------//

/**
 * `FirebaseError` is a subclass of the standard JavaScript `Error` object. In
 * addition to a message string and stack trace, it contains a string code.
 *
 * @interface
 */
firebase.FirebaseError;

/**
 * Error codes are strings using the following format: `"service/string-code"`.
 * Some examples include `"app/no-app"` and `"auth/user-not-found"`.
 *
 * While the message for a given error can change, the code will remain the same
 * between backward-compatible versions of the Firebase SDK.
 *
 * @type {string}
 */
firebase.FirebaseError.prototype.code;

/**
 * An explanatory message for the error that just occurred.
 *
 * This message is designed to be helpful to you, the developer. It is not
 * intended to be displayed to the end user of your application (as it will
 * generally not convey meaningful information to them).
 *
 * @type {string}
 */
firebase.FirebaseError.prototype.message;

/**
 * The name of the class of errors, namely `"FirebaseError"`.
 *
 * @type {string}
 */
firebase.FirebaseError.prototype.name;

/**
 * A string value containing the execution backtrace when the error originally
 * occurred. This may not always be available.
 *
 * This information can be useful to you and can be sent to
 * {@link https://firebase.google.com/support/ Firebase Support} to help
 * explain the cause of an error.
 *
 * @type {string|undefined}
 */
firebase.FirebaseError.prototype.stack;
