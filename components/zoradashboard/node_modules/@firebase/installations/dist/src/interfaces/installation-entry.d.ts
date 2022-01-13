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
/** Status of a server request. */
export declare const enum RequestStatus {
    NOT_STARTED = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2
}
export interface NotStartedAuthToken {
    readonly requestStatus: RequestStatus.NOT_STARTED;
}
export interface InProgressAuthToken {
    readonly requestStatus: RequestStatus.IN_PROGRESS;
    /**
     * Unix timestamp when the current generateAuthRequest was initiated.
     * Used for figuring out how long the request status has been IN_PROGRESS.
     */
    readonly requestTime: number;
}
export interface CompletedAuthToken {
    readonly requestStatus: RequestStatus.COMPLETED;
    /**
     * Firebase Installations Authentication Token.
     * Only exists if requestStatus is COMPLETED.
     */
    readonly token: string;
    /**
     * Unix timestamp when Authentication Token was created.
     * Only exists if requestStatus is COMPLETED.
     */
    readonly creationTime: number;
    /**
     * Authentication Token time to live duration in milliseconds.
     * Only exists if requestStatus is COMPLETED.
     */
    readonly expiresIn: number;
}
export declare type AuthToken = NotStartedAuthToken | InProgressAuthToken | CompletedAuthToken;
export interface UnregisteredInstallationEntry {
    /** Status of the Firebase Installation registration on the server. */
    readonly registrationStatus: RequestStatus.NOT_STARTED;
    /** Firebase Installation ID */
    readonly fid: string;
}
export interface InProgressInstallationEntry {
    /** Status of the Firebase Installation registration on the server. */
    readonly registrationStatus: RequestStatus.IN_PROGRESS;
    /**
     * Unix timestamp that shows the time when the current createInstallation
     * request was initiated.
     * Used for figuring out how long the registration status has been PENDING.
     */
    readonly registrationTime: number;
    /** Firebase Installation ID */
    readonly fid: string;
}
export interface RegisteredInstallationEntry {
    /** Status of the Firebase Installation registration on the server. */
    readonly registrationStatus: RequestStatus.COMPLETED;
    /** Firebase Installation ID */
    readonly fid: string;
    /**
     * Refresh Token returned from the server.
     * Used for authenticating generateAuthToken requests.
     */
    readonly refreshToken: string;
    /** Firebase Installation Authentication Token. */
    readonly authToken: AuthToken;
}
/** Firebase Installation ID and related data in the database. */
export declare type InstallationEntry = UnregisteredInstallationEntry | InProgressInstallationEntry | RegisteredInstallationEntry;
