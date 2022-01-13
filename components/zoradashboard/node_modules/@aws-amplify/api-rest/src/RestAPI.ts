/*
 * Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { RestClient } from './RestClient';
import {
	Amplify,
	ConsoleLogger as Logger,
	Credentials,
} from '@aws-amplify/core';
import { ApiInfo } from './types';

const logger = new Logger('RestAPI');

/**
 * Export Cloud Logic APIs
 */
export class RestAPIClass {
	/**
	 * @private
	 */
	private _options;
	private _api: RestClient = null;

	Credentials = Credentials;

	/**
	 * Initialize Rest API with AWS configuration
	 * @param {Object} options - Configuration object for API
	 */
	constructor(options) {
		this._options = options;
		logger.debug('API Options', this._options);
	}

	public getModuleName() {
		return 'RestAPI';
	}

	/**
	 * Configure API part with aws configurations
	 * @param {Object} config - Configuration of the API
	 * @return {Object} - The current configuration
	 */
	configure(options) {
		const { API = {}, ...otherOptions } = options || {};
		let opt = { ...otherOptions, ...API };
		logger.debug('configure Rest API', { opt });

		if (opt['aws_project_region']) {
			if (opt['aws_cloud_logic_custom']) {
				const custom = opt['aws_cloud_logic_custom'];
				opt.endpoints =
					typeof custom === 'string' ? JSON.parse(custom) : custom;
			}

			opt = Object.assign({}, opt, {
				region: opt['aws_project_region'],
				header: {},
			});
		}

		if (Array.isArray(opt.endpoints)) {
			// Check if endpoints has custom_headers and validate if is a function
			opt.endpoints.forEach(endpoint => {
				if (
					typeof endpoint.custom_header !== 'undefined' &&
					typeof endpoint.custom_header !== 'function'
				) {
					logger.warn(
						'Rest API ' + endpoint.name + ', custom_header should be a function'
					);
					endpoint.custom_header = undefined;
				}
			});
		} else if (this._options && Array.isArray(this._options.endpoints)) {
			opt.endpoints = this._options.endpoints;
		} else {
			opt.endpoints = [];
		}

		this._options = Object.assign({}, this._options, opt);

		this.createInstance();

		return this._options;
	}

	/**
	 * Create an instance of API for the library
	 * @return - A promise of true if Success
	 */
	createInstance() {
		logger.debug('create Rest API instance');
		this._api = new RestClient(this._options);

		// Share Amplify instance with client for SSR
		this._api.Credentials = this.Credentials;
		return true;
	}

	/**
	 * Make a GET request
	 * @param {string} apiName - The api name of the request
	 * @param {string} path - The path of the request
	 * @param {json} [init] - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	get(apiName, path, init): Promise<any> {
		try {
			const apiInfo = this.getEndpointInfo(apiName, path);

			const cancellableToken = this._api.getCancellableToken();

			const initParams = Object.assign({}, init);
			initParams.cancellableToken = cancellableToken;

			const responsePromise = this._api.get(apiInfo, initParams);

			this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);

			return responsePromise;
		} catch (err) {
			return Promise.reject(err.message);
		}
	}

	/**
	 * Make a POST request
	 * @param {string} apiName - The api name of the request
	 * @param {string} path - The path of the request
	 * @param {json} [init] - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	post(apiName, path, init): Promise<any> {
		try {
			const apiInfo = this.getEndpointInfo(apiName, path);

			const cancellableToken = this._api.getCancellableToken();

			const initParams = Object.assign({}, init);
			initParams.cancellableToken = cancellableToken;

			const responsePromise = this._api.post(apiInfo, initParams);

			this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);

			return responsePromise;
		} catch (err) {
			return Promise.reject(err.message);
		}
	}

	/**
	 * Make a PUT request
	 * @param {string} apiName - The api name of the request
	 * @param {string} path - The path of the request
	 * @param {json} [init] - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	put(apiName, path, init): Promise<any> {
		try {
			const apiInfo = this.getEndpointInfo(apiName, path);

			const cancellableToken = this._api.getCancellableToken();

			const initParams = Object.assign({}, init);
			initParams.cancellableToken = cancellableToken;

			const responsePromise = this._api.put(apiInfo, initParams);

			this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);

			return responsePromise;
		} catch (err) {
			return Promise.reject(err.message);
		}
	}

	/**
	 * Make a PATCH request
	 * @param {string} apiName - The api name of the request
	 * @param {string} path - The path of the request
	 * @param {json} [init] - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	patch(apiName, path, init): Promise<any> {
		try {
			const apiInfo = this.getEndpointInfo(apiName, path);

			const cancellableToken = this._api.getCancellableToken();

			const initParams = Object.assign({}, init);
			initParams.cancellableToken = cancellableToken;

			const responsePromise = this._api.patch(apiInfo, initParams);

			this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);

			return responsePromise;
		} catch (err) {
			return Promise.reject(err.message);
		}
	}

	/**
	 * Make a DEL request
	 * @param {string} apiName - The api name of the request
	 * @param {string} path - The path of the request
	 * @param {json} [init] - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	del(apiName, path, init): Promise<any> {
		try {
			const apiInfo = this.getEndpointInfo(apiName, path);

			const cancellableToken = this._api.getCancellableToken();

			const initParams = Object.assign({}, init);
			initParams.cancellableToken = cancellableToken;

			const responsePromise = this._api.del(apiInfo, initParams);

			this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);

			return responsePromise;
		} catch (err) {
			return Promise.reject(err.message);
		}
	}

	/**
	 * Make a HEAD request
	 * @param {string} apiName - The api name of the request
	 * @param {string} path - The path of the request
	 * @param {json} [init] - Request extra params
	 * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
	 */
	head(apiName, path, init): Promise<any> {
		try {
			const apiInfo = this.getEndpointInfo(apiName, path);

			const cancellableToken = this._api.getCancellableToken();

			const initParams = Object.assign({}, init);
			initParams.cancellableToken = cancellableToken;

			const responsePromise = this._api.head(apiInfo, initParams);

			this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);

			return responsePromise;
		} catch (err) {
			return Promise.reject(err.message);
		}
	}

	/**
	 * Checks to see if an error thrown is from an api request cancellation
	 * @param {any} error - Any error
	 * @return {boolean} - A boolean indicating if the error was from an api request cancellation
	 */
	isCancel(error) {
		return this._api.isCancel(error);
	}

	/**
	 * Cancels an inflight request
	 * @param {any} request - request to cancel
	 * @return {boolean} - A boolean indicating if the request was cancelled
	 */
	cancel(request: Promise<any>, message?: string) {
		return this._api.cancel(request, message);
	}

	/**
	 * Getting endpoint for API
	 * @param {string} apiName - The name of the api
	 * @return {string} - The endpoint of the api
	 */
	async endpoint(apiName) {
		return this._api.endpoint(apiName);
	}

	/**
	 * Getting endpoint info for API
	 * @param {string} apiName - The name of the api
	 * @param {string} path - The path of the api that is going to accessed
	 * @return {ApiInfo} - The endpoint information for that api-name
	 */
	private getEndpointInfo(apiName: string, path: string): ApiInfo {
		const cloud_logic_array = this._options.endpoints;

		if (!Array.isArray(cloud_logic_array)) {
			throw new Error(`API category not configured`);
		}

		const apiConfig = cloud_logic_array.find(api => api.name === apiName);

		if (!apiConfig) {
			throw new Error(`API ${apiName} does not exist`);
		}

		const response: ApiInfo = {
			endpoint: apiConfig.endpoint + path,
		};

		if (typeof apiConfig.region === 'string') {
			response.region = apiConfig.region;
		} else if (typeof this._options.region === 'string') {
			response.region = this._options.region;
		}

		if (typeof apiConfig.service === 'string') {
			response.service = apiConfig.service || 'execute-api';
		} else {
			response.service = 'execute-api';
		}

		if (typeof apiConfig.custom_header === 'function') {
			response.custom_header = apiConfig.custom_header;
		} else {
			response.custom_header = undefined;
		}

		return response;
	}
}

export const RestAPI = new RestAPIClass(null);
Amplify.register(RestAPI);
