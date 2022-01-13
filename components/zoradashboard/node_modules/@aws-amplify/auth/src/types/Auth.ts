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

import {
	ICookieStorageData,
	ICognitoStorage,
} from 'amazon-cognito-identity-js';

/**
 * Parameters for user sign up
 */
export interface SignUpParams {
	username: string;
	password: string;
	attributes?: object;
	validationData?: { [key: string]: any };
	clientMetadata?: { [key: string]: string };
}

export interface AuthCache {
	setItem();
	getItem();
	removeItem();
}

/**
 * Auth instance options
 */
export interface AuthOptions {
	userPoolId?: string;
	userPoolWebClientId?: string;
	identityPoolId?: string;
	region?: string;
	mandatorySignIn?: boolean;
	cookieStorage?: ICookieStorageData;
	oauth?: OAuthOpts;
	refreshHandlers?: object;
	storage?: ICognitoStorage;
	authenticationFlowType?: string;
	identityPoolRegion?: string;
	clientMetadata?: any;
	endpoint?: string;
}

export enum CognitoHostedUIIdentityProvider {
	Cognito = 'COGNITO',
	Google = 'Google',
	Facebook = 'Facebook',
	Amazon = 'LoginWithAmazon',
	Apple = 'SignInWithApple',
}

export type LegacyProvider =
	| 'google'
	| 'facebook'
	| 'amazon'
	| 'developer'
	| string;

export type FederatedSignInOptions = {
	provider: CognitoHostedUIIdentityProvider;
	customState?: string;
};

export type FederatedSignInOptionsCustom = {
	customProvider: string;
	customState?: string;
};

export function isFederatedSignInOptions(
	obj: any
): obj is FederatedSignInOptions {
	const keys: (keyof FederatedSignInOptions)[] = ['provider'];
	return obj && !!keys.find(k => obj.hasOwnProperty(k));
}

export function isFederatedSignInOptionsCustom(
	obj: any
): obj is FederatedSignInOptionsCustom {
	const keys: (keyof FederatedSignInOptionsCustom)[] = ['customProvider'];
	return obj && !!keys.find(k => obj.hasOwnProperty(k));
}

export function hasCustomState(obj: any): boolean {
	const keys: (keyof (
		| FederatedSignInOptions
		| FederatedSignInOptionsCustom
	))[] = ['customState'];
	return obj && !!keys.find(k => obj.hasOwnProperty(k));
}

/**
 * Details for multi-factor authentication
 */
export interface MfaRequiredDetails {
	challengeName: any;
	challengeParameters: any;
}

/**
 * interface for federatedResponse
 */
export interface FederatedResponse {
	// access token
	token: string;
	// identity id
	identity_id?: string;
	// the universal time when token expired
	expires_at: number;
}

/**
 * interface for federatedUser
 */
export interface FederatedUser {
	name: string;
	email?: string;
	picture?: string;
}

export interface AwsCognitoOAuthOpts {
	domain: string;
	scope: Array<string>;
	redirectSignIn: string;
	redirectSignOut: string;
	responseType: string;
	options?: object;
	urlOpener?: (url: string, redirectUrl: string) => Promise<any>;
}

export function isCognitoHostedOpts(
	oauth: OAuthOpts
): oauth is AwsCognitoOAuthOpts {
	return (<AwsCognitoOAuthOpts>oauth).redirectSignIn !== undefined;
}

export interface Auth0OAuthOpts {
	domain: string;
	clientID: string;
	scope: string;
	redirectUri: string;
	audience: string;
	responseType: string;
	returnTo: string;
	urlOpener?: (url: string, redirectUrl: string) => Promise<any>;
}

// Replacing to fix typings
// export interface OAuth {
//     awsCognito?: awsCognitoOAuthOpts,
//     auth0?: any
// }

export type OAuthOpts = AwsCognitoOAuthOpts | Auth0OAuthOpts;

export interface ConfirmSignUpOptions {
	forceAliasCreation?: boolean;
	clientMetadata?: ClientMetaData;
}

export interface SignOutOpts {
	global?: boolean;
}

export interface CurrentUserOpts {
	bypassCache: boolean;
}

export interface GetPreferredMFAOpts {
	bypassCache: boolean;
}

export type UsernamePasswordOpts = {
	username: string;
	password: string;
	validationData?: { [key: string]: any };
};

export enum AuthErrorTypes {
	NoConfig = 'noConfig',
	MissingAuthConfig = 'missingAuthConfig',
	EmptyUsername = 'emptyUsername',
	InvalidUsername = 'invalidUsername',
	EmptyPassword = 'emptyPassword',
	EmptyCode = 'emptyCode',
	SignUpError = 'signUpError',
	NoMFA = 'noMFA',
	InvalidMFA = 'invalidMFA',
	EmptyChallengeResponse = 'emptyChallengeResponse',
	NoUserSession = 'noUserSession',
	Default = 'default',
	DeviceConfig = 'deviceConfig',
	NetworkError = 'networkError',
}

export type AuthErrorMessages = { [key in AuthErrorTypes]: AuthErrorMessage };

export interface AuthErrorMessage {
	message: string;
	log?: string;
}

// We can extend this in the future if needed
export type SignInOpts = UsernamePasswordOpts;

export type ClientMetaData =
	| {
			[key: string]: string;
	  }
	| undefined;

export function isUsernamePasswordOpts(obj: any): obj is UsernamePasswordOpts {
	return !!(obj as UsernamePasswordOpts).username;
}

export interface IAuthDevice {
	id: string;
	name: string;
}
