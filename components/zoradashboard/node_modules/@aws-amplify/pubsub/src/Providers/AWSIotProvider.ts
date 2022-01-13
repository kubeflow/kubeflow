/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { MqttOverWSProvider } from './MqttOverWSProvider';
import { Signer, Credentials } from '@aws-amplify/core';

const SERVICE_NAME = 'iotdevicegateway';

export class AWSIoTProvider extends MqttOverWSProvider {
	protected get region() {
		return this.options.aws_pubsub_region;
	}

	public getProviderName() {
		return 'AWSIoTProvider';
	}

	protected get endpoint() {
		return (async () => {
			const endpoint = this.options.aws_pubsub_endpoint;

			const serviceInfo = {
				service: SERVICE_NAME,
				region: this.region,
			};
			const {
				accessKeyId: access_key,
				secretAccessKey: secret_key,
				sessionToken: session_token,
			} = await Credentials.get();

			const result = Signer.signUrl(
				endpoint,
				{ access_key, secret_key, session_token },
				serviceInfo
			);

			return result;
		})();
	}
}
