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
  Deadline,
  Call,
  Http2CallStream,
  CallStreamOptions,
} from './call-stream';
import { ChannelCredentials } from './channel-credentials';
import { ChannelOptions } from './channel-options';
import { ResolvingLoadBalancer } from './resolving-load-balancer';
import { SubchannelPool, getSubchannelPool } from './subchannel-pool';
import { ChannelControlHelper } from './load-balancer';
import { UnavailablePicker, Picker, PickResultType } from './picker';
import { Metadata } from './metadata';
import { Status, LogVerbosity, Propagate } from './constants';
import { FilterStackFactory } from './filter-stack';
import { CallCredentialsFilterFactory } from './call-credentials-filter';
import { DeadlineFilterFactory } from './deadline-filter';
import { CompressionFilterFactory } from './compression-filter';
import { CallConfig, ConfigSelector, getDefaultAuthority, mapUriDefaultScheme } from './resolver';
import { trace, log } from './logging';
import { SubchannelAddress } from './subchannel';
import { MaxMessageSizeFilterFactory } from './max-message-size-filter';
import { mapProxyName } from './http_proxy';
import { GrpcUri, parseUri, uriToString } from './uri-parser';
import { ServerSurfaceCall } from './server-call';
import { SurfaceCall } from './call';

export enum ConnectivityState {
  IDLE,
  CONNECTING,
  READY,
  TRANSIENT_FAILURE,
  SHUTDOWN,
}

/**
 * See https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_args
 */
const MAX_TIMEOUT_TIME = 2147483647;

let nextCallNumber = 0;

function getNewCallNumber(): number {
  const callNumber = nextCallNumber;
  nextCallNumber += 1;
  if (nextCallNumber >= Number.MAX_SAFE_INTEGER) {
    nextCallNumber = 0;
  }
  return callNumber;
}

/**
 * An interface that represents a communication channel to a server specified
 * by a given address.
 */
export interface Channel {
  /**
   * Close the channel. This has the same functionality as the existing
   * grpc.Client.prototype.close
   */
  close(): void;
  /**
   * Return the target that this channel connects to
   */
  getTarget(): string;
  /**
   * Get the channel's current connectivity state. This method is here mainly
   * because it is in the existing internal Channel class, and there isn't
   * another good place to put it.
   * @param tryToConnect If true, the channel will start connecting if it is
   *     idle. Otherwise, idle channels will only start connecting when a
   *     call starts.
   */
  getConnectivityState(tryToConnect: boolean): ConnectivityState;
  /**
   * Watch for connectivity state changes. This is also here mainly because
   * it is in the existing external Channel class.
   * @param currentState The state to watch for transitions from. This should
   *     always be populated by calling getConnectivityState immediately
   *     before.
   * @param deadline A deadline for waiting for a state change
   * @param callback Called with no error when a state change, or with an
   *     error if the deadline passes without a state change.
   */
  watchConnectivityState(
    currentState: ConnectivityState,
    deadline: Date | number,
    callback: (error?: Error) => void
  ): void;
  /**
   * Create a call object. Call is an opaque type that is used by the Client
   * class. This function is called by the gRPC library when starting a
   * request. Implementers should return an instance of Call that is returned
   * from calling createCall on an instance of the provided Channel class.
   * @param method The full method string to request.
   * @param deadline The call deadline
   * @param host A host string override for making the request
   * @param parentCall A server call to propagate some information from
   * @param propagateFlags A bitwise combination of elements of grpc.propagate
   *     that indicates what information to propagate from parentCall.
   */
  createCall(
    method: string,
    deadline: Deadline,
    host: string | null | undefined,
    parentCall: ServerSurfaceCall | null,
    propagateFlags: number | null | undefined
  ): Call;
}

interface ConnectivityStateWatcher {
  currentState: ConnectivityState;
  timer: NodeJS.Timeout | null;
  callback: (error?: Error) => void;
}

export class ChannelImplementation implements Channel {
  private resolvingLoadBalancer: ResolvingLoadBalancer;
  private subchannelPool: SubchannelPool;
  private connectivityState: ConnectivityState = ConnectivityState.IDLE;
  private currentPicker: Picker = new UnavailablePicker();
  /**
   * Calls queued up to get a call config. Should only be populated before the
   * first time the resolver returns a result, which includes the ConfigSelector.
   */
  private configSelectionQueue: Array<{
    callStream: Http2CallStream;
    callMetadata: Metadata;
  }> = [];
  private pickQueue: Array<{
    callStream: Http2CallStream;
    callMetadata: Metadata;
    callConfig: CallConfig;
  }> = [];
  private connectivityStateWatchers: ConnectivityStateWatcher[] = [];
  private defaultAuthority: string;
  private filterStackFactory: FilterStackFactory;
  private target: GrpcUri;
  /**
   * This timer does not do anything on its own. Its purpose is to hold the
   * event loop open while there are any pending calls for the channel that
   * have not yet been assigned to specific subchannels. In other words,
   * the invariant is that callRefTimer is reffed if and only if pickQueue
   * is non-empty.
   */
  private callRefTimer: NodeJS.Timer;
  private configSelector: ConfigSelector | null = null;
  constructor(
    target: string,
    private readonly credentials: ChannelCredentials,
    private readonly options: ChannelOptions
  ) {
    if (typeof target !== 'string') {
      throw new TypeError('Channel target must be a string');
    }
    if (!(credentials instanceof ChannelCredentials)) {
      throw new TypeError(
        'Channel credentials must be a ChannelCredentials object'
      );
    }
    if (options) {
      if (
        typeof options !== 'object' ||
        !Object.values(options).every(
          (value) =>
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'undefined'
        )
      ) {
        throw new TypeError(
          'Channel options must be an object with string or number values'
        );
      }
    }
    const originalTargetUri = parseUri(target);
    if (originalTargetUri === null) {
      throw new Error(`Could not parse target name "${target}"`);
    }
    /* This ensures that the target has a scheme that is registered with the
     * resolver */
    const defaultSchemeMapResult = mapUriDefaultScheme(originalTargetUri);
    if (defaultSchemeMapResult === null) {
      throw new Error(
        `Could not find a default scheme for target name "${target}"`
      );
    }

    this.callRefTimer = setInterval(() => {}, MAX_TIMEOUT_TIME);
    this.callRefTimer.unref?.();

    if (this.options['grpc.default_authority']) {
      this.defaultAuthority = this.options['grpc.default_authority'] as string;
    } else {
      this.defaultAuthority = getDefaultAuthority(defaultSchemeMapResult);
    }
    const proxyMapResult = mapProxyName(defaultSchemeMapResult, options);
    this.target = proxyMapResult.target;
    this.options = Object.assign({}, this.options, proxyMapResult.extraOptions);

    /* The global boolean parameter to getSubchannelPool has the inverse meaning to what
     * the grpc.use_local_subchannel_pool channel option means. */
    this.subchannelPool = getSubchannelPool(
      (options['grpc.use_local_subchannel_pool'] ?? 0) === 0
    );
    const channelControlHelper: ChannelControlHelper = {
      createSubchannel: (
        subchannelAddress: SubchannelAddress,
        subchannelArgs: ChannelOptions
      ) => {
        return this.subchannelPool.getOrCreateSubchannel(
          this.target,
          subchannelAddress,
          Object.assign({}, this.options, subchannelArgs),
          this.credentials
        );
      },
      updateState: (connectivityState: ConnectivityState, picker: Picker) => {
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
        throw new Error(
          'Resolving load balancer should never call requestReresolution'
        );
      },
    };
    this.resolvingLoadBalancer = new ResolvingLoadBalancer(
      this.target,
      channelControlHelper,
      options,
      (configSelector) => {
        this.configSelector = configSelector;
        /* We process the queue asynchronously to ensure that the corresponding
         * load balancer update has completed. */
        process.nextTick(() => {
          const localQueue = this.configSelectionQueue;
          this.configSelectionQueue = [];
          this.callRefTimerUnref()
          for (const {callStream, callMetadata} of localQueue) {
            this.tryGetConfig(callStream, callMetadata);
          }
          this.configSelectionQueue = [];
        });
      },
      (status) => {
        if (this.configSelectionQueue.length > 0) {
          trace(LogVerbosity.DEBUG, 'channel', 'Name resolution failed for target ' + uriToString(this.target) + ' with calls queued for config selection');
        }
        const localQueue = this.configSelectionQueue;
        this.configSelectionQueue = [];
        this.callRefTimerUnref();
        for (const {callStream, callMetadata} of localQueue) {
          if (callMetadata.getOptions().waitForReady) {
            this.callRefTimerRef();
            this.configSelectionQueue.push({callStream, callMetadata});
          } else {
            callStream.cancelWithStatus(status.code, status.details);
          }
        }
      }
    );
    this.filterStackFactory = new FilterStackFactory([
      new CallCredentialsFilterFactory(this),
      new DeadlineFilterFactory(this),
      new MaxMessageSizeFilterFactory(this.options),
      new CompressionFilterFactory(this),
    ]);
  }

  private callRefTimerRef() {
    // If the hasRef function does not exist, always run the code
    if (!this.callRefTimer.hasRef?.()) {
      trace(LogVerbosity.DEBUG, 'channel', 'callRefTimer.ref | configSelectionQueue.length=' + this.configSelectionQueue.length + ' pickQueue.length=' + this.pickQueue.length);
      this.callRefTimer.ref?.();
    }
  }

  private callRefTimerUnref() {
    // If the hasRef function does not exist, always run the code
    if ((!this.callRefTimer.hasRef) || (this.callRefTimer.hasRef())) {
      trace(LogVerbosity.DEBUG, 'channel', 'callRefTimer.unref | configSelectionQueue.length=' + this.configSelectionQueue.length + ' pickQueue.length=' + this.pickQueue.length);
      this.callRefTimer.unref?.();
    }
  }

  private pushPick(callStream: Http2CallStream, callMetadata: Metadata, callConfig: CallConfig) {
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
  private tryPick(callStream: Http2CallStream, callMetadata: Metadata, callConfig: CallConfig) {
    const pickResult = this.currentPicker.pick({ metadata: callMetadata, extraPickInfo: callConfig.pickInformation });
    trace(
      LogVerbosity.DEBUG,
      'channel',
      'Pick result: ' +
        PickResultType[pickResult.pickResultType] +
        ' subchannel: ' +
        pickResult.subchannel?.getAddress() +
        ' status: ' +
        pickResult.status?.code +
        ' ' +
        pickResult.status?.details
    );
    switch (pickResult.pickResultType) {
      case PickResultType.COMPLETE:
        if (pickResult.subchannel === null) {
          callStream.cancelWithStatus(
            Status.UNAVAILABLE,
            'Request dropped by load balancing policy'
          );
          // End the call with an error
        } else {
          /* If the subchannel is not in the READY state, that indicates a bug
           * somewhere in the load balancer or picker. So, we log an error and
           * queue the pick to be tried again later. */
          if (
            pickResult.subchannel!.getConnectivityState() !==
            ConnectivityState.READY
          ) {
            log(
              LogVerbosity.ERROR,
              'Error: COMPLETE pick result subchannel ' +
                pickResult.subchannel!.getAddress() +
                ' has state ' +
                ConnectivityState[pickResult.subchannel!.getConnectivityState()]
            );
            this.pushPick(callStream, callMetadata, callConfig);
            break;
          }
          /* We need to clone the callMetadata here because the transparent
           * retry code in the promise resolution handler use the same
           * callMetadata object, so it needs to stay unmodified */
          callStream.filterStack
            .sendMetadata(Promise.resolve(callMetadata.clone()))
            .then(
              (finalMetadata) => {
                const subchannelState: ConnectivityState = pickResult.subchannel!.getConnectivityState();
                if (subchannelState === ConnectivityState.READY) {
                  try {
                    pickResult.subchannel!.startCallStream(
                      finalMetadata,
                      callStream,
                      pickResult.extraFilterFactory ?? undefined
                    );
                    /* If we reach this point, the call stream has started
                     * successfully */
                    callConfig.onCommitted?.();
                    pickResult.onCallStarted?.();
                  } catch (error) {
                    if (
                      (error as NodeJS.ErrnoException).code ===
                      'ERR_HTTP2_GOAWAY_SESSION'
                    ) {
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
                      trace(
                        LogVerbosity.INFO,
                        'channel',
                        'Failed to start call on picked subchannel ' +
                          pickResult.subchannel!.getAddress() +
                          ' with error ' +
                          (error as Error).message +
                          '. Retrying pick'
                      );
                      this.tryPick(callStream, callMetadata, callConfig);
                    } else {
                      trace(
                        LogVerbosity.INFO,
                        'channel',
                        'Failed to start call on picked subchanel ' +
                          pickResult.subchannel!.getAddress() +
                          ' with error ' +
                          (error as Error).message +
                          '. Ending call'
                      );
                      callStream.cancelWithStatus(
                        Status.INTERNAL,
                        `Failed to start HTTP/2 stream with error: ${(error as Error).message}`
                      );
                    }
                  }
                } else {
                  /* The logic for doing this here is the same as in the catch
                   * block above */
                  trace(
                    LogVerbosity.INFO,
                    'channel',
                    'Picked subchannel ' +
                      pickResult.subchannel!.getAddress() +
                      ' has state ' +
                      ConnectivityState[subchannelState] +
                      ' after metadata filters. Retrying pick'
                  );
                  this.tryPick(callStream, callMetadata, callConfig);
                }
              },
              (error: Error & { code: number }) => {
                // We assume the error code isn't 0 (Status.OK)
                callStream.cancelWithStatus(
                  (typeof error.code === 'number') ? error.code : Status.UNKNOWN,
                  `Getting metadata from plugin failed with error: ${error.message}`
                );
              }
            );
        }
        break;
      case PickResultType.QUEUE:
        this.pushPick(callStream, callMetadata, callConfig);
        break;
      case PickResultType.TRANSIENT_FAILURE:
        if (callMetadata.getOptions().waitForReady) {
          this.pushPick(callStream, callMetadata, callConfig);
        } else {
          callStream.cancelWithStatus(
            pickResult.status!.code,
            pickResult.status!.details
          );
        }
        break;
      case PickResultType.DROP:
        callStream.cancelWithStatus(
          pickResult.status!.code,
          pickResult.status!.details
        );
        break;
      default:
        throw new Error(
          `Invalid state: unknown pickResultType ${pickResult.pickResultType}`
        );
    }
  }

  private removeConnectivityStateWatcher(
    watcherObject: ConnectivityStateWatcher
  ) {
    const watcherIndex = this.connectivityStateWatchers.findIndex(
      (value) => value === watcherObject
    );
    if (watcherIndex >= 0) {
      this.connectivityStateWatchers.splice(watcherIndex, 1);
    }
  }

  private updateState(newState: ConnectivityState): void {
    trace(
      LogVerbosity.DEBUG,
      'connectivity_state',
      uriToString(this.target) +
        ' ' +
        ConnectivityState[this.connectivityState] +
        ' -> ' +
        ConnectivityState[newState]
    );
    this.connectivityState = newState;
    const watchersCopy = this.connectivityStateWatchers.slice();
    for (const watcherObject of watchersCopy) {
      if (newState !== watcherObject.currentState) {
        if(watcherObject.timer) {
          clearTimeout(watcherObject.timer);
        }
        this.removeConnectivityStateWatcher(watcherObject);
        watcherObject.callback();
      }
    }
  }

  private tryGetConfig(stream: Http2CallStream, metadata: Metadata) {
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
    } else {
      const callConfig = this.configSelector(stream.getMethod(), metadata);
      if (callConfig.status === Status.OK) {
        this.tryPick(stream, metadata, callConfig);
      } else {
        stream.cancelWithStatus(callConfig.status, "Failed to route call to method " + stream.getMethod());
      }
    }
  }

  _startCallStream(stream: Http2CallStream, metadata: Metadata) {
    this.tryGetConfig(stream, metadata.clone());
  }

  close() {
    this.resolvingLoadBalancer.destroy();
    this.updateState(ConnectivityState.SHUTDOWN);
    clearInterval(this.callRefTimer);

    this.subchannelPool.unrefUnusedSubchannels();
  }

  getTarget() {
    return uriToString(this.target);
  }

  getConnectivityState(tryToConnect: boolean) {
    const connectivityState = this.connectivityState;
    if (tryToConnect) {
      this.resolvingLoadBalancer.exitIdle();
    }
    return connectivityState;
  }

  watchConnectivityState(
    currentState: ConnectivityState,
    deadline: Date | number,
    callback: (error?: Error) => void
  ): void {
    if (this.connectivityState === ConnectivityState.SHUTDOWN) {
      throw new Error('Channel has been shut down');
    }
    let timer = null;
    if(deadline !== Infinity) {
      const deadlineDate: Date =
        deadline instanceof Date ? deadline : new Date(deadline);
      const now = new Date();
      if (deadline === -Infinity || deadlineDate <= now) {
        process.nextTick(
          callback,
          new Error('Deadline passed without connectivity state change')
        );
        return;
      }
      timer = setTimeout(() => {
        this.removeConnectivityStateWatcher(watcherObject);
        callback(
          new Error('Deadline passed without connectivity state change')
        );
      }, deadlineDate.getTime() - now.getTime())
    }
    const watcherObject = {
      currentState,
      callback,
      timer
    };
    this.connectivityStateWatchers.push(watcherObject);
  }

  createCall(
    method: string,
    deadline: Deadline,
    host: string | null | undefined,
    parentCall: ServerSurfaceCall | null,
    propagateFlags: number | null | undefined
  ): Call {
    if (typeof method !== 'string') {
      throw new TypeError('Channel#createCall: method must be a string');
    }
    if (!(typeof deadline === 'number' || deadline instanceof Date)) {
      throw new TypeError(
        'Channel#createCall: deadline must be a number or Date'
      );
    }
    if (this.connectivityState === ConnectivityState.SHUTDOWN) {
      throw new Error('Channel has been shut down');
    }
    const callNumber = getNewCallNumber();
    trace(
      LogVerbosity.DEBUG,
      'channel',
      uriToString(this.target) +
        ' createCall [' +
        callNumber +
        '] method="' +
        method +
        '", deadline=' +
        deadline
    );
    const finalOptions: CallStreamOptions = {
      deadline: deadline,
      flags: propagateFlags ?? Propagate.DEFAULTS,
      host: host ?? this.defaultAuthority,
      parentCall: parentCall,
    };
    const stream: Http2CallStream = new Http2CallStream(
      method,
      this,
      finalOptions,
      this.filterStackFactory,
      this.credentials._getCallCredentials(),
      callNumber
    );
    return stream;
  }
}
