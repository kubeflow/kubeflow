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

import { getKey } from '../util/get-key';
import { AppConfig } from '../interfaces/app-config';
import { IdChangeCallbackFn } from '../functions';

const fidChangeCallbacks: Map<string, Set<IdChangeCallbackFn>> = new Map();

/**
 * Calls the onIdChange callbacks with the new FID value, and broadcasts the
 * change to other tabs.
 */
export function fidChanged(appConfig: AppConfig, fid: string): void {
  const key = getKey(appConfig);

  callFidChangeCallbacks(key, fid);
  broadcastFidChange(key, fid);
}

export function addCallback(
  appConfig: AppConfig,
  callback: IdChangeCallbackFn
): void {
  // Open the broadcast channel if it's not already open,
  // to be able to listen to change events from other tabs.
  getBroadcastChannel();

  const key = getKey(appConfig);

  let callbackSet = fidChangeCallbacks.get(key);
  if (!callbackSet) {
    callbackSet = new Set();
    fidChangeCallbacks.set(key, callbackSet);
  }
  callbackSet.add(callback);
}

export function removeCallback(
  appConfig: AppConfig,
  callback: IdChangeCallbackFn
): void {
  const key = getKey(appConfig);

  const callbackSet = fidChangeCallbacks.get(key);

  if (!callbackSet) {
    return;
  }

  callbackSet.delete(callback);
  if (callbackSet.size === 0) {
    fidChangeCallbacks.delete(key);
  }

  // Close broadcast channel if there are no more callbacks.
  closeBroadcastChannel();
}

function callFidChangeCallbacks(key: string, fid: string): void {
  const callbacks = fidChangeCallbacks.get(key);
  if (!callbacks) {
    return;
  }

  for (const callback of callbacks) {
    callback(fid);
  }
}

function broadcastFidChange(key: string, fid: string): void {
  const channel = getBroadcastChannel();
  if (channel) {
    channel.postMessage({ key, fid });
  }
  closeBroadcastChannel();
}

let broadcastChannel: BroadcastChannel | null = null;
/** Opens and returns a BroadcastChannel if it is supported by the browser. */
function getBroadcastChannel(): BroadcastChannel | null {
  if (!broadcastChannel && 'BroadcastChannel' in self) {
    broadcastChannel = new BroadcastChannel('[Firebase] FID Change');
    broadcastChannel.onmessage = e => {
      callFidChangeCallbacks(e.data.key, e.data.fid);
    };
  }
  return broadcastChannel;
}

function closeBroadcastChannel(): void {
  if (fidChangeCallbacks.size === 0 && broadcastChannel) {
    broadcastChannel.close();
    broadcastChannel = null;
  }
}
