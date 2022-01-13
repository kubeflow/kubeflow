import { apiOptions, ApiInfo } from './types';
import { CancelTokenSource } from 'axios';
/**
* HTTP Client for REST requests. Send and receive JSON data.
* Sign request with AWS credentials if available
* Usage:
<pre>
const restClient = new RestClient();
restClient.get('...')
    .then(function(data) {
        console.log(data);
    })
    .catch(err => console.log(err));
</pre>
*/
export declare class RestClient {
    private _options;
    private _region;
    private _service;
    private _custom_header;
    /**
     * This weak map provides functionality to let clients cancel
     * in-flight axios requests. https://github.com/axios/axios#cancellation
     *
     * 1. For every axios request, a unique cancel token is generated and added in the request.
     * 2. Promise for fulfilling the request is then mapped to that unique cancel token.
     * 3. The promise is returned to the client.
     * 4. Clients can either wait for the promise to fulfill or call `API.cancel(promise)` to cancel the request.
     * 5. If `API.cancel(promise)` is called, then the corresponding cancel token is retrieved from the map below.
     * 6. Promise returned to the client will be in rejected state with the error provided during cancel.
     * 7. Clients can check if the error is because of cancelling by calling `API.isCancel(error)`.
     *
     * For more details, see https://github.com/aws-amplify/amplify-js/pull/3769#issuecomment-552660025
     */
    private _cancelTokenMap;
    Credentials: import("@aws-amplify/core").CredentialsClass;
    /**
     * @param {RestClientOptions} [options] - Instance options
     */
    constructor(options: apiOptions);
    /**
    * Update AWS credentials
    * @param {AWSCredentials} credentials - AWS credentials
    *
    updateCredentials(credentials: AWSCredentials) {
        this.options.credentials = credentials;
    }
*/
    /**
     * Basic HTTP request. Customizable
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {string} method - Request HTTP method
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    ajax(urlOrApiInfo: string | ApiInfo, method: string, init: any): Promise<any>;
    /**
     * GET HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {JSON} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    get(urlOrApiInfo: string | ApiInfo, init: any): Promise<any>;
    /**
     * PUT HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    put(urlOrApiInfo: string | ApiInfo, init: any): Promise<any>;
    /**
     * PATCH HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    patch(urlOrApiInfo: string | ApiInfo, init: any): Promise<any>;
    /**
     * POST HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    post(urlOrApiInfo: string | ApiInfo, init: any): Promise<any>;
    /**
     * DELETE HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    del(urlOrApiInfo: string | ApiInfo, init: any): Promise<any>;
    /**
     * HEAD HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    head(urlOrApiInfo: string | ApiInfo, init: any): Promise<any>;
    /**
     * Cancel an inflight API request
     * @param {Promise<any>} request - The request promise to cancel
     * @param {string} [message] - A message to include in the cancelation exception
     */
    cancel(request: Promise<any>, message?: string): boolean;
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    isCancel(error: any): boolean;
    /**
     * Retrieves a new and unique cancel token which can be
     * provided in an axios request to be cancelled later.
     */
    getCancellableToken(): CancelTokenSource;
    /**
     * Updates the weakmap with a response promise and its
     * cancel token such that the cancel token can be easily
     * retrieved (and used for cancelling the request)
     */
    updateRequestToBeCancellable(promise: Promise<any>, cancelTokenSource: CancelTokenSource): void;
    /**
     * Getting endpoint for API
     * @param {string} apiName - The name of the api
     * @return {string} - The endpoint of the api
     */
    endpoint(apiName: string): string;
    /** private methods **/
    private _signed;
    private _request;
    private _parseUrl;
}
