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
declare global {
    interface Window {
        PerformanceObserver: typeof PerformanceObserver;
        perfMetrics?: {
            onFirstInputDelay: Function;
        };
    }
}
export declare type EntryType = 'mark' | 'measure' | 'paint' | 'resource' | 'frame' | 'navigation';
/**
 * This class holds a reference to various browser related objects injected by
 * set methods.
 */
export declare class Api {
    readonly window?: Window | undefined;
    private readonly performance;
    /** PreformanceObserver constructor function. */
    private readonly PerformanceObserver;
    private readonly windowLocation;
    readonly onFirstInputDelay?: Function;
    readonly localStorage?: Storage;
    readonly document: Document;
    readonly navigator: Navigator;
    constructor(window?: Window | undefined);
    getUrl(): string;
    mark(name: string): void;
    measure(measureName: string, mark1: string, mark2: string): void;
    getEntriesByType(type: EntryType): PerformanceEntry[];
    getEntriesByName(name: string): PerformanceEntry[];
    getTimeOrigin(): number;
    requiredApisAvailable(): boolean;
    setupObserver(entryType: EntryType, callback: (entry: PerformanceEntry) => void): void;
    static getInstance(): Api;
}
export declare function setupApi(window: Window): void;
