import { LoadBalancerConstructor, LoadBalancingConfigConstructor, LoadBalancingConfig, ChannelControlHelper, LoadBalancer } from './load-balancer';
export declare function registerLoadBalancerType(typeName: string, loadBalancerType: LoadBalancerConstructor, loadBalancingConfigType: LoadBalancingConfigConstructor): void;
export declare function registerDefaultLoadBalancerType(typeName: string): void;
export declare function createLoadBalancer(config: LoadBalancingConfig, channelControlHelper: ChannelControlHelper): LoadBalancer | null;
export declare function isLoadBalancerNameRegistered(typeName: string): boolean;
export declare function getFirstUsableConfig(configs: LoadBalancingConfig[], fallbackTodefault?: true): LoadBalancingConfig;
export declare function validateLoadBalancingConfig(obj: any): LoadBalancingConfig;
