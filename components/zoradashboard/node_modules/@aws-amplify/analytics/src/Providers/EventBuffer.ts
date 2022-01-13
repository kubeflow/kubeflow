import { ConsoleLogger as Logger } from '@aws-amplify/core';

import {
	PutEventsResponse,
	EventBuffer,
	EventObject,
	EventMap,
} from '../types';
import {
	PutEventsCommand,
	PutEventsCommandOutput,
} from '@aws-sdk/client-pinpoint';
import { isAppInForeground } from '../utils/AppUtils';

const logger = new Logger('EventsBuffer');
const RETRYABLE_CODES = [429, 500];
const ACCEPTED_CODES = [202];

type EventsBufferConfig = {
	bufferSize: number;
	flushSize: number;
	flushInterval: number;
	resendLimit: number;
};

export default class EventsBuffer {
	private _config;
	private _client;
	private _interval;
	private _buffer: EventBuffer;
	private _pause = false;
	private _flush = false;

	constructor(client, config: EventsBufferConfig) {
		logger.debug('Instantiating buffer with config:', config);
		this._buffer = [];
		this._client = client;
		this._config = config;

		this._sendBatch = this._sendBatch.bind(this);

		this._startLoop();
	}

	public push(event: EventObject) {
		if (this._buffer > this._config.bufferSize) {
			logger.debug('Exceeded analytics events buffer size');
			return event.handlers.reject(
				new Error('Exceeded the size of analytics events buffer')
			);
		}

		const { eventId } = event.params.event;
		const bufferElement = { [eventId]: event };
		this._buffer.push(bufferElement);
	}

	public pause() {
		this._pause = true;
	}

	public resume() {
		this._pause = false;
	}

	public updateClient(client) {
		this._client = client;
	}

	public flush() {
		this._flush = true;
	}

	private _startLoop() {
		if (this._interval) {
			clearInterval(this._interval);
		}

		const { flushInterval } = this._config;

		this._interval = setInterval(this._sendBatch, flushInterval);
	}

	private _sendBatch() {
		const bufferLength = this._buffer.length;

		if (this._flush && !bufferLength) {
			clearInterval(this._interval);
		}

		// Do not send the batch of events if
		// the Buffer is paused or is empty or the App is not in the foreground
		// Apps should be in the foreground since
		// the OS may restrict access to the network in the background
		if (this._pause || !bufferLength || !isAppInForeground()) {
			return;
		}

		const { flushSize } = this._config;

		const batchSize = Math.min(flushSize, bufferLength);
		const bufferSubset = this._buffer.splice(0, batchSize);

		this._putEvents(bufferSubset);
	}

	private async _putEvents(buffer: EventBuffer) {
		const eventMap: EventMap = this._bufferToMap(buffer);
		const batchEventParams = this._generateBatchEventParams(eventMap);

		try {
			const command: PutEventsCommand = new PutEventsCommand(batchEventParams);
			const data: PutEventsCommandOutput = await this._client.send(command);
			this._processPutEventsSuccessResponse(data, eventMap);
		} catch (err) {
			return this._handlePutEventsFailure(err, eventMap);
		}
	}

	private _generateBatchEventParams(eventMap: EventMap) {
		const batchEventParams = {
			ApplicationId: '',
			EventsRequest: {
				BatchItem: {},
			},
		};

		Object.values(eventMap).forEach(item => {
			const { params } = item;
			const { event, timestamp, config } = params;
			const { name, attributes, metrics, eventId, session } = event;
			const { appId, endpointId } = config;

			const batchItem = batchEventParams.EventsRequest.BatchItem;

			batchEventParams.ApplicationId = batchEventParams.ApplicationId || appId;

			if (!batchItem[endpointId]) {
				batchItem[endpointId] = {
					Endpoint: {},
					Events: {},
				};
			}

			batchItem[endpointId].Events[eventId] = {
				EventType: name,
				Timestamp: new Date(timestamp).toISOString(),
				Attributes: attributes,
				Metrics: metrics,
				Session: session,
			};
		});

		return batchEventParams;
	}

	private _handlePutEventsFailure(err, eventMap: EventMap) {
		logger.debug('_putEvents Failed: ', err);
		const statusCode = err.$metadata && err.$metadata.httpStatusCode;

		if (RETRYABLE_CODES.includes(statusCode)) {
			const retryableEvents = Object.values(eventMap);
			this._retry(retryableEvents);
			return;
		}
	}

	private _processPutEventsSuccessResponse(
		data: PutEventsResponse,
		eventMap: EventMap
	) {
		const { Results } = data.EventsResponse;
		const retryableEvents: EventObject[] = [];

		Object.entries(Results).forEach(([endpointId, endpointValues]) => {
			const responses = endpointValues.EventsItemResponse;

			Object.entries(responses).forEach(
				([eventId, { StatusCode, Message }]) => {
					const eventObject = eventMap[eventId];

					// manually crafting handlers response to keep API consistant
					const response = {
						EventsResponse: {
							Results: {
								[endpointId]: {
									EventsItemResponse: {
										[eventId]: { StatusCode, Message },
									},
								},
							},
						},
					};

					if (ACCEPTED_CODES.includes(StatusCode)) {
						eventObject.handlers.resolve(response);
						return;
					}

					if (RETRYABLE_CODES.includes(StatusCode)) {
						retryableEvents.push(eventObject);
						return;
					}

					const { name } = eventObject.params.event;

					logger.error(
						`event ${eventId} : ${name} failed with error: ${Message}`
					);
					return eventObject.handlers.reject(response);
				}
			);
		});

		if (retryableEvents.length) {
			this._retry(retryableEvents);
		}
	}

	private _retry(retryableEvents: EventObject[]) {
		// retryable events that haven't reached the resendLimit
		const eligibleEvents: EventBuffer = [];

		retryableEvents.forEach((event: EventObject) => {
			const { params } = event;
			const { eventId, name } = params.event;

			if (params.resendLimit-- > 0) {
				logger.debug(
					`resending event ${eventId} : ${name} with ${params.resendLimit} retry attempts remaining`
				);
				eligibleEvents.push({ [eventId]: event });
				return;
			}

			logger.debug(
				`no retry attempts remaining for event ${eventId} : ${name}`
			);
		});

		// add the events to the front of the buffer
		this._buffer.unshift(...eligibleEvents);
	}

	// convert buffer to map, i.e. { eventId1: { params, handler }, eventId2: { params, handlers } }
	// this allows us to easily access the handlers after receiving a batch response
	private _bufferToMap(buffer: EventBuffer) {
		return buffer.reduce((acc, curVal) => {
			const [[key, value]] = Object.entries(curVal);
			acc[key] = value;
			return acc;
		}, {});
	}
}
