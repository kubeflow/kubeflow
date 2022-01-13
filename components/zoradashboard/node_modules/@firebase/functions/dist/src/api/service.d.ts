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
import { FirebaseApp } from '@firebase/app-types';
import { FirebaseService } from '@firebase/app-types/private';
import { FirebaseFunctions, HttpsCallable, HttpsCallableOptions } from '@firebase/functions-types';
import { Provider } from '@firebase/component';
import { FirebaseAuthInternalName } from '@firebase/auth-interop-types';
import { FirebaseMessagingName } from '@firebase/messaging-types';
import { AppCheckInternalComponentName } from '@firebase/app-check-interop-types';
/**
 * Describes the shape of the HttpResponse body.
 * It makes functions that would otherwise take {} able to access the
 * possible elements in the body more easily
 */
export interface HttpResponseBody {
    data?: unknown;
    result?: unknown;
    error?: {
        message?: unknown;
        status?: unknown;
        details?: unknown;
    };
}
/**
 * The main class for the Firebase Functions SDK.
 */
export declare class Service implements FirebaseFunctions, FirebaseService {
    private app_;
    private appCheckProvider;
    readonly fetchImpl: typeof fetch;
    private readonly contextProvider;
    private readonly serializer;
    private emulatorOrigin;
    private cancelAllRequests;
    private deleteService;
    private region;
    private customDomain;
    /**
     * Creates a new Functions service for the given app and (optional) region or custom domain.
     * @param app_ The FirebaseApp to use.
     * @param regionOrCustomDomain_ one of:
     *   a) A region to call functions from, such as us-central1
     *   b) A custom domain to use as a functions prefix, such as https://mydomain.com
     */
    constructor(app_: FirebaseApp, authProvider: Provider<FirebaseAuthInternalName>, messagingProvider: Provider<FirebaseMessagingName>, appCheckProvider: Provider<AppCheckInternalComponentName>, regionOrCustomDomain_: string | undefined, fetchImpl: typeof fetch);
    get app(): FirebaseApp;
    INTERNAL: {
        delete: () => Promise<void>;
    };
    /**
     * Returns the URL for a callable with the given name.
     * @param name The name of the callable.
     */
    _url(name: string): string;
    /**
     * Modify this instance to communicate with the Cloud Functions emulator.
     *
     * Note: this must be called before this instance has been used to do any operations.
     *
     * @param host The emulator host (ex: localhost)
     * @param port The emulator port (ex: 5001)
     */
    useEmulator(host: string, port: number): void;
    /**
     * Changes this instance to point to a Cloud Functions emulator running
     * locally. See https://firebase.google.com/docs/functions/local-emulator
     *
     * @deprecated Prefer the useEmulator(host, port) method.
     * @param origin The origin of the local emulator, such as
     * "http://localhost:5005".
     */
    useFunctionsEmulator(origin: string): void;
    /**
     * Returns a reference to the callable https trigger with the given name.
     * @param name The name of the trigger.
     */
    httpsCallable(name: string, options?: HttpsCallableOptions): HttpsCallable;
    /**
     * Does an HTTP POST and returns the completed response.
     * @param url The url to post to.
     * @param body The JSON body of the post.
     * @param headers The HTTP headers to include in the request.
     * @return A Promise that will succeed when the request finishes.
     */
    private postJSON;
    private getAppCheckToken;
    /**
     * Calls a callable function asynchronously and returns the result.
     * @param name The name of the callable trigger.
     * @param data The data to pass as params to the function.s
     */
    private call;
}
