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

import {
  LoadBalancer,
  ChannelControlHelper,
  registerLoadBalancerType,
  LoadBalancingConfig
} from './load-balancer';
import { ConnectivityState } from './channel';
import {
  QueuePicker,
  Picker,
  PickArgs,
  CompletePickResult,
  PickResultType,
  UnavailablePicker,
} from './picker';
import {
  Subchannel,
  ConnectivityStateListener,
  SubchannelAddress,
  subchannelAddressToString,
} from './subchannel';
import * as logging from './logging';
import { LogVerbosity } from './constants';

const TRACER_NAME = 'round_robin';

function trace(text: string): void {
  logging.trace(LogVerbosity.DEBUG, TRACER_NAME, text);
}

const TYPE_NAME = 'round_robin';

class RoundRobinLoadBalancingConfig implements LoadBalancingConfig {
  getLoadBalancerName(): string {
    return TYPE_NAME;
  }

  constructor() {}

  toJsonObject(): object {
    return {
      [TYPE_NAME]: {}
    };
  }

  static createFromJson(obj: any) {
    return new RoundRobinLoadBalancingConfig();
  }
}

class RoundRobinPicker implements Picker {
  constructor(
    private readonly subchannelList: Subchannel[],
    private nextIndex = 0
  ) {}

  pick(pickArgs: PickArgs): CompletePickResult {
    const pickedSubchannel = this.subchannelList[this.nextIndex];
    this.nextIndex = (this.nextIndex + 1) % this.subchannelList.length;
    return {
      pickResultType: PickResultType.COMPLETE,
      subchannel: pickedSubchannel,
      status: null,
      extraFilterFactory: null,
      onCallStarted: null,
    };
  }

  /**
   * Check what the next subchannel returned would be. Used by the load
   * balancer implementation to preserve this part of the picker state if
   * possible when a subchannel connects or disconnects.
   */
  peekNextSubchannel(): Subchannel {
    return this.subchannelList[this.nextIndex];
  }
}

interface ConnectivityStateCounts {
  [ConnectivityState.CONNECTING]: number;
  [ConnectivityState.IDLE]: number;
  [ConnectivityState.READY]: number;
  [ConnectivityState.SHUTDOWN]: number;
  [ConnectivityState.TRANSIENT_FAILURE]: number;
}

export class RoundRobinLoadBalancer implements LoadBalancer {
  private subchannels: Subchannel[] = [];

  private currentState: ConnectivityState = ConnectivityState.IDLE;

  private subchannelStateListener: ConnectivityStateListener;

  private subchannelStateCounts: ConnectivityStateCounts;

  private currentReadyPicker: RoundRobinPicker | null = null;

  constructor(private readonly channelControlHelper: ChannelControlHelper) {
    this.subchannelStateCounts = {
      [ConnectivityState.CONNECTING]: 0,
      [ConnectivityState.IDLE]: 0,
      [ConnectivityState.READY]: 0,
      [ConnectivityState.SHUTDOWN]: 0,
      [ConnectivityState.TRANSIENT_FAILURE]: 0,
    };
    this.subchannelStateListener = (
      subchannel: Subchannel,
      previousState: ConnectivityState,
      newState: ConnectivityState
    ) => {
      this.subchannelStateCounts[previousState] -= 1;
      this.subchannelStateCounts[newState] += 1;
      this.calculateAndUpdateState();
      
      if (
        newState === ConnectivityState.TRANSIENT_FAILURE ||
        newState === ConnectivityState.IDLE
      ) {
        this.channelControlHelper.requestReresolution();
        subchannel.startConnecting();
      }
    };
  }

  private calculateAndUpdateState() {
    if (this.subchannelStateCounts[ConnectivityState.READY] > 0) {
      const readySubchannels = this.subchannels.filter(
        (subchannel) =>
          subchannel.getConnectivityState() === ConnectivityState.READY
      );
      let index = 0;
      if (this.currentReadyPicker !== null) {
        index = readySubchannels.indexOf(
          this.currentReadyPicker.peekNextSubchannel()
        );
        if (index < 0) {
          index = 0;
        }
      }
      this.updateState(
        ConnectivityState.READY,
        new RoundRobinPicker(readySubchannels, index)
      );
    } else if (this.subchannelStateCounts[ConnectivityState.CONNECTING] > 0) {
      this.updateState(ConnectivityState.CONNECTING, new QueuePicker(this));
    } else if (
      this.subchannelStateCounts[ConnectivityState.TRANSIENT_FAILURE] > 0
    ) {
      this.updateState(
        ConnectivityState.TRANSIENT_FAILURE,
        new UnavailablePicker()
      );
    } else {
      this.updateState(ConnectivityState.IDLE, new QueuePicker(this));
    }
  }

  private updateState(newState: ConnectivityState, picker: Picker) {
    trace(
      ConnectivityState[this.currentState] +
        ' -> ' +
        ConnectivityState[newState]
    );
    if (newState === ConnectivityState.READY) {
      this.currentReadyPicker = picker as RoundRobinPicker;
    } else {
      this.currentReadyPicker = null;
    }
    this.currentState = newState;
    this.channelControlHelper.updateState(newState, picker);
  }

  private resetSubchannelList() {
    for (const subchannel of this.subchannels) {
      subchannel.removeConnectivityStateListener(this.subchannelStateListener);
      subchannel.unref();
    }
    this.subchannelStateCounts = {
      [ConnectivityState.CONNECTING]: 0,
      [ConnectivityState.IDLE]: 0,
      [ConnectivityState.READY]: 0,
      [ConnectivityState.SHUTDOWN]: 0,
      [ConnectivityState.TRANSIENT_FAILURE]: 0,
    };
    this.subchannels = [];
  }

  updateAddressList(
    addressList: SubchannelAddress[],
    lbConfig: LoadBalancingConfig
  ): void {
    this.resetSubchannelList();
    trace(
      'Connect to address list ' +
        addressList.map((address) => subchannelAddressToString(address))
    );
    this.subchannels = addressList.map((address) =>
      this.channelControlHelper.createSubchannel(address, {})
    );
    for (const subchannel of this.subchannels) {
      subchannel.ref();
      subchannel.addConnectivityStateListener(this.subchannelStateListener);
      const subchannelState = subchannel.getConnectivityState();
      this.subchannelStateCounts[subchannelState] += 1;
      if (
        subchannelState === ConnectivityState.IDLE ||
        subchannelState === ConnectivityState.TRANSIENT_FAILURE
      ) {
        subchannel.startConnecting();
      }
    }
    this.calculateAndUpdateState();
  }

  exitIdle(): void {
    for (const subchannel of this.subchannels) {
      subchannel.startConnecting();
    }
  }
  resetBackoff(): void {
    /* The pick first load balancer does not have a connection backoff, so this
     * does nothing */
  }
  destroy(): void {
    this.resetSubchannelList();
  }
  getTypeName(): string {
    return TYPE_NAME;
  }
}

export function setup() {
  registerLoadBalancerType(TYPE_NAME, RoundRobinLoadBalancer, RoundRobinLoadBalancingConfig);
}
