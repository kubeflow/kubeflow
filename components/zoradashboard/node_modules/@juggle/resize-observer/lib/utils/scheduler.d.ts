declare class Scheduler {
    private observer;
    private listener;
    stopped: boolean;
    constructor();
    private run;
    schedule(): void;
    private observe;
    start(): void;
    stop(): void;
}
declare const scheduler: Scheduler;
declare const updateCount: (n: number) => void;
export { scheduler, updateCount };
