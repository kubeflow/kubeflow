export declare class InMemoryStore {
    db: Map<string, string>;
    getAllKeys: () => Promise<string[]>;
    multiGet: (keys: string[]) => Promise<any[]>;
    multiRemove: (keys: string[], callback?: any) => Promise<void>;
    multiSet: (entries: string[][], callback?: any) => Promise<void>;
    setItem: (key: string, value: string) => Promise<Map<string, string>>;
    removeItem: (key: string) => Promise<boolean>;
    getItem: (key: string) => Promise<string>;
}
export declare function createInMemoryStore(): InMemoryStore;
