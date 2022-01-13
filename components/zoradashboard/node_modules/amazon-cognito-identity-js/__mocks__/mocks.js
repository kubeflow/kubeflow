import Client from '../src/Client';
import AuthenticationHelper from '../src/AuthenticationHelper';
import {
	networkError,
	getSalt,
	getVerifiers,
	genHashDevices,
} from '../__tests__/constants';

/**
 * Mock a single network request to be either successful or fail with an optional data object
 * @param {boolean} success defines if a network request is successful
 * @param {object?} optional data to return onSuccess, some tests requires specific object values
 * @param {string?} optional operationName to provide clarity inside the testing function
 */
export function netRequestMockSuccess(success, data = {}) {
	if (success) {
		jest
			.spyOn(Client.prototype, 'request')
			.mockImplementationOnce((...[, , callback]) => {
				callback(null, data);
			});
	} else {
		jest
			.spyOn(Client.prototype, 'request')
			.mockImplementationOnce((...[, , callback]) => {
				callback(networkError, null);
			});
	}
}

/**
 *
 * @param {string} fnName function name within the AuthenticationHelper class
 * @returns mockImplemntation of the fnName or throw error
 */
export function authHelperMock(fnName) {
	let implementation = () => {
		throw new Error('Invalid property');
	};
	switch (fnName) {
		case genHashDevices:
			implementation = (...[, , callback]) => {
				callback(null, null);
			};
			break;
		case getSalt:
		case getVerifiers:
			implementation = () => {
				return 'deadbeef';
			};
			break;
	}
	jest
		.spyOn(AuthenticationHelper.prototype, fnName)
		.mockImplementationOnce(implementation);
}

export const callback = {
	onSuccess: jest.fn(),
	onFailure: jest.fn(),
	mfaRequired: jest.fn(),
	selectMFAType: jest.fn(),
	mfaSetup: jest.fn(),
	totpRequired: jest.fn(),
	customChallenge: jest.fn(),
	newPasswordRequired: jest.fn(),
	associateSecretCode: jest.fn(),
	inputVerificationCode: jest.fn(),
	associateSecretCode: jest.fn(),
};

export default callback;
