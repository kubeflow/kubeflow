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

import { addCallback, removeCallback } from '../helpers/fid-changed';
import { FirebaseDependencies } from '../interfaces/firebase-dependencies';

export type IdChangeCallbackFn = (installationId: string) => void;
export type IdChangeUnsubscribeFn = () => void;

/**
 * Sets a new callback that will get called when Installation ID changes.
 * Returns an unsubscribe function that will remove the callback when called.
 */
export function onIdChange(
  { appConfig }: FirebaseDependencies,
  callback: IdChangeCallbackFn
): IdChangeUnsubscribeFn {
  addCallback(appConfig, callback);

  return () => {
    removeCallback(appConfig, callback);
  };
}
