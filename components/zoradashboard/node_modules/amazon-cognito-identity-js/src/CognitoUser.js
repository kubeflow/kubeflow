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
import CryptoJS from 'crypto-js/core';
import TypedArrays from 'crypto-js/lib-typedarrays'; // necessary for crypto js
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';

import BigInteger from './BigInteger';
import AuthenticationHelper from './AuthenticationHelper';
import CognitoAccessToken from './CognitoAccessToken';
import CognitoIdToken from './CognitoIdToken';
import CognitoRefreshToken from './CognitoRefreshToken';
import CognitoUserSession from './CognitoUserSession';
import DateHelper from './DateHelper';
import CognitoUserAttribute from './CognitoUserAttribute';
import StorageHelper from './StorageHelper';

/**
 * @callback nodeCallback
 * @template T result
 * @param {*} err The operation failure reason, or null.
 * @param {T} result The operation result.
 */

/**
 * @callback onFailure
 * @param {*} err Failure reason.
 */

/**
 * @callback onSuccess
 * @template T result
 * @param {T} result The operation result.
 */

/**
 * @callback mfaRequired
 * @param {*} details MFA challenge details.
 */

/**
 * @callback customChallenge
 * @param {*} details Custom challenge details.
 */

/**
 * @callback inputVerificationCode
 * @param {*} data Server response.
 */

/**
 * @callback authSuccess
 * @param {CognitoUserSession} session The new session.
 * @param {bool=} userConfirmationNecessary User must be confirmed.
 */

const isBrowser = typeof navigator !== 'undefined';
const userAgent = isBrowser ? navigator.userAgent : 'nodejs';

/** @class */
export default class CognitoUser {
	/**
	 * Constructs a new CognitoUser object
	 * @param {object} data Creation options
	 * @param {string} data.Username The user's username.
	 * @param {CognitoUserPool} data.Pool Pool containing the user.
	 * @param {object} data.Storage Optional storage object.
	 */
	constructor(data) {
		if (data == null || data.Username == null || data.Pool == null) {
			throw new Error('Username and Pool information are required.');
		}

		this.username = data.Username || '';
		this.pool = data.Pool;
		this.Session = null;

		this.client = data.Pool.client;

		this.signInUserSession = null;
		this.authenticationFlowType = 'USER_SRP_AUTH';

		this.storage = data.Storage || new StorageHelper().getStorage();

		this.keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}`;
		this.userDataKey = `${this.keyPrefix}.${this.username}.userData`;
	}

	/**
	 * Sets the session for this user
	 * @param {CognitoUserSession} signInUserSession the session
	 * @returns {void}
	 */
	setSignInUserSession(signInUserSession) {
		this.clearCachedUserData();
		this.signInUserSession = signInUserSession;
		this.cacheTokens();
	}

	/**
	 * @returns {CognitoUserSession} the current session for this user
	 */
	getSignInUserSession() {
		return this.signInUserSession;
	}

	/**
	 * @returns {string} the user's username
	 */
	getUsername() {
		return this.username;
	}

	/**
	 * @returns {String} the authentication flow type
	 */
	getAuthenticationFlowType() {
		return this.authenticationFlowType;
	}

	/**
	 * sets authentication flow type
	 * @param {string} authenticationFlowType New value.
	 * @returns {void}
	 */
	setAuthenticationFlowType(authenticationFlowType) {
		this.authenticationFlowType = authenticationFlowType;
	}

	/**
	 * This is used for authenticating the user through the custom authentication flow.
	 * @param {AuthenticationDetails} authDetails Contains the authentication data
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {customChallenge} callback.customChallenge Custom challenge
	 *        response required to continue.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @returns {void}
	 */
	initiateAuth(authDetails, callback) {
		const authParameters = authDetails.getAuthParameters();
		authParameters.USERNAME = this.username;

		const clientMetaData =
			Object.keys(authDetails.getValidationData()).length !== 0
				? authDetails.getValidationData()
				: authDetails.getClientMetadata();

		const jsonReq = {
			AuthFlow: 'CUSTOM_AUTH',
			ClientId: this.pool.getClientId(),
			AuthParameters: authParameters,
			ClientMetadata: clientMetaData,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}

		this.client.request('InitiateAuth', jsonReq, (err, data) => {
			if (err) {
				return callback.onFailure(err);
			}
			const challengeName = data.ChallengeName;
			const challengeParameters = data.ChallengeParameters;

			if (challengeName === 'CUSTOM_CHALLENGE') {
				this.Session = data.Session;
				return callback.customChallenge(challengeParameters);
			}
			this.signInUserSession = this.getCognitoUserSession(
				data.AuthenticationResult
			);
			this.cacheTokens();
			return callback.onSuccess(this.signInUserSession);
		});
	}

	/**
	 * This is used for authenticating the user.
	 * stuff
	 * @param {AuthenticationDetails} authDetails Contains the authentication data
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {newPasswordRequired} callback.newPasswordRequired new
	 *        password and any required attributes are required to continue
	 * @param {mfaRequired} callback.mfaRequired MFA code
	 *        required to continue.
	 * @param {customChallenge} callback.customChallenge Custom challenge
	 *        response required to continue.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @returns {void}
	 */
	authenticateUser(authDetails, callback) {
		if (this.authenticationFlowType === 'USER_PASSWORD_AUTH') {
			return this.authenticateUserPlainUsernamePassword(authDetails, callback);
		} else if (
			this.authenticationFlowType === 'USER_SRP_AUTH' ||
			this.authenticationFlowType === 'CUSTOM_AUTH'
		) {
			return this.authenticateUserDefaultAuth(authDetails, callback);
		}
		return callback.onFailure(
			new Error('Authentication flow type is invalid.')
		);
	}

	/**
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 * It calls the AuthenticationHelper for SRP related
	 * stuff
	 * @param {AuthenticationDetails} authDetails Contains the authentication data
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {newPasswordRequired} callback.newPasswordRequired new
	 *        password and any required attributes are required to continue
	 * @param {mfaRequired} callback.mfaRequired MFA code
	 *        required to continue.
	 * @param {customChallenge} callback.customChallenge Custom challenge
	 *        response required to continue.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @returns {void}
	 */
	authenticateUserDefaultAuth(authDetails, callback) {
		const authenticationHelper = new AuthenticationHelper(
			this.pool.getUserPoolId().split('_')[1]
		);
		const dateHelper = new DateHelper();

		let serverBValue;
		let salt;
		const authParameters = {};

		if (this.deviceKey != null) {
			authParameters.DEVICE_KEY = this.deviceKey;
		}

		authParameters.USERNAME = this.username;
		authenticationHelper.getLargeAValue((errOnAValue, aValue) => {
			// getLargeAValue callback start
			if (errOnAValue) {
				callback.onFailure(errOnAValue);
			}

			authParameters.SRP_A = aValue.toString(16);

			if (this.authenticationFlowType === 'CUSTOM_AUTH') {
				authParameters.CHALLENGE_NAME = 'SRP_A';
			}

			const clientMetaData =
				Object.keys(authDetails.getValidationData()).length !== 0
					? authDetails.getValidationData()
					: authDetails.getClientMetadata();

			const jsonReq = {
				AuthFlow: this.authenticationFlowType,
				ClientId: this.pool.getClientId(),
				AuthParameters: authParameters,
				ClientMetadata: clientMetaData,
			};
			if (this.getUserContextData(this.username)) {
				jsonReq.UserContextData = this.getUserContextData(this.username);
			}

			this.client.request('InitiateAuth', jsonReq, (err, data) => {
				if (err) {
					return callback.onFailure(err);
				}

				const challengeParameters = data.ChallengeParameters;

				this.username = challengeParameters.USER_ID_FOR_SRP;
				this.userDataKey = `${this.keyPrefix}.${this.username}.userData`;
				serverBValue = new BigInteger(challengeParameters.SRP_B, 16);
				salt = new BigInteger(challengeParameters.SALT, 16);
				this.getCachedDeviceKeyAndPassword();

				authenticationHelper.getPasswordAuthenticationKey(
					this.username,
					authDetails.getPassword(),
					serverBValue,
					salt,
					(errOnHkdf, hkdf) => {
						// getPasswordAuthenticationKey callback start
						if (errOnHkdf) {
							callback.onFailure(errOnHkdf);
						}

						const dateNow = dateHelper.getNowString();

						const message = CryptoJS.lib.WordArray.create(
							Buffer.concat([
								Buffer.from(this.pool.getUserPoolId().split('_')[1], 'utf8'),
								Buffer.from(this.username, 'utf8'),
								Buffer.from(challengeParameters.SECRET_BLOCK, 'base64'),
								Buffer.from(dateNow, 'utf8'),
							])
						);
						const key = CryptoJS.lib.WordArray.create(hkdf);
						const signatureString = Base64.stringify(HmacSHA256(message, key));

						const challengeResponses = {};

						challengeResponses.USERNAME = this.username;
						challengeResponses.PASSWORD_CLAIM_SECRET_BLOCK =
							challengeParameters.SECRET_BLOCK;
						challengeResponses.TIMESTAMP = dateNow;
						challengeResponses.PASSWORD_CLAIM_SIGNATURE = signatureString;

						if (this.deviceKey != null) {
							challengeResponses.DEVICE_KEY = this.deviceKey;
						}

						const respondToAuthChallenge = (challenge, challengeCallback) =>
							this.client.request(
								'RespondToAuthChallenge',
								challenge,
								(errChallenge, dataChallenge) => {
									if (
										errChallenge &&
										errChallenge.code === 'ResourceNotFoundException' &&
										errChallenge.message.toLowerCase().indexOf('device') !== -1
									) {
										challengeResponses.DEVICE_KEY = null;
										this.deviceKey = null;
										this.randomPassword = null;
										this.deviceGroupKey = null;
										this.clearCachedDeviceKeyAndPassword();
										return respondToAuthChallenge(challenge, challengeCallback);
									}
									return challengeCallback(errChallenge, dataChallenge);
								}
							);

						const jsonReqResp = {
							ChallengeName: 'PASSWORD_VERIFIER',
							ClientId: this.pool.getClientId(),
							ChallengeResponses: challengeResponses,
							Session: data.Session,
							ClientMetadata: clientMetaData,
						};
						if (this.getUserContextData()) {
							jsonReqResp.UserContextData = this.getUserContextData();
						}
						respondToAuthChallenge(
							jsonReqResp,
							(errAuthenticate, dataAuthenticate) => {
								if (errAuthenticate) {
									return callback.onFailure(errAuthenticate);
								}

								return this.authenticateUserInternal(
									dataAuthenticate,
									authenticationHelper,
									callback
								);
							}
						);
						return undefined;
						// getPasswordAuthenticationKey callback end
					}
				);
				return undefined;
			});
			// getLargeAValue callback end
		});
	}

	/**
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 * @param {AuthenticationDetails} authDetails Contains the authentication data.
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {mfaRequired} callback.mfaRequired MFA code
	 *        required to continue.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @returns {void}
	 */
	authenticateUserPlainUsernamePassword(authDetails, callback) {
		const authParameters = {};
		authParameters.USERNAME = this.username;
		authParameters.PASSWORD = authDetails.getPassword();
		if (!authParameters.PASSWORD) {
			callback.onFailure(new Error('PASSWORD parameter is required'));
			return;
		}
		const authenticationHelper = new AuthenticationHelper(
			this.pool.getUserPoolId().split('_')[1]
		);
		this.getCachedDeviceKeyAndPassword();
		if (this.deviceKey != null) {
			authParameters.DEVICE_KEY = this.deviceKey;
		}

		const clientMetaData =
			Object.keys(authDetails.getValidationData()).length !== 0
				? authDetails.getValidationData()
				: authDetails.getClientMetadata();

		const jsonReq = {
			AuthFlow: 'USER_PASSWORD_AUTH',
			ClientId: this.pool.getClientId(),
			AuthParameters: authParameters,
			ClientMetadata: clientMetaData,
		};
		if (this.getUserContextData(this.username)) {
			jsonReq.UserContextData = this.getUserContextData(this.username);
		}
		// USER_PASSWORD_AUTH happens in a single round-trip: client sends userName and password,
		// Cognito UserPools verifies password and returns tokens.
		this.client.request('InitiateAuth', jsonReq, (err, authResult) => {
			if (err) {
				return callback.onFailure(err);
			}
			return this.authenticateUserInternal(
				authResult,
				authenticationHelper,
				callback
			);
		});
	}

	/**
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 * @param {object} dataAuthenticate authentication data
	 * @param {object} authenticationHelper helper created
	 * @param {callback} callback passed on from caller
	 * @returns {void}
	 */
	authenticateUserInternal(dataAuthenticate, authenticationHelper, callback) {
		const challengeName = dataAuthenticate.ChallengeName;
		const challengeParameters = dataAuthenticate.ChallengeParameters;

		if (challengeName === 'SMS_MFA') {
			this.Session = dataAuthenticate.Session;
			return callback.mfaRequired(challengeName, challengeParameters);
		}

		if (challengeName === 'SELECT_MFA_TYPE') {
			this.Session = dataAuthenticate.Session;
			return callback.selectMFAType(challengeName, challengeParameters);
		}

		if (challengeName === 'MFA_SETUP') {
			this.Session = dataAuthenticate.Session;
			return callback.mfaSetup(challengeName, challengeParameters);
		}

		if (challengeName === 'SOFTWARE_TOKEN_MFA') {
			this.Session = dataAuthenticate.Session;
			return callback.totpRequired(challengeName, challengeParameters);
		}

		if (challengeName === 'CUSTOM_CHALLENGE') {
			this.Session = dataAuthenticate.Session;
			return callback.customChallenge(challengeParameters);
		}

		if (challengeName === 'NEW_PASSWORD_REQUIRED') {
			this.Session = dataAuthenticate.Session;

			let userAttributes = null;
			let rawRequiredAttributes = null;
			const requiredAttributes = [];
			const userAttributesPrefix = authenticationHelper.getNewPasswordRequiredChallengeUserAttributePrefix();

			if (challengeParameters) {
				userAttributes = JSON.parse(
					dataAuthenticate.ChallengeParameters.userAttributes
				);
				rawRequiredAttributes = JSON.parse(
					dataAuthenticate.ChallengeParameters.requiredAttributes
				);
			}

			if (rawRequiredAttributes) {
				for (let i = 0; i < rawRequiredAttributes.length; i++) {
					requiredAttributes[i] = rawRequiredAttributes[i].substr(
						userAttributesPrefix.length
					);
				}
			}
			return callback.newPasswordRequired(userAttributes, requiredAttributes);
		}

		if (challengeName === 'DEVICE_SRP_AUTH') {
			this.Session = dataAuthenticate.Session;
			this.getDeviceResponse(callback);
			return undefined;
		}

		this.signInUserSession = this.getCognitoUserSession(
			dataAuthenticate.AuthenticationResult
		);
		this.challengeName = challengeName;
		this.cacheTokens();

		const newDeviceMetadata =
			dataAuthenticate.AuthenticationResult.NewDeviceMetadata;
		if (newDeviceMetadata == null) {
			return callback.onSuccess(this.signInUserSession);
		}

		authenticationHelper.generateHashDevice(
			dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,
			dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey,
			errGenHash => {
				if (errGenHash) {
					return callback.onFailure(errGenHash);
				}

				const deviceSecretVerifierConfig = {
					Salt: Buffer.from(
						authenticationHelper.getSaltDevices(),
						'hex'
					).toString('base64'),
					PasswordVerifier: Buffer.from(
						authenticationHelper.getVerifierDevices(),
						'hex'
					).toString('base64'),
				};

				this.verifierDevices = deviceSecretVerifierConfig.PasswordVerifier;
				this.deviceGroupKey = newDeviceMetadata.DeviceGroupKey;
				this.randomPassword = authenticationHelper.getRandomPassword();

				this.client.request(
					'ConfirmDevice',
					{
						DeviceKey: newDeviceMetadata.DeviceKey,
						AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
						DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
						DeviceName: userAgent,
					},
					(errConfirm, dataConfirm) => {
						if (errConfirm) {
							return callback.onFailure(errConfirm);
						}

						this.deviceKey =
							dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey;
						this.cacheDeviceKeyAndPassword();
						if (dataConfirm.UserConfirmationNecessary === true) {
							return callback.onSuccess(
								this.signInUserSession,
								dataConfirm.UserConfirmationNecessary
							);
						}
						return callback.onSuccess(this.signInUserSession);
					}
				);
				return undefined;
			}
		);
		return undefined;
	}

	/**
	 * This method is user to complete the NEW_PASSWORD_REQUIRED challenge.
	 * Pass the new password with any new user attributes to be updated.
	 * User attribute keys must be of format userAttributes.<attribute_name>.
	 * @param {string} newPassword new password for this user
	 * @param {object} requiredAttributeData map with values for all required attributes
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {mfaRequired} callback.mfaRequired MFA code required to continue.
	 * @param {customChallenge} callback.customChallenge Custom challenge
	 *         response required to continue.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	completeNewPasswordChallenge(
		newPassword,
		requiredAttributeData,
		callback,
		clientMetadata
	) {
		if (!newPassword) {
			return callback.onFailure(new Error('New password is required.'));
		}
		const authenticationHelper = new AuthenticationHelper(
			this.pool.getUserPoolId().split('_')[1]
		);
		const userAttributesPrefix = authenticationHelper.getNewPasswordRequiredChallengeUserAttributePrefix();

		const finalUserAttributes = {};
		if (requiredAttributeData) {
			Object.keys(requiredAttributeData).forEach(key => {
				finalUserAttributes[userAttributesPrefix + key] =
					requiredAttributeData[key];
			});
		}

		finalUserAttributes.NEW_PASSWORD = newPassword;
		finalUserAttributes.USERNAME = this.username;
		const jsonReq = {
			ChallengeName: 'NEW_PASSWORD_REQUIRED',
			ClientId: this.pool.getClientId(),
			ChallengeResponses: finalUserAttributes,
			Session: this.Session,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}

		this.client.request(
			'RespondToAuthChallenge',
			jsonReq,
			(errAuthenticate, dataAuthenticate) => {
				if (errAuthenticate) {
					return callback.onFailure(errAuthenticate);
				}
				return this.authenticateUserInternal(
					dataAuthenticate,
					authenticationHelper,
					callback
				);
			}
		);
		return undefined;
	}

	/**
	 * This is used to get a session using device authentication. It is called at the end of user
	 * authentication
	 *
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 * @private
	 */
	getDeviceResponse(callback, clientMetadata) {
		const authenticationHelper = new AuthenticationHelper(this.deviceGroupKey);
		const dateHelper = new DateHelper();

		const authParameters = {};

		authParameters.USERNAME = this.username;
		authParameters.DEVICE_KEY = this.deviceKey;
		authenticationHelper.getLargeAValue((errAValue, aValue) => {
			// getLargeAValue callback start
			if (errAValue) {
				callback.onFailure(errAValue);
			}

			authParameters.SRP_A = aValue.toString(16);

			const jsonReq = {
				ChallengeName: 'DEVICE_SRP_AUTH',
				ClientId: this.pool.getClientId(),
				ChallengeResponses: authParameters,
				ClientMetadata: clientMetadata,
				Session: this.Session
			};
			if (this.getUserContextData()) {
				jsonReq.UserContextData = this.getUserContextData();
			}
			this.client.request('RespondToAuthChallenge', jsonReq, (err, data) => {
				if (err) {
					return callback.onFailure(err);
				}

				const challengeParameters = data.ChallengeParameters;

				const serverBValue = new BigInteger(challengeParameters.SRP_B, 16);
				const salt = new BigInteger(challengeParameters.SALT, 16);

				authenticationHelper.getPasswordAuthenticationKey(
					this.deviceKey,
					this.randomPassword,
					serverBValue,
					salt,
					(errHkdf, hkdf) => {
						// getPasswordAuthenticationKey callback start
						if (errHkdf) {
							return callback.onFailure(errHkdf);
						}

						const dateNow = dateHelper.getNowString();

						const message = CryptoJS.lib.WordArray.create(
							Buffer.concat([
								Buffer.from(this.deviceGroupKey, 'utf8'),
								Buffer.from(this.deviceKey, 'utf8'),
								Buffer.from(challengeParameters.SECRET_BLOCK, 'base64'),
								Buffer.from(dateNow, 'utf8'),
							])
						);
						const key = CryptoJS.lib.WordArray.create(hkdf);
						const signatureString = Base64.stringify(HmacSHA256(message, key));

						const challengeResponses = {};

						challengeResponses.USERNAME = this.username;
						challengeResponses.PASSWORD_CLAIM_SECRET_BLOCK =
							challengeParameters.SECRET_BLOCK;
						challengeResponses.TIMESTAMP = dateNow;
						challengeResponses.PASSWORD_CLAIM_SIGNATURE = signatureString;
						challengeResponses.DEVICE_KEY = this.deviceKey;

						const jsonReqResp = {
							ChallengeName: 'DEVICE_PASSWORD_VERIFIER',
							ClientId: this.pool.getClientId(),
							ChallengeResponses: challengeResponses,
							Session: data.Session,
						};
						if (this.getUserContextData()) {
							jsonReqResp.UserContextData = this.getUserContextData();
						}

						this.client.request(
							'RespondToAuthChallenge',
							jsonReqResp,
							(errAuthenticate, dataAuthenticate) => {
								if (errAuthenticate) {
									return callback.onFailure(errAuthenticate);
								}

								this.signInUserSession = this.getCognitoUserSession(
									dataAuthenticate.AuthenticationResult
								);
								this.cacheTokens();

								return callback.onSuccess(this.signInUserSession);
							}
						);
						return undefined;
						// getPasswordAuthenticationKey callback end
					}
				);
				return undefined;
			});
			// getLargeAValue callback end
		});
	}

	/**
	 * This is used for a certain user to confirm the registration by using a confirmation code
	 * @param {string} confirmationCode Code entered by user.
	 * @param {bool} forceAliasCreation Allow migrating from an existing email / phone number.
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	confirmRegistration(
		confirmationCode,
		forceAliasCreation,
		callback,
		clientMetadata
	) {
		const jsonReq = {
			ClientId: this.pool.getClientId(),
			ConfirmationCode: confirmationCode,
			Username: this.username,
			ForceAliasCreation: forceAliasCreation,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}
		this.client.request('ConfirmSignUp', jsonReq, err => {
			if (err) {
				return callback(err, null);
			}
			return callback(null, 'SUCCESS');
		});
	}

	/**
	 * This is used by the user once he has the responses to a custom challenge
	 * @param {string} answerChallenge The custom challenge answer.
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {customChallenge} callback.customChallenge
	 *    Custom challenge response required to continue.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	sendCustomChallengeAnswer(answerChallenge, callback, clientMetadata) {
		const challengeResponses = {};
		challengeResponses.USERNAME = this.username;
		challengeResponses.ANSWER = answerChallenge;

		const authenticationHelper = new AuthenticationHelper(
			this.pool.getUserPoolId().split('_')[1]
		);
		this.getCachedDeviceKeyAndPassword();
		if (this.deviceKey != null) {
			challengeResponses.DEVICE_KEY = this.deviceKey;
		}

		const jsonReq = {
			ChallengeName: 'CUSTOM_CHALLENGE',
			ChallengeResponses: challengeResponses,
			ClientId: this.pool.getClientId(),
			Session: this.Session,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}
		this.client.request('RespondToAuthChallenge', jsonReq, (err, data) => {
			if (err) {
				return callback.onFailure(err);
			}

			return this.authenticateUserInternal(
				data,
				authenticationHelper,
				callback
			);
		});
	}

	/**
	 * This is used by the user once he has an MFA code
	 * @param {string} confirmationCode The MFA code entered by the user.
	 * @param {object} callback Result callback map.
	 * @param {string} mfaType The mfa we are replying to.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {authSuccess} callback.onSuccess Called on success with the new session.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	sendMFACode(confirmationCode, callback, mfaType, clientMetadata) {
		const challengeResponses = {};
		challengeResponses.USERNAME = this.username;
		challengeResponses.SMS_MFA_CODE = confirmationCode;
		const mfaTypeSelection = mfaType || 'SMS_MFA';
		if (mfaTypeSelection === 'SOFTWARE_TOKEN_MFA') {
			challengeResponses.SOFTWARE_TOKEN_MFA_CODE = confirmationCode;
		}

		if (this.deviceKey != null) {
			challengeResponses.DEVICE_KEY = this.deviceKey;
		}

		const jsonReq = {
			ChallengeName: mfaTypeSelection,
			ChallengeResponses: challengeResponses,
			ClientId: this.pool.getClientId(),
			Session: this.Session,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}

		this.client.request(
			'RespondToAuthChallenge',
			jsonReq,
			(err, dataAuthenticate) => {
				if (err) {
					return callback.onFailure(err);
				}

				const challengeName = dataAuthenticate.ChallengeName;

				if (challengeName === 'DEVICE_SRP_AUTH') {
					this.getDeviceResponse(callback);
					return undefined;
				}

				this.signInUserSession = this.getCognitoUserSession(
					dataAuthenticate.AuthenticationResult
				);
				this.cacheTokens();

				if (dataAuthenticate.AuthenticationResult.NewDeviceMetadata == null) {
					return callback.onSuccess(this.signInUserSession);
				}

				const authenticationHelper = new AuthenticationHelper(
					this.pool.getUserPoolId().split('_')[1]
				);
				authenticationHelper.generateHashDevice(
					dataAuthenticate.AuthenticationResult.NewDeviceMetadata
						.DeviceGroupKey,
					dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey,
					errGenHash => {
						if (errGenHash) {
							return callback.onFailure(errGenHash);
						}

						const deviceSecretVerifierConfig = {
							Salt: Buffer.from(
								authenticationHelper.getSaltDevices(),
								'hex'
							).toString('base64'),
							PasswordVerifier: Buffer.from(
								authenticationHelper.getVerifierDevices(),
								'hex'
							).toString('base64'),
						};

						this.verifierDevices = deviceSecretVerifierConfig.PasswordVerifier;
						this.deviceGroupKey =
							dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey;
						this.randomPassword = authenticationHelper.getRandomPassword();

						this.client.request(
							'ConfirmDevice',
							{
								DeviceKey:
									dataAuthenticate.AuthenticationResult.NewDeviceMetadata
										.DeviceKey,
								AccessToken: this.signInUserSession
									.getAccessToken()
									.getJwtToken(),
								DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
								DeviceName: userAgent,
							},
							(errConfirm, dataConfirm) => {
								if (errConfirm) {
									return callback.onFailure(errConfirm);
								}

								this.deviceKey =
									dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey;
								this.cacheDeviceKeyAndPassword();
								if (dataConfirm.UserConfirmationNecessary === true) {
									return callback.onSuccess(
										this.signInUserSession,
										dataConfirm.UserConfirmationNecessary
									);
								}
								return callback.onSuccess(this.signInUserSession);
							}
						);
						return undefined;
					}
				);
				return undefined;
			}
		);
	}

	/**
	 * This is used by an authenticated user to change the current password
	 * @param {string} oldUserPassword The current password.
	 * @param {string} newUserPassword The requested new password.
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	changePassword(oldUserPassword, newUserPassword, callback, clientMetadata) {
		if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
			return callback(new Error('User is not authenticated'), null);
		}

		this.client.request(
			'ChangePassword',
			{
				PreviousPassword: oldUserPassword,
				ProposedPassword: newUserPassword,
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				ClientMetadata: clientMetadata,
			},
			err => {
				if (err) {
					return callback(err, null);
				}
				return callback(null, 'SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used by an authenticated user to enable MFA for itself
	 * @deprecated
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @returns {void}
	 */
	enableMFA(callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback(new Error('User is not authenticated'), null);
		}

		const mfaOptions = [];
		const mfaEnabled = {
			DeliveryMedium: 'SMS',
			AttributeName: 'phone_number',
		};
		mfaOptions.push(mfaEnabled);

		this.client.request(
			'SetUserSettings',
			{
				MFAOptions: mfaOptions,
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			err => {
				if (err) {
					return callback(err, null);
				}
				return callback(null, 'SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used by an authenticated user to enable MFA for itself
	 * @param {IMfaSettings} smsMfaSettings the sms mfa settings
	 * @param {IMFASettings} softwareTokenMfaSettings the software token mfa settings
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @returns {void}
	 */
	setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback(new Error('User is not authenticated'), null);
		}

		this.client.request(
			'SetUserMFAPreference',
			{
				SMSMfaSettings: smsMfaSettings,
				SoftwareTokenMfaSettings: softwareTokenMfaSettings,
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			err => {
				if (err) {
					return callback(err, null);
				}
				return callback(null, 'SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used by an authenticated user to disable MFA for itself
	 * @deprecated
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @returns {void}
	 */
	disableMFA(callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback(new Error('User is not authenticated'), null);
		}

		const mfaOptions = [];

		this.client.request(
			'SetUserSettings',
			{
				MFAOptions: mfaOptions,
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			err => {
				if (err) {
					return callback(err, null);
				}
				return callback(null, 'SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used by an authenticated user to delete itself
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	deleteUser(callback, clientMetadata) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback(new Error('User is not authenticated'), null);
		}

		this.client.request(
			'DeleteUser',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				ClientMetadata: clientMetadata,
			},
			err => {
				if (err) {
					return callback(err, null);
				}
				this.clearCachedUser();
				return callback(null, 'SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * @typedef {CognitoUserAttribute | { Name:string, Value:string }} AttributeArg
	 */
	/**
	 * This is used by an authenticated user to change a list of attributes
	 * @param {AttributeArg[]} attributes A list of the new user attributes.
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	updateAttributes(attributes, callback, clientMetadata) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback(new Error('User is not authenticated'), null);
		}

		this.client.request(
			'UpdateUserAttributes',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				UserAttributes: attributes,
				ClientMetadata: clientMetadata,
			},
			err => {
				if (err) {
					return callback(err, null);
				}

				// update cached user
				return this.getUserData(() => callback(null, 'SUCCESS'), {
					bypassCache: true,
				});
			}
		);
		return undefined;
	}

	/**
	 * This is used by an authenticated user to get a list of attributes
	 * @param {nodeCallback<CognitoUserAttribute[]>} callback Called on success or error.
	 * @returns {void}
	 */
	getUserAttributes(callback) {
		if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
			return callback(new Error('User is not authenticated'), null);
		}

		this.client.request(
			'GetUser',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			(err, userData) => {
				if (err) {
					return callback(err, null);
				}

				const attributeList = [];

				for (let i = 0; i < userData.UserAttributes.length; i++) {
					const attribute = {
						Name: userData.UserAttributes[i].Name,
						Value: userData.UserAttributes[i].Value,
					};
					const userAttribute = new CognitoUserAttribute(attribute);
					attributeList.push(userAttribute);
				}

				return callback(null, attributeList);
			}
		);
		return undefined;
	}

	/**
	 * This was previously used by an authenticated user to get MFAOptions,
	 * but no longer returns a meaningful response. Refer to the documentation for
	 * how to setup and use MFA: https://docs.amplify.aws/lib/auth/mfa/q/platform/js
	 * @deprecated
	 * @param {nodeCallback<MFAOptions>} callback Called on success or error.
	 * @returns {void}
	 */
	getMFAOptions(callback) {
		if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
			return callback(new Error('User is not authenticated'), null);
		}

		this.client.request(
			'GetUser',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			(err, userData) => {
				if (err) {
					return callback(err, null);
				}

				return callback(null, userData.MFAOptions);
			}
		);
		return undefined;
	}

	/**
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 */
	createGetUserRequest() {
		return this.client.promisifyRequest('GetUser', {
			AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
		});
	}

	/**
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 */
	refreshSessionIfPossible(options = {}) {
		// best effort, if not possible
		return new Promise(resolve => {
			const refresh = this.signInUserSession.getRefreshToken();
			if (refresh && refresh.getToken()) {
				this.refreshSession(refresh, resolve, options.clientMetadata);
			} else {
				resolve();
			}
		});
	}

	/**
	 * @typedef {Object} GetUserDataOptions
	 * @property {boolean} bypassCache - force getting data from Cognito service
	 * @property {Record<string, string>} clientMetadata - clientMetadata for getSession
	 */

	/**
	 * This is used by an authenticated users to get the userData
	 * @param {nodeCallback<UserData>} callback Called on success or error.
	 * @param {GetUserDataOptions} params
	 * @returns {void}
	 */
	getUserData(callback, params) {
		if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
			this.clearCachedUserData();
			return callback(new Error('User is not authenticated'), null);
		}

		const userData = this.getUserDataFromCache();

		if (!userData) {
			this.fetchUserData()
				.then(data => {
					callback(null, data);
				})
				.catch(callback);
			return;
		}

		if (this.isFetchUserDataAndTokenRequired(params)) {
			this.fetchUserData()
				.then(data => {
					return this.refreshSessionIfPossible(params).then(() => data);
				})
				.then(data => callback(null, data))
				.catch(callback);
			return;
		}

		try {
			callback(null, JSON.parse(userData));
			return;
		} catch (err) {
			this.clearCachedUserData();
			callback(err, null);
			return;
		}
	}

	/**
	 *
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 */
	getUserDataFromCache() {
		const userData = this.storage.getItem(this.userDataKey);

		return userData;
	}

	/**
	 *
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 */
	isFetchUserDataAndTokenRequired(params) {
		const { bypassCache = false } = params || {};

		return bypassCache;
	}
	/**
	 *
	 * PRIVATE ONLY: This is an internal only method and should not
	 * be directly called by the consumers.
	 */
	fetchUserData() {
		return this.createGetUserRequest().then(data => {
			this.cacheUserData(data);
			return data;
		});
	}

	/**
	 * This is used by an authenticated user to delete a list of attributes
	 * @param {string[]} attributeList Names of the attributes to delete.
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @returns {void}
	 */
	deleteAttributes(attributeList, callback) {
		if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
			return callback(new Error('User is not authenticated'), null);
		}

		this.client.request(
			'DeleteUserAttributes',
			{
				UserAttributeNames: attributeList,
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			err => {
				if (err) {
					return callback(err, null);
				}

				// update cached user
				return this.getUserData(() => callback(null, 'SUCCESS'), {
					bypassCache: true,
				});
			}
		);
		return undefined;
	}

	/**
	 * This is used by a user to resend a confirmation code
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	resendConfirmationCode(callback, clientMetadata) {
		const jsonReq = {
			ClientId: this.pool.getClientId(),
			Username: this.username,
			ClientMetadata: clientMetadata,
		};

		this.client.request('ResendConfirmationCode', jsonReq, (err, result) => {
			if (err) {
				return callback(err, null);
			}
			return callback(null, result);
		});
	}

	/**
	 * @typedef {Object} GetSessionOptions
	 * @property {Record<string, string>} clientMetadata - clientMetadata for getSession
	 */

	/**
	 * This is used to get a session, either from the session object
	 * or from  the local storage, or by using a refresh token
	 *
	 * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
	 * @param {GetSessionOptions} options
	 * @returns {void}
	 */
	getSession(callback, options = {}) {
		if (this.username == null) {
			return callback(
				new Error('Username is null. Cannot retrieve a new session'),
				null
			);
		}

		if (this.signInUserSession != null && this.signInUserSession.isValid()) {
			return callback(null, this.signInUserSession);
		}

		const keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}.${this.username
			}`;
		const idTokenKey = `${keyPrefix}.idToken`;
		const accessTokenKey = `${keyPrefix}.accessToken`;
		const refreshTokenKey = `${keyPrefix}.refreshToken`;
		const clockDriftKey = `${keyPrefix}.clockDrift`;

		if (this.storage.getItem(idTokenKey)) {
			const idToken = new CognitoIdToken({
				IdToken: this.storage.getItem(idTokenKey),
			});
			const accessToken = new CognitoAccessToken({
				AccessToken: this.storage.getItem(accessTokenKey),
			});
			const refreshToken = new CognitoRefreshToken({
				RefreshToken: this.storage.getItem(refreshTokenKey),
			});
			const clockDrift = parseInt(this.storage.getItem(clockDriftKey), 0) || 0;

			const sessionData = {
				IdToken: idToken,
				AccessToken: accessToken,
				RefreshToken: refreshToken,
				ClockDrift: clockDrift,
			};
			const cachedSession = new CognitoUserSession(sessionData);

			if (cachedSession.isValid()) {
				this.signInUserSession = cachedSession;
				return callback(null, this.signInUserSession);
			}

			if (!refreshToken.getToken()) {
				return callback(
					new Error('Cannot retrieve a new session. Please authenticate.'),
					null
				);
			}

			this.refreshSession(refreshToken, callback, options.clientMetadata);
		} else {
			callback(
				new Error('Local storage is missing an ID Token, Please authenticate'),
				null
			);
		}

		return undefined;
	}

	/**
	 * This uses the refreshToken to retrieve a new session
	 * @param {CognitoRefreshToken} refreshToken A previous session's refresh token.
	 * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	refreshSession(refreshToken, callback, clientMetadata) {
		const wrappedCallback = this.pool.wrapRefreshSessionCallback
			? this.pool.wrapRefreshSessionCallback(callback)
			: callback;
		const authParameters = {};
		authParameters.REFRESH_TOKEN = refreshToken.getToken();
		const keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}`;
		const lastUserKey = `${keyPrefix}.LastAuthUser`;

		if (this.storage.getItem(lastUserKey)) {
			this.username = this.storage.getItem(lastUserKey);
			const deviceKeyKey = `${keyPrefix}.${this.username}.deviceKey`;
			this.deviceKey = this.storage.getItem(deviceKeyKey);
			authParameters.DEVICE_KEY = this.deviceKey;
		}

		const jsonReq = {
			ClientId: this.pool.getClientId(),
			AuthFlow: 'REFRESH_TOKEN_AUTH',
			AuthParameters: authParameters,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}
		this.client.request('InitiateAuth', jsonReq, (err, authResult) => {
			if (err) {
				if (err.code === 'NotAuthorizedException') {
					this.clearCachedUser();
				}
				return wrappedCallback(err, null);
			}
			if (authResult) {
				const authenticationResult = authResult.AuthenticationResult;
				if (
					!Object.prototype.hasOwnProperty.call(
						authenticationResult,
						'RefreshToken'
					)
				) {
					authenticationResult.RefreshToken = refreshToken.getToken();
				}
				this.signInUserSession = this.getCognitoUserSession(
					authenticationResult
				);
				this.cacheTokens();
				return wrappedCallback(null, this.signInUserSession);
			}
			return undefined;
		});
	}

	/**
	 * This is used to save the session tokens to local storage
	 * @returns {void}
	 */
	cacheTokens() {
		const keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}`;
		const idTokenKey = `${keyPrefix}.${this.username}.idToken`;
		const accessTokenKey = `${keyPrefix}.${this.username}.accessToken`;
		const refreshTokenKey = `${keyPrefix}.${this.username}.refreshToken`;
		const clockDriftKey = `${keyPrefix}.${this.username}.clockDrift`;
		const lastUserKey = `${keyPrefix}.LastAuthUser`;

		this.storage.setItem(
			idTokenKey,
			this.signInUserSession.getIdToken().getJwtToken()
		);
		this.storage.setItem(
			accessTokenKey,
			this.signInUserSession.getAccessToken().getJwtToken()
		);
		this.storage.setItem(
			refreshTokenKey,
			this.signInUserSession.getRefreshToken().getToken()
		);
		this.storage.setItem(
			clockDriftKey,
			`${this.signInUserSession.getClockDrift()}`
		);
		this.storage.setItem(lastUserKey, this.username);
	}

	/**
	 * This is to cache user data
	 */
	cacheUserData(userData) {
		this.storage.setItem(this.userDataKey, JSON.stringify(userData));
	}

	/**
	 * This is to remove cached user data
	 */
	clearCachedUserData() {
		this.storage.removeItem(this.userDataKey);
	}

	clearCachedUser() {
		this.clearCachedTokens();
		this.clearCachedUserData();
	}

	/**
	 * This is used to cache the device key and device group and device password
	 * @returns {void}
	 */
	cacheDeviceKeyAndPassword() {
		const keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}.${this.username
			}`;
		const deviceKeyKey = `${keyPrefix}.deviceKey`;
		const randomPasswordKey = `${keyPrefix}.randomPasswordKey`;
		const deviceGroupKeyKey = `${keyPrefix}.deviceGroupKey`;

		this.storage.setItem(deviceKeyKey, this.deviceKey);
		this.storage.setItem(randomPasswordKey, this.randomPassword);
		this.storage.setItem(deviceGroupKeyKey, this.deviceGroupKey);
	}

	/**
	 * This is used to get current device key and device group and device password
	 * @returns {void}
	 */
	getCachedDeviceKeyAndPassword() {
		const keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}.${this.username
			}`;
		const deviceKeyKey = `${keyPrefix}.deviceKey`;
		const randomPasswordKey = `${keyPrefix}.randomPasswordKey`;
		const deviceGroupKeyKey = `${keyPrefix}.deviceGroupKey`;

		if (this.storage.getItem(deviceKeyKey)) {
			this.deviceKey = this.storage.getItem(deviceKeyKey);
			this.randomPassword = this.storage.getItem(randomPasswordKey);
			this.deviceGroupKey = this.storage.getItem(deviceGroupKeyKey);
		}
	}

	/**
	 * This is used to clear the device key info from local storage
	 * @returns {void}
	 */
	clearCachedDeviceKeyAndPassword() {
		const keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}.${this.username
			}`;
		const deviceKeyKey = `${keyPrefix}.deviceKey`;
		const randomPasswordKey = `${keyPrefix}.randomPasswordKey`;
		const deviceGroupKeyKey = `${keyPrefix}.deviceGroupKey`;

		this.storage.removeItem(deviceKeyKey);
		this.storage.removeItem(randomPasswordKey);
		this.storage.removeItem(deviceGroupKeyKey);
	}

	/**
	 * This is used to clear the session tokens from local storage
	 * @returns {void}
	 */
	clearCachedTokens() {
		const keyPrefix = `CognitoIdentityServiceProvider.${this.pool.getClientId()}`;
		const idTokenKey = `${keyPrefix}.${this.username}.idToken`;
		const accessTokenKey = `${keyPrefix}.${this.username}.accessToken`;
		const refreshTokenKey = `${keyPrefix}.${this.username}.refreshToken`;
		const lastUserKey = `${keyPrefix}.LastAuthUser`;
		const clockDriftKey = `${keyPrefix}.${this.username}.clockDrift`;

		this.storage.removeItem(idTokenKey);
		this.storage.removeItem(accessTokenKey);
		this.storage.removeItem(refreshTokenKey);
		this.storage.removeItem(lastUserKey);
		this.storage.removeItem(clockDriftKey);
	}

	/**
	 * This is used to build a user session from tokens retrieved in the authentication result
	 * @param {object} authResult Successful auth response from server.
	 * @returns {CognitoUserSession} The new user session.
	 * @private
	 */
	getCognitoUserSession(authResult) {
		const idToken = new CognitoIdToken(authResult);
		const accessToken = new CognitoAccessToken(authResult);
		const refreshToken = new CognitoRefreshToken(authResult);

		const sessionData = {
			IdToken: idToken,
			AccessToken: accessToken,
			RefreshToken: refreshToken,
		};

		return new CognitoUserSession(sessionData);
	}

	/**
	 * This is used to initiate a forgot password request
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {inputVerificationCode?} callback.inputVerificationCode
	 *    Optional callback raised instead of onSuccess with response data.
	 * @param {onSuccess} callback.onSuccess Called on success.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	forgotPassword(callback, clientMetadata) {
		const jsonReq = {
			ClientId: this.pool.getClientId(),
			Username: this.username,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}
		this.client.request('ForgotPassword', jsonReq, (err, data) => {
			if (err) {
				return callback.onFailure(err);
			}
			if (typeof callback.inputVerificationCode === 'function') {
				return callback.inputVerificationCode(data);
			}
			return callback.onSuccess(data);
		});
	}

	/**
	 * This is used to confirm a new password using a confirmationCode
	 * @param {string} confirmationCode Code entered by user.
	 * @param {string} newPassword Confirm new password.
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<void>} callback.onSuccess Called on success.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	confirmPassword(confirmationCode, newPassword, callback, clientMetadata) {
		const jsonReq = {
			ClientId: this.pool.getClientId(),
			Username: this.username,
			ConfirmationCode: confirmationCode,
			Password: newPassword,
			ClientMetadata: clientMetadata,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}
		this.client.request('ConfirmForgotPassword', jsonReq, err => {
			if (err) {
				return callback.onFailure(err);
			}
			return callback.onSuccess();
		});
	}

	/**
	 * This is used to initiate an attribute confirmation request
	 * @param {string} attributeName User attribute that needs confirmation.
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {inputVerificationCode} callback.inputVerificationCode Called on success.
	 * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
	 * @returns {void}
	 */
	getAttributeVerificationCode(attributeName, callback, clientMetadata) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}

		this.client.request(
			'GetUserAttributeVerificationCode',
			{
				AttributeName: attributeName,
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				ClientMetadata: clientMetadata,
			},
			(err, data) => {
				if (err) {
					return callback.onFailure(err);
				}
				if (typeof callback.inputVerificationCode === 'function') {
					return callback.inputVerificationCode(data);
				}
				return callback.onSuccess();
			}
		);
		return undefined;
	}

	/**
	 * This is used to confirm an attribute using a confirmation code
	 * @param {string} attributeName Attribute being confirmed.
	 * @param {string} confirmationCode Code entered by user.
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<string>} callback.onSuccess Called on success.
	 * @returns {void}
	 */
	verifyAttribute(attributeName, confirmationCode, callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}

		this.client.request(
			'VerifyUserAttribute',
			{
				AttributeName: attributeName,
				Code: confirmationCode,
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			err => {
				if (err) {
					return callback.onFailure(err);
				}
				return callback.onSuccess('SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used to get the device information using the current device key
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<*>} callback.onSuccess Called on success with device data.
	 * @returns {void}
	 */
	getDevice(callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}

		this.client.request(
			'GetDevice',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				DeviceKey: this.deviceKey,
			},
			(err, data) => {
				if (err) {
					return callback.onFailure(err);
				}
				return callback.onSuccess(data);
			}
		);
		return undefined;
	}

	/**
	 * This is used to forget a specific device
	 * @param {string} deviceKey Device key.
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<string>} callback.onSuccess Called on success.
	 * @returns {void}
	 */
	forgetSpecificDevice(deviceKey, callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}

		this.client.request(
			'ForgetDevice',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				DeviceKey: deviceKey,
			},
			err => {
				if (err) {
					return callback.onFailure(err);
				}
				return callback.onSuccess('SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used to forget the current device
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<string>} callback.onSuccess Called on success.
	 * @returns {void}
	 */
	forgetDevice(callback) {
		this.forgetSpecificDevice(this.deviceKey, {
			onFailure: callback.onFailure,
			onSuccess: result => {
				this.deviceKey = null;
				this.deviceGroupKey = null;
				this.randomPassword = null;
				this.clearCachedDeviceKeyAndPassword();
				return callback.onSuccess(result);
			},
		});
	}

	/**
	 * This is used to set the device status as remembered
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<string>} callback.onSuccess Called on success.
	 * @returns {void}
	 */
	setDeviceStatusRemembered(callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}

		this.client.request(
			'UpdateDeviceStatus',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				DeviceKey: this.deviceKey,
				DeviceRememberedStatus: 'remembered',
			},
			err => {
				if (err) {
					return callback.onFailure(err);
				}
				return callback.onSuccess('SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used to set the device status as not remembered
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<string>} callback.onSuccess Called on success.
	 * @returns {void}
	 */
	setDeviceStatusNotRemembered(callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}

		this.client.request(
			'UpdateDeviceStatus',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				DeviceKey: this.deviceKey,
				DeviceRememberedStatus: 'not_remembered',
			},
			err => {
				if (err) {
					return callback.onFailure(err);
				}
				return callback.onSuccess('SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used to list all devices for a user
	 *
	 * @param {int} limit the number of devices returned in a call
	 * @param {string | null} paginationToken the pagination token in case any was returned before
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<*>} callback.onSuccess Called on success with device list.
	 * @returns {void}
	 */
	listDevices(limit, paginationToken, callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}
		const requestParams = {
			AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			Limit: limit,
		};

		if (paginationToken) {
			requestParams.PaginationToken = paginationToken;
		}

		this.client.request('ListDevices', requestParams, (err, data) => {
			if (err) {
				return callback.onFailure(err);
			}
			return callback.onSuccess(data);
		});
		return undefined;
	}

	/**
	 * This is used to globally revoke all tokens issued to a user
	 * @param {object} callback Result callback map.
	 * @param {onFailure} callback.onFailure Called on any error.
	 * @param {onSuccess<string>} callback.onSuccess Called on success.
	 * @returns {void}
	 */
	globalSignOut(callback) {
		if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
			return callback.onFailure(new Error('User is not authenticated'));
		}

		this.client.request(
			'GlobalSignOut',
			{
				AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
			},
			err => {
				if (err) {
					return callback.onFailure(err);
				}
				this.clearCachedUser();
				return callback.onSuccess('SUCCESS');
			}
		);
		return undefined;
	}

	/**
	 * This is used for the user to signOut of the application and clear the cached tokens.
	 * @returns {void}
	 */
	signOut(revokeTokenCallback) {
		// If tokens won't be revoked, we just clean the client data.
		if (!revokeTokenCallback || typeof revokeTokenCallback !== "function") {
			this.cleanClientData();

			return;
		}

		this.getSession((error, _session) => {
			if (error) {
				return revokeTokenCallback(error);
			}

			this.revokeTokens((err) => {
				this.cleanClientData();

				revokeTokenCallback(err);
			});
		});
	}

	revokeTokens(revokeTokenCallback = () => { }) {
		if (typeof revokeTokenCallback !== 'function') {
			throw new Error('Invalid revokeTokenCallback. It should be a function.')
		}

		const tokensToBeRevoked = [];

		if (!this.signInUserSession) {
			const error = new Error('User is not authenticated');

			return revokeTokenCallback(error);
		}

		if (!this.signInUserSession.getAccessToken()) {
			const error = new Error('No Access token available');

			return revokeTokenCallback(error);
		}

		const refreshToken = this.signInUserSession.getRefreshToken().getToken();
		const accessToken = this.signInUserSession.getAccessToken();

		if (this.isSessionRevocable(accessToken)) {
			if (refreshToken) {
				return this.revokeToken({ token: refreshToken, callback: revokeTokenCallback });
			}
		}
		revokeTokenCallback();
	}

	isSessionRevocable(token) {
		if (token && typeof token.decodePayload === 'function') {
			try {
				const { origin_jti } = token.decodePayload();
				return !!origin_jti;
			} catch (err) {
				// Nothing to do, token doesnt have origin_jti claim
			}
		}

		return false;
	}

	cleanClientData() {
		this.signInUserSession = null;
		this.clearCachedUser();
	}

	revokeToken({ token, callback }) {
		this.client.requestWithRetry(
			'RevokeToken',
			{
				Token: token,
				ClientId: this.pool.getClientId()
			},
			err => {

				if (err) {
					return callback(err);
				}

				callback();
			}
		)
	}

	/**
	 * This is used by a user trying to select a given MFA
	 * @param {string} answerChallenge the mfa the user wants
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @returns {void}
	 */
	sendMFASelectionAnswer(answerChallenge, callback) {
		const challengeResponses = {};
		challengeResponses.USERNAME = this.username;
		challengeResponses.ANSWER = answerChallenge;

		const jsonReq = {
			ChallengeName: 'SELECT_MFA_TYPE',
			ChallengeResponses: challengeResponses,
			ClientId: this.pool.getClientId(),
			Session: this.Session,
		};
		if (this.getUserContextData()) {
			jsonReq.UserContextData = this.getUserContextData();
		}
		this.client.request('RespondToAuthChallenge', jsonReq, (err, data) => {
			if (err) {
				return callback.onFailure(err);
			}
			this.Session = data.Session;
			if (answerChallenge === 'SMS_MFA') {
				return callback.mfaRequired(
					data.ChallengeName,
					data.ChallengeParameters
				);
			}
			if (answerChallenge === 'SOFTWARE_TOKEN_MFA') {
				return callback.totpRequired(
					data.ChallengeName,
					data.ChallengeParameters
				);
			}
			return undefined;
		});
	}

	/**
	 * This returns the user context data for advanced security feature.
	 * @returns {string} the user context data from CognitoUserPool
	 */
	getUserContextData() {
		const pool = this.pool;
		return pool.getUserContextData(this.username);
	}

	/**
	 * This is used by an authenticated or a user trying to authenticate to associate a TOTP MFA
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @returns {void}
	 */
	associateSoftwareToken(callback) {
		if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
			this.client.request(
				'AssociateSoftwareToken',
				{
					Session: this.Session,
				},
				(err, data) => {
					if (err) {
						return callback.onFailure(err);
					}
					this.Session = data.Session;
					return callback.associateSecretCode(data.SecretCode);
				}
			);
		} else {
			this.client.request(
				'AssociateSoftwareToken',
				{
					AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
				},
				(err, data) => {
					if (err) {
						return callback.onFailure(err);
					}
					return callback.associateSecretCode(data.SecretCode);
				}
			);
		}
	}

	/**
	 * This is used by an authenticated or a user trying to authenticate to verify a TOTP MFA
	 * @param {string} totpCode The MFA code entered by the user.
	 * @param {string} friendlyDeviceName The device name we are assigning to the device.
	 * @param {nodeCallback<string>} callback Called on success or error.
	 * @returns {void}
	 */
	verifySoftwareToken(totpCode, friendlyDeviceName, callback) {
		if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
			this.client.request(
				'VerifySoftwareToken',
				{
					Session: this.Session,
					UserCode: totpCode,
					FriendlyDeviceName: friendlyDeviceName,
				},
				(err, data) => {
					if (err) {
						return callback.onFailure(err);
					}
					this.Session = data.Session;
					const challengeResponses = {};
					challengeResponses.USERNAME = this.username;
					const jsonReq = {
						ChallengeName: 'MFA_SETUP',
						ClientId: this.pool.getClientId(),
						ChallengeResponses: challengeResponses,
						Session: this.Session,
					};
					if (this.getUserContextData()) {
						jsonReq.UserContextData = this.getUserContextData();
					}
					this.client.request(
						'RespondToAuthChallenge',
						jsonReq,
						(errRespond, dataRespond) => {
							if (errRespond) {
								return callback.onFailure(errRespond);
							}
							this.signInUserSession = this.getCognitoUserSession(
								dataRespond.AuthenticationResult
							);
							this.cacheTokens();
							return callback.onSuccess(this.signInUserSession);
						}
					);
					return undefined;
				}
			);
		} else {
			this.client.request(
				'VerifySoftwareToken',
				{
					AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
					UserCode: totpCode,
					FriendlyDeviceName: friendlyDeviceName,
				},
				(err, data) => {
					if (err) {
						return callback.onFailure(err);
					}
					return callback.onSuccess(data);
				}
			);
		}
	}
}
