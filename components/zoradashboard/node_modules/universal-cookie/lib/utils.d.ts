import { Cookie, CookieGetOptions, CookieParseOptions } from './types';
export declare function hasDocumentCookie(): boolean;
export declare function cleanCookies(): void;
export declare function parseCookies(cookies?: string | object | null, options?: CookieParseOptions): object;
export declare function isParsingCookie(value: Cookie, doNotParse?: boolean): boolean;
export declare function readCookie(value: Cookie, options?: CookieGetOptions): any;
