"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var processLock_1 = require("./processLock");
/**
 * @author: SuperTokens (https://github.com/supertokens)
 * This library was created as a part of a larger project, SuperTokens(https://supertokens.io) - the best session management solution.
 * You can also check out our other projects on https://github.com/supertokens
 *
 * To contribute to this package visit https://github.com/supertokens/browser-tabs-lock
 * If you face any problems you can file an issue on https://github.com/supertokens/browser-tabs-lock/issues
 *
 * If you have any questions or if you just want to say hi visit https://supertokens.io/discord
 */
/**
 * @constant
 * @type {string}
 * @default
 * @description All the locks taken by this package will have this as prefix
*/
var LOCK_STORAGE_KEY = 'browser-tabs-lock-key';
/**
 * @function delay
 * @param {number} milliseconds - How long the delay should be in terms of milliseconds
 * @returns {Promise<void>}
 */
function delay(milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
}
/**
 * @function generateRandomString
 * @params {number} length - How long the random string should be
 * @returns {string}
 * @description returns random string whose length is equal to the length passed as parameter
 */
function generateRandomString(length) {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var randomstring = '';
    for (var i = 0; i < length; i++) {
        var INDEX = Math.floor(Math.random() * CHARS.length);
        randomstring += CHARS[INDEX];
    }
    return randomstring;
}
/**
 * @function getLockId
 * @returns {string}
 * @description Generates an id which will be unique for the browser tab
 */
function getLockId() {
    return Date.now().toString() + generateRandomString(15);
}
var SuperTokensLock = /** @class */ (function () {
    function SuperTokensLock() {
        this.acquiredIatSet = new Set();
        this.id = getLockId();
        this.acquireLock = this.acquireLock.bind(this);
        this.releaseLock = this.releaseLock.bind(this);
        this.releaseLock__private__ = this.releaseLock__private__.bind(this);
        this.waitForSomethingToChange = this.waitForSomethingToChange.bind(this);
        this.refreshLockWhileAcquired = this.refreshLockWhileAcquired.bind(this);
        if (SuperTokensLock.waiters === undefined) {
            SuperTokensLock.waiters = [];
        }
    }
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
    SuperTokensLock.prototype.acquireLock = function (lockKey, timeout) {
        if (timeout === void 0) { timeout = 5000; }
        return __awaiter(this, void 0, void 0, function () {
            var iat, MAX_TIME, STORAGE_KEY, STORAGE, lockObj, TIMEOUT_KEY, lockObjPostDelay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iat = Date.now() + generateRandomString(4);
                        MAX_TIME = Date.now() + timeout;
                        STORAGE_KEY = LOCK_STORAGE_KEY + "-" + lockKey;
                        STORAGE = window.localStorage;
                        _a.label = 1;
                    case 1:
                        if (!(Date.now() < MAX_TIME)) return [3 /*break*/, 8];
                        return [4 /*yield*/, delay(30)];
                    case 2:
                        _a.sent();
                        lockObj = STORAGE.getItem(STORAGE_KEY);
                        if (!(lockObj === null)) return [3 /*break*/, 5];
                        TIMEOUT_KEY = this.id + "-" + lockKey + "-" + iat;
                        // there is a problem if setItem happens at the exact same time for 2 different processes.. so we add some random delay here.
                        return [4 /*yield*/, delay(Math.floor(Math.random() * 25))];
                    case 3:
                        // there is a problem if setItem happens at the exact same time for 2 different processes.. so we add some random delay here.
                        _a.sent();
                        STORAGE.setItem(STORAGE_KEY, JSON.stringify({
                            id: this.id,
                            iat: iat,
                            timeoutKey: TIMEOUT_KEY,
                            timeAcquired: Date.now(),
                            timeRefreshed: Date.now()
                        }));
                        return [4 /*yield*/, delay(30)];
                    case 4:
                        _a.sent(); // this is to prevent race conditions. This time must be more than the time it takes for storage.setItem
                        lockObjPostDelay = STORAGE.getItem(STORAGE_KEY);
                        if (lockObjPostDelay !== null) {
                            lockObjPostDelay = JSON.parse(lockObjPostDelay);
                            if (lockObjPostDelay.id === this.id && lockObjPostDelay.iat === iat) {
                                this.acquiredIatSet.add(iat);
                                this.refreshLockWhileAcquired(STORAGE_KEY, iat);
                                return [2 /*return*/, true];
                            }
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        SuperTokensLock.lockCorrector();
                        return [4 /*yield*/, this.waitForSomethingToChange(MAX_TIME)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        iat = Date.now() + generateRandomString(4);
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, false];
                }
            });
        });
    };
    SuperTokensLock.prototype.refreshLockWhileAcquired = function (storageKey, iat) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var STORAGE, lockObj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, processLock_1.default().lock(iat)];
                            case 1:
                                _a.sent();
                                if (!this.acquiredIatSet.has(iat)) {
                                    processLock_1.default().unlock(iat);
                                    return [2 /*return*/];
                                }
                                STORAGE = window.localStorage;
                                lockObj = STORAGE.getItem(storageKey);
                                if (lockObj !== null) {
                                    lockObj = JSON.parse(lockObj);
                                    lockObj.timeRefreshed = Date.now();
                                    STORAGE.setItem(storageKey, JSON.stringify(lockObj));
                                    processLock_1.default().unlock(iat);
                                }
                                else {
                                    processLock_1.default().unlock(iat);
                                    return [2 /*return*/];
                                }
                                this.refreshLockWhileAcquired(storageKey, iat);
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
            });
        });
    };
    SuperTokensLock.prototype.waitForSomethingToChange = function (MAX_TIME) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            var resolvedCalled = false;
                            var startedAt = Date.now();
                            var MIN_TIME_TO_WAIT = 50; // ms
                            var removedListeners = false;
                            function stopWaiting() {
                                if (!removedListeners) {
                                    window.removeEventListener('storage', stopWaiting);
                                    SuperTokensLock.removeFromWaiting(stopWaiting);
                                    clearTimeout(timeOutId);
                                    removedListeners = true;
                                }
                                if (!resolvedCalled) {
                                    resolvedCalled = true;
                                    var timeToWait = MIN_TIME_TO_WAIT - (Date.now() - startedAt);
                                    if (timeToWait > 0) {
                                        setTimeout(resolve, timeToWait);
                                    }
                                    else {
                                        resolve();
                                    }
                                }
                            }
                            window.addEventListener('storage', stopWaiting);
                            SuperTokensLock.addToWaiting(stopWaiting);
                            var timeOutId = setTimeout(stopWaiting, Math.max(0, MAX_TIME - Date.now()));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuperTokensLock.addToWaiting = function (func) {
        this.removeFromWaiting(func);
        if (SuperTokensLock.waiters === undefined) {
            return;
        }
        SuperTokensLock.waiters.push(func);
    };
    SuperTokensLock.removeFromWaiting = function (func) {
        if (SuperTokensLock.waiters === undefined) {
            return;
        }
        SuperTokensLock.waiters = SuperTokensLock.waiters.filter(function (i) { return i !== func; });
    };
    SuperTokensLock.notifyWaiters = function () {
        if (SuperTokensLock.waiters === undefined) {
            return;
        }
        var waiters = SuperTokensLock.waiters.slice(); // so that if Lock.waiters is changed it's ok.
        waiters.forEach(function (i) { return i(); });
    };
    /**
     * @function releaseLock
     * @memberOf Lock
     * @param {string} lockKey - Key for which lock is being released
     * @returns {void}
     * @description Release a lock.
     */
    SuperTokensLock.prototype.releaseLock = function (lockKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.releaseLock__private__(lockKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @function releaseLock
     * @memberOf Lock
     * @param {string} lockKey - Key for which lock is being released
     * @returns {void}
     * @description Release a lock.
     */
    SuperTokensLock.prototype.releaseLock__private__ = function (lockKey) {
        return __awaiter(this, void 0, void 0, function () {
            var STORAGE, STORAGE_KEY, lockObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        STORAGE = window.localStorage;
                        STORAGE_KEY = LOCK_STORAGE_KEY + "-" + lockKey;
                        lockObj = STORAGE.getItem(STORAGE_KEY);
                        if (lockObj === null) {
                            return [2 /*return*/];
                        }
                        lockObj = JSON.parse(lockObj);
                        if (!(lockObj.id === this.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, processLock_1.default().lock(lockObj.iat)];
                    case 1:
                        _a.sent();
                        this.acquiredIatSet.delete(lockObj.iat);
                        STORAGE.removeItem(STORAGE_KEY);
                        processLock_1.default().unlock(lockObj.iat);
                        SuperTokensLock.notifyWaiters();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @function lockCorrector
     * @returns {void}
     * @description If a lock is acquired by a tab and the tab is closed before the lock is
     *              released, this function will release those locks
     */
    SuperTokensLock.lockCorrector = function () {
        var MIN_ALLOWED_TIME = Date.now() - 5000;
        var STORAGE = window.localStorage;
        var KEYS = Object.keys(STORAGE);
        var notifyWaiters = false;
        for (var i = 0; i < KEYS.length; i++) {
            var LOCK_KEY = KEYS[i];
            if (LOCK_KEY.includes(LOCK_STORAGE_KEY)) {
                var lockObj = STORAGE.getItem(LOCK_KEY);
                if (lockObj !== null) {
                    lockObj = JSON.parse(lockObj);
                    if ((lockObj.timeRefreshed === undefined && lockObj.timeAcquired < MIN_ALLOWED_TIME) ||
                        (lockObj.timeRefreshed !== undefined && lockObj.timeRefreshed < MIN_ALLOWED_TIME)) {
                        STORAGE.removeItem(LOCK_KEY);
                        notifyWaiters = true;
                    }
                }
            }
        }
        if (notifyWaiters) {
            SuperTokensLock.notifyWaiters();
        }
    };
    SuperTokensLock.waiters = undefined;
    return SuperTokensLock;
}());
exports.default = SuperTokensLock;
