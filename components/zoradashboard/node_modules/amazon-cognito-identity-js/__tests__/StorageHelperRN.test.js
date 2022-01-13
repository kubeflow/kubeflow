describe('React native storage helper unit tests', () => {
	describe('Accessor methods', () => {
		beforeEach(() => {
			jest.resetModules();
		});

		var items = {};
		jest.mock('@react-native-async-storage/async-storage', () => ({
			setItem: jest.fn((item, value) => {
				return new Promise((resolve, reject) => {
					items[item] = value;
					resolve(value);
				});
			}),
			getItem: jest.fn((item, value) => {
				return new Promise((resolve, reject) => {
					resolve(items[item]);
				});
			}),
			removeItem: jest.fn(item => {
				return new Promise((resolve, reject) => {
					resolve(delete items[item]);
				});
			}),
		}));

		const StorageHelper = require('../src/StorageHelper-rn.js').default;
		const storageHelper = new StorageHelper();
		test('setting an item', () => {
			expect(
				storageHelper.getStorage().setItem('testKey', 'testValue')
			).toEqual('testValue');
		});
		test('getting an item', () => {
			expect(storageHelper.getStorage().getItem('testKey')).toEqual(
				'testValue'
			);
		});
		test('removing an item', () => {
			expect(storageHelper.getStorage().removeItem('testKey')).toEqual(true);
		});
		test('clearing the storage', () => {
			storageHelper.getStorage().setItem('item1', 'value1');
			expect(storageHelper.getStorage().clear()).toEqual({});
		});
	});

	describe('Testing StorageHelper sync', () => {
		beforeEach(() => {
			jest.resetModules();
		});
		test('Happy case for syncing', () => {
			const items = {
				'@MemoryStorage:key': 'value1',
			};
			jest.mock('@react-native-async-storage/async-storage', () => ({
				setItem: jest.fn((item, value) => {
					return new Promise((resolve, reject) => {
						items[item] = value;
						resolve(value);
					});
				}),
				getAllKeys: jest.fn(callback => {
					callback(null, Object.keys(items));
				}),
				multiGet: jest.fn((keys, callback) => {
					const values = keys.map(key => [key, items[key] || null]);
					callback && callback(null, values);

					return values;
				}),
			}));

			const StorageHelper = require('../src/StorageHelper-rn.js').default;
			const storageHelper = new StorageHelper();
			const callback = jest.fn();

			expect(storageHelper.getStorage().getItem('key')).toBeUndefined();
			storageHelper.getStorage().sync(callback);
			expect(callback.mock.calls[0][1]).toEqual('SUCCESS');
			expect(storageHelper.getStorage().getItem('key')).toEqual('value1');
		});

		test('Get all keys throws errors', () => {
			jest.mock('@react-native-async-storage/async-storage', () => ({
				getAllKeys: jest.fn(callback => {
					const err = ['errKey'];
					callback(err, null);
				}),
			}));

			const StorageHelper = require('../src/StorageHelper-rn.js').default;
			const storageHelper = new StorageHelper();
			const callback = jest.fn();
			storageHelper.getStorage().sync(callback);
			expect(callback.mock.calls[0][0]).toEqual(['errKey']);
		});
		test('Multiget throws errors', () => {
			var items = {};
			jest.mock('@react-native-async-storage/async-storage', () => ({
				getAllKeys: jest.fn(callback => {
					callback(null, Object.keys(items));
				}),
				multiGet: jest.fn((keys, callback) => {
					const values = keys.map(key => [key, items[key] || null]);
					const err = new Error('Storage Error');
					callback && callback(err, null);

					return values;
				}),
			}));

			const StorageHelper = require('../src/StorageHelper-rn.js').default;
			const storageHelper = new StorageHelper();
			const callback = jest.fn();
			storageHelper.getStorage().sync(callback);
			expect(callback.mock.calls[0][0]).toMatchObject(Error('Storage Error'));
		});
	});
});
