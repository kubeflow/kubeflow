import StorageHelper from '../src/StorageHelper';
import { MemoryStorage } from '../src/StorageHelper';

describe('StorageHelper unit test', () => {
	test('Constructor with local storage and operations defined', () => {
		var localStorageMock = (function() {
			var store = {};
			return {
				getItem: function(key) {
					return store[key];
				},
				setItem: function(key, value) {
					store[key] = value.toString();
				},
				clear: function() {
					store = {};
				},
				removeItem: function(key) {
					delete store[key];
				},
			};
		})();
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock,
			writable: true,
		});
		const storageHelper = new StorageHelper();
		expect(storageHelper.getStorage()).toBe(localStorageMock);
	});

	describe('operations when local storage is undefined', () => {
		test('Checking the constructor catches the exception', () => {
			window.localStorage = undefined;
			const storageHelper = new StorageHelper();
			expect(storageHelper.getStorage()).toBe(MemoryStorage);
		});

		test('Setting items in the MemoryStorage implementation', () => {
			const storageHelper = new StorageHelper();
			expect(storageHelper.getStorage().setItem('testKey', 'testValue')).toBe(
				'testValue'
			);
		});

		test('Getting items in the MemoryStorage implementation happy path', () => {
			const storageHelper = new StorageHelper();
			expect(storageHelper.getStorage().getItem('testKey')).toBe('testValue');
		});

		test('Getting items in the MemoryStorage implementation does not have key in MemoryStorage', () => {
			const storageHelper = new StorageHelper();
			expect(storageHelper.getStorage().getItem('newKey')).toBe(undefined);
		});

		test('Removing an item in the MemoryStorage implementation', () => {
			const storageHelper = new StorageHelper();
			expect(storageHelper.getStorage().removeItem('testKey')).toBe(true);
		});

		test('Clearing storage', () => {
			const storageHelper = new StorageHelper();
			expect(storageHelper.getStorage().clear()).toEqual({});
		});
	});
});
