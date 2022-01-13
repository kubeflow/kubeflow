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
import { TargetId } from '../core/types';
import { ViewSnapshot } from '../core/view_snapshot';
import { DocumentKeySet } from '../model/collections';
/**
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */
export declare class LocalViewChanges {
    readonly targetId: TargetId;
    readonly fromCache: boolean;
    readonly addedKeys: DocumentKeySet;
    readonly removedKeys: DocumentKeySet;
    constructor(targetId: TargetId, fromCache: boolean, addedKeys: DocumentKeySet, removedKeys: DocumentKeySet);
    static fromSnapshot(targetId: TargetId, viewSnapshot: ViewSnapshot): LocalViewChanges;
}
