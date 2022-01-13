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

/** @class */
export default class CognitoRefreshToken {
	/**
	 * Constructs a new CognitoRefreshToken object
	 * @param {string=} RefreshToken The JWT refresh token.
	 */
	constructor({ RefreshToken } = {}) {
		// Assign object
		this.token = RefreshToken || '';
	}

	/**
	 * @returns {string} the record's token.
	 */
	getToken() {
		return this.token;
	}
}
