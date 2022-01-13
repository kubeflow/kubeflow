import Cookies from 'universal-cookie';
declare type Store = Record<string, string>;
declare type Context = {
    req?: any;
};
export declare class UniversalStorage implements Storage {
    cookies: Cookies;
    store: Store;
    constructor(context?: Context);
    get length(): number;
    clear(): void;
    getItem(key: keyof Store): string;
    protected getLocalItem(key: keyof Store): string;
    protected getUniversalItem(key: keyof Store): any;
    key(index: number): string;
    removeItem(key: string): void;
    protected removeLocalItem(key: keyof Store): void;
    protected removeUniversalItem(key: keyof Store): void;
    setItem(key: keyof Store, value: string): void;
    protected setLocalItem(key: keyof Store, value: string): void;
    protected setUniversalItem(key: keyof Store, value: string): void;
}
export {};
