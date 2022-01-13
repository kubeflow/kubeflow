/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const INITIAL_BACKOFF_MS = 1000;
const BACKOFF_MULTIPLIER = 1.6;
const MAX_BACKOFF_MS = 120000;
const BACKOFF_JITTER = 0.2;

/**
 * Get a number uniformly at random in the range [min, max)
 * @param min
 * @param max
 */
function uniformRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export interface BackoffOptions {
  initialDelay?: number;
  multiplier?: number;
  jitter?: number;
  maxDelay?: number;
}

export class BackoffTimeout {
  private initialDelay: number = INITIAL_BACKOFF_MS;
  private multiplier: number = BACKOFF_MULTIPLIER;
  private maxDelay: number = MAX_BACKOFF_MS;
  private jitter: number = BACKOFF_JITTER;
  private nextDelay: number;
  private timerId: NodeJS.Timer;
  private running = false;
  private hasRef = true;

  constructor(private callback: () => void, options?: BackoffOptions) {
    if (options) {
      if (options.initialDelay) {
        this.initialDelay = options.initialDelay;
      }
      if (options.multiplier) {
        this.multiplier = options.multiplier;
      }
      if (options.jitter) {
        this.jitter = options.jitter;
      }
      if (options.maxDelay) {
        this.maxDelay = options.maxDelay;
      }
    }
    this.nextDelay = this.initialDelay;
    this.timerId = setTimeout(() => {}, 0);
    clearTimeout(this.timerId);
  }

  /**
   * Call the callback after the current amount of delay time
   */
  runOnce() {
    this.running = true;
    this.timerId = setTimeout(() => {
      this.callback();
      this.running = false;
    }, this.nextDelay);
    if (!this.hasRef) {
      this.timerId.unref?.();
    }
    const nextBackoff = Math.min(
      this.nextDelay * this.multiplier,
      this.maxDelay
    );
    const jitterMagnitude = nextBackoff * this.jitter;
    this.nextDelay =
      nextBackoff + uniformRandom(-jitterMagnitude, jitterMagnitude);
  }

  /**
   * Stop the timer. The callback will not be called until `runOnce` is called
   * again.
   */
  stop() {
    clearTimeout(this.timerId);
    this.running = false;
  }

  /**
   * Reset the delay time to its initial value.
   */
  reset() {
    this.nextDelay = this.initialDelay;
  }

  isRunning() {
    return this.running;
  }

  ref() {
    this.hasRef = true;
    this.timerId.ref?.();
  }

  unref() {
    this.hasRef = false;
    this.timerId.unref?.();
  }
}
