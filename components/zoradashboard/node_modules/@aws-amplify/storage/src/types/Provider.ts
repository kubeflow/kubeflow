import { StorageCopySource, StorageCopyDestination } from './Storage';
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
export interface StorageProvider {
	// you need to implement those methods

	// cancel an in-flight request
	cancel?(request: Promise<any>): void;

	// copy object from src to dest
	copy?(src: StorageCopySource, dest: StorageCopyDestination, config?): Promise<any>;

	// configure your provider
	configure(config: object): object;

	// get object/pre-signed url from storage
	get(key: string, options?): Promise<string | Object>;

	// upload storage object
	put(key: string, object, options?): Promise<Object>;

	// remove object
	remove(key: string, options?): Promise<any>;

	// list objects for the path
	list(path, options?): Promise<any>;

	// return 'Storage';
	getCategory(): string;

	// return the name of you provider
	getProviderName(): string;
}
