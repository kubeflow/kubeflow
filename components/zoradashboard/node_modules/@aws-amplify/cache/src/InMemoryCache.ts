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

import { CacheList, defaultConfig, getCurrTime, CacheObject } from './Utils';

import { StorageCache } from './StorageCache';
import { ICache, CacheConfig, CacheItem, CacheItemOptions } from './types';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('InMemoryCache');

/**
 * Customized in-memory cache with LRU implemented
 * @member cacheObj - object which store items
 * @member cacheList - list of keys in the cache with LRU
 * @member curSizeInBytes - current size of the cache
 * @member maxPriority - max of the priority
 * @member cacheSizeLimit - the limit of cache size
 */
export class InMemoryCacheClass extends StorageCache implements ICache {
	private cacheList: CacheList[];
	private curSizeInBytes: number;
	private maxPriority: number;
	private cacheSizeLimit: number;

	/**
	 * initialize the cache
	 *
	 * @param config - the configuration of the cache
	 */
	constructor(config?: CacheConfig) {
		const cacheConfig = config
			? Object.assign({}, defaultConfig, config)
			: defaultConfig;
		super(cacheConfig);
		logger.debug('now we start!');
		this.cacheList = [];
		this.curSizeInBytes = 0;
		this.maxPriority = 5;

		this.getItem = this.getItem.bind(this);
		this.setItem = this.setItem.bind(this);
		this.removeItem = this.removeItem.bind(this);

		// initialize list for every priority
		for (let i = 0; i < this.maxPriority; i += 1) {
			this.cacheList[i] = new CacheList();
		}
	}

	/**
	 * decrease current size of the cache
	 *
	 * @param amount - the amount of the cache size which needs to be decreased
	 */
	private _decreaseCurSizeInBytes(amount: number): void {
		this.curSizeInBytes -= amount;
	}

	/**
	 * increase current size of the cache
	 *
	 * @param amount - the amount of the cache szie which need to be increased
	 */
	private _increaseCurSizeInBytes(amount: number): void {
		this.curSizeInBytes += amount;
	}

	/**
	 * check whether item is expired
	 *
	 * @param key - the key of the item
	 *
	 * @return true if the item is expired.
	 */
	private _isExpired(key: string): boolean {
		const text: string | null = CacheObject.getItem(key);
		const item: CacheItem = JSON.parse(text);
		if (getCurrTime() >= item.expires) {
			return true;
		}
		return false;
	}

	/**
	 * delete item from cache
	 *
	 * @param prefixedKey - the key of the item
	 * @param listIdx - indicates which cache list the key belongs to
	 */
	private _removeItem(prefixedKey: string, listIdx: number): void {
		// delete the key from the list
		this.cacheList[listIdx].removeItem(prefixedKey);
		// decrease the current size of the cache
		this._decreaseCurSizeInBytes(
			JSON.parse(CacheObject.getItem(prefixedKey)).byteSize
		);
		// finally remove the item from memory
		CacheObject.removeItem(prefixedKey);
	}

	/**
	 * put item into cache
	 *
	 * @param prefixedKey - the key of the item
	 * @param itemData - the value of the item
	 * @param itemSizeInBytes - the byte size of the item
	 * @param listIdx - indicates which cache list the key belongs to
	 */
	private _setItem(
		prefixedKey: string,
		item: CacheItem,
		listIdx: number
	): void {
		// insert the key into the list
		this.cacheList[listIdx].insertItem(prefixedKey);
		// increase the current size of the cache
		this._increaseCurSizeInBytes(item.byteSize);
		// finally add the item into memory
		CacheObject.setItem(prefixedKey, JSON.stringify(item));
	}

	/**
	 * see whether cache is full
	 *
	 * @param itemSize
	 *
	 * @return true if cache is full
	 */
	private _isCacheFull(itemSize: number): boolean {
		return this.curSizeInBytes + itemSize > this.config.capacityInBytes;
	}

	/**
	 * check whether the cache contains the key
	 *
	 * @param key
	 */
	private containsKey(key: string): number {
		const prefixedKey: string = this.config.keyPrefix + key;
		for (let i = 0; i < this.maxPriority; i += 1) {
			if (this.cacheList[i].containsKey(prefixedKey)) {
				return i + 1;
			}
		}
		return -1;
	}

	/**
	 * * Set item into cache. You can put number, string, boolean or object.
	 * The cache will first check whether has the same key.
	 * If it has, it will delete the old item and then put the new item in
	 * The cache will pop out items if it is full
	 * You can specify the cache item options. The cache will abort and output a warning:
	 * If the key is invalid
	 * If the size of the item exceeds itemMaxSize.
	 * If the value is undefined
	 * If incorrect cache item configuration
	 * If error happened with browser storage
	 *
	 * @param key - the key of the item
	 * @param value - the value of the item
	 * @param options - optional, the specified meta-data
	 *
	 * @throws if the item is too big which exceeds the limit of single item size
	 * @throws if the key is invalid
	 */
	public setItem(
		key: string,
		value: object | string | number | boolean,
		options?: CacheItemOptions
	): void {
		const prefixedKey: string = this.config.keyPrefix + key;
		// invalid keys
		if (
			prefixedKey === this.config.keyPrefix ||
			prefixedKey === this.cacheCurSizeKey
		) {
			logger.warn(`Invalid key: should not be empty or 'CurSize'`);
			return;
		}

		if (typeof value === 'undefined') {
			logger.warn(`The value of item should not be undefined!`);
			return;
		}

		const cacheItemOptions: CacheItemOptions = {
			priority:
				options && options.priority !== undefined
					? options.priority
					: this.config.defaultPriority,
			expires:
				options && options.expires !== undefined
					? options.expires
					: this.config.defaultTTL + getCurrTime(),
		};

		if (cacheItemOptions.priority < 1 || cacheItemOptions.priority > 5) {
			logger.warn(
				`Invalid parameter: priority due to out or range. It should be within 1 and 5.`
			);
			return;
		}

		const item: CacheItem = this.fillCacheItem(
			prefixedKey,
			value,
			cacheItemOptions
		);

		// check wether this item is too big;
		if (item.byteSize > this.config.itemMaxSize) {
			logger.warn(
				`Item with key: ${key} you are trying to put into is too big!`
			);
			return;
		}

		// if key already in the cache, then delete it.
		const presentKeyPrio: number = this.containsKey(key);
		if (presentKeyPrio !== -1) {
			this._removeItem(prefixedKey, presentKeyPrio - 1);
		}

		// pop out items in the cache when cache is full based on LRU
		// first start from lowest priority cache list
		let cacheListIdx = this.maxPriority - 1;
		while (this._isCacheFull(item.byteSize) && cacheListIdx >= 0) {
			if (!this.cacheList[cacheListIdx].isEmpty()) {
				const popedItemKey = this.cacheList[cacheListIdx].getLastItem();
				this._removeItem(popedItemKey, cacheListIdx);
			} else {
				cacheListIdx -= 1;
			}
		}

		this._setItem(prefixedKey, item, Number(item.priority) - 1);
	}

	/**
	 * Get item from cache. It will return null if item doesn’t exist or it has been expired.
	 * If you specified callback function in the options,
	 * then the function will be executed if no such item in the cache
	 * and finally put the return value into cache.
	 * Please make sure the callback function will return the value you want to put into the cache.
	 * The cache will abort output a warning:
	 * If the key is invalid
	 *
	 * @param key - the key of the item
	 * @param options - the options of callback function
	 */
	public getItem(key: string, options?: CacheItemOptions): any {
		let ret: string | null = null;
		const prefixedKey: string = this.config.keyPrefix + key;

		if (
			prefixedKey === this.config.keyPrefix ||
			prefixedKey === this.cacheCurSizeKey
		) {
			logger.warn(`Invalid key: should not be empty or 'CurSize'`);
			return null;
		}

		// check whether it's in the cachelist
		const presentKeyPrio: number = this.containsKey(key);
		if (presentKeyPrio !== -1) {
			if (this._isExpired(prefixedKey)) {
				// if expired, remove that item and return null
				this._removeItem(prefixedKey, presentKeyPrio - 1);
			} else {
				// if not expired, great, return the value and refresh it
				ret = CacheObject.getItem(prefixedKey);
				const item: CacheItem = JSON.parse(ret);
				this.cacheList[item.priority - 1].refresh(prefixedKey);
				return item.data;
			}
		}

		if (options && options.callback !== undefined) {
			const val: object | string | number | boolean = options.callback();
			if (val !== null) {
				this.setItem(key, val, options);
			}
			return val;
		}
		return null;
	}

	/**
	 * remove item from the cache
	 *
	 * @param key - the key of the item
	 */
	public removeItem(key: string): void {
		const prefixedKey: string = this.config.keyPrefix + key;

		// check if the key is in the cache
		const presentKeyPrio: number = this.containsKey(key);
		if (presentKeyPrio !== -1) {
			this._removeItem(prefixedKey, presentKeyPrio - 1);
		}
	}

	/**
	 * clear the entire cache
	 */
	public clear(): void {
		for (let i = 0; i < this.maxPriority; i += 1) {
			for (const key of this.cacheList[i].getKeys()) {
				this._removeItem(key, i);
			}
		}
	}

	/**
	 * Return all the keys in the cache.
	 */
	public getAllKeys(): string[] {
		const keys: string[] = [];
		for (let i = 0; i < this.maxPriority; i += 1) {
			for (const key of this.cacheList[i].getKeys()) {
				keys.push(key.substring(this.config.keyPrefix.length));
			}
		}

		return keys;
	}

	/**
	 * return the current size of the cache
	 *
	 * @return the current size of the cache
	 */
	public getCacheCurSize(): number {
		return this.curSizeInBytes;
	}

	/**
	 * Return a new instance of cache with customized configuration.
	 * @param config - the customized configuration
	 */
	public createInstance(config: CacheConfig): ICache {
		return new InMemoryCacheClass(config);
	}
}

export const InMemoryCache: ICache = new InMemoryCacheClass();
/**
 * @deprecated use named import
 */
export default InMemoryCache;
