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
import { FirebaseOptions, FirebaseApp } from '@firebase/app-types';
import { Provider } from '@firebase/component';
import { Service } from '../src/api/service';
export declare function makeFakeApp(options?: FirebaseOptions): FirebaseApp;
export declare function getFetchImpl(): typeof fetch;
export declare function createTestService(app: FirebaseApp, regionOrCustomDomain?: string, authProvider?: Provider<"auth-internal">, messagingProvider?: Provider<"messaging">, fakeAppCheckToken?: string, fetchImpl?: typeof fetch): Service;
