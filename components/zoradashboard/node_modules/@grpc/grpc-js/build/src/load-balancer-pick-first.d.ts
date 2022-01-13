import { LoadBalancer, ChannelControlHelper, LoadBalancingConfig } from './load-balancer';
import { SubchannelAddress } from './subchannel';
export declare class PickFirstLoadBalancingConfig implements LoadBalancingConfig {
    getLoadBalancerName(): string;
    constructor();
    toJsonObject(): object;
    static createFromJson(obj: any): PickFirstLoadBalancingConfig;
}
export declare class PickFirstLoadBalancer implements LoadBalancer {
    private readonly channelControlHelper;
    /**
     * The list of backend addresses most recently passed to `updateAddressList`.
     */
    private latestAddressList;
    /**
     * The list of subchannels this load balancer is currently attempting to
     * connect to.
     */
    private subchannels;
    /**
     * The current connectivity state of the load balancer.
     */
    private currentState;
    /**
     * The index within the `subchannels` array of the subchannel with the most
     * recently started connection attempt.
     */
    private currentSubchannelIndex;
    private subchannelStateCounts;
    /**
     * The currently picked subchannel used for making calls. Populated if
     * and only if the load balancer's current state is READY. In that case,
     * the subchannel's current state is also READY.
     */
    private currentPick;
    /**
     * Listener callback attached to each subchannel in the `subchannels` list
     * while establishing a connection.
     */
    private subchannelStateListener;
    /**
     * Listener callback attached to the current picked subchannel.
     */
    private pickedSubchannelStateListener;
    /**
     * Timer reference for the timer tracking when to start
     */
    private connectionDelayTimeout;
    private triedAllSubchannels;
    /**
     * Load balancer that attempts to connect to each backend in the address list
     * in order, and picks the first one that connects, using it for every
     * request.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     */
    constructor(channelControlHelper: ChannelControlHelper);
    private startNextSubchannelConnecting;
    /**
     * Have a single subchannel in the `subchannels` list start connecting.
     * @param subchannelIndex The index into the `subchannels` list.
     */
    private startConnecting;
    private pickSubchannel;
    private updateState;
    private resetSubchannelList;
    /**
     * Start connecting to the address list most recently passed to
     * `updateAddressList`.
     */
    private connectToAddressList;
    updateAddressList(addressList: SubchannelAddress[], lbConfig: LoadBalancingConfig): void;
    exitIdle(): void;
    resetBackoff(): void;
    destroy(): void;
    getTypeName(): string;
}
export declare function setup(): void;
