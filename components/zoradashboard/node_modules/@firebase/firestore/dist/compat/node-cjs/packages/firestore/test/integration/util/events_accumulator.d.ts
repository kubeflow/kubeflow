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
import * as firestore from '@firebase/firestore-types';
/**
 * A helper object that can accumulate an arbitrary amount of events and resolve
 * a promise when expected number has been emitted.
 */
export declare class EventsAccumulator<T extends firestore.DocumentSnapshot | firestore.QuerySnapshot> {
    private events;
    private waitingFor;
    private deferred;
    private rejectAdditionalEvents;
    storeEvent: (evt: T) => void;
    awaitEvents(length: number): Promise<T[]>;
    awaitEvent(): Promise<T>;
    /** Waits for a latency compensated local snapshot. */
    awaitLocalEvent(): Promise<T>;
    /** Waits for multiple latency compensated local snapshot. */
    awaitLocalEvents(count: number): Promise<T[]>;
    /** Waits for a snapshot that has no pending writes */
    awaitRemoteEvent(): Promise<T>;
    assertNoAdditionalEvents(): Promise<void>;
    allowAdditionalEvents(): void;
    private checkFulfilled;
}
