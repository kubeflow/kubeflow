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
import { AppCheckProvider } from '@firebase/app-check-types';
import { GreCAPTCHA } from '../src/recaptcha';
import { Provider } from '@firebase/component';
export declare const FAKE_SITE_KEY = "fake-site-key";
export declare function getFakeApp(overrides?: Record<string, any>): FirebaseApp;
export declare function getFakeCustomTokenProvider(): AppCheckProvider;
export declare function getFakePlatformLoggingProvider(fakeLogString?: string): Provider<'platform-logger'>;
export declare function getFakeGreCAPTCHA(): GreCAPTCHA;
/**
 * Returns all script tags in DOM matching our reCAPTCHA url pattern.
 * Tests in other files may have inserted multiple reCAPTCHA scripts, because they don't
 * care about it.
 */
export declare function findgreCAPTCHAScriptsOnPage(): HTMLScriptElement[];
export declare function removegreCAPTCHAScriptsOnPage(): void;
