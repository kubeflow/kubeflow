import { PromiseHandlers } from '../Provider';

export type Event = {
	eventId: string;
	name: string;
	attributes: string;
	metrics: string;
	session: object;
	immediate: boolean;
};

export type EventConfig = {
	appId: string;
	endpointId: string;
	region: string;
	resendLimit: number;
};

export type EventParams = {
	event: Event;
	timestamp: string;
	config: EventConfig;
	credentials: object;
	resendLimit: number;
};

export type EventObject = {
	params: EventParams;
	handlers: PromiseHandlers;
};

export type EventMap = {
	[key: string]: EventObject;
};

export type EventBuffer = Array<EventMap>;
export type EndpointBuffer = Array<EventObject>;

export type PutEventsResponse = {
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

export type EndpointFailureData = {
	err: any;
	update_params: any;
	endpointObject: EventObject;
};
