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

import { CreateInstallationResponse } from '../interfaces/api-response';
import { AppConfig } from '../interfaces/app-config';
import {
  InProgressInstallationEntry,
  RegisteredInstallationEntry,
  RequestStatus
} from '../interfaces/installation-entry';
import { INTERNAL_AUTH_VERSION, PACKAGE_VERSION } from '../util/constants';
import {
  extractAuthTokenInfoFromResponse,
  getErrorFromResponse,
  getHeaders,
  getInstallationsEndpoint,
  retryIfServerError
} from './common';

export async function createInstallationRequest(
  appConfig: AppConfig,
  { fid }: InProgressInstallationEntry
): Promise<RegisteredInstallationEntry> {
  const endpoint = getInstallationsEndpoint(appConfig);

  const headers = getHeaders(appConfig);
  const body = {
    fid,
    authVersion: INTERNAL_AUTH_VERSION,
    appId: appConfig.appId,
    sdkVersion: PACKAGE_VERSION
  };

  const request: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  };

  const response = await retryIfServerError(() => fetch(endpoint, request));
  if (response.ok) {
    const responseValue: CreateInstallationResponse = await response.json();
    const registeredInstallationEntry: RegisteredInstallationEntry = {
      fid: responseValue.fid || fid,
      registrationStatus: RequestStatus.COMPLETED,
      refreshToken: responseValue.refreshToken,
      authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
    };
    return registeredInstallationEntry;
  } else {
    throw await getErrorFromResponse('Create Installation', response);
  }
}
