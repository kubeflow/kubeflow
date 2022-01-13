import { EventObject } from '../types';
declare type EventsBufferConfig = {
    bufferSize: number;
    flushSize: number;
    flushInterval: number;
    resendLimit: number;
};
export default class EventsBuffer {
    private _config;
    private _client;
    private _interval;
    private _buffer;
    private _pause;
    private _flush;
    constructor(client: any, config: EventsBufferConfig);
    push(event: EventObject): any;
    pause(): void;
    resume(): void;
    updateClient(client: any): void;
    flush(): void;
    private _startLoop;
    private _sendBatch;
    private _putEvents;
    private _generateBatchEventParams;
    private _handlePutEventsFailure;
    private _processPutEventsSuccessResponse;
    private _retry;
    private _bufferToMap;
}
export {};
