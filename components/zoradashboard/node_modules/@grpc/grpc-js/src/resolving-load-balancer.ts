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
  ChannelControlHelper,
  LoadBalancer,
  getFirstUsableConfig,
  LoadBalancingConfig
} from './load-balancer';
import { ServiceConfig, validateServiceConfig } from './service-config';
import { ConnectivityState } from './channel';
import { ConfigSelector, createResolver, Resolver } from './resolver';
import { ServiceError } from './call';
import { Picker, UnavailablePicker, QueuePicker } from './picker';
import { BackoffTimeout } from './backoff-timeout';
import { Status } from './constants';
import { StatusObject } from './call-stream';
import { Metadata } from './metadata';
import * as logging from './logging';
import { LogVerbosity } from './constants';
import { SubchannelAddress } from './subchannel';
import { GrpcUri, uriToString } from './uri-parser';
import { ChildLoadBalancerHandler } from './load-balancer-child-handler';
import { ChannelOptions } from './channel-options';
import { PickFirstLoadBalancingConfig } from './load-balancer-pick-first';

const TRACER_NAME = 'resolving_load_balancer';

function trace(text: string): void {
  logging.trace(LogVerbosity.DEBUG, TRACER_NAME, text);
}

const DEFAULT_LOAD_BALANCER_NAME = 'pick_first';

function getDefaultConfigSelector(serviceConfig: ServiceConfig | null): ConfigSelector {
  return function defaultConfigSelector(methodName: string, metadata: Metadata) {
    const splitName = methodName.split('/').filter(x => x.length > 0);
    const service = splitName[0] ?? '';
    const method = splitName[1] ?? '';
    if (serviceConfig && serviceConfig.methodConfig) {
      for (const methodConfig of serviceConfig.methodConfig) {
        for (const name of methodConfig.name) {
          if (name.service === service && (name.method === undefined || name.method === method)) {
            return {
              methodConfig: methodConfig,
              pickInformation: {},
              status: Status.OK
            };
          }
        }
      }
    }
    return {
      methodConfig: {name: []},
      pickInformation: {},
      status: Status.OK
    };
  }
}

export interface ResolutionCallback {
  (configSelector: ConfigSelector): void;
}

export interface ResolutionFailureCallback {
  (status: StatusObject): void;
}

export class ResolvingLoadBalancer implements LoadBalancer {
  /**
   * The resolver class constructed for the target address.
   */
  private innerResolver: Resolver;

  private childLoadBalancer: ChildLoadBalancerHandler;
  private latestChildState: ConnectivityState = ConnectivityState.IDLE;
  private latestChildPicker: Picker = new QueuePicker(this);
  /**
   * This resolving load balancer's current connectivity state.
   */
  private currentState: ConnectivityState = ConnectivityState.IDLE;
  private readonly defaultServiceConfig: ServiceConfig;
  /**
   * The service config object from the last successful resolution, if
   * available. A value of null indicates that we have not yet received a valid
   * service config from the resolver.
   */
  private previousServiceConfig: ServiceConfig | null = null;

  /**
   * The backoff timer for handling name resolution failures.
   */
  private readonly backoffTimeout: BackoffTimeout;

  /**
   * Indicates whether we should attempt to resolve again after the backoff
   * timer runs out.
   */
  private continueResolving = false;

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
  constructor(
    private readonly target: GrpcUri,
    private readonly channelControlHelper: ChannelControlHelper,
    private readonly channelOptions: ChannelOptions,
    private readonly onSuccessfulResolution: ResolutionCallback,
    private readonly onFailedResolution: ResolutionFailureCallback
  ) {
    if (channelOptions['grpc.service_config']) {
      this.defaultServiceConfig = validateServiceConfig(
        JSON.parse(channelOptions['grpc.service_config']!)
      );
    } else {
      this.defaultServiceConfig = {
        loadBalancingConfig: [],
        methodConfig: [],
      };
    }
    this.updateState(ConnectivityState.IDLE, new QueuePicker(this));
    this.childLoadBalancer = new ChildLoadBalancerHandler({
      createSubchannel: channelControlHelper.createSubchannel.bind(
        channelControlHelper
      ),
      requestReresolution: () => {
        /* If the backoffTimeout is running, we're still backing off from
         * making resolve requests, so we shouldn't make another one here.
         * In that case, the backoff timer callback will call
         * updateResolution */
        if (this.backoffTimeout.isRunning()) {
          this.continueResolving = true;
        } else {
          this.updateResolution();
        }
      },
      updateState: (newState: ConnectivityState, picker: Picker) => {
        this.latestChildState = newState;
        this.latestChildPicker = picker;
        this.updateState(newState, picker);
      },
    });
    this.innerResolver = createResolver(
      target,
      {
        onSuccessfulResolution: (
          addressList: SubchannelAddress[],
          serviceConfig: ServiceConfig | null,
          serviceConfigError: ServiceError | null,
          configSelector: ConfigSelector | null,
          attributes: { [key: string]: unknown }
        ) => {
          let workingServiceConfig: ServiceConfig | null = null;
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
            } else {
              // Step 4
              if (this.previousServiceConfig === null) {
                // Step 4.ii
                this.handleResolutionFailure(serviceConfigError);
              } else {
                // Step 4.i
                workingServiceConfig = this.previousServiceConfig;
              }
            }
          } else {
            // Step 3
            workingServiceConfig = serviceConfig;
            this.previousServiceConfig = serviceConfig;
          }
          const workingConfigList =
            workingServiceConfig?.loadBalancingConfig ?? [];
          const loadBalancingConfig = getFirstUsableConfig(workingConfigList, true);
          if (loadBalancingConfig === null) {
            // There were load balancing configs but none are supported. This counts as a resolution failure
            this.handleResolutionFailure({
              code: Status.UNAVAILABLE,
              details:
                'All load balancer options in service config are not compatible',
              metadata: new Metadata(),
            });
            return;
          }
          this.childLoadBalancer.updateAddressList(
            addressList,
            loadBalancingConfig,
            attributes
          );
          const finalServiceConfig = workingServiceConfig ?? this.defaultServiceConfig;
          this.onSuccessfulResolution(configSelector ?? getDefaultConfigSelector(finalServiceConfig));
        },
        onError: (error: StatusObject) => {
          this.handleResolutionFailure(error);
        },
      },
      channelOptions
    );

    this.backoffTimeout = new BackoffTimeout(() => {
      if (this.continueResolving) {
        this.updateResolution();
        this.continueResolving = false;
      } else {
        this.updateState(this.latestChildState, this.latestChildPicker);
      }
    });
    this.backoffTimeout.unref();
  }

  private updateResolution() {
    this.innerResolver.updateResolution();
    if (this.currentState === ConnectivityState.IDLE) {
      this.updateState(ConnectivityState.CONNECTING, new QueuePicker(this));
    }
  }

  private updateState(connectivityState: ConnectivityState, picker: Picker) {
    trace(
      uriToString(this.target) +
        ' ' +
        ConnectivityState[this.currentState] +
        ' -> ' +
        ConnectivityState[connectivityState]
    );
    // Ensure that this.exitIdle() is called by the picker
    if (connectivityState === ConnectivityState.IDLE) {
      picker = new QueuePicker(this);
    }
    this.currentState = connectivityState;
    this.channelControlHelper.updateState(connectivityState, picker);
  }

  private handleResolutionFailure(error: StatusObject) {
    if (this.latestChildState === ConnectivityState.IDLE) {
      this.updateState(
        ConnectivityState.TRANSIENT_FAILURE,
        new UnavailablePicker(error)
      );
      this.onFailedResolution(error);
    }
    this.backoffTimeout.runOnce();
  }

  exitIdle() {
    this.childLoadBalancer.exitIdle();
    if (this.currentState === ConnectivityState.IDLE) {
      if (this.backoffTimeout.isRunning()) {
        this.continueResolving = true;
      } else {
        this.updateResolution();
      }
      this.updateState(ConnectivityState.CONNECTING, new QueuePicker(this));
    }
  }

  updateAddressList(
    addressList: SubchannelAddress[],
    lbConfig: LoadBalancingConfig | null
  ) {
    throw new Error('updateAddressList not supported on ResolvingLoadBalancer');
  }

  resetBackoff() {
    this.backoffTimeout.reset();
    this.childLoadBalancer.resetBackoff();
  }

  destroy() {
    this.childLoadBalancer.destroy();
    this.innerResolver.destroy();
    this.updateState(ConnectivityState.SHUTDOWN, new UnavailablePicker());
  }

  getTypeName() {
    return 'resolving_load_balancer';
  }
}
