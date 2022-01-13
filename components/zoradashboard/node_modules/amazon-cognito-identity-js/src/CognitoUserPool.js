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

import Client from './Client';
import CognitoUser from './CognitoUser';
import StorageHelper from './StorageHelper';

/** @class */
export default class CognitoUserPool {
	/**
	 * Constructs a new CognitoUserPool object
	 * @param {object} data Creation options.
	 * @param {string} data.UserPoolId Cognito user pool id.
	 * @param {string} data.ClientId User pool application client id.
	 * @param {string} data.endpoint Optional custom service endpoint.
	 * @param {object} data.fetchOptions Optional options for fetch API.
	 *        (only credentials option is supported)
	 * @param {object} data.Storage Optional storage object.
	 * @param {boolean} data.AdvancedSecurityDataCollectionFlag Optional:
	 *        boolean flag indicating if the data collection is enabled
	 *        to support cognito advanced security features. By default, this
	 *        flag is set to true.
	 */
	constructor(data, wrapRefreshSessionCallback) {
		const {
			UserPoolId,
			ClientId,
			endpoint,
			fetchOptions,
			AdvancedSecurityDataCollectionFlag,
		} = data || {};
		if (!UserPoolId || !ClientId) {
			throw new Error('Both UserPoolId and ClientId are required.');
		}
		if (!/^[\w-]+_.+$/.test(UserPoolId)) {
			throw new Error('Invalid UserPoolId format.');
		}
		const region = UserPoolId.split('_')[0];

		this.userPoolId = UserPoolId;
		this.clientId = ClientId;

		this.client = new Client(region, endpoint, fetchOptions);

		/**
		 * By default, AdvancedSecurityDataCollectionFlag is set to true,
		 * if no input value is provided.
		 */
		this.advancedSecurityDataCollectionFlag =
			AdvancedSecurityDataCollectionFlag !== false;

		this.storage = data.Storage || new StorageHelper().getStorage();

		if (wrapRefreshSessionCallback) {
			this.wrapRefreshSessionCallback = wrapRefreshSessionCallback;
		}
	}

	/**
	 * @returns {string} the user pool id
	 */
	getUserPoolId() {
		return this.userPoolId;
	}

	/**
	 * @returns {string} the client id
	 */
	getClientId() {
		return this.clientId;
	}

	/**
	 * @typedef {object} SignUpResult
	 * @property {CognitoUser} user New user.
	 * @property {bool} userConfirmed If the user is already confirmed.
	 */
	/**
	 * method for signing up a user
	 * @param {string} username User's username.
	 * @param {string} password Plain-text initial password entered by user.
	 * @param {(AttributeArg[])=} userAttributes New user attributes.
	 * @param {(AttributeArg[])=} validationData Application metadata.
	 * @param {(AttributeArg[])=} clientMetadata Client metadata.
	 * @param {nodeCallback<SignUpResult>} callback Called on error or with the new user.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	signUp(
		username,
		password,
		userAttributes,
		validationData,
		callback,
		clientMetadata
	) {
		const jsonReq = {
			ClientId: this.clientId,
			Username: username,
			Password: password,
			UserAttributes: userAttributes,
			ValidationData: validationData,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData(username)) {
			jsonReq.UserContextData = this.getUserContextData(username);
		}
		this.client.request('SignUp', jsonReq, (err, data) => {
			if (err) {
				return callback(err, null);
			}

			const cognitoUser = {
				Username: username,
				Pool: this,
				Storage: this.storage,
			};

			const returnData = {
				user: new CognitoUser(cognitoUser),
				userConfirmed: data.UserConfirmed,
				userSub: data.UserSub,
				codeDeliveryDetails: data.CodeDeliveryDetails,
			};

			return callback(null, returnData);
		});
	}

	/**
	 * method for getting the current user of the application from the local storage
	 *
	 * @returns {CognitoUser} the user retrieved from storage
	 */
	getCurrentUser() {
		const lastUserKey = `CognitoIdentityServiceProvider.${this.clientId}.LastAuthUser`;

		const lastAuthUser = this.storage.getItem(lastUserKey);
		if (lastAuthUser) {
			const cognitoUser = {
				Username: lastAuthUser,
				Pool: this,
				Storage: this.storage,
			};

			return new CognitoUser(cognitoUser);
		}

		return null;
	}

	/**
	 * This method returns the encoded data string used for cognito advanced security feature.
	 * This would be generated only when developer has included the JS used for collecting the
	 * data on their client. Please refer to documentation to know more about using AdvancedSecurity
	 * features
	 * @param {string} username the username for the context data
	 * @returns {string} the user context data
	 **/
	getUserContextData(username) {
		if (typeof AmazonCognitoAdvancedSecurityData === 'undefined') {
			return undefined;
		}
		/* eslint-disable */
		const amazonCognitoAdvancedSecurityDataConst = AmazonCognitoAdvancedSecurityData;
		/* eslint-enable */

		if (this.advancedSecurityDataCollectionFlag) {
			const advancedSecurityData = amazonCognitoAdvancedSecurityDataConst.getData(
				username,
				this.userPoolId,
				this.clientId
			);
			if (advancedSecurityData) {
				const userContextData = {
					EncodedData: advancedSecurityData,
				};
				return userContextData;
			}
		}
		return {};
	}
}
