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

import { ConsoleLogger as Logger, Parser } from '@aws-amplify/core';
import { AWSS3Provider } from './providers';
import {
	StorageProvider,
	StorageCopySource,
	StorageCopyDestination,
} from './types';
import axios, { CancelTokenSource } from 'axios';

const logger = new Logger('StorageClass');

const DEFAULT_PROVIDER = 'AWSS3';
/**
 * Provide storage methods to use AWS S3
 */
export class Storage {
	/**
	 * @private
	 */
	private _config;
	private _pluggables: StorageProvider[];

	/**
	 * Similar to the API module. This weak map allows users to cancel their in-flight request made using the Storage
	 * module. For every get or put request, a unique cancel token will be generated and injected to it's underlying
	 * AxiosHttpHandler. This map maintains a mapping of Request to CancelTokenSource. When .cancel is invoked, it will
	 * attempt to retrieve it's corresponding cancelTokenSource and cancel the in-flight request.
	 */
	private _cancelTokenSourceMap: WeakMap<Promise<any>, CancelTokenSource>;

	/**
	 * @public
	 */
	public vault: Storage;

	/**
	 * Initialize Storage
	 * @param {Object} config - Configuration object for storage
	 */
	constructor() {
		this._config = {};
		this._pluggables = [];
		this._cancelTokenSourceMap = new WeakMap<Promise<any>, CancelTokenSource>();
		logger.debug('Storage Options', this._config);

		this.get = this.get.bind(this);
		this.put = this.put.bind(this);
		this.remove = this.remove.bind(this);
		this.list = this.list.bind(this);
	}

	public getModuleName() {
		return 'Storage';
	}

	/**
	 * add plugin into Storage category
	 * @param {Object} pluggable - an instance of the plugin
	 */
	public addPluggable(pluggable: StorageProvider) {
		if (pluggable && pluggable.getCategory() === 'Storage') {
			this._pluggables.push(pluggable);
			let config = {};

			config = pluggable.configure(this._config[pluggable.getProviderName()]);

			return config;
		}
	}

	/**
	 * Get the plugin object
	 * @param providerName - the name of the plugin
	 */
	public getPluggable(providerName: string) {
		const pluggable = this._pluggables.find(
			pluggable => pluggable.getProviderName() === providerName
		);
		if (pluggable === undefined) {
			logger.debug('No plugin found with providerName', providerName);
			return null;
		} else return pluggable;
	}

	/**
	 * Remove the plugin object
	 * @param providerName - the name of the plugin
	 */
	public removePluggable(providerName: string) {
		this._pluggables = this._pluggables.filter(
			pluggable => pluggable.getProviderName() !== providerName
		);
		return;
	}

	/**
	 * Configure Storage
	 * @param {Object} config - Configuration object for storage
	 * @return {Object} - Current configuration
	 */
	configure(config?) {
		logger.debug('configure Storage');
		if (!config) return this._config;

		const amplifyConfig = Parser.parseMobilehubConfig(config);

		const storageKeysFromConfig = Object.keys(amplifyConfig.Storage);

		const storageArrayKeys = [
			'bucket',
			'region',
			'level',
			'track',
			'customPrefix',
			'serverSideEncryption',
			'SSECustomerAlgorithm',
			'SSECustomerKey',
			'SSECustomerKeyMD5',
			'SSEKMSKeyId',
		];

		const isInStorageArrayKeys = (k: string) =>
			storageArrayKeys.some(x => x === k);
		const checkConfigKeysFromArray = (k: string[]) =>
			k.find(k => isInStorageArrayKeys(k));

		if (
			storageKeysFromConfig &&
			checkConfigKeysFromArray(storageKeysFromConfig) &&
			!amplifyConfig.Storage[DEFAULT_PROVIDER]
		) {
			amplifyConfig.Storage[DEFAULT_PROVIDER] = {};
		}

		Object.entries(amplifyConfig.Storage).map(([key, value]) => {
			if (key && isInStorageArrayKeys(key) && value !== undefined) {
				amplifyConfig.Storage[DEFAULT_PROVIDER][key] = value;
				delete amplifyConfig.Storage[key];
			}
		});

		// only update new values for each provider
		Object.keys(amplifyConfig.Storage).forEach(providerName => {
			if (typeof amplifyConfig.Storage[providerName] !== 'string') {
				this._config[providerName] = {
					...this._config[providerName],
					...amplifyConfig.Storage[providerName],
				};
			}
		});

		this._pluggables.forEach(pluggable => {
			pluggable.configure(this._config[pluggable.getProviderName()]);
		});

		if (this._pluggables.length === 0) {
			this.addPluggable(new AWSS3Provider());
		}

		return this._config;
	}

	private getCancellableTokenSource(): CancelTokenSource {
		return axios.CancelToken.source();
	}

	private updateRequestToBeCancellable(
		request: Promise<any>,
		cancelTokenSource: CancelTokenSource
	) {
		this._cancelTokenSourceMap.set(request, cancelTokenSource);
	}

	/**
	 * Cancels an inflight request
	 *
	 * @param {Promise<any>} request - The request to cancel
	 * @param {string} [message] - A message to include in the cancelation exception
	 */
	public cancel(request: Promise<any>, message?: string) {
		const cancelTokenSource = this._cancelTokenSourceMap.get(request);
		if (cancelTokenSource) {
			cancelTokenSource.cancel(message);
		} else {
			logger.debug('The request does not map to any cancel token');
		}
	}

	/**
	 * Copies a file from the src key to dest key.
	 *
	 * @param {string} src - key of the source object.
	 * @param {string} dest - key of the destination object.
	 * @param {any} [config] - config.
	 * @return {Promise<any>} - A promise resolves to the copied object's key.
	 */
	public copy(src: StorageCopySource, dest: StorageCopyDestination, config?): Promise<any> {
		const { provider = DEFAULT_PROVIDER } = config || {};
		const prov = this._pluggables.find(
			pluggable => pluggable.getProviderName() === provider
		);
		if (prov === undefined) {
			logger.debug('No plugin found with providerName', provider);
			return Promise.reject('No plugin found in Storage for the provider');
		}
		const cancelTokenSource = this.getCancellableTokenSource();
		const responsePromise = prov.copy(src, dest, {
			...config,
			cancelTokenSource,
		});
		this.updateRequestToBeCancellable(responsePromise, cancelTokenSource);
		return responsePromise;
	}

	/**
	 * Get a presigned URL of the file or the object data when download:true
	 *
	 * @param {string} key - key of the object
	 * @param {Object} [config] - { level : private|protected|public, download: true|false }
	 * @return - A promise resolves to either a presigned url or the object
	 */
	public get(key: string, config?): Promise<String | Object> {
		const { provider = DEFAULT_PROVIDER } = config || {};
		const prov = this._pluggables.find(
			pluggable => pluggable.getProviderName() === provider
		);
		if (prov === undefined) {
			logger.debug('No plugin found with providerName', provider);
			return Promise.reject('No plugin found in Storage for the provider');
		}
		const cancelTokenSource = this.getCancellableTokenSource();
		const responsePromise = prov.get(key, {
			...config,
			cancelTokenSource,
		});
		this.updateRequestToBeCancellable(responsePromise, cancelTokenSource);
		return responsePromise;
	}

	public isCancelError(error: any) {
		return axios.isCancel(error);
	}

	/**
	 * Put a file in storage bucket specified to configure method
	 * @param {string} key - key of the object
	 * @param {Object} object - File to be put in bucket
	 * @param {Object} [config] - { level : private|protected|public, contentType: MIME Types,
	 *  progressCallback: function }
	 * @return - promise resolves to object on success
	 */
	public put(key: string, object, config?): Promise<Object> {
		const { provider = DEFAULT_PROVIDER } = config || {};
		const prov = this._pluggables.find(
			pluggable => pluggable.getProviderName() === provider
		);
		if (prov === undefined) {
			logger.debug('No plugin found with providerName', provider);
			return Promise.reject('No plugin found in Storage for the provider');
		}
		const cancelTokenSource = this.getCancellableTokenSource();
		const responsePromise = prov.put(key, object, {
			...config,
			cancelTokenSource,
		});
		this.updateRequestToBeCancellable(responsePromise, cancelTokenSource);
		return responsePromise;
	}

	/**
	 * Remove the object for specified key
	 * @param {string} key - key of the object
	 * @param {Object} [config] - { level : private|protected|public }
	 * @return - Promise resolves upon successful removal of the object
	 */
	public async remove(key: string, config?): Promise<any> {
		const { provider = DEFAULT_PROVIDER } = config || {};
		const prov = this._pluggables.find(
			pluggable => pluggable.getProviderName() === provider
		);
		if (prov === undefined) {
			logger.debug('No plugin found with providerName', provider);
			return Promise.reject('No plugin found in Storage for the provider');
		}
		return prov.remove(key, config);
	}

	/**
	 * List bucket objects relative to the level and prefix specified
	 * @param {String} path - the path that contains objects
	 * @param {Object} [config] - { level : private|protected|public, maxKeys: NUMBER }
	 * @return - Promise resolves to list of keys for all objects in path
	 */
	public async list(path, config?): Promise<any> {
		const { provider = DEFAULT_PROVIDER } = config || {};
		const prov = this._pluggables.find(
			pluggable => pluggable.getProviderName() === provider
		);
		if (prov === undefined) {
			logger.debug('No plugin found with providerName', provider);
			return Promise.reject('No plugin found in Storage for the provider');
		}
		return prov.list(path, config);
	}
}

/**
 * @deprecated use named import
 */
export default Storage;
