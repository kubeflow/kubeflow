import { AWSKinesisProvider } from './AWSKinesisProvider';
export declare class AWSKinesisFirehoseProvider extends AWSKinesisProvider {
    private _kinesisFirehose;
    constructor(config?: any);
    /**
     * get provider name of the plugin
     */
    getProviderName(): string;
    protected _sendEvents(group: any): boolean;
    protected _init(config: any, credentials: any): boolean;
    private _initFirehose;
}
/**
 * @deprecated use named import
 */
export default AWSKinesisFirehoseProvider;
