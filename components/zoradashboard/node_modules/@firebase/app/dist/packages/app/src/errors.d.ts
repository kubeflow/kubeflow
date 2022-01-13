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
export declare const enum AppError {
    NO_APP = "no-app",
    BAD_APP_NAME = "bad-app-name",
    DUPLICATE_APP = "duplicate-app",
    APP_DELETED = "app-deleted",
    INVALID_APP_ARGUMENT = "invalid-app-argument",
    INVALID_LOG_ARGUMENT = "invalid-log-argument"
}
interface ErrorParams {
    [AppError.NO_APP]: {
        appName: string;
    };
    [AppError.BAD_APP_NAME]: {
        appName: string;
    };
    [AppError.DUPLICATE_APP]: {
        appName: string;
    };
    [AppError.APP_DELETED]: {
        appName: string;
    };
    [AppError.INVALID_APP_ARGUMENT]: {
        appName: string;
    };
}
export declare const ERROR_FACTORY: ErrorFactory<AppError, ErrorParams>;
export {};
