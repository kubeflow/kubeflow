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
import { FirebaseApp } from '@firebase/app-types';
import { AppCheckTokenListener, AppCheckTokenResult } from '@firebase/app-check-interop-types';
import { ListenerType } from './state';
import { Provider } from '@firebase/component';
export declare const defaultTokenErrorData: {
    error: string;
};
/**
 * Stringify and base64 encode token error data.
 *
 * @param tokenError Error data, currently hardcoded.
 */
export declare function formatDummyToken(tokenErrorData: Record<string, string>): string;
/**
 * This function will always resolve.
 * The result will contain an error field if there is any error.
 * In case there is an error, the token field in the result will be populated with a dummy value
 */
export declare function getToken(app: FirebaseApp, platformLoggerProvider: Provider<'platform-logger'>, forceRefresh?: boolean): Promise<AppCheckTokenResult>;
export declare function addTokenListener(app: FirebaseApp, platformLoggerProvider: Provider<'platform-logger'>, type: ListenerType, listener: AppCheckTokenListener, onError?: (error: Error) => void): void;
export declare function removeTokenListener(app: FirebaseApp, listener: (token: AppCheckTokenResult) => void): void;
