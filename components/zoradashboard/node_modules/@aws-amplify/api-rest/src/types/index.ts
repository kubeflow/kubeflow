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

/**
 * RestClient instance options
 */
export class RestClientOptions {
	/** AWS credentials */
	credentials: AWSCredentials;

	/**
	 * Lookup key of AWS credentials.
	 * If credentials not provided then lookup from sessionStorage.
	 * Default 'awsCredentials'
	 */
	credentials_key: string;

	/** Additional headers for all requests send by this client. e.g. user-agent */
	headers: object;

	constructor() {
		this.credentials_key = 'awsCredentials';
		this.headers = {};
	}
}

/**
 * AWS credentials needed for RestClient
 */
export class AWSCredentials {
	/**
	 * Secret Access Key
	 *
	 * [Access Key ID and Secret Access Key]
	 * (http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
	 */
	secretAccessKey: string;

	/**
	 * Access Key ID
	 *
	 * [Access Key ID and Secret Access Key]
	 * (http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
	 */
	accessKeyId: string;

	/** Access Token of current session */
	sessionToken: string;
}

// TODO: remove this once unauth creds are figured out
export interface apiOptions {
	headers: object;
	endpoints: object;
	credentials?: object;
}

export type ApiInfo = {
	endpoint: string;
	region?: string;
	service?: string;
	custom_header?: () => { [key: string]: string };
};
