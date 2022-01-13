"use strict";
/*
 * Copyright 2021 gRPC authors.
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
exports.validateLoadBalancingConfig = exports.getFirstUsableConfig = exports.isLoadBalancerNameRegistered = exports.createLoadBalancer = exports.registerDefaultLoadBalancerType = exports.registerLoadBalancerType = void 0;
const registeredLoadBalancerTypes = {};
let defaultLoadBalancerType = null;
function registerLoadBalancerType(typeName, loadBalancerType, loadBalancingConfigType) {
    registeredLoadBalancerTypes[typeName] = {
        LoadBalancer: loadBalancerType,
        LoadBalancingConfig: loadBalancingConfigType
    };
}
exports.registerLoadBalancerType = registerLoadBalancerType;
function registerDefaultLoadBalancerType(typeName) {
    defaultLoadBalancerType = typeName;
}
exports.registerDefaultLoadBalancerType = registerDefaultLoadBalancerType;
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
function getFirstUsableConfig(configs, fallbackTodefault = false) {
    for (const config of configs) {
        if (config.getLoadBalancerName() in registeredLoadBalancerTypes) {
            return config;
        }
    }
    if (fallbackTodefault) {
        if (defaultLoadBalancerType) {
            return new registeredLoadBalancerTypes[defaultLoadBalancerType].LoadBalancingConfig();
        }
        else {
            return null;
        }
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
//# sourceMappingURL=load-balancer-registry.js.map