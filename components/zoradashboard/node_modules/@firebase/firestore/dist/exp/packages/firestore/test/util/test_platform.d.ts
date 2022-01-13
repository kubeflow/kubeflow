/**
 * @license
 * Copyright 2018 Google LLC
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
import { DocumentLike, WindowLike } from '../../src/util/types';
/**
 * `Window` fake that implements the event and storage API that is used by
 * Firestore.
 */
export declare class FakeWindow implements WindowLike {
    private readonly fakeStorageArea;
    private readonly fakeIndexedDb;
    private storageListeners;
    constructor(sharedFakeStorage: SharedFakeWebStorage, fakeIndexedDb?: IDBFactory);
    get localStorage(): Storage;
    get indexedDB(): IDBFactory | null;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
}
export declare function testWindow(sharedWebStorage?: SharedFakeWebStorage): FakeWindow;
/**
 * `Document` fake that implements the `visibilitychange` API used by Firestore.
 */
export declare class FakeDocument implements DocumentLike {
    private _visibilityState;
    private visibilityListener;
    get visibilityState(): VisibilityState;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
    raiseVisibilityEvent(visibility: VisibilityState): void;
}
export declare function testDocument(): FakeDocument;
/**
 * `WebStorage` mock that implements the WebStorage behavior for multiple
 * clients. To get a client-specific storage area that implements the WebStorage
 * API, invoke `getStorageArea(storageListener)`.
 */
export declare class SharedFakeWebStorage {
    private readonly data;
    private readonly activeClients;
    getStorageArea(storageListener: EventListener): Storage;
    private clear;
    private getItem;
    private key;
    private removeItem;
    private setItem;
    private get length();
    private raiseStorageEvent;
}
