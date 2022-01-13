/*
 * Copyright 2020 gRPC authors.
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

import { BaseFilter, Filter, FilterFactory } from "./filter";
import { Call, WriteObject } from "./call-stream";
import { Status, DEFAULT_MAX_SEND_MESSAGE_LENGTH, DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH } from "./constants";
import { ChannelOptions } from "./channel-options";

export class MaxMessageSizeFilter extends BaseFilter implements Filter {
  private maxSendMessageSize: number = DEFAULT_MAX_SEND_MESSAGE_LENGTH;
  private maxReceiveMessageSize: number = DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
  constructor(
    private readonly options: ChannelOptions,
    private readonly callStream: Call
  ) {
    super();
    if ('grpc.max_send_message_length' in options) {
      this.maxSendMessageSize = options['grpc.max_send_message_length']!;
    }
    if ('grpc.max_receive_message_length' in options) {
      this.maxReceiveMessageSize = options['grpc.max_receive_message_length']!;
    }
  }

  async sendMessage(message: Promise<WriteObject>): Promise<WriteObject> {
    /* A configured size of -1 means that there is no limit, so skip the check
     * entirely */
    if (this.maxSendMessageSize === -1) {
      return message;
    } else {
      const concreteMessage = await message;
      if (concreteMessage.message.length > this.maxSendMessageSize) {
        this.callStream.cancelWithStatus(Status.RESOURCE_EXHAUSTED, `Sent message larger than max (${concreteMessage.message.length} vs. ${this.maxSendMessageSize})`);
        return Promise.reject<WriteObject>('Message too large');
      } else {
        return concreteMessage;
      }
    }
  }

  async receiveMessage(message: Promise<Buffer>): Promise<Buffer> {
    /* A configured size of -1 means that there is no limit, so skip the check
     * entirely */
    if (this.maxReceiveMessageSize === -1) {
      return message;
    } else {
      const concreteMessage = await message;
      if (concreteMessage.length > this.maxReceiveMessageSize) {
        this.callStream.cancelWithStatus(Status.RESOURCE_EXHAUSTED, `Received message larger than max (${concreteMessage.length} vs. ${this.maxReceiveMessageSize})`);
        return Promise.reject<Buffer>('Message too large');
      } else {
        return concreteMessage;
      }
    }
  }
}

export class MaxMessageSizeFilterFactory implements FilterFactory<MaxMessageSizeFilter> {
  constructor(private readonly options: ChannelOptions) {}

  createFilter(callStream: Call): MaxMessageSizeFilter {
    return new MaxMessageSizeFilter(this.options, callStream);
  }
}
