var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { browserOrNode, isWebWorker } from '@aws-amplify/core';
import Observable from 'zen-observable-ts';
var ReachabilityNavigator = /** @class */ (function () {
    function ReachabilityNavigator() {
    }
    ReachabilityNavigator.prototype.networkMonitor = function (netInfo) {
        if (browserOrNode().isNode) {
            return Observable.from([{ online: true }]);
        }
        var globalObj = isWebWorker() ? self : window;
        return new Observable(function (observer) {
            observer.next({ online: globalObj.navigator.onLine });
            var notifyOnline = function () { return observer.next({ online: true }); };
            var notifyOffline = function () { return observer.next({ online: false }); };
            globalObj.addEventListener('online', notifyOnline);
            globalObj.addEventListener('offline', notifyOffline);
            ReachabilityNavigator._observers.push(observer);
            return function () {
                globalObj.removeEventListener('online', notifyOnline);
                globalObj.removeEventListener('offline', notifyOffline);
                ReachabilityNavigator._observers = ReachabilityNavigator._observers.filter(function (_observer) { return _observer !== observer; });
            };
        });
    };
    // expose observers to simulate offline mode for integration testing
    ReachabilityNavigator._observerOverride = function (status) {
        var e_1, _a;
        var _loop_1 = function (observer) {
            if (observer.closed) {
                ReachabilityNavigator._observers = ReachabilityNavigator._observers.filter(function (_observer) { return _observer !== observer; });
                return "continue";
            }
            observer.next(status);
        };
        try {
            for (var _b = __values(ReachabilityNavigator._observers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                _loop_1(observer);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ReachabilityNavigator._observers = [];
    return ReachabilityNavigator;
}());
export default ReachabilityNavigator;
//# sourceMappingURL=Reachability.js.map