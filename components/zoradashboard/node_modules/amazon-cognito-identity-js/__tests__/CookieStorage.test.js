import CookieStorage from '../src/CookieStorage';
import { cookieStorageDomain } from './constants';

/**
 * @jest-environment jsdom
 */

describe('Cookie Storage Unit Tests', () => {
	//defining a DOM to attach a cookie to
	Object.defineProperty(document, 'cookie', { writable: true });

	describe('Constructor methods', () => {
		test('Domain not supplied', () => {
			expect(() => {
				new CookieStorage({ domain: undefined });
			}).toThrowError('The domain of cookieStorage can not be undefined.');
		});

		test('Samesite value is undefined', () => {
			expect(() => {
				new CookieStorage({ domain: cookieStorageDomain, sameSite: undefined });
			}).toThrowError(
				'The sameSite value of cookieStorage must be "lax", "strict" or "none"'
			);
		});

		test('Samesite value is none while secure = false', () => {
			expect(() => {
				new CookieStorage({
					domain: cookieStorageDomain,
					secure: false,
					sameSite: 'none',
				});
			}).toThrowError(
				'sameSite = None requires the Secure attribute in latest browser versions.'
			);
		});

		test('Has an expiration value', () => {
			const cookieExpires = new CookieStorage({
				domain: cookieStorageDomain,
				secure: false,
				expires: 200,
			});
			expect(cookieExpires.expires).toBe(200);
		});

		describe('Setters and getters', () => {
			const cookieStoreData = { path: '/', domain: cookieStorageDomain };
			const cookieStore = new CookieStorage(cookieStoreData);

			test('getting an item', () => {
				cookieStore.setItem('testKey', 'testValue');
				expect(cookieStore.getItem('testKey')).toBe('testValue');
			});

			test('setting an item', () => {
				expect(cookieStore.setItem('domain', 'newdomain.com')).toBe(
					'newdomain.com'
				);
			});

			test('Clearing cookies should remove all items within the storage', () => {
				const cookieStore = new CookieStorage(cookieStoreData);
				cookieStore.setItem('testKey2', 'testValue');
				const tempReference = cookieStore.getItem();
				cookieStore.clear();
				expect(cookieStore.getItem()).not.toEqual(tempReference);
			});
		});
	});
});
