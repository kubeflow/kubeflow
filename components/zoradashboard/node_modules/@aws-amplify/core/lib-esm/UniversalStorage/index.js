import Cookies from 'universal-cookie';
import { browserOrNode } from '../JS';
var isBrowser = browserOrNode().isBrowser;
var UniversalStorage = /** @class */ (function () {
    function UniversalStorage(context) {
        if (context === void 0) { context = {}; }
        this.cookies = new Cookies();
        this.store = isBrowser ? window.localStorage : Object.create(null);
        this.cookies = context.req
            ? new Cookies(context.req.headers.cookie)
            : new Cookies();
        Object.assign(this.store, this.cookies.getAll());
    }
    Object.defineProperty(UniversalStorage.prototype, "length", {
        get: function () {
            return Object.entries(this.store).length;
        },
        enumerable: true,
        configurable: true
    });
    UniversalStorage.prototype.clear = function () {
        var _this = this;
        Array.from(new Array(this.length))
            .map(function (_, i) { return _this.key(i); })
            .forEach(function (key) { return _this.removeItem(key); });
    };
    UniversalStorage.prototype.getItem = function (key) {
        return this.getLocalItem(key);
    };
    UniversalStorage.prototype.getLocalItem = function (key) {
        return Object.prototype.hasOwnProperty.call(this.store, key)
            ? this.store[key]
            : null;
    };
    UniversalStorage.prototype.getUniversalItem = function (key) {
        return this.cookies.get(key);
    };
    UniversalStorage.prototype.key = function (index) {
        return Object.keys(this.store)[index];
    };
    UniversalStorage.prototype.removeItem = function (key) {
        this.removeLocalItem(key);
        this.removeUniversalItem(key);
    };
    UniversalStorage.prototype.removeLocalItem = function (key) {
        delete this.store[key];
    };
    UniversalStorage.prototype.removeUniversalItem = function (key) {
        this.cookies.remove(key, {
            path: '/',
        });
    };
    UniversalStorage.prototype.setItem = function (key, value) {
        this.setLocalItem(key, value);
        // keys take the shape:
        //  1. `${ProviderPrefix}.${userPoolClientId}.${username}.${tokenType}
        //  2. `${ProviderPrefix}.${userPoolClientId}.LastAuthUser
        var tokenType = key.split('.').pop();
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
    };
    UniversalStorage.prototype.setLocalItem = function (key, value) {
        this.store[key] = value;
    };
    UniversalStorage.prototype.setUniversalItem = function (key, value) {
        this.cookies.set(key, value, {
            path: '/',
            // `httpOnly` cannot be set via JavaScript: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#JavaScript_access_using_Document.cookie
            sameSite: true,
            // Allow unsecure requests to http://localhost:3000/ when in development.
            secure: window.location.hostname === 'localhost' ? false : true,
        });
    };
    return UniversalStorage;
}());
export { UniversalStorage };
//# sourceMappingURL=index.js.map