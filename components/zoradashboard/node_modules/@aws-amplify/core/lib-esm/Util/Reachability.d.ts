import Observable from 'zen-observable-ts';
declare type NetworkStatus = {
    online: boolean;
};
export default class ReachabilityNavigator implements Reachability {
    private static _observers;
    networkMonitor(netInfo?: any): Observable<NetworkStatus>;
    private static _observerOverride;
}
interface Reachability {
    networkMonitor(netInfo?: any): Observable<NetworkStatus>;
}
export {};
