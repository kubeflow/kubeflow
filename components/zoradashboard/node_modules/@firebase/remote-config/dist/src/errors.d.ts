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
import { ErrorFactory } from '@firebase/util';
export declare const enum ErrorCode {
    REGISTRATION_WINDOW = "registration-window",
    REGISTRATION_PROJECT_ID = "registration-project-id",
    REGISTRATION_API_KEY = "registration-api-key",
    REGISTRATION_APP_ID = "registration-app-id",
    STORAGE_OPEN = "storage-open",
    STORAGE_GET = "storage-get",
    STORAGE_SET = "storage-set",
    STORAGE_DELETE = "storage-delete",
    FETCH_NETWORK = "fetch-client-network",
    FETCH_TIMEOUT = "fetch-timeout",
    FETCH_THROTTLE = "fetch-throttle",
    FETCH_PARSE = "fetch-client-parse",
    FETCH_STATUS = "fetch-status"
}
interface ErrorParams {
    [ErrorCode.STORAGE_OPEN]: {
        originalErrorMessage: string | undefined;
    };
    [ErrorCode.STORAGE_GET]: {
        originalErrorMessage: string | undefined;
    };
    [ErrorCode.STORAGE_SET]: {
        originalErrorMessage: string | undefined;
    };
    [ErrorCode.STORAGE_DELETE]: {
        originalErrorMessage: string | undefined;
    };
    [ErrorCode.FETCH_NETWORK]: {
        originalErrorMessage: string;
    };
    [ErrorCode.FETCH_THROTTLE]: {
        throttleEndTimeMillis: number;
    };
    [ErrorCode.FETCH_PARSE]: {
        originalErrorMessage: string;
    };
    [ErrorCode.FETCH_STATUS]: {
        httpStatus: number;
    };
}
export declare const ERROR_FACTORY: ErrorFactory<ErrorCode, ErrorParams>;
export declare function hasErrorCode(e: Error, errorCode: ErrorCode): boolean;
export {};
