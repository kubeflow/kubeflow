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
import { ErrorFactory, FirebaseError } from '@firebase/util';
export declare const enum ErrorCode {
    MISSING_APP_CONFIG_VALUES = "missing-app-config-values",
    NOT_REGISTERED = "not-registered",
    INSTALLATION_NOT_FOUND = "installation-not-found",
    REQUEST_FAILED = "request-failed",
    APP_OFFLINE = "app-offline",
    DELETE_PENDING_REGISTRATION = "delete-pending-registration"
}
interface ErrorParams {
    [ErrorCode.MISSING_APP_CONFIG_VALUES]: {
        valueName: string;
    };
    [ErrorCode.REQUEST_FAILED]: {
        requestName: string;
        [index: string]: string | number;
    } & ServerErrorData;
}
export declare const ERROR_FACTORY: ErrorFactory<ErrorCode, ErrorParams>;
export interface ServerErrorData {
    serverCode: number;
    serverMessage: string;
    serverStatus: string;
}
export declare type ServerError = FirebaseError & {
    customData: ServerErrorData;
};
/** Returns true if error is a FirebaseError that is based on an error from the server. */
export declare function isServerError(error: unknown): error is ServerError;
export {};
