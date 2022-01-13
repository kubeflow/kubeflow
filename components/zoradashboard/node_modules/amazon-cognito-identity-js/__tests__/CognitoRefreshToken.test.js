import CognitoRefreshToken from '../src/CognitoRefreshToken';
import { sampleEncodedToken } from './constants';

describe('Cognito Refresh Token ', () => {
	test('Testing getter method for a proper token', () => {
		const cognitoRefToken = new CognitoRefreshToken(sampleEncodedToken);
		expect(cognitoRefToken.getToken()).toBe(cognitoRefToken.token);
	});
	test('Testing getter method for a refresh token with no value', () => {
		const cognitoRefToken = new CognitoRefreshToken();
		expect(cognitoRefToken.getToken()).toBe('');
	});
});
