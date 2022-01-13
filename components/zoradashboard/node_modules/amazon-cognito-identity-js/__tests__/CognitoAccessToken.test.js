import CognitoAccessToken from '../src/CognitoAccessToken';
import { expDecoded, sampleEncodedToken } from './constants';

describe('Constructor methods', () => {
	test('Constructor works given a token as a string', () => {
		const cognitoAccess = new CognitoAccessToken({
			AccessToken: sampleEncodedToken,
		});
		expect(cognitoAccess.decodePayload().exp).toBe(expDecoded);
	});

	test('Constructor works with no token', () => {
		const cognitoAccess = new CognitoAccessToken();
		expect(cognitoAccess.decodePayload()).toEqual({});
	});
});
