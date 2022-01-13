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
import { CompletedAuthToken, RegisteredInstallationEntry } from '../interfaces/installation-entry';
export declare function getInstallationsEndpoint({ projectId }: AppConfig): string;
export declare function extractAuthTokenInfoFromResponse(response: GenerateAuthTokenResponse): CompletedAuthToken;
export declare function getErrorFromResponse(requestName: string, response: Response): Promise<FirebaseError>;
export declare function getHeaders({ apiKey }: AppConfig): Headers;
export declare function getHeadersWithAuth(appConfig: AppConfig, { refreshToken }: RegisteredInstallationEntry): Headers;
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
export declare function retryIfServerError(fn: () => Promise<Response>): Promise<Response>;
