import * as exported from '../src/index';

describe('import * keys', () => {
	it('should match snapshot', () => {
		expect(Object.keys(exported)).toMatchInlineSnapshot(`
		Array [
		  "AuthenticationDetails",
		  "AuthenticationHelper",
		  "CognitoAccessToken",
		  "CognitoIdToken",
		  "CognitoRefreshToken",
		  "CognitoUser",
		  "CognitoUserAttribute",
		  "CognitoUserPool",
		  "CognitoUserSession",
		  "CookieStorage",
		  "DateHelper",
		  "appendToCognitoUserAgent",
		  "WordArray",
		]
	`);
	});
});
