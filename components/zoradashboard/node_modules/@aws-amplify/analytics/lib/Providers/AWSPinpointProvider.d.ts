import { AnalyticsProvider, PromiseHandlers, EventParams } from '../types';
export declare class AWSPinpointProvider implements AnalyticsProvider {
    static category: string;
    static providerName: string;
    private _config;
    private pinpointClient;
    private _sessionId;
    private _sessionStartTimestamp;
    private _buffer;
    private _endpointBuffer;
    private _clientInfo;
    private _endpointGenerating;
    private _endpointUpdateInProgress;
    constructor(config?: any);
    /**
     * get the category of the plugin
     */
    getCategory(): string;
    /**
     * get provider name of the plugin
     */
    getProviderName(): string;
    /**
     * configure the plugin
     * @param {Object} config - configuration
     */
    configure(config: any): object;
    /**
     * record an event
     * @param {Object} params - the params of an event
     */
    record(params: EventParams, handlers: PromiseHandlers): Promise<any>;
    private _sendEndpointUpdate;
    /**
     * @private
     * @param params - params for event recording
     * Put events into buffer
     */
    private _putToBuffer;
    private _generateSession;
    private _send;
    private _generateBatchItemContext;
    private _pinpointPutEvents;
    private _pinpointSendStopSession;
    private _retry;
    private _updateEndpoint;
    private _handleEndpointUpdateFailure;
    private _handleEndpointUpdateForbidden;
    private _retryEndpointUpdate;
    /**
     * @private
     * @param config
     * Init the clients
     */
    private _initClients;
    private _bufferExists;
    private _initBuffer;
    private _updateBufferClient;
    private _flushBuffer;
    private _resumeBuffer;
    private _customizePinpointClientReq;
    private _getEndpointId;
    /**
     * EndPoint request
     * @return {Object} - The request of updating endpoint
     */
    private _endpointRequest;
    private _eventError;
    private _getCredentials;
}
/**
 * @deprecated use named import
 */
export default AWSPinpointProvider;
