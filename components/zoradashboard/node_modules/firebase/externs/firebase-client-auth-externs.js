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
 * @fileoverview Firebase client Auth API.
 * @externs
 */

/**
 * Links the authenticated provider to the user account using a pop-up based
 * OAuth flow.
 *
 * If the linking is successful, the returned result will contain the user
 * and the provider's credential.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/auth-domain-config-required</dt>
 * <dd>Thrown if authDomain configuration is not provided when calling
 *     firebase.initializeApp(). Check Firebase Console for instructions on
 *     determining and passing that field.</dd>
 * <dt>auth/cancelled-popup-request</dt>
 * <dd>Thrown if successive popup operations are triggered. Only one popup
 *     request is allowed at one time on a user or an auth instance. All the
 *     popups would fail with this error except for the last one.</dd>
 * <dt>auth/credential-already-in-use</dt>
 * <dd>Thrown if the account corresponding to the credential already exists
 *     among your users, or is already linked to a Firebase User.
 *     For example, this error could be thrown if you are upgrading an anonymous
 *     user to a Google user by linking a Google credential to it and the Google
 *     credential used is already associated with an existing Firebase Google
 *     user.
 *     An <code>error.email</code> and <code>error.credential</code>
 *     ({@link firebase.auth.AuthCredential}) fields are also provided. You can
 *     recover from this error by signing in with that credential directly via
 *     {@link firebase.auth.Auth#signInWithCredential}.</dd>
 * <dt>auth/email-already-in-use</dt>
 * <dd>Thrown if the email corresponding to the credential already exists
 *     among your users. When thrown while linking a credential to an existing
 *     user, an <code>error.email</code> and <code>error.credential</code>
 *     ({@link firebase.auth.AuthCredential}) fields are also provided.
 *     You have to link the credential to the existing user with that email if
 *     you wish to continue signing in with that credential. To do so, call
 *     {@link firebase.auth.Auth#fetchProvidersForEmail}, sign in to
 *     <code>error.email</code> via one of the providers returned and then
 *     {@link firebase.User#linkWithCredential} the original credential to that
 *     newly signed in user.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if you have not enabled the provider in the Firebase Console. Go
 *     to the Firebase Console for your project, in the Auth section and the
 *     <strong>Sign in Method</strong> tab and configure the provider.</dd>
 * <dt>auth/popup-blocked</dt>
 * <dt>auth/operation-not-supported-in-this-environment</dt>
 * <dd>Thrown if this operation is not supported in the environment your
 *     application is running on. "location.protocol" must be http or https.
 *     </dd>
 * <dd>Thrown if the popup was blocked by the browser, typically when this
 *     operation is triggered outside of a click handler.</dd>
 * <dt>auth/popup-closed-by-user</dt>
 * <dd>Thrown if the popup window is closed by the user without completing the
 *     sign in to the provider.</dd>
 * <dt>auth/provider-already-linked</dt>
 * <dd>Thrown if the provider has already been linked to the user. This error is
 *     thrown even if this is not the same provider's account that is currently
 *     linked to the user.</dd>
 * <dt>auth/unauthorized-domain</dt>
 * <dd>Thrown if the app domain is not authorized for OAuth operations for your
 *     Firebase project. Edit the list of authorized domains from the Firebase
 *     console.</dd>
 * </dl>
 *
 * @example
 * // Creates the provider object.
 * var provider = new firebase.auth.FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('email');
 * provider.addScope('user_friends');
 * // Link with popup:
 * user.linkWithPopup(provider).then(function(result) {
 *   // The firebase.User instance:
 *   var user = result.user;
 *   // The Facebook firebase.auth.AuthCredential containing the Facebook
 *   // access token:
 *   var credential = result.credential;
 * }, function(error) {
 *   // An error happened.
 * });
 *
 * @param {!firebase.auth.AuthProvider} provider The provider to authenticate.
 *     The provider has to be an OAuth provider. Non-OAuth providers like {@link
 *     firebase.auth.EmailAuthProvider} will throw an error.
 * @return {!firebase.Promise<!firebase.auth.UserCredential>}
 */
firebase.User.prototype.linkWithPopup = function (provider) {};

/**
 * Links the authenticated provider to the user account using a full-page
 * redirect flow.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/auth-domain-config-required</dt>
 * <dd>Thrown if authDomain configuration is not provided when calling
 *     firebase.initializeApp(). Check Firebase Console for instructions on
 *     determining and passing that field.</dd>
 * <dt>auth/operation-not-supported-in-this-environment</dt>
 * <dd>Thrown if this operation is not supported in the environment your
 *     application is running on. "location.protocol" must be http or https.
 *     </dd>
 * <dt>auth/provider-already-linked</dt>
 * <dd>Thrown if the provider has already been linked to the user. This error is
 *     thrown even if this is not the same provider's account that is currently
 *     linked to the user.</dd>
 * <dt>auth/unauthorized-domain</dt>
 * <dd>Thrown if the app domain is not authorized for OAuth operations for your
 *     Firebase project. Edit the list of authorized domains from the Firebase
 *     console.</dd>
 * </dl>
 *
 * @param {!firebase.auth.AuthProvider} provider The provider to authenticate.
 *     The provider has to be an OAuth provider. Non-OAuth providers like {@link
 *     firebase.auth.EmailAuthProvider} will throw an error.
 * @return {!firebase.Promise<void>}
 */
firebase.User.prototype.linkWithRedirect = function (provider) {};

/**
 * Authenticates a Firebase client using a popup-based OAuth authentication
 * flow.
 *
 * If succeeds, returns the signed in user along with the provider's credential.
 * If sign in was unsuccessful, returns an error object containing additional
 * information about the error.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/account-exists-with-different-credential</dt>
 * <dd>Thrown if there already exists an account with the email address
 *     asserted by the credential. Resolve this by calling
 *     {@link firebase.auth.Auth#fetchProvidersForEmail} with the error.email
 *     and then asking the user to sign in using one of the returned providers.
 *     Once the user is signed in, the original credential retrieved from the
 *     error.credential can be linked to the user with
 *     {@link firebase.User#linkWithCredential} to prevent the user from signing
 *     in again to the original provider via popup or redirect. If you are using
 *     redirects for sign in, save the credential in session storage and then
 *     retrieve on redirect and repopulate the credential using for example
 *     {@link firebase.auth.GoogleAuthProvider#credential} depending on the
 *     credential provider id and complete the link.</dd>
 * <dt>auth/auth-domain-config-required</dt>
 * <dd>Thrown if authDomain configuration is not provided when calling
 *     firebase.initializeApp(). Check Firebase Console for instructions on
 *     determining and passing that field.</dd>
 * <dt>auth/cancelled-popup-request</dt>
 * <dd>Thrown if successive popup operations are triggered. Only one popup
 *     request is allowed at one time. All the popups would fail with this error
 *     except for the last one.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if the type of account corresponding to the credential
 *     is not enabled. Enable the account type in the Firebase Console, under
 *     the Auth tab.</dd>
 * <dt>auth/operation-not-supported-in-this-environment</dt>
 * <dd>Thrown if this operation is not supported in the environment your
 *     application is running on. "location.protocol" must be http or https.
 *     </dd>
 * <dt>auth/popup-blocked</dt>
 * <dd>Thrown if the popup was blocked by the browser, typically when this
 *     operation is triggered outside of a click handler.</dd>
 * <dt>auth/popup-closed-by-user</dt>
 * <dd>Thrown if the popup window is closed by the user without completing the
 *     sign in to the provider.</dd>
 * <dt>auth/unauthorized-domain</dt>
 * <dd>Thrown if the app domain is not authorized for OAuth operations for your
 *     Firebase project. Edit the list of authorized domains from the Firebase
 *     console.</dd>
 * </dl>
 *
 * @example
 * // Creates the provider object.
 * var provider = new firebase.auth.FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('email');
 * provider.addScope('user_friends');
 * // Sign in with popup:
 * auth.signInWithPopup(provider).then(function(result) {
 *   // The firebase.User instance:
 *   var user = result.user;
 *   // The Facebook firebase.auth.AuthCredential containing the Facebook
 *   // access token:
 *   var credential = result.credential;
 * }, function(error) {
 *   // The provider's account email, can be used in case of
 *   // auth/account-exists-with-different-credential to fetch the providers
 *   // linked to the email:
 *   var email = error.email;
 *   // The provider's credential:
 *   var credential = error.credential;
 *   // In case of auth/account-exists-with-different-credential error,
 *   // you can fetch the providers using this:
 *   if (error.code === 'auth/account-exists-with-different-credential') {
 *     auth.fetchProvidersForEmail(email).then(function(providers) {
 *       // The returned 'providers' is a list of the available providers
 *       // linked to the email address. Please refer to the guide for a more
 *       // complete explanation on how to recover from this error.
 *     });
 *   }
 * });
 *
 * @param {!firebase.auth.AuthProvider} provider The provider to authenticate.
 *     The provider has to be an OAuth provider. Non-OAuth providers like {@link
 *     firebase.auth.EmailAuthProvider} will throw an error.
 * @return {!firebase.Promise<!firebase.auth.UserCredential>}
 */
firebase.auth.Auth.prototype.signInWithPopup = function (provider) {};

/**
 * Authenticates a Firebase client using a full-page redirect flow. To handle
 * the results and errors for this operation, refer to {@link
 * firebase.auth.Auth#getRedirectResult}.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/auth-domain-config-required</dt>
 * <dd>Thrown if authDomain configuration is not provided when calling
 *     firebase.initializeApp(). Check Firebase Console for instructions on
 *     determining and passing that field.</dd>
 * <dt>auth/operation-not-supported-in-this-environment</dt>
 * <dd>Thrown if this operation is not supported in the environment your
 *     application is running on. "location.protocol" must be http or https.
 *     </dd>
 * <dt>auth/unauthorized-domain</dt>
 * <dd>Thrown if the app domain is not authorized for OAuth operations for your
 *     Firebase project. Edit the list of authorized domains from the Firebase
 *     console.</dd>
 * </dl>
 *
 * @param {!firebase.auth.AuthProvider} provider The provider to authenticate.
 *     The provider has to be an OAuth provider. Non-OAuth providers like {@link
 *     firebase.auth.EmailAuthProvider} will throw an error.
 * @return {!firebase.Promise<void>}
 */
firebase.auth.Auth.prototype.signInWithRedirect = function (provider) {};

/**
 * Reauthenticates the current user with the specified provider using a pop-up
 * based OAuth flow.
 *
 * If the reauthentication is successful, the returned result will contain the
 * user and the provider's credential.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/auth-domain-config-required</dt>
 * <dd>Thrown if authDomain configuration is not provided when calling
 *     firebase.initializeApp(). Check Firebase Console for instructions on
 *     determining and passing that field.</dd>
 * <dt>auth/cancelled-popup-request</dt>
 * <dd>Thrown if successive popup operations are triggered. Only one popup
 *     request is allowed at one time on a user or an auth instance. All the
 *     popups would fail with this error except for the last one.</dd>
 * <dt>auth/user-mismatch</dt>
 * <dd>Thrown if the credential given does not correspond to the user.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if you have not enabled the provider in the Firebase Console. Go
 *     to the Firebase Console for your project, in the Auth section and the
 *     <strong>Sign in Method</strong> tab and configure the provider.</dd>
 * <dt>auth/popup-blocked</dt>
 * <dd>Thrown if the popup was blocked by the browser, typically when this
 *     operation is triggered outside of a click handler.</dd>
 * <dt>auth/operation-not-supported-in-this-environment</dt>
 * <dd>Thrown if this operation is not supported in the environment your
 *     application is running on. "location.protocol" must be http or https.
 *     </dd>
 * <dt>auth/popup-closed-by-user</dt>
 * <dd>Thrown if the popup window is closed by the user without completing the
 *     sign in to the provider.</dd>
 * <dt>auth/unauthorized-domain</dt>
 * <dd>Thrown if the app domain is not authorized for OAuth operations for your
 *     Firebase project. Edit the list of authorized domains from the Firebase
 *     console.</dd>
 * </dl>
 *
 * @example
 * // Creates the provider object.
 * var provider = new firebase.auth.FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('email');
 * provider.addScope('user_friends');
 * // Reauthenticate with popup:
 * user.reauthenticateWithPopup(provider).then(function(result) {
 *   // The firebase.User instance:
 *   var user = result.user;
 *   // The Facebook firebase.auth.AuthCredential containing the Facebook
 *   // access token:
 *   var credential = result.credential;
 * }, function(error) {
 *   // An error happened.
 * });
 *
 * @param {!firebase.auth.AuthProvider} provider The provider to authenticate.
 *     The provider has to be an OAuth provider. Non-OAuth providers like {@link
 *     firebase.auth.EmailAuthProvider} will throw an error.
 * @return {!firebase.Promise<!firebase.auth.UserCredential>}
 */
firebase.User.prototype.reauthenticateWithPopup = function (provider) {};

/**
 * Reauthenticates the current user with the specified OAuth provider using a
 * full-page redirect flow.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/auth-domain-config-required</dt>
 * <dd>Thrown if authDomain configuration is not provided when calling
 *     firebase.initializeApp(). Check Firebase Console for instructions on
 *     determining and passing that field.</dd>
 * <dt>auth/operation-not-supported-in-this-environment</dt>
 * <dd>Thrown if this operation is not supported in the environment your
 *     application is running on. "location.protocol" must be http or https.
 *     </dd>
 * <dt>auth/user-mismatch</dt>
 * <dd>Thrown if the credential given does not correspond to the user.</dd>
 * <dt>auth/unauthorized-domain</dt>
 * <dd>Thrown if the app domain is not authorized for OAuth operations for your
 *     Firebase project. Edit the list of authorized domains from the Firebase
 *     console.</dd>
 * </dl>
 *
 * @param {!firebase.auth.AuthProvider} provider The provider to authenticate.
 *     The provider has to be an OAuth provider. Non-OAuth providers like {@link
 *     firebase.auth.EmailAuthProvider} will throw an error.
 * @return {!firebase.Promise<void>}
 */
firebase.User.prototype.reauthenticateWithRedirect = function (provider) {};

/**
 * Returns a UserCredential from the redirect-based sign-in flow.
 *
 * If sign-in succeeded, returns the signed in user. If sign-in was
 * unsuccessful, fails with an error. If no redirect operation was called,
 * returns a UserCredential with a null User.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/account-exists-with-different-credential</dt>
 * <dd>Thrown if there already exists an account with the email address
 *     asserted by the credential. Resolve this by calling
 *     {@link firebase.auth.Auth#fetchProvidersForEmail} with the error.email
 *     and then asking the user to sign in using one of the returned providers.
 *     Once the user is signed in, the original credential retrieved from the
 *     error.credential can be linked to the user with
 *     {@link firebase.User#linkWithCredential} to prevent the user from signing
 *     in again to the original provider via popup or redirect. If you are using
 *     redirects for sign in, save the credential in session storage and then
 *     retrieve on redirect and repopulate the credential using for example
 *     {@link firebase.auth.GoogleAuthProvider#credential} depending on the
 *     credential provider id and complete the link.</dd>
 * <dt>auth/auth-domain-config-required</dt>
 * <dd>Thrown if authDomain configuration is not provided when calling
 *     firebase.initializeApp(). Check Firebase Console for instructions on
 *     determining and passing that field.</dd>
 * <dt>auth/credential-already-in-use</dt>
 * <dd>Thrown if the account corresponding to the credential already exists
 *     among your users, or is already linked to a Firebase User.
 *     For example, this error could be thrown if you are upgrading an anonymous
 *     user to a Google user by linking a Google credential to it and the Google
 *     credential used is already associated with an existing Firebase Google
 *     user.
 *     An <code>error.email</code> and <code>error.credential</code>
 *     ({@link firebase.auth.AuthCredential}) fields are also provided. You can
 *     recover from this error by signing in with that credential directly via
 *     {@link firebase.auth.Auth#signInWithCredential}.</dd>
 * <dt>auth/email-already-in-use</dt>
 * <dd>Thrown if the email corresponding to the credential already exists
 *     among your users. When thrown while linking a credential to an existing
 *     user, an <code>error.email</code> and <code>error.credential</code>
 *     ({@link firebase.auth.AuthCredential}) fields are also provided.
 *     You have to link the credential to the existing user with that email if
 *     you wish to continue signing in with that credential. To do so, call
 *     {@link firebase.auth.Auth#fetchProvidersForEmail}, sign in to
 *     <code>error.email</code> via one of the providers returned and then
 *     {@link firebase.User#linkWithCredential} the original credential to that
 *     newly signed in user.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if the type of account corresponding to the credential
 *     is not enabled. Enable the account type in the Firebase Console, under
 *     the Auth tab.</dd>
 * <dt>auth/operation-not-supported-in-this-environment</dt>
 * <dd>Thrown if this operation is not supported in the environment your
 *     application is running on. "location.protocol" must be http or https.
 *     </dd>
 * <dt>auth/timeout</dt>
 * <dd>Thrown typically if the app domain is not authorized for OAuth operations
 *     for your Firebase project. Edit the list of authorized domains from the
 *     Firebase console.</dd>
 * </dl>
 *
 * @example
 * // First, we perform the signInWithRedirect.
 * // Creates the provider object.
 * var provider = new firebase.auth.FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('email');
 * provider.addScope('user_friends');
 * // Sign in with redirect:
 * auth.signInWithRedirect(provider)
 * ////////////////////////////////////////////////////////////
 * // The user is redirected to the provider's sign in flow...
 * ////////////////////////////////////////////////////////////
 * // Then redirected back to the app, where we check the redirect result:
 * auth.getRedirectResult().then(function(result) {
 *   // The firebase.User instance:
 *   var user = result.user;
 *   // The Facebook firebase.auth.AuthCredential containing the Facebook
 *   // access token:
 *   var credential = result.credential;
 *   // As this API can be used for sign-in, linking and reauthentication,
 *   // check the operationType to determine what triggered this redirect
 *   // operation.
 *   var operationType = result.operationType;
 * }, function(error) {
 *   // The provider's account email, can be used in case of
 *   // auth/account-exists-with-different-credential to fetch the providers
 *   // linked to the email:
 *   var email = error.email;
 *   // The provider's credential:
 *   var credential = error.credential;
 *   // In case of auth/account-exists-with-different-credential error,
 *   // you can fetch the providers using this:
 *   if (error.code === 'auth/account-exists-with-different-credential') {
 *     auth.fetchProvidersForEmail(email).then(function(providers) {
 *       // The returned 'providers' is a list of the available providers
 *       // linked to the email address. Please refer to the guide for a more
 *       // complete explanation on how to recover from this error.
 *     });
 *   }
 * });
 *
 * @return {!firebase.Promise<!firebase.auth.UserCredential>}
 */
firebase.auth.Auth.prototype.getRedirectResult = function () {};

/**
 * An {@link https://www.google.com/recaptcha/ reCAPTCHA}-based application
 * verifier.
 * @param {!Element|string} container The reCAPTCHA container parameter. This
 *     has different meaning depending on whether the reCAPTCHA is hidden or
 *     visible. For a visible reCAPTCHA the container must be empty. If a string
 *     is used, it has to correspond to an element ID. The corresponding element
 *     must also must be in the DOM at the time of initialization.
 * @param {?Object=} parameters The optional reCAPTCHA parameters. Check the
 *     reCAPTCHA docs for a comprehensive list. All parameters are accepted
 *     except for the sitekey. Firebase Auth backend provisions a reCAPTCHA for
 *     each project and will configure this upon rendering. For an invisible
 *     reCAPTCHA, a size key must have the value 'invisible'.
 * @param {?firebase.app.App=} app The corresponding Firebase app. If none is
 *     provided, the default Firebase App instance is used. A Firebase App
 *     instance must be initialized with an API key, otherwise an error will be
 *     thrown.
 * @constructor
 * @implements {firebase.auth.ApplicationVerifier}
 */
firebase.auth.RecaptchaVerifier = function (container, parameters, app) {};

/**
 * The application verifier type. For a reCAPTCHA verifier, this is 'recaptcha'.
 * @type {string}
 */
firebase.auth.RecaptchaVerifier.prototype.type;

/**
 * Clears the reCAPTCHA widget from the page and destroys the current instance.
 */
firebase.auth.RecaptchaVerifier.prototype.clear = function () {};

/**
 * Renders the reCAPTCHA widget on the page.
 * @return {!firebase.Promise<number>} A Promise that resolves with the
 *     reCAPTCHA widget ID.
 */
firebase.auth.RecaptchaVerifier.prototype.render = function () {};

/**
 * Waits for the user to solve the reCAPTCHA and resolves with the reCAPTCHA
 * token.
 * @return {!firebase.Promise<string>} A Promise for the reCAPTCHA token.
 * @override
 */
firebase.auth.RecaptchaVerifier.prototype.verify = function () {};
