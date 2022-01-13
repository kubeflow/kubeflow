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
import { ListResult } from "@firebase/storage";
import * as types from '@firebase/storage-types';
import { ReferenceCompat } from './reference';
import { StorageServiceCompat } from './service';
import { Compat } from '@firebase/util';
export declare class ListResultCompat implements types.ListResult, Compat<ListResult> {
    readonly _delegate: ListResult;
    private readonly _service;
    constructor(_delegate: ListResult, _service: StorageServiceCompat);
    get prefixes(): ReferenceCompat[];
    get items(): ReferenceCompat[];
    get nextPageToken(): string | null;
}
