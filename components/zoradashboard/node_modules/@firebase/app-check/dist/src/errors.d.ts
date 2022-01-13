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
import { ErrorFactory } from '@firebase/util';
export declare const enum AppCheckError {
    ALREADY_ACTIVATED = "already-activated",
    USE_BEFORE_ACTIVATION = "use-before-activation",
    FETCH_NETWORK_ERROR = "fetch-network-error",
    FETCH_PARSE_ERROR = "fetch-parse-error",
    FETCH_STATUS_ERROR = "fetch-status-error",
    STORAGE_OPEN = "storage-open",
    STORAGE_GET = "storage-get",
    STORAGE_WRITE = "storage-set",
    RECAPTCHA_ERROR = "recaptcha-error"
}
interface ErrorParams {
    [AppCheckError.ALREADY_ACTIVATED]: {
        appName: string;
    };
    [AppCheckError.USE_BEFORE_ACTIVATION]: {
        appName: string;
    };
    [AppCheckError.FETCH_NETWORK_ERROR]: {
        originalErrorMessage: string;
    };
    [AppCheckError.FETCH_PARSE_ERROR]: {
        originalErrorMessage: string;
    };
    [AppCheckError.FETCH_STATUS_ERROR]: {
        httpStatus: number;
    };
    [AppCheckError.STORAGE_OPEN]: {
        originalErrorMessage?: string;
    };
    [AppCheckError.STORAGE_GET]: {
        originalErrorMessage?: string;
    };
    [AppCheckError.STORAGE_WRITE]: {
        originalErrorMessage?: string;
    };
}
export declare const ERROR_FACTORY: ErrorFactory<AppCheckError, ErrorParams>;
export {};
