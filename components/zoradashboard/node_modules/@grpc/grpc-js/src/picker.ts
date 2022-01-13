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

import { Subchannel } from './subchannel';
import { StatusObject } from './call-stream';
import { Metadata } from './metadata';
import { Status } from './constants';
import { LoadBalancer } from './load-balancer';
import { FilterFactory, Filter } from './filter';

export enum PickResultType {
  COMPLETE,
  QUEUE,
  TRANSIENT_FAILURE,
  DROP,
}

export interface PickResult {
  pickResultType: PickResultType;
  /**
   * The subchannel to use as the transport for the call. Only meaningful if
   * `pickResultType` is COMPLETE. If null, indicates that the call should be
   * dropped.
   */
  subchannel: Subchannel | null;
  /**
   * The status object to end the call with. Populated if and only if
   * `pickResultType` is TRANSIENT_FAILURE.
   */
  status: StatusObject | null;
  /**
   * Extra FilterFactory (can be multiple encapsulated in a FilterStackFactory)
   * provided by the load balancer to be used with the call. For technical
   * reasons filters from this factory will not see sendMetadata events.
   */
  extraFilterFactory: FilterFactory<Filter> | null;
  onCallStarted: (() => void) | null;
}

export interface CompletePickResult extends PickResult {
  pickResultType: PickResultType.COMPLETE;
  subchannel: Subchannel | null;
  status: null;
  extraFilterFactory: FilterFactory<Filter> | null;
  onCallStarted: (() => void) | null;
}

export interface QueuePickResult extends PickResult {
  pickResultType: PickResultType.QUEUE;
  subchannel: null;
  status: null;
  extraFilterFactory: null;
  onCallStarted: null;
}

export interface TransientFailurePickResult extends PickResult {
  pickResultType: PickResultType.TRANSIENT_FAILURE;
  subchannel: null;
  status: StatusObject;
  extraFilterFactory: null;
  onCallStarted: null;
}

export interface DropCallPickResult extends PickResult {
  pickResultType: PickResultType.DROP;
  subchannel: null;
  status: StatusObject;
  extraFilterFactory: null;
  onCallStarted: null;
}

export interface PickArgs {
  metadata: Metadata;
  extraPickInfo: {[key: string]: string};
}

/**
 * A proxy object representing the momentary state of a load balancer. Picks
 * subchannels or returns other information based on that state. Should be
 * replaced every time the load balancer changes state.
 */
export interface Picker {
  pick(pickArgs: PickArgs): PickResult;
}

/**
 * A standard picker representing a load balancer in the TRANSIENT_FAILURE
 * state. Always responds to every pick request with an UNAVAILABLE status.
 */
export class UnavailablePicker implements Picker {
  private status: StatusObject;
  constructor(status?: StatusObject) {
    if (status !== undefined) {
      this.status = status;
    } else {
      this.status = {
        code: Status.UNAVAILABLE,
        details: 'No connection established',
        metadata: new Metadata(),
      };
    }
  }
  pick(pickArgs: PickArgs): TransientFailurePickResult {
    return {
      pickResultType: PickResultType.TRANSIENT_FAILURE,
      subchannel: null,
      status: this.status,
      extraFilterFactory: null,
      onCallStarted: null,
    };
  }
}

/**
 * A standard picker representing a load balancer in the IDLE or CONNECTING
 * state. Always responds to every pick request with a QUEUE pick result
 * indicating that the pick should be tried again with the next `Picker`. Also
 * reports back to the load balancer that a connection should be established
 * once any pick is attempted.
 */
export class QueuePicker {
  private calledExitIdle = false;
  // Constructed with a load balancer. Calls exitIdle on it the first time pick is called
  constructor(private loadBalancer: LoadBalancer) {}

  pick(pickArgs: PickArgs): QueuePickResult {
    if (!this.calledExitIdle) {
      process.nextTick(() => {
        this.loadBalancer.exitIdle();
      });
      this.calledExitIdle = true;
    }
    return {
      pickResultType: PickResultType.QUEUE,
      subchannel: null,
      status: null,
      extraFilterFactory: null,
      onCallStarted: null,
    };
  }
}
