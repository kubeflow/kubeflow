import { AnalyticsProvider } from '../types';
export declare class AmazonPersonalizeProvider implements AnalyticsProvider {
    private _config;
    private _personalize;
    private _buffer;
    private _timer;
    private _sessionInfo;
    private _sessionManager;
    private _isBrowser;
    constructor(config?: any);
    private _setupTimer;
    /**
     * Record event
     * @param eventType      - type of the event action. e.g. "Click"
     * @param properties     - properties of the event
     * @return Promise
     */
    record(params: any): Promise<boolean>;
    private loadElement;
    private isElementFullyLoaded;
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
     * Generate the requestParams from customer input params and sessionInfo
     * @private
     * @param eventData      - customer input for event data
     * @param api            - api name
     * @return RequestParams - wrapper object with all information required for make request
     */
    private generateRequestParams;
    /**
     * record an event
     * @param {Object} params - the params of an event
     */
    private _sendEvents;
    /**
     * Put event into buffer
     * @private
     * @param params - params for the event recording
     */
    private putToBuffer;
    /**
     * flush the buffer and batch sending the request
     * @private
     * @param eventsParams - the buffer for cache the payload
     */
    private _sendFromBuffer;
    /**
     * Generate the record payload for single event
     * @private
     * @param params - RequestParams
     */
    private _generateSingleRecordPayload;
    /**
     * Initialize the personalize client
     * @private
     * @param params - RequestParams
     */
    private _init;
    /**
     * check if current credentials exists
     * @private
     */
    private _getCredentials;
}
/**
 * @deprecated use named import
 */
export default AmazonPersonalizeProvider;
