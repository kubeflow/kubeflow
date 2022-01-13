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
/**
 * Defines a client, as in https://en.wikipedia.org/wiki/Client%E2%80%93server_model, for the
 * Remote Config server (https://firebase.google.com/docs/reference/remote-config/rest).
 *
 * <p>Abstracts throttle, response cache and network implementation details.
 *
 * <p>Modeled after the native {@link GlobalFetch} interface, which is relatively modern and
 * convenient, but simplified for Remote Config's use case.
 *
 * Disambiguation: {@link GlobalFetch} interface and the Remote Config service define "fetch"
 * methods. The RestClient uses the former to make HTTP calls. This interface abstracts the latter.
 */
export interface RemoteConfigFetchClient {
    /**
     * @throws if response status is not 200 or 304.
     */
    fetch(request: FetchRequest): Promise<FetchResponse>;
}
/**
 * Defines a self-descriptive reference for config key-value pairs.
 */
export interface FirebaseRemoteConfigObject {
    [key: string]: string;
}
/**
 * Shims a minimal AbortSignal.
 *
 * <p>AbortController's AbortSignal conveniently decouples fetch timeout logic from other aspects
 * of networking, such as retries. Firebase doesn't use AbortController enough to justify a
 * polyfill recommendation, like we do with the Fetch API, but this minimal shim can easily be
 * swapped out if/when we do.
 */
export declare class RemoteConfigAbortSignal {
    listeners: Array<() => void>;
    addEventListener(listener: () => void): void;
    abort(): void;
}
/**
 * Defines per-request inputs for the Remote Config fetch request.
 *
 * <p>Modeled after the native {@link Request} interface, but simplified for Remote Config's
 * use case.
 */
export interface FetchRequest {
    /**
     * Uses cached config if it is younger than this age.
     *
     * <p>Required because it's defined by settings, which always have a value.
     *
     * <p>Comparable to passing `headers = { 'Cache-Control': max-age <maxAge> }` to the native
     * Fetch API.
     */
    cacheMaxAgeMillis: number;
    /**
     * An event bus for the signal to abort a request.
     *
     * <p>Required because all requests should be abortable.
     *
     * <p>Comparable to the native
     * Fetch API's "signal" field on its request configuration object
     * https://fetch.spec.whatwg.org/#dom-requestinit-signal.
     *
     * <p>Disambiguation: Remote Config commonly refers to API inputs as
     * "signals". See the private ConfigFetchRequestBody interface for those:
     * http://google3/firebase/remote_config/web/src/core/rest_client.ts?l=14&rcl=255515243.
     */
    signal: RemoteConfigAbortSignal;
    /**
     * The ETag header value from the last response.
     *
     * <p>Optional in case this is the first request.
     *
     * <p>Comparable to passing `headers = { 'If-None-Match': <eTag> }` to the native Fetch API.
     */
    eTag?: string;
}
/**
 * Defines a successful response (200 or 304).
 *
 * <p>Modeled after the native {@link Response} interface, but simplified for Remote Config's
 * use case.
 */
export interface FetchResponse {
    /**
     * The HTTP status, which is useful for differentiating success responses with data from
     * those without.
     *
     * <p>{@link RemoteConfigClient} is modeled after the native {@link GlobalFetch} interface, so
     * HTTP status is first-class.
     *
     * <p>Disambiguation: the fetch response returns a legacy "state" value that is redundant with the
     * HTTP status code. The former is normalized into the latter.
     */
    status: number;
    /**
     * Defines the ETag response header value.
     *
     * <p>Only defined for 200 and 304 responses.
     */
    eTag?: string;
    /**
     * Defines the map of parameters returned as "entries" in the fetch response body.
     *
     * <p>Only defined for 200 responses.
     */
    config?: FirebaseRemoteConfigObject;
}
