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
import { FirebaseApp, FirebaseOptions, FirebaseAppConfig } from '@firebase/app-types';
import { _FirebaseNamespace, FirebaseService } from '@firebase/app-types/private';
import { Component, Name } from '@firebase/component';
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */
export declare class FirebaseAppImpl implements FirebaseApp {
    private readonly firebase_;
    private readonly options_;
    private readonly name_;
    private isDeleted_;
    private automaticDataCollectionEnabled_;
    private container;
    constructor(options: FirebaseOptions, config: FirebaseAppConfig, firebase_: _FirebaseNamespace);
    get automaticDataCollectionEnabled(): boolean;
    set automaticDataCollectionEnabled(val: boolean);
    get name(): string;
    get options(): FirebaseOptions;
    delete(): Promise<void>;
    /**
     * Return a service instance associated with this app (creating it
     * on demand), identified by the passed instanceIdentifier.
     *
     * NOTE: Currently storage and functions are the only ones that are leveraging this
     * functionality. They invoke it by calling:
     *
     * ```javascript
     * firebase.app().storage('STORAGE BUCKET ID')
     * ```
     *
     * The service name is passed to this already
     * @internal
     */
    _getService(name: string, instanceIdentifier?: string): FirebaseService;
    /**
     * Remove a service instance from the cache, so we will create a new instance for this service
     * when people try to get this service again.
     *
     * NOTE: currently only firestore is using this functionality to support firestore shutdown.
     *
     * @param name The service name
     * @param instanceIdentifier instance identifier in case multiple instances are allowed
     * @internal
     */
    _removeServiceInstance(name: string, instanceIdentifier?: string): void;
    /**
     * @param component the component being added to this app's container
     */
    _addComponent<T extends Name>(component: Component<T>): void;
    _addOrOverwriteComponent(component: Component): void;
    toJSON(): object;
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    private checkDestroyed_;
}
