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
exports.ChannelImplementation = exports.ConnectivityState = void 0;
const call_stream_1 = require("./call-stream");
const channel_credentials_1 = require("./channel-credentials");
const resolving_load_balancer_1 = require("./resolving-load-balancer");
const subchannel_pool_1 = require("./subchannel-pool");
const picker_1 = require("./picker");
const constants_1 = require("./constants");
const filter_stack_1 = require("./filter-stack");
const call_credentials_filter_1 = require("./call-credentials-filter");
const deadline_filter_1 = require("./deadline-filter");
const compression_filter_1 = require("./compression-filter");
const resolver_1 = require("./resolver");
const logging_1 = require("./logging");
const max_message_size_filter_1 = require("./max-message-size-filter");
const http_proxy_1 = require("./http_proxy");
const uri_parser_1 = require("./uri-parser");
var ConnectivityState;
(function (ConnectivityState) {
    ConnectivityState[ConnectivityState["IDLE"] = 0] = "IDLE";
    ConnectivityState[ConnectivityState["CONNECTING"] = 1] = "CONNECTING";
    ConnectivityState[ConnectivityState["READY"] = 2] = "READY";
    ConnectivityState[ConnectivityState["TRANSIENT_FAILURE"] = 3] = "TRANSIENT_FAILURE";
    ConnectivityState[ConnectivityState["SHUTDOWN"] = 4] = "SHUTDOWN";
})(ConnectivityState = exports.ConnectivityState || (exports.ConnectivityState = {}));
/**
 * See https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_args
 */
const MAX_TIMEOUT_TIME = 2147483647;
let nextCallNumber = 0;
function getNewCallNumber() {
    const callNumber = nextCallNumber;
    nextCallNumber += 1;
    if (nextCallNumber >= Number.MAX_SAFE_INTEGER) {
        nextCallNumber = 0;
    }
    return callNumber;
}
class ChannelImplementation {
    constructor(target, credentials, options) {
        var _a, _b, _c;
        this.credentials = credentials;
        this.options = options;
        this.connectivityState = ConnectivityState.IDLE;
        this.currentPicker = new picker_1.UnavailablePicker();
        /**
         * Calls queued up to get a call config. Should only be populated before the
         * first time the resolver returns a result, which includes the ConfigSelector.
         */
        this.configSelectionQueue = [];
        this.pickQueue = [];
        this.connectivityStateWatchers = [];
        this.configSelector = null;
        if (typeof target !== 'string') {
            throw new TypeError('Channel target must be a string');
        }
        if (!(credentials instanceof channel_credentials_1.ChannelCredentials)) {
            throw new TypeError('Channel credentials must be a ChannelCredentials object');
        }
        if (options) {
            if (typeof options !== 'object' ||
                !Object.values(options).every((value) => typeof value === 'string' ||
                    typeof value === 'number' ||
                    typeof value === 'undefined')) {
                throw new TypeError('Channel options must be an object with string or number values');
            }
        }
        const originalTargetUri = uri_parser_1.parseUri(target);
        if (originalTargetUri === null) {
            throw new Error(`Could not parse target name "${target}"`);
        }
        /* This ensures that the target has a scheme that is registered with the
         * resolver */
        const defaultSchemeMapResult = resolver_1.mapUriDefaultScheme(originalTargetUri);
        if (defaultSchemeMapResult === null) {
            throw new Error(`Could not find a default scheme for target name "${target}"`);
        }
        this.callRefTimer = setInterval(() => { }, MAX_TIMEOUT_TIME);
        (_b = (_a = this.callRefTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (this.options['grpc.default_authority']) {
            this.defaultAuthority = this.options['grpc.default_authority'];
        }
        else {
            this.defaultAuthority = resolver_1.getDefaultAuthority(defaultSchemeMapResult);
        }
        const proxyMapResult = http_proxy_1.mapProxyName(defaultSchemeMapResult, options);
        this.target = proxyMapResult.target;
        this.options = Object.assign({}, this.options, proxyMapResult.extraOptions);
        /* The global boolean parameter to getSubchannelPool has the inverse meaning to what
         * the grpc.use_local_subchannel_pool channel option means. */
        this.subchannelPool = subchannel_pool_1.getSubchannelPool(((_c = options['grpc.use_local_subchannel_pool']) !== null && _c !== void 0 ? _c : 0) === 0);
        const channelControlHelper = {
            createSubchannel: (subchannelAddress, subchannelArgs) => {
                return this.subchannelPool.getOrCreateSubchannel(this.target, subchannelAddress, Object.assign({}, this.options, subchannelArgs), this.credentials);
            },
            updateState: (connectivityState, picker) => {
                this.currentPicker = picker;
                const queueCopy = this.pickQueue.slice();
                this.pickQueue = [];
                this.callRefTimerUnref();
                for (const { callStream, callMetadata, callConfig } of queueCopy) {
                    this.tryPick(callStream, callMetadata, callConfig);
                }
                this.updateState(connectivityState);
            },
            requestReresolution: () => {
                // This should never be called.
                throw new Error('Resolving load balancer should never call requestReresolution');
            },
        };
        this.resolvingLoadBalancer = new resolving_load_balancer_1.ResolvingLoadBalancer(this.target, channelControlHelper, options, (configSelector) => {
            this.configSelector = configSelector;
            /* We process the queue asynchronously to ensure that the corresponding
             * load balancer update has completed. */
            process.nextTick(() => {
                const localQueue = this.configSelectionQueue;
                this.configSelectionQueue = [];
                this.callRefTimerUnref();
                for (const { callStream, callMetadata } of localQueue) {
                    this.tryGetConfig(callStream, callMetadata);
                }
                this.configSelectionQueue = [];
            });
        }, (status) => {
            if (this.configSelectionQueue.length > 0) {
                logging_1.trace(constants_1.LogVerbosity.DEBUG, 'channel', 'Name resolution failed for target ' + uri_parser_1.uriToString(this.target) + ' with calls queued for config selection');
            }
            const localQueue = this.configSelectionQueue;
            this.configSelectionQueue = [];
            this.callRefTimerUnref();
            for (const { callStream, callMetadata } of localQueue) {
                if (callMetadata.getOptions().waitForReady) {
                    this.callRefTimerRef();
                    this.configSelectionQueue.push({ callStream, callMetadata });
                }
                else {
                    callStream.cancelWithStatus(status.code, status.details);
                }
            }
        });
        this.filterStackFactory = new filter_stack_1.FilterStackFactory([
            new call_credentials_filter_1.CallCredentialsFilterFactory(this),
            new deadline_filter_1.DeadlineFilterFactory(this),
            new max_message_size_filter_1.MaxMessageSizeFilterFactory(this.options),
            new compression_filter_1.CompressionFilterFactory(this),
        ]);
    }
    callRefTimerRef() {
        var _a, _b, _c, _d;
        // If the hasRef function does not exist, always run the code
        if (!((_b = (_a = this.callRefTimer).hasRef) === null || _b === void 0 ? void 0 : _b.call(_a))) {
            logging_1.trace(constants_1.LogVerbosity.DEBUG, 'channel', 'callRefTimer.ref | configSelectionQueue.length=' + this.configSelectionQueue.length + ' pickQueue.length=' + this.pickQueue.length);
            (_d = (_c = this.callRefTimer).ref) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
    }
    callRefTimerUnref() {
        var _a, _b;
        // If the hasRef function does not exist, always run the code
        if ((!this.callRefTimer.hasRef) || (this.callRefTimer.hasRef())) {
            logging_1.trace(constants_1.LogVerbosity.DEBUG, 'channel', 'callRefTimer.unref | configSelectionQueue.length=' + this.configSelectionQueue.length + ' pickQueue.length=' + this.pickQueue.length);
            (_b = (_a = this.callRefTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }
    pushPick(callStream, callMetadata, callConfig) {
        this.pickQueue.push({ callStream, callMetadata, callConfig });
        this.callRefTimerRef();
    }
    /**
     * Check the picker output for the given call and corresponding metadata,
     * and take any relevant actions. Should not be called while iterating
     * over pickQueue.
     * @param callStream
     * @param callMetadata
     */
    tryPick(callStream, callMetadata, callConfig) {
        var _a, _b, _c;
        const pickResult = this.currentPicker.pick({ metadata: callMetadata, extraPickInfo: callConfig.pickInformation });
        logging_1.trace(constants_1.LogVerbosity.DEBUG, 'channel', 'Pick result: ' +
            picker_1.PickResultType[pickResult.pickResultType] +
            ' subchannel: ' + ((_a = pickResult.subchannel) === null || _a === void 0 ? void 0 : _a.getAddress()) +
            ' status: ' + ((_b = pickResult.status) === null || _b === void 0 ? void 0 : _b.code) +
            ' ' + ((_c = pickResult.status) === null || _c === void 0 ? void 0 : _c.details));
        switch (pickResult.pickResultType) {
            case picker_1.PickResultType.COMPLETE:
                if (pickResult.subchannel === null) {
                    callStream.cancelWithStatus(constants_1.Status.UNAVAILABLE, 'Request dropped by load balancing policy');
                    // End the call with an error
                }
                else {
                    /* If the subchannel is not in the READY state, that indicates a bug
                     * somewhere in the load balancer or picker. So, we log an error and
                     * queue the pick to be tried again later. */
                    if (pickResult.subchannel.getConnectivityState() !==
                        ConnectivityState.READY) {
                        logging_1.log(constants_1.LogVerbosity.ERROR, 'Error: COMPLETE pick result subchannel ' +
                            pickResult.subchannel.getAddress() +
                            ' has state ' +
                            ConnectivityState[pickResult.subchannel.getConnectivityState()]);
                        this.pushPick(callStream, callMetadata, callConfig);
                        break;
                    }
                    /* We need to clone the callMetadata here because the transparent
                     * retry code in the promise resolution handler use the same
                     * callMetadata object, so it needs to stay unmodified */
                    callStream.filterStack
                        .sendMetadata(Promise.resolve(callMetadata.clone()))
                        .then((finalMetadata) => {
                        var _a, _b, _c;
                        const subchannelState = pickResult.subchannel.getConnectivityState();
                        if (subchannelState === ConnectivityState.READY) {
                            try {
                                pickResult.subchannel.startCallStream(finalMetadata, callStream, (_a = pickResult.extraFilterFactory) !== null && _a !== void 0 ? _a : undefined);
                                /* If we reach this point, the call stream has started
                                 * successfully */
                                (_b = callConfig.onCommitted) === null || _b === void 0 ? void 0 : _b.call(callConfig);
                                (_c = pickResult.onCallStarted) === null || _c === void 0 ? void 0 : _c.call(pickResult);
                            }
                            catch (error) {
                                if (error.code ===
                                    'ERR_HTTP2_GOAWAY_SESSION') {
                                    /* An error here indicates that something went wrong with
                                     * the picked subchannel's http2 stream right before we
                                     * tried to start the stream. We are handling a promise
                                     * result here, so this is asynchronous with respect to the
                                     * original tryPick call, so calling it again is not
                                     * recursive. We call tryPick immediately instead of
                                     * queueing this pick again because handling the queue is
                                     * triggered by state changes, and we want to immediately
                                     * check if the state has already changed since the
                                     * previous tryPick call. We do this instead of cancelling
                                     * the stream because the correct behavior may be
                                     * re-queueing instead, based on the logic in the rest of
                                     * tryPick */
                                    logging_1.trace(constants_1.LogVerbosity.INFO, 'channel', 'Failed to start call on picked subchannel ' +
                                        pickResult.subchannel.getAddress() +
                                        ' with error ' +
                                        error.message +
                                        '. Retrying pick');
                                    this.tryPick(callStream, callMetadata, callConfig);
                                }
                                else {
                                    logging_1.trace(constants_1.LogVerbosity.INFO, 'channel', 'Failed to start call on picked subchanel ' +
                                        pickResult.subchannel.getAddress() +
                                        ' with error ' +
                                        error.message +
                                        '. Ending call');
                                    callStream.cancelWithStatus(constants_1.Status.INTERNAL, `Failed to start HTTP/2 stream with error: ${error.message}`);
                                }
                            }
                        }
                        else {
                            /* The logic for doing this here is the same as in the catch
                             * block above */
                            logging_1.trace(constants_1.LogVerbosity.INFO, 'channel', 'Picked subchannel ' +
                                pickResult.subchannel.getAddress() +
                                ' has state ' +
                                ConnectivityState[subchannelState] +
                                ' after metadata filters. Retrying pick');
                            this.tryPick(callStream, callMetadata, callConfig);
                        }
                    }, (error) => {
                        // We assume the error code isn't 0 (Status.OK)
                        callStream.cancelWithStatus((typeof error.code === 'number') ? error.code : constants_1.Status.UNKNOWN, `Getting metadata from plugin failed with error: ${error.message}`);
                    });
                }
                break;
            case picker_1.PickResultType.QUEUE:
                this.pushPick(callStream, callMetadata, callConfig);
                break;
            case picker_1.PickResultType.TRANSIENT_FAILURE:
                if (callMetadata.getOptions().waitForReady) {
                    this.pushPick(callStream, callMetadata, callConfig);
                }
                else {
                    callStream.cancelWithStatus(pickResult.status.code, pickResult.status.details);
                }
                break;
            case picker_1.PickResultType.DROP:
                callStream.cancelWithStatus(pickResult.status.code, pickResult.status.details);
                break;
            default:
                throw new Error(`Invalid state: unknown pickResultType ${pickResult.pickResultType}`);
        }
    }
    removeConnectivityStateWatcher(watcherObject) {
        const watcherIndex = this.connectivityStateWatchers.findIndex((value) => value === watcherObject);
        if (watcherIndex >= 0) {
            this.connectivityStateWatchers.splice(watcherIndex, 1);
        }
    }
    updateState(newState) {
        logging_1.trace(constants_1.LogVerbosity.DEBUG, 'connectivity_state', uri_parser_1.uriToString(this.target) +
            ' ' +
            ConnectivityState[this.connectivityState] +
            ' -> ' +
            ConnectivityState[newState]);
        this.connectivityState = newState;
        const watchersCopy = this.connectivityStateWatchers.slice();
        for (const watcherObject of watchersCopy) {
            if (newState !== watcherObject.currentState) {
                if (watcherObject.timer) {
                    clearTimeout(watcherObject.timer);
                }
                this.removeConnectivityStateWatcher(watcherObject);
                watcherObject.callback();
            }
        }
    }
    tryGetConfig(stream, metadata) {
        if (this.configSelector === null) {
            /* This branch will only be taken at the beginning of the channel's life,
             * before the resolver ever returns a result. So, the
             * ResolvingLoadBalancer may be idle and if so it needs to be kicked
             * because it now has a pending request. */
            this.resolvingLoadBalancer.exitIdle();
            this.configSelectionQueue.push({
                callStream: stream,
                callMetadata: metadata
            });
            this.callRefTimerRef();
        }
        else {
            const callConfig = this.configSelector(stream.getMethod(), metadata);
            if (callConfig.status === constants_1.Status.OK) {
                this.tryPick(stream, metadata, callConfig);
            }
            else {
                stream.cancelWithStatus(callConfig.status, "Failed to route call to method " + stream.getMethod());
            }
        }
    }
    _startCallStream(stream, metadata) {
        this.tryGetConfig(stream, metadata.clone());
    }
    close() {
        this.resolvingLoadBalancer.destroy();
        this.updateState(ConnectivityState.SHUTDOWN);
        clearInterval(this.callRefTimer);
        this.subchannelPool.unrefUnusedSubchannels();
    }
    getTarget() {
        return uri_parser_1.uriToString(this.target);
    }
    getConnectivityState(tryToConnect) {
        const connectivityState = this.connectivityState;
        if (tryToConnect) {
            this.resolvingLoadBalancer.exitIdle();
        }
        return connectivityState;
    }
    watchConnectivityState(currentState, deadline, callback) {
        if (this.connectivityState === ConnectivityState.SHUTDOWN) {
            throw new Error('Channel has been shut down');
        }
        let timer = null;
        if (deadline !== Infinity) {
            const deadlineDate = deadline instanceof Date ? deadline : new Date(deadline);
            const now = new Date();
            if (deadline === -Infinity || deadlineDate <= now) {
                process.nextTick(callback, new Error('Deadline passed without connectivity state change'));
                return;
            }
            timer = setTimeout(() => {
                this.removeConnectivityStateWatcher(watcherObject);
                callback(new Error('Deadline passed without connectivity state change'));
            }, deadlineDate.getTime() - now.getTime());
        }
        const watcherObject = {
            currentState,
            callback,
            timer
        };
        this.connectivityStateWatchers.push(watcherObject);
    }
    createCall(method, deadline, host, parentCall, propagateFlags) {
        if (typeof method !== 'string') {
            throw new TypeError('Channel#createCall: method must be a string');
        }
        if (!(typeof deadline === 'number' || deadline instanceof Date)) {
            throw new TypeError('Channel#createCall: deadline must be a number or Date');
        }
        if (this.connectivityState === ConnectivityState.SHUTDOWN) {
            throw new Error('Channel has been shut down');
        }
        const callNumber = getNewCallNumber();
        logging_1.trace(constants_1.LogVerbosity.DEBUG, 'channel', uri_parser_1.uriToString(this.target) +
            ' createCall [' +
            callNumber +
            '] method="' +
            method +
            '", deadline=' +
            deadline);
        const finalOptions = {
            deadline: deadline,
            flags: propagateFlags !== null && propagateFlags !== void 0 ? propagateFlags : constants_1.Propagate.DEFAULTS,
            host: host !== null && host !== void 0 ? host : this.defaultAuthority,
            parentCall: parentCall,
        };
        const stream = new call_stream_1.Http2CallStream(method, this, finalOptions, this.filterStackFactory, this.credentials._getCallCredentials(), callNumber);
        return stream;
    }
}
exports.ChannelImplementation = ChannelImplementation;
//# sourceMappingURL=channel.js.map