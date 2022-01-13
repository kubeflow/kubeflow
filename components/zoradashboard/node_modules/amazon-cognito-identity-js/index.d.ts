declare module 'amazon-cognito-identity-js' {
	//import * as AWS from "aws-sdk";

	export type NodeCallback<E, T> = (err?: E, result?: T) => void;
	export namespace NodeCallback {
		export type Any = NodeCallback<Error | undefined, any>;
	}

	export interface CodeDeliveryDetails {
		AttributeName: string;
		DeliveryMedium: string;
		Destination: string;
	}

	export type ClientMetadata = { [key: string]: string } | undefined;

	export interface IAuthenticationCallback {
		onSuccess: (
			session: CognitoUserSession,
			userConfirmationNecessary?: boolean
		) => void;
		onFailure: (err: any) => void;
		newPasswordRequired?: (
			userAttributes: any,
			requiredAttributes: any
		) => void;
		mfaRequired?: (challengeName: any, challengeParameters: any) => void;
		totpRequired?: (challengeName: any, challengeParameters: any) => void;
		customChallenge?: (challengeParameters: any) => void;
		mfaSetup?: (challengeName: any, challengeParameters: any) => void;
		selectMFAType?: (challengeName: any, challengeParameters: any) => void;
	}

	export interface IMfaSettings {
		PreferredMfa: boolean;
		Enabled: boolean;
	}
	export interface IAuthenticationDetailsData {
		Username: string;
		Password?: string;
		ValidationData?: { [key: string]: any };
		ClientMetadata?: ClientMetadata;
	}

	export class AuthenticationDetails {
		constructor(data: IAuthenticationDetailsData);

		public getUsername(): string;
		public getPassword(): string;
		public getValidationData(): any[];
	}

	export interface ICognitoStorage {
		setItem(key: string, value: string): void;
		getItem(key: string): string | null;
		removeItem(key: string): void;
		clear(): void;
	}

	export interface ICognitoUserData {
		Username: string;
		Pool: CognitoUserPool;
		Storage?: ICognitoStorage;
	}

	export interface GetSessionOptions {
		clientMetadata: Record<string, string>;
	}

	export class CognitoUser {
		constructor(data: ICognitoUserData);

		public setSignInUserSession(signInUserSession: CognitoUserSession): void;
		public getSignInUserSession(): CognitoUserSession | null;
		public getUsername(): string;

		public getAuthenticationFlowType(): string;
		public setAuthenticationFlowType(authenticationFlowType: string): string;
		public getCachedDeviceKeyAndPassword(): void;

		public getSession(
			callback:
				| ((error: Error, session: null) => void)
				| ((error: null, session: CognitoUserSession) => void),
			options?: GetSessionOptions
		): void;
		public refreshSession(
			refreshToken: CognitoRefreshToken,
			callback: NodeCallback<any, any>,
			clientMetadata?: ClientMetadata
		): void;
		public authenticateUser(
			authenticationDetails: AuthenticationDetails,
			callbacks: IAuthenticationCallback
		): void;
		public initiateAuth(
			authenticationDetails: AuthenticationDetails,
			callbacks: IAuthenticationCallback
		): void;
		public confirmRegistration(
			code: string,
			forceAliasCreation: boolean,
			callback: NodeCallback<any, any>,
			clientMetadata?: ClientMetadata
		): void;
		public sendCustomChallengeAnswer(
			answerChallenge: any,
			callback: IAuthenticationCallback,
			clientMetaData?: ClientMetadata
		): void;
		public resendConfirmationCode(
			callback: NodeCallback<Error, any>,
			clientMetaData?: ClientMetadata
		): void;
		public changePassword(
			oldPassword: string,
			newPassword: string,
			callback: NodeCallback<Error, 'SUCCESS'>
		): void;
		public forgotPassword(
			callbacks: {
				onSuccess: (data: any) => void;
				onFailure: (err: Error) => void;
				inputVerificationCode?: (data: any) => void;
			},
			clientMetaData?: ClientMetadata
		): void;
		public confirmPassword(
			verificationCode: string,
			newPassword: string,
			callbacks: {
				onSuccess: () => void;
				onFailure: (err: Error) => void;
			},
			clientMetaData?: ClientMetadata
		): void;
		public setDeviceStatusRemembered(callbacks: {
			onSuccess: (success: string) => void;
			onFailure: (err: any) => void;
		}): void;
		public setDeviceStatusNotRemembered(callbacks: {
			onSuccess: (success: string) => void;
			onFailure: (err: any) => void;
		}): void;
		public getDevice(callbacks: {
			onSuccess: (success: string) => void;
			onFailure: (err: Error) => void;
		}): any;
		public forgetDevice(callbacks: {
			onSuccess: (success: string) => void;
			onFailure: (err: Error) => void;
		}): void;
		public forgetSpecificDevice(
			deviceKey: string,
			callbacks: {
				onSuccess: (success: string) => void;
				onFailure: (err: Error) => void;
			}
		): void;
		public sendMFACode(
			confirmationCode: string,
			callbacks: {
				onSuccess: (
					session: CognitoUserSession,
					userConfirmationNecessary?: boolean
				) => void;
				onFailure: (err: any) => void;
			},
			mfaType?: string,
			clientMetadata?: ClientMetadata
		): void;
		public listDevices(
			limit: number,
			paginationToken: string | null,
			callbacks: {
				onSuccess: (data: any) => void;
				onFailure: (err: Error) => void;
			}
		): void;
		public completeNewPasswordChallenge(
			newPassword: string,
			requiredAttributeData: any,
			callbacks: {
				onSuccess: (session: CognitoUserSession) => void;
				onFailure: (err: any) => void;
				mfaRequired?: (challengeName: any, challengeParameters: any) => void;
				customChallenge?: (challengeParameters: any) => void;
				mfaSetup?: (challengeName: any, challengeParameters: any) => void;
			},
			clientMetadata?: ClientMetadata
		): void;
		public signOut(callback?: () => void): void;
		public globalSignOut(callbacks: {
			onSuccess: (msg: string) => void;
			onFailure: (err: Error) => void;
		}): void;
		public verifyAttribute(
			attributeName: string,
			confirmationCode: string,
			callbacks: {
				onSuccess: (success: string) => void;
				onFailure: (err: Error) => void;
			}
		): void;
		public getUserAttributes(
			callback: NodeCallback<Error, CognitoUserAttribute[]>
		): void;
		public updateAttributes(
			attributes: (CognitoUserAttribute | ICognitoUserAttributeData)[],
			callback: NodeCallback<Error, string>
		): void;
		public deleteAttributes(
			attributeList: string[],
			callback: NodeCallback<Error, string>
		): void;
		public getAttributeVerificationCode(
			name: string,
			callback: {
				onSuccess: () => void;
				onFailure: (err: Error) => void;
				inputVerificationCode?: (data: string) => void | null;
			}
		): void;
		public deleteUser(callback: NodeCallback<Error, string>): void;
		public enableMFA(callback: NodeCallback<Error, string>): void;
		public disableMFA(callback: NodeCallback<Error, string>): void;
		public getMFAOptions(callback: NodeCallback<Error, MFAOption[]>): void;
		public getUserData(
			callback: NodeCallback<Error, UserData>,
			params?: any
		): void;
		public associateSoftwareToken(callbacks: {
			associateSecretCode: (secretCode: string) => void;
			onFailure: (err: any) => void;
		}): void;
		public verifySoftwareToken(
			totpCode: string,
			friendlyDeviceName: string,
			callbacks: {
				onSuccess: (session: CognitoUserSession) => void;
				onFailure: (err: Error) => void;
			}
		): void;
		public setUserMfaPreference(
			smsMfaSettings: IMfaSettings | null,
			softwareTokenMfaSettings: IMfaSettings | null,
			callback: NodeCallback<Error, string>
		): void;
		public sendMFASelectionAnswer(
			answerChallenge: string,
			callbacks: {
				onSuccess: (session: CognitoUserSession) => void;
				onFailure: (err: any) => void;
				mfaRequired?: (challengeName: any, challengeParameters: any) => void;
				totpRequired?: (challengeName: any, challengeParameters: any) => void;
			}
		): void;
	}

	export interface MFAOption {
		DeliveryMedium: 'SMS' | 'EMAIL';
		AttributeName: string;
	}

	export interface UserData {
		MFAOptions: MFAOption[];
		PreferredMfaSetting: string;
		UserAttributes: ICognitoUserAttributeData[];
		UserMFASettingList: string[];
		Username: string;
	}

	export interface ICognitoUserAttributeData {
		Name: string;
		Value: string;
	}

	export class CognitoUserAttribute implements ICognitoUserAttributeData {
		constructor(data: ICognitoUserAttributeData);

		Name: string;
		Value: string;

		public getValue(): string;
		public setValue(value: string): CognitoUserAttribute;
		public getName(): string;
		public setName(name: string): CognitoUserAttribute;
		public toString(): string;
		public toJSON(): Object;
	}

	export interface ISignUpResult {
		user: CognitoUser;
		userConfirmed: boolean;
		userSub: string;
		codeDeliveryDetails: CodeDeliveryDetails;
	}

	export interface ICognitoUserPoolData {
		UserPoolId: string;
		ClientId: string;
		endpoint?: string;
		Storage?: ICognitoStorage;
		AdvancedSecurityDataCollectionFlag?: boolean;
	}

	export class CognitoUserPool {
		constructor(
			data: ICognitoUserPoolData,
			wrapRefreshSessionCallback?: (
				target: NodeCallback.Any
			) => NodeCallback.Any
		);

		public getUserPoolId(): string;
		public getClientId(): string;

		public signUp(
			username: string,
			password: string,
			userAttributes: CognitoUserAttribute[],
			validationData: CognitoUserAttribute[],
			callback: NodeCallback<Error, ISignUpResult>,
			clientMetadata?: ClientMetadata
		): void;

		public getCurrentUser(): CognitoUser | null;
	}

	export interface ICognitoUserSessionData {
		IdToken: CognitoIdToken;
		AccessToken: CognitoAccessToken;
		RefreshToken?: CognitoRefreshToken;
	}

	export class CognitoUserSession {
		constructor(data: ICognitoUserSessionData);

		public getIdToken(): CognitoIdToken;
		public getRefreshToken(): CognitoRefreshToken;
		public getAccessToken(): CognitoAccessToken;
		public isValid(): boolean;
	}
	/*
    export class CognitoIdentityServiceProvider {
        public config: AWS.CognitoIdentityServiceProvider.Types.ClientConfiguration;
    }
    */
	export class CognitoAccessToken {
		payload: { [key: string]: any };

		constructor({ AccessToken }: { AccessToken: string });

		public getJwtToken(): string;
		public getExpiration(): number;
		public getIssuedAt(): number;
		public decodePayload(): { [id: string]: any };
	}

	export class CognitoIdToken {
		payload: { [key: string]: any };

		constructor({ IdToken }: { IdToken: string });

		public getJwtToken(): string;
		public getExpiration(): number;
		public getIssuedAt(): number;
		public decodePayload(): { [id: string]: any };
	}

	export class CognitoRefreshToken {
		constructor({ RefreshToken }: { RefreshToken: string });

		public getToken(): string;
	}

	export interface ICookieStorageData {
		domain: string;
		path?: string;
		expires?: number;
		secure?: boolean;
		sameSite?: 'strict' | 'lax' | 'none';
	}
	export class CookieStorage implements ICognitoStorage {
		constructor(data: ICookieStorageData);
		setItem(key: string, value: string): void;
		getItem(key: string): string;
		removeItem(key: string): void;
		clear(): void;
	}

	export class UserAgent {
		constructor();
	}

	export const appendToCognitoUserAgent: (content: string) => void;

	export class WordArray {
		constructor(words?: string[], sigBytes?: number);
		random(nBytes: number): WordArray;
		toString(): string;
	}
}
