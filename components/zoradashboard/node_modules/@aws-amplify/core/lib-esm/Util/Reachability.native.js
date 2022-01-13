import Observable from 'zen-observable-ts';
import { ConsoleLogger as Logger } from '../Logger';
var logger = new Logger('Reachability', 'DEBUG');
var ReachabilityNavigator = /** @class */ (function () {
    function ReachabilityNavigator() {
    }
    ReachabilityNavigator.prototype.networkMonitor = function (netInfo) {
        /**
         * Here netinfo refers to @react-native-community/netinfo
         * This is needed in React Native to enable network detection
         * We do not import it in Core so that Apps that do not use DataStore
         * Do not need to install and link this dependency
         * When using Reachability in React Native, pass NetInfo as a param to networkMonitor
         */
        if (!(netInfo && netInfo.addEventListener)) {
            throw new Error('NetInfo must be passed to networkMonitor to enable reachability in React Native');
        }
        return new Observable(function (observer) {
            logger.log('subscribing to reachability in React Native');
            var unsubscribe = netInfo.addEventListener(function (_a) {
                var isInternetReachable = _a.isInternetReachable;
                // `isInternetReachable` can sometimes be `null` initially, so we want
                // to make sure it is a boolean first before sending it to the observer.
                if (typeof isInternetReachable === 'boolean') {
                    var online = isInternetReachable;
                    logger.log('Notifying reachability change', online);
                    observer.next({ online: online });
                }
            });
            return function () {
                unsubscribe();
            };
        });
    };
    return ReachabilityNavigator;
}());
export default ReachabilityNavigator;
//# sourceMappingURL=Reachability.native.js.map