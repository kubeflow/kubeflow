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
exports.ResolvingLoadBalancer = void 0;
const load_balancer_1 = require("./load-balancer");
const service_config_1 = require("./service-config");
const channel_1 = require("./channel");
const resolver_1 = require("./resolver");
const picker_1 = require("./picker");
const backoff_timeout_1 = require("./backoff-timeout");
const constants_1 = require("./constants");
const metadata_1 = require("./metadata");
const logging = require("./logging");
const constants_2 = require("./constants");
const uri_parser_1 = require("./uri-parser");
const load_balancer_child_handler_1 = require("./load-balancer-child-handler");
const TRACER_NAME = 'resolving_load_balancer';
function trace(text) {
    logging.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const DEFAULT_LOAD_BALANCER_NAME = 'pick_first';
function getDefaultConfigSelector(serviceConfig) {
    return function defaultConfigSelector(methodName, metadata) {
        var _a, _b;
        const splitName = methodName.split('/').filter(x => x.length > 0);
        const service = (_a = splitName[0]) !== null && _a !== void 0 ? _a : '';
        const method = (_b = splitName[1]) !== null && _b !== void 0 ? _b : '';
        if (serviceConfig && serviceConfig.methodConfig) {
            for (const methodConfig of serviceConfig.methodConfig) {
                for (const name of methodConfig.name) {
                    if (name.service === service && (name.method === undefined || name.method === method)) {
                        return {
                            methodConfig: methodConfig,
                            pickInformation: {},
                            status: constants_1.Status.OK
                        };
                    }
                }
            }
        }
        return {
            methodConfig: { name: [] },
            pickInformation: {},
            status: constants_1.Status.OK
        };
    };
}
class ResolvingLoadBalancer {
    /**
     * Wrapper class that behaves like a `LoadBalancer` and also handles name
     * resolution internally.
     * @param target The address of the backend to connect to.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     * @param defaultServiceConfig The default service configuration to be used
     *     if none is provided by the name resolver. A `null` value indicates
     *     that the default behavior should be the default unconfigured behavior.
     *     In practice, that means using the "pick first" load balancer
     *     implmentation
     */
    constructor(target, channelControlHelper, channelOptions, onSuccessfulResolution, onFailedResolution) {
        this.target = target;
        this.channelControlHelper = channelControlHelper;
        this.channelOptions = channelOptions;
        this.onSuccessfulResolution = onSuccessfulResolution;
        this.onFailedResolution = onFailedResolution;
        this.latestChildState = channel_1.ConnectivityState.IDLE;
        this.latestChildPicker = new picker_1.QueuePicker(this);
        /**
         * This resolving load balancer's current connectivity state.
         */
        this.currentState = channel_1.ConnectivityState.IDLE;
        /**
         * The service config object from the last successful resolution, if
         * available. A value of null indicates that we have not yet received a valid
         * service config from the resolver.
         */
        this.previousServiceConfig = null;
        /**
         * Indicates whether we should attempt to resolve again after the backoff
         * timer runs out.
         */
        this.continueResolving = false;
        if (channelOptions['grpc.service_config']) {
            this.defaultServiceConfig = service_config_1.validateServiceConfig(JSON.parse(channelOptions['grpc.service_config']));
        }
        else {
            this.defaultServiceConfig = {
                loadBalancingConfig: [],
                methodConfig: [],
            };
        }
        this.updateState(channel_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
        this.childLoadBalancer = new load_balancer_child_handler_1.ChildLoadBalancerHandler({
            createSubchannel: channelControlHelper.createSubchannel.bind(channelControlHelper),
            requestReresolution: () => {
                /* If the backoffTimeout is running, we're still backing off from
                 * making resolve requests, so we shouldn't make another one here.
                 * In that case, the backoff timer callback will call
                 * updateResolution */
                if (this.backoffTimeout.isRunning()) {
                    this.continueResolving = true;
                }
                else {
                    this.updateResolution();
                }
            },
            updateState: (newState, picker) => {
                this.latestChildState = newState;
                this.latestChildPicker = picker;
                this.updateState(newState, picker);
            },
        });
        this.innerResolver = resolver_1.createResolver(target, {
            onSuccessfulResolution: (addressList, serviceConfig, serviceConfigError, configSelector, attributes) => {
                var _a;
                let workingServiceConfig = null;
                /* This first group of conditionals implements the algorithm described
                 * in https://github.com/grpc/proposal/blob/master/A21-service-config-error-handling.md
                 * in the section called "Behavior on receiving a new gRPC Config".
                 */
                if (serviceConfig === null) {
                    // Step 4 and 5
                    if (serviceConfigError === null) {
                        // Step 5
                        this.previousServiceConfig = null;
                        workingServiceConfig = this.defaultServiceConfig;
                    }
                    else {
                        // Step 4
                        if (this.previousServiceConfig === null) {
                            // Step 4.ii
                            this.handleResolutionFailure(serviceConfigError);
                        }
                        else {
                            // Step 4.i
                            workingServiceConfig = this.previousServiceConfig;
                        }
                    }
                }
                else {
                    // Step 3
                    workingServiceConfig = serviceConfig;
                    this.previousServiceConfig = serviceConfig;
                }
                const workingConfigList = (_a = workingServiceConfig === null || workingServiceConfig === void 0 ? void 0 : workingServiceConfig.loadBalancingConfig) !== null && _a !== void 0 ? _a : [];
                const loadBalancingConfig = load_balancer_1.getFirstUsableConfig(workingConfigList, true);
                if (loadBalancingConfig === null) {
                    // There were load balancing configs but none are supported. This counts as a resolution failure
                    this.handleResolutionFailure({
                        code: constants_1.Status.UNAVAILABLE,
                        details: 'All load balancer options in service config are not compatible',
                        metadata: new metadata_1.Metadata(),
                    });
                    return;
                }
                this.childLoadBalancer.updateAddressList(addressList, loadBalancingConfig, attributes);
                const finalServiceConfig = workingServiceConfig !== null && workingServiceConfig !== void 0 ? workingServiceConfig : this.defaultServiceConfig;
                this.onSuccessfulResolution(configSelector !== null && configSelector !== void 0 ? configSelector : getDefaultConfigSelector(finalServiceConfig));
            },
            onError: (error) => {
                this.handleResolutionFailure(error);
            },
        }, channelOptions);
        this.backoffTimeout = new backoff_timeout_1.BackoffTimeout(() => {
            if (this.continueResolving) {
                this.updateResolution();
                this.continueResolving = false;
            }
            else {
                this.updateState(this.latestChildState, this.latestChildPicker);
            }
        });
        this.backoffTimeout.unref();
    }
    updateResolution() {
        this.innerResolver.updateResolution();
        if (this.currentState === channel_1.ConnectivityState.IDLE) {
            this.updateState(channel_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
        }
    }
    updateState(connectivityState, picker) {
        trace(uri_parser_1.uriToString(this.target) +
            ' ' +
            channel_1.ConnectivityState[this.currentState] +
            ' -> ' +
            channel_1.ConnectivityState[connectivityState]);
        // Ensure that this.exitIdle() is called by the picker
        if (connectivityState === channel_1.ConnectivityState.IDLE) {
            picker = new picker_1.QueuePicker(this);
        }
        this.currentState = connectivityState;
        this.channelControlHelper.updateState(connectivityState, picker);
    }
    handleResolutionFailure(error) {
        if (this.latestChildState === channel_1.ConnectivityState.IDLE) {
            this.updateState(channel_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker(error));
            this.onFailedResolution(error);
        }
        this.backoffTimeout.runOnce();
    }
    exitIdle() {
        this.childLoadBalancer.exitIdle();
        if (this.currentState === channel_1.ConnectivityState.IDLE) {
            if (this.backoffTimeout.isRunning()) {
                this.continueResolving = true;
            }
            else {
                this.updateResolution();
            }
            this.updateState(channel_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
        }
    }
    updateAddressList(addressList, lbConfig) {
        throw new Error('updateAddressList not supported on ResolvingLoadBalancer');
    }
    resetBackoff() {
        this.backoffTimeout.reset();
        this.childLoadBalancer.resetBackoff();
    }
    destroy() {
        this.childLoadBalancer.destroy();
        this.innerResolver.destroy();
        this.updateState(channel_1.ConnectivityState.SHUTDOWN, new picker_1.UnavailablePicker());
    }
    getTypeName() {
        return 'resolving_load_balancer';
    }
}
exports.ResolvingLoadBalancer = ResolvingLoadBalancer;
//# sourceMappingURL=resolving-load-balancer.js.map