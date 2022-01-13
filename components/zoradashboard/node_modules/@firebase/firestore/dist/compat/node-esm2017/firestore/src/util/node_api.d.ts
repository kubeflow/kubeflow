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
/**
 * Creates a node-style callback that resolves or rejects a new Promise. The
 * callback is passed to the given action which can then use the callback as
 * a parameter to a node-style function.
 *
 * The intent is to directly bridge a node-style function (which takes a
 * callback) into a Promise without manually converting between the node-style
 * callback and the promise at each call.
 *
 * In effect it allows you to convert:
 *
 * @example
 * new Promise((resolve: (value?: fs.Stats) => void,
 *              reject: (error?: any) => void) => {
 *   fs.stat(path, (error?: any, stat?: fs.Stats) => {
 *     if (error) {
 *       reject(error);
 *     } else {
 *       resolve(stat);
 *     }
 *   });
 * });
 *
 * Into
 * @example
 * nodePromise((callback: NodeCallback<fs.Stats>) => {
 *   fs.stat(path, callback);
 * });
 *
 * @param action - a function that takes a node-style callback as an argument
 *     and then uses that callback to invoke some node-style API.
 * @returns a new Promise which will be rejected if the callback is given the
 *     first Error parameter or will resolve to the value given otherwise.
 */
export declare function nodePromise<R>(action: (callback: NodeCallback<R>) => void): Promise<R>;
/**
 * A node-style callback which passes an Error as the first argument if there
 * was an error, or passes null and a proper value
 */
export interface NodeCallback<R> {
    (error?: unknown, value?: R): void;
}
