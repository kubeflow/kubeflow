import UserAgent, { appendToCognitoUserAgent } from '../src/UserAgent';

const DEFAULT_USER_AGENT = 'aws-amplify/0.1.x js';

describe('UserAgent test', () => {
	beforeEach(() => {
		UserAgent.prototype.userAgent = DEFAULT_USER_AGENT;
	});
	test('userAgent is set by default', () => {
		expect(UserAgent.prototype.userAgent).toBe(DEFAULT_USER_AGENT);
	});

	test('appendToCognitoUserAgent does nothing to the userAgent if nothing is passed into it', () => {
		appendToCognitoUserAgent();
		expect(UserAgent.prototype.userAgent).toBe(DEFAULT_USER_AGENT);
	});

	test('appendToCognitoUserAgent appends content to userAgent', () => {
		appendToCognitoUserAgent('test');
		expect(UserAgent.prototype.userAgent).toBe(`${DEFAULT_USER_AGENT} test`);
	});

	test('appendToCognitoUserAgent does not append duplicate content', () => {
		appendToCognitoUserAgent('test');
		appendToCognitoUserAgent('test');
		expect(UserAgent.prototype.userAgent).not.toBe(
			`${DEFAULT_USER_AGENT} test test`
		);

		expect(UserAgent.prototype.userAgent).toBe(`${DEFAULT_USER_AGENT} test`);
	});

	test('appendToCognitoUserAgent sets userAgent if userAgent has no content', () => {
		UserAgent.prototype.userAgent = '';
		appendToCognitoUserAgent('test');
		expect(UserAgent.prototype.userAgent).toBe('test');

		UserAgent.prototype.userAgent = undefined;
		appendToCognitoUserAgent('test');
		expect(UserAgent.prototype.userAgent).toBe('test');
	});
});
