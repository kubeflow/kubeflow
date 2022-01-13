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

import { CacheConfig, CacheItem, CacheItemOptions } from '../types';
import { StorageHelper } from '@aws-amplify/core';
/**
 * Default cache config
 */
export const defaultConfig: CacheConfig = {
	keyPrefix: 'aws-amplify-cache',
	capacityInBytes: 1048576, // 1MB
	itemMaxSize: 210000, // about 200kb
	defaultTTL: 259200000, // about 3 days
	defaultPriority: 5,
	warningThreshold: 0.8,
	// the storage helper will check if localStorage exists,
	// if not, will use a in-memory object instead
	storage: new StorageHelper().getStorage(),
};

/**
 * return the byte size of the string
 * @param str
 */
export function getByteLength(str: string): number {
	let ret: number = 0;
	ret = str.length;

	for (let i = str.length; i >= 0; i -= 1) {
		const charCode: number = str.charCodeAt(i);
		if (charCode > 0x7f && charCode <= 0x7ff) {
			ret += 1;
		} else if (charCode > 0x7ff && charCode <= 0xffff) {
			ret += 2;
		}
		// trail surrogate
		if (charCode >= 0xdc00 && charCode <= 0xdfff) {
			i -= 1;
		}
	}

	return ret;
}

/**
 * get current time
 */
export function getCurrTime(): number {
	const currTime = new Date();
	return currTime.getTime();
}

/**
 * check if passed value is an integer
 */
export function isInteger(value): boolean {
	if (Number.isInteger) {
		return Number.isInteger(value);
	}

	return _isInteger(value);
}

function _isInteger(value): boolean {
	return (
		typeof value === 'number' && isFinite(value) && Math.floor(value) === value
	);
}

/**
 * provide an object as the in-memory cache
 */
let store = {};
export class CacheObject {
	static clear(): void {
		store = {};
	}

	static getItem(key: string): string | null {
		return store[key] || null;
	}

	static setItem(key: string, value: string): void {
		store[key] = value;
	}

	static removeItem(key: string): void {
		delete store[key];
	}
}
