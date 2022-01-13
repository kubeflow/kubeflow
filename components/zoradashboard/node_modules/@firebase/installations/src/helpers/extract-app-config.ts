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

import { FirebaseApp, FirebaseOptions } from '@firebase/app-types';
import { FirebaseError } from '@firebase/util';
import { AppConfig } from '../interfaces/app-config';
import { ERROR_FACTORY, ErrorCode } from '../util/errors';

export function extractAppConfig(app: FirebaseApp): AppConfig {
  if (!app || !app.options) {
    throw getMissingValueError('App Configuration');
  }

  if (!app.name) {
    throw getMissingValueError('App Name');
  }

  // Required app config keys
  const configKeys: Array<keyof FirebaseOptions> = [
    'projectId',
    'apiKey',
    'appId'
  ];

  for (const keyName of configKeys) {
    if (!app.options[keyName]) {
      throw getMissingValueError(keyName);
    }
  }

  return {
    appName: app.name,
    projectId: app.options.projectId!,
    apiKey: app.options.apiKey!,
    appId: app.options.appId!
  };
}

function getMissingValueError(valueName: string): FirebaseError {
  return ERROR_FACTORY.create(ErrorCode.MISSING_APP_CONFIG_VALUES, {
    valueName
  });
}
