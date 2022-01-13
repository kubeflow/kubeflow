/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import {
	ConsoleLogger as Logger,
	Credentials,
	DateUtils,
	Signer,
	Platform,
} from '@aws-amplify/core';

import { apiOptions, ApiInfo } from './types';
import axios, { CancelTokenSource } from 'axios';
import { parse, format } from 'url';

const logger = new Logger('RestClient');

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
export class RestClient {
	private _options;
	private _region: string = 'us-east-1'; // this will be updated by endpoint function
	private _service: string = 'execute-api'; // this can be updated by endpoint function
	private _custom_header = undefined; // this can be updated by endpoint function

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
	private _cancelTokenMap: WeakMap<any, CancelTokenSource> = null;

	Credentials = Credentials;

	/**
	 * @param {RestClientOptions} [options] - Instance options
	 */
	constructor(options: apiOptions) {
		this._options = options;
		logger.debug('API Options', this._options);
		if (this._cancelTokenMap == null) {
			this._cancelTokenMap = new WeakMap();
		}
	}

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
	async ajax(urlOrApiInfo: string | ApiInfo, method: string, init) {
		logger.debug(method, urlOrApiInfo);

		let parsed_url;
		let url: string;
		let region: string = 'us-east-1';
		let service: string = 'execute-api';
		let custom_header: () => {
			[key: string]: string;
		} = undefined;

		if (typeof urlOrApiInfo === 'string') {
			parsed_url = this._parseUrl(urlOrApiInfo);
			url = urlOrApiInfo;
		} else {
			({ endpoint: url, custom_header, region, service } = urlOrApiInfo);
			parsed_url = this._parseUrl(urlOrApiInfo.endpoint);
		}

		const params = {
			method,
			url,
			host: parsed_url.host,
			path: parsed_url.path,
			headers: {},
			data: null,
			responseType: 'json',
			timeout: 0,
			cancelToken: null,
		};

		let libraryHeaders = {};

		if (Platform.isReactNative) {
			const userAgent = Platform.userAgent || 'aws-amplify/0.1.x';
			libraryHeaders = {
				'User-Agent': userAgent,
			};
		}

		const initParams = Object.assign({}, init);
		const isAllResponse = initParams.response;
		if (initParams.body) {
			if (
				typeof FormData === 'function' &&
				initParams.body instanceof FormData
			) {
				libraryHeaders['Content-Type'] = 'multipart/form-data';
				params.data = initParams.body;
			} else {
				libraryHeaders['Content-Type'] = 'application/json; charset=UTF-8';
				params.data = JSON.stringify(initParams.body);
			}
		}
		if (initParams.responseType) {
			params.responseType = initParams.responseType;
		}
		if (initParams.withCredentials) {
			params['withCredentials'] = initParams.withCredentials;
		}
		if (initParams.timeout) {
			params.timeout = initParams.timeout;
		}
		if (initParams.cancellableToken) {
			params.cancelToken = initParams.cancellableToken.token;
		}

		params['signerServiceInfo'] = initParams.signerServiceInfo;

		// custom_header callback
		const custom_header_obj =
			typeof custom_header === 'function' ? await custom_header() : undefined;

		params.headers = {
			...libraryHeaders,
			...custom_header_obj,
			...initParams.headers,
		};

		// Intentionally discarding search
		const { search, ...parsedUrl } = parse(url, true, true);
		params.url = format({
			...parsedUrl,
			query: {
				...parsedUrl.query,
				...(initParams.queryStringParameters || {}),
			},
		});

		// Do not sign the request if client has added 'Authorization' header,
		// which means custom authorizer.
		if (typeof params.headers['Authorization'] !== 'undefined') {
			params.headers = Object.keys(params.headers).reduce((acc, k) => {
				if (params.headers[k]) {
					acc[k] = params.headers[k];
				}
				return acc;
				// tslint:disable-next-line:align
			}, {});
			return this._request(params, isAllResponse);
		}

		// Signing the request in case there credentials are available
		return this.Credentials.get().then(
			credentials => {
				return this._signed({ ...params }, credentials, isAllResponse, {
					region,
					service,
				}).catch(error => {
					if (DateUtils.isClockSkewError(error)) {
						const { headers } = error.response;
						const dateHeader = headers && (headers.date || headers.Date);
						const responseDate = new Date(dateHeader);
						const requestDate = DateUtils.getDateFromHeaderString(
							params.headers['x-amz-date']
						);

						// Compare local clock to the server clock
						if (DateUtils.isClockSkewed(responseDate)) {
							DateUtils.setClockOffset(
								responseDate.getTime() - requestDate.getTime()
							);

							return this.ajax(urlOrApiInfo, method, init);
						}
					}

					throw error;
				});
			},
			err => {
				logger.debug('No credentials available, the request will be unsigned');
				return this._request(params, isAllResponse);
			}
		);
	}

	/**
	 * GET HTTP request
	 * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
	 * @param {JSON} init - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	get(urlOrApiInfo: string | ApiInfo, init) {
		return this.ajax(urlOrApiInfo, 'GET', init);
	}

	/**
	 * PUT HTTP request
	 * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
	 * @param {json} init - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	put(urlOrApiInfo: string | ApiInfo, init) {
		return this.ajax(urlOrApiInfo, 'PUT', init);
	}

	/**
	 * PATCH HTTP request
	 * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
	 * @param {json} init - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	patch(urlOrApiInfo: string | ApiInfo, init) {
		return this.ajax(urlOrApiInfo, 'PATCH', init);
	}

	/**
	 * POST HTTP request
	 * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
	 * @param {json} init - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	post(urlOrApiInfo: string | ApiInfo, init) {
		return this.ajax(urlOrApiInfo, 'POST', init);
	}

	/**
	 * DELETE HTTP request
	 * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
	 * @param {json} init - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	del(urlOrApiInfo: string | ApiInfo, init) {
		return this.ajax(urlOrApiInfo, 'DELETE', init);
	}

	/**
	 * HEAD HTTP request
	 * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
	 * @param {json} init - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	head(urlOrApiInfo: string | ApiInfo, init) {
		return this.ajax(urlOrApiInfo, 'HEAD', init);
	}

	/**
	 * Cancel an inflight API request
	 * @param {Promise<any>} request - The request promise to cancel
	 * @param {string} [message] - A message to include in the cancelation exception
	 */
	cancel(request: Promise<any>, message?: string) {
		const source = this._cancelTokenMap.get(request);
		if (source) {
			source.cancel(message);
		}
		return true;
	}

	/**
	 * Checks to see if an error thrown is from an api request cancellation
	 * @param {any} error - Any error
	 * @return {boolean} - A boolean indicating if the error was from an api request cancellation
	 */
	isCancel(error): boolean {
		return axios.isCancel(error);
	}

	/**
	 * Retrieves a new and unique cancel token which can be
	 * provided in an axios request to be cancelled later.
	 */
	getCancellableToken(): CancelTokenSource {
		return axios.CancelToken.source();
	}

	/**
	 * Updates the weakmap with a response promise and its
	 * cancel token such that the cancel token can be easily
	 * retrieved (and used for cancelling the request)
	 */
	updateRequestToBeCancellable(
		promise: Promise<any>,
		cancelTokenSource: CancelTokenSource
	) {
		this._cancelTokenMap.set(promise, cancelTokenSource);
	}

	/**
	 * Getting endpoint for API
	 * @param {string} apiName - The name of the api
	 * @return {string} - The endpoint of the api
	 */
	endpoint(apiName: string) {
		const cloud_logic_array = this._options.endpoints;
		let response = '';

		if (!Array.isArray(cloud_logic_array)) {
			return response;
		}

		cloud_logic_array.forEach(v => {
			if (v.name === apiName) {
				response = v.endpoint;
				if (typeof v.region === 'string') {
					this._region = v.region;
				} else if (typeof this._options.region === 'string') {
					this._region = this._options.region;
				}
				if (typeof v.service === 'string') {
					this._service = v.service || 'execute-api';
				} else {
					this._service = 'execute-api';
				}
				if (typeof v.custom_header === 'function') {
					this._custom_header = v.custom_header;
				} else {
					this._custom_header = undefined;
				}
			}
		});
		return response;
	}

	/** private methods **/

	private _signed(params, credentials, isAllResponse, { service, region }) {
		const {
			signerServiceInfo: signerServiceInfoParams,
			...otherParams
		} = params;

		const endpoint_region: string =
			region || this._region || this._options.region;
		const endpoint_service: string =
			service || this._service || this._options.service;

		const creds = {
			secret_key: credentials.secretAccessKey,
			access_key: credentials.accessKeyId,
			session_token: credentials.sessionToken,
		};

		const endpointInfo = {
			region: endpoint_region,
			service: endpoint_service,
		};

		const signerServiceInfo = Object.assign(
			endpointInfo,
			signerServiceInfoParams
		);

		const signed_params = Signer.sign(otherParams, creds, signerServiceInfo);

		if (signed_params.data) {
			signed_params.body = signed_params.data;
		}

		logger.debug('Signed Request: ', signed_params);

		delete signed_params.headers['host'];

		return axios(signed_params)
			.then(response => (isAllResponse ? response : response.data))
			.catch(error => {
				logger.debug(error);
				throw error;
			});
	}

	private _request(params, isAllResponse = false) {
		return axios(params)
			.then(response => (isAllResponse ? response : response.data))
			.catch(error => {
				logger.debug(error);
				throw error;
			});
	}

	private _parseUrl(url) {
		const parts = url.split('/');

		return {
			host: parts[2],
			path: '/' + parts.slice(3).join('/'),
		};
	}
}
