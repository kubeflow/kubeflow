"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessLocking = /** @class */ (function () {
    function ProcessLocking() {
        var _this = this;
        this.locked = new Map();
        this.addToLocked = function (key, toAdd) {
            var callbacks = _this.locked.get(key);
            if (callbacks === undefined) {
                if (toAdd === undefined) {
                    _this.locked.set(key, []);
                }
                else {
                    _this.locked.set(key, [toAdd]);
                }
            }
            else {
                if (toAdd !== undefined) {
                    callbacks.unshift(toAdd);
                    _this.locked.set(key, callbacks);
                }
            }
        };
        this.isLocked = function (key) {
            return _this.locked.has(key);
        };
        this.lock = function (key) {
            return new Promise(function (resolve, reject) {
                if (_this.isLocked(key)) {
                    _this.addToLocked(key, resolve);
                }
                else {
                    _this.addToLocked(key);
                    resolve();
                }
            });
        };
        this.unlock = function (key) {
            var callbacks = _this.locked.get(key);
            if (callbacks === undefined || callbacks.length === 0) {
                _this.locked.delete(key);
                return;
            }
            var toCall = callbacks.pop();
            _this.locked.set(key, callbacks);
            if (toCall !== undefined) {
                setTimeout(toCall, 0);
            }
        };
    }
    ProcessLocking.getInstance = function () {
        if (ProcessLocking.instance === undefined) {
            ProcessLocking.instance = new ProcessLocking();
        }
        return ProcessLocking.instance;
    };
    return ProcessLocking;
}());
function getLock() {
    return ProcessLocking.getInstance();
}
exports.default = getLock;
