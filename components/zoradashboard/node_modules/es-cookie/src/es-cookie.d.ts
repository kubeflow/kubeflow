import { CookieAttributes } from './CookieAttributes';
export { CookieAttributes };
export declare function encode(name: string, value: string, attributes: CookieAttributes): string;
export declare function parse(cookieString: string): {
    [name: string]: string;
};
export declare function getAll(): {
    [name: string]: string;
};
export declare function get(name: string): string | undefined;
export declare function set(name: string, value: string, attributes?: CookieAttributes): void;
export declare function remove(name: string, attributes?: CookieAttributes): void;
