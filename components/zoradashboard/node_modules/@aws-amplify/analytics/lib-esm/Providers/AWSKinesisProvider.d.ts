import { AnalyticsProvider } from '../types';
export declare class AWSKinesisProvider implements AnalyticsProvider {
    protected _config: any;
    private _kinesis;
    private _buffer;
    private _timer;
    constructor(config?: any);
    private _setupTimer;
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
    record(params: any): Promise<boolean>;
    updateEndpoint(): Promise<boolean>;
    /**
     * @private
     * @param params - params for the event recording
     * Put events into buffer
     */
    private _putToBuffer;
    private _sendFromBuffer;
    protected _sendEvents(group: any): boolean;
    protected _init(config: any, credentials: any): boolean;
    private _initKinesis;
    /**
     * @private
     * check if current credentials exists
     */
    private _getCredentials;
}
/**
 * @deprecated use named import
 */
export default AWSKinesisProvider;
