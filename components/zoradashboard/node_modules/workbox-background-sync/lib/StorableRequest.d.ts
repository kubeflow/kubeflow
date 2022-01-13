import '../_version.js';
export interface RequestData {
    url: string;
    headers: {
        [headerName: string]: any;
    };
    body?: ArrayBuffer;
    [propName: string]: any;
}
/**
 * A class to make it easier to serialize and de-serialize requests so they
 * can be stored in IndexedDB.
 *
 * @private
 */
declare class StorableRequest {
    private readonly _requestData;
    /**
     * Converts a Request object to a plain object that can be structured
     * cloned or JSON-stringified.
     *
     * @param {Request} request
     * @return {Promise<StorableRequest>}
     *
     * @private
     */
    static fromRequest(request: Request): Promise<StorableRequest>;
    /**
     * Accepts an object of request data that can be used to construct a
     * `Request` but can also be stored in IndexedDB.
     *
     * @param {Object} requestData An object of request data that includes the
     *     `url` plus any relevant properties of
     *     [requestInit]{@link https://fetch.spec.whatwg.org/#requestinit}.
     * @private
     */
    constructor(requestData: RequestData);
    /**
     * Returns a deep clone of the instances `_requestData` object.
     *
     * @return {Object}
     *
     * @private
     */
    toObject(): RequestData;
    /**
     * Converts this instance to a Request.
     *
     * @return {Request}
     *
     * @private
     */
    toRequest(): Request;
    /**
     * Creates and returns a deep clone of the instance.
     *
     * @return {StorableRequest}
     *
     * @private
     */
    clone(): StorableRequest;
}
export { StorableRequest };
