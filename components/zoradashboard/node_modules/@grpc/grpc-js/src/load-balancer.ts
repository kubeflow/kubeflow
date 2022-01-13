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

import { ChannelOptions } from './channel-options';
import { Subchannel, SubchannelAddress } from './subchannel';
import { ConnectivityState } from './channel';
import { Picker } from './picker';
import * as load_balancer_pick_first from './load-balancer-pick-first';
import * as load_balancer_round_robin from './load-balancer-round-robin';

/**
 * A collection of functions associated with a channel that a load balancer
 * can call as necessary.
 */
export interface ChannelControlHelper {
  /**
   * Returns a subchannel connected to the specified address.
   * @param subchannelAddress The address to connect to
   * @param subchannelArgs Extra channel arguments specified by the load balancer
   */
  createSubchannel(
    subchannelAddress: SubchannelAddress,
    subchannelArgs: ChannelOptions
  ): Subchannel;
  /**
   * Passes a new subchannel picker up to the channel. This is called if either
   * the connectivity state changes or if a different picker is needed for any
   * other reason.
   * @param connectivityState New connectivity state
   * @param picker New picker
   */
  updateState(connectivityState: ConnectivityState, picker: Picker): void;
  /**
   * Request new data from the resolver.
   */
  requestReresolution(): void;
}

/**
 * Tracks one or more connected subchannels and determines which subchannel
 * each request should use.
 */
export interface LoadBalancer {
  /**
   * Gives the load balancer a new list of addresses to start connecting to.
   * The load balancer will start establishing connections with the new list,
   * but will continue using any existing connections until the new connections
   * are established
   * @param addressList The new list of addresses to connect to
   * @param lbConfig The load balancing config object from the service config,
   *     if one was provided
   */
  updateAddressList(
    addressList: SubchannelAddress[],
    lbConfig: LoadBalancingConfig,
    attributes: { [key: string]: unknown }
  ): void;
  /**
   * If the load balancer is currently in the IDLE state, start connecting.
   */
  exitIdle(): void;
  /**
   * If the load balancer is currently in the CONNECTING or TRANSIENT_FAILURE
   * state, reset the current connection backoff timeout to its base value and
   * transition to CONNECTING if in TRANSIENT_FAILURE.
   */
  resetBackoff(): void;
  /**
   * The load balancer unrefs all of its subchannels and stops calling methods
   * of its channel control helper.
   */
  destroy(): void;
  /**
   * Get the type name for this load balancer type. Must be constant across an
   * entire load balancer implementation class and must match the name that the
   * balancer implementation class was registered with.
   */
  getTypeName(): string;
}

export interface LoadBalancerConstructor {
  new (channelControlHelper: ChannelControlHelper): LoadBalancer;
}

export interface LoadBalancingConfig {
  getLoadBalancerName(): string;
  toJsonObject(): object;
}

export interface LoadBalancingConfigConstructor {
  new(...args: any): LoadBalancingConfig;
  createFromJson(obj: any): LoadBalancingConfig;
}

const registeredLoadBalancerTypes: {
  [name: string]: {
    LoadBalancer: LoadBalancerConstructor,
    LoadBalancingConfig: LoadBalancingConfigConstructor
  };
} = {};

export function registerLoadBalancerType(
  typeName: string,
  loadBalancerType: LoadBalancerConstructor,
  loadBalancingConfigType: LoadBalancingConfigConstructor
) {
  registeredLoadBalancerTypes[typeName] = {
    LoadBalancer: loadBalancerType,
    LoadBalancingConfig: loadBalancingConfigType
  };
}

export function createLoadBalancer(
  config: LoadBalancingConfig,
  channelControlHelper: ChannelControlHelper
): LoadBalancer | null {
  const typeName = config.getLoadBalancerName();
  if (typeName in registeredLoadBalancerTypes) {
    return new registeredLoadBalancerTypes[typeName].LoadBalancer(channelControlHelper);
  } else {
    return null;
  }
}

export function isLoadBalancerNameRegistered(typeName: string): boolean {
  return typeName in registeredLoadBalancerTypes;
}

export function getFirstUsableConfig(configs: LoadBalancingConfig[], defaultPickFirst?: true): LoadBalancingConfig;
export function getFirstUsableConfig(
  configs: LoadBalancingConfig[],
  defaultPickFirst: boolean = false
): LoadBalancingConfig | null {
  for (const config of configs) {
    if (config.getLoadBalancerName() in registeredLoadBalancerTypes) {
      return config;
    }
  }
  if (defaultPickFirst) {
    return new load_balancer_pick_first.PickFirstLoadBalancingConfig()
  } else {
    return null;
  }
}

export function validateLoadBalancingConfig(obj: any): LoadBalancingConfig {
  if (!(obj !== null  && (typeof obj === 'object'))) {
    throw new Error('Load balancing config must be an object');
  }
  const keys = Object.keys(obj);
  if (keys.length !== 1) {
    throw new Error('Provided load balancing config has multiple conflicting entries');
  }
  const typeName = keys[0];
  if (typeName in registeredLoadBalancerTypes) {
    return registeredLoadBalancerTypes[typeName].LoadBalancingConfig.createFromJson(obj[typeName]);
  } else {
    throw new Error(`Unrecognized load balancing config name ${typeName}`);
  }
}

export function registerAll() {
  load_balancer_pick_first.setup();
  load_balancer_round_robin.setup();
}
