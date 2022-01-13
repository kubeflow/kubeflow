/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */

let dataMemory = {};

/** @class */
export class MemoryStorage {
	/**
	 * This is used to set a specific item in storage
	 * @param {string} key - the key for the item
	 * @param {object} value - the value
	 * @returns {string} value that was set
	 */
	static setItem(key, value) {
		dataMemory[key] = value;
		return dataMemory[key];
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
	 * @returns {boolean} return true
	 */
	static removeItem(key) {
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
}

/** @class */
export default class StorageHelper {
	/**
	 * This is used to get a storage object
	 * @returns {object} the storage
	 */
	constructor() {
		try {
			this.storageWindow = window.localStorage;
			this.storageWindow.setItem('aws.cognito.test-ls', 1);
			this.storageWindow.removeItem('aws.cognito.test-ls');
		} catch (exception) {
			this.storageWindow = MemoryStorage;
		}
	}

	/**
	 * This is used to return the storage
	 * @returns {object} the storage
	 */
	getStorage() {
		return this.storageWindow;
	}
}
