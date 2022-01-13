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

import firebase from '@firebase/app';
import {
  _FirebaseNamespace,
  FirebaseService
} from '@firebase/app-types/private';
import { Component, ComponentType } from '@firebase/component';
import { FirebaseInstallations } from '@firebase/installations-types';
import {
  deleteInstallation,
  getId,
  getToken,
  IdChangeCallbackFn,
  IdChangeUnsubscribeFn,
  onIdChange
} from './functions';
import { extractAppConfig } from './helpers/extract-app-config';
import { FirebaseDependencies } from './interfaces/firebase-dependencies';

import { name, version } from '../package.json';

export function registerInstallations(instance: _FirebaseNamespace): void {
  const installationsName = 'installations';

  instance.INTERNAL.registerComponent(
    new Component(
      installationsName,
      container => {
        const app = container.getProvider('app').getImmediate();

        // Throws if app isn't configured properly.
        const appConfig = extractAppConfig(app);
        const platformLoggerProvider = container.getProvider('platform-logger');
        const dependencies: FirebaseDependencies = {
          appConfig,
          platformLoggerProvider
        };

        const installations: FirebaseInstallations & FirebaseService = {
          app,
          getId: () => getId(dependencies),
          getToken: (forceRefresh?: boolean) =>
            getToken(dependencies, forceRefresh),
          delete: () => deleteInstallation(dependencies),
          onIdChange: (callback: IdChangeCallbackFn): IdChangeUnsubscribeFn =>
            onIdChange(dependencies, callback)
        };
        return installations;
      },
      ComponentType.PUBLIC
    )
  );

  instance.registerVersion(name, version);
}

registerInstallations(firebase as _FirebaseNamespace);

/**
 * Define extension behavior of `registerInstallations`
 */
declare module '@firebase/app-types' {
  interface FirebaseNamespace {
    installations(app?: FirebaseApp): FirebaseInstallations;
  }
  interface FirebaseApp {
    installations(): FirebaseInstallations;
  }
}
