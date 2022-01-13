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
import AsyncStorage from '@react-native-async-storage/async-storage';

const MEMORY_KEY_PREFIX = '@MemoryStorage:';
let dataMemory = {};

/** @class */
class MemoryStorage {
	static syncPromise = null;
	/**
	 * This is used to set a specific item in storage
	 * @param {string} key - the key for the item
	 * @param {object} value - the value
	 * @returns {string} value that was set
	 */
	static setItem(key, value) {
		if (value) {
			AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value);
			dataMemory[key] = value;
			return dataMemory[key];
		}
	}

	/**
	 * This is used to get a specific key from storage
	 * @param {string} key - the key for the item
	 * This is used to clear the storage
	 * @returns {string} the data item
	 */
	static getItem(key) {
		return Object.prototype.hasOwnProperty.call(dataMemory, key)
			? dataMemory[key]
			: undefined;
	}

	/**
	 * This is used to remove an item from storage
	 * @param {string} key - the key being set
	 * @returns {string} value - value that was deleted
	 */
	static removeItem(key) {
		AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key);
		return delete dataMemory[key];
	}

	/**
	 * This is used to clear the storage
	 * @returns {string} nothing
	 */
	static clear() {
		dataMemory = {};
		return dataMemory;
	}

	/**
	 * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
	 * @returns {void}
	 */
	static sync() {
		if (!MemoryStorage.syncPromise) {
			MemoryStorage.syncPromise = new Promise((res, rej) => {
				AsyncStorage.getAllKeys((errKeys, keys) => {
					if (errKeys) rej(errKeys);
					const memoryKeys = keys.filter(key =>
						key.startsWith(MEMORY_KEY_PREFIX)
					);
					AsyncStorage.multiGet(memoryKeys, (err, stores) => {
						if (err) rej(err);
						stores.map((result, index, store) => {
							const key = store[index][0];
							const value = store[index][1];
							const memoryKey = key.replace(MEMORY_KEY_PREFIX, '');
							dataMemory[memoryKey] = value;
						});
						res();
					});
				});
			});
		}
		return MemoryStorage.syncPromise;
	}
}

export class StorageHelper {
	private storageWindow;
	/**
	 * This is used to get a storage object
	 * @returns {object} the storage
	 */
	constructor() {
		this.storageWindow = MemoryStorage;
	}

	/**
	 * This is used to return the storage
	 * @returns {object} the storage
	 */
	getStorage() {
		return this.storageWindow;
	}
}

/**
 * @deprecated use named import
 */
export default StorageHelper;
