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

import { PartialObserver, Unsubscribe } from '@firebase/util';
import { FirebaseApp } from '@firebase/app-types';

export interface FirebaseAppCheck {
  /** The `FirebaseApp` associated with this instance. */
  app: FirebaseApp;

  /**
   * Activate AppCheck
   * @param siteKeyOrProvider - reCAPTCHA sitekey or custom token provider
   * @param isTokenAutoRefreshEnabled - If true, enables SDK to automatically
   * refresh AppCheck token as needed. If undefined, the value will default
   * to the value of `app.automaticDataCollectionEnabled`. That property
   * defaults to false and can be set in the app config.
   */
  activate(
    siteKeyOrProvider: string | AppCheckProvider,
    isTokenAutoRefreshEnabled?: boolean
  ): void;

  /**
   *
   * @param isTokenAutoRefreshEnabled - If true, the SDK automatically
   * refreshes App Check tokens as needed. This overrides any value set
   * during `activate()`.
   */
  setTokenAutoRefreshEnabled(isTokenAutoRefreshEnabled: boolean): void;

  /**
   * Get the current App Check token. Attaches to the most recent
   * in-flight request if one is present. Returns null if no token
   * is present and no token requests are in flight.
   *
   * @param forceRefresh - If true, will always try to fetch a fresh token.
   * If false, will use a cached token if found in storage.
   */
  getToken(forceRefresh?: boolean): Promise<AppCheckTokenResult>;

  /**
   * Registers a listener to changes in the token state. There can be more
   * than one listener registered at the same time for one or more
   * App Check instances. The listeners call back on the UI thread whenever
   * the current token associated with this App Check instance changes.
   *
   * @returns A function that unsubscribes this listener.
   */
  onTokenChanged(observer: PartialObserver<AppCheckTokenResult>): Unsubscribe;

  /**
   * Registers a listener to changes in the token state. There can be more
   * than one listener registered at the same time for one or more
   * App Check instances. The listeners call back on the UI thread whenever
   * the current token associated with this App Check instance changes.
   *
   * @returns A function that unsubscribes this listener.
   */
  onTokenChanged(
    onNext: (tokenResult: AppCheckTokenResult) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): Unsubscribe;
}

/**
 * An App Check provider. This can be either the built-in reCAPTCHA provider
 * or a custom provider. For more on custom providers, see
 * https://firebase.google.com/docs/app-check/web-custom-provider
 */
interface AppCheckProvider {
  /**
   * Returns an AppCheck token.
   */
  getToken(): Promise<AppCheckToken>;
}

/**
 * The token returned from an `AppCheckProvider`.
 */
interface AppCheckToken {
  /**
   * The token string in JWT format.
   */
  readonly token: string;
  /**
   * The local timestamp after which the token will expire.
   */
  readonly expireTimeMillis: number;
}

/**
 * Result returned by `getToken()`.
 */
interface AppCheckTokenResult {
  /**
   * The token string in JWT format.
   */
  readonly token: string;
}

export type AppCheckComponentName = 'appCheck';
declare module '@firebase/component' {
  interface NameServiceMapping {
    'appCheck': FirebaseAppCheck;
  }
}
