import { Subchannel } from './subchannel';
import { StatusObject } from './call-stream';
import { Metadata } from './metadata';
import { LoadBalancer } from './load-balancer';
import { FilterFactory, Filter } from './filter';
export declare enum PickResultType {
    COMPLETE = 0,
    QUEUE = 1,
    TRANSIENT_FAILURE = 2,
    DROP = 3
}
export interface PickResult {
    pickResultType: PickResultType;
    /**
     * The subchannel to use as the transport for the call. Only meaningful if
     * `pickResultType` is COMPLETE. If null, indicates that the call should be
     * dropped.
     */
    subchannel: Subchannel | null;
    /**
     * The status object to end the call with. Populated if and only if
     * `pickResultType` is TRANSIENT_FAILURE.
     */
    status: StatusObject | null;
    /**
     * Extra FilterFactory (can be multiple encapsulated in a FilterStackFactory)
     * provided by the load balancer to be used with the call. For technical
     * reasons filters from this factory will not see sendMetadata events.
     */
    extraFilterFactory: FilterFactory<Filter> | null;
    onCallStarted: (() => void) | null;
}
export interface CompletePickResult extends PickResult {
    pickResultType: PickResultType.COMPLETE;
    subchannel: Subchannel | null;
    status: null;
    extraFilterFactory: FilterFactory<Filter> | null;
    onCallStarted: (() => void) | null;
}
export interface QueuePickResult extends PickResult {
    pickResultType: PickResultType.QUEUE;
    subchannel: null;
    status: null;
    extraFilterFactory: null;
    onCallStarted: null;
}
export interface TransientFailurePickResult extends PickResult {
    pickResultType: PickResultType.TRANSIENT_FAILURE;
    subchannel: null;
    status: StatusObject;
    extraFilterFactory: null;
    onCallStarted: null;
}
export interface DropCallPickResult extends PickResult {
    pickResultType: PickResultType.DROP;
    subchannel: null;
    status: StatusObject;
    extraFilterFactory: null;
    onCallStarted: null;
}
export interface PickArgs {
    metadata: Metadata;
    extraPickInfo: {
        [key: string]: string;
    };
}
/**
 * A proxy object representing the momentary state of a load balancer. Picks
 * subchannels or returns other information based on that state. Should be
 * replaced every time the load balancer changes state.
 */
export interface Picker {
    pick(pickArgs: PickArgs): PickResult;
}
/**
 * A standard picker representing a load balancer in the TRANSIENT_FAILURE
 * state. Always responds to every pick request with an UNAVAILABLE status.
 */
export declare class UnavailablePicker implements Picker {
    private status;
    constructor(status?: StatusObject);
    pick(pickArgs: PickArgs): TransientFailurePickResult;
}
/**
 * A standard picker representing a load balancer in the IDLE or CONNECTING
 * state. Always responds to every pick request with a QUEUE pick result
 * indicating that the pick should be tried again with the next `Picker`. Also
 * reports back to the load balancer that a connection should be established
 * once any pick is attempted.
 */
export declare class QueuePicker {
    private loadBalancer;
    private calledExitIdle;
    constructor(loadBalancer: LoadBalancer);
    pick(pickArgs: PickArgs): QueuePickResult;
}
