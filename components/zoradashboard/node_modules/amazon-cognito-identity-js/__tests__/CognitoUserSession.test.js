import CognitoUserSession from '../src/CognitoUserSession';
import {
	ivCognitoUserSession,
	ivAccessToken,
	ivCognitoIdToken,
	ivRefreshToken,
	vRefreshToken,
	vAccessToken,
	vCognitoIdToken,
	vRefreshToken,
	vCognitoUserSession,
} from './constants.js';

describe('Getters for a valid Cognito Session', () => {
	test('Getting access token', () => {
		expect(vCognitoUserSession.getIdToken()).toBe(vCognitoIdToken);
	});

	test('Getting refresh token', () => {
		expect(vCognitoUserSession.getRefreshToken()).toBe(vRefreshToken);
	});

	test('Getting access token', () => {
		expect(vCognitoUserSession.getAccessToken()).toBe(vAccessToken);
	});

	test('Access token undefined', () => {
		expect(() => {
			new CognitoUserSession({
				IdToken: vCognitoIdToken,
				RefreshToken: vRefreshToken,
				AccessToken: null,
				ClockDrift: undefined,
			});
		}).toThrowError('Id token and Access Token must be present.');
	});
});

describe('Getters for an invalid Cognito Session', () => {
	test('Getting access token', () => {
		expect(ivCognitoUserSession.getIdToken()).toBe(ivCognitoIdToken);
	});

	test('Getting refresh token', () => {
		expect(ivCognitoUserSession.getRefreshToken()).toBe(ivRefreshToken);
	});

	test('Getting access token', () => {
		expect(ivCognitoUserSession.getAccessToken()).toBe(ivAccessToken);
	});

	test('Access token undefined', () => {
		expect(() => {
			new CognitoUserSession({
				IdToken: ivCognitoIdToken,
				RefreshToken: ivRefreshToken,
				AccessToken: null,
				ClockDrift: undefined,
			});
		}).toThrowError('Id token and Access Token must be present.');
	});
});

describe('Calculations for Cognito User Attributes', () => {
	test('Calculate a clock drift to be the difference from now and the min of idToken and access token', () => {
		const currDate = Math.floor(new Date() / 1000);
		const idToken = ivCognitoUserSession.getIdToken().getIssuedAt();
		const accessToken = ivCognitoUserSession.getAccessToken().getIssuedAt();
		const min = Math.min(idToken, accessToken);
		const expectedValue = currDate - min;

		expect(ivCognitoUserSession.calculateClockDrift()).toBe(expectedValue);
	});

	test('JWT Expiration was hard-coded to be a time in the past so that this is guaranteed to be an invalid token', () => {
		expect(ivCognitoUserSession.isValid()).toBe(false);
	});
});
