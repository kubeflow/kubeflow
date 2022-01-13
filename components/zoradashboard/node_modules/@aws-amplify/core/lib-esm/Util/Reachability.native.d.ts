import Observable from 'zen-observable-ts';
declare type NetworkStatus = {
    online: boolean;
};
export default class ReachabilityNavigator implements Reachability {
    networkMonitor(netInfo?: any): Observable<NetworkStatus>;
}
interface Reachability {
    networkMonitor(netInfo?: any): Observable<NetworkStatus>;
}
export {};
