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
import { AsyncQueue } from '../util/async_queue';
import { LocalStore } from './local_store';
import { LruDelegate, LruGarbageCollector, LruParams } from './lru_garbage_collector';
import { GarbageCollectionScheduler } from './persistence';
export declare const LRU_MINIMUM_CACHE_SIZE_BYTES: number;
/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */
export declare class LruScheduler implements GarbageCollectionScheduler {
    private readonly garbageCollector;
    private readonly asyncQueue;
    private hasRun;
    private gcTask;
    constructor(garbageCollector: LruGarbageCollector, asyncQueue: AsyncQueue);
    start(localStore: LocalStore): void;
    stop(): void;
    get started(): boolean;
    private scheduleGC;
}
export declare function newLruGarbageCollector(delegate: LruDelegate, params: LruParams): LruGarbageCollector;
