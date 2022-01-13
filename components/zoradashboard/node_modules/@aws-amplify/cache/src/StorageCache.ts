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

import { getCurrTime, getByteLength, defaultConfig, isInteger } from './Utils';

import { CacheConfig, CacheItem, CacheItemOptions } from './types';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('StorageCache');

/**
 * Initialization of the cache
 *
 */
export class StorageCache {
	protected cacheCurSizeKey: string;
	protected config: CacheConfig;

	/**
	 * Initialize the cache
	 * @param config - the configuration of the cache
	 */
	constructor(config: CacheConfig) {
		this.config = Object.assign({}, config);
		this.cacheCurSizeKey = this.config.keyPrefix + 'CurSize';
		this.checkConfig();
	}

	public getModuleName() {
		return 'Cache';
	}

	private checkConfig(): void {
		// check configuration
		if (!isInteger(this.config.capacityInBytes)) {
			logger.error(
				'Invalid parameter: capacityInBytes. It should be an Integer. Setting back to default.'
			);
			this.config.capacityInBytes = defaultConfig.capacityInBytes;
		}

		if (!isInteger(this.config.itemMaxSize)) {
			logger.error(
				'Invalid parameter: itemMaxSize. It should be an Integer. Setting back to default.'
			);
			this.config.itemMaxSize = defaultConfig.itemMaxSize;
		}

		if (!isInteger(this.config.defaultTTL)) {
			logger.error(
				'Invalid parameter: defaultTTL. It should be an Integer. Setting back to default.'
			);
			this.config.defaultTTL = defaultConfig.defaultTTL;
		}

		if (!isInteger(this.config.defaultPriority)) {
			logger.error(
				'Invalid parameter: defaultPriority. It should be an Integer. Setting back to default.'
			);
			this.config.defaultPriority = defaultConfig.defaultPriority;
		}

		if (this.config.itemMaxSize > this.config.capacityInBytes) {
			logger.error(
				'Invalid parameter: itemMaxSize. It should be smaller than capacityInBytes. Setting back to default.'
			);
			this.config.itemMaxSize = defaultConfig.itemMaxSize;
		}

		if (this.config.defaultPriority > 5 || this.config.defaultPriority < 1) {
			logger.error(
				'Invalid parameter: defaultPriority. It should be between 1 and 5. Setting back to default.'
			);
			this.config.defaultPriority = defaultConfig.defaultPriority;
		}

		if (
			Number(this.config.warningThreshold) > 1 ||
			Number(this.config.warningThreshold) < 0
		) {
			logger.error(
				'Invalid parameter: warningThreshold. It should be between 0 and 1. Setting back to default.'
			);
			this.config.warningThreshold = defaultConfig.warningThreshold;
		}
		// set 5MB limit
		const cacheLimit: number = 5 * 1024 * 1024;
		if (this.config.capacityInBytes > cacheLimit) {
			logger.error(
				'Cache Capacity should be less than 5MB. Setting back to default. Setting back to default.'
			);
			this.config.capacityInBytes = defaultConfig.capacityInBytes;
		}
	}

	/**
	 * produce a JSON object with meta-data and data value
	 * @param value - the value of the item
	 * @param options - optional, the specified meta-data
	 *
	 * @return - the item which has the meta-data and the value
	 */
	protected fillCacheItem(
		key: string,
		value: object | number | string | boolean,
		options: CacheItemOptions
	): CacheItem {
		const ret: CacheItem = {
			key,
			data: value,
			timestamp: getCurrTime(),
			visitedTime: getCurrTime(),
			priority: options.priority,
			expires: options.expires,
			type: typeof value,
			byteSize: 0,
		};

		ret.byteSize = getByteLength(JSON.stringify(ret));

		// for accurate size
		ret.byteSize = getByteLength(JSON.stringify(ret));
		return ret;
	}

	/**
	 * set cache with customized configuration
	 * @param config - customized configuration
	 *
	 * @return - the current configuration
	 */
	public configure(config?: CacheConfig): CacheConfig {
		if (!config) {
			return this.config;
		}
		if (config.keyPrefix) {
			logger.warn(`Don't try to configure keyPrefix!`);
		}

		this.config = Object.assign({}, this.config, config, config.Cache);
		this.checkConfig();
		return this.config;
	}
}

/**
 * @deprecated use named import
 */
export default StorageCache;
