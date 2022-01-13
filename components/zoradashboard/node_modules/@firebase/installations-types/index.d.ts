/**
 * @license
 * Copyright 2019 Google LLC
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

export interface FirebaseInstallations {
  /**
   * Creates a Firebase Installation if there isn't one for the app and
   * returns the Installation ID.
   *
   * @return Firebase Installation ID
   */
  getId(): Promise<string>;

  /**
   * Returns an Authentication Token for the current Firebase Installation.
   *
   * @return Firebase Installation Authentication Token
   */
  getToken(forceRefresh?: boolean): Promise<string>;

  /**
   * Deletes the Firebase Installation and all associated data.
   */
  delete(): Promise<void>;

  /**
   * Sets a new callback that will get called when Installlation ID changes.
   * Returns an unsubscribe function that will remove the callback when called.
   */
  onIdChange(callback: (installationId: string) => void): () => void;
}

export type FirebaseInstallationsName = 'installations';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'installations': FirebaseInstallations;
  }
}
