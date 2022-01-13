import { GraphQLOptions, GraphQLResult } from '@aws-amplify/api-graphql';
import Observable from 'zen-observable-ts';
/**
 * @deprecated
 * Use RestApi or GraphQLAPI to reduce your application bundle size
 * Export Cloud Logic APIs
 */
export declare class APIClass {
    /**
     * Initialize API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    private _options;
    private _restApi;
    private _graphqlApi;
    Auth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
    Cache: import("@aws-amplify/cache/lib-esm/types").ICache;
    Credentials: import("@aws-amplify/core").CredentialsClass;
    /**
     * Initialize API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    constructor(options: any);
    getModuleName(): string;
    /**
     * Configure API part with aws configurations
     * @param {Object} config - Configuration of the API
     * @return {Object} - The current configuration
     */
    configure(options: any): any;
    /**
     * Make a GET request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    get(apiName: any, path: any, init: any): Promise<any>;
    /**
     * Make a POST request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    post(apiName: any, path: any, init: any): Promise<any>;
    /**
     * Make a PUT request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    put(apiName: any, path: any, init: any): Promise<any>;
    /**
     * Make a PATCH request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    patch(apiName: any, path: any, init: any): Promise<any>;
    /**
     * Make a DEL request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    del(apiName: any, path: any, init: any): Promise<any>;
    /**
     * Make a HEAD request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    head(apiName: any, path: any, init: any): Promise<any>;
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    isCancel(error: any): boolean;
    /**
     * Cancels an inflight request
     * @param {any} request - request to cancel
     * @return {boolean} - A boolean indicating if the request was cancelled
     */
    cancel(request: Promise<any>, message?: string): boolean;
    /**
     * Getting endpoint for API
     * @param {string} apiName - The name of the api
     * @return {string} - The endpoint of the api
     */
    endpoint(apiName: any): Promise<string>;
    /**
     * to get the operation type
     * @param operation
     */
    getGraphqlOperationType(operation: any): any;
    /**
     * Executes a GraphQL operation
     *
     * @param {GraphQLOptions} GraphQL Options
     * @param {object} additionalHeaders headers to merge in after any `graphql_headers` set in the config
     * @returns {Promise<GraphQLResult> | Observable<object>}
     */
    graphql(options: GraphQLOptions, additionalHeaders?: {
        [key: string]: string;
    }): Promise<GraphQLResult> | Observable<object>;
}
export declare const API: APIClass;
