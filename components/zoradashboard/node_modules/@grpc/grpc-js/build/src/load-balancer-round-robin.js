"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.RoundRobinLoadBalancer = void 0;
const load_balancer_1 = require("./load-balancer");
const channel_1 = require("./channel");
const picker_1 = require("./picker");
const subchannel_1 = require("./subchannel");
const logging = require("./logging");
const constants_1 = require("./constants");
const TRACER_NAME = 'round_robin';
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const TYPE_NAME = 'round_robin';
class RoundRobinLoadBalancingConfig {
    getLoadBalancerName() {
        return TYPE_NAME;
    }
    constructor() { }
    toJsonObject() {
        return {
            [TYPE_NAME]: {}
        };
    }
    static createFromJson(obj) {
        return new RoundRobinLoadBalancingConfig();
    }
}
class RoundRobinPicker {
    constructor(subchannelList, nextIndex = 0) {
        this.subchannelList = subchannelList;
        this.nextIndex = nextIndex;
    }
    pick(pickArgs) {
        const pickedSubchannel = this.subchannelList[this.nextIndex];
        this.nextIndex = (this.nextIndex + 1) % this.subchannelList.length;
        return {
            pickResultType: picker_1.PickResultType.COMPLETE,
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
    peekNextSubchannel() {
        return this.subchannelList[this.nextIndex];
    }
}
class RoundRobinLoadBalancer {
    constructor(channelControlHelper) {
        this.channelControlHelper = channelControlHelper;
        this.subchannels = [];
        this.currentState = channel_1.ConnectivityState.IDLE;
        this.currentReadyPicker = null;
        this.subchannelStateCounts = {
            [channel_1.ConnectivityState.CONNECTING]: 0,
            [channel_1.ConnectivityState.IDLE]: 0,
            [channel_1.ConnectivityState.READY]: 0,
            [channel_1.ConnectivityState.SHUTDOWN]: 0,
            [channel_1.ConnectivityState.TRANSIENT_FAILURE]: 0,
        };
        this.subchannelStateListener = (subchannel, previousState, newState) => {
            this.subchannelStateCounts[previousState] -= 1;
            this.subchannelStateCounts[newState] += 1;
            this.calculateAndUpdateState();
            if (newState === channel_1.ConnectivityState.TRANSIENT_FAILURE ||
                newState === channel_1.ConnectivityState.IDLE) {
                this.channelControlHelper.requestReresolution();
                subchannel.startConnecting();
            }
        };
    }
    calculateAndUpdateState() {
        if (this.subchannelStateCounts[channel_1.ConnectivityState.READY] > 0) {
            const readySubchannels = this.subchannels.filter((subchannel) => subchannel.getConnectivityState() === channel_1.ConnectivityState.READY);
            let index = 0;
            if (this.currentReadyPicker !== null) {
                index = readySubchannels.indexOf(this.currentReadyPicker.peekNextSubchannel());
                if (index < 0) {
                    index = 0;
                }
            }
            this.updateState(channel_1.ConnectivityState.READY, new RoundRobinPicker(readySubchannels, index));
        }
        else if (this.subchannelStateCounts[channel_1.ConnectivityState.CONNECTING] > 0) {
            this.updateState(channel_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
        }
        else if (this.subchannelStateCounts[channel_1.ConnectivityState.TRANSIENT_FAILURE] > 0) {
            this.updateState(channel_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker());
        }
        else {
            this.updateState(channel_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
        }
    }
    updateState(newState, picker) {
        trace(channel_1.ConnectivityState[this.currentState] +
            ' -> ' +
            channel_1.ConnectivityState[newState]);
        if (newState === channel_1.ConnectivityState.READY) {
            this.currentReadyPicker = picker;
        }
        else {
            this.currentReadyPicker = null;
        }
        this.currentState = newState;
        this.channelControlHelper.updateState(newState, picker);
    }
    resetSubchannelList() {
        for (const subchannel of this.subchannels) {
            subchannel.removeConnectivityStateListener(this.subchannelStateListener);
            subchannel.unref();
        }
        this.subchannelStateCounts = {
            [channel_1.ConnectivityState.CONNECTING]: 0,
            [channel_1.ConnectivityState.IDLE]: 0,
            [channel_1.ConnectivityState.READY]: 0,
            [channel_1.ConnectivityState.SHUTDOWN]: 0,
            [channel_1.ConnectivityState.TRANSIENT_FAILURE]: 0,
        };
        this.subchannels = [];
    }
    updateAddressList(addressList, lbConfig) {
        this.resetSubchannelList();
        trace('Connect to address list ' +
            addressList.map((address) => subchannel_1.subchannelAddressToString(address)));
        this.subchannels = addressList.map((address) => this.channelControlHelper.createSubchannel(address, {}));
        for (const subchannel of this.subchannels) {
            subchannel.ref();
            subchannel.addConnectivityStateListener(this.subchannelStateListener);
            const subchannelState = subchannel.getConnectivityState();
            this.subchannelStateCounts[subchannelState] += 1;
            if (subchannelState === channel_1.ConnectivityState.IDLE ||
                subchannelState === channel_1.ConnectivityState.TRANSIENT_FAILURE) {
                subchannel.startConnecting();
            }
        }
        this.calculateAndUpdateState();
    }
    exitIdle() {
        for (const subchannel of this.subchannels) {
            subchannel.startConnecting();
        }
    }
    resetBackoff() {
        /* The pick first load balancer does not have a connection backoff, so this
         * does nothing */
    }
    destroy() {
        this.resetSubchannelList();
    }
    getTypeName() {
        return TYPE_NAME;
    }
}
exports.RoundRobinLoadBalancer = RoundRobinLoadBalancer;
function setup() {
    load_balancer_1.registerLoadBalancerType(TYPE_NAME, RoundRobinLoadBalancer, RoundRobinLoadBalancingConfig);
}
exports.setup = setup;
//# sourceMappingURL=load-balancer-round-robin.js.map