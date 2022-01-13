import UserAgent from '../src/UserAgent';
import { version } from '../src/Platform/version';

describe('User agent version', () => {
	test('getUserAgent version match', () => {
		const userAgent = new UserAgent();
		expect(userAgent.userAgent).toEqual(`aws-amplify/${version} js`);
	});
})