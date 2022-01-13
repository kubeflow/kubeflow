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
import { GreCAPTCHA } from './recaptcha';
import { FirebaseApp } from '@firebase/app-types';
export declare function getRecaptcha(): GreCAPTCHA | undefined;
export declare function ensureActivated(app: FirebaseApp): void;
/**
 * Copied from https://stackoverflow.com/a/2117523
 */
export declare function uuidv4(): string;
