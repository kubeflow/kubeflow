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

/**
 * An HttpsCallableResult wraps a single result from a function call.
 */
export interface HttpsCallableResult {
  readonly data: any;
}

/**
 * An HttpsCallable is a reference to a "callable" http trigger in
 * Google Cloud Functions.
 */
export interface HttpsCallable {
  (data?: {} | null): Promise<HttpsCallableResult>;
}

/**
 * HttpsCallableOptions specify metadata about how calls should be executed.
 */
export interface HttpsCallableOptions {
  timeout?: number; // in millis
}

/**
 * `FirebaseFunctions` represents a Functions app, and is the entry point for
 * all Functions operations.
 */
export class FirebaseFunctions {
  private constructor();

  /**
   * Gets an `HttpsCallable` instance that refers to the function with the given
   * name.
   *
   * @param name The name of the https callable function.
   * @return The `HttpsCallable` instance.
   */
  httpsCallable(name: string, options?: HttpsCallableOptions): HttpsCallable;

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
}

/**
 * The set of Firebase Functions status codes. The codes are the same at the
 * ones exposed by gRPC here:
 * https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
 *
 * Possible values:
 * - 'cancelled': The operation was cancelled (typically by the caller).
 * - 'unknown': Unknown error or an error from a different error domain.
 * - 'invalid-argument': Client specified an invalid argument. Note that this
 *   differs from 'failed-precondition'. 'invalid-argument' indicates
 *   arguments that are problematic regardless of the state of the system
 *   (e.g. an invalid field name).
 * - 'deadline-exceeded': Deadline expired before operation could complete.
 *   For operations that change the state of the system, this error may be
 *   returned even if the operation has completed successfully. For example,
 *   a successful response from a server could have been delayed long enough
 *   for the deadline to expire.
 * - 'not-found': Some requested document was not found.
 * - 'already-exists': Some document that we attempted to create already
 *   exists.
 * - 'permission-denied': The caller does not have permission to execute the
 *   specified operation.
 * - 'resource-exhausted': Some resource has been exhausted, perhaps a
 *   per-user quota, or perhaps the entire file system is out of space.
 * - 'failed-precondition': Operation was rejected because the system is not
 *   in a state required for the operation's execution.
 * - 'aborted': The operation was aborted, typically due to a concurrency
 *   issue like transaction aborts, etc.
 * - 'out-of-range': Operation was attempted past the valid range.
 * - 'unimplemented': Operation is not implemented or not supported/enabled.
 * - 'internal': Internal errors. Means some invariants expected by
 *   underlying system has been broken. If you see one of these errors,
 *   something is very broken.
 * - 'unavailable': The service is currently unavailable. This is most likely
 *   a transient condition and may be corrected by retrying with a backoff.
 * - 'data-loss': Unrecoverable data loss or corruption.
 * - 'unauthenticated': The request does not have valid authentication
 *   credentials for the operation.
 */
export type FunctionsErrorCode =
  | 'ok'
  | 'cancelled'
  | 'unknown'
  | 'invalid-argument'
  | 'deadline-exceeded'
  | 'not-found'
  | 'already-exists'
  | 'permission-denied'
  | 'resource-exhausted'
  | 'failed-precondition'
  | 'aborted'
  | 'out-of-range'
  | 'unimplemented'
  | 'internal'
  | 'unavailable'
  | 'data-loss'
  | 'unauthenticated';

export interface HttpsError extends Error {
  /**
   * A standard error code that will be returned to the client. This also
   * determines the HTTP status code of the response, as defined in code.proto.
   */
  readonly code: FunctionsErrorCode;

  /**
   * Extra data to be converted to JSON and included in the error response.
   */
  readonly details?: any;
}

declare module '@firebase/component' {
  interface NameServiceMapping {
    'functions': FirebaseFunctions;
  }
}
