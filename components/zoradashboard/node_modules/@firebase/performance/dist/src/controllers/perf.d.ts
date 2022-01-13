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
import { Trace } from '../resources/trace';
import { FirebaseApp } from '@firebase/app-types';
import { FirebasePerformance } from '@firebase/performance-types';
export declare class PerformanceController implements FirebasePerformance {
    readonly app: FirebaseApp;
    constructor(app: FirebaseApp);
    trace(name: string): Trace;
    set instrumentationEnabled(val: boolean);
    get instrumentationEnabled(): boolean;
    set dataCollectionEnabled(val: boolean);
    get dataCollectionEnabled(): boolean;
}
