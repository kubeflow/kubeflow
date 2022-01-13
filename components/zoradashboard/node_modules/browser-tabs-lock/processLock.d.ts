declare class ProcessLocking {
    static instance: undefined | ProcessLocking;
    private locked;
    static getInstance(): ProcessLocking;
    private addToLocked;
    isLocked: (key: string) => boolean;
    lock: (key: string) => Promise<void>;
    unlock: (key: string) => void;
}
export default function getLock(): ProcessLocking;
export {};
