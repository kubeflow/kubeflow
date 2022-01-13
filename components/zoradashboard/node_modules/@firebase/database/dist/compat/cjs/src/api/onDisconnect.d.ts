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
import { Compat } from '@firebase/util';
import { Indexable } from '../core/util/misc';
/**
 * This is a workaround for an issue in the no-modular '@firebase/database' where its typings
 * reference types from `@firebase/app-exp`.
 */
declare type ExpOnDisconnect = any;
export declare class OnDisconnect implements Compat<ExpOnDisconnect> {
    readonly _delegate: ExpOnDisconnect;
    constructor(_delegate: ExpOnDisconnect);
    cancel(onComplete?: (a: Error | null) => void): Promise<void>;
    remove(onComplete?: (a: Error | null) => void): Promise<void>;
    set(value: unknown, onComplete?: (a: Error | null) => void): Promise<void>;
    setWithPriority(value: unknown, priority: number | string | null, onComplete?: (a: Error | null) => void): Promise<void>;
    update(objectToMerge: Indexable, onComplete?: (a: Error | null) => void): Promise<void>;
}
export {};
