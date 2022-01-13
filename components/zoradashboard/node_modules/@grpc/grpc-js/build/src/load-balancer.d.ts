import { ChannelOptions } from './channel-options';
import { Subchannel, SubchannelAddress } from './subchannel';
import { ConnectivityState } from './channel';
import { Picker } from './picker';
/**
 * A collection of functions associated with a channel that a load balancer
 * can call as necessary.
 */
export interface ChannelControlHelper {
    /**
     * Returns a subchannel connected to the specified address.
     * @param subchannelAddress The address to connect to
     * @param subchannelArgs Extra channel arguments specified by the load balancer
     */
    createSubchannel(subchannelAddress: SubchannelAddress, subchannelArgs: ChannelOptions): Subchannel;
    /**
     * Passes a new subchannel picker up to the channel. This is called if either
     * the connectivity state changes or if a different picker is needed for any
     * other reason.
     * @param connectivityState New connectivity state
     * @param picker New picker
     */
    updateState(connectivityState: ConnectivityState, picker: Picker): void;
    /**
     * Request new data from the resolver.
     */
    requestReresolution(): void;
}
/**
 * Tracks one or more connected subchannels and determines which subchannel
 * each request should use.
 */
export interface LoadBalancer {
    /**
     * Gives the load balancer a new list of addresses to start connecting to.
     * The load balancer will start establishing connections with the new list,
     * but will continue using any existing connections until the new connections
     * are established
     * @param addressList The new list of addresses to connect to
     * @param lbConfig The load balancing config object from the service config,
     *     if one was provided
     */
    updateAddressList(addressList: SubchannelAddress[], lbConfig: LoadBalancingConfig, attributes: {
        [key: string]: unknown;
    }): void;
    /**
     * If the load balancer is currently in the IDLE state, start connecting.
     */
    exitIdle(): void;
    /**
     * If the load balancer is currently in the CONNECTING or TRANSIENT_FAILURE
     * state, reset the current connection backoff timeout to its base value and
     * transition to CONNECTING if in TRANSIENT_FAILURE.
     */
    resetBackoff(): void;
    /**
     * The load balancer unrefs all of its subchannels and stops calling methods
     * of its channel control helper.
     */
    destroy(): void;
    /**
     * Get the type name for this load balancer type. Must be constant across an
     * entire load balancer implementation class and must match the name that the
     * balancer implementation class was registered with.
     */
    getTypeName(): string;
}
export interface LoadBalancerConstructor {
    new (channelControlHelper: ChannelControlHelper): LoadBalancer;
}
export interface LoadBalancingConfig {
    getLoadBalancerName(): string;
    toJsonObject(): object;
}
export interface LoadBalancingConfigConstructor {
    new (...args: any): LoadBalancingConfig;
    createFromJson(obj: any): LoadBalancingConfig;
}
export declare function registerLoadBalancerType(typeName: string, loadBalancerType: LoadBalancerConstructor, loadBalancingConfigType: LoadBalancingConfigConstructor): void;
export declare function createLoadBalancer(config: LoadBalancingConfig, channelControlHelper: ChannelControlHelper): LoadBalancer | null;
export declare function isLoadBalancerNameRegistered(typeName: string): boolean;
export declare function getFirstUsableConfig(configs: LoadBalancingConfig[], defaultPickFirst?: true): LoadBalancingConfig;
export declare function validateLoadBalancingConfig(obj: any): LoadBalancingConfig;
export declare function registerAll(): void;
