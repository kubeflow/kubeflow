export default class SuperTokensLock {
    private static waiters;
    private id;
    private acquiredIatSet;
    constructor();
    /**
     * @async
     * @memberOf Lock
     * @function acquireLock
     * @param {string} lockKey - Key for which the lock is being acquired
     * @param {number} [timeout=5000] - Maximum time for which the function will wait to acquire the lock
     * @returns {Promise<boolean>}
     * @description Will return true if lock is being acquired, else false.
     *              Also the lock can be acquired for maximum 10 secs
     */
    acquireLock(lockKey: string, timeout?: number): Promise<boolean>;
    private refreshLockWhileAcquired;
    private waitForSomethingToChange;
    private static addToWaiting;
    private static removeFromWaiting;
    private static notifyWaiters;
    /**
     * @function releaseLock
     * @memberOf Lock
     * @param {string} lockKey - Key for which lock is being released
     * @returns {void}
     * @description Release a lock.
     */
    releaseLock(lockKey: string): Promise<void>;
    /**
     * @function releaseLock
     * @memberOf Lock
     * @param {string} lockKey - Key for which lock is being released
     * @returns {void}
     * @description Release a lock.
     */
    private releaseLock__private__;
    /**
     * @function lockCorrector
     * @returns {void}
     * @description If a lock is acquired by a tab and the tab is closed before the lock is
     *              released, this function will release those locks
     */
    private static lockCorrector;
}
