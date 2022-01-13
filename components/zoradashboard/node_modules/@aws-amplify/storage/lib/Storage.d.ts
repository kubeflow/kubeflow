import { StorageProvider, StorageCopySource, StorageCopyDestination } from './types';
/**
 * Provide storage methods to use AWS S3
 */
export declare class Storage {
    /**
     * @private
     */
    private _config;
    private _pluggables;
    /**
     * Similar to the API module. This weak map allows users to cancel their in-flight request made using the Storage
     * module. For every get or put request, a unique cancel token will be generated and injected to it's underlying
     * AxiosHttpHandler. This map maintains a mapping of Request to CancelTokenSource. When .cancel is invoked, it will
     * attempt to retrieve it's corresponding cancelTokenSource and cancel the in-flight request.
     */
    private _cancelTokenSourceMap;
    /**
     * @public
     */
    vault: Storage;
    /**
     * Initialize Storage
     * @param {Object} config - Configuration object for storage
     */
    constructor();
    getModuleName(): string;
    /**
     * add plugin into Storage category
     * @param {Object} pluggable - an instance of the plugin
     */
    addPluggable(pluggable: StorageProvider): {};
    /**
     * Get the plugin object
     * @param providerName - the name of the plugin
     */
    getPluggable(providerName: string): StorageProvider;
    /**
     * Remove the plugin object
     * @param providerName - the name of the plugin
     */
    removePluggable(providerName: string): void;
    /**
     * Configure Storage
     * @param {Object} config - Configuration object for storage
     * @return {Object} - Current configuration
     */
    configure(config?: any): any;
    private getCancellableTokenSource;
    private updateRequestToBeCancellable;
    /**
     * Cancels an inflight request
     *
     * @param {Promise<any>} request - The request to cancel
     * @param {string} [message] - A message to include in the cancelation exception
     */
    cancel(request: Promise<any>, message?: string): void;
    /**
     * Copies a file from the src key to dest key.
     *
     * @param {string} src - key of the source object.
     * @param {string} dest - key of the destination object.
     * @param {any} [config] - config.
     * @return {Promise<any>} - A promise resolves to the copied object's key.
     */
    copy(src: StorageCopySource, dest: StorageCopyDestination, config?: any): Promise<any>;
    /**
     * Get a presigned URL of the file or the object data when download:true
     *
     * @param {string} key - key of the object
     * @param {Object} [config] - { level : private|protected|public, download: true|false }
     * @return - A promise resolves to either a presigned url or the object
     */
    get(key: string, config?: any): Promise<String | Object>;
    isCancelError(error: any): boolean;
    /**
     * Put a file in storage bucket specified to configure method
     * @param {string} key - key of the object
     * @param {Object} object - File to be put in bucket
     * @param {Object} [config] - { level : private|protected|public, contentType: MIME Types,
     *  progressCallback: function }
     * @return - promise resolves to object on success
     */
    put(key: string, object: any, config?: any): Promise<Object>;
    /**
     * Remove the object for specified key
     * @param {string} key - key of the object
     * @param {Object} [config] - { level : private|protected|public }
     * @return - Promise resolves upon successful removal of the object
     */
    remove(key: string, config?: any): Promise<any>;
    /**
     * List bucket objects relative to the level and prefix specified
     * @param {String} path - the path that contains objects
     * @param {Object} [config] - { level : private|protected|public, maxKeys: NUMBER }
     * @return - Promise resolves to list of keys for all objects in path
     */
    list(path: any, config?: any): Promise<any>;
}
/**
 * @deprecated use named import
 */
export default Storage;
