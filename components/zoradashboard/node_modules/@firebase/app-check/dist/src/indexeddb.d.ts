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
import { AppCheckTokenInternal } from './state';
export declare function readTokenFromIndexedDB(app: FirebaseApp): Promise<AppCheckTokenInternal | undefined>;
export declare function writeTokenToIndexedDB(app: FirebaseApp, token: AppCheckTokenInternal): Promise<void>;
export declare function writeDebugTokenToIndexedDB(token: string): Promise<void>;
export declare function readDebugTokenFromIndexedDB(): Promise<string | undefined>;
