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

import { FirebaseError } from '@firebase/util';
import { GenerateAuthTokenResponse } from '../interfaces/api-response';
import { AppConfig } from '../interfaces/app-config';
import {
  CompletedAuthToken,
  RegisteredInstallationEntry,
  RequestStatus
} from '../interfaces/installation-entry';
import {
  INSTALLATIONS_API_URL,
  INTERNAL_AUTH_VERSION
} from '../util/constants';
import { ERROR_FACTORY, ErrorCode } from '../util/errors';

export function getInstallationsEndpoint({ projectId }: AppConfig): string {
  return `${INSTALLATIONS_API_URL}/projects/${projectId}/installations`;
}

export function extractAuthTokenInfoFromResponse(
  response: GenerateAuthTokenResponse
): CompletedAuthToken {
  return {
    token: response.token,
    requestStatus: RequestStatus.COMPLETED,
    expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
    creationTime: Date.now()
  };
}

export async function getErrorFromResponse(
  requestName: string,
  response: Response
): Promise<FirebaseError> {
  const responseJson: ErrorResponse = await response.json();
  const errorData = responseJson.error;
  return ERROR_FACTORY.create(ErrorCode.REQUEST_FAILED, {
    requestName,
    serverCode: errorData.code,
    serverMessage: errorData.message,
    serverStatus: errorData.status
  });
}

export function getHeaders({ apiKey }: AppConfig): Headers {
  return new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-goog-api-key': apiKey
  });
}

export function getHeadersWithAuth(
  appConfig: AppConfig,
  { refreshToken }: RegisteredInstallationEntry
): Headers {
  const headers = getHeaders(appConfig);
  headers.append('Authorization', getAuthorizationHeader(refreshToken));
  return headers;
}

export interface ErrorResponse {
  error: {
    code: number;
    message: string;
    status: string;
  };
}

/**
 * Calls the passed in fetch wrapper and returns the response.
 * If the returned response has a status of 5xx, re-runs the function once and
 * returns the response.
 */
export async function retryIfServerError(
  fn: () => Promise<Response>
): Promise<Response> {
  const result = await fn();

  if (result.status >= 500 && result.status < 600) {
    // Internal Server Error. Retry request.
    return fn();
  }

  return result;
}

function getExpiresInFromResponseExpiresIn(responseExpiresIn: string): number {
  // This works because the server will never respond with fractions of a second.
  return Number(responseExpiresIn.replace('s', '000'));
}

function getAuthorizationHeader(refreshToken: string): string {
  return `${INTERNAL_AUTH_VERSION} ${refreshToken}`;
}
