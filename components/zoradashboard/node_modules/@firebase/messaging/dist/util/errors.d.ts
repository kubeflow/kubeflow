/**
 * @license
 * Copyright 2017 Google LLC
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
import { ErrorFactory, ErrorMap } from '@firebase/util';
export declare const enum ErrorCode {
    MISSING_APP_CONFIG_VALUES = "missing-app-config-values",
    AVAILABLE_IN_WINDOW = "only-available-in-window",
    AVAILABLE_IN_SW = "only-available-in-sw",
    PERMISSION_DEFAULT = "permission-default",
    PERMISSION_BLOCKED = "permission-blocked",
    UNSUPPORTED_BROWSER = "unsupported-browser",
    FAILED_DEFAULT_REGISTRATION = "failed-service-worker-registration",
    TOKEN_SUBSCRIBE_FAILED = "token-subscribe-failed",
    TOKEN_SUBSCRIBE_NO_TOKEN = "token-subscribe-no-token",
    TOKEN_UNSUBSCRIBE_FAILED = "token-unsubscribe-failed",
    TOKEN_UPDATE_FAILED = "token-update-failed",
    TOKEN_UPDATE_NO_TOKEN = "token-update-no-token",
    INVALID_BG_HANDLER = "invalid-bg-handler",
    USE_SW_AFTER_GET_TOKEN = "use-sw-after-get-token",
    INVALID_SW_REGISTRATION = "invalid-sw-registration",
    USE_VAPID_KEY_AFTER_GET_TOKEN = "use-vapid-key-after-get-token",
    INVALID_VAPID_KEY = "invalid-vapid-key"
}
export declare const ERROR_MAP: ErrorMap<ErrorCode>;
interface ErrorParams {
    [ErrorCode.MISSING_APP_CONFIG_VALUES]: {
        valueName: string;
    };
    [ErrorCode.FAILED_DEFAULT_REGISTRATION]: {
        browserErrorMessage: string;
    };
    [ErrorCode.TOKEN_SUBSCRIBE_FAILED]: {
        errorInfo: string;
    };
    [ErrorCode.TOKEN_UNSUBSCRIBE_FAILED]: {
        errorInfo: string;
    };
    [ErrorCode.TOKEN_UPDATE_FAILED]: {
        errorInfo: string;
    };
}
export declare const ERROR_FACTORY: ErrorFactory<ErrorCode, ErrorParams>;
export {};
