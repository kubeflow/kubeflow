const crypto = require('crypto');

describe('cryptoSecureRandomInt test', () => {
	let windowSpy;

	beforeEach(() => {
		jest.resetModules();
		windowSpy = jest.spyOn(window, 'window', 'get');
	});

	afterEach(() => {
		windowSpy.mockRestore();
	});

	test('crypto is set for window (browser)', () => {
		windowSpy.mockImplementation(() => ({
			crypto: {
				getRandomValues: () => [12345],
			},
		}));

		const cryptoSecureRandomInt = require('../src/utils/cryptoSecureRandomInt')
			.default;
		expect(window.crypto).toBeTruthy();
		expect(cryptoSecureRandomInt()).toBe(12345);
	});

	test('crypto is set for window (IE 11)', () => {
		windowSpy.mockImplementation(() => ({
			crypto: undefined,
			msCrypto: {
				getRandomValues: () => [67890],
			},
		}));

		const cryptoSecureRandomInt = require('../src/utils/cryptoSecureRandomInt')
			.default;
		expect(window.msCrypto).toBeTruthy();
		expect(cryptoSecureRandomInt()).toBe(67890);
	});

	test('crypto is set for Node', () => {
		windowSpy.mockImplementation(() => ({
			crypto: null,
		}));

		const randomBytesMock = jest
			.spyOn(crypto, 'randomBytes')
			.mockImplementationOnce(() => ({
				readInt32LE: jest.fn().mockReturnValueOnce(54321),
			}));

		const cryptoSecureRandomInt = require('../src/utils/cryptoSecureRandomInt')
			.default;
		expect(cryptoSecureRandomInt()).toBe(54321);

		randomBytesMock.mockRestore();
	});
});
