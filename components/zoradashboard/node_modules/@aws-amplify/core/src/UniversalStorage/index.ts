import Cookies from 'universal-cookie';
import { browserOrNode } from '../JS';

type Store = Record<string, string>;

const { isBrowser } = browserOrNode();

// Avoid using @types/next because @aws-amplify/ui-angular's version of TypeScript is too old to support it
type Context = { req?: any };

export class UniversalStorage implements Storage {
	cookies = new Cookies();
	store: Store = isBrowser ? window.localStorage : Object.create(null);

	constructor(context: Context = {}) {
		this.cookies = context.req
			? new Cookies(context.req.headers.cookie)
			: new Cookies();

		Object.assign(this.store, this.cookies.getAll());
	}

	get length() {
		return Object.entries(this.store).length;
	}

	clear() {
		Array.from(new Array(this.length))
			.map((_, i) => this.key(i))
			.forEach(key => this.removeItem(key));
	}

	getItem(key: keyof Store) {
		return this.getLocalItem(key);
	}

	protected getLocalItem(key: keyof Store) {
		return Object.prototype.hasOwnProperty.call(this.store, key)
			? this.store[key]
			: null;
	}

	protected getUniversalItem(key: keyof Store) {
		return this.cookies.get(key);
	}

	key(index: number) {
		return Object.keys(this.store)[index];
	}

	removeItem(key: string) {
		this.removeLocalItem(key);
		this.removeUniversalItem(key);
	}

	protected removeLocalItem(key: keyof Store) {
		delete this.store[key];
	}

	protected removeUniversalItem(key: keyof Store) {
		this.cookies.remove(key, {
			path: '/',
		});
	}

	setItem(key: keyof Store, value: string) {
		this.setLocalItem(key, value);

		// keys take the shape:
		//  1. `${ProviderPrefix}.${userPoolClientId}.${username}.${tokenType}
		//  2. `${ProviderPrefix}.${userPoolClientId}.LastAuthUser
		const tokenType = key.split('.').pop();

		switch (tokenType) {
			// LastAuthUser is needed for computing other key names
			case 'LastAuthUser':

			// accessToken is required for CognitoUserSession
			case 'accessToken':

			// Required for CognitoUserSession
			case 'idToken':
				this.setUniversalItem(key, value);

			// userData is used when `Auth.currentAuthenticatedUser({ bypassCache: false })`.
			// Can be persisted to speed up calls to `Auth.currentAuthenticatedUser()`
			// case 'userData':

			// refreshToken isn't shared with the server so that the client handles refreshing
			// case 'refreshToken':

			// Ignoring clockDrift on the server for now, but needs testing
			// case 'clockDrift':
		}
	}

	protected setLocalItem(key: keyof Store, value: string) {
		this.store[key] = value;
	}

	protected setUniversalItem(key: keyof Store, value: string) {
		this.cookies.set(key, value, {
			path: '/',
			// `httpOnly` cannot be set via JavaScript: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#JavaScript_access_using_Document.cookie
			sameSite: true,
			// Allow unsecure requests to http://localhost:3000/ when in development.
			secure: window.location.hostname === 'localhost' ? false : true,
		});
	}
}
