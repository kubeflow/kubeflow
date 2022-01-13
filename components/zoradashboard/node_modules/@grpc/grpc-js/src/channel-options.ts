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

/**
 * An interface that contains options used when initializing a Channel instance.
 */
export interface ChannelOptions {
  'grpc.ssl_target_name_override'?: string;
  'grpc.primary_user_agent'?: string;
  'grpc.secondary_user_agent'?: string;
  'grpc.default_authority'?: string;
  'grpc.keepalive_time_ms'?: number;
  'grpc.keepalive_timeout_ms'?: number;
  'grpc.keepalive_permit_without_calls'?: number;
  'grpc.service_config'?: string;
  'grpc.max_concurrent_streams'?: number;
  'grpc.initial_reconnect_backoff_ms'?: number;
  'grpc.max_reconnect_backoff_ms'?: number;
  'grpc.use_local_subchannel_pool'?: number;
  'grpc.max_send_message_length'?: number;
  'grpc.max_receive_message_length'?: number;
  'grpc.enable_http_proxy'?: number;
  'grpc.http_connect_target'?: string;
  'grpc.http_connect_creds'?: string;
  'grpc-node.max_session_memory'?: number;
  [key: string]: any;
}

/**
 * This is for checking provided options at runtime. This is an object for
 * easier membership checking.
 */
export const recognizedOptions = {
  'grpc.ssl_target_name_override': true,
  'grpc.primary_user_agent': true,
  'grpc.secondary_user_agent': true,
  'grpc.default_authority': true,
  'grpc.keepalive_time_ms': true,
  'grpc.keepalive_timeout_ms': true,
  'grpc.keepalive_permit_without_calls': true,
  'grpc.service_config': true,
  'grpc.max_concurrent_streams': true,
  'grpc.initial_reconnect_backoff_ms': true,
  'grpc.max_reconnect_backoff_ms': true,
  'grpc.use_local_subchannel_pool': true,
  'grpc.max_send_message_length': true,
  'grpc.max_receive_message_length': true,
  'grpc.enable_http_proxy': true,
  'grpc-node.max_session_memory': true,
};

export function channelOptionsEqual(
  options1: ChannelOptions,
  options2: ChannelOptions
) {
  const keys1 = Object.keys(options1).sort();
  const keys2 = Object.keys(options2).sort();
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let i = 0; i < keys1.length; i += 1) {
    if (keys1[i] !== keys2[i]) {
      return false;
    }
    if (options1[keys1[i]] !== options2[keys2[i]]) {
      return false;
    }
  }
  return true;
}
