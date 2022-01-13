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

import {
  LoadBalancer,
  ChannelControlHelper,
  createLoadBalancer,
  LoadBalancingConfig
} from './load-balancer';
import { SubchannelAddress, Subchannel } from './subchannel';
import { ChannelOptions } from './channel-options';
import { ConnectivityState } from './channel';
import { Picker } from './picker';

const TYPE_NAME = 'child_load_balancer_helper';

export class ChildLoadBalancerHandler implements LoadBalancer {
  private currentChild: LoadBalancer | null = null;
  private pendingChild: LoadBalancer | null = null;

  private ChildPolicyHelper = class {
    private child: LoadBalancer | null = null;
    constructor(private parent: ChildLoadBalancerHandler) {}
    createSubchannel(
      subchannelAddress: SubchannelAddress,
      subchannelArgs: ChannelOptions
    ): Subchannel {
      return this.parent.channelControlHelper.createSubchannel(
        subchannelAddress,
        subchannelArgs
      );
    }
    updateState(connectivityState: ConnectivityState, picker: Picker): void {
      if (this.calledByPendingChild()) {
        if (connectivityState !== ConnectivityState.READY) {
          return;
        }
        this.parent.currentChild?.destroy();
        this.parent.currentChild = this.parent.pendingChild;
        this.parent.pendingChild = null;
      } else if (!this.calledByCurrentChild()) {
        return;
      }
      this.parent.channelControlHelper.updateState(connectivityState, picker);
    }
    requestReresolution(): void {
      const latestChild = this.parent.pendingChild ?? this.parent.currentChild;
      if (this.child === latestChild) {
        this.parent.channelControlHelper.requestReresolution();
      }
    }
    setChild(newChild: LoadBalancer) {
      this.child = newChild;
    }
    private calledByPendingChild(): boolean {
      return this.child === this.parent.pendingChild;
    }
    private calledByCurrentChild(): boolean {
      return this.child === this.parent.currentChild;
    }
  };

  constructor(private readonly channelControlHelper: ChannelControlHelper) {}

  /**
   * Prerequisites: lbConfig !== null and lbConfig.name is registered
   * @param addressList
   * @param lbConfig
   * @param attributes
   */
  updateAddressList(
    addressList: SubchannelAddress[],
    lbConfig: LoadBalancingConfig,
    attributes: { [key: string]: unknown }
  ): void {
    let childToUpdate: LoadBalancer;
    if (
      this.currentChild === null ||
      this.currentChild.getTypeName() !== lbConfig.getLoadBalancerName()
    ) {
      const newHelper = new this.ChildPolicyHelper(this);
      const newChild = createLoadBalancer(lbConfig, newHelper)!;
      newHelper.setChild(newChild);
      if (this.currentChild === null) {
        this.currentChild = newChild;
        childToUpdate = this.currentChild;
      } else {
        if (this.pendingChild) {
          this.pendingChild.destroy();
        }
        this.pendingChild = newChild;
        childToUpdate = this.pendingChild;
      }
    } else {
      if (this.pendingChild === null) {
        childToUpdate = this.currentChild;
      } else {
        childToUpdate = this.pendingChild;
      }
    }
    childToUpdate.updateAddressList(addressList, lbConfig, attributes);
  }
  exitIdle(): void {
    if (this.currentChild) {
      this.currentChild.resetBackoff();
      if (this.pendingChild) {
        this.pendingChild.resetBackoff();
      }
    }
  }
  resetBackoff(): void {
    if (this.currentChild) {
      this.currentChild.resetBackoff();
      if (this.pendingChild) {
        this.pendingChild.resetBackoff();
      }
    }
  }
  destroy(): void {
    if (this.currentChild) {
      this.currentChild.destroy();
      this.currentChild = null;
    }
    if (this.pendingChild) {
      this.pendingChild.destroy();
      this.pendingChild = null;
    }
  }
  getTypeName(): string {
    return TYPE_NAME;
  }
}
