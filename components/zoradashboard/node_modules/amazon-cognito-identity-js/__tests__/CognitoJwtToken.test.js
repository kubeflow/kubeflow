import CognitoJwtToken from '../src/CognitoJwtToken';
import {
	sampleEncodedToken,
	expDecoded,
	nameDecoded,
	iatDecoded,
} from './constants';

describe('Accessor methods', () => {
	const cognitoJwtToken = new CognitoJwtToken(sampleEncodedToken);

	test('Getting JWT Token', () => {
		expect(cognitoJwtToken.getJwtToken()).toBe(sampleEncodedToken);
	});

	test('Getting expiration for JWT', () => {
		expect(cognitoJwtToken.getExpiration()).toBe(cognitoJwtToken.payload.exp);
	});

	test('Get time issued at for JWT', () => {
		expect(cognitoJwtToken.getIssuedAt()).toBe(cognitoJwtToken.payload.iat);
	});

	test('Testing decode payload method returns an object', () => {
		const decodedPayload = cognitoJwtToken.decodePayload();
		expect(decodedPayload.exp).toBe(expDecoded);
		expect(decodedPayload.name).toBe(nameDecoded);
		expect(decodedPayload.iat).toBe(iatDecoded);
	});

	test('Decoding error', () => {
		const badJWT = new CognitoJwtToken('incorrect Encoding');
		expect(badJWT.decodePayload()).toEqual({});
	});

	test('Bad parameters', () => {
		const noPayloadToken = new CognitoJwtToken();
		expect(noPayloadToken.getJwtToken()).toBe('');
	});
});
