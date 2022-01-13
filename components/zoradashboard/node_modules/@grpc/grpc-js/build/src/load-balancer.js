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
exports.registerAll = exports.validateLoadBalancingConfig = exports.getFirstUsableConfig = exports.isLoadBalancerNameRegistered = exports.createLoadBalancer = exports.registerLoadBalancerType = void 0;
const load_balancer_pick_first = require("./load-balancer-pick-first");
const load_balancer_round_robin = require("./load-balancer-round-robin");
const registeredLoadBalancerTypes = {};
function registerLoadBalancerType(typeName, loadBalancerType, loadBalancingConfigType) {
    registeredLoadBalancerTypes[typeName] = {
        LoadBalancer: loadBalancerType,
        LoadBalancingConfig: loadBalancingConfigType
    };
}
exports.registerLoadBalancerType = registerLoadBalancerType;
function createLoadBalancer(config, channelControlHelper) {
    const typeName = config.getLoadBalancerName();
    if (typeName in registeredLoadBalancerTypes) {
        return new registeredLoadBalancerTypes[typeName].LoadBalancer(channelControlHelper);
    }
    else {
        return null;
    }
}
exports.createLoadBalancer = createLoadBalancer;
function isLoadBalancerNameRegistered(typeName) {
    return typeName in registeredLoadBalancerTypes;
}
exports.isLoadBalancerNameRegistered = isLoadBalancerNameRegistered;
function getFirstUsableConfig(configs, defaultPickFirst = false) {
    for (const config of configs) {
        if (config.getLoadBalancerName() in registeredLoadBalancerTypes) {
            return config;
        }
    }
    if (defaultPickFirst) {
        return new load_balancer_pick_first.PickFirstLoadBalancingConfig();
    }
    else {
        return null;
    }
}
exports.getFirstUsableConfig = getFirstUsableConfig;
function validateLoadBalancingConfig(obj) {
    if (!(obj !== null && (typeof obj === 'object'))) {
        throw new Error('Load balancing config must be an object');
    }
    const keys = Object.keys(obj);
    if (keys.length !== 1) {
        throw new Error('Provided load balancing config has multiple conflicting entries');
    }
    const typeName = keys[0];
    if (typeName in registeredLoadBalancerTypes) {
        return registeredLoadBalancerTypes[typeName].LoadBalancingConfig.createFromJson(obj[typeName]);
    }
    else {
        throw new Error(`Unrecognized load balancing config name ${typeName}`);
    }
}
exports.validateLoadBalancingConfig = validateLoadBalancingConfig;
function registerAll() {
    load_balancer_pick_first.setup();
    load_balancer_round_robin.setup();
}
exports.registerAll = registerAll;
//# sourceMappingURL=load-balancer.js.map