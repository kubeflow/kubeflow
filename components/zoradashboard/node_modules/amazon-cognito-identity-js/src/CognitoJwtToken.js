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

import { Buffer } from 'buffer';

/** @class */
export default class CognitoJwtToken {
	/**
	 * Constructs a new CognitoJwtToken object
	 * @param {string=} token The JWT token.
	 */
	constructor(token) {
		// Assign object
		this.jwtToken = token || '';
		this.payload = this.decodePayload();
	}

	/**
	 * @returns {string} the record's token.
	 */
	getJwtToken() {
		return this.jwtToken;
	}

	/**
	 * @returns {int} the token's expiration (exp member).
	 */
	getExpiration() {
		return this.payload.exp;
	}

	/**
	 * @returns {int} the token's "issued at" (iat member).
	 */
	getIssuedAt() {
		return this.payload.iat;
	}

	/**
	 * @returns {object} the token's payload.
	 */
	decodePayload() {
		const payload = this.jwtToken.split('.')[1];
		try {
			return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
		} catch (err) {
			return {};
		}
	}
}
