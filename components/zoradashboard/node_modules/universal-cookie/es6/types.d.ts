export declare type Cookie = any;
export interface CookieGetOptions {
    doNotParse?: boolean;
}
export interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
    encode?: (value: string) => string;
}
export interface CookieChangeOptions {
    name: string;
    value?: any;
    options?: CookieSetOptions;
}
export interface CookieParseOptions {
    decode: (value: string) => string;
}
export declare type CookieChangeListener = (options: CookieChangeOptions) => void;
