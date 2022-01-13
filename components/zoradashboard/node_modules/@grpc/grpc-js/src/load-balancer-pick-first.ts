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

const TRACER_NAME = 'pick_first';

function trace(text: string): void {
  logging.trace(LogVerbosity.DEBUG, TRACER_NAME, text);
}

const TYPE_NAME = 'pick_first';

/**
 * Delay after starting a connection on a subchannel before starting a
 * connection on the next subchannel in the list, for Happy Eyeballs algorithm.
 */
const CONNECTION_DELAY_INTERVAL_MS = 250;

export class PickFirstLoadBalancingConfig implements LoadBalancingConfig {
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
    return new PickFirstLoadBalancingConfig();
  }
}

/**
 * Picker for a `PickFirstLoadBalancer` in the READY state. Always returns the
 * picked subchannel.
 */
class PickFirstPicker implements Picker {
  constructor(private subchannel: Subchannel) {}

  pick(pickArgs: PickArgs): CompletePickResult {
    return {
      pickResultType: PickResultType.COMPLETE,
      subchannel: this.subchannel,
      status: null,
      extraFilterFactory: null,
      onCallStarted: null,
    };
  }
}

interface ConnectivityStateCounts {
  [ConnectivityState.CONNECTING]: number;
  [ConnectivityState.IDLE]: number;
  [ConnectivityState.READY]: number;
  [ConnectivityState.SHUTDOWN]: number;
  [ConnectivityState.TRANSIENT_FAILURE]: number;
}

export class PickFirstLoadBalancer implements LoadBalancer {
  /**
   * The list of backend addresses most recently passed to `updateAddressList`.
   */
  private latestAddressList: SubchannelAddress[] = [];
  /**
   * The list of subchannels this load balancer is currently attempting to
   * connect to.
   */
  private subchannels: Subchannel[] = [];
  /**
   * The current connectivity state of the load balancer.
   */
  private currentState: ConnectivityState = ConnectivityState.IDLE;
  /**
   * The index within the `subchannels` array of the subchannel with the most
   * recently started connection attempt.
   */
  private currentSubchannelIndex = 0;

  private subchannelStateCounts: ConnectivityStateCounts;
  /**
   * The currently picked subchannel used for making calls. Populated if
   * and only if the load balancer's current state is READY. In that case,
   * the subchannel's current state is also READY.
   */
  private currentPick: Subchannel | null = null;
  /**
   * Listener callback attached to each subchannel in the `subchannels` list
   * while establishing a connection.
   */
  private subchannelStateListener: ConnectivityStateListener;
  /**
   * Listener callback attached to the current picked subchannel.
   */
  private pickedSubchannelStateListener: ConnectivityStateListener;
  /**
   * Timer reference for the timer tracking when to start
   */
  private connectionDelayTimeout: NodeJS.Timeout;

  private triedAllSubchannels = false;

  /**
   * Load balancer that attempts to connect to each backend in the address list
   * in order, and picks the first one that connects, using it for every
   * request.
   * @param channelControlHelper `ChannelControlHelper` instance provided by
   *     this load balancer's owner.
   */
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
      /* If the subchannel we most recently attempted to start connecting
       * to goes into TRANSIENT_FAILURE, immediately try to start
       * connecting to the next one instead of waiting for the connection
       * delay timer. */
      if (
        subchannel === this.subchannels[this.currentSubchannelIndex] &&
        newState === ConnectivityState.TRANSIENT_FAILURE
      ) {
        this.startNextSubchannelConnecting();
      }
      if (newState === ConnectivityState.READY) {
        this.pickSubchannel(subchannel);
        return;
      } else {
        if (
          this.triedAllSubchannels &&
          this.subchannelStateCounts[ConnectivityState.IDLE] ===
            this.subchannels.length
        ) {
          /* If all of the subchannels are IDLE we should go back to a
           * basic IDLE state where there is no subchannel list to avoid
           * holding unused resources */
          this.resetSubchannelList();
          this.updateState(ConnectivityState.IDLE, new QueuePicker(this));
          return;
        }
        if (this.currentPick === null) {
          if (this.triedAllSubchannels) {
            let newLBState: ConnectivityState;
            if (this.subchannelStateCounts[ConnectivityState.CONNECTING] > 0) {
              newLBState = ConnectivityState.CONNECTING;
            } else if (
              this.subchannelStateCounts[ConnectivityState.TRANSIENT_FAILURE] >
              0
            ) {
              newLBState = ConnectivityState.TRANSIENT_FAILURE;
            } else {
              newLBState = ConnectivityState.IDLE;
            }
            if (newLBState !== this.currentState) {
              if (newLBState === ConnectivityState.TRANSIENT_FAILURE) {
                this.updateState(newLBState, new UnavailablePicker());
              } else {
                this.updateState(newLBState, new QueuePicker(this));
              }
            }
          } else {
            this.updateState(
              ConnectivityState.CONNECTING,
              new QueuePicker(this)
            );
          }
        }
      }
    };
    this.pickedSubchannelStateListener = (
      subchannel: Subchannel,
      previousState: ConnectivityState,
      newState: ConnectivityState
    ) => {
      if (newState !== ConnectivityState.READY) {
        this.currentPick = null;
        subchannel.unref();
        subchannel.removeConnectivityStateListener(
          this.pickedSubchannelStateListener
        );
        if (this.subchannels.length > 0) {
          if (this.triedAllSubchannels) {
            let newLBState: ConnectivityState;
            if (this.subchannelStateCounts[ConnectivityState.CONNECTING] > 0) {
              newLBState = ConnectivityState.CONNECTING;
            } else if (
              this.subchannelStateCounts[ConnectivityState.TRANSIENT_FAILURE] >
              0
            ) {
              newLBState = ConnectivityState.TRANSIENT_FAILURE;
            } else {
              newLBState = ConnectivityState.IDLE;
            }
            if (newLBState === ConnectivityState.TRANSIENT_FAILURE) {
              this.updateState(newLBState, new UnavailablePicker());
            } else {
              this.updateState(newLBState, new QueuePicker(this));
            }
          } else {
            this.updateState(
              ConnectivityState.CONNECTING,
              new QueuePicker(this)
            );
          }
        } else {
          /* We don't need to backoff here because this only happens if a
           * subchannel successfully connects then disconnects, so it will not
           * create a loop of attempting to connect to an unreachable backend
           */
          this.updateState(ConnectivityState.IDLE, new QueuePicker(this));
        }
      }
    };
    this.connectionDelayTimeout = setTimeout(() => {}, 0);
    clearTimeout(this.connectionDelayTimeout);
  }

  private startNextSubchannelConnecting() {
    if (this.triedAllSubchannels) {
      return;
    }
    for (const [index, subchannel] of this.subchannels.entries()) {
      if (index > this.currentSubchannelIndex) {
        const subchannelState = subchannel.getConnectivityState();
        if (
          subchannelState === ConnectivityState.IDLE ||
          subchannelState === ConnectivityState.CONNECTING
        ) {
          this.startConnecting(index);
          return;
        }
      }
    }
    this.triedAllSubchannels = true;
  }

  /**
   * Have a single subchannel in the `subchannels` list start connecting.
   * @param subchannelIndex The index into the `subchannels` list.
   */
  private startConnecting(subchannelIndex: number) {
    clearTimeout(this.connectionDelayTimeout);
    this.currentSubchannelIndex = subchannelIndex;
    if (
      this.subchannels[subchannelIndex].getConnectivityState() ===
      ConnectivityState.IDLE
    ) {
      trace(
        'Start connecting to subchannel with address ' +
          this.subchannels[subchannelIndex].getAddress()
      );
      process.nextTick(() => {
        this.subchannels[subchannelIndex].startConnecting();
      });
    }
    this.connectionDelayTimeout = setTimeout(() => {
      this.startNextSubchannelConnecting();
    }, CONNECTION_DELAY_INTERVAL_MS);
  }

  private pickSubchannel(subchannel: Subchannel) {
    trace('Pick subchannel with address ' + subchannel.getAddress());
    if (this.currentPick !== null) {
      this.currentPick.unref();
      this.currentPick.removeConnectivityStateListener(
        this.pickedSubchannelStateListener
      );
    }
    this.currentPick = subchannel;
    this.updateState(ConnectivityState.READY, new PickFirstPicker(subchannel));
    subchannel.addConnectivityStateListener(this.pickedSubchannelStateListener);
    subchannel.ref();
    this.resetSubchannelList();
    clearTimeout(this.connectionDelayTimeout);
  }

  private updateState(newState: ConnectivityState, picker: Picker) {
    trace(
      ConnectivityState[this.currentState] +
        ' -> ' +
        ConnectivityState[newState]
    );
    this.currentState = newState;
    this.channelControlHelper.updateState(newState, picker);
  }

  private resetSubchannelList() {
    for (const subchannel of this.subchannels) {
      subchannel.removeConnectivityStateListener(this.subchannelStateListener);
      subchannel.unref();
    }
    this.currentSubchannelIndex = 0;
    this.subchannelStateCounts = {
      [ConnectivityState.CONNECTING]: 0,
      [ConnectivityState.IDLE]: 0,
      [ConnectivityState.READY]: 0,
      [ConnectivityState.SHUTDOWN]: 0,
      [ConnectivityState.TRANSIENT_FAILURE]: 0,
    };
    this.subchannels = [];
    this.triedAllSubchannels = false;
  }

  /**
   * Start connecting to the address list most recently passed to
   * `updateAddressList`.
   */
  private connectToAddressList(): void {
    this.resetSubchannelList();
    trace(
      'Connect to address list ' +
        this.latestAddressList.map((address) =>
          subchannelAddressToString(address)
        )
    );
    this.subchannels = this.latestAddressList.map((address) =>
      this.channelControlHelper.createSubchannel(address, {})
    );
    for (const subchannel of this.subchannels) {
      subchannel.ref();
    }
    for (const subchannel of this.subchannels) {
      subchannel.addConnectivityStateListener(this.subchannelStateListener);
      this.subchannelStateCounts[subchannel.getConnectivityState()] += 1;
      if (subchannel.getConnectivityState() === ConnectivityState.READY) {
        this.pickSubchannel(subchannel);
        this.resetSubchannelList();
        return;
      }
    }
    for (const [index, subchannel] of this.subchannels.entries()) {
      const subchannelState = subchannel.getConnectivityState();
      if (
        subchannelState === ConnectivityState.IDLE ||
        subchannelState === ConnectivityState.CONNECTING
      ) {
        this.startConnecting(index);
        if (this.currentPick === null) {
          this.updateState(ConnectivityState.CONNECTING, new QueuePicker(this));
        }
        return;
      }
    }
    // If the code reaches this point, every subchannel must be in TRANSIENT_FAILURE
    if (this.currentPick === null) {
      this.updateState(
        ConnectivityState.TRANSIENT_FAILURE,
        new UnavailablePicker()
      );
    }
  }

  updateAddressList(
    addressList: SubchannelAddress[],
    lbConfig: LoadBalancingConfig
  ): void {
    // lbConfig has no useful information for pick first load balancing
    /* To avoid unnecessary churn, we only do something with this address list
     * if we're not currently trying to establish a connection, or if the new
     * address list is different from the existing one */
    if (
      this.subchannels.length === 0 ||
      !this.latestAddressList.every(
        (value, index) => addressList[index] === value
      )
    ) {
      this.latestAddressList = addressList;
      this.connectToAddressList();
    }
  }

  exitIdle() {
    for (const subchannel of this.subchannels) {
      subchannel.startConnecting();
    }
    if (this.currentState === ConnectivityState.IDLE) {
      if (this.latestAddressList.length > 0) {
        this.connectToAddressList();
      }
    }
    if (
      this.currentState === ConnectivityState.IDLE ||
      this.triedAllSubchannels
    ) {
      this.channelControlHelper.requestReresolution();
    }
  }

  resetBackoff() {
    /* The pick first load balancer does not have a connection backoff, so this
     * does nothing */
  }

  destroy() {
    this.resetSubchannelList();
    if (this.currentPick !== null) {
      this.currentPick.unref();
      this.currentPick.removeConnectivityStateListener(
        this.pickedSubchannelStateListener
      );
    }
  }

  getTypeName(): string {
    return TYPE_NAME;
  }
}

export function setup(): void {
  registerLoadBalancerType(TYPE_NAME, PickFirstLoadBalancer, PickFirstLoadBalancingConfig);
}
