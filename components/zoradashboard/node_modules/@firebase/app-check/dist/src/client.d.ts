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
import { Provider } from '@firebase/component';
import { AppCheckTokenInternal } from './state';
interface AppCheckRequest {
    url: string;
    body: {
        [key: string]: string;
    };
}
export declare function exchangeToken({ url, body }: AppCheckRequest, platformLoggerProvider: Provider<'platform-logger'>): Promise<AppCheckTokenInternal>;
export declare function getExchangeRecaptchaTokenRequest(app: FirebaseApp, reCAPTCHAToken: string): AppCheckRequest;
export declare function getExchangeDebugTokenRequest(app: FirebaseApp, debugToken: string): AppCheckRequest;
export {};
