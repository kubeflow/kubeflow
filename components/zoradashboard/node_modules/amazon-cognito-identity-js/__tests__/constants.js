import {
	CognitoAccessToken,
	CognitoIdToken,
	CognitoRefreshToken,
	CognitoUserSession,
} from 'amazon-cognito-identity-js';

/** AuthDetails */
export const authDetailData = {
	ValidationData: {},
	Username: 'user@amzn.com',
	Password: 'abc123',
	AuthParameters: {},
	ClientMetadata: {},
};

export const authDetailDataWithValidationData = {
	...authDetailData,
	ValidationData: {
		testKey: 'test value',
		anotherKey: 'another value',
	},
};

/** AuthHelper */
export const bigIntError = new Error('BigInteger Error');

/** Client */
export const region = 'us-east-1';
export const endpoint = 'https://cognito-idp.us-east-1.amazonaws.com/';
export const fetchOptions = {};

/** CognitoJWT */
export const expDecoded = 1217742717705;
export const nameDecoded = 'John Doe';
export const iatDecoded = 1617566244000;
export const sampleEncodedToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMTc3NDI3MTc3MDUsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTYxNzU2NjI0NDAwMH0.hSVQZ0wsFlPNTh54b7qnY-hU-MQtJUBnlqgc6P8wwzQ';

/** CognitoUserAttribute */
export const testName = 'testName';
export const testValue = 'testValue';

/** CognitoUserSession 
 * 
 * Valid Token:
 * {
 *	"exp": "1717566244000",
 * 	"name": "John Doe",
 *	"iat": 1617566244000
 *	}

 * invalid token plaintext:
 * {
 *	"exp": "1717566244000",
 * 	"name": "[Refresh,Id, Access] Token",
 *	"iat": 1217566244000
 *	}
*/

// invalid token string
export const ivCognitoIdToken = new CognitoIdToken({
	IdToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMjE3NzQyNzE3NzA1IiwibmFtZSI6IklkIFRva2VuIiwiaWF0IjoxNjE3NTY2MjQ0MDAwfQ.Fgd2Np6mBVMMxDFrnij_YHlC2gEx2C6OT9uQiMCyufw',
});
export const ivRefreshToken = new CognitoRefreshToken({
	RefreshToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMjE3NzQyNzE3NzA1IiwibmFtZSI6IlJlZnJlc2ggVG9rZW4iLCJpYXQiOjE2MTc1NjYyNDQwMDB9.L5asUv2DOMOmKc5GMLo80mAAsy_TeOK17EhiMyTwk2U',
});
export const ivAccessToken = new CognitoAccessToken({
	AccessToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMjE3NzQyNzE3NzA1IiwibmFtZSI6IkFjY2VzcyBUb2tlbiIsImlhdCI6MTYxNzU2NjI0NDAwMH0.fov43VHqnJGFEzwHublLSDoL4RSZJCnoBuL-HLfoDHc',
});

//invalid UserSession
export const ivCognitoUserSession = new CognitoUserSession({
	IdToken: ivCognitoIdToken,
	RefreshToken: ivRefreshToken,
	AccessToken: ivAccessToken,
	ClockDrift: undefined,
});

//valid tokens
export const vCognitoIdToken = new CognitoIdToken({
	IdToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzE3NTY2MjQ0MDAwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjE3NTY2MjQ0MDAwfQ.zp6ciAC6pOozeyGKqVwCCxKwj_LspauWe8e1LGOpih4',
});
export const vAccessToken = new CognitoAccessToken({
	AccessToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzE3NTY2MjQ0MDAwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjE3NTY2MjQ0MDAwfQ.zp6ciAC6pOozeyGKqVwCCxKwj_LspauWe8e1LGOpih4',
});
export const vRefreshToken = new CognitoRefreshToken({
	RefreshToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzE3NTY2MjQ0MDAwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjE3NTY2MjQ0MDAwfQ.zp6ciAC6pOozeyGKqVwCCxKwj_LspauWe8e1LGOpih4',
});

//valid cognitoUserSession
export const vCognitoUserSession = new CognitoUserSession({
	IdToken: vCognitoIdToken,
	RefreshToken: vRefreshToken,
	AccessToken: vAccessToken,
	ClockDrift: undefined,
});

/** CognitoUserPool */
export const userPoolId = 'us-east-1_QdbSdK39m';
export const clientId = '3pu8tnp684l4lmlfoth25ojmd2';
export const userName = 'peculiarAmazonian';
export const password = 'Very$ecur3';

/** CookieStorage */
export const cookieStorageDomain = 'https://testdomain.com';

/** CognitoUser */
export const deviceName = 'friendlyMacbookPro';
export const totpCode = '492432';
export const networkError = new Error('Network Error');
export const genHashDevices = 'generateHashDevice';
export const getSalt = 'getSaltDevices';
export const getVerifiers = 'getVerifierDevices';
export const passwordErr = new Error('New password is required.');
