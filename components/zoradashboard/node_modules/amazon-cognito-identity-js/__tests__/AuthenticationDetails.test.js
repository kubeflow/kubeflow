import AuthenticationDetails from '../src/AuthenticationDetails';
import { authDetailData } from './constants';

describe('AuthenticationDetails getter methods', () => {
	const authDetails = new AuthenticationDetails(authDetailData);

	test('getUsername() should return the instance username', () => {
		expect(authDetails.getUsername()).toEqual(authDetailData.Username);
	});

	test('getPassword()', () => {
		expect(authDetails.getPassword()).toEqual(authDetailData.Password);
	});

	test('getValidationData()', () => {
		expect(authDetails.getValidationData()).toEqual(
			authDetailData.ValidationData
		);
	});

	test('getAuthParameters()', () => {
		expect(authDetails.getAuthParameters()).toEqual(
			authDetailData.AuthParameters
		);
	});

	test('getClientMetadata()', () => {
		expect(authDetails.getClientMetadata()).toEqual(
			authDetailData.ClientMetadata
		);
	});
});
