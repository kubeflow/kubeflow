import { PromiseHandlers } from '../Provider';
export declare type Event = {
    eventId: string;
    name: string;
    attributes: string;
    metrics: string;
    session: object;
    immediate: boolean;
};
export declare type EventConfig = {
    appId: string;
    endpointId: string;
    region: string;
    resendLimit: number;
};
export declare type EventParams = {
    event: Event;
    timestamp: string;
    config: EventConfig;
    credentials: object;
    resendLimit: number;
};
export declare type EventObject = {
    params: EventParams;
    handlers: PromiseHandlers;
};
export declare type EventMap = {
    [key: string]: EventObject;
};
export declare type EventBuffer = Array<EventMap>;
export declare type EndpointBuffer = Array<EventObject>;
export declare type PutEventsResponse = {
    EventsResponse: {
        Results?: {
            [endpointId: string]: {
                EventsItemResponse?: {
                    [eventId: string]: {
                        StatusCode?: number;
                        Message?: string;
                    };
                };
            };
        };
    };
};
export declare type EndpointFailureData = {
    err: any;
    update_params: any;
    endpointObject: EventObject;
};
