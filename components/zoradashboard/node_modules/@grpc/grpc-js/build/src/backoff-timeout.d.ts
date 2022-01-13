export interface BackoffOptions {
    initialDelay?: number;
    multiplier?: number;
    jitter?: number;
    maxDelay?: number;
}
export declare class BackoffTimeout {
    private callback;
    private initialDelay;
    private multiplier;
    private maxDelay;
    private jitter;
    private nextDelay;
    private timerId;
    private running;
    private hasRef;
    constructor(callback: () => void, options?: BackoffOptions);
    /**
     * Call the callback after the current amount of delay time
     */
    runOnce(): void;
    /**
     * Stop the timer. The callback will not be called until `runOnce` is called
     * again.
     */
    stop(): void;
    /**
     * Reset the delay time to its initial value.
     */
    reset(): void;
    isRunning(): boolean;
    ref(): void;
    unref(): void;
}
