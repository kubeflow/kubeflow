import { Cookie, CookieChangeListener, CookieGetOptions, CookieParseOptions, CookieSetOptions } from './types';
export default class Cookies {
    private cookies;
    private changeListeners;
    private HAS_DOCUMENT_COOKIE;
    constructor(cookies?: string | object | null, options?: CookieParseOptions);
    private _updateBrowserValues;
    private _emitChange;
    get(name: string, options?: CookieGetOptions): any;
    get<T>(name: string, options?: CookieGetOptions): T;
    getAll(options?: CookieGetOptions): any;
    getAll<T>(options?: CookieGetOptions): T;
    set(name: string, value: Cookie, options?: CookieSetOptions): void;
    remove(name: string, options?: CookieSetOptions): void;
    addChangeListener(callback: CookieChangeListener): void;
    removeChangeListener(callback: CookieChangeListener): void;
}
