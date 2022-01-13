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

import { Call, StatusObject } from './call-stream';
import { Channel } from './channel';
import { Status } from './constants';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';

const units: Array<[string, number]> = [
  ['m', 1],
  ['S', 1000],
  ['M', 60 * 1000],
  ['H', 60 * 60 * 1000],
];

function getDeadline(deadline: number) {
  const now = new Date().getTime();
  const timeoutMs = Math.max(deadline - now, 0);
  for (const [unit, factor] of units) {
    const amount = timeoutMs / factor;
    if (amount < 1e8) {
      return String(Math.ceil(amount)) + unit;
    }
  }
  throw new Error('Deadline is too far in the future');
}

export class DeadlineFilter extends BaseFilter implements Filter {
  private timer: NodeJS.Timer | null = null;
  private deadline: number;
  constructor(
    private readonly channel: Channel,
    private readonly callStream: Call
  ) {
    super();
    const callDeadline = callStream.getDeadline();
    if (callDeadline instanceof Date) {
      this.deadline = callDeadline.getTime();
    } else {
      this.deadline = callDeadline;
    }
    const now: number = new Date().getTime();
    let timeout = this.deadline - now;
    if (timeout <= 0) {
      process.nextTick(() => {
        callStream.cancelWithStatus(
          Status.DEADLINE_EXCEEDED,
          'Deadline exceeded'
        );
      });
    } else if (this.deadline !== Infinity) {
      this.timer = setTimeout(() => {
        callStream.cancelWithStatus(
          Status.DEADLINE_EXCEEDED,
          'Deadline exceeded'
        );
      }, timeout);
      this.timer.unref?.();
    }
  }

  async sendMetadata(metadata: Promise<Metadata>) {
    if (this.deadline === Infinity) {
      return metadata;
    }
    /* The input metadata promise depends on the original channel.connect()
     * promise, so when it is complete that implies that the channel is
     * connected */
    const finalMetadata = await metadata;
    const timeoutString = getDeadline(this.deadline);
    finalMetadata.set('grpc-timeout', timeoutString);
    return finalMetadata;
  }

  receiveTrailers(status: StatusObject) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    return status;
  }
}

export class DeadlineFilterFactory implements FilterFactory<DeadlineFilter> {
  constructor(private readonly channel: Channel) {}

  createFilter(callStream: Call): DeadlineFilter {
    return new DeadlineFilter(this.channel, callStream);
  }
}
